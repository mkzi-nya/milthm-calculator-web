(() => {
  'use strict';

  const DEFAULT_API_HOST = 'milkloud.milthm.cn';
  const VALID_API_HOSTS = new Set(['milkloud.milthm.cn', 'milkloud.milthm.com']);
  const STORAGE_KEY = 'milthmCalc.milkloud.settings.v1';
  const VALID_PREFERENCES = new Set(['auto', 'touch', 'keyboard', 'mixed']);
  const GRADE_TO_LEVEL = Object.freeze({ R: 0, M: 1, SS: 2, S: 3, A: 4, B: 5, C: 6, F: 7 });
  const REQUEST_TIMEOUT_MS = 20000;
  const REQUEST_RETRY_DELAYS = Object.freeze([0, 800, 1800]);
  const PARSER_RETRY_DELAYS = Object.freeze([0, 120, 360, 900]);

  const FALLBACK_TEXT = Object.freeze({
    milkloudCardTitle: 'Milkloud 令牌',
    currentToken: '当前令牌：',
    notConfigured: '未配置',
    playRecordPreference: '游玩记录偏好：',
    manageToken: '管理令牌',
    getPlayRecords: '获取游玩记录',
    milkloudModalTitle: 'Milkloud 令牌管理',
    milkloudHelpPrefix: '获取您的Milkloud令牌并填入此处，详见',
    milkloudHelpLink: '帮助信息',
    milkloudSavedTokens: '已保存令牌',
    milkloudAddToken: '添加令牌',
    milkloudTokenPlaceholder: 'Authorzation: Basic …',
    milkloudAddAndVerify: '添加并验证',
    milkloudPrivacyNotice: '该令牌只存储于您的设备，请妥善管理您的令牌。',
    milkloudApiAddress: 'API 地址',
    milkloudPreferenceTitle: '游玩记录偏好',
    preferenceAuto: '自动',
    preferenceTouch: '触摸端',
    preferenceKeyboard: '键盘端',
    preferenceMixed: '混合',
    close: '关闭',
    delete: '删除',
    milkloudNoTokens: '尚未添加令牌',
    milkloudUseTokenTitle: '使用此令牌',
    milkloudUnknownUser: '未知用户',
    milkloudTokenId: 'ID：{id}',
    milkloudUnverified: '尚未记录用户信息',
    milkloudEmptyToken: '令牌不能为空。',
    milkloudDuplicateToken: '该令牌已经存在。',
    milkloudVerifying: '正在验证令牌…',
    milkloudAddedSelected: '已添加并选中：{username}',
    milkloudDeleteConfirm: '删除用户“{username}”的令牌？',
    milkloudDeleted: '令牌已删除。',
    milkloudSaveSettingsError: '无法保存令牌设置：{message}',
    milkloudRequestTimeout: '请求超时（{seconds} 秒）。',
    milkloudNetworkRequestFailed: '网络请求失败：{message}',
    milkloudInvalidJson: '服务器没有返回有效 JSON。',
    milkloudRequestFailed: '请求失败。',
    milkloudUserNoUsername: '用户接口没有返回 username。',
    milkloudFetchingRecords: '正在获取 B20 游玩记录…',
    milkloudNoRecords: '所选模式没有可用的 B20 记录。',
    milkloudParserIncomplete: '数据已填入输入框，但自动解析未完成：{message}',
    milkloudImportedRecords: '已导入 {count} 条{source}记录。',
    milkloudRealitySummary: 'Touch Reality: {touch} · Keyboard Reality: {keyboard}',
    milkloudRankIncomplete: 'Rank 接口暂未返回记录数组。',
    milkloudRetryingRank: '服务器暂未返回完整记录，正在重试（{current}/{total}）…',
    milkloudRankFailed: '无法获取 Rank 数据。',
    milkloudMissingInput: '未找到数据处理输入框。',
    milkloudParserLoading: '数据解析器尚未加载。',
    milkloudParserNotReady: '数据解析器未就绪。',
    milkloudUnknown: '未知错误',
    milkloudNetworkHelp: '请检查令牌是否仍有效，并稍后重试。',
    milkloudSourceTouch: '触摸端',
    milkloudSourceKeyboard: '键盘端',
    milkloudSourceMixed: '混合端',
    milkloudRealityUnknown: '未知'
  });

  let state = loadState();
  let busy = false;

  function interpolate(template, variables = {}) {
    return String(template).replace(/\{(\w+)\}/g, (match, key) =>
      Object.prototype.hasOwnProperty.call(variables, key) ? String(variables[key]) : match
    );
  }

  function t(key, variables = {}) {
    if (typeof globalThis.i18nT === 'function') {
      const translated = globalThis.i18nT(key, variables);
      if (translated !== key) return translated;
    }
    return interpolate(FALLBACK_TEXT[key] ?? key, variables);
  }

  function cloneDefaultState() {
    return { tokens: [], activeTokenId: null, preference: 'auto', apiHost: DEFAULT_API_HOST };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (!parsed || typeof parsed !== 'object') return cloneDefaultState();

      const tokens = Array.isArray(parsed.tokens)
        ? parsed.tokens
          .filter(token => token && typeof token.authorization === 'string')
          .map(token => ({
            id: String(token.id || makeId()),
            authorization: normalizeAuthorization(token.authorization),
            username: String(token.username || ''),
            nickname: String(token.nickname || ''),
            uid: String(token.uid || ''),
            verifiedApiHost: VALID_API_HOSTS.has(token.verifiedApiHost) ? token.verifiedApiHost : ''
          }))
        : [];

      let activeTokenId = parsed.activeTokenId == null ? null : String(parsed.activeTokenId);
      if (!tokens.some(token => token.id === activeTokenId)) {
        activeTokenId = tokens[0]?.id || null;
      }

      return {
        tokens,
        activeTokenId,
        preference: VALID_PREFERENCES.has(parsed.preference) ? parsed.preference : 'auto',
        apiHost: VALID_API_HOSTS.has(parsed.apiHost) ? parsed.apiHost : DEFAULT_API_HOST
      };
    } catch (error) {
      console.warn('[Milkloud] Failed to load local token settings:', error);
      return cloneDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      throw new Error(t('milkloudSaveSettingsError', { message: error.message }));
    }
  }

  function makeId() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `mil-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }

  function normalizeAuthorization(value) {
    let result = String(value || '').trim();
    result = result.replace(/^Authorization\s*:\s*/i, '').trim();
    if (!result) throw new Error(t('milkloudEmptyToken'));
    if (!/^Basic\s+/i.test(result)) result = `Basic ${result}`;
    result = result.replace(/^Basic\s+/i, 'Basic ');
    if (result === 'Basic ') throw new Error(t('milkloudEmptyToken'));
    return result;
  }

  function activeToken() {
    return state.tokens.find(token => token.id === state.activeTokenId) || null;
  }

  function preferenceLabel(preference) {
    const key = {
      auto: 'preferenceAuto',
      touch: 'preferenceTouch',
      keyboard: 'preferenceKeyboard',
      mixed: 'preferenceMixed'
    }[preference] || 'preferenceAuto';
    return t(key);
  }

  function injectStyles() {
    if (document.getElementById('milkloud-style')) return;
    const style = document.createElement('style');
    style.id = 'milkloud-style';
    style.textContent = `
      #milkloud-card .milkloud-summary {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
      }
      #milkloud-card .milkloud-meta { min-width: 0; line-height: 1.8; }
      #milkloud-card .milkloud-meta strong { color: turquoise; }
      #milkloud-card .milkloud-actions { margin-top: 14px; }
      #milkloud-card .milkloud-status {
        display: block;
        min-height: 1.5em;
        margin-top: 10px;
        white-space: pre-wrap;
        word-break: break-word;
        color: #b9c2d0;
      }
      #milkloud-card .milkloud-status[data-type="error"] { color: #ff8d8d; }
      #milkloud-card .milkloud-status[data-type="success"] { color: #8fe0a5; }
      #milkloud-card .milkloud-status[data-type="working"] { color: #e8d582; }
      #milkloud-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.72);
        z-index: 12000;
      }
      #milkloud-modal {
        display: none;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 12001;
        width: min(720px, calc(100vw - 28px));
        max-height: min(82vh, 760px);
        overflow: auto;
        box-sizing: border-box;
        padding: 22px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 14px;
        background: #24262b;
        color: #f1f3f5;
        box-shadow: 0 18px 70px rgba(0, 0, 0, 0.65);
      }
      #milkloud-modal * { box-sizing: border-box; }
      #milkloud-modal h3 { margin: 0 0 14px; text-align: center; }
      #milkloud-modal h4 { margin: 18px 0 10px; color: turquoise; }
      #milkloud-modal .milkloud-help,
      #milkloud-modal .milkloud-privacy {
        margin: 8px 0;
        color: #b9c2d0;
        font-size: 13px;
        line-height: 1.6;
      }
      #milkloud-modal .milkloud-help a { color: lightblue; }
      #milkloud-modal .milkloud-form-row {
        display: grid;
        grid-template-columns: minmax(220px, 1fr) auto;
        gap: 8px;
        align-items: center;
      }
      #milkloud-modal .milkloud-setting-row {
        display: grid;
        grid-template-columns: minmax(110px, auto) minmax(220px, 1fr);
        gap: 10px;
        align-items: center;
        margin: 12px 0 4px;
      }
      #milkloud-modal .milkloud-setting-row label {
        color: #d8dde5;
        font-size: 14px;
      }
      #milkloud-modal input,
      #milkloud-modal select {
        width: 100%;
        min-height: 38px;
        padding: 7px 10px;
        border: 1px solid #555c66;
        border-radius: 8px;
        background: #34373e;
        color: #fff;
      }
      #milkloud-modal input:focus,
      #milkloud-modal select:focus { outline: none; border-color: turquoise; }
      #milkloud-token-list { display: grid; gap: 8px; }
      .milkloud-token-item {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        gap: 10px;
        align-items: center;
        padding: 10px 12px;
        border: 1px solid #444a54;
        border-radius: 10px;
        background: #2d3036;
      }
      .milkloud-token-item[data-active="true"] {
        border-color: turquoise;
        background: #29373a;
      }
      .milkloud-token-title,
      .milkloud-token-detail {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .milkloud-token-title { font-weight: 600; }
      .milkloud-token-detail { color: #adb5bd; font-size: 12px; margin-top: 3px; }
      .milkloud-empty {
        padding: 16px;
        border: 1px dashed #555c66;
        border-radius: 10px;
        text-align: center;
        color: #adb5bd;
      }
      #milkloud-modal .milkloud-modal-status {
        min-height: 1.5em;
        margin-top: 8px;
        white-space: pre-wrap;
        color: #b9c2d0;
      }
      #milkloud-modal .milkloud-modal-status[data-type="error"] { color: #ff8d8d; }
      #milkloud-modal .milkloud-modal-status[data-type="success"] { color: #8fe0a5; }
      #milkloud-modal .milkloud-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        margin-top: 20px;
      }
      #milkloud-modal button[disabled],
      #milkloud-card button[disabled] { cursor: wait; opacity: 0.62; }
      @media (max-width: 620px) {
        #milkloud-card .milkloud-summary { grid-template-columns: 1fr; }
        #milkloud-modal .milkloud-form-row,
        #milkloud-modal .milkloud-setting-row { grid-template-columns: 1fr; }
        .milkloud-token-item { grid-template-columns: auto minmax(0, 1fr); }
        .milkloud-token-delete { grid-column: 1 / -1; width: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  function buildModal() {
    if (document.getElementById('milkloud-modal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'milkloud-overlay';
    overlay.addEventListener('click', closeModal);

    const modal = document.createElement('div');
    modal.id = 'milkloud-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'milkloud-modal-title');
    modal.innerHTML = `
      <h3 id="milkloud-modal-title" data-i18n="milkloudModalTitle">Milkloud 令牌管理</h3>
      <p class="milkloud-help">
        <span data-i18n="milkloudHelpPrefix">获取您的Milkloud令牌并填入此处，详见</span>
        <a href="./usage/milkloud.html" target="_blank" rel="noopener" data-i18n="milkloudHelpLink">帮助信息</a>
      </p>

      <div class="milkloud-setting-row">
        <label for="milkloud-api-host" data-i18n="milkloudApiAddress">API 地址</label>
        <select id="milkloud-api-host">
          <option value="milkloud.milthm.cn">milkloud.milthm.cn</option>
          <option value="milkloud.milthm.com">milkloud.milthm.com</option>
        </select>
      </div>

      <h4 data-i18n="milkloudSavedTokens">已保存令牌</h4>
      <div id="milkloud-token-list"></div>

      <h4 data-i18n="milkloudAddToken">添加令牌</h4>
      <div class="milkloud-form-row">
        <input id="milkloud-token-value" type="text" name="milkloud-token-entry"
          autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
          data-lpignore="true" data-1p-ignore="true"
          data-i18n-placeholder="milkloudTokenPlaceholder" placeholder="Authorzation: Basic …">
        <button id="milkloud-add-token" type="button" class="layui-btn layui-btn-primary"
          data-i18n="milkloudAddAndVerify">添加并验证</button>
      </div>
      <p class="milkloud-privacy" data-i18n="milkloudPrivacyNotice">该令牌只存储于您的设备，请妥善管理您的令牌。</p>
      <div id="milkloud-modal-status" class="milkloud-modal-status" aria-live="polite"></div>

      <h4 data-i18n="milkloudPreferenceTitle">游玩记录偏好</h4>
      <select id="milkloud-preference">
        <option value="auto" data-i18n="preferenceAuto">自动</option>
        <option value="touch" data-i18n="preferenceTouch">触摸端</option>
        <option value="keyboard" data-i18n="preferenceKeyboard">键盘端</option>
        <option value="mixed" data-i18n="preferenceMixed">混合</option>
      </select>

      <div class="milkloud-footer">
        <button id="milkloud-close-modal" type="button" class="layui-btn layui-btn-primary"
          data-i18n="close">关闭</button>
      </div>
    `;

    document.body.append(overlay, modal);
    if (typeof globalThis.applyI18n === 'function') globalThis.applyI18n(modal);

    document.getElementById('milkloud-close-modal').addEventListener('click', closeModal);
    document.getElementById('milkloud-add-token').addEventListener('click', addTokenFromForm);
    document.getElementById('milkloud-token-value').addEventListener('keydown', event => {
      if (event.key === 'Enter') addTokenFromForm();
    });
    document.getElementById('milkloud-api-host').addEventListener('change', event => {
      const apiHost = event.target.value;
      if (!VALID_API_HOSTS.has(apiHost)) return;
      state.apiHost = apiHost;
      saveState();
      setModalStatus('');
    });
    document.getElementById('milkloud-preference').addEventListener('change', event => {
      const preference = event.target.value;
      if (!VALID_PREFERENCES.has(preference)) return;
      state.preference = preference;
      saveState();
      renderSummary();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.style.display === 'block') closeModal();
    });
  }

  function openModal() {
    buildModal();
    renderTokenList();
    document.getElementById('milkloud-api-host').value = state.apiHost;
    document.getElementById('milkloud-preference').value = state.preference;
    setModalStatus('');
    document.getElementById('milkloud-overlay').style.display = 'block';
    document.getElementById('milkloud-modal').style.display = 'block';
  }

  function closeModal() {
    const overlay = document.getElementById('milkloud-overlay');
    const modal = document.getElementById('milkloud-modal');
    if (overlay) overlay.style.display = 'none';
    if (modal) modal.style.display = 'none';
  }

  function renderTokenList() {
    const list = document.getElementById('milkloud-token-list');
    if (!list) return;
    list.replaceChildren();

    if (state.tokens.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'milkloud-empty';
      empty.textContent = t('milkloudNoTokens');
      list.appendChild(empty);
      return;
    }

    for (const token of state.tokens) {
      const item = document.createElement('div');
      item.className = 'milkloud-token-item';
      item.dataset.active = String(token.id === state.activeTokenId);

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'milkloud-active-token';
      radio.checked = token.id === state.activeTokenId;
      radio.title = t('milkloudUseTokenTitle');
      radio.addEventListener('change', () => {
        state.activeTokenId = token.id;
        saveState();
        renderTokenList();
        renderSummary();
      });

      const info = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'milkloud-token-title';
      title.textContent = token.username || t('milkloudUnknownUser');
      const detail = document.createElement('div');
      detail.className = 'milkloud-token-detail';
      detail.textContent = token.uid
        ? t('milkloudTokenId', { id: token.uid })
        : t('milkloudUnverified');
      info.append(title, detail);

      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'layui-btn layui-btn-primary layui-btn-sm milkloud-token-delete';
      remove.textContent = t('delete');
      remove.addEventListener('click', () => removeToken(token.id));

      item.append(radio, info, remove);
      list.appendChild(item);
    }
  }

  function renderSummary() {
    const token = activeToken();
    const activeText = document.getElementById('milkloud-active-token');
    const preferenceText = document.getElementById('milkloud-preference-summary');
    const actions = document.getElementById('milkloud-actions');

    if (activeText) {
      activeText.textContent = token
        ? [token.username || t('milkloudUnknownUser'), token.uid].filter(Boolean).join(' · ')
        : t('notConfigured');
    }
    if (preferenceText) preferenceText.textContent = preferenceLabel(state.preference);
    if (actions) actions.style.display = token ? 'block' : 'none';
  }

  async function addTokenFromForm() {
    const valueInput = document.getElementById('milkloud-token-value');
    const button = document.getElementById('milkloud-add-token');

    let authorization;
    try {
      authorization = normalizeAuthorization(valueInput.value);
    } catch (error) {
      setModalStatus(error.message, 'error');
      return;
    }

    if (state.tokens.some(token => token.authorization === authorization)) {
      setModalStatus(t('milkloudDuplicateToken'), 'error');
      return;
    }

    button.disabled = true;
    setModalStatus(t('milkloudVerifying'));
    try {
      const user = await fetchCurrentUser(authorization);
      const token = {
        id: makeId(),
        authorization,
        username: String(user.username || ''),
        nickname: String(user.nickname || ''),
        uid: String(user.uid || ''),
        verifiedApiHost: state.apiHost
      };

      state.tokens.push(token);
      state.activeTokenId = token.id;
      saveState();

      valueInput.value = '';
      renderTokenList();
      renderSummary();
      setModalStatus(t('milkloudAddedSelected', { username: token.username || t('milkloudUnknownUser') }), 'success');
    } catch (error) {
      setModalStatus(formatRequestError(error), 'error');
    } finally {
      button.disabled = false;
    }
  }

  function removeToken(id) {
    const token = state.tokens.find(item => item.id === id);
    if (!token) return;
    const username = token.username || t('milkloudUnknownUser');
    if (!confirm(t('milkloudDeleteConfirm', { username }))) return;

    state.tokens = state.tokens.filter(item => item.id !== id);
    if (state.activeTokenId === id) state.activeTokenId = state.tokens[0]?.id || null;
    saveState();
    renderTokenList();
    renderSummary();
    setModalStatus(t('milkloudDeleted'), 'success');
  }

  function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, Math.max(0, milliseconds || 0)));
  }

  async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      return await fetch(url, { ...options, signal: controller.signal });
    } catch (error) {
      if (error?.name === 'AbortError') {
        const timeoutError = new Error(t('milkloudRequestTimeout', { seconds: Math.round(timeoutMs / 1000) }));
        timeoutError.cause = error;
        throw timeoutError;
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  function shouldRetryStatus(status) {
    return status === 408 || status === 425 || status === 429 || status >= 500;
  }

  function retryDelay(attempt, response = null) {
    const retryAfter = response?.headers?.get?.('retry-after');
    if (retryAfter) {
      const seconds = Number(retryAfter);
      if (Number.isFinite(seconds) && seconds >= 0) return Math.min(seconds * 1000, 10000);
      const date = Date.parse(retryAfter);
      if (Number.isFinite(date)) return Math.min(Math.max(0, date - Date.now()), 10000);
    }
    return REQUEST_RETRY_DELAYS[Math.min(attempt, REQUEST_RETRY_DELAYS.length - 1)] || 0;
  }

  async function requestJson(path, authorization, options = {}) {
    const retries = Number.isInteger(options.retries) ? Math.max(0, options.retries) : 2;
    const timeoutMs = Number.isFinite(options.timeoutMs) ? options.timeoutMs : REQUEST_TIMEOUT_MS;
    const url = `https://${state.apiHost}/api${path}`;
    let lastError = null;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      if (attempt > 0) await sleep(retryDelay(attempt));

      let response;
      try {
        response = await fetchWithTimeout(url, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
          headers: { Authorization: authorization, Accept: 'application/json' },
          cache: 'no-store',
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        }, timeoutMs);
      } catch (error) {
        lastError = new Error(t('milkloudNetworkRequestFailed', { message: error?.message || error }));
        lastError.cause = error;
        if (attempt < retries) continue;
        throw lastError;
      }

      const text = await response.text();
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        // The response is handled below as invalid JSON.
      }

      if (!response.ok) {
        const detail = data?.message || data?.code || text || response.statusText;
        const error = new Error(`HTTP ${response.status}: ${detail}`);
        error.httpStatus = response.status;
        error.responseBody = text;
        lastError = error;
        if (attempt < retries && shouldRetryStatus(response.status)) continue;
        throw error;
      }

      if (!data || typeof data !== 'object') {
        const error = new Error(t('milkloudInvalidJson'));
        lastError = error;
        if (attempt < retries) continue;
        throw error;
      }
      if (data.code && data.code !== 'OK') {
        const error = new Error(data.message || data.code);
        error.apiCode = data.code;
        throw error;
      }
      return data;
    }

    throw lastError || new Error(t('milkloudRequestFailed'));
  }

  async function fetchCurrentUser(authorization) {
    const result = await requestJson('/v1/user/', authorization);
    const user = result.data || {};
    if (!user.username) throw new Error(t('milkloudUserNoUsername'));
    return user;
  }

  async function getPlayRecords() {
    const token = activeToken();
    if (!token || busy) return;

    setBusy(true);
    setStatus(t('milkloudFetchingRecords'), 'working');
    try {
      let user = token.username && token.verifiedApiHost === state.apiHost
        ? { username: token.username, nickname: token.nickname, uid: token.uid }
        : null;

      if (!user?.username) {
        user = await fetchCurrentUser(token.authorization);
        updateTokenIdentity(token.id, user);
      }

      const rank = await fetchRankData(encodeURIComponent(user.username), token.authorization);
      const selection = selectRecords(rank, state.preference);
      if (selection.records.length === 0) throw new Error(t('milkloudNoRecords'));

      const payload = recordsToCalculatorData(user, selection.records);
      const parseResult = await fillInput(payload, true);
      const parserNote = parseResult.parsed
        ? ''
        : `\n${t('milkloudParserIncomplete', { message: parseResult.error?.message || t('milkloudUnknown') })}`;

      setStatus(
        `${t('milkloudImportedRecords', {
          count: selection.records.length,
          source: selection.label
        })}\n${t('milkloudRealitySummary', {
          touch: formatReality(rank.touch_reality),
          keyboard: formatReality(rank.keyboard_reality)
        })}${parserNote}`,
        parseResult.parsed ? 'success' : 'working'
      );
    } catch (error) {
      setStatus(formatRequestError(error), 'error');
    } finally {
      setBusy(false);
    }
  }

  async function fetchRankData(encodedUsername, authorization) {
    let lastError = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const rankResponse = await requestJson(
          `/v1/user/${encodedUsername}/rank`,
          authorization,
          { retries: 1 }
        );
        const rank = rankResponse.data || {};
        if (Array.isArray(rank.touch_ranks) || Array.isArray(rank.keyboard_ranks)) return rank;
        lastError = new Error(t('milkloudRankIncomplete'));
      } catch (error) {
        lastError = error;
        if (error?.httpStatus && !shouldRetryStatus(error.httpStatus)) throw error;
      }

      if (attempt < 2) {
        setStatus(t('milkloudRetryingRank', { current: attempt + 2, total: 3 }), 'working');
        await sleep(900 * (attempt + 1));
      }
    }
    throw lastError || new Error(t('milkloudRankFailed'));
  }

  function selectRecords(rank, preference) {
    const touch = dedupeAndSort(rank.touch_ranks || []);
    const keyboard = dedupeAndSort(rank.keyboard_ranks || []);

    if (preference === 'touch') return { records: touch.slice(0, 20), label: t('milkloudSourceTouch') };
    if (preference === 'keyboard') return { records: keyboard.slice(0, 20), label: t('milkloudSourceKeyboard') };
    if (preference === 'mixed') {
      return {
        records: dedupeAndSort([...touch, ...keyboard]).slice(0, 20),
        label: t('milkloudSourceMixed')
      };
    }

    if (touch.length === 0 && keyboard.length > 0) {
      return { records: keyboard.slice(0, 20), label: t('milkloudSourceKeyboard') };
    }
    if (keyboard.length === 0 && touch.length > 0) {
      return { records: touch.slice(0, 20), label: t('milkloudSourceTouch') };
    }

    const touchReality = finiteNumber(rank.touch_reality);
    const keyboardReality = finiteNumber(rank.keyboard_reality);
    return keyboardReality > touchReality
      ? { records: keyboard.slice(0, 20), label: t('milkloudSourceKeyboard') }
      : { records: touch.slice(0, 20), label: t('milkloudSourceTouch') };
  }

  function dedupeAndSort(records) {
    const best = new Map();
    for (const record of Array.isArray(records) ? records : []) {
      const chartId = String(record?.chart_id || '');
      if (!chartId) continue;
      const previous = best.get(chartId);
      if (!previous || compareRecord(record, previous) < 0) best.set(chartId, record);
    }
    return [...best.values()].sort(compareRecord);
  }

  function compareRecord(a, b) {
    const realityDiff = finiteNumber(b?.reality) - finiteNumber(a?.reality);
    if (realityDiff !== 0) return realityDiff;
    const scoreDiff = finiteNumber(b?.score) - finiteNumber(a?.score);
    if (scoreDiff !== 0) return scoreDiff;
    return finiteNumber(b?.score_accuracy) - finiteNumber(a?.score_accuracy);
  }

  function recordsToCalculatorData(user, records) {
    return {
      Username: user.username || '',
      Nickname: user.nickname || user.username || '',
      UserID: user.uid || '',
      SongRecords: [],
      SongRecordsV3: records.map(record => ({
        BeatmapID: String(record.chart_id),
        BestScore: Math.trunc(finiteNumber(record.score)),
        BestAccuracy: finiteNumber(record.score_accuracy),
        BestLevel: recordBestLevel(record),
        AchievedStatus: recordAchievedStatus(record)
      }))
    };
  }

  function recordBestLevel(record) {
    const grade = String(record?.grade || '').toUpperCase();
    if (Object.prototype.hasOwnProperty.call(GRADE_TO_LEVEL, grade)) return GRADE_TO_LEVEL[grade];

    const score = finiteNumber(record?.score);
    if (score >= 1010000) return 0;
    if (score >= 1000000) return 1;
    if (score >= 950000) return 2;
    if (score >= 850000) return 3;
    if (score >= 750000) return 4;
    if (score >= 650000) return 5;
    if (score >= 600000) return 6;
    return 7;
  }

  function recordAchievedStatus(record) {
    const score = finiteNumber(record?.score);
    const exact = finiteNumber(record?.score_exact_count);
    const perfect = finiteNumber(record?.score_perfect_count);
    const great = finiteNumber(record?.score_great_count);
    const good = finiteNumber(record?.score_good_count);
    const bad = finiteNumber(record?.score_bad_count);
    const miss = finiteNumber(record?.score_miss_count);
    const fracture_exact = finiteNumber(record?.score_fracture_exact_count);
    const fracture_miss = finiteNumber(record?.score_fracture_miss_count);
    const status = [3];
    if (score === 1010000) status.push(2);
    if (great + good + bad + miss === 0) status.push(5);
    if (bad + miss === 0) status.push(4);
    if (score >= 600000) status.push(0); else status.push(6);
    return [...new Set(status)].sort((a, b) => a - b);
  }

  async function fillInput(payload, parseImmediately) {
    const input = document.getElementById('inputData');
    if (!input) throw new Error(t('milkloudMissingInput'));
    input.value = JSON.stringify(payload);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (!parseImmediately) return { parsed: false, error: null };
    return runCalculatorParser();
  }

  async function runCalculatorParser() {
    let lastError = null;
    for (const delay of PARSER_RETRY_DELAYS) {
      if (delay > 0) await sleep(delay);
      await new Promise(resolve => requestAnimationFrame(() => resolve()));

      if (typeof globalThis.processData !== 'function') {
        lastError = new Error(t('milkloudParserLoading'));
        continue;
      }

      try {
        await Promise.resolve(globalThis.processData());
        return { parsed: true, error: null };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn('[Milkloud] Calculator parser failed; retrying:', lastError);
      }
    }
    return { parsed: false, error: lastError || new Error(t('milkloudParserNotReady')) };
  }

  function updateTokenIdentity(id, user) {
    const token = state.tokens.find(item => item.id === id);
    if (!token) return;
    token.username = String(user.username || token.username || '');
    token.nickname = String(user.nickname || token.nickname || '');
    token.uid = String(user.uid || token.uid || '');
    token.verifiedApiHost = state.apiHost;
    saveState();
    renderSummary();
    renderTokenList();
  }

  function setBusy(value) {
    busy = value;
    const button = document.getElementById('milkloud-get-records');
    if (button) button.disabled = value;
  }

  function setStatus(message, type = '') {
    const status = document.getElementById('milkloud-status');
    if (!status) return;
    status.textContent = message || '';
    status.dataset.type = type;
  }

  function setModalStatus(message, type = '') {
    const status = document.getElementById('milkloud-modal-status');
    if (!status) return;
    status.textContent = message || '';
    status.dataset.type = type;
  }

  function finiteNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function formatReality(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number.toFixed(4) : t('milkloudRealityUnknown');
  }

  function formatRequestError(error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/Failed to fetch|NetworkError|网络请求失败|network request failed/i.test(message)) {
      return `${message}\n${t('milkloudNetworkHelp')}`;
    }
    return message;
  }

  function refreshLanguage() {
    const modal = document.getElementById('milkloud-modal');
    if (modal && typeof globalThis.applyI18n === 'function') globalThis.applyI18n(modal);
    renderTokenList();
    renderSummary();
  }

  function init() {
    injectStyles();
    buildModal();

    const manageButton = document.getElementById('milkloud-manage-token');
    const recordsButton = document.getElementById('milkloud-get-records');
    if (!manageButton || !recordsButton) {
      console.warn('[Milkloud] Required page elements are missing.');
      return;
    }

    manageButton.addEventListener('click', openModal);
    recordsButton.addEventListener('click', getPlayRecords);
    document.addEventListener('i18n:change', refreshLanguage);
    renderSummary();
  }

  globalThis.MilkloudManager = Object.freeze({
    open: openModal,
    getPlayRecords,
    getState: () => JSON.parse(JSON.stringify(state))
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
