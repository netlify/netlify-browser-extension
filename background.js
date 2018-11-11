var getLocation = function(href) {
  var l = document.createElement('a');
  l.href = href;
  return l;
};
function onMessage(request, sender, sendResponse) {
  // console.log('backgroundjs', {
  //   request,
  //   sender,
  //   sendResponse
  // });
  if (request.netlifyPage) {
    var url = getLocation(sender.url);
    var slug = url.hostname;
    chrome.pageAction.show(sender.tab.id);
    chrome.pageAction.setIcon({
      path: 'logo16.png',
      tabId: sender.tab.id
    });
    chrome.pageAction.setTitle({
      title: 'Netlify Site!',
      tabId: sender.tab.id
    });
    chrome.pageAction.setPopup({
      tabId: sender.tab.id,
      popup: 'popup.html'
    });
    sendResponse({
      // goes to poup
      hiFrom: 'backgroundjs',
      slug
    });
  }
  if (request.get_version) {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      function(tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            check: 'version'
          },
          function(response) {
            return response;
          }
        );
      }
    );
  }
}
chrome.extension.onMessage.addListener(onMessage);

//Checks if version in use is lower than the current version
function lowerVersion(in_use_version, current_version) {
  return false;
}
