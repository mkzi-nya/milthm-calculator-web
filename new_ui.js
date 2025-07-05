var new_ui_js_ver = 8
var authors_dialog;
function show_author_info() {
  authors_dialog = layer.open({
    type: 1,
    title: '作者信息',
    content: '<div id="Authors_content" style="padding:32px"></div>',
    area: ['80vw', '80vh'],
    shade: 0.6,
    skin: 'layui-layer-win10'
  });
  var loading = layer.load(1);
  try {
    fetch('authors.txt').then(res => res.text()).then(data => {
      layer.close(loading);
      document.getElementById("Authors_content").innerHTML = `<pre>${data.replaceAll("{}",'target="_blank" class="superlinkR"')}</pre><hr><button class="layui-btn layui-btn-normal" onclick="layer.close(authors_dialog)">关闭</button>`
    })
  } catch (e) {
    layer.close(loading);
    layer.msg("Error / 出现错误，请检查网络连接。");
  }
}

function show_donation() {
  layer.open({
    type: 2,
    area: ['90%', '90%'],
    title: '捐赠',
    shade: 0.6, // 遮罩透明度
    shadeClose: true, // 点击遮罩区域，关闭弹层
    maxmin: false,
    anim: 0, // 0-6 的动画形式，-1 不开启
    content: `./static/donate/donate.html`,
    offset: ['32px'],
    skin: 'layui-layer-win10'
  });
}
function show_usage() {
  console.log(window.screen.availWidth)
  layer.open({
    type: 2,
    area: ['90%', "90%"],
    title: '使用说明',
    shade: 0.6, // 遮罩透明度
    shadeClose: true, // 点击遮罩区域，关闭弹层
    maxmin: false,
    anim: 0, // 0-6 的动画形式，-1 不开启
    content: `./usage.html`,
    offset: ['32px']
  });
}

