const CACHE_NAME = "offline-cache-v1"; // 缓存名称
const VERSION_URL = "/version.txt"; // 远程版本号文件路径

const ASSETS_TO_CACHE = [
    "/", // 首页
    "/index.html",
    "/styles.css",
    "/script.js",
    "/sw.js", // Service Worker 自己也要缓存
    "/jpgs/NYA.jpg",
    "/jpgs/查分图.jpg",
    "/jpgs/default.png",
    "/jpgs/等级1.png",
    "/jpgs/等级2.png",
    "/jpgs/等级3.png",
    "/fonts/arial.ttf" // 示例字体
];

// 监听 `install` 事件，缓存所有资源
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("[Service Worker] 正在缓存资源...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 监听 `fetch` 事件，优先使用缓存
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// 监听 `activate` 事件，清理旧缓存
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        console.log("[Service Worker] 发现旧缓存，正在删除:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// 监听 `message` 事件（用于手动触发版本检查）
self.addEventListener("message", event => {
    if (event.data === "checkForUpdate") {
        checkForUpdate();
    }
});

// 版本检查函数
function checkForUpdate() {
    fetch(VERSION_URL)
        .then(response => response.text())
        .then(serverVersion => {
            caches.match(VERSION_URL).then(cacheResponse => {
                if (!cacheResponse) return updateCache(serverVersion);
                cacheResponse.text().then(localVersion => {
                    if (localVersion !== serverVersion) {
                        console.log("[Service Worker] 发现新版本，正在更新...");
                        updateCache(serverVersion);
                    }
                });
            });
        })
        .catch(err => console.log("[Service Worker] 版本检查失败:", err));
}

// 更新缓存
function updateCache(newVersion) {
    caches.open(CACHE_NAME).then(cache => {
        console.log("[Service Worker] 更新资源...");
        return cache.addAll(ASSETS_TO_CACHE).then(() => {
            cache.put(VERSION_URL, new Response(newVersion)); // 更新版本号
            self.skipWaiting(); // 立即激活新 Service Worker
        });
    });
}
