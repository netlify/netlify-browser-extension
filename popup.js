let webExtensionAPI
try {
  webExtensionAPI = browser //ffox
} catch {
  webExtensionAPI = chrome
}
const DEBUG = true
//Send version request to background page
webExtensionAPI.runtime.sendMessage({ get_version: "true" }, function(response) {
  // console.log('popupjs sendMessage received', { response });
})

webExtensionAPI.runtime.sendMessage({ method: "getHost" }, function(response) {
  var host = response
  const loading = document.getElementById("loading")
  const loaded = document.getElementById("loaded")
  const ghbutton = document.getElementById("ghbutton")
  const ghspan = document.getElementById("ghspan")
  const dpbutton = document.getElementById("dpbutton")
  if (host === null) {
    console.log("[netlify browser extension] Nope :(", { err })
    document.getElementById("label").appendChild(document.createTextNode("but its deploy logs are not public."))
    // nothing at all
    ghspan.hidden = true
    dpspan.hidden = true
    loading.hidden = true
    loaded.hidden = false
    return
  }
  if (DEBUG) console.log({ host })
  const slug = host.split(".")[0]
  if (DEBUG) console.log({ slug })
  if (DEBUG) console.log("[netlify browser extension] checking if netlify site is open source...")
  fetch("https://api.netlify.com/api/v1/sites/" + host)
    .then((res) => res.json())
    .then((res) => {
      console.log("[netlify browser extension] Yes!", { res })
      document.getElementById("label").appendChild(document.createTextNode("by " + res.account_name))
      document
        .getElementById("version")
        .appendChild(
          document.createTextNode("Last published " + new Date(res.published_deploy.published_at).toLocaleDateString())
        ) // may also want commit_url and deploy_ssl_url and title

      // const img = document.getElementById('img');
      // img.src = res.screenshot_url;
      ghbutton.href = res.repo_url
      dpbutton.href = res.admin_url
      dpbutton.innerText = "Deploy Logs"
      ghspan.hidden = false
      dpspan.hidden = false
      dpbutton.hidden = false
      loading.hidden = true
      loaded.hidden = false
    })
    .catch((err) => {
      console.log("[netlify browser extension] Nope :(", { err })
      document.getElementById("label").appendChild(document.createTextNode("but its deploy logs are not public."))
      if (host.includes("netlify.com")) {
        // attempt to show deploys
        ghspan.hidden = true
        dpspan.hidden = false
        dpbutton.hidden = false
        loading.hidden = true
        loaded.hidden = false
        dpbutton.innerText = "If its yours, you can still see deploy logs"
        dpbutton.href = "https://app.netlify.com/sites/" + slug
      } else {
        // nothing at all
        ghspan.hidden = true
        dpspan.hidden = true
        loading.hidden = true
        loaded.hidden = false
      }
    })
})

// Honestly its probably more complicated than needs to be but i based it off of other extensions that do the same thing.

//     inject content-script into every page
//     script pings background.js that there is a new page
//     background.js activates the "browser action" (the little logo on the browser bar) if its a Netlify site by sniffing the Server field in the response header.
//     if it is a Netlify site and you click the "browser action":
//         if it is on .netlify.com host, popup.js checks if it is open source and manipulates popup.html accordingly.
