function loaddiv() {
  return fetch('./packed-document.json')  // 获取 JSON 文件
    .then(response => response.json())  // 解析为 JSON 格式
    .then(data => {
      // 遍历每一个元素，将其传递给 chart(data)
      data.forEach(item => {
        chart(item);  // 假设 chart 是已定义的函数，处理每个数据项
      });
    })
    .catch(error => {
      console.error('加载或解析 JSON 文件时发生错误:', error);
    });
}

function chart(data) {
    const title = data.title,difficulty=data.difficulty;

    // 查找包含对应标题的表格行，避免多次 DOM 查询
    const rows = document.querySelectorAll('table tr');
    let targetRow = null;
    
    // 查找对应标题的表格行，仅一次遍历
    for (const row of rows) {
      const cells = row.querySelectorAll('td');
      if (cells.length > 0 && cells[0].textContent.trim() === title) {
        targetRow = row;
        break; // 找到后立即停止遍历
      }
    }

    if (!targetRow) {
      //alert(`未找到对应的歌曲行 ${title}`);
      return;
    }

    // 获取该行所有列
    const cells = targetRow.querySelectorAll('td');
    let targetColumnIndex = -1;

    // 根据传入的难度确定列位置
    switch (difficulty) {
      case "Drizzle":
        targetColumnIndex = 1; // 第二列
        break;
      case "Sprinkle":
        targetColumnIndex = 2; // 第三列
        break;
      case "Cloudburst":
        targetColumnIndex = 3; // 第四列
        break;
      case "Clear":
      case "Special":
        targetColumnIndex = 4; // 第五列
        break;
      default:
        return;
    }

    
        const { id, charter, chartersList, tags } = data;

        // 创建弹窗并显示
        const modal = document.createElement('div');
        modal.style.position = 'absolute';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.padding = '2px';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        modal.style.zIndex = '1000';
        modal.style.fontFamily = 'Arial, sans-serif';
        modal.style.color = '#fff';
        modal.style.fontSize = '11px';
        modal.style.lineHeight = '1.4'; // 增加行高
        modal.style.width = '250px'; // 固定宽度
        modal.setAttribute("aaa", [title, difficulty]);

        // 设置弹窗内容
        const idElement = document.createElement('p');
        idElement.innerText = `ID: ${id}`;

        const charterElement = document.createElement('p');
        charterElement.innerText = `charter: ${charter}`;
        const charterslistElement = document.createElement('p');
        charterslistElement.innerText = `chartersList: ${chartersList.join(', ')}`;

        const tagsElement = document.createElement('p');
        tagsElement.innerText = `Tags: [${tags.join('],   [')}]`;

        // 将弹窗内容添加到弹窗中
        modal.appendChild(idElement);
        modal.appendChild(charterElement);
        modal.appendChild(charterslistElement);
        modal.appendChild(tagsElement);


        // 将弹窗添加到页面
        document.body.appendChild(modal);
    if (!document.querySelector(`div[aaa="${title}"]`)) info(title, data);
}

function info(title,item) {

    // 创建弹窗并设置样式
    const modal = document.createElement('div');
    modal.style.position = 'absolute';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.padding = '5px';
    modal.style.borderRadius = '4px';
    modal.style.boxShadow = '0 2px 2px rgba(0, 0, 0, 0.1)';
    modal.style.maxWidth = '200px';
    modal.style.zIndex = '1000';
    modal.style.fontFamily = 'Arial, sans-serif';
    modal.style.color = '#fff';
    modal.style.fontSize = '11px';
    modal.style.lineHeight = '0.8';
    modal.setAttribute("aaa", title);

    // 只查找 a 标签中的元素
    const links = document.querySelectorAll('a'); // 获取所有 a 标签
    let targetElement = null;

    // 查找包含传入 title 的 a 标签元素
    links.forEach(link => {
      if (link.textContent && link.textContent.includes(title)) {
        targetElement = link;  // 找到匹配的 a 标签
      }
    });

    if (!targetElement) {
      alert('未找到包含此标题的元素');
      return;
    }

    // 获取找到的元素的位置
    const linkRect = targetElement.getBoundingClientRect();


    // 格式化显示数据
    const titleElement = document.createElement('h2');
    titleElement.innerText = item.title;

    const illustratorElement = document.createElement('p');
    illustratorElement.innerText = `artist: ${item.artist}
    
illustrator: ${item.illustrator.join(', ')}`;

    const bpmInfoElement = document.createElement('p');
    bpmInfoElement.innerText = `BPM: ${item.bpmInfo[0].bpm}`;

    modal.appendChild(titleElement);

    if (item.latinTitle !== item.title) {
      const latinTitleElement = document.createElement('p');
      latinTitleElement.innerText = item.latinTitle;
      modal.appendChild(latinTitleElement);
    }

    modal.appendChild(illustratorElement);
    modal.appendChild(bpmInfoElement);

    document.body.appendChild(modal);

}


