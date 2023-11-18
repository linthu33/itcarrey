'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "a179b871abd5f97250b938e5a590eefa",
"assets/assets/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"assets/assets/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/assets/icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"assets/assets/icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"assets/assets/images/image_01.png": "a299c520f67de8b3642ff90f910ae81b",
"assets/assets/images/iv_1.png": "54bc562e69855c72e0c5604df7fcf211",
"assets/assets/images/iv_2.png": "4d8c55c4b075ed1fa9b55bf723c3d670",
"assets/assets/images/iv_3.png": "6f03e70c1a18031e10b7f78e466255a7",
"assets/assets/images/iv_4.png": "e9bcc5c3bd17f249eaa399428c67fe9c",
"assets/assets/images/iv_5.png": "246646bf0ea75a95392b7c4e4e026125",
"assets/assets/images/menu.png": "24085b165cf07dbb15583b1fa0ea583d",
"assets/assets/images/sent.png": "a76dea49fba5b97bf9504db741d38356",
"assets/assets/images/team_1.jpg": "91236c9479d7aeb64f108b05fb40edd6",
"assets/assets/images/team_2.jpg": "3d204a39c9fc021198b0307b9caef359",
"assets/assets/images/team_3.jpg": "1ad6fbe0da5a517545d1e44ad2f0d5d3",
"assets/assets/images/team_4.jpeg": "30d88e00461c82649d17169c11eb20f1",
"assets/FontManifest.json": "e03be0e0d5bdcda62663c880ce70045c",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/fonts/Montserrat-Bold.ttf": "a3b387c93882604792867736aecd56c8",
"assets/fonts/Montserrat-Regular.ttf": "a8a117360e71de94ae3b0b0f8d15b44d",
"assets/hiraminpro-w3.otf": "3fabfe5faf69d7514122ef7c61d9e62c",
"assets/icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"assets/icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"assets/icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"assets/images/image_01.png": "a299c520f67de8b3642ff90f910ae81b",
"assets/images/iv_1.png": "54bc562e69855c72e0c5604df7fcf211",
"assets/images/iv_2.png": "4d8c55c4b075ed1fa9b55bf723c3d670",
"assets/images/iv_3.png": "6f03e70c1a18031e10b7f78e466255a7",
"assets/images/iv_4.png": "e9bcc5c3bd17f249eaa399428c67fe9c",
"assets/images/iv_5.png": "246646bf0ea75a95392b7c4e4e026125",
"assets/images/menu.png": "24085b165cf07dbb15583b1fa0ea583d",
"assets/images/sent.png": "a76dea49fba5b97bf9504db741d38356",
"assets/images/team_1.jpg": "91236c9479d7aeb64f108b05fb40edd6",
"assets/images/team_2.jpg": "3d204a39c9fc021198b0307b9caef359",
"assets/images/team_3.jpg": "1ad6fbe0da5a517545d1e44ad2f0d5d3",
"assets/images/team_4.jpeg": "30d88e00461c82649d17169c11eb20f1",
"assets/NOTICES": "27455d058933725f9f8d40d9d0cac06c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "2ad5fabd6a36a6deff087b8edfd0c1f8",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "8ae00b472ec3937a5bee52055d6bc8b4",
"index.html": "620375cfba62c1e0d8bb2f73f8a84b0b",
"/": "620375cfba62c1e0d8bb2f73f8a84b0b",
"main.dart.js": "4b17e49fcbe8bd4d80596bb77d516bd2",
"manifest.json": "c7ee23a26eb68b1efe24cd953ae9b109",
"version.json": "7c0048d4f2ccf36be07ef7b2e5a47ecf"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
