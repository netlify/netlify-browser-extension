//Send version request to background page
chrome.extension.sendMessage({ get_version: 'true' }, function(response) {
  // console.log('popupjs sendMessage received', { response });
});

//Update panel with version information
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  const ghbutton = document.getElementById('ghbutton');
  const ghspan = document.getElementById('ghspan');
  const dpbutton = document.getElementById('dpbutton');
  const slug = request.url.host.split('.')[0];
  if (request.hiFrom === 'contentscript') {
    console.log(
      '[netlify chrome extension] checking if netlify site is open source...'
    );
    fetch('https://api.netlify.com/api/v1/sites/' + request.url.host)
      .then(res => res.json())
      .then(res => {
        console.log('[netlify chrome extension] Yes!', { res });
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

        // const img = document.getElementById('img');
        // img.src = res.screenshot_url;
        ghbutton.href = res.repo_url;
        dpbutton.href = res.admin_url;
        dpbutton.innerText = 'Deploy Logs';
        ghspan.hidden = false;
        dpspan.hidden = false;
        dpbutton.hidden = false;
      })
      .catch(err => {
        console.log('[netlify chrome extension] Nope :(', { err });
        document
          .getElementById('label')
          .appendChild(document.createTextNode('but it is not open source'));
        if (request.url.host.includes('netlify.com')) {
          // attempt to show deploys
          ghspan.hidden = true;
          dpspan.hidden = false;
          dpbutton.hidden = false;
          dpbutton.innerText = 'If its yours, you can still see deploy log';
          dpbutton.href = 'https://app.netlify.com/sites/' + slug;
        } else {
          // nothing at all
          ghspan.hidden = true;
          dpspan.hidden = true;
        }
      });
  }
});
