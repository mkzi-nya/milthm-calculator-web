const Updated = "Updated at 2025.07.05 11:40(UTC+8)"
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

//constant位于./constant.js
/* ========== 全局变量 ========== */
let columns = 3; //默认三列布局
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

function findScore(constant, target) {
  //倒观rlt
  if (target <= constant - 1.5) return 700000;
  if (target > 1 + constant) return "Unable to deduce points";
  if (target == (1 + constant)) return 1005000;
  if (target > 0.3 + constant) {
    return Math.min(Math.ceil(10000 * (99.5 + Math.log((1.4 / (target + 0.4 - constant)) - 1) / -3.65)), 1005000);
  } else if (target > -0.5 + constant) {
    return Math.ceil(980000 + 15000 * (Math.log(((target + 0.5 - constant) / 0.8) * (Math.exp(3.1) - 1) + 1) / 3.1));
  } else {
    return Math.ceil((target - constant + 4) * 280000);
  }
  return 114514;
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
  const inputData = document.getElementById('inputData').value.replace(/\n/g, '').replace(/  /g, '');
  const format = /^\[.*\],\{.*\}$/.test(inputData) ? 'new' : 'old';
  const { username, items } = (format === 'new'
    ? (() => {
      const [, username, songDataStr] = inputData.match(/^\[(.*?)\],\{(.*)\}$/);
      const songData = songDataStr.match(/\[.*?\]/g);
      return { username, items: songData.map(processSong) };
    })()
    : (() => {
      const start = inputData.indexOf('{"UserName":');
      const end = inputData.indexOf('}]}') + 3;
      const str = inputData.slice(start, end);
      const parsed = tryParseJSON(str);
      if (!(parsed && parsed.SongRecords)) {
        alert_invalid();
        return { username: "", items: [] };
      }
      return { username: parsed.UserName, items: parsed.SongRecords.map(processSongFromOldFormat).filter(Boolean) };
    })());

  // 全局保存
  window.processedItems = items;
  // 清空输出区域以避免多次解析时内容堆叠
  document.getElementById('output').innerHTML = '';
  // 根据单曲 Reality 原始值排序
  items.sort((a, b) => b.singleRealityRaw - a.singleRealityRaw);
  // 显示用户信息
  drawUserInfo(username, items);
  //username
  // 绘制所有卡片

  const outputDiv = document.getElementById('output');
  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card-info');
  card.innerHTML = `1145141919810`;
  outputDiv.appendChild(card);
  shitValue = Math.max(1, Math.min(20, card.offsetWidth * 0.07));
  outputDiv.innerHTML = '';
  items.forEach(drawCard);
  // 格式化写回 inputData
  formatInput(username, items);

  //final for k9.lv 's upload sys
  initUpload();
}

/* ========== 工具函数 ========== */
function processSong(song) {
  /* ---------- ① 去掉最外层的方括号 ---------- */
  const raw = song.trim().slice(1, -1);   // "Contrasty Angeles,CL,12.3,...,[0,3,4]"

  /* ---------- ② 顶层逗号分割 ---------- */
  const tokens = [];
  let buf = '';
  let depth = 0;          // 记录当前处在几层 []
  for (const ch of raw) {
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    if (ch === ',' && depth === 0) {      // 只有在最外层才真正分割
      tokens.push(buf);
      buf = '';
    } else {
      buf += ch;
    }
  }
  tokens.push(buf);       // 最后一个片段

  /* ---------- ③ 解构 + 把 achievedStatus 变成数组 ---------- */
  let [title, category, constant, score, accuracy, level, achievedStatus] = tokens;
  achievedStatus = achievedStatus                 // "[0,3,4]"
    .replace(/[\[\]]/g, '')                       // "0,3,4"
    .split(',')
    .map(n => parseInt(n, 10));                   // [0, 3, 4]

  /* ---------- ④ 原有逻辑保持不变 ---------- */
  const constantVal  = parseFloat(constant);
  const scoreVal     = parseInt(score, 10);
  const accuracyVal  = parseFloat(accuracy);
  const levelVal     = parseInt(level, 10);

  const singleRealityRaw = reality(scoreVal, constantVal);

  return {
    singleRealityRaw,
    singleReality: singleRealityRaw.toFixed(2),
    constant: constantVal,          // 依旧不 toFixed
    name: title,
    category,
    bestScore: scoreVal,
    bestAccuracy: accuracyVal.toFixed(4),
    bestLevel: levelVal,
    achievedStatus                   // 现在是数组
  };
}


