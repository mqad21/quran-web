importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// workbox.setConfig({ modulePathPrefix: 'workbox-v4.0.0/' })

const precacheManifest = [
  {
    "url": "asset-manifest.json",
    "revision": "9974bebe769db2d2153d3d8ee38dd728"
  },
  {
    "url": "assets/ayat.png",
    "revision": "40e2b7564f0ddd7ab344b7b79b060a02"
  },
  {
    "url": "assets/ayat.svg",
    "revision": "0be9f9071c58b89e5b4463518f03e518"
  },
  {
    "url": "assets/frame-left.png",
    "revision": "e1d7e7af8741d6734713638ee5feaa84"
  },
  {
    "url": "assets/frame-left.svg",
    "revision": "3c2a8d099333858172a9b4139b359e95"
  },
  {
    "url": "assets/frame-right.png",
    "revision": "46628c49432941a226d7667130225d26"
  },
  {
    "url": "assets/logo-white.png",
    "revision": "02d703536953e0495abfe60bc8c10abe"
  },
  {
    "url": "assets/logo.png",
    "revision": "6d17f789a920f3973c58417f1e9e84e2"
  },
  {
    "url": "assets/logo192.png",
    "revision": "b23b7626495c27a4452bcf46b9586182"
  },
  {
    "url": "assets/logo512.png",
    "revision": "83ce7604cd047252b54766a8100c6ef7"
  },
  {
    "url": "index.html",
    "revision": "5ba39625fb9bce00c6b73e26d3d0206a"
  },
  {
    "url": "manifest.json",
    "revision": "af89a022f5adc770193197a98d0a76b7"
  },
  {
    "url": "precache-manifest.1785ffd215913ca6896931fa422d66e8.js",
    "revision": "1785ffd215913ca6896931fa422d66e8"
  },
  {
    "url": "robots.txt",
    "revision": "fa1ded1ed7c11438a9b0385b1e112850"
  },
  {
    "url": "service-worker.js",
    "revision": "6caefceb4fd80e9357ed794e4441601c"
  },
  {
    "url": "static/css/2.5a510433.chunk.css",
    "revision": "38ae303f930cf49cbb9c51d8d3532615"
  },
  {
    "url": "static/css/main.0f569f63.chunk.css",
    "revision": "8a3c5f26f5cda26601cc5a3948d0b12b"
  },
  {
    "url": "static/js/2.06e5e3d4.chunk.js",
    "revision": "36e5f592ec131c08c9781131933d0516"
  },
  {
    "url": "static/js/2.06e5e3d4.chunk.js.LICENSE.txt",
    "revision": "4f64ec6ccd5b5efb7e0614021e2e63a4"
  },
  {
    "url": "static/js/runtime-main.a1e289cd.js",
    "revision": "5bd3b0c4b1997de20ace6e5645df746a"
  },
  {
    "url": "static/media/frame-left.2d4b1ab6.png",
    "revision": "2d4b1ab6ccd9ca3a0d1f1e36ac004f84"
  },
  {
    "url": "static/media/frame-right.def9fb37.png",
    "revision": "def9fb37d14b43140f451d0c3f7ae5ad"
  },
  {
    "url": "workbox-v4.3.1/workbox-background-sync.dev.js",
    "revision": "5446355eef3aa184b5b6eebfcd81f8d9"
  },
  {
    "url": "workbox-v4.3.1/workbox-background-sync.prod.js",
    "revision": "1ffcc362312a9e8ef4e28280ace2a1bd"
  },
  {
    "url": "workbox-v4.3.1/workbox-broadcast-update.dev.js",
    "revision": "0508d13784c9b0549663f40e3fe55d37"
  },
  {
    "url": "workbox-v4.3.1/workbox-broadcast-update.prod.js",
    "revision": "ee27c0fdc836f6a2dc656b25a680f9e4"
  },
  {
    "url": "workbox-v4.3.1/workbox-cacheable-response.dev.js",
    "revision": "ecba3679d285394f1c9e219681662721"
  },
  {
    "url": "workbox-v4.3.1/workbox-cacheable-response.prod.js",
    "revision": "a38e8afa80070ec9dff5dc2fb116f1c2"
  },
  {
    "url": "workbox-v4.3.1/workbox-core.dev.js",
    "revision": "2912182ccc99b017a8c36802cf9d983f"
  },
  {
    "url": "workbox-v4.3.1/workbox-core.prod.js",
    "revision": "5d14d8267f65030735589e4b664ee3bf"
  },
  {
    "url": "workbox-v4.3.1/workbox-expiration.dev.js",
    "revision": "43c236fe62480f042c35e8b898ca3367"
  },
  {
    "url": "workbox-v4.3.1/workbox-expiration.prod.js",
    "revision": "a767f3bbd2773a0bea34ff841b51ab64"
  },
  {
    "url": "workbox-v4.3.1/workbox-navigation-preload.dev.js",
    "revision": "a8f30e409f7037906053acec7d709beb"
  },
  {
    "url": "workbox-v4.3.1/workbox-navigation-preload.prod.js",
    "revision": "e2b19a3eda50f48ce7fc48640a523353"
  },
  {
    "url": "workbox-v4.3.1/workbox-offline-ga.dev.js",
    "revision": "3fba0947d12d42834b81499fafc76e82"
  },
  {
    "url": "workbox-v4.3.1/workbox-offline-ga.prod.js",
    "revision": "6af4fb51a5249c4e0ed7bc61ed59836d"
  },
  {
    "url": "workbox-v4.3.1/workbox-precaching.dev.js",
    "revision": "8fbbefcd70c998a3cd35f02e6a8ac4e7"
  },
  {
    "url": "workbox-v4.3.1/workbox-precaching.prod.js",
    "revision": "e8f5c57430ec7c448d30015ff4bd5896"
  },
  {
    "url": "workbox-v4.3.1/workbox-range-requests.dev.js",
    "revision": "0f15c57cf5c75cc72b6f23ad28a941d1"
  },
  {
    "url": "workbox-v4.3.1/workbox-range-requests.prod.js",
    "revision": "97c430406d13f4b91c805594ef351261"
  },
  {
    "url": "workbox-v4.3.1/workbox-routing.dev.js",
    "revision": "471b8e0f45e6e5e679d04f60c6466e7f"
  },
  {
    "url": "workbox-v4.3.1/workbox-routing.prod.js",
    "revision": "d3fa76a1c38649d596b1d2ffaf398128"
  },
  {
    "url": "workbox-v4.3.1/workbox-strategies.dev.js",
    "revision": "d1c19737e82e2f6bd567aaf384683174"
  },
  {
    "url": "workbox-v4.3.1/workbox-strategies.prod.js",
    "revision": "6033181992f0bc562ab1ef5f9ba34697"
  },
  {
    "url": "workbox-v4.3.1/workbox-streams.dev.js",
    "revision": "eed9eb6f7b0672c45db5408d05efe9b9"
  },
  {
    "url": "workbox-v4.3.1/workbox-streams.prod.js",
    "revision": "4407a13523f1fa1064f616e9047b6148"
  },
  {
    "url": "workbox-v4.3.1/workbox-sw.js",
    "revision": "6e1e47d706556eac8524f396e785d4bb"
  },
  {
    "url": "workbox-v4.3.1/workbox-window.dev.umd.js",
    "revision": "c17834573a1b48bb8cf33b12128bdae9"
  },
  {
    "url": "workbox-v4.3.1/workbox-window.prod.umd.js",
    "revision": "c65238721ed1187cf832e51a9e34724a"
  }
];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);

const dataCacheConfig = {
    cacheName: 'quran-data'
};

workbox.routing.registerRoute(
    /.*.(?:js|css|ttf|otf)$/,
    workbox.strategies.precacheAndRoute({
        cacheName: 'quran-assets'
    }),
    'GET');

workbox.routing.registerRoute(
    /.*.(?:png|jpg|jpeg|svg)$/,
    workbox.strategies.precacheAndRoute({
        cacheName: 'quran-images'
    }),
    'GET');

workbox.routing.registerRoute(
    /.*.(?:json)$/,
    workbox.strategies.precacheAndRoute({
        cacheName: 'quran-json'
    }),
    'GET');

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.precacheAndRoute({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);