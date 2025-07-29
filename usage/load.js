function loaddiv() {
  return fetch(`./packed_document.json?_=${Date.now()}`) // ← ✅ 不加分号！
    .then((response) => response.json())
    .then((data) => {
      // 遍历每一个元素，将其传递给 chart(data)
      data.forEach((item) => {
        chart(item); // 假设 chart 是已定义的函数，处理每个数据项
      });
    })
    .catch((error) => {
      console.error("加载或解析 JSON 文件时发生错误:", error);
    });
}


function chart(data) {
  const { id, charter, chartersList, tags, title, difficulty } = data;
  const titles = title.replace(/[()]/g, "");
  const title1 = title.replace(/\(/g, "（").replace(/\)/g, "）");

  // 创建弹窗并设置样式
  const modal = document.createElement("div");
  modal.style.position = "absolute";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  modal.style.padding = "2px";
  modal.style.borderRadius = "8px";
  modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  modal.style.zIndex = "1000";
  modal.style.fontFamily = "Arial, sans-serif";
  modal.style.color = "#fff";
  modal.style.fontSize = "11px";
  modal.style.lineHeight = "1.4";
  modal.style.width = "250px";
  modal.setAttribute("aaa", [titles, difficulty]);

  // 基本信息
  const idElement = document.createElement("p");
  idElement.innerText = `ID: ${id}`;

  const charterElement = document.createElement("p");
  charterElement.innerText = `charter: ${charter}`;

  const charterslistElement = document.createElement("p");
  charterslistElement.innerText = `chartersList: ${chartersList.join(", ")}`;

  const tagsElement = document.createElement("p");
  tagsElement.innerText = `Tags: [${tags.join("],   [")}]`;

  // 添加基本信息元素
  modal.appendChild(idElement);
  modal.appendChild(charterElement);
  modal.appendChild(charterslistElement);
  modal.appendChild(tagsElement);

  // 异步加载 chartinfo.json
fetch(`./chartinfo.json?_=${Date.now()}`)
  .then((response) => response.json())
  .then((infoData) => {
    // 构建用于搜索的 key：title + difficulty（去除括号和空格）
    const cleanTitle = title.replace(/[()\s]/g, "");
    const difficultyKey = cleanTitle + difficulty;

    let chartInfo = infoData[difficultyKey];

    if (!chartInfo) {
      chartInfo = infoData[id]; // fallback to id
    }

    const infoElement = document.createElement("p");
    infoElement.style.marginTop = "4px";

    if (chartInfo) {
      infoElement.innerText =
        `Combo: ${chartInfo.combo}  Tap: ${chartInfo.tap}  Drag: ${chartInfo.drag}  Hold: ${chartInfo.hold}  EX: ${chartInfo.ex}\n` +
        `有判占分: ${chartInfo["有判占分"]}  有判数: ${chartInfo["有判数"]}  单Tap得分: ${chartInfo["单tap"]}`;
      modal.insertBefore(infoElement, tagsElement);

      if (chartInfo.error) {
        const errorElement = document.createElement("p");
        errorElement.innerText = "Error: 此谱面统计可能有误";
        errorElement.style.color = "red";
        modal.insertBefore(errorElement, tagsElement);
      }
    } else {
      infoElement.innerText = "此谱面详情信息缺失";
      modal.insertBefore(infoElement, tagsElement);
    }
  })
  .catch((error) => {
    const errorElement = document.createElement("p");
    errorElement.innerText = "读取谱面详情信息失败";
    errorElement.style.color = "orange";
    modal.insertBefore(errorElement, tagsElement);
    console.error("加载 chartinfo.json 出错:", error);
  });


  document.body.appendChild(modal);

  // 若不存在相应 info 弹窗则继续显示详细信息
  if (!document.querySelector(`div[aaa="${title}"]`)) {
    info(title, data);
  }
}


function info(title, item) {
  title = title.replace(/[()]/g, "");
  // 创建弹窗并设置样式
  const modal = document.createElement("div");
  modal.style.position = "absolute";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  modal.style.padding = "5px";
  modal.style.borderRadius = "4px";
  modal.style.boxShadow = "0 2px 2px rgba(0, 0, 0, 0.1)";
  modal.style.zIndex = "1000";
  modal.style.fontFamily = "Arial, sans-serif";
  modal.style.color = "#fff";
  modal.style.fontSize = "11px";
  modal.style.lineHeight = "0.8";
  modal.setAttribute("aaa", title);

  // 格式化显示数据
  const titleElement = document.createElement("h2");
  titleElement.innerText = item.title;

  const illustratorElement = document.createElement("p");
  illustratorElement.innerText = `artist: ${item.artist}
    
illustrator: ${item.illustrator.join(", ")}`;

const bpmInfoElement = document.createElement("p");

let bpmText = item.bpmInfo
  .map((info, index) => {
    // 每个元素格式化
    let text = `[${info.start},${info.bpm}]`;

    // 每6个后插入两个换行
    if ((index + 1) % 5 === 0) {
      text += ",\n\n";
    } else {
      text += ", ";
    }

    return text;
  })
  .join("");


bpmInfoElement.innerText = `BPM:\n\n${bpmText}`;

modal.appendChild(titleElement);

  if (item.latinTitle !== item.title) {
    const latinTitleElement = document.createElement("p");
    latinTitleElement.innerText = item.latinTitle;
    modal.appendChild(latinTitleElement);
  }

  modal.appendChild(illustratorElement);
  modal.appendChild(bpmInfoElement);

  document.body.appendChild(modal);
}
