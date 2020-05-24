module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,png,svg,otf,html,js,txt,css}"
  ],
  "swDest": "build\\sw.js",
  "swSrc": "src/sw.js",
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/
};