function processSongFromOldFormat(record) {
  const { BeatmapID, BestScore, BestAccuracy, BestLevel, AchievedStatus } = record;
  const constantObj = constants[BeatmapID];

  if (!constantObj) return null;

  const { constant, category, name, yct } = constantObj;
  const singleRealityRaw = reality(BestScore, constant);


  return {
    singleRealityRaw,
    singleReality: singleRealityRaw.toFixed(2),
    constant: constant,
    name,
    category,
    yct,
    bestScore: BestScore,
    bestAccuracy: BestAccuracy.toFixed(4),
    bestLevel: BestLevel, 
    achievedStatus: AchievedStatus
  };
}

function formatInput(username, items) {
  const formattedItems = items.map(item =>
    `[${item.name},${item.category},${item.constant},${item.bestScore},${item.bestAccuracy},${item.bestLevel},[${item.achievedStatus}]]`
  ).join(',\n  ');

  document.getElementById('inputData').value = `[${username}],{\n  ${formattedItems}\n}`;
}


// **初始化 SQL.js**
async function initSQL() {
  layer.msg('正在加载SQL加载器...')
  const response = await fetch('./js/sql-wasm.wasm');
  const wasmBinary = await response.arrayBuffer();
  const SQL = await initSqlJs({
    locateFile: filename => `./js/${filename}`,
    wasmBinary // 使用 ArrayBuffer 而不是 wasm streaming
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
  // 使用正则表达式查找userdata:部分
  const userdataMatch = content.match(/userdata:([\s\S]+)/);

  if (userdataMatch && userdataMatch[1]) {
    // 提取userdata后的文本内容
    const userdataText = userdataMatch[1].trim();
    // 将提取的文本放入输入框
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

function extractJSON(jsonString) {
  window.data = jsonString
  const start = jsonString.indexOf('{"UserName":');
  const end = jsonString.indexOf(']}]', start);
  return (start !== -1 && end !== -1) ? `${jsonString.slice(start, end + 3)}}` : null;
}

function tryParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}



/* ========== 显示用户信息 ========== */
function drawUserInfo(username, results) {
  const userInfoDiv = document.getElementById('userInfo');
  const usercontainer = document.getElementById('usercontainer');
  usercontainer.style.display = 'block';
  const avg = (results.filter(item => item.singleRealityRaw > 0)
    .slice(0, 20)
    .reduce((acc, item) => acc + item.singleRealityRaw, 0) / 20) || '0.0000';
  window.average1 = Math.floor(avg * 10000) / 10000
  userInfoDiv.innerHTML = `${username} ${window.average1}`;

  window.username = username;
  window.average = avg;
  window.utlr = tlr()
  // document.getElementById("upload_info").innerHTML=`${username} ${window.average1}`
}

function tlr() {
  let as, ar;
  if (window.processedItems.length >= 20) {
    let items = window.processedItems;
    let aitems = window.processedItems.slice(0, 20);

    as = aitems.reduce((sum, i) => sum + i.bestScore, 0) / aitems.length;
    ar = aitems.reduce((sum, i) => sum + i.singleRealityRaw, 0) / aitems.length;
    // 初始计算ltlr
    aitems.forEach(i => {
      i.ltlr = (i.singleRealityRaw - ar) / 20 + reality(as + (i.bestScore - as) / 20, 0);
    });
    // 遍历items（跳过已有aitems的前20项）
    for (let i = 20; i < items.length; i++) {
      let curr = items[i];
      let ltlr = (curr.singleRealityRaw - ar) / 20 + reality(as + (curr.bestScore - as) / 20, 0);
      let minLtlrItem = aitems.reduce((min, x) => x.ltlr < min.ltlr ? x : min);
      if (ltlr > minLtlrItem.ltlr) {
        // 替换
        let index = aitems.indexOf(minLtlrItem);
        curr.ltlr = ltlr;
        aitems[index] = curr;

        // 更新as, ar并重算aitems中所有的ltlr
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

/* ========== 绘制单张卡片 ========== */
function drawCard(result, index) {

  const outputDiv = document.getElementById('output');
  const maincard = document.createElement('div');
  const card = document.createElement('div');
  maincard.classList.add('card');
  card.classList.add('card-inside');
  // 背景
  // card.style.background = result.bestLevel === 0
  //   ? 'linear-gradient(135deg, #8400C3,#3030B0,#2e61ef)'
  //   : 'linear-gradient(45deg, #4028d7, #8839fe)';
  const opa = 0.114514;
  const opa_nb = 0.114514;
  maincard.style.background = result.bestLevel === 0
    ? `linear-gradient(135deg, rgba(132, 0, 195, ${opa_nb}), rgba(48, 48, 176, ${opa_nb}), rgba(46, 97, 239, ${opa_nb}))`
    : `linear-gradient(45deg, rgba(64, 40, 215, ${opa}), rgba(136, 57, 254, ${opa}))`;
  card.style.color = '#DDA0DD';

  // card.style.border = '1px solid';
  result.bestLevel === 0 ? (() => { card.style.border = '1.5px solid'; card.style.borderColor = 'rgba(255, 255, 255, 0.3)'; })() : {};
  // 计算基础字号
  let baseFontSize = (window.innerWidth * window.innerHeight) / 50000; //60000
  if (baseFontSize >= 10) {
    baseFontSize = 10;
  }
  let fontSize = (baseFontSize * 4) / columns;
  const marginBottom = (baseFontSize * 4) / columns;
  // 标题
  const title = document.createElement('div');
  title.classList.add('title');
  title.innerText = result.name;
  card.appendChild(title);
  const maxCardWidth = card.offsetWidth * 0.7;
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
  const constantText = `${parseFloat(result.constant).toFixed(1)}->&nbsp`;
  const singleRealitySpan = document.createElement('span');
  singleRealitySpan.innerHTML = parseFloat(result.singleReality).toFixed(2);
  // 根据分数变色
  if (result.bestScore >= 1005000) {
    singleRealitySpan.style.color = '#1cd3b4';
  } else if (result.singleReality == 0) {
    singleRealitySpan.style.color = '#a5a5a5';
  }
  info.innerHTML = `${result.category} ${constantText}`;
  info.style.maxWidth = "100%"
  info.appendChild(singleRealitySpan);
  // 准度
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
  // 分数
  const score = document.createElement('div');
  score.classList.add('score');
  score.innerText = result.bestScore;
  // score.style.fontSize = `${fontSize * 2.5}px`;
  score.style.marginBottom = `${marginBottom}px`;
  score.style.whiteSpace = 'nowrap';
  score.style.overflow = 'ellipsis';
  // 根据等级分数渐变
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
  // 序号
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
  // 加入到输出
  maincard.appendChild(card);
  outputDiv.appendChild(maincard);
  // 注意：调整大小一定需要在生成完成后！
  // const fontSize1 = Math.max(1, Math.min(20, card.offsetWidth * 0.07));
  info.style.fontSize = `${shitValue * 1.14514}px`;
  title.style.fontSize = `${shitValue * 1.2}px`;
  score.style.fontSize = `${shitValue * 2.4}px`;
  // console.log(`Card width: ${card.offsetWidth}px, Font size: ${shitValue}px`);
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
        const SQL = await initSQL();  // 加载 SQL.js
        const db = new SQL.Database(new Uint8Array(reader.result));
        const tables = getAllTables(db); // 获取数据库中的所有表

        if (tables.includes("kv")) {
          // 使用 saves.db 的解析方式
          processDBFile(reader.result, SQL);
        } else if (tables.includes("scores")) {
          // 使用 data.db 的解析方式
          const scores = extractScores(db);
          processHistoryRecords(scores);
          alert("注意：data.db内只包含您将Milthm更新至3.2版本之后的游玩记录，如有需要请上传save.db\n\nNote: The data.db file only contains your play records after updating Milthm to version 3.2. If needed, please upload save.db.");
        } else {
          console.error("数据库不包含 'kv' 或 'scores' 表，无法解析\nThe database does not contain the 'kv' or 'scores' table and cannot be parsed.");
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      // 如果不是 .db 文件，执行第3种操作
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
      //分析表相关内容
      scoreData.h = (score_accuracy < 99 || score < 10000 * score_accuracy) ? 0 : (constant * 0.1 + 1) * Math.pow((score - 5000 * score_accuracy - 500000) / 10000, 2);//准度
      if (ad) scoreData.d = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ad : ad);//底力
      if (ae) scoreData.e = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ae : ae);//手法
      if (af) scoreData.f = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * af : af);//读谱
      if (ag) scoreData.g = score < 995000 ? 0 : (score < 1005000 ? Math.pow((score - 995000) / 10000, 2) * ag : ag);//多指
    } else {
      console.warn(`未找到对应的 chartid: ${chartid}`);
      // 删除当前scoreData对象
      scores.splice(i, 1);
      i--;  // 调整索引以便继续遍历下一个元素
    }
  }

  const userrealityHistory = calculateUserReality(scores);
  const username = scores[0]?.username;
  window.dataurlt=userrealityHistory;
  window.datas=scores;
  formatInput(username, items);
  urltc(userrealityHistory, scores);
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
  let b20_lg = new Map(); // 存储所有不同谱面的最高得分记录 (chart_id -> scoreData)
  let userrealityHistory = []; // 记录 userreality 变化历史
  let lastUserReality = null; // 记录上一次的 userreality
  scores.forEach(scoreData => {
    const { chart_id, score, played_at } = scoreData;
    // **修改点：b20_lg 存储所有曲目的最高分**
    if (!b20_lg.has(chart_id) || b20_lg.get(chart_id).score < score) {
      b20_lg.set(chart_id, scoreData);
    }
    let b20 = Array.from(b20_lg.values())
      .sort((a, b) => b.singleReality - a.singleReality) // 按 singleReality 降序排序
      .slice(0, 20); // 取最高的 20 条
    let filteredReality = b20.slice(0, 20).filter(data => data.singleReality > 0);
    let sumReality = filteredReality.reduce((sum, data) => sum + data.singleReality, 0);
    let userreality = sumReality / 20;
    // 检测 userreality 是否发生变化
    if (lastUserReality === null || userreality !== lastUserReality) {
      userrealityHistory.push({ userreality, played_at });
      lastUserReality = userreality;
    }
  });
  //从历史记录的分数和详情信息中手动生成存档
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

function urltc(userrealityHistory, scores) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 2000;
  canvas.height = 1500;
  // 加载背景图片
  const bgImage = new Image();
  bgImage.src = "./jpgs/背景.jpg";
  bgImage.onload = function () {
    // 绘制背景图（不会覆盖其他元素）
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    // 折线图区域：右上 1/4，留 10px 间距，表格高度减少 30px
    const chartX = 1050, chartY = 50, chartWidth = 900, chartHeight = 500;
    // 解析用户现实历史数据
    const times = userrealityHistory.map(data => new Date(data.played_at).getTime());
    const realities = userrealityHistory.map(data => data.userreality);
    const [minTime, maxTime] = [Math.min(...times), Math.max(...times)];
    const [minReality, maxReality] = [Math.min(...realities), Math.max(...realities)];
    // 设置时间坐标轴的刻度
    const scaleX = (time) => chartX + ((time - minTime) / (maxTime - minTime)) * chartWidth;
    const scaleY = (reality) => chartY + chartHeight - ((reality - minReality) / (maxReality - minReality)) * chartHeight;
    // 绘制表格
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
    // 绘制折线趋势，并填充折线以下的区域
    ctx.fillStyle = "rgba(206, 238, 249, 0.5)"; // 半透明淡蓝色
    ctx.beginPath();
    // 起始点（第一个数据点）
    ctx.moveTo(scaleX(times[0]), scaleY(realities[0]));
    // 连接所有数据点
    userrealityHistory.forEach((data, i) => {
      let x = scaleX(times[i]), y = scaleY(realities[i]);
      ctx.lineTo(x, y);
    });
    // 连接到底部封闭区域
    ctx.lineTo(scaleX(times[times.length - 1]), chartY + chartHeight); // 右下角
    ctx.lineTo(scaleX(times[0]), chartY + chartHeight); // 左下角
    ctx.closePath();
    // 填充颜色
    ctx.fill();
    // 重新绘制折线，避免被填充色覆盖
    ctx.strokeStyle = "rgba(200, 237, 249, 0.9)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    userrealityHistory.forEach((data, i) => {
      let x = scaleX(times[i]), y = scaleY(realities[i]);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 时间坐标：显示基于当前时间的时间差
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

    // 右下角显示“now”
    ctx.fillText("now", chartX + chartWidth, chartY + chartHeight + 30);
    // userreality 刻度
    ctx.textAlign = "right";
    for (let i = 0; i < 5; i++) {
      let reality = minReality + (maxReality - minReality) * (i / 4);
      let y = scaleY(reality);
      ctx.fillText(reality.toFixed(2), chartX - 10, y);
    }
    console.log("数据", items);

    // 分析图
    const calculateMetric = (items, key, multiplier, divisor) => {
      return multiplier * (
        items.map(item => item[key])
          .filter(value => value !== undefined)
          .sort((a, b) => b - a)
          .slice(0, 7)
          .reduce((sum, value) => sum + value, 0) / 7 || 0
      ) / divisor;
    };
    const d = calculateMetric(items, 'd', 70, 22.5);
    const e = calculateMetric(items, 'e', 70, 30.5);
    const f = calculateMetric(items, 'f', 2.5, 1);
    const g = calculateMetric(items, 'g', 7, 1);
    const h = calculateMetric(items, 'h', 80.5, 15.38);
    // 添加标题
    ctx.textAlign = "center";
    ctx.fillText("User Reality 变化趋势", chartX + chartWidth / 2, chartY - 10);
    ctx.fillText("(由Panyi提供计算方式)", 1850, 1380);
    ctx.font = "40px Arial";
    ctx.fillText("最近游玩", 400, 110);
    ctx.fillText("推分建议", 400, 760);
    // 绘制雷达图
    drawRadarChart(ctx, [d, e, f, g, h], 1150, 680, 700, 700);
    // 绘制推分建议表格

/* ---------- 辅助：把某曲目改成 1010000 时的 Reality 增量 ---------- */
function realityGainIf1010000(track) {
  const sim = window.processedItems.map(o => ({ ...o }));   // 深拷贝
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

  return newAvg - window.average;            // 净增量
}

/* ---------- 取曲目列表 ---------- */
const thresholdC = (window.items?.[19]?.singleRealityRaw ?? 0) - 1; // 剪枝阈值
const candidates = [];

Object.values(constants)
  .sort((a, b) => b.constant - a.constant)
  .some(info => {                           // some+return true 可提前 break
    if (info.constant < thresholdC) return true;          // 触发 break

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
const colW = [60, 260, 100, 150];               // constant | name | gain | scoreNeed

ctx.font = "16px Arial";
ctx.textAlign = "left";
ctx.textBaseline = "middle";

/* 表头 */
["定数", "曲名", "还可推", "推分需"].forEach((t, i) => {
  const x = tableX + colW.slice(0, i).reduce((a, b) => a + b, 0);
  ctx.strokeStyle = "rgba(173,216,230,0.7)";
  ctx.strokeRect(x, tableY, colW[i], rowH);
  ctx.fillStyle  = "#fff";
  ctx.fillText(t, x + 6, tableY + rowH / 2);
});

/* 行 */
top25.forEach((info, idx) => {
  const y = tableY + (idx + 1) * rowH;

  // 边框
  for (let j = 0; j < 4; j++) {
    ctx.strokeStyle = "rgba(173,216,230,0.7)";
    ctx.strokeRect(tableX + colW.slice(0, j).reduce((a, b) => a + b, 0), y, colW[j], rowH);
  }

  ctx.fillStyle = "#fff";
  ctx.font = "16px Arial";
  ctx.fillText(info.constant.toFixed(1), tableX + 6, y + rowH / 2);
  ctx.fillText(info.name,            tableX + colW[0] + 6, y + rowH / 2);
  ctx.fillText(info.gain.toFixed(4), tableX + colW[0] + colW[1] + 6, y + rowH / 2);

  /* -- 推分需分数 -- */
  const curRlt  = window.processedItems.find(p => p.name === info.name && Math.abs(p.constant - info.constant) < 1e-3)?.singleRealityRaw ?? 0;
  const deltaR  = Math.ceil(window.average * 100 - 0.5) + 0.5 !== window.average * 100
      ? (Math.ceil(window.average * 100 - 0.5) + 0.5 - window.average * 100) / 5 +
        Math.max(curRlt, window.processedItems?.[19]?.singleRealityRaw ?? 0)
      : 114514;

  const scoreNeed = findScore(info.constant, deltaR);

  // 若无法推算，字体缩小 2/3
  if (scoreNeed === "Unable to deduce points") {
    ctx.font = "11px Arial";                // 16 * 2/3 ≈ 11
  } else {
    ctx.font = "16px Arial";
  }
  ctx.fillText(String(scoreNeed),
               tableX + colW[0] + colW[1] + colW[2] + 6,
               y + rowH / 2);
});

    // 绘制最近 10 次的分数卡片
    lg_drawCards(ctx, scores.slice(-10).reverse(), 50, 150).then(() => {
        // 生成下载链接
        const link = document.createElement("a");
        link.download = "user_reality_chart.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
  };
}


function drawRadarChart(ctx, data, x, y, width, height) {
  const labels = ['底力', '手法', '读谱', '多指', '准度']; // 按指定顺序绘制
  const maxDataValue = Math.max(...data); // 计算数据中的最大值
  // 计算 maxVal，使其比 maxDataValue 大，并且是 0.5 的倍数
  const maxVal = Math.ceil(maxDataValue * 2) / 2;
  const numScales = 8; // 8个刻度
  const scaleStep = maxVal / (numScales - 1); // 计算刻度间距，确保是0.1的倍数
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const radius = Math.min(width, height) / 2;
  ctx.strokeStyle = "#ccc";
  ctx.fillStyle = "rgba(219, 245, 255, 0.5)";
  // 绘制刻度线
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
  // 绘制刻度值
  ctx.fillStyle = "white";
  ctx.font = "12px Arial";
  for (let i = 0; i < numScales; i++) {
    const scaleValue = (i * scaleStep).toFixed(1);
    const scaleRadius = (i / (numScales - 1)) * radius;
    ctx.fillText(scaleValue, centerX, centerY - scaleRadius);
  }
  // 画雷达数据区域
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
  // 绘制标签（白色字体）
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


function lg_drawCards(ctx, items, xOffset, yOffset) {
  const scale = 1;
  const cardWidth = 340 * scale;
  const cardHeight = 100 * scale;
  const imgWidth = 110 * scale;
  const imgHeight = 70;
  const columnSpacing = 360 * scale;
  const rowSpacing = 110 * scale;
  const imagePromises = items.map((item, i) => {
    const x = xOffset + (i % 2) * columnSpacing;
    const y = yOffset + Math.floor(i / 2) * rowSpacing;
    // 卡片背景
    ctx.fillStyle = 'rgba(104, 118, 122, 0.4)';
    ctx.fillRect(x, y, cardWidth, cardHeight);
    // 编号
    ctx.font = `${13 * scale}px Arial`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = (i < 10) ? '#FAFAFA' : '#C9C9C9';
    ctx.fillText(`#${i + 1}`, x + cardWidth - 10, y + 5);
    // 分数：不足7位前补0
    let strScore = item.score.toString().padStart(7, '0');
    // 分数颜色
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
    // Reality + Accuracy
    ctx.font = `${15 * scale}px Arial`;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`${item.category} ${parseFloat(item.constant).toFixed(1)} > ${item.singleReality.toFixed(2)}`, x + 130, y + 75 * scale);
    // 曲绘图
    const imgPath = `./jpgs/${encodeURIComponent(item.name)}.jpg`;
    return loadImage(imgPath).then(img => {
      ctx.drawImage(img, x + 10 * scale, y + 13 * scale, imgWidth, imgHeight);
    }).catch(() => {
      // Fallback image if specific image fails to load
      return loadImage('./jpgs/NYA.jpg').then(img => {
        ctx.drawImage(img, x + 10 * scale, y + 10 * scale, imgWidth, imgHeight);
      });
    });
  });
  // 等待所有图片加载完成
  return Promise.all(imagePromises);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* ========== 下载图片 (含背景、卡片等) ========== */
function downloadImage() {
  ol_runner((e)=>{document.getElementById('picgen').style.display = 'block'},[114,514]);
  // 获取用户输入的卡片数量
  const cardCount = parseInt(document.getElementById('cardCount').value, 10);
  const maxItems = Math.max(0, cardCount);
  // 获取数据中实际的卡片数量
  const items = window.processedItems || [];
  const excludeReality = document.getElementById('excludeReality').value;
  window.norlt = (excludeReality == "true") ? items.filter(item => item.constant == -1) : [];
  const actualCardCount = Math.min(maxItems, items.length); // 实际绘制卡片数量，不能超过数据中的数量
  // 动态调整画布高度，保持宽度不变，最小高度为当前代码中的高度
  const baseHeight = 2200;
  const newHeight = 400 + Math.ceil(((actualCardCount + (window.norlt?.length || 0)) / 2) * 165); // 每2个卡片增加165像素的高度
  const canvasHeight = Math.max(baseHeight, newHeight); // 确保总高度不少于2200px
  const canvas = document.createElement('canvas');
  canvas.width = 1200;  // 固定宽度
  canvas.height = canvasHeight;  // 根据卡片数量调整高度
  const ctx = canvas.getContext('2d');
  let star = '';
  let maxConstant = -Infinity;
  items.forEach(item => {
    if (item.achievedStatus.includes(5) && item.constant > maxConstant) {
      maxConstant = item.constant;
    }
  });


  if (maxConstant > 12) {
    star = '☆☆☆';
  } else if (maxConstant > 9) {
    star = '☆☆';
  } else if (maxConstant > 6) {
    star = '☆';
  }
  // 获取背景图设置
  const bgImageFile = document.getElementById('bgImage').files[0];
  let bgImagePromise = Promise.resolve(null);
  // 如果选择了背景图文件，加载它
  if (bgImageFile) {
    bgImagePromise = loadImage(URL.createObjectURL(bgImageFile));
  } else {
    ol_runner(ol_updateImgGenProcess,['正在加载背景图...']);
    bgImagePromise = loadImage(`./jpgs/background/${Math.floor(Math.random() * 3)}.jpg`);
  }
  bgImagePromise
    .then(bgImage => {
      if (bgImage) {
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      const yrjds = document.getElementById('yrjds').value;//愚人节
      ctx.fillStyle = 'rgba(128, 128, 128, 0.3)';
      ctx.fillRect(0, 50, canvas.width, 200);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.lineWidth = 3;
      ctx.moveTo(550, 250);
      ctx.lineTo(650, 50);
      ctx.stroke();
      ctx.font = '25px Arial';
      ctx.fillStyle = '#ffffff';
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
      ctx.fillText(`Player: ${window.username}`, 660, 100);
if (yrjds == "true") {
  ctx.fillText(`Reality: ${(window.average * 20).toFixed(4)}    🐉👃👈😨`, 660, 135);
} else {
  let text = `Reality: ${window.average1}`;
  if (window.average1 >= 12.5) {
    text += "    🐉👃👈😨";
  }
  ctx.fillText(text, 660, 135);
}
      ctx.fillText(`Ytilaer: ${(window.utlr).toFixed(4)}`, 660, 170);
      const now = new Date();
      const dateStr = `${now.toISOString().split('T')[0]} ${now.toTimeString().split(' ')[0]}`;
      ctx.fillText(`Date: ${dateStr}`, 660, 205);
      ctx.font = '50px Arial';
      ctx.fillText('Milthm-calculator', 100, 95);
      ctx.font = '25px Arial';
      ctx.fillText('http://mhtlim.top/', 100, 125);
      ctx.fillText('http://k9.lv/c/', 100, 153);
      ctx.fillText('https://mkzi-nya.github.io/c/', 100, 181);
      ctx.font = '30px Arial';
      ctx.fillText('←查分上这里', 400, 130);
      ctx.font = '20px Arial';
      ctx.fillText("3个网址都行", 450, 155);
      ctx.fillText(Updated, 100, 210);
      const items = [...window.processedItems.slice(0, actualCardCount), ...window.norlt];
      Promise.all(items.map(i => Promise.all([
        loadImage(`./jpgs/${encodeURIComponent(i.name.replace(/[#?]/g, ''))}.jpg`).catch(() => loadImage('./jpgs/NYA.jpg')),
        loadImage(`./jpgs/${i.bestLevel === 0 ? 0 : i.bestLevel === 6 ? 6 : i.achievedStatus.includes(5) ? i.bestLevel + '0' : i.achievedStatus.includes(4) ? i.bestLevel + '1' : i.bestLevel}.png`).catch(() => null),
        ol_runner(ol_updateImgGenProcess,['正在加载图片 For '+i.name]),
      ]))).then(imgs => drawCards(ctx, canvas, items, imgs));
      ol_runner(ol_updateImgGenProcess,['完成']);
      
    });
}
function drawCards(ctx, canvas, items, images) {
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
    const scoreStr = it.bestScore.toString().padStart(7, '0');
    let scoreClr = it.achievedStatus.includes(5)
      ? (() => { const g = ctx.createLinearGradient(x, y + 52, x, y + 91); g.addColorStop(0, '#99C5FB'); g.addColorStop(1, '#D8C3FA'); return g })()
      : it.achievedStatus.includes(4)
        ? '#90CAEF'
        : '#FFFFFF';


    ctx.font = '39px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = scoreClr;
    ctx.fillText(scoreStr, x + 208, y + 52);

    // 歌名（自动缩字）
    let f = 25;
    ctx.font = `${f}px Arial`;
    while (ctx.measureText(it.name).width > 200 && f > 10) {
      ctx.font = `${--f}px Arial`;
    }
    ctx.fillStyle = '#FFF';
    ctx.fillText(it.name, x + 212, y + 23);

    // 评级 / 常数 / 准确率 行
    ctx.font = '20px Arial';
    const acc = `${(it.bestAccuracy * 100).toFixed(2)}%`;
    if (document.getElementById('yrjds').value === 'true') {
      ctx.fillText(
        `${it.category} ${it.yct || it.constant} > ${(it.singleRealityRaw * 20).toFixed(1)}   ${acc}`,
        x + 208,
        y + 98
      );
    } else {
      ctx.fillText(
        `${it.category} ${parseFloat(it.constant).toFixed(1)} > ${it.singleReality}   ${acc}`,
        x + 208,
        y + 98
      );
    }

    // 目标分
    ctx.font = '13px Arial';
    ctx.fillText(
      `>>${findScore(
        it.constant,
        Math.ceil(window.average * 100 - 0.5) + 0.5 !== window.average * 100
          ? (Math.ceil(window.average * 100 - 0.5) + 0.5 - window.average * 100) / 5 + Math.max(it.singleRealityRaw, items?.[19]?.singleRealityRaw ?? 0)
          : 114514
      )}`,
      x + 212,
      y + 86
    );

    // 封面与段位图
    ctx.drawImage(images[i][0], x + 13, y + 13, imgW, imgH);
    if (images[i][1]) ctx.drawImage(images[i][1], x + 351, y + 26, icon, icon);
  });

  exportImage(canvas);
}

function exportImage(canvas) {
  const input = document.getElementById('inputData').value,
    data = 'userdata:' + (window.data || input),
    imgBase64 = canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''),
    imgBin = atob(imgBase64),
    txtBytes = new TextEncoder().encode(data),
    len = imgBin.length + txtBytes.length,
    buf = new Uint8Array(len);

  for (let i = 0; i < imgBin.length; i++) buf[i] = imgBin.charCodeAt(i);
  buf.set(txtBytes, imgBin.length);

  const blob = new Blob([buf], { type: 'image/png' }),
    link = document.createElement('a'),
    t = new Date().toISOString().replace(/[:\-T]/g, '_').split('.')[0];
  link.download = `output_${t}.png`;
  link.href = URL.createObjectURL(blob);
  link.click();

  document.getElementById('picgen').style.display = 'none';
}


function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}


function cha_newui_js_debug(){

  document.getElementById("debug_cha_newui_js").innerHTML = "cha_newui.js is running.";

}


/* ========== QQ 上传逻辑 & 其他 UI  ========== 
const qqEntry = document.getElementById("qqEntry");
const qqBotResultDialog = new mdui.Dialog("#qqBotResultDialog", { modal: true, closeOnEsc: false });
const inputData1 = document.getElementById("inputData");
const qqBotResultCloseBtn = document.getElementById("qqBotResultCloseBtn");
const qqBotResultText = document.getElementById("qqBotResultText");
const uploadButton = document.getElementById("uploadButton");
function upload() {
  qqBotResultCloseBtn.disabled = true;
  const userdata = qqEntry.value.trim();
  
  if (userdata === "") {
    mdui.alert("请输入QQ号!");
    return;
  }
  
    qqBotResultDialog.open();
    qqBotResultText.innerHTML = "正在获取数据...";
    document.getElementById("qqBotResultContent").value = '';
  const data2 = inputData1.value;
  const data_param = { nqid: userdata, data: data2, type: "milthm" };
  const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://175.27.145.108:7155", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = xhr.responseText;
          qqBotResultText.innerHTML = "执行完成。";
          document.getElementById("qqBotResultContent").value = response;
          qqBotResultCloseBtn.disabled = false;
          console.log(response);
      } else {
        qqBotResultText.innerHTML = "获取数据失败。";
        qqBotResultCloseBtn.disabled = false;
        }
      }
    };
    xhr.send(JSON.stringify(data_param));
  // 发送第二个请求
    try {
    const xhr2 = new XMLHttpRequest();
      xhr2.open("POST", "submit.php", true);
      xhr2.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr2.onreadystatechange = function() {
      if (xhr2.readyState === XMLHttpRequest.DONE && xhr2.status === 200) {
        console.log(xhr2.responseText);
        }
      };
    xhr2.send(JSON.stringify({ qq: userdata, data: data2 }));
    } catch (error) {
      console.error('Error request: ', error);
  }
}

function openContributionDialog() {
  new mdui.Dialog('#contributionDialog').open();
}
*/