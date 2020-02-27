module.exports = {
  book: {
      assets: "./book",
      js: [
          "plugin.js"
      ]
  },
hooks: {
  "page:before": function(page) {
    // 加上iframe与login-frame通信，引用同域名下的iframe
    var iframeContent = "<style>.cover{position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background:white;z-index:10000}.point{width:10px;height:10px;background:black;border-radius:50%;float:left;margin-left:5px;animation:myAnima 1.2s ease-in-out infinite;}.two{animation-delay: 200ms;}.three{animation-delay: 400ms;}@keyframes myAnima{from {opacity: 0.8}to{opacity: 0}}</style>";
    iframeContent += "<div class='cover'><div class='point one'></div><div class='point two'></div><div class='point three'></div>";
    iframeContent += "<iframe style='display:none' id='login-iframe' src='/login-iframe.html'/>";
    page.content = iframeContent +page.content;
    return page;
  }
}

};
