require(["gitbook"], function(gitbook) {
  window.timer = null;
  function checkLoginStatus() {
      if(window.timer)return;
      window.timer = setInterval(function(){
          var content = document.querySelector('#login-iframe').contentWindow;
          content.postMessage({check: true}, '*');
      }, 500);
      document.getElementsByClassName('cover')[0].style.display='flex';
      window.addEventListener('message', function(event){
          var fullTicketId = '';
          if (typeof event.data === 'string') {
              try {
                  fullTicketId = JSON.parse(event.data).fullTicketId;
              } catch (e) {
                  console.warn('本次 message 事件中未解析得到 fullTicketId ：', e);
              }
          }
          if (event.data && fullTicketId) {
              // 登录成功，清除定时器，不做其它操作
              clearInterval(window.timer);
              window.timer = null;
              document.getElementsByClassName('cover')[0].style.display='none';
          } else if (event.data && event.data.check != 'waiting' ) {
              // 登录失败，需要重定向至登录页面
              window.location.href="/#login";
              clearInterval(window.timer);
          }
      }, false);
      window.__LISTENING_LOGIN_MESSAGE__ = true;
  }

  gitbook.events.bind("start", checkLoginStatus);
  gitbook.events.bind("page.change", checkLoginStatus);
});
