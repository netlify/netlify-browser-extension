let netlifySite = {};

// Support for both Chrome and Firefox browsers
let extentionAPI;
try {
  extentionAPI = browser;
} catch {
  extentionAPI = chrome;
}

// Detect the Netlify headers and update netlifySite
extentionAPI.webRequest.onCompleted.addListener(
  e => {
    // Check if site contains the x-nf-request-id header
    if (e.responseHeaders.find(h => h.name == 'x-nf-request-id')) {
      // Add the site as the active Netlify site for the current tab
      netlifySite[e.tabId] = e.url;
    }
  },
  { urls: ['<all_urls>'], types: ['main_frame'] },
  ['responseHeaders']
);

// Change the browser action look based on the netlifySite on tab load
extentionAPI.tabs.onUpdated.addListener((tabId, state, tabDetails) => { 
  // Allow the menu button to be activated
  extentionAPI.pageAction.show(tabId);

  // If tab details are non existant it is not a Netlify site, return
  if(!(tabId in netlifySite)) {
    return;
  }

  // Once tab has navigated to another site unset it as Netlify site, reset the menu item and return
  if (netlifySite[tabId] != tabDetails.url) {
    if(tabDetails.status != "loading") {
      delete netlifySite[tabId];

      extentionAPI.pageAction.setIcon({
        tabId: tabId,
        path: 'assets/logo16-gray.png'
      });
      extentionAPI.pageAction.setTitle({
        tabId: tabId,
        title: "Not hosted on Netlify :("
      });
    }
    
    return;
  }

  // Update the Netlify browser action look
  extentionAPI.pageAction.setIcon({
    tabId: tabId,
    path: 'assets/logo16.png'
  });
  extentionAPI.pageAction.setTitle({
    tabId: tabId,
    title: "It's a Netlify Site!"
  });
});

// Allow the popup to access information about whether a tab is a Netlify site
extentionAPI.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action == 'getPageUrl' && request.tab) {
    sendResponse(netlifySite[request.tab] || '');
  }
});

// Cleanup sites state on tab close
extentionAPI.tabs.onRemoved.addListener(tabId => {
  delete netlifySite[tabId];
});
