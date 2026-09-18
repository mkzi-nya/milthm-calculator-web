/* Milthm Wiki 单页应用
 * 由 build/build.py 复制到 wiki/app.js，请勿直接修改本文件（应修改 build/app.js）。
 * 依赖：marked、markedKatex、katex、highlight.js
 * 注入：window.WIKI_NAV
 */
(function () {
  'use strict';

  var NAV = window.WIKI_NAV || { groups: [], songs: [], songSearchUrl: 'index.html#/songs' };
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
    Object.keys(NAV.documents || {}).forEach(function (base) {
      if (!ROUTES['/song/' + base]) ROUTES['/song/' + base] = { label: base, file: NAV.documents[base] };
    });
    (NAV.archived || []).forEach(function (s) { ROUTES[s.route] = { label: s.name, file: s.file }; });
    ROUTES['/songs'] = { label: '曲目列表', songIndex: true };
    if (!ROUTES['/']) {
      ROUTES['/'] = { label: '主页', file: NAV.homeFile || 'index.md' };
    }
  }

  function parseHash() {
    var hash = (location.hash || '#/').slice(1);
    if (hash.charAt(0) !== '/') return { route: '/', anchor: decodeSafe(hash), query: '' };
    var split = hash.indexOf('#');
    var anchor = split < 0 ? '' : decodeSafe(hash.slice(split + 1));
    var path = split < 0 ? hash : hash.slice(0, split);
    var query = path.indexOf('?');
    return { route: query < 0 ? path : path.slice(0, query), anchor: anchor,
      query: query < 0 ? '' : new URLSearchParams(path.slice(query + 1)).get('q') || '' };
  }

  function legacySongRoute(value) {
    var normalized = String(value || '').normalize('NFKC').trim().toLowerCase();
    var base = Object.keys(NAV.documents || {}).find(function (b) { return b.toLowerCase() === normalized; });
    if (base) return '/song/' + base;
    var matches = SONGS.filter(function (s) {
      return (s.aliases || [s.name]).some(function (v) { return String(v).normalize('NFKC').trim().toLowerCase() === normalized; });
    });
    var archived = (NAV.archived || []).find(function (s) { return s.name.normalize('NFKC').trim().toLowerCase() === normalized; });
    return matches.length === 1 ? matches[0].route : archived ? archived.route : '/songs?q=' + encodeURIComponent(value);
  }

  function migrateLegacyQuery() {
    if (!location.search) return;
    var params = new URLSearchParams(location.search);
    var value = params.get('song') || params.get('q');
    if (value === null && location.search.indexOf('=') < 0) value = decodeSafe(location.search.slice(1));
    if (value === null) return;
    var anchor = parseHash().anchor;
    history.replaceState(null, '', location.pathname + routeToHash(legacySongRoute(value)) + (anchor ? '#' + encodeURIComponent(anchor) : ''));
  }

  function anchorUrl(id) { return routeToHash(currentRoute) + '#' + encodeURIComponent(id); }
  function navigateAnchor(id) {
    var target = anchorUrl(decodeSafe(id));
    if (location.hash === target) scrollToAnchor(decodeSafe(id));
    else location.hash = target;
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
      closeTocPanel();
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

  function openSidebar() { closeTocPanel(); $('sidebar').classList.add('on'); $('scrim').classList.add('on'); }
  function closeSidebar() { $('sidebar').classList.remove('on'); $('scrim').classList.remove('on'); }

  /* ---------------- 右侧栏（总览） ---------------- */
  var tocPanel = null;
  var tocSearch = null;
  var tocList = null;
  var tocScope = 'headings'; // 'headings' | 'songs'
  var tocCollapseState = { '__all__': true };
  var tocScrollFrame = 0;

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

  function openTocPanel() {
    closeSidebar();
    if (tocPanel) tocPanel.classList.add('on');
    if (!isDesktop()) $('scrim').classList.add('on');
  }
  function closeTocPanel() {
    if (tocPanel) tocPanel.classList.remove('on');
    $('scrim').classList.remove('on');
  }

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
      var chapters = [];
      var grouped = {};
      SONGS.forEach(function (song) {
        var chapter = song.chapter || '未分组';
        if (!grouped[chapter]) { grouped[chapter] = []; chapters.push(chapter); }
        grouped[chapter].push(song);
      });
      appendSongTocGroup('全部歌曲', '__all__', SONGS.slice().sort(compareSongNames), true);
      chapters.forEach(function (chapter) {
        appendSongTocGroup(chapter, chapter, grouped[chapter], false);
      });
      focusCurrentSongInToc(currentRoute);
      return;
    }
    if (!mdBody) return;
    var hs = mdBody.querySelectorAll(currentRoute === '/charter' ? 'h2' : 'h2,h3');
    var maxToc = Infinity;
    var count = 0;
    hs.forEach(function (h) {
      if (count >= maxToc) return;
      if (!h.id) return;
      var d = document.createElement('a');
      d.className = 'sb-item toc' + (h.tagName === 'H3' ? ' lv3' : '');
      d.textContent = h.textContent;
      d.dataset.headingId = h.id;
      d.href = anchorUrl(h.id);
      d.addEventListener('click', function (e) {
        e.preventDefault();
        closeTocPanel();
        navigateAnchor(h.id);
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
    updateTocHeadingFromScroll();
  }

  function compareSongNames(a, b) {
    return String(a.name || a.label).localeCompare(String(b.name || b.label), 'zh-Hans-CN', {
      numeric: true, sensitivity: 'base'
    });
  }

  function appendSongTocGroup(label, key, songs, defaultCollapsed) {
    var group = document.createElement('section');
    group.className = 'toc-group' + (key === '__all__' ? ' toc-all' : '');
    group.dataset.groupKey = key;
    var collapsed = Object.prototype.hasOwnProperty.call(tocCollapseState, key)
      ? tocCollapseState[key] : defaultCollapsed;
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'sb-chapter toc-group-toggle';
    toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    var text = document.createElement('span');
    text.textContent = label;
    var icon = document.createElement('span');
    icon.className = 'toc-group-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = collapsed ? '⌄' : '^';
    toggle.appendChild(text);
    toggle.appendChild(icon);
    var body = document.createElement('div');
    body.className = 'toc-group-items';
    body.hidden = collapsed;
    songs.forEach(function (song) {
      body.appendChild(buildListItem(song.name || song.label, song.route, 'song', 'sb-song'));
    });
    toggle.addEventListener('click', function () {
      var nextCollapsed = toggle.getAttribute('aria-expanded') === 'true';
      tocCollapseState[key] = nextCollapsed;
      toggle.setAttribute('aria-expanded', nextCollapsed ? 'false' : 'true');
      icon.textContent = nextCollapsed ? '⌄' : '^';
      body.hidden = nextCollapsed;
    });
    group.appendChild(toggle);
    group.appendChild(body);
    tocList.appendChild(group);
  }

  function scrollTocItemToTop(item) {
    if (!tocList || !item) return;
    var desired = tocList.scrollTop + item.getBoundingClientRect().top - tocList.getBoundingClientRect().top;
    var group = item.closest('.toc-group');
    var sticky = group && group.querySelector('.toc-group-toggle');
    if (sticky) desired -= sticky.offsetHeight;
    var max = Math.max(0, tocList.scrollHeight - tocList.clientHeight);
    tocList.scrollTo({ top: Math.max(0, Math.min(desired, max)), behavior: 'auto' });
  }

  function setCurrentTocItem(item) {
    if (!tocList || !item || item.classList.contains('cur')) return;
    tocList.querySelectorAll('.sb-item.cur').forEach(function (node) { node.classList.remove('cur'); });
    item.classList.add('cur');
    scrollTocItemToTop(item);
  }

  function focusCurrentSongInToc(route) {
    if (!tocList || !/^\/song\//.test(route || '')) return;
    var candidates = Array.from(tocList.querySelectorAll('.sb-item[data-route]')).filter(function (item) {
      return item.dataset.route === route && !item.closest('.toc-all');
    });
    var item = candidates[0] || Array.from(tocList.querySelectorAll('.sb-item[data-route]')).find(function (node) {
      return node.dataset.route === route;
    });
    if (!item) return;
    var group = item.closest('.toc-group');
    if (group) {
      var toggle = group.querySelector('.toc-group-toggle');
      var body = group.querySelector('.toc-group-items');
      tocCollapseState[group.dataset.groupKey] = false;
      toggle.setAttribute('aria-expanded', 'true');
      toggle.querySelector('.toc-group-icon').textContent = '^';
      body.hidden = false;
    }
    requestAnimationFrame(function () { setCurrentTocItem(item); });
  }

  function updateTocHeadingFromScroll() {
    if (tocScope !== 'headings' || !tocList || !mdBody) return;
    var links = Array.from(tocList.querySelectorAll('.sb-item[data-heading-id]'));
    if (!links.length) return;
    var head = $('pageHead');
    var threshold = head && head.offsetHeight ? head.offsetHeight + 26 : 14;
    var current = links[0];
    links.forEach(function (link) {
      var heading = document.getElementById(link.dataset.headingId);
      if (heading && heading.getBoundingClientRect().top <= threshold) current = link;
    });
    setCurrentTocItem(current);
  }

  function scheduleTocScrollUpdate() {
    if (tocScrollFrame) return;
    tocScrollFrame = requestAnimationFrame(function () {
      tocScrollFrame = 0;
      updateTocHeadingFromScroll();
    });
  }

  function filterToc(q) {
    if (!tocList) return;
    q = String(q || '').replace(/^\s+|\s+$/g, '').toLowerCase();
    if (tocScope === 'songs') {
      tocList.querySelectorAll('.toc-group').forEach(function (group) {
        var hits = 0;
        group.querySelectorAll('.sb-item').forEach(function (item) {
          var hit = !q || item.textContent.toLowerCase().indexOf(q) >= 0
            || (item.dataset.route || '').toLowerCase().indexOf(q) >= 0;
          item.style.display = hit ? '' : 'none';
          if (hit) hits++;
        });
        group.hidden = !!q && !hits;
        var body = group.querySelector('.toc-group-items');
        body.hidden = q ? false : !!tocCollapseState[group.dataset.groupKey];
      });
      return;
    }
    var items = tocList.querySelectorAll('.sb-item');
    items.forEach(function (a) {
      var hit = !q || a.textContent.toLowerCase().indexOf(q) >= 0
        || (a.dataset.route || '').toLowerCase().indexOf(q) >= 0;
      a.style.display = hit ? '' : 'none';
    });
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
    var head = $('pageHead');
    var offset = head && head.offsetHeight ? head.offsetHeight + 24 : 12;
    var y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo(0, Math.max(0, y));
  }

  var pageRequest = 0;
  var renderedRoute = null;
  function renderPage(route, anchor) {
    closeInfo();
    var request = ++pageRequest;
    var entry = ROUTES[route] || ROUTES['/'];
    if (/^garden/.test(route)) {
      window.location.href = 'garden.html';
      return;
    }
    if (route === '/song-search') { route = '/songs'; entry = ROUTES['/songs']; }
    currentRoute = route;
    renderedRoute = null;
    mdBody.classList.toggle('people-page', ['/artist', '/charter', '/illustrator'].indexOf(route) >= 0);
    updateSidebarActive(route);
    updateSidebarForRoute(route);
    updateTocForRoute(route);
    if (entry.songIndex) {
      setPageTitle(entry.label);
      renderSongIndex();
      renderedRoute = route;
      if (anchor) scrollToAnchor(anchor); else window.scrollTo(0, 0);
      return;
    }
    setPageTitle('加载中…');
    fetchMd(entry.file)
      .then(function (md) {
        if (request !== pageRequest) return;
        renderMarkdown(md, entry);
        renderedRoute = route;
      })
      .then(function () {
        if (request !== pageRequest) return;
        if (anchor) scrollToAnchor(anchor); else window.scrollTo(0, 0);
      })
      .catch(function (err) {
        if (request !== pageRequest) return;
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
      hlink.href = anchorUrl(h.id);
      hlink.addEventListener('click', function (e) { e.preventDefault(); navigateAnchor(h.id); });
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
          return (s.name || s.label).toLowerCase().indexOf(q) >= 0 || (s.chapter || '').toLowerCase().indexOf(q) >= 0 || (s.artist || '').toLowerCase().indexOf(q) >= 0 || (s.aliases || []).join(' ').toLowerCase().indexOf(q) >= 0;
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
    search.value = parseHash().query;
    apply(search.value);

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
    var result = String(md).replace(/\]\(info:(info\(.*?\))\)/g, function (m, payload) {
      return '](info:' + encodeInfoTarget(payload) + ')';
    });
    return result.replace(/^(!\[[^\]]*\]\()(\.\.\/\.\.\/jpgs\/.+)(\))\s*$/gm, function (m, open, target, close) {
      if (target.charAt(0) === '<' && target.charAt(target.length - 1) === '>') return m;
      return open + '<' + target + '>' + close;
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
    var ids = new Set();
    contentRoot.querySelectorAll('h1,h2,h3,h4').forEach(function (h) {
      var base = h.id || h.textContent.toLowerCase().replace(/\s+/g, '-');
      var id = base, number = 2;
      while (ids.has(id)) id = base + '-' + number++;
      ids.add(id); h.id = id;
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
    if (entry && /^song\//.test(entry.file || '')) {
      contentRoot.querySelectorAll('img[src^="../../"]').forEach(function (img) {
        img.src = new URL(img.getAttribute('src'), new URL(entry.file, location.href)).href;
      });
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
      if (/^\/song\//.test(currentRoute) && href === './') {
        href = '#/songs';
        a.href = href;
      }
      if (!href.startsWith('info:')) {
        try {
          var url = new URL(href, location.href);
          var wikiPath = new URL('./', location.href).pathname;
          if (url.origin === location.origin && url.pathname.startsWith(wikiPath)) {
            var value = url.searchParams.get('song') || url.searchParams.get('q');
            if (value && /(?:\/song(?:\/index\.html|\/)?|\/index\.html|\/)$/.test(url.pathname)) {
              href = routeToHash(legacySongRoute(value));
              a.href = href + (url.hash ? '#' + url.hash.slice(1) : '');
            }
          }
        } catch (_) {}
      }
      if (href.charAt(0) === '#' && href.indexOf('#/') !== 0) {
        var id = decodeSafe(href.slice(1));
        a.href = anchorUrl(id);
        a.addEventListener('click', function (e) { e.preventDefault(); navigateAnchor(id); });
      } else if (decodeSafe(href) === 'info:download') {
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

  /* One reusable card; immutable resource data and a request token prevent stale hover results. */
  var resourcePromise = null;
  var infoCard = null;
  var infoLink = null;
  var infoRequest = 0;
  var hideTimer = null;

  function decodeSafe(value) {
    try { return decodeURIComponent(value); } catch (_) { return value; }
  }

  function parseInfoKeyFromAnchor(anchor) {
    var match = decodeSafe(anchor.getAttribute('href') || '').match(/^info:info\((.*)\)$/);
    if (!match) return null;
    try {
      var args = JSON.parse('[' + match[1] + ']');
      if (args.length < 1 || args.length > 2 || args.some(function (v) { return typeof v !== 'string'; })) return null;
      return args;
    } catch (_) { return null; }
  }

  function loadResources() {
    if (!resourcePromise) {
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 12000);
      resourcePromise = fetch('../resources/resources.json', { signal: controller.signal }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      }).catch(function (error) { resourcePromise = null; throw new Error(error.name === 'AbortError' ? '加载超时，请重试' : '曲目信息加载失败，请重试'); }).finally(function () { clearTimeout(timeout); });
    }
    return resourcePromise;
  }

  function closeInfo() {
    ++infoRequest;
    clearTimeout(hideTimer);
    if (infoCard) infoCard.hidden = true;
    if (infoLink) infoLink.setAttribute('aria-expanded', 'false');
    infoLink = null;
  }

  function scheduleInfoHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      if (infoCard && (infoCard.matches(':hover') || infoCard.contains(document.activeElement))) return;
      if (infoLink && (infoLink.matches(':hover') || infoLink === document.activeElement)) return;
      closeInfo();
    }, 200);
  }

  function getInfoCard() {
    if (infoCard) return infoCard;
    infoCard = document.createElement('aside');
    infoCard.id = 'wiki-info-card';
    infoCard.className = 'info-card';
    infoCard.setAttribute('role', 'dialog');
    infoCard.setAttribute('aria-label', '曲目与谱面信息');
    infoCard.hidden = true;
    infoCard.addEventListener('mouseenter', function () { clearTimeout(hideTimer); });
    infoCard.addEventListener('mouseleave', scheduleInfoHide);
    infoCard.addEventListener('focusout', scheduleInfoHide);
    document.body.appendChild(infoCard);
    document.addEventListener('pointerdown', function (event) {
      if (infoLink && !infoCard.contains(event.target) && !infoLink.contains(event.target)) closeInfo();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && infoLink) {
        var link = infoLink;
        link.focus();
        closeInfo();
      }
    });
    window.addEventListener('resize', placeInfoCard);
    window.addEventListener('scroll', function (event) {
      if (!infoCard.contains(event.target)) placeInfoCard();
    }, true);
    return infoCard;
  }

  function placeInfoCard() {
    if (!infoLink || !infoCard || infoCard.hidden) return;
    var rect = infoLink.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) { closeInfo(); return; }
    var width = infoCard.offsetWidth, height = infoCard.offsetHeight;
    var left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
    var top = rect.bottom + 8;
    if (top + height > window.innerHeight - 12) top = rect.top - height - 8;
    top = Math.max(12, Math.min(top, window.innerHeight - height - 12));
    infoCard.style.left = left + 'px';
    infoCard.style.top = top + 'px';
  }

  function infoShell(html) {
    var card = getInfoCard();
    card.innerHTML = '<button type="button" class="info-close" aria-label="关闭信息卡片">×</button>' + html;
    card.querySelector('.info-close').addEventListener('click', function () {
      var link = infoLink;
      if (link) link.focus();
      closeInfo();
    });
    card.hidden = false;
    placeInfoCard();
  }

  function normalizeInfoTitle(value) {
    return String(value).normalize('NFKC').replace(/[()]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function displayValue(value) {
    if (Array.isArray(value)) return value.join('、');
    return value == null || value === '' ? '暂无数据' : String(value);
  }

  function showInfo(a) {
    var args = parseInfoKeyFromAnchor(a);
    if (!args) return;
    clearTimeout(hideTimer);
    if (infoLink && infoLink !== a) infoLink.setAttribute('aria-expanded', 'false');
    infoLink = a;
    a.setAttribute('aria-expanded', 'true');
    var request = ++infoRequest;
    infoShell('<p class="info-eyebrow">MILTHM WIKI</p><p role="status">正在加载曲目信息…</p>');
    loadResources().then(function (resources) {
      if (request !== infoRequest || !a.isConnected) return;
      var title = Object.prototype.hasOwnProperty.call(resources, args[0]) ? args[0] : Object.keys(resources).find(function (key) {
        return normalizeInfoTitle(key) === normalizeInfoTitle(args[0]) || normalizeInfoTitle(resources[key].latinTitle) === normalizeInfoTitle(args[0]);
      });
      if (!title) {
        var archived = (NAV.archived || []).find(function (s) { return normalizeInfoTitle(s.name) === normalizeInfoTitle(args[0]); });
        if (!archived) throw new Error('未找到此曲目');
        infoShell('<p class="info-eyebrow">历史文档</p><h2>' + esc(archived.name) + '</h2><p>当前版本数据未收录此曲目，历史信息请查看文档。</p><div class="info-actions"><a href="' + routeToHash(archived.route) + '">查看历史文档 ↗</a></div>');
        return;
      }
      var song = resources[title];
      var difficulty = args[1];
      var chart = difficulty && (song.difficulty || {})[difficulty];
      if (difficulty && !chart) throw new Error('未找到此难度');
      var entry = SONGS.find(function (s) { return s.name === title; });
      var rows = chart ? [['谱师', chart.charter || chart.chartersList], ['定数', chart.difficultyValue], ['时长', chart['谱面时长']]] :
        [['曲师', song.artist || song.artistsList], ['画师', song.illustratorsList || song.illustrator], ['曲包', song.chapter_zh_hans || song.chapter]];
      var charts = chart ? [chart] : Object.values(song.difficulty || {});
      var bpms = [];
      charts.forEach(function (c) { (c.bpmInfo || []).forEach(function (b) { if (bpms.indexOf(b.bpm) < 0) bpms.push(b.bpm); }); });
      if (bpms.length) rows.push(['BPM', bpms.sort(function (a, b) { return a - b; }).join(' / ')]);
      var html = '<p class="info-eyebrow">' + esc(difficulty || '曲目信息') + '</p><h2>' + esc(title) + '</h2>';
      if (song.latinTitle && song.latinTitle !== title) html += '<p class="info-subtitle">' + esc(song.latinTitle) + '</p>';
      html += '<dl class="info-details">' + rows.map(function (row) { return '<div><dt>' + esc(row[0]) + '</dt><dd>' + esc(displayValue(row[1])) + '</dd></div>'; }).join('') + '</dl>';
      if (chart) {
        html += '<div class="info-metrics">' + [['Combo', 'combo'], ['Tap', 'tap'], ['Drag', 'drag'], ['Hold', 'hold'], ['EX', 'ex'], ['有判数', '有判数']].map(function (pair) {
          return '<div><strong>' + esc(displayValue(chart[pair[1]])) + '</strong><span>' + pair[0] + '</span></div>';
        }).join('') + '</div>';
        html += '<p class="info-subtitle">有判占比 ' + esc(displayValue(chart['有判占比'])) + '% · 单 note 得分 ' + esc(displayValue(chart['单note'])) + '</p>';
        if (chart.error) html += '<p>此谱面统计可能有误。</p>';
      }
      var gameId = chart ? 'chartid=' + chart.chartid : song.songid;
      html += '<div class="info-actions">';
      if (entry) html += '<a href="' + routeToHash(entry.route) + '">曲目详情 ↗</a>';
      if (gameId) html += '<a href="https://milt.hm/songlist/All/?q=' + encodeURIComponent(gameId) + '" target="_blank" rel="noopener noreferrer">进入游戏 ↗</a>';
      html += '</div>';
      var tags = chart ? chart.tags : song.tags;
      if (tags && tags.length) html += '<details class="info-tags"><summary>标签 · ' + tags.length + '</summary><p>' + esc(tags.join(' · ')) + '</p></details>';
      infoShell(html);
    }).catch(function (error) {
      if (request !== infoRequest) return;
      infoShell('<p role="status">' + esc(error.message) + '</p><button type="button" class="info-retry">重新加载</button>');
      infoCard.querySelector('.info-retry').addEventListener('click', function () { showInfo(a); });
    });
  }

  function bindTooltip(a) {
    if (!parseInfoKeyFromAnchor(a)) return;
    a.setAttribute('aria-haspopup', 'dialog');
    a.setAttribute('aria-controls', 'wiki-info-card');
    a.setAttribute('aria-expanded', 'false');
    a.addEventListener('mouseenter', function () { showInfo(a); });
    a.addEventListener('mouseleave', scheduleInfoHide);
    a.addEventListener('focus', function () { showInfo(a); });
    a.addEventListener('blur', scheduleInfoHide);
    a.addEventListener('click', function (event) { event.preventDefault(); showInfo(a); });
    a.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowDown' && infoCard && !infoCard.hidden) {
        event.preventDefault(); infoCard.querySelector('button').focus();
      }
    });
  }

  function bindInfoLinks(root) {
    if (root.querySelector('a[href^="info:"]')) loadResources().catch(function () {});
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
    $('scrim').addEventListener('click', function () { closeSidebar(); closeTocPanel(); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { closeSidebar(); closeTocPanel(); }
    });
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', scheduleTocScrollUpdate, { passive: true });

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
      migrateLegacyQuery();
      var p = parseHash();
      renderPage(p.route, p.anchor);
    }

    window.addEventListener('hashchange', function () {
      if (!content.firstChild) initContent();
      closeInfo();
      var p = parseHash();
      if (p.route === renderedRoute) { if (p.anchor) scrollToAnchor(p.anchor); else window.scrollTo(0, 0); }
      else renderPage(p.route, p.anchor);
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
