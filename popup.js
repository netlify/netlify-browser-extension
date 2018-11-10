//Send version request to background page
chrome.extension.sendMessage({ get_version: 'true' }, function(response) {
  // console.log('popupjs sendMessage received', { response });
});

//Update panel with version information
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log('popupjs addListener received', {
  //   request,
  //   sender,
  //   sendResponse
  // });
  const ghbutton = document.getElementById('ghbutton');
  const dpbutton = document.getElementById('dpbutton');
  if (request.hiFrom === 'contentscript') {
    fetch('https://api.netlify.com/api/v1/sites/' + request.url.host)
      .then(res => res.json())
      .then(res => {
        document
          .getElementById('label')
          .appendChild(document.createTextNode('by ' + res.account_name));
        document
          .getElementById('version')
          .appendChild(
            document.createTextNode(
              'Last published ' +
                new Date(res.published_deploy.published_at).toLocaleDateString()
            )
          ); // may also want commit_url and deploy_ssl_url and title
        const slug = request.url.host.split('.')[0];
        // const img = document.getElementById('img');
        // img.src = res.screenshot_url;
        ghbutton.href = res.repo_url;
        dpbutton.href = res.admin_url;
        ghbutton.hidden = false;
        dpbutton.hidden = false;
      })
      .catch(err => {
        console.log({ err });
        document
          .getElementById('label')
          .appendChild(document.createTextNode('but it is not open source'));
        ghbutton.hidden = true;
        dpbutton.hidden = true;
      });
  }
});
