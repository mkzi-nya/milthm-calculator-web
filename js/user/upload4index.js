var upload4index_js_ver = 3
function goLogin() {
    var loginUI = document.getElementById("loginModal");
        var o2l = document.getElementById("over2lay");
        var x2l = document.getElementById("loginPanel-t");
        x2l.style.display = "none";
        loginUI.style.display = "block";
        o2l.style.display = "block";
}
function doSavesUpload() {
    if (!isLogged()) {
        goLogin();
        return;
    } else {
        showUploadPanel();
    }
}
function showUploadPanel() {
    var pn = document.getElementById("uploadModal");
    var o2l = document.getElementById("over3lay");
    pn.style.display = "block";
    o2l.style.display = "block";
}
function closeUploadPanel() {
    var pn = document.getElementById("uploadModal");
    var o2l = document.getElementById("over3lay");
    pn.style.display = "none";
    o2l.style.display = "none";
}
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
}
function logout_Btn(){
    layer.confirm('确定登出？', {
        btn: ['确定', '取消'] //按钮
    }, function (i) {
        logout();
        initLogging();
        layer.close(i);
        layer.msg("登出成功。");
    })
}
function logoutAll_impl() {

    var loading= layer.load(1);
    var username = getStorage("username");
    var token = getStorage("token");
    try {
        fetch("user/logOutAll.php", {
            method: "POST",
            body: new URLSearchParams({
                username: username,
                token: token
            })
        }).then(res => res.json()).then(data => {
            layer.msg(data.msg);
            if (data.code === 0) {
                logout();
                initLogging();
                closeUserPanel();
            }
            layer.close(loading);
        });
    } catch (e) {
        layer.msg("发生错误。");
        console.log(e);
        layer.close(loading);
    }

}
function logoutAll() {
    layer.confirm('确定在所有设备上登出？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        logoutAll_impl();
    });
}
function closeLogin() {
    var loginUI = document.getElementById("loginModal");
    var o2l = document.getElementById("over2lay");
    loginUI.style.display = "none";
    o2l.style.display = "none";
}
function isLogged() { return isStorageExist("username") & isStorageExist("token") & isStorageExist("nickname"); }
function isStorageExist(name) {
    if (localStorage.getItem(name) !== null & localStorage.getItem(name) !== 'undefined') {
        return true;
    } else {
        return false;
    }
}
function getStorage(name) {
    return localStorage.getItem(name);
}
function setStorage(name, value) {
    localStorage.setItem(name, value);
}
function initLogging() {
    //init
    var userInfoDraw = document.getElementById("logInfo");
    if (isLogged()) {
        userInfoDraw.innerHTML = "欢迎，" + getStorage("nickname") + "！<a href='javascript:void(0);' class='superlinkR' onclick='javascript:openSavesBrowser_btn();'>查看我的存档</a> / " +
            "<a class='nowrap superlinkR' href='javascript:void(0);' onclick='javascript:loadUserPanel();'>用户设置</a> / <a href='javascript:void(0);' class='superlinkR' onclick='javascript:logout_Btn();'>登出</a>";
            // <a class='nowrap superlinkR' href='javascript:void(0);' onclick='javascript:logoutAll();'>在所有设备上登出</a>
    } else {
        userInfoDraw.innerHTML = "未登陆 / Not logged in. <a href='javascript:void(0);' class='superlinkR' onclick='javascript:logout();goLogin();'>登录</a>";
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
    }
}
function checkLogin(alertNoSecret) {
    if (!alertNoSecret) alertNoSecret = false;
    if (isLogged()) {
        try {
            fetch("user/check.php", {
                method: "POST",
                body: new URLSearchParams({
                    username: getStorage("username"),
                    token: getStorage("token")
                })
            }).then(res => res.json()).then(data => {
                if (data.code === 0) {
                    localStorage.setItem("nickname", data.nickname);
                    initLogging();
                    if(alertNoSecret && !data.hasSecret){
                        alertSetSecret();
                    }
                } else {
                    logout();
                    initLogging();
                    layer.msg("登录已过期，请重新登录。");

                }
            })
        } catch (e) {
            layer.msg("登陆校验发生错误。");
            console.log("登陆校验发生错误。", e);
        }
    }else{
        initLogging();
    }

    return isLogged();
}

//on page load
window.onload = function () {
    //check login
    checkLogin(true);
}

function loadUserPanel(){
    if (isLogged()){
        openUserPanel();
    }else{
        goLogin();
    }
}
function openUserPanel(){
    document.getElementById("over5lay").style.display = "block";
    document.getElementById("userModal").style.display = "block";
}
function closeUserPanel(){
    document.getElementById("over5lay").style.display = "none";
    document.getElementById("userModal").style.display = "none";
}

function upload4index_debug(){
    document.getElementById("debug_upload4index_js").innerHTML = "upload4index.js is running.";
}