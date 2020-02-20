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
			var iframeContent = "<iframe style='display:none' id='login-iframe' src='/login-iframe.html' />";
			page.content = iframeContent +page.content;
			return page;
		}
	}

};
