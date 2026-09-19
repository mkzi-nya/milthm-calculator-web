// No npm dependencies: node wiki/tests/regression.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const marked = require('../marked.min.js');
const nav = JSON.parse(fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/window.WIKI_NAV = (.*);/)[1]);
const resources = JSON.parse(fs.readFileSync(path.join(root, '../resources/resources.json')));
let source = fs.readFileSync(path.join(root, 'build/app.js'), 'utf8');
source = source.replace(/\}\)\(\);\s*$/, 'window.test = { registerRoutes, parseHash, legacySongRoute, migrateLegacyQuery, transformLinks, parseInfoKeyFromAnchor, normalizeInfoTitle, showInfo, closeInfo }; })();');
let card;
let pendingFetch;
const context = {
  URL, URLSearchParams, AbortController, setTimeout, clearTimeout,
  location: new URL('https://example.test/project/wiki/index.html#/'),
  history: { replaceState(_, __, url) { context.location = new URL(url, context.location); } },
  fetch: () => pendingFetch,
  document: {
    readyState: 'loading', addEventListener() {}, activeElement: null,
    body: { appendChild() {} },
    createElement() {
      card = { hidden: true, style: {}, offsetWidth: 380, offsetHeight: 500,
        addEventListener() {}, setAttribute() {}, contains() { return false; }, matches() { return false; },
        querySelector() { return { addEventListener() {} }; } };
      return card;
    }
  },
  window: { WIKI_NAV: nav, innerWidth: 390, innerHeight: 844, addEventListener() {} }
};
vm.createContext(context);
vm.runInContext(source, context);
const app = context.window.test;
app.registerRoutes();
let routeCases = 0;
for (const song of nav.songs) {
  assert(fs.existsSync(path.join(root, song.file)), song.file);
  for (const alias of song.aliases.filter(Boolean)) {
    const matches = nav.songs.filter(s => s.aliases.some(v => String(v).normalize('NFKC').trim().toLowerCase() === String(alias).normalize('NFKC').trim().toLowerCase()));
    assert.equal(app.legacySongRoute(alias), matches.length === 1 ? song.route : '/songs?q=' + encodeURIComponent(alias), String(alias)); routeCases++;
  }
}
for (const base of Object.keys(nav.documents)) assert.equal(app.legacySongRoute(base), '/song/' + base);
assert.equal(app.legacySongRoute('unknown song'), '/songs?q=unknown%20song');
{
  const sorted = nav.songs.slice().sort((a, b) => a.sortIndex - b.sortIndex);
  assert.deepEqual(sorted.map(s => s.sortIndex), nav.songs.map((_, i) => i), 'sortIndex must be a 0..n-1 permutation');
  for (let i = 1; i < sorted.length; i++) {
    assert(sorted[i - 1].sortKey[0] <= sorted[i].sortKey[0], `song category order broken at ${sorted[i].name}`);
  }
}
const redirect = fs.readFileSync(path.join(root, 'song/index.html'), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
for (const [query, expected] of [['?song=slic_hertz__GdbG', '/song/slic_hertz__GdbG'], ['?q=weather_report', '/song/weather_report'], ['?%E9%9B%A8%E5%A5%B3', '/song/Ameonna'], ['?song=LiFE_Garden__Extended_Mix_', '/song/LiFE_Garden__Extended_Mix_']]) {
  let legacy = new URL('https://example.test/project/wiki/song/' + query + '#%E6%9B%B2%E7%9B%AE%E4%BF%A1%E6%81%AF');
  legacy.replace = url => { context.location = new URL(url); };
  vm.runInNewContext(redirect, { URL, location: legacy });
  app.migrateLegacyQuery();
  assert.equal(app.parseHash().route, expected);
  assert.equal(app.parseHash().anchor, '曲目信息');
  assert.equal(context.location.search, '');
}
context.location = new URL('https://example.test/project/wiki/index.html#/artist#%E5%89%8A%E9%99%A4');
assert.equal(app.parseHash().anchor, '削除');
context.location.hash = '#/songs?q=rain#chap-1';
assert.equal(app.parseHash().query, 'rain');
assert.equal(app.parseHash().anchor, 'chap-1');
const normalize = app.normalizeInfoTitle;
let infoCount = 0;
for (const dir of [root, path.join(root, 'song')]) {
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.md'))) {
    const html = marked.parse(app.transformLinks(fs.readFileSync(path.join(dir, file), 'utf8')));
    for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) {
      if (match[1].startsWith('../../')) {
        const image = path.resolve(dir, decodeURIComponent(match[1].replace(/&amp;/g, '&')));
        assert(fs.existsSync(image), `${file}: missing image ${match[1]}`);
      }
    }
    for (const match of html.matchAll(/href="(info:[^"]+)"/g)) {
      if (match[1] === 'info:download') continue;
      const args = app.parseInfoKeyFromAnchor({getAttribute() { return match[1]; }});
      assert(args, `${file}: invalid info link ${match[1]}`);
      const title = Object.keys(resources).find(k => normalize(k) === normalize(args[0]) || normalize(resources[k].latinTitle) === normalize(args[0]));
      if (title) { if (args[1]) assert(resources[title].difficulty[args[1]], `${file}: ${args}`); }
      else assert(nav.archived.some(s => normalize(s.name) === normalize(args[0])), `${file}: missing ${args}`);
      infoCount++;
    }
  }
}
for (const role of ['artist','charter','illustrator']) {
  const md = fs.readFileSync(path.join(root, role + '-statistics.md'), 'utf8');
  assert(!marked.parse(md).includes('<table>'));
  assert(md.includes('\n## '));
  for (const match of md.matchAll(/index\.html#\/song\/([^\s)]+)/g)) assert(nav.documents[match[1]], match[1]);
  assert.equal(md, fs.readFileSync(path.join(root, 'code', role + '-statistics.md'), 'utf8'));
}
function link(title, difficulty) {
  const args = difficulty ? [title, difficulty] : [title];
  return { isConnected: true, setAttribute() {}, getAttribute() { return 'info:' + encodeURIComponent('info(' + args.map(x=>JSON.stringify(x)).join(',') + ')'); },
    getBoundingClientRect() { return {left: 10, top: 500, bottom: 520}; } };
}
async function flush() { for (let i = 0; i < 12; ++i) await Promise.resolve(); }
(async () => {
  pendingFetch = Promise.reject(new Error('offline'));
  app.showInfo(link('Aconsma'));
  await flush();
  assert(card.innerHTML.includes('重新加载'), 'failed fetch must offer retry');
  let resolve;
  pendingFetch = new Promise(r => { resolve = r; });
  app.showInfo(link('Aconsma'));
  assert(card.innerHTML.includes('正在加载'));
  app.closeInfo();
  resolve({ok: true, json: async () => resources});
  await flush();
  assert(card.hidden, 'a closed loading card must not reappear');
  app.showInfo(link('Aconsma'));
  app.showInfo(link('靈', 'Cloudburst'));
  await flush();
  assert(card.innerHTML.includes('<h2>靈</h2>'), 'rapid switching must keep latest card');
  assert(!card.innerHTML.includes('<h2>Aconsma</h2>'));
  app.showInfo(link('Aconsma', 'Drizzle'));
  await flush();
  assert(card.innerHTML.includes('<h2>Aconsma</h2>'), 'switching back must retain original data');
  assert(card.innerHTML.includes('109'));
  assert(parseFloat(card.style.left) >= 0 && parseFloat(card.style.top) >= 0);
  app.closeInfo();
  console.log(`PASS: ${routeCases} song aliases, legacy redirects and anchors, ${infoCount} info links, generated statistics, async card cancellation and rapid switching`);
})().catch(error => { console.error(error); process.exitCode = 1; });
