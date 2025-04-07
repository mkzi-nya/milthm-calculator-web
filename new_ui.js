
function show_author_info() {
    layer.open({
        type: 2, 
        area: ['90%', '90%'],
        title: '作者信息',
        shade: 0.6, // 遮罩透明度
        shadeClose: true, // 点击遮罩区域，关闭弹层
        maxmin: false,
        anim: 0, // 0-6 的动画形式，-1 不开启
        content: `./authors.html`,
        offset: ['32px']
      });
}
function show_usage() {
  console.log(window.screen.availWidth)
  layer.open({
      type: 2, 
      area: ['90%',"90%"],
      title: '使用说明',
      shade: 0.6, // 遮罩透明度
      shadeClose: true, // 点击遮罩区域，关闭弹层
      maxmin: false,
      anim: 0, // 0-6 的动画形式，-1 不开启
      content: `./usage.html`,
      offset: ['32px']
    });
}

function qqbot_ua(){
  layer.open({

    type: 1,
    title: '提示',
    shadeClose: true,
    shade: 0.8,
    area: ['auto'],
    content: '<h3 style="padding:6px;">QQBot 不可用</h3>',
    offset: ['32px']
  });
}


function alert_invalid(){
  layer.open({
    type: 1,
    title: '提示',
    shadeClose: true,
    shade: 0.8,
    area: ['50%', '20%'],
    content: '<h3 style="padding:12px;">存档数据无效或无法解析。</h3>',
    offset: ['32px']
  });
}
function genPicDialog(){
  // layer.open({

  //   type: 1,

  //   offset: 'b',

  //   anim: 'slideUp',

  //   area: ['100%', '30%'],

  //   shade: 0.1,

  //   shadeClose: true,

  //   id: 'ID-demo-layer-direction-b',

  //   content: '<div style="padding: 16px;">正在生成图片，由于需要下载图片资源，可能需要一些时间。如果一直没有反应，可以多次尝试。</div>'

  // });
  document.getElementById('picgen').style.display='block';
}