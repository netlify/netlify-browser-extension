# Netlify Browser Extension

A browser extension to report if a site is hosted on Netlify and add a deploy button to Github

## Install

- [Chrome](https://chrome.google.com/webstore/detail/netlify-chrome-extension/dkhfpnphbcckigklfkaemnjdmghhcaoh)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/netlify-browser-extension) [thanks to @nero2009!](https://github.com/netlify/netlify-browser-extension/pull/2#issuecomment-440616828)
- for Edge (not available yet)

## Features

This browser extension does 2 things, it:

- Tells you if a site is hosted on Netlify via the menubar
- Adds a Deploy to Netlify button to your Github repositories with a `netlify.toml` file

## How it works

This extension works by monitoring web request to main_frame's (browser tabs) and checks for the `x-nf-request-id` header to be present. This header is used over the `server` header so Netlify sites fronted by Cloudflare and other similar services are still detected correctly. When the header is found the toolbar item turns blue and when clicked attempts to show details about the site, if they are publically accessible.

When browsing the Github domain a script is injected into the page which is responsible for checking for a `netlify.toml` file inside the repository and if one exists creating the deploy button in the toolbar.
