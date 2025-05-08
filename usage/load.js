function loaddiv() {
  return fetch("./packed_document.json") // 获取 JSON 文件
    .then((response) => response.json()) // 解析为 JSON 格式
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
  titles = title.replace(/[()]/g, "");
  // 创建弹窗并显示
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
  modal.style.lineHeight = "1.4"; // 增加行高
  modal.style.width = "250px"; // 固定宽度
  // 替换英文括号()为中文括号（）
  title1 = title.replace(/\(/g, "（").replace(/\)/g, "）");

  modal.setAttribute("aaa", [titles, difficulty]);

  // 设置弹窗内容
  const idElement = document.createElement("p");
  idElement.innerText = `ID: ${id}`;

  const charterElement = document.createElement("p");
  charterElement.innerText = `charter: ${charter}`;
  const charterslistElement = document.createElement("p");
  charterslistElement.innerText = `chartersList: ${chartersList.join(", ")}`;

  const tagsElement = document.createElement("p");
  tagsElement.innerText = `Tags: [${tags.join("],   [")}]`;

  // 将弹窗内容添加到弹窗中
  modal.appendChild(idElement);
  modal.appendChild(charterElement);
  modal.appendChild(charterslistElement);
  modal.appendChild(tagsElement);

  // 将弹窗添加到页面
  document.body.appendChild(modal);
  if (!document.querySelector(`div[aaa="${title}"]`)) info(title, data);
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
  modal.style.maxWidth = "200px";
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
    .map((info) => `[${info.start},${info.bpm}]`)
    .join(",\n\n");
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
