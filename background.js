var urlHost, requestHeader
var getLocation = function(href) {
  var l = document.createElement("a")
  l.href = href
  return l
}

let webExtensionAPI
try {
  webExtensionAPI = browser //ffox
} catch {
  webExtensionAPI = chrome
}

function onMessage(request, sender, sendResponse) {
  console.log("onMessage", { request })
  if (request.netlifyPage && request.netlifyPage["x-nf-request-id"] && sender.tab) {
    var url = getLocation(sender.url)
    var slug = url.hostname
    webExtensionAPI.pageAction.show(sender.tab.id)
    webExtensionAPI.pageAction.setIcon({
      path: "logo16.png",
      tabId: sender.tab.id
    })
    webExtensionAPI.pageAction.setTitle({
      title: "It's a Netlify Site!",
      tabId: sender.tab.id
    })
    webExtensionAPI.pageAction.setPopup({
      tabId: sender.tab.id,
      popup: "popup.html"
    })
    requestHeader = request.netlifyPage
    sendResponse({
      // goes to popup.js
      hiFrom: "backgroundjs",
      slug
    })
  } else {
    // chrome.pageAction.hide(sender.tab.id);
  }
  if (request.method === "setHost") {
    console.log("setHost", { request })
    urlHost = request.url
  } else if (request.method === "getHost") {
    console.log("getHost", { urlHost })
    sendResponse({ urlHost, requestHeader })
  }
  if (request.get_version) {
    webExtensionAPI.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      function(tabs) {
        webExtensionAPI.tabs.sendMessage(
          tabs[0].id,
          {
            check: "version"
          },
          function(response) {
            return response
          }
        )
      }
    )
  }
}
webExtensionAPI.runtime.onMessage.addListener(onMessage)

//Checks if version in use is lower than the current version
function lowerVersion(in_use_version, current_version) {
  return false
}
