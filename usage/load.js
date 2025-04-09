

function song(title) {
  return fetch('./ProcessedDocument.json')
    .then(response => response.json())  // 解析为 JSON 格式
    .then(data => {
      // 搜索包含指定标题的项
      const result = data.filter(item => item.title.includes(title));
      return result;  // 返回找到的匹配数据
    })
    .catch(error => {
      console.error('加载或解析 JSON 文件时发生错误:', error);
      return [];  // 如果发生错误，返回空数组
    });
}

function info(title) {
  song(title).then(data => {
    if (data.length === 0) {
      alert("没有找到包含标题 \"" + title + "\" 的歌曲");
      return;
    }

    // 只显示第一个匹配项
    const item = data[0];

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

    // 计算弹窗的位置
    const modalTop = linkRect.bottom + window.scrollY + 5;
    const modalLeft = linkRect.left + window.scrollX;

    modal.style.top = `${modalTop}px`;
    modal.style.left = `${modalLeft}px`;

    // 格式化显示数据
    const titleElement = document.createElement('h2');
    titleElement.innerText = item.title;

    const illustratorElement = document.createElement('p');
    illustratorElement.innerText = `artist: ${item.artist}
    
illustrator: ${item.illustrator.join(', ')}`;

    const bpmInfoElement = document.createElement('p');
    bpmInfoElement.innerText = `BPM: ${item.bpmInfo[0].bpm}
    
beatsPerBar: ${item.bpmInfo[0].beatsPerBar}`;

    modal.appendChild(titleElement);

    if (item.latinTitle !== item.title) {
      const latinTitleElement = document.createElement('p');
      latinTitleElement.innerText = item.latinTitle;
      modal.appendChild(latinTitleElement);
    }

    modal.appendChild(illustratorElement);
    modal.appendChild(bpmInfoElement);

    document.body.appendChild(modal);

    // 立即添加点击事件监听器
    const closeModal = (event) => {
      if (!modal.contains(event.target) && event.target !== targetElement) {
        modal.remove();
        document.removeEventListener('click', closeModal);
      }
    };

    document.addEventListener('click', closeModal);
  });
}


function chart(title, difficulty) {
  song(title).then(data => {
    if (data.length === 0) {
      alert("没有找到包含标题 \"" + title + "\" 的歌曲");
      return;
    }
    console.log(data);

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
      alert('未找到对应的歌曲行');
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
        alert("未知的难度: " + difficulty);
        return;
    }

    // 如果该列有值，显示弹窗
    if (cells[targetColumnIndex]) {
      const songData = data.find(item => item.difficulty === difficulty);

      if (songData) {
        const { id, charter, chartersList, tags } = songData;

        // 创建弹窗并显示
        const modal = document.createElement('div');
        modal.style.position = 'absolute';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.padding = '10px';
        modal.style.borderRadius = '8px';
        modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        modal.style.zIndex = '1000';
        modal.style.fontFamily = 'Arial, sans-serif';
        modal.style.color = '#fff';
        modal.style.fontSize = '11px';
        modal.style.lineHeight = '1.4'; // 增加行高
        modal.style.width = '250px'; // 固定宽度

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

        // 获取该列的位置以显示弹窗
        const cellRect = cells[targetColumnIndex].getBoundingClientRect();
        const modalTop = cellRect.top + window.scrollY + cellRect.height + 5; // 在列的下方显示
        let modalLeft = cellRect.left + window.scrollX;

        // 如果弹窗超出屏幕右边缘，调整位置
        const modalWidth = 250; // 弹窗的宽度
        const windowWidth = window.innerWidth;

        if (modalLeft + modalWidth > windowWidth) {
          modalLeft = windowWidth - modalWidth - 10; // 将弹窗移动到屏幕的右侧
        }

        modal.style.top = `${modalTop}px`;
        modal.style.left = `${modalLeft}px`;

        // 将弹窗添加到页面
        document.body.appendChild(modal);

        // 监听点击事件来关闭弹窗（仅绑定一次）
        const closeModal = () => {
          modal.remove();
          document.removeEventListener('click', closeModal);
        };

        document.addEventListener('click', function handler(event) {
          if (!modal.contains(event.target)) {
            closeModal();
          }
        });
      }
    }
  });
}
