# netlify-browser-extension

Get it:

- [for Chrome](https://chrome.google.com/webstore/detail/netlify-chrome-extension/dkhfpnphbcckigklfkaemnjdmghhcaoh)
- for Firefox (not available yet)
- for Edge (not available yet)

---


## Explanation

This is a tiny little browser extension that does a couple things:

- tells you if a site is hosted on Netlify
- if it is:
  - if it is a `.netlify.com` host, check if it is open source:
    - if it is:
      - show you a link to deploy log AND github page
    - else:
      - show you a link to deploy log, only useful if you own it
  - else:
    - nothing else we can do
- else:
  - not active

PRs/feature suggestions welcome

---

## How it works

Honestly its probably more complicated than needs to be but i based it off of other extensions that do the same thing.

- inject `content-script` into every page
- script pings `background.js` that there is a new page
- `background.js` activates the "browser action" (the little logo on the browser bar) if its a Netlify site by sniffing the `Server` field in the response header.
- if it is a Netlify site and you click the "browser action":
  - if it is on `.netlify.com` host, `popup.js` checks if it is open source and manipulates `popup.html` accordingly.
