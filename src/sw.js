importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

// workbox.setConfig({ modulePathPrefix: 'workbox-v4.0.0/' })

const precacheManifest = [];

workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(precacheManifest);

const dataCacheConfig = {
    cacheName: 'quran-data'
};

workbox.routing.registerRoute(
    /.*.(?:js|css|otf)$/,
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