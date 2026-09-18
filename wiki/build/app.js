/* Milthm Wiki 单页应用
 * 由 build/build.py 复制到 wiki/app.js，请勿直接修改本文件（应修改 build/app.js）。
 * 依赖：marked、markedKatex、katex、highlight.js
 * 注入：window.WIKI_NAV
 */
(function () {
  'use strict';

  var NAV = window.WIKI_NAV || { groups: [], songs: [], songSearchUrl: 'song/index.html' };
  var ROUTES = {};
  var SONGS = [];
  var currentRoute = null;
  var content = null;
  var mdBody = null;

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function scrollTop() { return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0; }

  /* ---------------- 路由注册 ---------------- */
  function registerRoutes() {
    ROUTES = {};
    SONGS = [];
    (NAV.groups || []).forEach(function (group) {
      (group.items || []).forEach(function (item) {
        if (!item.route) return;
        ROUTES[item.route] = { label: item.label, file: item.file, group: group.title };
      });
    });
    (NAV.songs || []).forEach(function (s) {
      ROUTES[s.route] = { label: s.label, name: s.name || s.label, file: s.file, chapter: s.chapter, song: true };
      SONGS.push(s);
    });
    ROUTES['/songs'] = { label: '曲目列表', songIndex: true };
    if (!ROUTES['/']) {
      ROUTES['/'] = { label: '主页', file: NAV.homeFile || 'index.md' };
    }
  }

  function parseHash() {
    var h = window.location.hash || '';
    if (h.charAt(0) === '#') h = h.slice(1);
    if (h.indexOf('/') === 0) {
      var base = h.slice(1);
      var q = base.indexOf('?');
      var anchor = '';
      if (q >= 0) { base = base.slice(0, q); }
      var a = base.indexOf('#');
      if (a >= 0) { anchor = base.slice(a + 1); base = base.slice(0, a); }
      return { route: '/' + base, anchor: anchor };
    }
    // 纯锚点（如 #reality-calculation）——视为主页并滚动
    if (h) return { route: '/', anchor: h };
    return { route: '/', anchor: '' };
  }

  /* ---------------- 左侧栏（页面导航） ---------------- */
  var DESKTOP_MQ = (typeof window.matchMedia === 'function')
    ? window.matchMedia('(min-width: 1100px)')
    : { matches: false, addEventListener: null, addListener: null };

  function isDesktop() { return DESKTOP_MQ.matches; }

  function buildSidebar() {
    var sb = $('sidebar');
    while (sb.firstChild) sb.removeChild(sb.firstChild);

    var head = document.createElement('div');
    head.className = 'sb-head';
    var brand = document.createElement('span');
    brand.textContent = '\uD83C\uDF31 Milthm Wiki';
    head.appendChild(brand);
    var closeBtn = document.createElement('button');
    closeBtn.className = 'sb-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', '关闭目录');
    closeBtn.textContent = '\u00d7';
    closeBtn.addEventListener('click', closeSidebar);
    head.appendChild(closeBtn);
    sb.appendChild(head);

    // 回到主页 / 回到歌曲目录（曲目页显示）
    var navTop = document.createElement('div');
    navTop.className = 'sb-toplinks';

    var homeBtn = document.createElement('button');
    homeBtn.type = 'button';
    homeBtn.className = 'sb-home';
    homeBtn.textContent = '\uD83C\uDFE0 回到主页';
    homeBtn.addEventListener('click', function () { closeSidebar(); nav('/'); });
    navTop.appendChild(homeBtn);

    var songsBtn = document.createElement('button');
    songsBtn.type = 'button';
    songsBtn.className = 'sb-home sb-home-sub';
    songsBtn.id = 'sbBackSongs';
    songsBtn.textContent = '\u2190 回到歌曲目录';
    songsBtn.style.display = 'none';
    songsBtn.addEventListener('click', function () { closeSidebar(); nav('/songs'); });
    navTop.appendChild(songsBtn);

    sb.appendChild(navTop);

    // 单一「页面」分组：固定展开，不折叠
    var pageGroup = document.createElement('div');
    pageGroup.className = 'sb-group sb-pages';
    var pageHead = document.createElement('div');
    pageHead.className = 'sb-ghead sb-ghead-static';
    pageHead.textContent = '页面';
    pageGroup.appendChild(pageHead);
    var pageBody = document.createElement('div');
    pageBody.className = 'sb-gbody';
    pageBody.id = 'pageNav';
    (NAV.groups || []).forEach(function (group) {
      (group.items || []).forEach(function (item) {
        pageBody.appendChild(buildListItem(item.label, item.route, 'nav', ''));
      });
      (group.external || []).forEach(function (item) {
        pageBody.appendChild(externalItem(item));
      });
    });
    pageGroup.appendChild(pageBody);
    sb.appendChild(pageGroup);

    var foot = document.createElement('div');
    foot.className = 'sb-foot';
    foot.textContent = 'Milthm Wiki' + (NAV.version ? ' · v' + NAV.version : '');
    sb.appendChild(foot);
  }

  function buildListItem(label, route, type, extraClass) {
    var a = document.createElement('a');
    a.className = 'sb-item nav-' + type + (extraClass ? ' ' + extraClass : '');
    a.dataset.route = route || '';
    a.textContent = label;
    a.href = routeToHash(route);
    a.addEventListener('click', function (e) {
      e.preventDefault();
      closeSidebar();
      nav(route);
    });
    return a;
  }

  function externalItem(item) {
    var a = document.createElement('a');
    a.className = 'sb-item sb-ext';
    a.textContent = item.label;
    a.href = item.href;
    a.target = (item.target || '_self');
    return a;
  }

  function updateSidebarActive(route) {
    var items = document.querySelectorAll('.sb-item[data-route]');
    items.forEach(function (a) {
      a.classList.toggle('cur', a.dataset.route === route);
    });
  }

  function updateSidebarForRoute(route) {
    var back = $('sbBackSongs');
    if (back) back.style.display = /^\/song\//.test(route) ? '' : 'none';
  }

  function applySidebarDefaults() {
    document.body.classList.toggle('sb-fixed', isDesktop());
    document.body.classList.toggle('toc-fixed', isDesktop());
  }

  function openSidebar() { $('sidebar').classList.add('on'); $('scrim').classList.add('on'); }
  function closeSidebar() { $('sidebar').classList.remove('on'); $('scrim').classList.remove('on'); }

  /* ---------------- 右侧栏（总览） ---------------- */
  var tocPanel = null;
  var tocSearch = null;
  var tocList = null;
  var tocScope = 'headings'; // 'headings' | 'songs'

  function buildTocPanel() {
    tocPanel = document.createElement('aside');
    tocPanel.id = 'tocPanel';

    var head = document.createElement('div');
    head.className = 'toc-head';
    var title = document.createElement('span');
    title.className = 'toc-title';
    title.textContent = '总览';
    head.appendChild(title);
    var closeToc = document.createElement('button');
    closeToc.className = 'sb-close toc-close';
    closeToc.type = 'button';
    closeToc.setAttribute('aria-label', '关闭总览');
    closeToc.textContent = '\u00d7';
    closeToc.addEventListener('click', closeTocPanel);
    head.appendChild(closeToc);
    tocPanel.appendChild(head);

    tocSearch = document.createElement('input');
    tocSearch.className = 'toc-search';
    tocSearch.type = 'search';
    tocSearch.placeholder = '搜索…';
    tocSearch.addEventListener('input', function () { filterToc(tocSearch.value); });
    tocPanel.appendChild(tocSearch);

    tocList = document.createElement('div');
    tocList.id = 'tocList';
    tocList.className = 'toc-list';
    tocPanel.appendChild(tocList);

    document.body.appendChild(tocPanel);
  }

  function openTocPanel() { if (tocPanel) tocPanel.classList.add('on'); }
  function closeTocPanel() { if (tocPanel) tocPanel.classList.remove('on'); }

  function setTocScope(scope) {
    tocScope = scope;
    var showSearch = true;
    if (tocSearch) {
      tocSearch.style.display = showSearch ? '' : 'none';
      tocSearch.placeholder = scope === 'songs' ? '搜索曲目…' : '搜索小标题…';
      tocSearch.value = '';
    }
  }

  function rebuildToc() {
    if (!tocList) return;
    tocList.innerHTML = '';
    if (tocScope === 'songs') {
      var lastChapter = null;
      SONGS.forEach(function (s) {
        if (s.chapter !== lastChapter) {
          lastChapter = s.chapter;
          var sep = document.createElement('div');
          sep.className = 'sb-chapter';
          sep.textContent = s.chapter || '未分组';
          tocList.appendChild(sep);
        }
        tocList.appendChild(buildListItem(s.name || s.label, s.route, 'song', 'sb-song'));
      });
      return;
    }
    if (!mdBody) return;
    var hs = mdBody.querySelectorAll('h2,h3');
    var maxToc = 80;
    var count = 0;
    hs.forEach(function (h) {
      if (count >= maxToc) return;
      if (!h.id) return;
      var d = document.createElement('a');
      d.className = 'sb-item toc' + (h.tagName === 'H3' ? ' lv3' : '');
      d.textContent = h.textContent;
      d.href = '#' + h.id;
      d.addEventListener('click', function (e) {
        e.preventDefault();
        closeTocPanel();
        scrollToAnchor(h.id);
      });
      tocList.appendChild(d);
      count++;
    });
    if (!count) {
      var none = document.createElement('div');
      none.className = 'toc-empty';
      none.textContent = '本页无小标题';
      tocList.appendChild(none);
    }
  }

  function filterToc(q) {
    if (!tocList) return;
    q = String(q || '').replace(/^\s+|\s+$/g, '').toLowerCase();
    var items = tocList.querySelectorAll('.sb-item');
    var seps = tocList.querySelectorAll('.sb-chapter');
    var showSep = {};
    items.forEach(function (a) {
      var hit = !q || a.textContent.toLowerCase().indexOf(q) >= 0
        || (a.dataset.route || '').toLowerCase().indexOf(q) >= 0;
      a.style.display = hit ? '' : 'none';
      if (hit && a.dataset.route) {
        var prev = a.previousElementSibling;
        while (prev && !prev.classList.contains('sb-chapter')) prev = prev.previousElementSibling;
        if (prev) showSep[prev.textContent] = true;
      }
    });
    seps.forEach(function (s) { s.style.display = showSep[s.textContent] ? '' : 'none'; });
  }

  function updateTocForRoute(route) {
    var onSong = /^\/song\//.test(route) || route === '/songs';
    setTocScope(onSong ? 'songs' : 'headings');
    rebuildToc();
  }

  /* ---------------- 内容渲染 ---------------- */
  var currentDocTitle = '';

  function buildTocFromDom() {
    rebuildToc();
  }

  function scrollToAnchor(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.pageYOffset - 12;
    window.scrollTo(0, Math.max(0, y));
  }

  function renderPage(route, anchor) {
    var entry = ROUTES[route] || ROUTES['/'];
    if (/^garden/.test(route)) {
      window.location.href = 'garden.html';
      return;
    }
    if (route === '/song-search') { route = '/songs'; entry = ROUTES['/songs']; }
    currentRoute = route;
    updateSidebarActive(route);
    updateSidebarForRoute(route);
    updateTocForRoute(route);
    if (entry.songIndex) {
      setPageTitle(entry.label);
      renderSongIndex();
      return;
    }
    setPageTitle('加载中…');
    fetchMd(entry.file)
      .then(function (md) {
        if (currentRoute !== route) return;
        renderMarkdown(md, entry);
      })
      .then(function () {
        if (currentRoute !== route) return;
        if (anchor) { var el = document.getElementById(anchor); if (el && el.scrollIntoView) { el.scrollIntoView(); } }
      })
      .catch(function (err) {
        if (currentRoute !== route) return;
        showRenderError(entry, err);
      });
  }

  /* ---- 曲目列表页（SPA 版） ---- */
  function renderSongIndex() {
    if (!mdBody) return;
    revokeTrackedMediaObjectUrls();
    var wrap = document.createElement('div');
    wrap.className = 'song-index';

    var search = document.createElement('input');
    search.className = 'song-search-input';
    search.type = 'search';
    search.placeholder = '搜索曲名 / 曲师 / 章节…';
    wrap.appendChild(search);

    var count = document.createElement('div');
    count.className = 'song-index-count';
    wrap.appendChild(count);

    var list = document.createElement('div');
    list.className = 'song-index-list';
    wrap.appendChild(list);

    var chapters = [];
    var seen = {};
    SONGS.forEach(function (s) {
      var c = s.chapter || '未分组';
      if (!seen[c]) { seen[c] = []; chapters.push(c); }
      seen[c].push(s);
    });

    var chapterEls = [];
    chapters.forEach(function (c) {
      var sec = document.createElement('section');
      sec.className = 'song-chapter';
      var h = document.createElement('h2');
      h.id = 'chap-' + chapterEls.length;
      var hlink = document.createElement('a');
      hlink.className = 'song-chapter-link';
      hlink.textContent = c;
      hlink.href = '#' + h.id;
      hlink.addEventListener('click', function (e) { e.preventDefault(); scrollToAnchor(h.id); });
      h.appendChild(hlink);
      sec.appendChild(h);
      var grid = document.createElement('div');
      grid.className = 'song-grid';
      seen[c].forEach(function (s) {
        var a = document.createElement('a');
        a.className = 'song-card';
        a.href = routeToHash(s.route);
        var t = document.createElement('span');
        t.className = 'song-card-title';
        t.textContent = s.name || s.label;
        a.appendChild(t);
        a.addEventListener('click', function (e) { e.preventDefault(); closeSidebar(); nav(s.route); });
        grid.appendChild(a);
      });
      sec.appendChild(grid);
      list.appendChild(sec);
      chapterEls.push({ name: c, el: sec, items: seen[c] });
    });

    function apply(q) {
      q = String(q || '').replace(/^\s+|\s+$/g, '').toLowerCase();
      var total = 0;
      chapterEls.forEach(function (ch) {
        var hitItems = !q ? ch.items : ch.items.filter(function (s) {
          return (s.name || s.label).toLowerCase().indexOf(q) >= 0 || (s.chapter || '').toLowerCase().indexOf(q) >= 0;
        });
        if (hitItems.length) {
          ch.el.style.display = '';
          ch.el.querySelectorAll('.song-card').forEach(function (card, i) {
            card.style.display = hitItems.indexOf(ch.items[i]) >= 0 ? '' : 'none';
          });
          total += hitItems.length;
        } else {
          ch.el.style.display = 'none';
        }
      });
      count.textContent = q ? ('找到 ' + total + ' 首曲目') : ('共 ' + SONGS.length + ' 首曲目');
    }

    search.addEventListener('input', function () { apply(search.value); });
    apply('');

    mdBody.innerHTML = '';
    mdBody.appendChild(wrap);
    currentDocTitle = '曲目列表';
    buildTocFromDom();
    window.dispatchEvent(new Event('wiki:render'));
  }

  function showRenderError(entry, err) {
    if (!mdBody) return;
    var msg = esc(String(err && err.message ? err.message : err));
    mdBody.innerHTML =
      '<section class="chap"><div class="chap-bar"><span class="chap-title">加载失败</span></div>' +
      '<div class="chap-body"><p>无法加载 <code>' + esc(entry.file) + '</code></p>' +
      '<pre>' + msg + '</pre></div></section>';
  }

  function setPageTitle(label) {
    var el = $('pageTitle');
    if (el) el.textContent = label || 'Milthm Wiki';
    document.title = (label ? label + ' · ' : '') + 'Milthm Wiki';
  }

  function fetchMd(path) {
    return fetch(path, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status + '：' + path);
      return res.text();
    }).then(function (text) {
      if (!text || !text.replace(/\s/g, '')) throw new Error('文件为空：' + path);
      return text;
    });
  }

  /* ---------------- Markdown 渲染管线 ---------------- */
  function encodeInfoTarget(payload) {
    return encodeURIComponent(payload).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  function transformLinks(md) {
    return String(md).replace(/\]\(info:(info\(.*?\))\)/g, function (m, payload) {
      return '](info:' + encodeInfoTarget(payload) + ')';
    });
  }

  function enhanceCodeBlocks(root) {
    root.querySelectorAll('pre').forEach(function (pre) {
      if (pre.parentNode && pre.parentNode.classList && pre.parentNode.classList.contains('code-wrap')) return;
      var wrap = document.createElement('div');
      wrap.className = 'code-wrap';
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'code-copy';
      btn.textContent = '复制';
      btn.addEventListener('click', function () {
        var codeEl = pre.querySelector('code');
        var text = codeEl ? codeEl.innerText : pre.innerText;
        var done = function () {
          btn.textContent = '已复制';
          btn.classList.add('copied');
          setTimeout(function () { btn.textContent = '复制'; btn.classList.remove('copied'); }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
        } else {
          fallbackCopy(text, done);
        }
      });
      wrap.appendChild(btn);
    });
  }

  function fallbackCopy(text, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) {}
  }

  function postRender(contentRoot, entry) {
    contentRoot.querySelectorAll('h2,h3,h4').forEach(function (h) {
      h.id = h.textContent.toLowerCase().replace(/\s+/g, '-');
    });
    if (window.hljs) {
      try {
        contentRoot.querySelectorAll('pre code').forEach(function (b) {
          if (b.dataset.highlighted === 'yes') return;
          hljs.highlightElement(b);
          b.dataset.highlighted = 'yes';
        });
      } catch (e) {}
    }
    enhanceCodeBlocks(contentRoot);
    resizeKatex();
    bindLinks(contentRoot);
    bindInfoLinks(contentRoot);
    hydrateWikiMedia(contentRoot);
    wireRealityTool();
    buildTocFromDom();
    window.dispatchEvent(new Event('wiki:render'));
  }

  function renderMarkdown(md, entry) {
    if (!mdBody) throw new Error('content 不存在');
    var token = ++renderToken;
    var safe = transformLinks(md);
    var html = marked.parse(safe, { headerIds: true, mangle: false });
    if (!html || !html.trim()) throw new Error('Markdown 渲染结果为空');
    if (token !== renderToken) return null;
    revokeTrackedMediaObjectUrls();
    mdBody.innerHTML = html;
    currentDocTitle = (entry && entry.label) || '';
    setPageTitle(entry && entry.label);
    if (mdBody.querySelector('h1')) {
      var firstH = mdBody.querySelector('h1');
      if (!currentDocTitle) currentDocTitle = firstH.textContent;
    }
    postRender(mdBody, entry);
  }

  /* ---- 页面内锚点 & 链接 ---- */
  function bindLinks(root) {
    root.querySelectorAll('a').forEach(function (a) {
      if (a.dataset.bound) return;
      a.dataset.bound = '1';
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#' && href.indexOf('#/') !== 0) {
        var id = href.slice(1);
        a.addEventListener('click', function (e) { e.preventDefault(); scrollToAnchor(id); });
      } else if (decodeURIComponent(href) === 'info:download') {
        a.addEventListener('click', function (e) { e.preventDefault(); downloadCurrentMarkdown(); });
      } else if (href.indexOf('info:') === 0) {
        a.addEventListener('click', function (e) { e.preventDefault(); });
        bindTooltip(a);
      }
    });
  }

  /* ---- 下载当前曲目 markdown ---- */
  function downloadCurrentMarkdown() {
    var entry = ROUTES[currentRoute];
    var base = entry && entry.file ? entry.file.replace(/^.*\//, '').replace(/\.md$/, '') : 'document';
    fetch(entry && entry.file, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    }).then(function (text) {
      var blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var dl = document.createElement('a');
      dl.href = url;
      dl.download = base + '.md';
      document.body.appendChild(dl);
      dl.click();
      document.body.removeChild(dl);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    }).catch(function (err) { console.error('下载失败：', err); });
  }

  /* ---- info 工具提示（读取 chartdev 数据） ---- */
  var devLoaded = false;
  var devNodes = [];
  var hoverState = new Map();
  var HIDE_DELAY_MS = 120;
  var currentKey = null;
  var currentEl = null;
  var isMorphing = false;
  var MORPH_SWAP_DELAY = 40;
  var devFetching = null;

  function ensureState(key) {
    if (!hoverState.has(key)) hoverState.set(key, { hoverLink: false, hoverDev: false, el: null, timer: null });
    return hoverState.get(key);
  }

  function scheduleHide(key) {
    var st = ensureState(key);
    if (st.timer) clearTimeout(st.timer);
    st.timer = setTimeout(function () {
      if (!st.hoverLink && !st.hoverDev && st.el) st.el.classList.remove('visible');
      st.timer = null;
    }, HIDE_DELAY_MS);
  }

  function placeAndShowForLink(aaa, linkRect) {
    if (!aaa) return;
    aaa.classList.add('visible');
    var topY = linkRect.bottom + scrollTop();
    var leftX = linkRect.left + linkRect.width / 2 + (window.pageXOffset || 0) - aaa.offsetWidth / 2;
    var sw = window.innerWidth;
    var ew = aaa.offsetWidth;
    if (leftX + ew > sw) leftX = sw - ew;
    else if (leftX < 0) leftX = 0;
    aaa.style.position = 'absolute';
    aaa.style.top = topY + 'px';
    aaa.style.left = leftX + 'px';
  }

  function parseInfoKeyFromAnchor(anchor) {
    var url = decodeURIComponent(anchor.getAttribute('href') || '');
    var m = url.match(/^info:info\((.*)\)$/);
    if (!m) return null;
    var params = m[1].split(',').map(function (p) { return p.trim().replace(/['"]/g, ''); });
    var key = params.length === 2 ? params.join(',') : params[0];
    return key || null;
  }

  function aaaSelector(key) {
    var k = (window.CSS && typeof CSS.escape === 'function') ? CSS.escape(key) : String(key).replace(/"/g, '\\"');
    return 'div[aaa="' + k + '"]';
  }

  var devKeyMap = null;
  function normalizeKey(k) {
    return String(k).replace(/[()]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }
  function findDevNode(key) {
    var el = document.querySelector(aaaSelector(key));
    if (el) return { el: el, key: key };
    var alt = String(key).replace(/[()]/g, '');
    el = document.querySelector(aaaSelector(alt));
    if (el) return { el: el, key: alt };
    if (!devKeyMap && devLoaded) {
      devKeyMap = {};
      document.querySelectorAll('body > div[aaa]').forEach(function (n) {
        devKeyMap[normalizeKey(n.getAttribute('aaa'))] = n;
      });
    }
    var n2 = devKeyMap ? devKeyMap[normalizeKey(key)] : null;
    return n2 ? { el: n2, key: n2.getAttribute('aaa') } : null;
  }

  function showByMorphOrDirect(targetKey, linkRect) {
    var found = findDevNode(targetKey);
    if (!found) return;
    var targetEl = found.el;
    targetKey = found.key;
    if (!currentEl) {
      currentEl = targetEl; currentKey = targetKey;
      var st = ensureState(targetKey);
      st.el = currentEl; st.hoverLink = true;
      if (st.timer) { clearTimeout(st.timer); st.timer = null; }
      placeAndShowForLink(currentEl, linkRect);
      return;
    }
    if (currentKey !== targetKey && !isMorphing) {
      isMorphing = true;
      var oldKey = currentKey;
      if (oldKey) {
        var oldSt = ensureState(oldKey);
        if (oldSt.timer) { clearTimeout(oldSt.timer); oldSt.timer = null; }
        oldSt.hoverLink = false; oldSt.hoverDev = false; oldSt.el = currentEl;
      }
      currentEl.classList.add('visible');
      placeAndShowForLink(currentEl, linkRect);
      setTimeout(function () {
        currentEl.innerHTML = targetEl.innerHTML;
        currentEl.setAttribute('aaa', targetKey);
        targetEl.classList.remove('visible');
        targetEl.style.top = '-99999px';
        targetEl.style.left = '-99999px';
        currentKey = targetKey;
        var ns = ensureState(currentKey);
        ns.el = currentEl; ns.hoverLink = false; ns.hoverDev = false;
        isMorphing = false;
      }, MORPH_SWAP_DELAY);
      return;
    }
    placeAndShowForLink(currentEl, linkRect);
  }

  function bindTooltip(a) {
    a.addEventListener('mouseenter', function () {
      var key = parseInfoKeyFromAnchor(a);
      if (!key) return;
      var st = ensureState(key);
      st.hoverLink = true;
      if (st.timer) { clearTimeout(st.timer); st.timer = null; }
      showByMorphOrDirect(key, a.getBoundingClientRect());
    });
    a.addEventListener('mouseleave', function () {
      var key = parseInfoKeyFromAnchor(a);
      if (!key) return;
      var st = ensureState(key);
      st.hoverLink = false;
      scheduleHide(key);
    });
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var key = parseInfoKeyFromAnchor(a);
      if (!key) return;
      showByMorphOrDirect(key, a.getBoundingClientRect());
    });
  }

  function bindInfoLinks(root) {
    var infos = root.querySelectorAll('a[href^="info:info"]');
    if (infos.length) loadDev();
  }

  function loadDev() {
    if (devLoaded) return Promise.resolve();
    if (devFetching) return devFetching;
    devFetching = fetch('./chartdev.html?' + Date.now())
      .then(function (res) { if (!res.ok) throw new Error('加载 chartdev 失败：' + res.status); return res.text(); })
      .then(function (html) {
        if (devLoaded) return;
        var temp = document.createElement('div');
        temp.innerHTML = html;
        var nodes = temp.querySelectorAll('div[aaa]');
        var existing = {};
        document.querySelectorAll('body > div[aaa]').forEach(function (n) {
          existing[n.getAttribute('aaa')] = true;
        });
        var frag = document.createDocumentFragment();
        nodes.forEach(function (node) {
          var key = node.getAttribute('aaa');
          if (existing[key]) return;
          existing[key] = true;
          node.removeAttribute('style');
          node.classList.add('info-card');
          node.querySelectorAll('a').forEach(function (lk) {
            if (lk.getAttribute('target') === '_blank') lk.setAttribute('rel', 'noopener noreferrer');
            lk.addEventListener('click', function (e) {
              var h = lk.getAttribute('href') || '';
              var m = h.match(/[?&]song=([^&]+)/);
              if (m) {
                e.preventDefault();
                var slug = decodeURIComponent(m[1]);
                if (ROUTES['/song/' + slug]) nav('/song/' + slug);
                else nav('/songs');
              }
            });
          });
          node.addEventListener('mouseenter', function () {
            var st = ensureState(node.getAttribute('aaa'));
            st.el = node; st.hoverDev = true;
            node.classList.add('visible');
            if (st.timer) { clearTimeout(st.timer); st.timer = null; }
          });
          node.addEventListener('mouseleave', function () {
            var st = ensureState(node.getAttribute('aaa'));
            st.hoverDev = false;
            scheduleHide(node.getAttribute('aaa'));
          });
          frag.appendChild(node);
        });
        document.body.appendChild(frag);
        devLoaded = true;
        devKeyMap = null;
      })
      .catch(function (err) { console.error(err); })
      .finally(function () { devFetching = null; });
    return devFetching;
  }

  /* ---- wiki 图片占位（song 页面） ---- */
  var MEDIA_ENDPOINTS = [
    { name: 'storage.mhtl.im', url: 'https://storage.mhtl.im/' },
    { name: 'GitHub Raw', url: 'https://raw.githubusercontent.com/4everDimensions/mhtlim-static-files/main/public/' },
    { name: 'ghproxy.net', url: 'https://ghproxy.net/https://raw.githubusercontent.com/4everDimensions/mhtlim-static-files/main/public/' },
    { name: 'gh-proxy.com', url: 'https://gh-proxy.com/https://raw.githubusercontent.com/4everDimensions/mhtlim-static-files/main/public/' }
  ];
  var MEDIA_TIMEOUT = 5000;
  var mediaToken = 0;
  var trackedUrls = new Set();

  function revokeTrackedMediaObjectUrls() {
    trackedUrls.forEach(function (u) { try { URL.revokeObjectURL(u); } catch (e) {} });
    trackedUrls.clear();
  }

  function inferMime(name) {
    var n = String(name || '').toLowerCase();
    if (n.indexOf('.avif') >= 0) return 'image/avif';
    if (n.indexOf('.webp') >= 0) return 'image/webp';
    if (n.indexOf('.png') >= 0) return 'image/png';
    if (n.indexOf('.jpg') >= 0 || n.indexOf('.jpeg') >= 0) return 'image/jpeg';
    if (n.indexOf('.gif') >= 0) return 'image/gif';
    return 'application/octet-stream';
  }

  function fetchBlob(url, timeout) {
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = null;
    var signal = ctrl ? ctrl.signal : undefined;
    if (ctrl && timeout > 0) timer = setTimeout(function () { ctrl.abort(); }, timeout);
    return fetch(url, { cache: 'no-store', signal: signal }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.blob();
    }).then(function (b) {
      if (ctrl && timer) clearTimeout(timer);
      if (!b || b.size <= 0) throw new Error('空文件');
      if (!b.type) b = new Blob([b], { type: inferMime(url) });
      return b;
    }).catch(function (e) {
      if (ctrl && timer) clearTimeout(timer);
      throw e;
    });
  }

  function hydrateWikiMedia(root) {
    var nodes = root.querySelectorAll('div.wiki-img[file]');
    if (!nodes.length) return;
    var token = ++mediaToken;
    nodes.forEach(function (node) {
      var filePath = String(node.getAttribute('file') || '').trim();
      if (!filePath) return;
      node.innerHTML = '<div class="loading-container">正在加载图片：' + esc(filePath) + '</div>';
      var done = false;
      (function attempt(i) {
        if (token !== mediaToken || !node.isConnected) return;
        if (i >= MEDIA_ENDPOINTS.length) {
          node.innerHTML = '<div class="error-container">图片加载失败：' + esc(filePath) + '</div>';
          return;
        }
        var src = MEDIA_ENDPOINTS[i];
        var url = src.url + filePath;
        var tm = i < MEDIA_ENDPOINTS.length - 1 ? MEDIA_TIMEOUT : 0;
        fetchBlob(url, tm).then(function (blob) {
          if (token !== mediaToken || !node.isConnected) return;
          var url2 = URL.createObjectURL(blob);
          trackedUrls.add(url2);
          node.innerHTML = '';
          var img = document.createElement('img');
          img.src = url2;
          img.alt = String(filePath).replace(/^.*[\\/]/, '').replace(/\.[^.]+$/, '');
          img.loading = 'lazy';
          img.decoding = 'async';
          node.appendChild(img);
        }).catch(function () { attempt(i + 1); });
      })(0);
    });
  }

  /* ---- Reality 对照表小工具 ---- */
  function findScore(constant, target) {
    if (target <= 0) return 600000;
    if (target > constant + 1.5) return 'Unable to deduce points';
    if (target >= constant) {
      if (target === constant + 1.5) return 1000000;
      return Math.ceil(850000 + (target - constant) * 100000);
    }
    if (target >= Math.max(0, 0.5 * constant - 1.5)) {
      var denom = constant / 300000 + 1 / 100000;
      return Math.min(Math.ceil((target + constant * 11 / 6 + 8.5) / denom), 849999);
    }
    if (Math.abs(constant - 3) < 1e-6) return 600000;
    return Math.min(Math.ceil(600000 + (target * 200000) / (constant - 3)), 699999);
  }

  function updateRealityOutput() {
    var input = document.getElementById('constantInput');
    var output = document.getElementById('output');
    if (!input || !output) return;
    if (input.value === '') {
      output.textContent = 'reality\tscore\n请填写 c (constant)，结果将以公式形式计算';
      return;
    }
    var c = parseFloat(input.value);
    var result = 'reality\tscore\n';
    var data = [];
    for (var r = 0; r <= c + 1.5; r += 0.01) {
      data.push({ r: r.toFixed(2), s: findScore(c, parseFloat(r.toFixed(2))) });
    }
    for (var i = data.length - 1; i >= 0; i--) {
      result += data[i].r + '\t' + data[i].s + '\n';
    }
    output.textContent = result;
  }

  function wireRealityTool() {
    var input = document.getElementById('constantInput');
    var output = document.getElementById('output');
    if (!input) return;
    input.removeAttribute('oninput');
    input.addEventListener('input', updateRealityOutput);
    updateRealityOutput();
  }

  /* ---- 其他 ---- */
  var renderToken = 0;
  var katexTimer = null;

  function resizeKatex() {
    var w = (mdBody || document.body).clientWidth;
    document.querySelectorAll('.katex-display').forEach(function (e) {
      e.style.fontSize = '';
      var actual = e.scrollWidth;
      if (actual > w) {
        var fs = parseFloat(getComputedStyle(e).fontSize);
        e.style.fontSize = (fs * w / actual) + 'px';
      }
    });
  }

  function onResize() { if (katexTimer) clearTimeout(katexTimer); katexTimer = setTimeout(resizeKatex, 120); }

  function buildPageHead() {
    var el = document.createElement('div');
    el.className = 'page-head';
    el.id = 'pageHead';
    var span = document.createElement('span');
    span.id = 'pageTitle';
    span.textContent = 'Milthm Wiki';
    el.appendChild(span);
    var tocBtn = document.createElement('button');
    tocBtn.className = 'top-btn toc-btn';
    tocBtn.id = 'tocBtn';
    tocBtn.textContent = '\u603B\u89C8';
    tocBtn.setAttribute('aria-label', '打开总览');
    tocBtn.addEventListener('click', function () {
      if (tocPanel && tocPanel.classList.contains('on')) closeTocPanel();
      else openTocPanel();
    });
    el.appendChild(tocBtn);
    return el;
  }

  /* ---------------- 导航 ---------------- */
  function nav(route) {
    var target = routeToHash(route);
    if (target === (window.location.hash || '') ||
        (target === '#/' && !window.location.hash)) {
      route = String(route || '').replace(/^\/+/, '');
      renderPage('/' + route, '');
      return;
    }
    window.location.hash = target;
  }

  function routeToHash(route) {
    var r = String(route || '').replace(/^\/+/, '');
    return r ? '#/' + r : '#/';
  }

  /* ---------------- 启动 ---------------- */
  function boot() {
    registerRoutes();
    content = $('content');
    buildSidebar();
    buildTocPanel();

    $('menuBtn').addEventListener('click', openSidebar);
    $('scrim').addEventListener('click', closeSidebar);
    window.addEventListener('resize', onResize);

    applySidebarDefaults();
    var mqHandler = function () { applySidebarDefaults(); onResize(); };
    if (DESKTOP_MQ.addEventListener) DESKTOP_MQ.addEventListener('change', mqHandler);
    else if (DESKTOP_MQ.addListener) DESKTOP_MQ.addListener(mqHandler);

    if (typeof marked !== 'undefined' && typeof markedKatex !== 'undefined') {
      try { marked.use(markedKatex()); } catch (e) {}
    }

    // 初始化内容区：顶部标题条 + 正文容器
    function initContent() {
      content.appendChild(buildPageHead());
      mdBody = document.createElement('div');
      mdBody.id = 'mdBody';
      mdBody.className = 'markdown-body';
      content.appendChild(mdBody);
    }

    // 初次进入：隐藏 loading
    var loading = $('loading');
    function start() {
      if (!content.firstChild) initContent();
      if (loading) loading.style.display = 'none';
      var p = parseHash();
      renderPage(p.route, p.anchor);
    }

    window.addEventListener('hashchange', function () {
      if (!content.firstChild) initContent();
      var p = parseHash();
      renderPage(p.route, p.anchor);
    });

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', start);
    } else {
      start();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();