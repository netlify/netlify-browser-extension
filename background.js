var plesk_11_version = '11.0.9';
var plesk_115_version = '11.5.30';
var plesk_12_version = '12.0.18';
var cpanel_version = '11.50';

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
  if (request.newPage) {
    var url = getLocation(sender.url);
    var slug = url.hostname;
    // console.log({ url, slug, bool: slug.includes('netlify') });
    if (slug.includes('netlify')) {
      chrome.pageAction.show(sender.tab.id);
      chrome.pageAction.setIcon({
        path: 'logo16.png',
        tabId: sender.tab.id
      });
      chrome.pageAction.setTitle({
        title: 'sldkjsldj',
        tabId: sender.tab.id
      });
      chrome.pageAction.setPopup({
        tabId: sender.tab.id,
        popup: 'popup.html'
      });
    }
    sendResponse({
      // goes to
      hiFrom: 'backgroundjs',
      slug
    });
  }
  // //Set page action icon
  // if (request.software) {
  //   chrome.pageAction.show(sender.tab.id);
  //   if (request.software == 'Plesk') {
  //     if (
  //       lowerVersion(request.version, plesk_11_version) ||
  //       (parseFloat(request.version) >= parseFloat('11.5') &&
  //         lowerVersion(request.version, plesk_115_version)) ||
  //       (parseFloat(request.version) >= parseFloat('12.0') &&
  //         lowerVersion(request.version, plesk_12_version))
  //     ) {
  //       chrome.pageAction.setIcon({
  //         path: 'OutdatedPlesk.png',
  //         tabId: sender.tab.id
  //       });
  //       chrome.pageAction.setTitle({
  //         title:
  //           chrome.i18n.getMessage('plesk_version_known_tooltip', [
  //             request.version
  //           ]) + chrome.i18n.getMessage('outdated'),
  //         tabId: sender.tab.id
  //       });
  //     } else {
  //       chrome.pageAction.setIcon({
  //         path: 'Plesk.ico',
  //         tabId: sender.tab.id
  //       });
  //       chrome.pageAction.setTitle({
  //         title: chrome.i18n.getMessage('plesk_version_known_tooltip', [
  //           request.version
  //         ]),
  //         tabId: sender.tab.id
  //       });
  //     }
  //   } else if (request.software == 'cPanel') {
  //     if (request.version == 'Unknown') {
  //       chrome.pageAction.setTitle({
  //         title: chrome.i18n.getMessage('cpanel_version_unknown_tooltip'),
  //         tabId: sender.tab.id
  //       });
  //       chrome.pageAction.setIcon({
  //         path: 'cpanel.ico',
  //         tabId: sender.tab.id
  //       });
  //     } else if (lowerVersion(request.version, cpanel_version)) {
  //       chrome.pageAction.setTitle({
  //         title:
  //           chrome.i18n.getMessage('cpanel_version_known_tooltip', [
  //             request.version
  //           ]) + chrome.i18n.getMessage('outdated'),
  //         tabId: sender.tab.id
  //       });
  //       chrome.pageAction.setIcon({
  //         path: 'OutdatedcPanel.png',
  //         tabId: sender.tab.id
  //       });
  //     } else {
  //       chrome.pageAction.setTitle({
  //         title: chrome.i18n.getMessage('cpanel_version_known_tooltip', [
  //           request.version
  //         ]),
  //         tabId: sender.tab.id
  //       });
  //       chrome.pageAction.setIcon({
  //         path: 'cpanel.ico',
  //         tabId: sender.tab.id
  //       });
  //     }
  //   }
  //   chrome.pageAction.setPopup({
  //     tabId: sender.tab.id,
  //     popup: 'popup.html'
  //   });

  //   //chrome.pageAction.setPopup({tabId: sender.tab.id, popup: "popup.html"});
  //   sendResponse({});
  // }

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
