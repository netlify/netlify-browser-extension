# netlify-chrome-extension

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
