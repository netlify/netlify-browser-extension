// https://stackoverflow.com/questions/220231/accessing-the-web-pages-http-headers-in-javascript
// but using fetch cos sync xmlhttp is blocked
// but using webview cos fetch is blocked https://developer.chrome.com/extensions/manifest/sandbox
// nvm lol you can do async xmlhttp

let webExtensionAPI
try {
  webExtensionAPI = browser //ffox
} catch {
  webExtensionAPI = chrome
}

// let DEBUG = true
let DEBUG = false

var req = new XMLHttpRequest()
req.open("GET", document.location)
req.send(null)
req.onreadystatechange = function() {
  // // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders
  // Get the raw header string
  var headers = req.getAllResponseHeaders()

  // Convert the header string into an array
  // of individual headers
  var arr = headers.trim().split(/[\r\n]+/)

  // Create a map of header names to values
  var headerMap = {}
  arr.forEach(function(line) {
    var parts = line.split(": ")
    var header = parts.shift()
    var value = parts.join(": ")
    headerMap[header] = value
  })

  // var header = req.getResponseHeader("server")
  // if (DEBUG) console.log({ header })
  webExtensionAPI.runtime.sendMessage({
    netlifyPage: headerMap
  })
}

var { host, pathname } = document.location
// if (DEBUG) console.log({ location: document.location })
webExtensionAPI.runtime.sendMessage({ method: "setHost", url: host })

var PHActions = document.getElementsByClassName("pagehead-actions")
if (host === "github.com" && typeof pathname === "string" && PHActions.length) {
  const pathsplit = pathname.split("/")
  if (pathsplit.length > 2) {
    var el = PHActions[0].children[0]
    const user = pathsplit[1]
    const repo = pathsplit[2]
    const newUrl = `https://app.netlify.com/start/deploy?repository=https://github.com/${user}/${repo}`
    var container = document.createElement("li")
    var newBtn = document.createElement("a")
    newBtn.setAttribute("class", "btn btn-sm")
    newBtn.setAttribute("href", newUrl)
    newBtn.setAttribute("target", "_blank")
    var newContent = document.createTextNode("💎 Deploy To Netlify")
    // add the text node to the newly created div
    newBtn.appendChild(newContent)
    container.appendChild(newBtn)

    el.parentNode.insertBefore(container, el)
  }
}
