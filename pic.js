// ========== 全局参数配置（可统一调整） ==========

// 画布总宽度
const CANVAS_WIDTH = 1000;

// 背景图路径
const BACKGROUND_PATH = "./jpgs/background/562.jpg";

// 数据源 constant.js
const CONSTANT_JS_PATH = "./js/constant.js";

// 曲绘文件夹
const JPGS_FOLDER = "./jpgs";

// 封面尺寸
const COVER_W = 129;    // 封面宽
const COVER_H = 75;     // 封面高

// 封面间距
const H_SPACING = 11;   // 封面横向间距
const V_SPACING = 70;   // 封面纵向间距

// 每行封面数
const COVERS_PER_ROW = 5;

// 封面起始位置
const START_X = 180;    // 第一列封面的 X 坐标
const START_Y = 220;    // 第一行封面的 Y 坐标

// 半透明背景色
const SEMI_BLACK = "rgba(0,0,0,0.6)";

// 标题与等级字体大小
const TITLE_FONT_SIZE = 50;
const LEVEL_FONT_SIZE = 30;

// 标题位置
const TITLE_X = 20;
const TITLE_Y = 80;

// 等级标签位置偏移
const LEVEL_TEXT_X = 20;
const LEVEL_TEXT_Y_OFFSET = 40;

// 难度颜色（边框用）
const DIFFICULTY_COLORS = {
  CL: "rgba(64,64,64,0.4)",   // 深灰
  CB: "rgba(255,68,68,0.4)",  // 半透明红
  SK: "rgba(68,136,255,0.4)", // 半透明蓝
  EZ: "rgba(68,255,68,0.4)",  // 半透明绿
  DEFAULT: "rgba(255,255,255,0.4)" // 半透明白
};

// ========== 工具函数 ==========

