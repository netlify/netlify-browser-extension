// https://stackoverflow.com/questions/220231/accessing-the-web-pages-http-headers-in-javascript
// but using fetch cos sync xmlhttp is blocked
// but using webview cos fetch is blocked https://developer.chrome.com/extensions/manifest/sandbox
// nvm lol you can do async xmlhttp
var req = new XMLHttpRequest();
req.open('GET', document.location);
req.send(null);
req.onreadystatechange = function() {
  var header = req.getResponseHeader('server');
  if (header === 'Netlify') {
    browser.runtime.sendMessage({
      netlifyPage: true
    });
  }
};

var host = document.location.host

browser.runtime.sendMessage({method:'setHost', url: host})
