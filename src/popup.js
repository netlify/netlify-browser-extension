const body = document.body;

// Support for both Chrome and Firefox browsers
let extentionAPI;
try {
  extentionAPI = browser;
} catch {
  extentionAPI = chrome;
}

// Query current tab details
extentionAPI.tabs.query({ active: true, currentWindow: true }, tabs => {
  let tab = tabs[0];

  // Ask background.js if the current tab's site is hosted on Netlify
  extentionAPI.runtime.sendMessage(
    { action: 'getPageUrl', tab: tab.id },
    activeNetlifySite => {
      // Set Popup title
      let title = document.createElement('span');
      title.style.display = 'block';
      title.style.textAlign = 'center';
      title.style.whiteSpace = 'nowrap';
      if (activeNetlifySite == '') {
        title.innerText = 'This site is not hosted on Netlify!';
      } else {
        title.innerText = '🎉 This site is hosted on Netlify!';
      }
      body.append(title);

      // Exit now for non-Netlify sites
      if (activeNetlifySite == '') return;

      // Create loader
      let loader = document.createElement('span');
      loader.style.display = 'block';
      loader.style.textAlign = 'center';
      loader.innerText = 'Getting sites details...';
      body.append(loader);

      // Attempt to get the sites details
      let url = new URL(activeNetlifySite);
      fetch(`https://api.netlify.com/api/v1/sites/${url.host}`)
        .then(async res => {
          // Hide loader
          loader.innerText = '';

          // Process Response
          if (res.status == 200) {
            let data = await res.json();

            // Site Details
            let siteDetails = document.createElement('span');
            siteDetails.style.display = 'block';
            siteDetails.style.textAlign = 'center';
            siteDetails.innerText = `Site ${data.name} is owned by ${data.account_name}`;
            body.append(siteDetails);

            // Last Published Date
            let lastPublished = document.createElement('span');
            lastPublished.style.display = 'block';
            lastPublished.style.textAlign = 'center';
            lastPublished.innerText = `Deploy published ${new Date(
              data.published_deploy.published_at
            ).toLocaleDateString()}`;
            body.append(lastPublished);

            // Netlify navigation links
            let links = document.createElement('span');
            links.style.display = 'block';
            links.style.textAlign = 'center';
            links.style.whiteSpace = 'nowrap';

            // Netlify Admin Dashboard Link
            let adminUrl = document.createElement('a');
            adminUrl.href = '#';
            adminUrl.onclick = e => {
              e.preventDefault();
              extentionAPI.tabs.create({ url: data.admin_url });
            };
            adminUrl.innerText = 'Dashboard';

            // Github Repo Source Code
            let sourceUrl = document.createElement('a');
            sourceUrl.href = '#';
            sourceUrl.onclick = e => {
              e.preventDefault();
              extentionAPI.tabs.create({ url: data.repo_url });
            };
            sourceUrl.innerText = 'Source Code';

            // Append items to DOM
            [adminUrl, sourceUrl].forEach(item => {
              let open = document.createElement('span');
              open.innerText = '[';
              links.append(open);

              links.append(item);

              let close = document.createElement('span');
              close.innerText = ']     ';
              links.append(close);
            });

            body.append(links);
          } else if (res.status == 401) {
            let siteDetails = document.createElement('span');
            siteDetails.style.display = 'block';
            siteDetails.style.textAlign = 'center';
            siteDetails.innerText = "This site's details are private!";
            body.append(siteDetails);
          } else {
            // Report Error to User
            let errorDetails = document.createElement('span');
            errorDetails.style.display = 'block';
            errorDetails.style.textAlign = 'center';
            errorDetails.style.color = 'red';
            errorDetails.innerText =
              'Error: The Netlify API returned an unhandleable status code';
            body.append(errorDetails);
          }
        })
        .catch(err => {
          // Hide loader
          loader.innerText = '';

          // Report Error to User
          let errorDetails = document.createElement('span');
          errorDetails.style.display = 'block';
          errorDetails.style.textAlign = 'center';
          errorDetails.style.color = 'red';
          errorDetails.innerText =
            'Error: Failed to communicate with the Netlify API';
          body.append(errorDetails);

          // Log Error
          console.error(err);
        });
    }
  );
});