// 解析 constant.js
async function parseConstantJs() {
  const content = await fetch(CONSTANT_JS_PATH).then(r => r.text());
  const match = content.match(/\{([\s\S]*)\}/);
  if (!match) throw new Error("未找到 constantsData 内容");

  const body = match[1];
  const entries = [...body.matchAll(/"[^"]+": \[([^\]]+)\]/g)];
  const result = [];

  for (const e of entries) {
    const parts = e[1].split(",").map(s => s.trim());
    if (parts.length >= 3) {
      const levelStr = parts[0];
      const difficulty = parts[1].replace(/"/g, "").trim();
      const title = parts[2].replace(/"/g, "").trim();
      const level = parseFloat(levelStr);
      if (!isNaN(level)) {
        result.push({ level, difficulty, title });
      }
    }
  }
  return result;
}

// 参数过滤
function parseArgs(data, difficulty = "all", minVal = null, maxVal = null) {
  return data.filter(item => {
    if (difficulty !== "all" && item.difficulty !== difficulty) return false;
    if (minVal !== null && maxVal !== null) {
      return item.level >= minVal && item.level <= maxVal;
    } else if (minVal !== null && maxVal === null) {
      return item.level === minVal;
    }
    return true;
  });
}

// 分组（按等级）
function groupByLevel(data) {
  const sorted = [...data].sort((a, b) => b.level - a.level);
  const grouped = {};
  for (const item of sorted) {
    const key = item.level.toFixed(1);
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }
  return grouped;
}

// 绘制半透明背景文字
function drawTextWithBg(ctx, text, x, y, fontSize) {
  ctx.font = `${fontSize}px sans-serif`;
  const metrics = ctx.measureText(text);
  const padding = 20;
  const bgX = x - padding;
  const bgY = y - fontSize - padding / 2;
  const bgW = metrics.width + padding * 2;
  const bgH = fontSize + padding;

  ctx.fillStyle = SEMI_BLACK;
  ctx.fillRect(bgX, bgY, bgW, bgH);

  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
}

// 安全加载图片
async function loadImageSafe(src) {
  return new Promise(resolve => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
  });
}

// ========== 生成定数表 ==========
export async function generateTable({ difficulty = "all", minVal = null, maxVal = null }) {
  const allData = await parseConstantJs();

  // 解析数值参数
  if (minVal !== "" && minVal !== null) minVal = parseFloat(minVal);
  else minVal = null;
  if (maxVal !== "" && maxVal !== null) maxVal = parseFloat(maxVal);
  else maxVal = null;

  const filtered = parseArgs(allData, difficulty, minVal, maxVal);
  const grouped = groupByLevel(filtered);

  // 过滤掉无曲目的等级
  const keys = Object.keys(grouped).filter(k => grouped[k].length > 0);
  if (keys.length === 0) throw new Error("没有符合条件的曲目");

  // ======== 计算动态高度 ========
  let totalHeight = START_Y;
  for (const key of keys) {
    const titles = grouped[key];
    const count = titles.length;
    const rowsInBlock = Math.ceil(count / COVERS_PER_ROW);

    if (count > 0) {
      // 有曲目的等级块高度
      totalHeight += rowsInBlock * (COVER_H + V_SPACING);
    } else {
      // 无曲目的等级块高度（只显示等级图标）
      totalHeight += LEVEL_FONT_SIZE + V_SPACING;
    }
  }
  totalHeight += 200; // 预留底部空间

  // 画布
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH;
  canvas.height = totalHeight;
  const ctx = canvas.getContext("2d");

  // 背景
  const bg = await loadImageSafe(BACKGROUND_PATH);
  if (bg) ctx.drawImage(bg, 0, 0, CANVAS_WIDTH, totalHeight);
  else {
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, CANVAS_WIDTH, totalHeight);
  }

  // 顶部 y=15~100 半透明黑色区块
  ctx.fillStyle = SEMI_BLACK;
  ctx.fillRect(0, 15, CANVAS_WIDTH, 85);

  // 标题
  drawTextWithBg(ctx, "Milthm Chart Constant Table", TITLE_X, TITLE_Y, TITLE_FONT_SIZE);

  // 绘制曲目
  let currentY = START_Y;
  for (const key of keys.sort((a, b) => parseFloat(b) - parseFloat(a))) {
    const titles = grouped[key];
    const count = titles.length;

    // 等级文字位置
    const levelTextY = count > 0
      ? currentY + (COVER_H / 2) + LEVEL_FONT_SIZE / 2 // 居中封面行
      : currentY + LEVEL_FONT_SIZE;                   // 只有等级图标

    drawTextWithBg(ctx, `► ${key}`, LEVEL_TEXT_X, levelTextY, LEVEL_FONT_SIZE);

    if (count > 0) {
      let rowX = START_X;
      let rowY = currentY;
      let c = 0;

      for (const song of titles) {
        const coverPath = `${JPGS_FOLDER}/${song.title}.jpg`;
        const coverImg = await loadImageSafe(coverPath);

        // 绘制曲绘
        if (coverImg) {
          ctx.drawImage(coverImg, rowX, rowY, COVER_W, COVER_H);
        } else {
          ctx.fillStyle = "#555";
          ctx.fillRect(rowX, rowY, COVER_W, COVER_H);
        }

        // 画边框
        ctx.lineWidth = 3;
        ctx.strokeStyle = DIFFICULTY_COLORS[song.difficulty] || DIFFICULTY_COLORS.DEFAULT;
        ctx.strokeRect(rowX, rowY, COVER_W, COVER_H);

        c++;
        rowX += COVER_W + H_SPACING;
        if (c % COVERS_PER_ROW === 0) {
          rowX = START_X;
          rowY += COVER_H + V_SPACING;
        }
      }

      currentY = rowY + COVER_H + V_SPACING;
    } else {
      // 没有曲目：只占一行（等级高度）
      currentY += LEVEL_FONT_SIZE + V_SPACING;
    }
  }

  return canvas.toDataURL("image/png");
}
