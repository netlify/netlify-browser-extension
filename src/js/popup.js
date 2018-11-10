var getLocation = function(href) {
  var l = document.createElement('a');
  l.href = href;
  return l;
};
function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

document.addEventListener('DOMContentLoaded', function() {
  // var divs = document.querySelectorAll('div');
  // for (var i = 0; i < divs.length; i++) {
  //   divs[i].addEventListener('click', click);
  // }

  // window.onload = () => {
  // setInterval(() => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs) {
    var url = getLocation(tabs[0].url);
    const notnetlify = document.querySelector('#notnetlify');
    const yaynetlify = document.querySelector('#yaynetlify');
    console.log('url.hostname', url.hostname);
    if (url.hostname === 'netlify.com') {
      console.log('isnetlify', url.hostname);
      notnetlify.hidden = false;
      yaynetlify.hidden = true;
      const button = document.querySelector('.start');
      button.onclick = () => {
        var slug = url.host.split('.')[0];
        console.log('slug', slug);
        openInNewTab('https://app.netlify.com/sites/' + slug);
      };
    } else {
      console.log('notnetlify', url.hostname);
      notnetlify.hidden = true;
      yaynetlify.hidden = false;
    }
    console.log('00000', url);
  });
  // const $startButton = document.querySelector('.start');

  // $startButton.onclick = () => {
  //   // Get active tab
  //   chrome.tabs.query({
  //     active: true,
  //     currentWindow: true,
  //   }, (tabs) => {
  //     // Send message to script file
  //     chrome.tabs.sendMessage(
  //       tabs[0].id,
  //       { injectApp: true },
  //       response => window.close()
  //     );
  //   });
  // };
  // }, 1000);
});
