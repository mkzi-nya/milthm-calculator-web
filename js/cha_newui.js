
const Updated = "Updated at 2025.10.10 3:00(UTC+8)"
var cha_newui_js_ver = 7

async function renderToCanvas(element) {
  // 动态加载 html2canvas
  if (!window.html2canvas) {
    await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
  }

  // 渲染为 canvas
  const canvas = await window.html2canvas(element, {
    backgroundColor: null, // 保持透明背景
    scale: 2,              // 提高清晰度
  });

  return canvas;
}


console.log(Updated)
console.log(" ███  ███                               \n\
 ███  ███                               \n\
 ███▒▒███                               \n\
 ███▓▓███   ░████░    ░████░            \n\
 ██▓██▓██  ░██████░  ░██████░           \n\
 ██▒██▒██  ███  ███  ███  ███  ▒███▒  █ \n\
 ██░██░██  ██░  ░██  ██░  ░██  ████████ \n\
 ██ ██ ██  ██    ██  ██    ██  ▓  ▒███▒ \n\
 ██    ██  ██░  ░██  ██░  ░██           \n\
 ██    ██  ███  ███  ███  ███           \n\
 ██    ██  ░██████░  ░██████░           \n\
 ██    ██   ░████░    ░████░      ")

/* ========== 全局变量 ========== */
let columns = 3; //默认三列布局
(async function preloadTips() {
  try {
    if (!window.tipsCache) {
      const response = await fetch('./tips.txt');
      const text = await response.text();
      window.tipsCache = text.trim().split('\n').filter(Boolean);
      console.log('Tips 预加载完成');
    }
  } catch (err) {
    console.warn('Tips 预加载失败，使用默认数据', err);
    window.tipsCache = ['这里没有提示呜呜', '喵喵喵']; // Fallback
  }
})();
/* ========== 工具：从 image.css 读取图片 ========== */
/** 将曲名转为 image.css 封面类名（与打包脚本保持一致） */
function songNameToCssClass(name) {
  // 与 py 中 class_name 的生成方式一致：空格与“-” -> “_”，转小写
  // 并去掉常见不安全字符（文件名里可能去掉了它们）
  const cleaned = String(name)
    .replace(/[ \-]/g, '_')   // 替换所有空格和连字符为下划线
    .replace(/[()?]/g, '')    // 删除所有括号和问号
    .replace(/\!/g, '')
    .replace(/\./g, '')
    .replace(/\#/g, '')
    .replace(/\~/g, '')
    .toLowerCase();
  return cleaned || 'nya';
}

/** 读取某个 CSS 类上的 background-image 的 dataURL（要求该类在 image.css 中已定义） */
function getDataUrlFromCssClass(className) {
  const el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.left = '-99999px';
  el.style.top = '-99999px';
  el.style.width = '1px';
  el.style.height = '1px';
  el.className = className;
  document.body.appendChild(el);
  const bg = getComputedStyle(el).backgroundImage;
  document.body.removeChild(el);

  if (!bg || bg === 'none') return null;
  const m = bg.match(/url\(["']?(data:image\/[^"')]+)["']?\)/i);
  return m ? m[1] : null;
}
function achive_loadImage_nya() { loadImageCSS().then(() => archiveDownloadImage()); }
function loadImage_nya() { loadImageCSS().then(() => downloadImage()); }
/** 用 CSS 类创建可绘制到 Canvas 的 Image 对象 */
function loadCssImage(className) {
  return new Promise((resolve, reject) => {
    const dataURL = getDataUrlFromCssClass(className);
    if (!dataURL) {
      reject(new Error(`No dataURL found for CSS class .${className}`));
      return;
    }
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image from CSS class .${className}`));
    img.src = dataURL;
  });
}
function loadImageCSS() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'images.css';

    link.onload = () => {
      console.log('CSS 加载完成！');
      resolve();
    };

    link.onerror = () => {
      console.error('CSS 加载失败！');
      reject();
    };

    document.head.appendChild(link);
  });
}

function tryLoadFirstCssImage(classNames) {
  for (const cls of classNames) {
    try {
      const img = loadCssImage(cls);
      return img;
    } catch (e) {
      // 如果是第一个类名（即 songNameToCssClass 生成的 cleaned），打印日志
      if (cls === classNames[0]) {
        console.log(`生成的类名 "${cls}" 加载失败:`, e.message);
      }
      // 继续尝试下一个类名
    }
  }
  throw new Error('No candidate CSS image found: ' + classNames.join(', '));
}
/* ========== DOMContentLoaded 事件 ========== */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
});

/* ========== Reality 计算相关 ========== */
function reality(score, c) {
  if (c < 0.001) return 0;
  if (score >= 1005000) return 1 + c;
  if (score >= 995000) return 1.4 / (Math.exp(363.175 - score * 0.000365) + 1) - 0.4 + c;
  if (score >= 980000) return ((Math.exp(3.1 * (score - 980000) / 15000) - 1) / (Math.exp(3.1) - 1)) * 0.8 - 0.5 + c;
  if (score >= 700000) return score / 280000 - 4 + c;
  return 0;
}

function realityv3(score, c) {
  if (c < 1e-3) return 0;
  if (score >= 1000000) return c + 1.5;
  if (score >= 850000) return c + (score - 850000) / 100000.0;
  if (score >= 700000) return Math.max(0, c * (0.5 + (score - 700000) / 300000.0) + (score - 850000) / 100000.0);
  if (score >= 600000) return Math.max(0, (c - 3) * (score - 600000) / 200000.0);
  return 0;
}

function curlt(results) {
  let values = results
    .filter(item => item.singleRealityRaw > 0)
    .map(item => item.singleRealityRaw)
    .sort((a, b) => b - a)
    .slice(0, 20);

  // 直接计算平均值
  const sum = values.reduce((a, b) => a + b, 0);
  return sum / 20;
}
function findScore(constant, target, error_return = "Unable to deduce points") {
  // 处理特殊情况
  if (target <= 0) return 600000;
  if (target > constant + 1.5) return error_return;

  if (target >= constant) {
    if (target === constant + 1.5) return 1000000;
    return Math.ceil(850000 + (target - constant) * 100000);
  }

  // 修复这里：将 c 改为 constant
  if (target >= Math.max(0, 0.5 * constant - 1.5)) {
    const denominator = constant / 300000 + 1 / 100000;
    const score = (target + constant * 11 / 6 + 8.5) / denominator;
    return Math.min(Math.ceil(score), 849999);
  }

  if (Math.abs(constant - 3) < 1e-6) return 600000;
  const score = 600000 + (target * 200000) / (constant - 3);
  return Math.min(Math.ceil(score), 699999);
}

function startProcess() {
  var inp = document.getElementById('inputData').value;
  document.getElementById("upload_info").innerHTML = "正在处理数据...";
  if (inp.length > 0) {
    processData();
  } else {
    layer.msg("请输入内容！");
  }
}


var shitValue = 0.114514;
/* ========== 核心流程 ========== */
function processData() {
  const rawInput = document.getElementById('inputData').value;

  // 直接解析JSON输入
  const jsonText = extractJSON(rawInput);
  const parsed = tryParseJSON(jsonText) || {};
  const { Username, Nickname, UserID, SongRecords, SongRecordsV3 } = extractHeaderFields(parsed);

  const username = Username || parsed.UserName || "";
  const userID = UserID || "";
  window.userID = userID;
  window.Nickname = Nickname;

  const itemsSR = Array.isArray(SongRecords)
    ? SongRecords.map(rec => processSongFromOldFormat(rec, false)).filter(Boolean)
    : [];
  const itemsV3 = Array.isArray(SongRecordsV3)
    ? SongRecordsV3.map(rec => processSongFromOldFormat(rec, true)).filter(Boolean)
    : [];

  const allItems = [...itemsSR, ...itemsV3];

  // 保存完整的原始JSON数据，而不是只保存提取的字段
  window.extractedFields = parsed;

  // 合并 v2/v3 为单条用于全局与渲染
  const mergedItems = mergeSongVersions(allItems);

  // 全局保存：只保存合并后的
  window.processedItems = mergedItems;

  // 清空输出区域以避免多次解析时内容堆叠
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  // 排序（按合并后的 reality）
  mergedItems.sort((a, b) => {
    if (b.singleRealityRaw !== a.singleRealityRaw) {
      return b.singleRealityRaw - a.singleRealityRaw
    }
    return b.bestScore - a.bestScore
  });

  // 显示用户信息（基于合并后的）
  drawUserInfo(username, mergedItems);

  // 探测卡片计算字号
  const probe = document.createElement('div');
  probe.classList.add('card', 'card-info');
  probe.innerHTML = `1145141919810`;
  outputDiv.appendChild(probe);
  shitValue = Math.max(1, Math.min(20, probe.offsetWidth * 0.07));
  outputDiv.innerHTML = '';

  // 渲染卡片（基于合并后的）
  mergedItems.forEach(drawCard);

  // 直接将完整的原始JSON放入输入框
  document.getElementById('inputData').value = JSON.stringify(window.extractedFields);

  if (typeof initUpload === 'function') {
    try {
      initUpload();
    } catch (e) {
      console.warn('initUpload 执行出错：', e);
    }
  } else {
    console.warn('initUpload 未定义，已跳过调用。');
  }
}
/* ========== 工具函数 ========== */
function processSong(songBlock) {
  // 支持：
  // [title,category,constant,score,accuracy,level,[a,b,c]]
  // [title,category,constant,score,accuracy,level,[a,b,c],v3]
  const block = String(songBlock).trim();
  if (!block.startsWith('[')) return null;

  // 是否是 V3：允许末尾 ,v3 或 , v3（不带引号）
  let isV3 = /(,\s*v3\s*)\]$/.test(block);

  // 去掉尾部 ,v3 再做字段分割
  const normalized = isV3 ? block.replace(/,\s*v3\s*\]$/, ']') : block;

  // 去掉包裹的 [ ]
  const raw = normalized.slice(1, -1);

  // 顶层安全分割（保留内层 [ ... ]）
  const tokens = [];
  let buf = '';
  let depth = 0;
  for (const ch of raw) {
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      tokens.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  tokens.push(buf);

  if (tokens.length < 7) return null;

  let [title, category, constant, score, accuracy, level, achievedStatus] = tokens;

  // 清洗/解析
  const strip = s => String(s).trim().replace(/^"(.*)"$|^'(.*)'$/, '$1$2');

  achievedStatus = strip(achievedStatus)
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map(n => parseInt(n.trim(), 10))
    .filter(n => Number.isFinite(n));

  const constantVal = parseFloat(constant);
  const constantv3Val = parseFloat(constant);
  const scoreVal = parseInt(score, 10);
  const accuracyVal = parseFloat(accuracy);
  const levelVal = parseInt(level, 10);

  // 同时计算 v2 与 v3 的 reality
  const r_v2 = reality(scoreVal, constantVal);
  const r_v3 = realityv3(scoreVal, constantv3Val);

  // —— 关键逻辑：是否改用 v3 公式
  const useV3 =
    isV3 ||
    (Number.isFinite(levelVal) && levelVal <= 1) ||
    (Number.isFinite(scoreVal) && scoreVal >= 1005000) ||
    (Array.isArray(achievedStatus) && (achievedStatus.includes(2) || achievedStatus.includes(5)));

  const singleRealityRaw = useV3 ? r_v3 : r_v2;

  return {
    // 版本信息与比较用
    isV3,
    version: isV3 ? 'v3' : 'v2',
    r_v2,
    r_v3,

    // 供后续显示/排序
    singleRealityRaw,
    singleReality: Number.isFinite(singleRealityRaw) ? singleRealityRaw.toFixed(2) : '0.00',

    // 基本字段
    constant: constantVal,
    constantv3: constantv3Val,
    name: strip(title),
    category: strip(category),
    bestScore: scoreVal,
    bestAccuracy: Number.isFinite(accuracyVal) ? accuracyVal.toFixed(4) : '0.0000',
    bestLevel: Number.isFinite(levelVal) ? levelVal : 0,
    achievedStatus,

    // 合并用 key（同曲同定数归并）
    __mergeKey: `${strip(title)}@@${Number(constantVal).toFixed(4)}`
  };
}

function mergeSongVersions(items) {
  const map = new Map();

  (items || []).forEach(it => {
    const key = it.__mergeKey || `${it.name}@@${Number(it.constant).toFixed(4)}`;
    const prev = map.get(key);

    // 当前条目的 reality（已经在 processSong / processSongFromOldFormat 中按版本算过）
    const curRlt = Number(it.singleRealityRaw) || 0;

    if (!prev) {
      // 初始化：克隆一份简化对象
      map.set(key, {
        isV3: it.isV3,                 // 仅标注来源（可选）
        name: it.name,
        category: it.category,
        constant: it.constant,
        constantv3: it.constantv3,
        bestScore: it.bestScore,
        bestAccuracy: parseFloat(it.bestAccuracy), // 转成数值，最后再格式化
        bestLevel: it.bestLevel,
        achievedStatus: Array.isArray(it.achievedStatus) ? Array.from(new Set(it.achievedStatus)).sort((a, b) => a - b) : [],
        singleRealityRaw: curRlt,
        singleReality: (curRlt || 0).toFixed(2)
      });
      return;
    }

    // 合并：分数取高
    prev.bestScore = Math.max(prev.bestScore, it.bestScore);

    // acc 取高
    const curAcc = parseFloat(it.bestAccuracy);
    if (Number.isFinite(curAcc)) prev.bestAccuracy = Math.max(prev.bestAccuracy, curAcc);

    // 等级取低
    prev.bestLevel = Math.min(prev.bestLevel, it.bestLevel);

    // 状态并集
    const union = new Set([...(prev.achievedStatus || []), ...(it.achievedStatus || [])]);
    prev.achievedStatus = Array.from(union).sort((a, b) => a - b);

    // Reality 取高（当同曲出现 v2 与 v3 时生效）
    prev.singleRealityRaw = Math.max(prev.singleRealityRaw, curRlt);
    prev.singleReality = prev.singleRealityRaw.toFixed(2);

    // 如果任意版本是 v3，可选地将 isV3 标注为 true（不影响渲染）
    prev.isV3 = prev.isV3 || !!it.isV3;

    map.set(key, prev);
  });

  // 把 bestAccuracy 格式化回字符串（与你原渲染逻辑一致）
  return Array.from(map.values()).map(o => ({
    ...o,
    bestAccuracy: Number.isFinite(o.bestAccuracy) ? o.bestAccuracy.toFixed(4) : '0.0000'
  }));
}

function processSongFromOldFormat(record, isV3 = false) {
  const { BeatmapID, BestScore, BestAccuracy, BestLevel, AchievedStatus } = record || {};
  if (!BeatmapID) return null;

  const constantObj = constants[BeatmapID];
  if (!constantObj) return null;

  const { constant, constantv3, category, name, yct } = constantObj;
  const scoreVal = BestScore || 0;
  const accVal = Number.isFinite(BestAccuracy) ? BestAccuracy : 0;
  const levelVal = Number.isFinite(BestLevel) ? BestLevel : 0;
  const status = Array.isArray(AchievedStatus) ? AchievedStatus : [];

  const r_v2 = reality(scoreVal, constant);
  const r_v3 = realityv3(scoreVal, constantv3);

  // —— 核心：和 processSong 保持一致的判定逻辑
  const useV3 =
    isV3 ||
    (Number.isFinite(levelVal) && levelVal <= 1) ||
    (Number.isFinite(scoreVal) && scoreVal >= 1005000) ||
    (status.includes(2) || status.includes(5));

  const singleRealityRaw = useV3 ? r_v3 : r_v2;

  return {
    isV3: !!isV3,
    version: isV3 ? "v3" : "v2",
    r_v2,
    r_v3,
    singleRealityRaw,
    singleReality: singleRealityRaw.toFixed(2),
    constant,
    constantv3,
    name,
    category,
    yct,
    bestScore: scoreVal,
    bestAccuracy: accVal.toFixed(4),
    bestLevel: levelVal,
    achievedStatus: status,
    __mergeKey: `${name}@@${Number(constant).toFixed(4)}`
  };
}

function formatInput(username, items) {
  // items 为 processSong / processSongFromOldFormat 的统一对象
  // 若 isV3 为 true，则在尾部追加 ,v3
  const formattedItems = (items || []).map(item => {
    if (item.isV3) { return `[${item.name},${item.category},${item.constantv3},${item.bestScore},${item.bestAccuracy},${item.bestLevel},[${(item.achievedStatus || []).join(',')}],v3]` }
    else return `[${item.name},${item.category},${item.constant},${item.bestScore},${item.bestAccuracy},${item.bestLevel},[${(item.achievedStatus || []).join(',')}]]`;

  }).join(',\n  ');

  document.getElementById('inputData').value = `[${username || ''}],{\n  ${formattedItems}\n}`;
}


// **初始化 SQL.js**
async function initSQL() {
  layer.msg('正在加载SQL加载器...')
  const response = await fetch('./js/sql-wasm.wasm');
  const wasmBinary = await response.arrayBuffer();
  const SQL = await initSqlJs({
    locateFile: filename => `./js/${filename}`,
    wasmBinary
  });
  return SQL;
}

// **处理 SQLite 数据库文件**
async function processDBFile(arrayBuffer, SQL) {
  try {
    const db = new SQL.Database(new Uint8Array(arrayBuffer));
    // 查询 `kv` 表中的 `PlayerFile`或V2
    let results = db.exec("SELECT value FROM kv WHERE key='PlayerFileV2'");
    if (results.length === 0 || results[0].values.length === 0) {
      results = db.exec("SELECT value FROM kv WHERE key='PlayerFile'");
      if (results.length === 0 || results[0].values.length === 0) {
        alert("未找到 PlayerFile/PlayerFileV2 存档");
        return;
      }
    }
    // 提取 JSON 并解析
    const playerFileJSON = results[0].values[0][0];
    const extracted = extractJSON(playerFileJSON);
    if (extracted) {
      document.getElementById('inputData').value = extracted;
      processData();
    } else {
      alert("数据库存档解析失败！\nDatabase save parsing failed!");
    }
  } catch (error) {
    alert(`解析数据库失败: ${error.message}\nFailed to parse database: ${error.message}`);
  }
}

function handleFile(content, fileName) {
  const inputDataElem = document.getElementById('inputData');

  if (fileName.endsWith('.json')) {
    const extracted = extractJSON(content);
    if (extracted) {
      inputDataElem.value = extracted;
      processData();
    } else {
      alert("提取 JSON 数据失败！\nFailed to extract JSON data!");
    }
  } else if (fileName.endsWith('.xml')) {
    processXMLFile(content);
  } else if (fileName === 'prefs') {
    processPrefsFile(content);
  } else if (fileName.endsWith('.reg')) {
    processRegFile(content);
  } else if (fileName.endsWith('.txt')) {
    inputDataElem.value = content;
    processData();
  } else if (fileName.endsWith('.png')) {
    parsePNGFile(content);
  } else {
    alert("不支持的文件类型！\nUnsupported file type!");
  }
}

function parsePNGFile(content) {
  const userdataMatch = content.match(/userdata:([\s\S]+)/);
  if (userdataMatch && userdataMatch[1]) {
    const userdataText = userdataMatch[1].trim();
    document.getElementById('inputData').value = userdataText;
    processData();
  } else {
    alert("未找到 userdata 数据！\nCould not find userdata data!");
  }
}

function processRegFile(regContent) {
  const match = regContent.match(/"PlayerFile_h\d+"\s*=\s*hex:((?:[0-9a-fA-F]{2},?[\\\n\s]*)+)/);
  if (match) {
    const decoded = hexToString(match[1].replace(/[,\\\s\n]/g, ''));
    document.getElementById('inputData').value = decoded;
    processData();
  } else {
    alert('未找到 PlayerFile 键或值格式不正确');
  }
}

function hexToString(hexData) {
  const arr = hexData.match(/.{2}/g) || [];
  const res = arr.map(byte => String.fromCharCode(parseInt(byte, 16)));
  return res.join('');
}

function processXMLFile(xmlContent) {
  const doc = new DOMParser().parseFromString(xmlContent, "application/xml");
  const pf = doc.querySelector('string[name="PlayerFile"]');
  if (pf && pf.textContent) {
    document.getElementById('inputData').value = decodeURIComponent(pf.textContent);
    processData();
  } else {
    alert('未找到 <string name="PlayerFile"> 标签');
  }
}

function processPrefsFile(prefsContent) {
  const doc = new DOMParser().parseFromString(prefsContent, "application/xml");
  const pf = doc.querySelector('pref[name="PlayerFile"][type="string"]');
  if (pf && pf.textContent) {
    document.getElementById('inputData').value = atob(pf.textContent);
    processData();
  } else {
    alert('未找到 <pref name="PlayerFile" type="string"> 标签');
  }
}

function extractJSON(jsonLike) {
  // 尝试直接就是纯 JSON
  const direct = tryParseJSON(jsonLike);
  if (direct && typeof direct === 'object') return jsonLike;

  // 从首个 { 起，用栈匹配到对应的 }
  const s = String(jsonLike);
  const start = s.indexOf('{');
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < s.length; i++) {
    const ch = s[i];
    if (ch === '{') depth++;
    else if (ch === '}') depth--;

    if (depth === 0) {
      const candidate = s.slice(start, i + 1);
      if (tryParseJSON(candidate)) return candidate;
      // 若这段不合法，仍尝试继续向后寻找下一个闭合点
    }
  }
  return null;
}

function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}
function extractHeaderFields(parsed) {
  // 传入已 JSON.parse 的对象；任何字段缺失都用空值兜底
  const Username = (parsed && (parsed.Username || parsed.UserName)) || "";
  const UserID = (parsed && parsed.UserID) || "";
  const Nickname = (parsed && parsed.Nickname) || "";

  // SongRecords / SongRecordsV3 必须是数组才返回，否则空数组
  const SongRecords = (parsed && Array.isArray(parsed.SongRecords)) ? parsed.SongRecords : [];
  const SongRecordsV3 = (parsed && Array.isArray(parsed.SongRecordsV3)) ? parsed.SongRecordsV3 : [];

  return { Username, Nickname, UserID, SongRecords, SongRecordsV3 };
}

/* ========== 显示用户信息 ========== */
function drawUserInfo(username, results) {
  const userInfoDiv = document.getElementById('userInfo');
  const usercontainer = document.getElementById('usercontainer');
  usercontainer.style.display = 'block';

  const avg = curlt(results);
  window.average = avg;
  window.average1 = Math.floor(avg * 10000) / 10000;
  userInfoDiv.innerText = `${username} ${window.average1}`;

  window.username = username;
  window.average = avg;
}


/* ========== 绘制单张卡片（DOM） ========== */
function drawCard(result, index) {
  const outputDiv = document.getElementById('output');
  const maincard = document.createElement('div');
  const card = document.createElement('div');
  maincard.classList.add('card');
  card.classList.add('card-inside');

  const opa = 0.114514;
  const opa_nb = 0.114514;
  maincard.style.background = result.bestLevel === 0
    ? `linear-gradient(135deg, rgba(132, 0, 195, ${opa_nb}), rgba(48, 48, 176, ${opa_nb}), rgba(46, 97, 239, ${opa_nb}))`
    : `linear-gradient(45deg, rgba(64, 40, 215, ${opa}), rgba(136, 57, 254, ${opa}))`;
  card.style.color = '#DDA0DD';

  result.bestLevel === 0 ? (() => { card.style.border = '1.5px solid'; card.style.borderColor = 'rgba(255, 255, 255, 0.3)'; })() : {};
  let baseFontSize = (window.innerWidth * window.innerHeight) / 50000;
  if (baseFontSize >= 10) {
    baseFontSize = 10;
  }
  let fontSize = (baseFontSize * 4) / columns;
  const marginBottom = (baseFontSize * 4) / columns;

  const title = document.createElement('div');
  title.classList.add('title');
  title.innerText = result.name;
  card.appendChild(title);
  title.style.whiteSpace = 'nowrap';
  title.style.overflow = 'hidden';
  title.style.textOverflow = 'ellipsis';
  title.style.maxWidth = "90%";

  const info = document.createElement('div');
  info.classList.add('info');
  Object.assign(info.style, {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    overflow: 'visible',
    textOverflow: 'ellipsis',
    fontSize: `${fontSize}px`,
    marginBottom: `${marginBottom * 0.5}px`
  });
  const constantText = `${parseFloat(result.constantv3).toFixed(1)}->&nbsp`;
  const singleRealitySpan = document.createElement('span');
  singleRealitySpan.innerHTML = parseFloat(result.singleReality).toFixed(2);
  if (result.bestScore >= 1005000) {
    singleRealitySpan.style.color = '#1cd3b4';
  } else if (result.singleReality == 0) {
    singleRealitySpan.style.color = '#a5a5a5';
  }
  info.innerHTML = `${result.category} ${constantText}`;
  info.style.maxWidth = "100%"
  info.appendChild(singleRealitySpan);
  const accuracySpan = document.createElement('span');
  accuracySpan.classList.add('accuracy');
  accuracySpan.innerHTML = `&nbsp&nbsp${(result.bestAccuracy * 100).toFixed(2)}%`;
  Object.assign(accuracySpan.style, {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
    overflow: 'visible'
  });
  info.appendChild(accuracySpan);
  card.appendChild(info);

  const score = document.createElement('div');
  score.classList.add('score');
  score.innerText = result.bestScore;
  score.style.marginBottom = `${marginBottom}px`;
  score.style.whiteSpace = 'nowrap';
  score.style.overflow = 'ellipsis';
  if (result.achievedStatus.includes(5)) {
    Object.assign(score.style, {
      background: 'linear-gradient(to right, #12a9fb, #ee80ff)',
      color: 'transparent',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text'
    });
  } else if (result.achievedStatus.includes(4)) {
    Object.assign(score.style, {
      background: 'linear-gradient(to right, #5e94f3, #80b2ff)',
      color: 'transparent',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text'
    });
  } else {
    score.style.color = '#D1D1D1';
    score.style.background = '';
  }
  score.style.lineHeight = "1.2"
  card.appendChild(score);

  const indexElem = document.createElement('div');
  indexElem.classList.add('index');
  indexElem.innerText = `#${index + 1}`;
  Object.assign(indexElem.style, {
    fontSize: `${fontSize}px`,
    marginBottom: `${marginBottom}px`,
    whiteSpace: 'nowrap',
    overflow: 'ellipsis',
    textOverflow: 'ellipsis',
    top: "0px"
  });
  card.appendChild(indexElem);

  maincard.appendChild(card);
  outputDiv.appendChild(maincard);

  info.style.fontSize = `${shitValue * 1.14514}px`;
  title.style.fontSize = `${shitValue * 1.2}px`;
  score.style.fontSize = `${shitValue * 2.4}px`;
}

/* ========== 列数调整 ========== */
function changeColumns(delta) {
  columns = Math.max(1, columns + delta);
  document.querySelector('.container').style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  document.getElementById('output').innerHTML = '';
  processData();
}

/* ========== 文件处理等原有逻辑 ========== */
function upl() {
  document.getElementById('fileupLoad').click();
}

document.getElementById('fileupLoad').addEventListener("change", async function (e) {
  layer.load(1, { shade: [0.1, '#fff'] });
  try {
    const file = e.target.files[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.db')) {
      const reader = new FileReader();
      reader.onload = async () => {
        const SQL = await initSQL();
        const db = new SQL.Database(new Uint8Array(reader.result));
        const tables = getAllTables(db);

        if (tables.includes("kv")) {
          // 处理存档数据库
          processDBFile(reader.result, SQL);
        } else if (tables.includes("scores")) {
          // 处理data.db - 直接生成JSON
          const scores = extractScores(db);
          processHistoryRecords(scores);
          alert("注意：data.db内只包含您将Milthm更新至3.2版本之后的游玩记录，且无法区分是否为v3(milthm4.0)成绩，可能不准确，建议上传saves.db\n\nNote: The data.db file only contains your play records after updating Milthm to version 3.2, and cannot distinguish whether it is a v3 (Milthm 4.0) score.");
        } else {
          console.error("数据库不包含 'kv' 或 'scores' 表，无法解析\nThe database does not contain the 'kv' or 'scores' table and cannot be parsed.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // 处理其他文件类型
      const reader = new FileReader();
      reader.onload = () => handleFile(reader.result, fileName);
      reader.onerror = () => layer.msg("读取文件失败\nFailed to read the file.");
      reader.readAsText(file);
    }
    console.log("文件处理完成\nFile processing completed.");
  } catch (error) {
    console.error("处理文件时出错:", error, "\nAn error occurred while processing the file:", error);
    layer.msg("处理文件时出错，请检查文件格式是否正确\nAn error occurred while processing the file, please check if the file format is correct.", { icon: 2 });
  } finally {
    layer.closeAll('loading');
  }
});

function getAllTables(db) {
  try {
    const stmt = db.prepare("SELECT name FROM sqlite_master WHERE type='table'");
    let tables = [];
    while (stmt.step()) {
      tables.push(stmt.getAsObject().name);
    }
    stmt.free();
    return tables;
  } catch (error) {
    console.error("无法获取数据库表:", error, "\nFailed to retrieve database tables:", error);
    return [];
  }
}

function extractScores(db) {
  let scores = [];
  try {
    const stmt = db.prepare("SELECT * FROM scores");
    while (stmt.step()) {
      let row = stmt.getAsObject();
      scores.push(row);
    }
    stmt.free();
  } catch (error) {
    console.error("提取 scores 失败:", error, "\nFailed to extract scores:", error);
  }
  return scores;
}

function processHistoryRecords(scores) {
  for (let i = 0; i < scores.length; i++) {
    const scoreData = scores[i];
    const chartid = scoreData.chart_id;
    const score = scoreData.score;
    const constantData = constants[chartid];
    const score_accuracy = scoreData.score_accuracy * 100;

    if (constantData) {
      const { constant, category, name, yct, ad, ae, af, ag } = constantData;
      const singleReality = realityv3(score, constant);
      scoreData.constant = constant;
      scoreData.category = category;
      scoreData.name = name;
      scoreData.singleReality = singleReality;
      scoreData.h = (score_accuracy < 99 || score < 10000 * score_accuracy) ? 0 : (constant * 0.1 + 1) * Math.pow((score - 5000 * score_accuracy - 500000) / 10000, 2);
      if (ad) scoreData.d = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ad : ad);
      if (ae) scoreData.e = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ae : ae);
      if (af) scoreData.f = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * af : af);
      if (ag) scoreData.g = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ag : ag);
    } else {
      console.warn(`未找到对应的 chartid: ${chartid}`);
      scores.splice(i, 1);
      i--;
    }
  }

  const userrealityHistory = calculateUserReality(scores);
  const username = scores[0]?.username || "Unknown Player";

  // 直接生成JSON数据
  const jsonData = generateJSONFromScores(scores, username);

  window.dataurlt = userrealityHistory;
  window.datas = scores;

  // 将生成的JSON放入输入框
  document.getElementById('inputData').value = JSON.stringify(jsonData);

  loadImageCSS().then(() => urltc(userrealityHistory, scores));
  processData();
}
function generateJSONFromScores(scores, username) {
  const songRecords = [];
  const songRecordsV3 = [];

  // 使用Map来去重，只保留每个chart_id的最高分
  const bestScoresMap = new Map();

  scores.forEach(scoreData => {
    const chartId = scoreData.chart_id;
    const currentScore = scoreData.score;

    if (!bestScoresMap.has(chartId) || bestScoresMap.get(chartId).score < currentScore) {
      bestScoresMap.set(chartId, scoreData);
    }
  });

  // 将最佳分数转换为SongRecords格式
  bestScoresMap.forEach((scoreData, chartId) => {
    const constantData = constants[chartId];
    if (!constantData) return;

    const { constant, constantv3, category, name } = constantData;
    const record = {
      BeatmapID: chartId,
      BestScore: scoreData.score,
      BestAccuracy: scoreData.score_accuracy,
      BestLevel: scoreData.score === 1010000 ? 0 :
        scoreData.score >= 1005000 ? 1 :
          scoreData.score >= 950000 ? 2 :
            scoreData.score >= 900000 ? 3 :
              scoreData.score >= 850000 ? 4 :
                scoreData.score >= 800000 ? 5 : 6,
      AchievedStatus: (() => {
        const status = [3];
        if (scoreData.score >= 800000) status.push(0);
        if (scoreData.score_good_count + scoreData.score_bad_count + scoreData.score_miss_count === 0) status.push(5);
        if (scoreData.score_bad_count + scoreData.score_miss_count === 0) status.push(4);
        if (scoreData.score < 800000) status.push(6);
        return status;
      })()
    };
    songRecordsV3.push(record);
  });

  return {
    Username: username,
    UserID: "",
    SongRecords: songRecords,
    SongRecordsV3: songRecordsV3
  };
}

function calculateUserReality(scores) {
  let b20_lg = new Map();
  let userrealityHistory = [];
  let lastUserReality = null;

  scores.forEach(scoreData => {
    const { chart_id, score, played_at } = scoreData;
    if (!b20_lg.has(chart_id) || b20_lg.get(chart_id).score < score) {
      b20_lg.set(chart_id, scoreData);
    }

    let b20 = Array.from(b20_lg.values())
      .sort((a, b) => b.singleReality - a.singleReality)
      .slice(0, 20);

    let filteredReality = b20.slice(0, 20).filter(data => data.singleReality > 0);
    let sumReality = filteredReality.reduce((sum, data) => sum + data.singleReality, 0);
    let userreality = sumReality / 20;

    if (lastUserReality === null || userreality !== lastUserReality) {
      userrealityHistory.push({ userreality, played_at });
      lastUserReality = userreality;
    }
  });

  // 更新window.items为统一格式
  window.items = Array.from(b20_lg.values()).map(({ score, singleReality, score_accuracy, grade, score_perfect_count, score_good_count, score_bad_count, score_miss_count, ...rest }) => ({
    ...rest,
    bestScore: score,
    singleRealityRaw: singleReality,
    singleReality: singleReality.toFixed(2),
    bestAccuracy: score_accuracy,
    bestLevel: score === 1010000 ? 0 :
      score >= 1005000 ? 1 :
        score >= 950000 ? 2 :
          score >= 900000 ? 3 :
            score >= 850000 ? 4 :
              score >= 800000 ? 5 : 6,
    achievedStatus: (() => {
      const status = [3];
      if (score >= 800000) status.push(0);
      if (score_good_count + score_bad_count + score_miss_count === 0) status.push(5);
      if (score_bad_count + score_miss_count === 0) status.push(4);
      if (score < 800000) status.push(6);
      return status;
    })()
  }));

  return userrealityHistory;
}

/* ========== 大图生成（使用 CSS 图片） ========== */
function urltc(userrealityHistory, scores) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 2000;
  canvas.height = 1500;

  // 背景：从 .background-image 读取
  loadCssImage('background-image').then((bgImage) => {
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    const chartX = 1050, chartY = 50, chartWidth = 900, chartHeight = 500;

    const times = userrealityHistory.map(data => new Date(data.played_at).getTime());
    const realities = userrealityHistory.map(data => data.userreality);
    const [minTime, maxTime] = [Math.min(...times), Math.max(...times)];
    const [minReality, maxReality] = [Math.min(...realities), Math.max(...realities)];
    const scaleX = (time) => chartX + ((time - minTime) / (maxTime - minTime)) * chartWidth;
    const scaleY = (reality) => chartY + chartHeight - ((reality - minReality) / (maxReality - minReality)) * chartHeight;

    ctx.strokeStyle = "#444";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      let y = chartY + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(chartX, y);
      ctx.lineTo(chartX + chartWidth, y);
      ctx.stroke();
    }
    for (let i = 0; i <= 6; i++) {
      let x = chartX + (chartWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, chartY);
      ctx.lineTo(x, chartY + chartHeight);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(206, 238, 249, 0.5)";
    ctx.beginPath();
    ctx.moveTo(scaleX(times[0]), scaleY(realities[0]));
    userrealityHistory.forEach((data, i) => {
      let x = scaleX(times[i]), y = scaleY(realities[i]);
      ctx.lineTo(x, y);
    });
    ctx.lineTo(scaleX(times[times.length - 1]), chartY + chartHeight);
    ctx.lineTo(scaleX(times[0]), chartY + chartHeight);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "rgba(200, 237, 249, 0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    userrealityHistory.forEach((data, i) => {
      let x = scaleX(times[i]), y = scaleY(realities[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    const now = new Date();
    const totalTime = now.getTime() - minTime;
    const interval = totalTime / 5;
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i < 5; i++) {
      let x = chartX + (i * chartWidth) / 5;
      let time = minTime + i * interval;
      let timeDiff = now.getTime() - time;
      let timeLabel = formatTimeDiff(timeDiff);
      ctx.fillText(timeLabel, x, chartY + chartHeight + 30);
    }
    ctx.fillText("now", chartX + chartWidth, chartY + chartHeight + 30);
    ctx.textAlign = "right";
    for (let i = 0; i < 5; i++) {
      let reality = minReality + (maxReality - minReality) * (i / 4);
      let y = scaleY(reality);
      ctx.fillText(reality.toFixed(2), chartX - 10, y);
    }
    console.log("数据", items);

    const calculateMetric = (items, key, multiplier, divisor) => {
      return multiplier * (
        items.map(item => item[key])
          .filter(value => value !== undefined)
          .sort((a, b) => b - a)
          .slice(0, 7)
          .reduce((sum, value) => sum + value, 0) / 7 || 0
      ) / divisor;
    };
    const d = calculateMetric(items, 'd', 1, 1);
    const e = calculateMetric(items, 'e', 70, 30.5);
    const f = calculateMetric(items, 'f', 2.5, 1);
    const g = calculateMetric(items, 'g', 7, 1);
    const h = calculateMetric(items, 'h', 80.5, 15.38);

    ctx.textAlign = "center";
    ctx.fillText("User Reality 变化趋势", chartX + chartWidth / 2, chartY - 10);
    ctx.fillText("(由Panyi提供计算方式)", 1850, 1380);
    ctx.font = "40px Arial";
    ctx.fillText("最近游玩", 400, 110);
    //ctx.fillText("推分建议", 400, 760);

    drawRadarChart(ctx, [d, e, f, g, h], 1150, 680, 700, 700);

    /* ---------- 辅助：把某曲目改成 1010000 时的 Reality 增量 ---------- */
    function realityGainIf1010000(track) {
      const sim = window.processedItems.map(o => ({ ...o }));
      let found = false;

      for (const it of sim) {
        if (it.name === track.name && Math.abs(it.constant - track.constant) < 1e-3) {
          it.bestScore = 1010000;
          it.singleRealityRaw = realityv3(1010000, track.constantv3);
          found = true;
          break;
        }
      }
      if (!found) {
        sim.push({
          name: track.name,
          constantv3: track.constantv3,
          bestScore: 1010000,
          singleRealityRaw: realityv3(1010000, track.constantv3),
        });
      }
      const newAvg = sim
        .filter(i => i.singleRealityRaw > 0)
        .sort((a, b) => b.singleRealityRaw - a.singleRealityRaw)
        .slice(0, 20)
        .reduce((s, i) => s + i.singleRealityRaw, 0) / 20;

      return newAvg - window.average;
    }

    /* ---------- 取曲目列表 ---------- */
    const thresholdC = (window.items?.[19]?.singleRealityRaw ?? 0) - 1;
    const candidates = [];

    Object.values(constants)
      .sort((a, b) => b.constant - a.constant)
      .some(info => {
        if (info.constant < thresholdC) return true;
        const gain = realityGainIf1010000(info);
        candidates.push({ ...info, gain });
        return false;
      });

    const top25 = candidates
      .sort((a, b) => b.gain - a.gain)
      .slice(0, 25);

    /* ---------- 绘制表格 ----------
    const tableX = 100, tableY = 800;
    const rowH = 25;
    const colW = [60, 260, 100, 150];

    ctx.font = "16px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    ["定数", "曲名", "还可推", "推分需"].forEach((t, i) => {
      const x = tableX + colW.slice(0, i).reduce((a, b) => a + b, 0);
      ctx.strokeStyle = "rgba(173,216,230,0.7)";
      ctx.strokeRect(x, tableY, colW[i], rowH);
      ctx.fillStyle  = "#fff";
      ctx.fillText(t, x + 6, tableY + rowH / 2);
    });

    top25.forEach((info, idx) => {
      const y = tableY + (idx + 1) * rowH;

      for (let j = 0; j < 4; j++) {
        ctx.strokeStyle = "rgba(173,216,230,0.7)";
        ctx.strokeRect(tableX + colW.slice(0, j).reduce((a, b) => a + b, 0), y, colW[j], rowH);
      }

      ctx.fillStyle = "#fff";
      ctx.font = "16px Arial";
      ctx.fillText(info.constant.toFixed(1), tableX + 6, y + rowH / 2);
      ctx.fillText(info.name,            tableX + colW[0] + 6, y + rowH / 2);
      ctx.fillText(info.gain.toFixed(4), tableX + colW[0] + colW[1] + 6, y + rowH / 2);

      const curRlt  = window.processedItems.find(p => p.name === info.name && Math.abs(p.constant - info.constant) < 1e-3)?.singleRealityRaw ?? 0;
      const deltaR  = Math.ceil(window.average * 100 - 0.5) + 0.5 !== window.average * 100
          ? (Math.ceil(window.average * 100 - 0.5) + 0.5 - window.average * 100) / 5 +
            Math.max(curRlt, window.processedItems?.[19]?.singleRealityRaw ?? 0)
          : 114514;

      const scoreNeed = findScore(info.constant, deltaR);

      if (scoreNeed === "Unable to deduce points") {
        ctx.font = "11px Arial";
      } else {
        ctx.font = "16px Arial";
      }
      ctx.fillText(String(scoreNeed),
                  tableX + colW[0] + colW[1] + colW[2] + 6,
                  y + rowH / 2);
    });
    */
    // 最近 10 次分数卡（封面 & 图标也从 CSS 取）
    lg_drawCards(ctx, scores.slice(-10).reverse(), 50, 150).then(() => {
      const link = document.createElement("a");
      link.download = "user_reality_chart.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }).catch(err => {
    console.error('背景图加载失败(来自 image.css):', err);
  });
}

function drawRadarChart(ctx, data, x, y, width, height) {
  const labels = ['底力', '手法', '读谱', '多指', '准度'];
  const maxDataValue = Math.max(...data);
  const maxVal = Math.ceil(maxDataValue * 2) / 2;
  const numScales = 8;
  const scaleStep = maxVal / (numScales - 1);
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const radius = Math.min(width, height) / 2;
  ctx.strokeStyle = "#ccc";
  ctx.fillStyle = "rgba(219, 245, 255, 0.5)";
  for (let i = 0; i < numScales; i++) {
    const scaleRadius = (i / (numScales - 1)) * radius;
    ctx.beginPath();
    for (let j = 0; j < labels.length; j++) {
      const angle = (Math.PI * 2 / labels.length) * j - Math.PI / 2;
      const px = centerX + scaleRadius * Math.cos(angle);
      const py = centerY + scaleRadius * Math.sin(angle);
      j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }
  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  for (let i = 0; i < numScales; i++) {
    const scaleValue = (i * scaleStep).toFixed(1);
    const scaleRadius = (i / (numScales - 1)) * radius;
    ctx.fillText(scaleValue, centerX, centerY - scaleRadius);
  }
  ctx.beginPath();
  ctx.fillStyle = "rgba(210, 244, 255, 0.5)";
  data.forEach((value, index) => {
    const angle = (Math.PI * 2 / data.length) * index - Math.PI / 2;
    const scaledValue = (value / maxVal) * radius;
    const px = centerX + scaledValue * Math.cos(angle);
    const py = centerY + scaledValue * Math.sin(angle);
    index === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  labels.forEach((label, index) => {
    const angle = (Math.PI * 2 / labels.length) * index - Math.PI / 2;
    const px = centerX + (radius + 20) * Math.cos(angle);
    const py = centerY + (radius + 20) * Math.sin(angle);
    ctx.fillText(`${label}: ${data[index].toFixed(2)}`, px, py);
  });
}

function formatTimeDiff(timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  if (days > 0) {
    return `-${days}d`;
  } else if (hours > 0) {
    return `-${hours}h`;
  } else {
    return `-${minutes}m`;
  }
}

function geturltc() {
  if (window.dataurlt && window.datas) {
    urltc(window.dataurlt, window.datas);
  } else {
    alert("未找到data.db数据");
  }
}

/* ========== 最近10次卡片（画布）- 从 image.css 取封面 ========== */
function lg_drawCards(ctx, items, xOffset, yOffset) {
  const scale = 1;
  const cardWidth = 340 * scale;
  const cardHeight = 100 * scale;
  const imgWidth = 110 * scale;
  const imgHeight = 70;
  const columnSpacing = 360 * scale;
  const rowSpacing = 110 * scale;

  const imagePromises = items.map(async (item, i) => {
    const x = xOffset + (i % 2) * columnSpacing;
    const y = yOffset + Math.floor(i / 2) * rowSpacing;

    ctx.fillStyle = 'rgba(104, 118, 122, 0.4)';
    ctx.fillRect(x, y, cardWidth, cardHeight);

    ctx.font = `${13 * scale}px Arial`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = (i < 10) ? '#FAFAFA' : '#C9C9C9';
    ctx.fillText(`#${i + 1}`, x + cardWidth - 10, y + 5);

    let strScore = item.score.toString().padStart(7, '0');

    let scoreColor;
    if (item.score_good_count + item.score_bad_count + item.score_miss_count == 0) {
      const gradient = ctx.createLinearGradient(x, y + 40 * scale, x, y + 70 * scale);
      gradient.addColorStop(0, '#99C5FB');
      gradient.addColorStop(1, '#D8C3FA');
      scoreColor = gradient;
    } else if (item.score_bad_count + item.score_miss_count == 0) {
      scoreColor = '#90CAEF';
    } else {
      scoreColor = '#FFFFFF';
    }

    ctx.font = `${28 * scale}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillStyle = scoreColor;
    ctx.fillText(strScore, x + 128, y + 42 * scale);
    ctx.font = `${15 * scale}px Arial`;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`P:${(item.score_perfect_count + item.score_exact_count).toString()}(+${item.score_exact_count.toString()})`, x + 240, y + 48 * scale);
    ctx.fillText(`G:${item.score_good_count.toString()}  L:${item.score_bad_count.toString()}/${item.score_miss_count.toString()}`, x + 240, y + 68 * scale);

    const maxTextWidth = 200;
    let currentFontSize = 19 * scale;
    ctx.font = `${currentFontSize}px Arial`;
    let textWidth = ctx.measureText(item.name).width;
    while (textWidth > maxTextWidth && currentFontSize > 10) {
      currentFontSize--;
      ctx.font = `${currentFontSize}px Arial`;
      textWidth = ctx.measureText(item.name).width;
    }
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(item.name, x + 130, y + 18);

    ctx.font = `${15 * scale}px Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`${item.category} ${parseFloat(item.constant).toFixed(1)} > ${item.singleReality.toFixed(2)}`, x + 130, y + 75 * scale);

    // 曲绘图（从 CSS 类）
    const coverClass = songNameToCssClass(item.name);
    try {
      const img = await tryLoadFirstCssImage([coverClass, 'nya']);
      ctx.drawImage(img, x + 10 * scale, y + 13 * scale, imgWidth, imgHeight);
    } catch (e) {
      console.warn('封面加载失败(来自 image.css):', coverClass, e);
    }
  });

  return Promise.all(imagePromises);
}

function checkTop20V3Condition() {
  if (!window.processedItems || window.processedItems.length === 0) {
    return true;
  }

  const itemsToCheck = window.processedItems
    .sort((a, b) => b.singleRealityRaw - a.singleRealityRaw)
    .slice(0, Math.min(20, window.processedItems.length));

  const allMeetCondition = itemsToCheck.every(it =>
    it.isV3 ||
    it.bestLevel <= 1 ||
    it.bestScore >= 1005000 ||
    (Array.isArray(it.achievedStatus) && (it.achievedStatus.includes(2) || it.achievedStatus.includes(5)))
  );

  return allMeetCondition ? true : false;
}

function readFileAsDataURL(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

function escapeHtml(str) {
  const el = document.createElement('div');
  el.textContent = str;
  return el.innerHTML;
}

async function downloadImage() {
  // 显示生成进度 UI（项目里已有 ol_runner/ol_updateImgGenProcess）
  // if (typeof ol_runner === 'function') {
  //   ol_runner((e) => { document.getElementById('picgen').style.display = 'block' }, [114, 514]);
  // }
  console.log("test")
  // 读取要导出的卡片数量 & 过滤设置
  const cardCount = parseInt(document.getElementById('cardCount').value, 10);
  const maxItems = Math.max(0, cardCount);
  const items = window.processedItems || [];
  const excludeReality = document.getElementById('excludeReality')?.value;
  window.norlt = (excludeReality == "true") ? items.filter(item => item.constant < 1e-3) : [];
  const actualCardCount = Math.min(maxItems, items.length);

  // 愚人节模式
  const yrjds = document.getElementById('yrjds')?.value;
  // 星标（看最高定数且PF）
  // 星星数量
  let star = 0;
  let maxConstant = -Infinity;
  // console.log(items)
  const progress = {
    "DZ": {
      "all": 0,
      "ap": 0,
      "fc": 0,
      "cl": 0,
    },
    "SK": {
      "all": 0,
      "ap": 0,
      "fc": 0,
      "cl": 0,
    },
    "CB": {
      "all": 0,
      "ap": 0,
      "fc": 0,
      "cl": 0,
    },
    "CL": {
      "all": 0,
      "ap": 0,
      "fc": 0,
      "cl": 0,
    }
  }
  Object.values(constants).forEach(item => {
    if (item.category == "DZ" || item.category == "SK" || item.category == "CB" || item.category == "CL") {
      progress[item.category].all++
    }
  });
  items.forEach(item => {
    if (item.achievedStatus?.includes(5) && item.constant > maxConstant) {
      maxConstant = item.constant;
    }
    if (item.category == "DZ" || item.category == "SK" || item.category == "CB" || item.category == "CL") {
      // progress[item.category].all++
      if (item.bestLevel !== 6) {
        progress[item.category].cl++;
      }
      if ((Array.isArray(item.achievedStatus) && item.achievedStatus.includes(5)) || item.bestLevel === 0) {
        progress[item.category].ap++
      }
      if ((Array.isArray(item.achievedStatus) && item.achievedStatus.includes(4)) || item.bestLevel === 0) {
        progress[item.category].fc++
      }
    }

  });



  if (yrjds == 'true') {
    // 愚人节都是 longbee
    maxConstant *= 20;
  }
  if (maxConstant > 12) star = 3;
  else if (maxConstant > 9) star = 2;
  else if (maxConstant > 6) star = 1;

  if (yrjds == 'true') {
    if (maxConstant > 240) star = 114514;
    else if (maxConstant > 200) star = 9;
    else if (maxConstant > 180) star = 8;
    else if (maxConstant > 170) star = 7;
    else if (maxConstant > 140) star = 6;
    else if (maxConstant > 120) star = 5;
    else if (maxConstant > 100) star = 4;
  }

  // 选择背景图：优先文件输入（自定义），否则随机选
  const bgInput = document.getElementById('bgImage');
  const hasFile = bgInput && bgInput.files && bgInput.files[0];
  async function getBgFile() {
    if (hasFile) {
      const bg_filename = await readFileAsDataURL(hasFile);
      return bg_filename;
    } else if (yrjds == 'true') {
      return `./jpgs/background/yrj-${Math.floor(Math.random() * 3) + 1}.jpg`;
    } else {
      return `./jpgs/background/${Math.floor(Math.random() * 8) + 1}.jpg`;
    }
  }
  const bg_filename = await getBgFile();
  // console.log("bgfile", bg_filename)

  const isRealityV3 = checkTop20V3Condition();

  // 时间
  const now = new Date();
  const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;

  // ctx.fillText(`Date: ${dateStr}`, 660, 190);
  // drawTip();
  const htmlTipsResponse = await fetch('./tips_html.txt');
  const text = await htmlTipsResponse.text();
  let tip;
  tip = ""
  let lines = []
  if (window.tipsCache) {
    lines = window.tipsCache;
    // 构造 tip
  }
  if (window.average1 >= 13.45 && Math.random() < 0.75) {
    tip = lines[Math.floor(Math.random() * Math.min(n, lines.length))];

  } else {
    tip = lines[Math.floor(Math.random() * lines.length)];
  }
  // 防止被解析为 html
  lines = lines.map(x => escapeHtml(x))
  lines = lines.concat(text.trim().split('\n'))
  const username = escapeHtml(window.Nickname ? window.Nickname : window.username ? window.username : 'UNKNOWN')
  tip = tip != '' ? 'Tip: ' + tip.replaceAll('\{Name\}', username) : '';
  // console.log("tips", lines)

  const average1 = (yrjds != "true" ? window.average1 : window.average * 20)?.toFixed(2);
  const average = yrjds != "true" ? window.average : (window.average * 20);
  // console.log(average1, average)
  // 默认 2 列宽度
  let width = 1000
  // console.log(actualCardCount)
  const totalCardCount = actualCardCount + window.norlt.length
  if (totalCardCount > 480) {
    width = 3300
  }
  else if (totalCardCount > 240) {
    width = 2900
  }
  else if (totalCardCount > 120) {
    width = 2500
  }
  else if (totalCardCount > 60) {
    width = 2000
  }
  else if (totalCardCount > 30) {
    width = 1500
  }
  // console.log(width)

  const input = document.getElementById('inputData')?.value || '';
  const data = 'userdata:' + (window.data || input);

  const htmlHead = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>查分结果-${new Date().toISOString().replace(/[:\-T]/g, '_').split('.')[0]}</title>
        <style>
            @font-face {
                font-family: 'Chill Round';
                src: url('./fonts/Chill Round/ChillRoundF v3.0.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }

            @font-face {
                font-family: 'alimamafangyuanti';
                src: url('./fonts/alimamafangyuanti/AlimamaFangYuanTiVF-Thin.ttf') format('truetype');
                font-style: normal;
            }

            * {
                box-sizing: border-box;
                border-width: 0px;
                border-style: solid;
                border-color: initial;
                border-image: initial;
                margin: 0px;
                padding: 0px;
                font-family: 'Chill Round', Geist Variable, -apple-system, BlinkMacSystemFont, PingFang SC, Microsoft YaHei, Heiti SC, WenQuanYi Micro Hei, sans-serif;
            }


            body {
                background-color: #1e1e24;
                color: white;
            }
            main {
                width: 100%;
                min-height: 1778px;
                background-color: #0009;
                /* backdrop-filter: blur(10px); */
            }

            .main-container {
                min-height: 1778px;
            }

            .bg {
                background-image: url(${bg_filename});
                background-size: cover;
                min-height: 1778px;
                background-position: center;
                width: ${width}px;
                margin: auto;
            }

            .top {
                background-size: cover;
                background-position: center;
            }

            .avatar {
                border-radius: 999px;
                position: relative;
                width: 80px;
                box-shadow: 0 0 15px rgba(12, 12, 20, 0.384), 0px 10px 15px rgba(15, 15, 22, 0.18);
            }

            .avatar-container {
                display: flex;
                flex-direction: row-reverse;
            }

            .reality {
                display: flex;
                align-items: center;
                justify-content: right;
            }

            .name-reality {
                margin-right: 20px;
                text-align: right;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                font-size: 0.9em;
                word-break: break-all;
            }

            .name {
                line-height: 1.5em;
                font-size: 1.5em;
                max-width: calc(${width}px - 550px);
                overflow: hidden;
                text-wrap-mode: nowrap;
            }

            .topmain {
                display: flex;
                justify-content: space-between;
            }

            .down {
                padding: 40px;
                padding-top: 10px;
                padding-bottom: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(380px, max-content));
                gap: 30px;
                justify-content: center;
                align-items: start;
                justify-items: start;
            }

            h1 {
                font-weight: normal;
                font-size: 2.5em;
                margin-bottom: 0.3em;
            }

            .reality-content {
                padding: 3.8px;
                color: black;
                background-color: #fff;
                padding-left: 10px;
                padding-right: 10px;
                border-radius: 999px;
            }

            .reality-text {
                font-size: 1.3em;
                margin-left: 13px;
                font-weight: 600;
                font-family: 'alimamafangyuanti';
            }


            .star {
                position: absolute;
                top: 58px;
                left: 0;
                width: 80px;
                /* height: 20px; */
            }

            .reality-v3 {
                background: url(./jpgs/v3-bg.png);
                background-size: cover;
                text-shadow: 1px 1px 0 #00000081;
                box-shadow: 0 0 14px #6945f7;
                /* background-position-y: 1px; */
                color: white;
            }

            .reality-v50 {
                background: url(./jpgs/v50-bg.png);
                background-size: cover;
                text-shadow: 1px 1px 0 #00000081;
                box-shadow: 0 0 14px rgba(255, 45, 45, 0.77);
                /* background-position-y: 1px; */
                color: white;
            }

            .texts {
                line-height: 1.7em;
                padding-left: 0.2em;
            }


            .cover {
                padding: 40px;
                padding-bottom: 20px;
                background: linear-gradient(to top, #0000 0%, #0000 0%, #000B 100%);
                width: 100%;
                position: relative;
                height: 100%;
            }

            .avatar-container {
                height: 100%;
            }

            .bottom {
                max-width: calc(100% - 250px);
            }

            .links {
                color: #cfccdb;
            }

            .cardimg {
                /* max-width: 210px; */
                /* width: 100%; */
                height: 100%;
                display: flex;
                justify-self: center;
                /* border-radius: 15px; */
            }

            .cardimgcover {
                width: 204.444px;
                height: 115px;
                margin-right: 8px;
                border-radius: 15px;
            }

            .cardbg {
                width: 100%;
                height: 100%;
                border-radius: 15px;
                overflow: hidden;
                backdrop-filter: blur(10px);
            }

            .cardcover {
                display: flex;
                padding: 10px;
                align-items: center;
                width: 450px;
                background-color:rgba(48, 48, 63, 0.85);
                box-shadow: 0 5px 5px #0b143377;
                height: 136px;
                border-radius: 23px;
            }

            .cardcover-v3 {
                /* background: linear-gradient(45deg,rgba(58, 57, 88, 0.85),rgba(49, 41, 77, 0.85)); */
                background-color: rgba(49, 48, 85, 0.85);
            }

            .card {
                background-size: cover;
                /* fill-opacity: 0.5%; */
                backdrop-filter: blur(10px);
                border-radius: 25px;
            }

            #capture {
                padding: 10px;
                width: 200px;
                border-radius: 100px;
                height: 50px;
                cursor: pointer;
                display: flex;
                justify-self: center;
                align-items: center;
                justify-content: center;
                /* text-align: center; */
                font-size: 1.5em;
                transition: background-color 0.2s;
                margin: 20px;
            }

            #capture:hover {
                background-color: #DDD;
            }

            #capture:active {
                background-color: #BBB;
            }

            .cardtext {
                color: white;
                padding: 5px;
                width: 205px;
            }

            .grade {
                max-width: 50px;
                margin: -10px;
                margin-top: -8px;
            }

            .gradetext {
                font-size: 2em;
                display: flex;
                align-items: center;
                margin-bottom: 5px;
            }

            .score {
                padding-left: 10px;
            }

            a {
                text-decoration: none;
                color: #7fa1ff;
            }

            .R {
                background: linear-gradient(0deg, #9A6EFA, #92C5FA);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent;
            }

            .FC {
                color: white;
            }

            .AP {
                background: linear-gradient(0deg, #A174FA, #E4D7FE);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent;
            }

            .CB {
                /* background-color: #9368f0; */
                background: linear-gradient(45deg, #6479f1, #9567e9);
            }

            .CL {
                background: linear-gradient(45deg, #727272, #d3d3d3);
                /* background-color: #fff; */
            }

            .DZ {
                background: linear-gradient(45deg, #b2b5c5, #93dbdb);
            }

            .SK {
                background: linear-gradient(45deg, #6584e2, #9cb8ec);
            }

            .UN {
                background: linear-gradient(45deg, #1a1da7, #4d77ec);
            }

            .SP {
                background: linear-gradient(45deg, #FFF, #FFF);
            }

            .textp {
                padding-left: 5px;
                padding-right: 5px;
            }

            footer {
                padding: 20px;
                padding-top: 30px;
                color: #ffffffc5;
                text-align: center;
                background: linear-gradient(to bottom, #0000 0%, #000B 100%);
            }

            .split-title {
                margin: 20px 40px;
                display: flex;
                align-items: center;
                color: #d1d8ff;
            }

            .line {
                border: 3px solid #d1d8ff;
                height: 25px;
                border-radius: 100px;
            }

            .split-title h2 {
                font-weight: normal;
                margin-right: 10px;
                padding-left: 7px;
            }

            .split-title hr {
                background-color: #bbc5ff;
                height: 4px;
                width: 100%;
                border-radius: 100px;
            }

            .progress {
                display: flex;
                align-items: center;
                /* margin-bottom: 10px; */
            }

            .progress p {
                margin-right: 5px;
                font-size: 0.85em;
            }

            .prog-line {
                width: 5px;
                height: 18px;
                margin-right: 6px;
                margin-left: 10px;
                border-radius: 100px;
            }

            .progress-container {
                margin-bottom: 20px;
                margin-left: 0px;
                display: flex;
            }

        </style>
    </head>
    <body>
    <script src="https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js"></script>
        <div class="bg">
            <main>
                <div class="main-container">
                    <aside class="top">
                        <div class="cover">
                            <div class="topmain">
                                <div class="info">
                                    <h1>Milthm-Calculator</h1>
                                    <div class="texts">
                                        <p>Generated From: ${window.location.href}</p>
                                        <p>Chart Progress:</p>
                                        <div
                                            class="progress-container">
                                            <section>
                                                <div class="progress">
                                                    <div
                                                        class="prog-line CL"></div>
                                                    <p style="color: #efbaff;">
                                                        AP ${progress.CL.ap}
                                                    </p>
                                                    <p style="color: #84C9FA;">
                                                        FC ${progress.CL.fc}
                                                    </p>
                                                    <p style="color: #c4c4c4;">
                                                        CL ${progress.CL.cl}</p>
                                                    <p>/ ${progress.CL.all}</p>
                                                </div>
                                                <div class="progress">
                                                    <div
                                                        class="prog-line CB"></div>
                                                    <p style="color: #efbaff;">
                                                        AP ${progress.CB.ap}
                                                    </p>
                                                    <p style="color: #84C9FA;">
                                                        FC ${progress.CB.fc}
                                                    </p>
                                                    <p style="color: #c4c4c4;">
                                                        CL ${progress.CB.cl}</p>
                                                    <p>/ ${progress.CB.all}</p>
                                                </div>
                                            </section>
                                            <section>

                                                <div class="progress">
                                                    <div
                                                        class="prog-line SK"></div>
                                                    <p style="color: #efbaff;">
                                                        AP ${progress.SK.ap}
                                                    </p>
                                                    <p style="color: #84C9FA;">
                                                        FC ${progress.SK.fc}
                                                    </p>
                                                    <p style="color: #c4c4c4;">
                                                        CL ${progress.SK.cl}</p>
                                                    <p>/ ${progress.SK.all}</p>
                                                </div>
                                                <div class="progress">
                                                    <div
                                                        class="prog-line DZ"></div>
                                                    <p style="color: #efbaff;">
                                                        AP ${progress.DZ.ap}
                                                    </p>
                                                    <p style="color: #84C9FA;">
                                                        FC ${progress.DZ.fc}
                                                    </p>
                                                    <p style="color: #c4c4c4;">
                                                        CL ${progress.DZ.cl}</p>
                                                    <p>/ ${progress.DZ.all}</p>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                                <div style="height: 100%; text-align: right;">
                                    <div class="avatar-container">
                                        <div class="avatar">
                                            <img src="./jpgs/${yrjds != 'true' ? 'avatar.png' : 'avatar-aprilfools.png'}"
                                                class="avatar">
                                            ${star > 0 ? '<img class="star" src="./jpgs/' + star + '-star.png">' : ''}
                                        </div>
                                        <div class="name-reality">
                                            <p
                                                class="name">${username}</p>
                                            <div class="reality">
                                                <p
                                                    class="reality-content ${yrjds != 'true' ? isRealityV3 ? 'reality-v3' : '' : 'reality-v50'}">${yrjds != 'true' ? 'REALITY' : 'YTILAER'}</p>
                                                <p
                                                    class="reality-text">${average1 ? average1 : '0.00'}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style="line-height: 1.7em;">
                                        <p style="margin-top: 30px;">TOP20 AVG
                                            ${average ? average.toFixed(5) : '0.00000'}</p>
                                        <p></p>
                                        <p>At ${dateStr}</p>
                                    </div>

                                </div>
                            </div>
                            <div class="bottom">
                                <p>${tip}</p>
                            </div>
                        </div>
                    </aside>`;

  const htmlFoot = `
                  </div>
                <footer>
                    <p style="margin-bottom: 10px;">Generated by
                        Milthm-Calculator | Theme
                        <span style="color: #c3a3ff;">
                            MilAerno
                        </span>
                        Designed by
                        <a href="https://www.xzadudu179.top"
                            target="_blank">xzadudu179</a>
                    </p>
                    <p style="font-size: 0.9em; color: #DDD;">
                        ${Updated}
                    </p>
                </footer>
            </main>
            </div>
            <button id="capture">保存图片</button>
        <script>
        const date = "${new Date().toISOString().replace(/[:\-T]/g, '_').split('.')[0]}"
        const parents = document.querySelectorAll('.down');
            parents.forEach((parent, i) => {
                if (parent && parent.children.length === 1) {
                    parent.style.display = 'grid';
                    parent.style.justifyContent = 'start';
                }
            })
        let isDownloading = false;
        function waitForImages(selector = 'img') {
                const images = Array.from(document.querySelectorAll(selector));
                const promises = images.map(img => {
                    if (img.complete) return Promise.resolve();
                    return new Promise(resolve => {
                        img.onload = img.onerror = resolve;
                    });
                });
                return Promise.all(promises);
            }

            async function download() {
                // 等待所有 <img> 加载完成
                await waitForImages();

                const element = document.querySelector('.bg');
                const dataURL = await htmlToImage.toPng(element, {
                    pixelRatio: ${totalCardCount < 50 ? '2' : '1'},
                    style: {
                        margin: '0',
                        transform: 'translate(0, 0)',
                    },
                });

                // --- 将 dataURL 转 Uint8Array ---
                const base64Data = dataURL.split(',')[1];
                const pngBinary = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

                // --- JSON 数据 ---
                const jsonStr = '${data}';

                // 将 JSON 转成 Uint8Array
                const txtBytes = new TextEncoder().encode(jsonStr);

                // 合并 PNG 和 JSON
                const combined = new Uint8Array(pngBinary.length + txtBytes.length);
                combined.set(pngBinary, 0);
                combined.set(txtBytes, pngBinary.length);

                // 下载合并后的 PNG
                const blob = new Blob([combined], { type: 'image/png' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'output_MilAerno_' + date + '.png';
                link.click();
            }

            document.querySelector('#capture').addEventListener('click', async () => {
                if (isDownloading) {
                  alert("正在下载中...");
                  return;
                }
                isDownloading = true;
                await download();
                isDownloading = false;
            })

            window.onload = async () => {
                await download()
            };
        </script>
    </body>
</html>`;
  // // 绘制卡片并导出
  const cardsHtml = getCardHtml(items, actualCardCount);
  // // console.log(cardsHtml);
  const htmlContent = htmlHead + cardsHtml + htmlFoot;
  // 打开一个新窗口或新标签页
  const newWindow = window.open('', '_blank');

  // 往新窗口写入 HTML 内容
  newWindow.document.open();
  newWindow.document.write(htmlContent);
  newWindow.document.close();
}

/* ========== 下载图片 (含背景、卡片等，全部从 image.css 取图) ========== */
function archiveDownloadImage() {
  // 显示生成进度 UI（项目里已有 ol_runner/ol_updateImgGenProcess）
  if (typeof ol_runner === 'function') {
    ol_runner((e) => { document.getElementById('picgen').style.display = 'block' }, [114, 514]);
  }

  // 读取要导出的卡片数量 & 过滤设置
  const cardCount = parseInt(document.getElementById('cardCount').value, 10);
  const maxItems = Math.max(0, cardCount);
  const items = window.processedItems || [];
  const excludeReality = document.getElementById('excludeReality')?.value;
  window.norlt = (excludeReality == "true") ? items.filter(item => item.constant == -1) : [];
  const actualCardCount = Math.min(maxItems, items.length);

  // 画布尺寸
  const baseHeight = 2200;
  const newHeight = 400 + Math.ceil(((actualCardCount + (window.norlt?.length || 0)) / 2) * 165);
  const canvasHeight = Math.max(baseHeight, newHeight);
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  // 星标（看最高定数且PF）
  let star = '';
  let maxConstant = -Infinity;
  items.forEach(item => {
    if (item.achievedStatus?.includes(5) && item.constant > maxConstant) {
      maxConstant = item.constant;
    }
  });
  if (maxConstant > 12) star = '☆☆☆';
  else if (maxConstant > 9) star = '☆☆';
  else if (maxConstant > 6) star = '☆';

  // 选择背景图：优先文件输入（自定义），否则从 image.css 随机选 .bg-image-1/2/3（若均失败，退回 .background-image）
  const bgInput = document.getElementById('bgImage');
  const hasFile = bgInput && bgInput.files && bgInput.files[0];

  const drawHeaderAndProceed = async () => {
    // 头部半透明底
    ctx.fillStyle = 'rgba(128, 128, 128, 0.3)';
    ctx.fillRect(0, 50, canvas.width, 200);

    // 斜线
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255,255,255,0.8)';
    ctx.lineWidth = 3;
    ctx.moveTo(550, 250);
    ctx.lineTo(650, 50);
    ctx.stroke();

    // 星标 + 玩家信息
    ctx.font = '25px Arial';
    ctx.fillStyle = '#ffffff';
    const yrjds = document.getElementById('yrjds')?.value;

    if (yrjds == "true") {
      ctx.font = '23px Arial';
      ctx.fillText("☆", 719, 15);
      ctx.fillText("☆☆☆", 696, 35);
      ctx.fillText("☆☆☆☆☆", 673, 55);
      ctx.fillText("☆☆☆☆☆☆☆", 650, 75);
      ctx.font = '25px Arial';
    } else {
      ctx.fillText(star, 660, 75);
    }

    ctx.fillText(`Player: ${window.username || ''}  (${window.Nickname || ''})`, 660, 100);
    ctx.fillText(`userID: ${window.userID || ''}`, 660, 128);
    if (yrjds == "true") {
      ctx.fillText(`Reality: ${(window.average * 20).toFixed(4)}    🐉👃👈😨`, 660, 160);
    } else {
      let text = `Reality: ${window.average1 ?? ''}`;
      if ((window.average1 || 0) >= 13.4) text += "    🐉👃👈😨";
      ctx.fillText(text, 660, 160);
    }
    //ctx.fillText(`Ytilaer: ${(window.utlr || 0).toFixed(4)}`, 660, 160);

    // 时间
    const now = new Date();
    const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
    ctx.fillText(`Date: ${dateStr}`, 660, 190);
    drawTip();


    // 绘制 tip 的函数
    function drawTip() {
      if (!window.tipsCache) {
        console.warn('Tips 尚未加载完成！');
        return;
      }
      let lines = window.tipsCache;
      const n = 1;
      let tip;

      if (window.average1 >= 13.45 && Math.random() < 0.75) {
        tip = lines[Math.floor(Math.random() * Math.min(n, lines.length))];
      } else {
        tip = lines[Math.floor(Math.random() * lines.length)];
      }

      // 替换 {Name} 并加前缀
      tip = 'Tip: ' + tip.replace(/\{Name\}/g, window.username || "玩家");

      // 自动换行（逐字符）
      const maxWidth = 500;
      const lineHeight = 24;
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';

      let line = '', y = 220, x = 660;
      for (let char of tip) {
        const testLine = line + char;
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
          ctx.fillText(line, x, y);
          line = char;
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      if (line) ctx.fillText(line, x, y);
    }


    // 左侧标题与链接
    ctx.font = '50px Arial';
    ctx.fillText('Milthm-calculator', 100, 95);
    ctx.font = '25px Arial';
    ctx.fillText('https://mhtlim.top/', 100, 125);
    ctx.fillText('http://k9.lv/c/', 100, 153);
    ctx.fillText('https://milcalc.netlify.app/', 100, 181);
    ctx.fillText('https://mkzi-nya.github.io/c/', 100, 207);
    ctx.font = '30px Arial';
    ctx.fillText('←查分上这里', 400, 130);
    ctx.font = '20px Arial';
    ctx.fillText("这几个网址都行", 440, 155);
    ctx.fillText(Updated, 100, 230);

    // 组装要绘制的项目（含可选的 “排除 Reality” 列表）
    const exportItems = [...(items.slice(0, actualCardCount)), ...(window.norlt || [])];

    // 预加载每张卡所需的两种图：封面 + 段位/等级icon（都来自 image.css）
    if (typeof ol_runner === 'function') {
      ol_runner(ol_updateImgGenProcess, ['正在加载图片...']);
    }

    const imgPairsPromises = exportItems.map(async (i) => {
      // 封面
      const coverClass = songNameToCssClass(i.name);
      let coverImg = null;
      try {
        coverImg = await tryLoadFirstCssImage([coverClass, 'nya']);
      } catch (e) {
        console.warn('封面加载失败(来自 image.css):', coverClass, e);
      }

      // 等级/段位：映射到 .icon-N
      const iconClass = getLevelIconClass(i);
      let iconImg = null;
      if (iconClass) {
        try {
          iconImg = await loadCssImage(iconClass);
        } catch (e) {
          // 没有对应 icon 也不致命
          iconImg = null;
        }
      }
      if (typeof ol_runner === 'function') {
        ol_runner(ol_updateImgGenProcess, ['正在加载图片 For ' + (i.name || '')]);
      }
      return [coverImg, iconImg];
    });

    const imgPairs = await Promise.all(imgPairsPromises);
    if (typeof ol_runner === 'function') {
      ol_runner(ol_updateImgGenProcess, ['完成']);
    }

    // 绘制卡片并导出
    drawCards(ctx, canvas, exportItems, imgPairs);
  };

  // 先画背景，再画其他
  const drawWithBg = (bgImg) => {
    if (bgImg) {
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    drawHeaderAndProceed();
  };

  // 背景加载分支
  if (hasFile) {
    // 用户自选背景文件（本地）
    const file = bgInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => drawWithBg(img);
      img.onerror = () => {
        console.warn('自定义背景加载失败，改用 CSS 背景');
        loadCssImage('background-image')
          .then(drawWithBg)
          .catch(() => drawWithBg(null));
      };
      img.src = reader.result;
    };
    reader.onerror = () => {
      console.warn('自定义背景读取失败，改用 CSS 背景');
      loadCssImage('background-image')
        .then(drawWithBg)
        .catch(() => drawWithBg(null));
    };
    reader.readAsDataURL(file);
  } else {
    // 从 CSS 随机取 .bg-image-1/2/3，若都失败，用 .background-image
    (async () => {
      const order = [1, 2, 3].sort(() => Math.random() - 0.5);
      for (const idx of order) {
        try {
          const img = await loadCssImage(`bg-image-${idx}`);
          drawWithBg(img);
          return;
        } catch (_) { /* try next */ }
      }
      try {
        const fallback = await loadCssImage('background-image');
        drawWithBg(fallback);
      } catch (_) {
        drawWithBg(null);
      }
    })();
  }
}
/** 由条目计算段位/等级图标 CSS 类名（映射到 .icon-N） */
function getLevelIconClass(it) {
  // 与原先 ./jpgs/?.png 的逻辑一致：
  //   bestLevel === 0 ? "0"
  //   : bestLevel === 6 ? "6"
  //   : achievedStatus includes(5) ? `${bestLevel}0`
  //   : achievedStatus includes(4) ? `${bestLevel}1`
  //   : `${bestLevel}`
  if (it == null) return null;
  let iconName;
  if (it.bestLevel === 0) iconName = '0';
  else if (it.bestLevel === 6) iconName = '6';
  else if (Array.isArray(it.achievedStatus) && it.achievedStatus.includes(5)) iconName = `${it.bestLevel}0`;
  else if (Array.isArray(it.achievedStatus) && it.achievedStatus.includes(4)) iconName = `${it.bestLevel}1`;
  else iconName = `${it.bestLevel}`;

  // 数字类统一映射为 .icon-{N}
  // 若 iconName 不是纯数字，尝试解析；失败则不显示 icon
  const n = Number(iconName);
  if (!Number.isFinite(n)) return null;
  return `icon-${n}`;
}

function getLevelIconName(it) {
  // 与原先 ./jpgs/?.png 的逻辑一致：
  //   bestLevel === 0 ? "0"
  //   : bestLevel === 6 ? "6"
  //   : achievedStatus includes(5) ? `${bestLevel}0`
  //   : achievedStatus includes(4) ? `${bestLevel}1`
  //   : `${bestLevel}`
  if (it == null) return null;
  let iconName;
  if (it.bestLevel === 0) iconName = '0';
  else if (it.bestLevel === 6 || it.bestLevel === 7) iconName = '6';
  else if (Array.isArray(it.achievedStatus) && it.achievedStatus.includes(5)) iconName = `${it.bestLevel}0`;
  else if (Array.isArray(it.achievedStatus) && it.achievedStatus.includes(4)) iconName = `${it.bestLevel}1`;
  else iconName = `${it.bestLevel}`;
  console.log("it", it, iconName)
  // 数字类统一映射为 .icon-{N}
  // 若 iconName 不是纯数字，尝试解析；失败则显示 ERROR icon
  const n = Number(iconName);
  if (!Number.isFinite(n)) return '-1.png';
  return `${n}.png`;
}

function limitText(str, len = 16) {
  return str.length > len ? str.slice(0, len) + '...' : str;
}

// 得到卡片 html
function getCardHtml(items, maxCount) {
  const htmls = []
  const getItemHtml = (it, i, ignoreMaxCount = false, numberPrefix = '#', maxTitleLen = 14) => {
    if (i + 1 > maxCount && !ignoreMaxCount) {
      return
    }
    const number = numberPrefix + (i + 1);

    // 分数（含渐变颜色）
    const scoreStr = String(it.bestScore ?? 0).padStart(7, '0');
    const songName = escapeHtml(limitText(it.name, maxTitleLen))

    // 评级/常数/准确率 行
    // ctx.font = '20px Arial';
    const acc = `${(((it.bestAccuracy ?? 0) * 100) || 0).toFixed(2)}%`;
    let consttext = `${it.constantv3.toFixed(1)}`;
    const yrjds = document.getElementById('yrjds')?.value;
    const singleReality = yrjds != "true" ? it.singleReality : (it.singleReality * 20).toFixed(2)
    if (yrjds == "true") {
      consttext = `${(it.constantv3 * 20).toFixed(1)}`;
    }
    const rating = `${it.category} ${consttext} &gt; ${(singleReality ?? '0.00')}`
    // 目标分
    // ctx.font = '13px Arial';
    const targetScore = findScore(
      it.constantv3 ?? 0,
      Math.ceil((window.average ?? 0) * 100 - 0.5) + 0.5 !== (window.average ?? 0) * 100
        ? (Math.ceil((window.average ?? 0) * 100 - 0.5) + 0.5 - (window.average ?? 0) * 100) / 5 +
        Math.max(singleReality ?? 0, yrjds != "true" ? items?.[19]?.singleRealityRaw ?? 0 : (items?.[19]?.singleRealityRaw ?? 0) * 20)
        : 114514, yrjds != "true" ? "No remaining" : "🐉👃👈😨"
    );
    // ctx.fillText(`>>${targetScore}`, x + 212, y + 86);
    const targetScoreText = `&gt;&gt; Goal: ${String(targetScore).padStart(7, '0')}`
    // 封面与段位图
    // 等级/段位：映射到 .icon-N
    const iconName = getLevelIconName(it);
    const imgName = it.name.replaceAll("#", '').replaceAll("?", '').replaceAll(">", '').replaceAll("<", '').replaceAll("*", '').replaceAll('"', '').replaceAll("|", '').replaceAll("/", '').replaceAll("\\", '').replaceAll(":", '');
    const coverImgName = `${imgName}.jpg`;
    const iconImgName = iconName;
    // const coverImgName = imgPairs[i]?.[0] || '';
    // const iconImgName = imgPairs[i]?.[1] || '';
    let gradeClass = ''
    if (iconImgName == '0' || iconImgName == '0-1') {
      gradeClass = 'R'
    } else if (iconImgName.length > 1 && iconImgName[1] == '0') {
      gradeClass = 'AP'
    } else if (iconImgName.length > 1 && iconImgName[1] == '1') {
      gradeClass = 'FC'
    }

    let category = it.category;
    if (category == "Ø") {
      category = 'UN'
    }
    if (category != "CB" && category != "CL" && category != "SP" && category != "UN" && category != "SK" && category != "DZ") {
      category = 'SP';
    }

    const scoreIsV3 = it.isV3 || it.bestLevel <= 1 || it.bestScore >= 1005000 || (it.achievedStatus.includes(2) || it.achievedStatus.includes(5))

    const cardHtmlText = `
  <section class="card">
      <div class="cardcover ${scoreIsV3 ? 'cardcover-v3' : ''}">
          <div class="cardimgcover"
              style="background-image: url('./jpgs/${coverImgName}'), url('./jpgs/img-error.webp');">
              <div class="cardbg">
                  <img
                      src="jpgs/${coverImgName}"
                      onerror="this.onerror=null; this.src='./jpgs/img-error.webp';"
                      alt
                      class="cardimg">
              </div>
          </div>
          <div style="position: relative;">
              <p
                  style="text-align: right; position: absolute; right: 0; top: 6px;  color:#dde3ffc9">${number}</p>
              <div class="cardtext">
                  <div
                      style="display: flex; align-items: center; padding-bottom: 9px; position: relative;">
                      <div
                          style="width: 6px; height: 18px; border-radius: 5px; margin-right: 5px;"
                          class="${category}"></div>
                      <h4
                          style="font-weight: normal"
                          class="cardtitle">${songName}</h4>

                  </div>
                  <div class="gradetext">
                      <img src="./jpgs/${iconImgName}" alt
                          class="grade">
                      <p class="score ${gradeClass}">${scoreStr}</p>
                  </div>
                  <p
                      style="margin-left: 8px; font-size: 0.9em; margin-bottom: 5px; color:#dde3ffc9;">${targetScoreText}</p>
                  <div
                      style="display: flex; justify-content: space-between; margin: 10px 8px 0 8px; align-items: center; font-size: 0.85em;">
                      <p
                          style="color: #ffffffd7;">${acc}</p>
                      <p
                          style="text-align: right; color:#a4ceff; font-size: 1em;">${rating}</p>
                  </div>
              </div>
          </div>
      </div>
  </section>`
    if (i + 1 == 21 && numberPrefix == '#') {
      htmls.push(`</aside>
        <div class="split-title">
            <div class="line"></div>
            <h2>OVERFLOW</h2>
            <hr>
        </div>
        <aside class="down">`)
    }
    htmls.push(cardHtmlText);

    // if (coverImg) ctx.drawImage(coverImg, x + 13, y + 13, imgW, imgH);
    // if (iconImg) ctx.drawImage(iconImg, x + 351, y + 26, icon, icon);
  };
  items.forEach((it, i) => { getItemHtml(it, i, false) });
  // 增加下划线
  if (window.norlt.length > 0) {
    htmls.push(`
      </aside>
          <div class="split-title">
              <div class="line"></div>
              <h2>EXTRAS</h2>
              <hr>
          </div>
      <aside class="down">
    `)
  }
  window.norlt.forEach((it, i) => { getItemHtml(it, i, true, "EX #", 11) });
  const cardsHtml = `<aside class="down">
  ${htmls.join("\n")}
  </aside>`
  return cardsHtml
}

/* 画导出图片里的卡片（封面与 icon 都用上面预加载好的 imgPairs） */
function drawCards(ctx, canvas, items, imgPairs) {
  // 固定尺寸常量（= 基础尺寸 × 1.3）
  const cardW = 442, cardH = 130, imgW = 185, imgH = 104, icon = 91;
  const x0 = 110, y0 = 350, col = 520, row = 162.5;

  items.forEach((it, i) => {
    const x = x0 + (i % 2) * col,
      y = y0 + Math.floor(i / 2) * row - (i % 2 ? 0 : 50);

    // 卡底
    ctx.fillStyle = it.isV3 || it.bestLevel <= 1 || it.bestScore >= 1005000 || (it.achievedStatus.includes(2) || it.achievedStatus.includes(5)) ? 'rgba(128,128,128,.5)' : 'rgba(128,128,128,.2)';
    ctx.fillRect(x, y, cardW, cardH);

    // 排名号
    ctx.font = '17px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = i < 20 ? '#FAFAFA' : '#C9C9C9';
    ctx.fillText(`#${i + 1}`, x + cardW - 10, y + 7);

    // 分数（含渐变颜色）
    const scoreStr = String(it.bestScore ?? 0).padStart(7, '0');
    let scoreClr = (it.achievedStatus || []).includes(5)
      ? (() => { const g = ctx.createLinearGradient(x, y + 52, x, y + 91); g.addColorStop(0, '#99C5FB'); g.addColorStop(1, '#D8C3FA'); return g })()
      : (it.achievedStatus || []).includes(4)
        ? '#90CAEF'
        : '#FFFFFF';

    ctx.font = '39px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = scoreClr;
    ctx.fillText(scoreStr, x + 208, y + 52);

    // 歌名（自动缩小）
    let f = 25;
    ctx.font = `${f}px Arial`;
    while (ctx.measureText(it.name || '').width > 200 && f > 10) {
      ctx.font = `${--f}px Arial`;
    }
    ctx.fillStyle = '#FFF';
    ctx.fillText(it.name || '', x + 212, y + 23);

    // 评级/常数/准确率 行
    ctx.font = '20px Arial';
    const acc = `${(((it.bestAccuracy ?? 0) * 100) || 0).toFixed(2)}%`;
    if (document.getElementById('yrjds')?.value === 'true') {
      ctx.fillText(
        `${it.category} ${it.yct || it.constant} > ${((it.singleRealityRaw ?? 0) * 20).toFixed(1)}   ${acc}`,
        x + 208,
        y + 98
      );
    } else {
      let consttext = `${it.constantv3.toFixed(1)}`;
      ctx.fillText(
        `${it.category} ${consttext} > ${(it.singleReality ?? '0.00')}   ${acc}`,
        x + 208,
        y + 98
      );
    }

    // 目标分
    ctx.font = '13px Arial';
    const targetScore = findScore(
      it.constantv3 ?? 0,
      Math.ceil((window.average ?? 0) * 100 - 0.5) + 0.5 !== (window.average ?? 0) * 100
        ? (Math.ceil((window.average ?? 0) * 100 - 0.5) + 0.5 - (window.average ?? 0) * 100) / 5 +
        Math.max(it.singleRealityRaw ?? 0, items?.[19]?.singleRealityRaw ?? 0)
        : 114514
    );
    ctx.fillText(`>>${targetScore}`, x + 212, y + 86);

    // 封面与段位图
    const coverImg = imgPairs[i]?.[0] || null;
    const iconImg = imgPairs[i]?.[1] || null;
    if (coverImg) ctx.drawImage(coverImg, x + 13, y + 13, imgW, imgH);
    if (iconImg) ctx.drawImage(iconImg, x + 351, y + 26, icon, icon);
  });

  exportImage(canvas);
}

/* 导出 PNG：把 userdata 也附着到图片末尾（保持原逻辑） */
function exportImage(canvas) {
  const input = document.getElementById('inputData')?.value || '';
  const data = 'userdata:' + (window.data || input);

  const imgBase64 = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
  const imgBin = atob(imgBase64);
  const txtBytes = new TextEncoder().encode(data);
  const len = imgBin.length + txtBytes.length;
  const buf = new Uint8Array(len);

  for (let i = 0; i < imgBin.length; i++) buf[i] = imgBin.charCodeAt(i);
  buf.set(txtBytes, imgBin.length);

  const blob = new Blob([buf], { type: 'image/png' });
  const link = document.createElement('a');
  const t = new Date().toISOString().replace(/[:\-T]/g, '_').split('.')[0];
  link.download = `output_${t}.png`;
  link.href = URL.createObjectURL(blob);
  link.click();

  const picgen = document.getElementById('picgen');
  if (picgen) picgen.style.display = 'none';
}