function qqbot_ua() {
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


function alert_invalid() {
  layer.msg("存档数据无效或无法解析。")
}
function genPicDialog() {
  document.getElementById('picgen').style.display = 'block';
}


// User utils

//saves browser
var sb_ui;
const sb_main = `
        <div style="text-align: left;padding:16px">
        <h2>云存档浏览器</h2><hr>
        <div style="line-height:32px">
            <span id="saves_count" style="box-sizing:border-box;padding:3px;border:1px;border-style:solid;border-color: #ffffff33;color:rgb(255, 255, 255);border-radius:16px">总数: Loading...</span>
            </div>
            <hr>
            <div style="line-height: 32px;">
                <a href="javascript:void(0);" style="white-space:nowrap;color:lightblue;text-decoration:none;box-sizing:border-box;padding:3px;border:1px;border-style:solid;border-color: #ffffff33;border-radius:16px;" onclick="javascript:sb_changeCount();">修改单页显示数量</a>
                <a href="javascript:void(0);" style="white-space:nowrap;color:lightblue;text-decoration:none;box-sizing:border-box;padding:3px;border:1px;border-style:solid;border-color: #ffffff33;border-radius:16px;" onclick="javascript:fetch_saves();">Refresh / 刷新</a>
                <a href="javascript:void(0);" style="white-space:nowrap;color:lightblue;text-decoration:none;box-sizing:border-box;padding:3px;border:1px;border-style:solid;border-color: #ffffff33;border-radius:16px;" onclick="javascript:sb_prep();">Previous / 上一页</a>
                <a href="javascript:void(0);" style="white-space:nowrap;color:lightblue;text-decoration:none;box-sizing:border-box;padding:3px;border:1px;border-style:solid;border-color: #ffffff33;border-radius:16px;" onclick="javascript:sb_nexp();">Next / 下一页</a>
            </div>
            <hr>
            <div class="saves_list_container">
                <table class="layui-table" lay-skin="line">
                    <colgroup>
                        <col style="min-width:3vw;max-width:16vw">
                        <col style="max-width:32vw ">
                        <col>
                        <col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Title / 标题</th>
                            <th>Info / 概要</th>
                            <th>Created Time / 创建时间</th>
                            <th>Operation / 操作</th>
                            <th>Desc / 备注</th>
                        </tr>
                    </thead>
                    <tbody id="savesList_sub">
                    </tbody>
                </table>
            </div>
        </div>`

function customEscape(str) {
  return str.replace(/[\x00-\x7F]/g, function (char) {
    return char;
  }).replace(/[\x80-\uFFFF]/g, function (char) {
    const code = char.charCodeAt(0);
    if (code <= 0x7FF) {
      return `%u${code.toString(16).toUpperCase().padStart(4, '0')}`;
    } else {
      return `%u${code.toString(16).toUpperCase().padStart(4, '0')}`;
    }
  });
}
function sb_changeCount() {
  layer.prompt({
    formType: 0,
    value: split_c,
    title: '输入单页显示数量'
  }, function (value, index, elem) {
    layer.close(index);
    split_c = parseInt(value);
    if (isNaN(split_c)) {
      layer.msg("输入无效，已自动重置为默认值。");
      split_c = 3;
    }
    fetch_saves();
  })

}
var isSavesGotOnce = false; // 是否已经获取过存档 (Disabled)
var fromIndex = 0;
var count = 0;
var split_c = 3;
function openSavesBrowser() { // 'll be called when the user clicks the button to open the file browser
  // var over4lay = document.getElementById('over4lay');
  // var savesModal = document.getElementById('savesModal');
  // over4lay.style.display = 'block';
  // savesModal.style.display = 'block';
  sb_ui = layer.open({
    type: 1,
    title: 'Saves Browser',
    shadeClose: true,
    shade: 0.8,
    area: ['70vw', "80vh"],
    content: sb_main,
    skin: 'layui-layer-win10'
  })
}
function closeSavesBrowser() {
  // var over4lay = document.getElementById('over4lay');
  // var savesModal = document.getElementById('savesModal');
  // over4lay.style.display = 'none';
  // savesModal.style.display = 'none';
  layer.close(sb_ui);
}
function fetch_saves() {
  var loading = layer.load(1);
  c = (count == 0 ? split_c : (count - fromIndex > split_c ? split_c : count - fromIndex));
  apiAuth('user/fetchSaves.php', getStorage("username"), getStorage("token"), { from: fromIndex, to: split_c }, () => {
    closeSavesBrowser();
    isSavesGotOnce = false;
  }, (e) => { layer.msg(e.msg) },
    (e) => {
      mountSaves(e.data);
      count = e.count;
      if (e.data.length == 0 && count > 0) {
        fromIndex = (Math.ceil(count / split_c) - 1) * split_c;
        layer.msg("当前页没有存档，已自动跳转至最后一页。");
        fetch_saves();
        return;
      }
      c = (count == 0 ? split_c : (count - fromIndex > split_c ? split_c : count - fromIndex));
      document.getElementById("saves_count").innerHTML = "Count / 总数：" + e.count + ", Current / 当前：" + fromIndex + "-" + (fromIndex + c);
    }, (e) => { layer.msg(e.msg) }, undefined)
}
function openSavesBrowser_btn() {

  openSavesBrowser();
  if (!isSavesGotOnce) {
    fetch_saves();
    // isSavesGotOnce = true;
  }
}
function decodeR(str) {
  return str
}
function mountSaves(items) {
  if (items.length === 0) {
    var tab = document.getElementById('savesList_sub');
    tab.innerHTML = '<tr><td colspan="5">No saves found / 没有找到存档</td></tr>';
    return;
  }
  var tab = document.getElementById('savesList_sub');
  tab.innerHTML = '';
  // foreach
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${decodeR(item.title)}</td>
    <td>${decodeR(item.score)}</td>
    <td>${item.datetime}</td>
    <td><a href="javascript:void(0);" class="action" onclick="javascript:fetch_save('${item.selfid}');">View / 查看</a><a href="javascript:void(0);" class="action delete" onclick="javascript:delete_save('${item.selfid}');">Delete / 删除</a></td>
    <td>${decodeR(item.description)}</td>
    `
    tab.appendChild(tr);
  }
}
function fetch_save(id) {
  apiAuth('user/fetchSave.php', getStorage("username"), getStorage("token"), { id: id }, () => { closeSavesBrowser() }, (e) => { layer.msg(e.msg) }, (e) => {
    layer.msg(e.msg);
    document.getElementById("inputData").value = decodeURIComponent((e.data[0].content));
    startProcess();
  }, (e) => { layer.msg(e.msg) }, closeSavesBrowser)
}
function delete_save_r(id) {
  apiAuth('user/delSave.php', getStorage("username"), getStorage("token"), { id: id }, () => { closeSavesBrowser() }, (e) => { layer.msg(e.msg) }, (e) => {
    layer.msg(e.msg);
    fetch_saves();
  }, (e) => { layer.msg(e.msg) })
}
function delete_save(id) {
  layer.confirm('Are you sure to delete this save? / 你确定要删除这个存档吗？', {
    btn: ['Yes / 是', 'No / 否']
  }, function () {
    delete_save_r(id);
  });
}
function sb_prep() {
  if (fromIndex <= 0) { layer.msg("Already at the beginning / 已经在开头了"); return; };
  fromIndex -= split_c;
  if (fromIndex < 0) fromIndex = 0;
  fetch_saves();
}
function sb_nexp() {
  if (fromIndex + split_c >= count) { layer.msg("No more saves / 没有更多存档了"); return; };
  fromIndex = (fromIndex + split_c) % count;
  fetch_saves();
}

// license
var license_dialog;
function openLicenseAndPrivacy() {
  license_dialog = layer.open({
    type: 1,
    title: 'License & Privacy / 许可证 & 隐私政策',
    content: '<div id="LP_content" style="padding:32px"></div>',
    area: ['80vw', '80vh'],
    shade: 0.6,
    skin: 'layui-layer-win10',
    shadeClose: true
  });
  var loading = layer.load(1);
  try {
    fetch('licenseAndPrivacy.txt').then(res => res.text()).then(data => {
      layer.close(loading);
      document.getElementById("LP_content").innerHTML = `<pre>${data}</pre><hr><button class="layui-btn layui-btn-normal" onclick="layer.close(license_dialog)">关闭</button>`
    })
  } catch (e) {
    layer.close(loading);
    layer.msg("Error / 出现错误，请检查网络连接。");
  }

}
function show_alertInfo() {
  layer.open({
    type: 1,
    title: '使用须知',
    content: `<div id="show_alertInfo_content_" style="padding:32px"><pre id="show_alertInfo_content_pre"></pre>
<hr>
<button class="layui-btn layui-btn-normal" onclick="layer.closeAll()">关闭</button></div>
</div>`,
    area: ['80vw', '80vh'],
    shade: 0.6,
    shadeClose: true,
    skin: 'layui-layer-win10'
  });
  var loading = layer.load(1);
  try {
    fetch('up.txt').then(res => res.text()).then(data => {
      layer.close(loading);
      document.getElementById("show_alertInfo_content_pre").innerHTML = data;
    })
  } catch (e) {
    layer.close(loading);
    layer.msg("Error / 出现错误，请检查网络连接。");
  }
}

// for API
function apiAuth(path, username, token, customParams, afterLoginFailed, afterOpFailed, afterSuccess, afterError, final) {
  var loading = layer.load(1);
  try {
    fetch(path, {
      method: "POST",
      body: new URLSearchParams({
        username: username,
        token: token,
        ...customParams
      })
    }).then(res => res.json()).then(data => {
      layer.close(loading);
      if (data.code === 0) {
        if (afterSuccess) afterSuccess(data);
      } else if (data.code === -4) {
        loginExpired(function () {
          if (afterLoginFailed) afterLoginFailed(data);
        })
      } else {
        if (afterOpFailed) afterOpFailed(data);
      }
      if (final) final();
    })
  } catch (e) {
    layer.close(loading);
    if (afterError) afterError(e);
    if (final) final();
  }
}
function loginExpired(after) {
  logout();
  initLogging();
  layer.msg("登录已过期，请重新登录。");
  if (after) after();
}

function updateSD() {
  apiAuth('user/getSecurityDesc.php', getStorage("username"), getStorage("token"), {}, () => { }, (e) => { layer.msg(e.msg); }, (e) => {

    if (e.authInfo === null) {
      layer.msg("未设置安全验证信息。")
    }
    document.getElementById("_securityDesc_content").innerHTML = `<a class="superlinkR" onclick="layer.closeAll()" href='javascript:void(0);'>关闭</a>&nbsp;&nbsp;&nbsp;<a class="superlinkR" href='javascript:void(0);' onclick="securityDesc_edit()">修改</a><hr>你可以填写用于重置密码的安全验证方案，例如写你的qq号、邮箱、微信号，甚至是简单的密保问题。后续需要找回时找站点管理员处理即可。<hr>密保信息:<hr><pre id="_securityDesc_content_pre">${e.authInfo}</pre>`

  }, (e) => { layer.msg(e.msg); });
}
function securityDesc() {
  layer.open({
    type: 1,
    title: '账号安全验证信息',
    content: `<div id="_securityDesc_content" style="padding:32px">请稍等...</div>`,
    area: ['60vw', '80vh'],
    shade: 0.6,
    shadeClose: true,
    skin: 'layui-layer-win10'
  })
  updateSD();
}
var securityDesc_edit_dialog;
function securityDesc_edit() {
  securityDesc_edit_dialog = layer.open({
    type: 1,
    title: '修改账号安全验证信息',
    content: `<div id="_securityDesc_edit_content" style="padding:32px">你可以填写用于重置密码的安全验证方案，例如写你的qq号、邮箱、微信号，甚至是简单的密保问题。后续需要找回时找站点管理员处理即可。<hr><textarea id="securityDesc_edit_textarea" style="width:100%;height:40vh" class="layui-textarea textareaR"></textarea><hr><button class="layui-btn layui-btn-normal" onclick="securityDesc_edit_save()">覆盖并保存</button><button class="layui-btn layui-btn-normal" onclick="layer.close(securityDesc_edit_dialog)">取消修改</button></div>`,
    // area: ['80vw', '80vh'],
    shade: 0.6,
    shadeClose: true,
    skin: 'layui-layer-win10'
  })
  // document.getElementById("_securityDesc_edit_content").innerHTML = ``
  document.getElementById("securityDesc_edit_textarea").value = document.getElementById("_securityDesc_content_pre").innerHTML
}
function securityDesc_edit_save() {
  if (document.getElementById("securityDesc_edit_textarea").value.length > 2000) {
    layer.msg("内容过长，请限制在2000字以内。");
    return;
  }

  apiAuth('user/setSecurityDesc.php', getStorage("username"), getStorage("token"), { securityDesc: document.getElementById("securityDesc_edit_textarea").value }, () => { }, (e) => { layer.msg(e.msg); }, (e) => {
    layer.msg(e.msg);
    layer.close(securityDesc_edit_dialog);
    updateSD()
  }, (e) => { layer.msg(e.msg); });
}

function open_changelog() {
  layer.open({
    type: 1,
    title: 'ChangeLog / 更新日志',
    content: '<div id="cl_content" style="padding:32px"></div>',
    area: ['80vw', '80vh'],
    shade: 0.6,
    shadeClose: true,
    skin: 'layui-layer-win10'
  });
  var loading = layer.load(1);
  try {
    fetch('changelog.php').then(res => res.text()).then(data => {
      layer.close(loading);
      document.getElementById("cl_content").innerHTML = `<pre>${data}</pre><hr><button class="layui-btn layui-btn-normal" onclick="layer.closeAll()">关闭</button>`
    })
  } catch (e) {
    layer.close(loading);
    layer.msg("Error / 出现错误，请检查网络连接。");
  }

}
function openRainSettings() {
  layer.open({
    type: 1,
    title: 'Rain Settings / 雨滴设置',
    content: `<div id="rain_settings_content" style="padding:32px;text-align:center;line-height:8vh">
    <button class="layui-btn layui-btn-normal" onclick="setRain(1.5,50)">正常</button><br>
    <button class="layui-btn layui-btn-normal" onclick="setRain(3,100)">慢</button><br>
    <button class="layui-btn layui-btn-normal" onclick="setRain(0.6,15)">快</button><br>
    <button class="layui-btn layui-btn-normal" onclick="stopRain()">禁用</button><br>
    <button class="layui-btn layui-btn-normal" onclick="layer.closeAll()">完成</button>
    </div>`,
    area: ['auto', '80vh'],
    shade: 0.6,
    shadeClose: true,
    skin: 'layui-layer-win10'
  })

}
function reRain() {
  clearInterval(rain_interval);
  rain_interval = setInterval(createRainDrop, rain_interval_ms);
}
function setRain(_rain_anim_length, _rain_interval_ms, after) {
  rain_anim_length = _rain_anim_length;
  rain_interval_ms = _rain_interval_ms;
  if (!after) { layer.closeAll(); layer.msg("设置成功"); }
  reRain();
}
function stopRain() {
  clearInterval(rain_interval);
  layer.closeAll();
  layer.msg("已禁用雨滴动画。");
}
// For nickname settings
var nickNameSettingsDialog;
function nickNameSettings() {
  // ll be triggered if button is clicked.
  openNickNameSettingsDialog();
  remount_nickNameSettings();
}
function openNickNameSettingsDialog() {
  nickNameSettingsDialog = layer.open({
    type: 1,
    title: 'Nickname Settings / 昵称设置',
    content: `<div id="nickNameSettings_content" style="padding:32px;text-align:center;line-height:4vh">
    <h3>您的用户名（登录名）：<span id="nickNameSettings_content_username"></span></h3>
    <h3>您当前的昵称：<span id="nickNameSettings_content_name"></span></h3>
    <button class="layui-btn layui-btn-normal" onclick="changeNickName()">修改昵称</button><br>
    <hr>
    <p>此昵称将在首页登陆后显示，修改昵称不会影响登陆用户名，登陆请仍然使用登陆用户名。（昵称可以和别人相同。）</p>
    </div>`,
    // area: ['60vw', '80vh'],
    shade: 0.6,
    shadeClose: true,
    skin: 'layui-layer-win10'
  })
}
function remount_nickNameSettings() {
  // initLogging();
  // if(!isLogged){
  //   closeNickNameSettingsDialog();
  //   return;
  // }
  // document.getElementById("nickNameSettings_content_name").innerHTML = getStorage("nickname");
  apiAuth('user/check.php', getStorage("username"), getStorage("token"), undefined, (e) => {
    closeNickNameSettingsDialog(); closeUserPanel();
  }, (e) => {
    layer.msg(e.msg); closeNickNameSettingsDialog();
  }, (e) => {
    setStorage("nickname", e.nickname);
    mount_nickNameSettings();
  }, (e) => { layer.msg(e.msg); });
}
function mount_nickNameSettings() {
  document.getElementById("nickNameSettings_content_name").innerHTML = getStorage("nickname");
  document.getElementById("nickNameSettings_content_username").innerHTML = getStorage("username");
}
function closeNickNameSettingsDialog() {
  layer.close(nickNameSettingsDialog);
}
function changeNickName() {
  layer.prompt({ title: '请输入新的昵称', formType: 0, value: getStorage("nickname") }, function (nickName, index) {
    if (nickName.length > 60) {
      layer.msg("昵称过长，请限制在60字以内。");
      return;
    } else if (nickName.length == 0) {
      layer.msg("昵称不能为空。");
      return;
    }
    apiAuth('user/setNickname.php', getStorage("username"), getStorage("token"), { nickname: nickName }, () => {
      closeNickNameSettingsDialog();
      closeUserPanel();
      layer.close(index);
    }, (e) => { layer.msg(e.msg); }, (e) => {
      layer.msg(e.msg);
      layer.close(index);
      setStorage("nickname", nickName);
      mount_nickNameSettings();
      initLogging();
    })
  })
}

// alert to set secret
function alertSetSecret() {
  layer.msg("强烈建议打开\"用户设置\"为自己的账号设置\"密保\"信息，以防止账号的密码丢失。");
}
// upl_pre
function upl_pre() {
  if(document.getElementById("inputData").value != "debug"){
    upl();
  }else{
    upl_debug();
  }
}

function TRY(func) {
  try{eval(func)}catch(e){}
}
function upl_debug(){
  layer.open({
    type: 1,
    title: 'Debug / 调试',
    content: `<div id="debug_content" style="padding:32px;text-align:center;">
    <span id="debug_new_ui_css_show" style="display:none;">new_ui.css is running.</span>
    <span id="debug_new_ui_css_hide" style="display:inline;">new_ui.css is not running.</span><br>
    <span id="debug_new_ui_js">new_ui.js is running.</span><br>
    <span id="debug_upload4index_js">upload4index.js is not running.</span><br>
    <span id="debug_cha_newui_js">cha_newui.js is not running.</span><hr/>
    <button class="layui-btn layui-btn-normal" onclick="layer.closeAll()">完成</button>
    </div>`,
    skin: 'layui-layer-win10'
  });
    TRY("upload4index_debug()");
    TRY("cha_newui_js_debug()");
}

// for stat
var stat_dialog;
function openStat(){
  stat_dialog=layer.open({
    type: 1,
    title: '统计',
    content: `<div id="stat_content" style="padding:32px;text-align:center;height:100%">

            <div id="stat_chart" style="width: 100%;min-width:400px;height: 70%;"> </div>
    </div>`,
    skin: 'layui-layer-win10',
    area: ['75vw', '80vh'],
    shade: 0.6,
    shadeClose: true,
  });
  console.log(stat_dialog)
  var f=layer.load(1);
  try{
    fetch("wtf/stat.php").then((res)=>{
    res.json().then((data)=>{
      
      if(data.data.code!=0){
        layer.msg(data.data.msg);
        return;
      }
      console.log(data)
      mount_stat(data);
    })
  })
  }catch(e){
    layer.msg("获取数据失败，请检查网络连接。");
  }finally{
    layer.close(f);
  }
  
}
function mount_stat(content){
  var f=document.getElementById('stat_chart')
var ccc = echarts.init(f);
var p=content.data.data;
var dates = p.map((item => item.date));
var data = {
        title: {
            text: '访问统计',
            textStyle: {
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold'
            }
        },
        tooltip: {},
        legend: {
            data: ["访问量"],
            textStyle: {
                color: '#fff'
            }
        },
        xAxis: {
            data: dates
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}',
                color: '#fff'
            }
        },
        series: [{
            name: '访问量',
            type: 'line',
            data: p.map((item => item.visits))
        }
            ]
    };
ccc.setOption(data,true);
ccc.resize({height: f.clientHeight*0.8});
console.log(f.clientHeight*0.8)
}

function ol_runner(func, args){
  func(...args)
}
function ol_updateImgGenProcess(text){
  var f=document.getElementById('img_gen_process')
  f.innerHTML=text
}