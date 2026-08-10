(() => {
  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "case-assets/history-cases.css";
  document.head.appendChild(css);

  const sources = [
    "case-assets/history-cases.js",
    "case-assets/kaleshu/product-manifest.js",
    "case-assets/crown-ivy/candidate-manifest.js",
    "case-assets/crown-ivy/proposal-manifest.js",
    "case-assets/history-cases-renderer.js"
  ];

  sources.reduce((ready, src) => ready.then(() => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  })), Promise.resolve()).catch((error) => console.error("历史案例资源加载失败", error));
})();
