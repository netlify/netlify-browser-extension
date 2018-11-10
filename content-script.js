chrome.extension.sendMessage({
  newPage: 'true'
});

//Returns control panel version in use
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('contentscriptjs', { request, sender, sendResponse });
  chrome.extension.sendMessage(
    {
      hiFrom: 'contentscript',
      url: document.location
    },
    function(response) {}
  );
});
