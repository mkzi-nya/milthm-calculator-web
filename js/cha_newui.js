const Updated = "Updated at 2025.09.27 17:30(UTC+8)"
var cha_newui_js_ver = 7

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
    window.tipsCache = ['默认提示1', '默认提示2']; // Fallback
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
function loadImage_nya(){loadImageCSS().then(() => downloadImage());}
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

async function tryLoadFirstCssImage(classNames) {
  for (const cls of classNames) {
    try {
      const img = await loadCssImage(cls);
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
function findScore(constant, target) {
  // 处理特殊情况
  if (target <= 0) return 600000;
  if (target > constant + 1.5) return "Unable to deduce points";
  
  // 情况1: target >= constant + 1 (对应 score >= 850000)
  if (target >= constant + 1) {
    if (target === constant + 1.5) return 1000000;
    return Math.ceil(850000 + (target - constant) * 100000);
  }
  
  // 情况2: target >= constant + 0.5 (对应 700000 <= score < 850000)
  if (target >= constant + 0.5) {
    const denominator = constant / 300000 + 1 / 100000;
    const score = (target + constant * 11/6 + 8.5) / denominator;
    return Math.min(Math.ceil(score), 849999);
  }
  
  // 情况3: target > 0 (对应 600000 <= score < 700000)
  if (target > 0) {
    if (Math.abs(constant - 3) < 1e-6) return 600000;
    const score = 600000 + (target * 200000) / (constant - 3);
    return Math.min(Math.ceil(score), 699999);
  }
  
  return 600000;
}
function startProcess() {
  var inp = document.getElementById('inputData').value;
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

  const inputData = rawInput.replace(/\n/g, '').replace(/  /g, '');
  const isNewFormat = /^\[.*\],\{.*\}$/.test(inputData);

  let username = "";
  let userID = "";
  let allItems = [];

  if (isNewFormat) {
    const m = inputData.match(/^\[(.*?)\],\{(.*)\}$/);
    const songDataStr = m ? m[2] : "";
    username = m ? m[1] : "";

    // 抓取每个 [ ... ]（可带 ,v3）
    const songBlocks = songDataStr.match(/\[[^\[\]]*(?:\[[^\[\]]*\][^\[\]]*)*\](?:,?v3)?/g) || [];
    const items = songBlocks.map(s => processSong(s)).filter(Boolean);

    allItems = items;

    // 独立字段（新格式缺少 UserID、对象数组）
    window.extractedFields = {
      Username: username || "",
      UserID: "",
      SongRecords: [],
      SongRecordsV3: []
    };

  } else {
    const jsonText = extractJSON(rawInput);
    const parsed = tryParseJSON(jsonText) || {};
    const { Username, UserID, SongRecords, SongRecordsV3 } = extractHeaderFields(parsed);

    username = Username || parsed.UserName || "";
    userID   = UserID || "";

    const itemsSR = Array.isArray(SongRecords)
      ? SongRecords.map(rec => processSongFromOldFormat(rec, false)).filter(Boolean)
      : [];
    const itemsV3 = Array.isArray(SongRecordsV3)
      ? SongRecordsV3.map(rec => processSongFromOldFormat(rec, true)).filter(Boolean)
      : [];

    allItems = [...itemsSR, ...itemsV3];

    window.extractedFields = {
      Username: username || "",
      UserID: userID || "",
      SongRecords: Array.isArray(SongRecords) ? SongRecords : [],
      SongRecordsV3: Array.isArray(SongRecordsV3) ? SongRecordsV3 : []
    };
  }

  // —— 关键：合并 v2/v3 为单条用于全局与渲染
  const mergedItems = mergeSongVersions(allItems);

  // 全局保存：只保存合并后的
  window.processedItems = mergedItems;

  // 清空输出区域以避免多次解析时内容堆叠
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  // 排序（按合并后的 reality）
  mergedItems.sort((a, b) => b.singleRealityRaw - a.singleRealityRaw);

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

  // —— 保存回“新格式”：保留两条（不合并），v3 尾部自动加 ,v3
  formatInput(username, allItems);

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
  const scoreVal    = parseInt(score, 10);
  const accuracyVal = parseFloat(accuracy);
  const levelVal    = parseInt(level, 10);

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
        achievedStatus: Array.isArray(it.achievedStatus) ? Array.from(new Set(it.achievedStatus)).sort((a,b)=>a-b) : [],
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
    prev.achievedStatus = Array.from(union).sort((a,b)=>a-b);

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
  const accVal   = Number.isFinite(BestAccuracy) ? BestAccuracy : 0;
  const levelVal = Number.isFinite(BestLevel) ? BestLevel : 0;
  const status   = Array.isArray(AchievedStatus) ? AchievedStatus : [];

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
    if (item.isV3) {return `[${item.name},${item.category},${item.constantv3},${item.bestScore},${item.bestAccuracy},${item.bestLevel},[${(item.achievedStatus || []).join(',')}],v3]`}
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
  const UserID   = (parsed && parsed.UserID) || "";

  // SongRecords / SongRecordsV3 必须是数组才返回，否则空数组
  const SongRecords   = (parsed && Array.isArray(parsed.SongRecords))   ? parsed.SongRecords   : [];
  const SongRecordsV3 = (parsed && Array.isArray(parsed.SongRecordsV3)) ? parsed.SongRecordsV3 : [];

  return { Username, UserID, SongRecords, SongRecordsV3 };
}

/* ========== 显示用户信息 ========== */
function drawUserInfo(username, results) {
  const userInfoDiv = document.getElementById('userInfo');
  const usercontainer = document.getElementById('usercontainer');
  usercontainer.style.display = 'block';
  
  const avg = curlt(results);
  window.average = avg;
  window.average1 = Math.floor(avg*10000)/10000;
  userInfoDiv.innerHTML = `${username} ${window.average1}`;

  window.username = username;
  window.average = avg;
  window.utlr = tlr();
}

function tlr() {
  let as, ar;
  if (window.processedItems.length >= 20) {
    let items = window.processedItems;
    let aitems = window.processedItems.slice(0, 20);

    as = aitems.reduce((sum, i) => sum + i.bestScore, 0) / aitems.length;
    ar = aitems.reduce((sum, i) => sum + i.singleRealityRaw, 0) / aitems.length;
    aitems.forEach(i => {
      i.ltlr = (i.singleRealityRaw - ar) / 20 + reality(as + (i.bestScore - as) / 20, 0);
    });
    for (let i = 20; i < items.length; i++) {
      let curr = items[i];
      let ltlr = (curr.singleRealityRaw - ar) / 20 + reality(as + (curr.bestScore - as) / 20, 0);
      let minLtlrItem = aitems.reduce((min, x) => x.ltlr < min.ltlr ? x : min);
      if (ltlr > minLtlrItem.ltlr) {
        let index = aitems.indexOf(minLtlrItem);
        curr.ltlr = ltlr;
        aitems[index] = curr;

        as = aitems.reduce((sum, i) => sum + i.bestScore, 0) / aitems.length;
        ar = aitems.reduce((sum, i) => sum + i.singleRealityRaw, 0) / aitems.length;
        aitems.forEach(i => {
          i.ltlr = (i.singleRealityRaw - ar) / 20 + reality(as + (i.bestScore - as) / 20, 0);
        });
      }
    }

    ar = typeof ar !== 'undefined' ? ar : window.processedItems.slice(0, 20).reduce((sum, i) => sum + (i.singleRealityRaw || 0), 0) / window.processedItems.slice(0, 20).length;
    as = typeof as !== 'undefined' ? as : window.processedItems.slice(0, 20).reduce((sum, i) => sum + (i.bestScore || 0), 0) / window.processedItems.slice(0, 20).length;

    return reality(as, ar) - 1;
  }
  else return 0;
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
    marginBottom: `${marginBottom*0.5}px`
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
  score.style.lineHeight="1.2"
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
          processDBFile(reader.result, SQL);
        } else if (tables.includes("scores")) {
          const scores = extractScores(db);
          processHistoryRecords(scores);
          alert("注意：data.db内只包含您将Milthm更新至3.2版本之后的游玩记录，如有需要请上传save.db\n\nNote: The data.db file only contains your play records after updating Milthm to version 3.2. If needed, please upload save.db.");
        } else {
          console.error("数据库不包含 'kv' 或 'scores' 表，无法解析\nThe database does not contain the 'kv' or 'scores' table and cannot be parsed.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => handleFile(reader.result, fileName);
      reader.onerror = () => layer.msg("读取文件失败\nFailed to read the file.");
      reader.readAsText(file);
    }
    console.log("文件处理完成\nFile processing completed.");
  }catch (error) {
    console.error("处理文件时出错:", error, "\nAn error occurred while processing the file:", error);
    layer.msg("处理文件时出错，请检查文件格式是否正确\nAn error occurred while processing the file, please check if the file format is correct.", {icon: 2});
  }finally {
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
    const score_accuracy = scoreData.score_accuracy * 100
    if (constantData) {
      const { constant, category, name, yct, ad, ae, af, ag } = constantData;
      const singleReality = reality(score, constant);
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
  const username = scores[0]?.username;
  window.dataurlt=userrealityHistory;
  window.datas=scores;
  formatInput(username, items);
  loadImageCSS().then(() => urltc(userrealityHistory, scores));
  processData()
}

function geturltc() {
  if (window.dataurlt && window.datas) {
    urltc(window.dataurlt, window.datas);
  } else {
    alert("未找到data.db数据");
  }
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
  window.items = Array.from(b20_lg.values()).map(({ score, singleReality, score_accuracy, grade, score_perfect_count, score_good_count, score_bad_count, score_miss_count, 
  ...rest }) => ({
    ...rest,
    bestScore: score,
    singleRealityRaw: singleReality,
    singleReality: singleReality.toFixed(2),
    bestAccuracy: score_accuracy,
    bestLevel: score===1010000?0:score>=1005000?1:score>=950000?2:score>=900000?3:score>=850000?4:score>=800000?5:6,
    achievedStatus: (() => { const a=[3]; score>=800000&&a.push(0); score_good_count+score_bad_count+score_miss_count===0&&a.push(5); score_bad_count+score_miss_count===0&&a.push(4); score<800000&&a.push(6); return a })()

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
    ctx.fillText("推分建议", 400, 760);

    drawRadarChart(ctx, [d, e, f, g, h], 1150, 680, 700, 700);

    /* ---------- 辅助：把某曲目改成 1010000 时的 Reality 增量 ---------- */
    function realityGainIf1010000(track) {
      const sim = window.processedItems.map(o => ({ ...o }));
      let found = false;

      for (const it of sim) {
        if (it.name === track.name && Math.abs(it.constant - track.constant) < 1e-3) {
          it.bestScore        = 1010000;
          it.singleRealityRaw = reality(1010000, track.constant);
          found = true;
          break;
        }
      }
      if (!found) {
        sim.push({
          name: track.name,
          constant: track.constant,
          bestScore: 1010000,
          singleRealityRaw: reality(1010000, track.constant),
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

    /* ---------- 绘制表格 ---------- */
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
    if (item.score_good_count+item.score_bad_count+item.score_miss_count==0) {
      const gradient = ctx.createLinearGradient(x, y + 40 * scale, x, y + 70 * scale);
      gradient.addColorStop(0, '#99C5FB');
      gradient.addColorStop(1, '#D8C3FA');
      scoreColor = gradient;
    } else if (item.score_bad_count+item.score_miss_count==0) {
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

/* ========== 下载图片 (含背景、卡片等，全部从 image.css 取图) ========== */
function downloadImage() {
  // 显示生成进度 UI（项目里已有 ol_runner/ol_updateImgGenProcess）
  if (typeof ol_runner === 'function') {
    ol_runner((e)=>{document.getElementById('picgen').style.display = 'block'}, [114, 514]);
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

    ctx.fillText(`Player: ${window.username || ''}`, 660, 100);
    if (yrjds == "true") {
      ctx.fillText(`Reality: ${(window.average * 20).toFixed(4)}    🐉👃👈😨`, 660, 129);
    } else {
      let text = `Reality: ${window.average1 ?? ''}`;
      if ((window.average1 || 0) >= 12.5) text += "    🐉👃👈😨";
      ctx.fillText(text, 660, 129);
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
  let lines=window.tipsCache;
  const n = 1;
  let tip;

  if (window.average1 >= 12.7 && Math.random() < 0.75) {
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

/* 画导出图片里的卡片（封面与 icon 都用上面预加载好的 imgPairs） */
function drawCards(ctx, canvas, items, imgPairs) {
  // 固定尺寸常量（= 基础尺寸 × 1.3）
  const cardW = 442, cardH = 130, imgW = 185, imgH = 104, icon = 91;
  const x0 = 110, y0 = 350, col = 520, row = 162.5;

  items.forEach((it, i) => {
    const x = x0 + (i % 2) * col,
          y = y0 + Math.floor(i / 2) * row - (i % 2 ? 0 : 50);

    // 卡底
    ctx.fillStyle = 'rgba(128,128,128,.4)';
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
      it.constant ?? 0,
      Math.ceil((window.average ?? 0) * 100 - 0.5) + 0.5 !== (window.average ?? 0) * 100
        ? (Math.ceil((window.average ?? 0) * 100 - 0.5) + 0.5 - (window.average ?? 0) * 100) / 5 +
          Math.max(it.singleRealityRaw ?? 0, items?.[19]?.singleRealityRaw ?? 0)
        : 114514
    );
    ctx.fillText(`>>${targetScore}`, x + 212, y + 86);

    // 封面与段位图
    const coverImg = imgPairs[i]?.[0] || null;
    const iconImg  = imgPairs[i]?.[1] || null;
    if (coverImg) ctx.drawImage(coverImg, x + 13, y + 13, imgW, imgH);
    if (iconImg)  ctx.drawImage(iconImg,  x + 351, y + 26, icon, icon);
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

