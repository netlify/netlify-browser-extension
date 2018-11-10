/*
Copyright (c) 2013-2014 by White Fir Design

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, only version 2 of the License is applicable.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//Send version request to background page
chrome.extension.sendMessage(
  {
    get_version: 'true'
  },
  function(response) {
    // console.log('popupjs sendMessage received', { response });
  }
);

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
        ghbutton.onclick = () =>
          chrome.windows.create({ url: res.repo_url, type: 'popup' }, function(
            window
          ) {});

        dpbutton.onclick = () =>
          chrome.windows.create({ url: res.admin_url, type: 'popup' }, function(
            window
          ) {});
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
  // if (request.popup) {
  //   document
  //     .getElementById('label')
  //     .appendChild(
  //       document.createTextNode(
  //         request.popup + chrome.i18n.getMessage('version')
  //       )
  //     );
  //   document
  //     .getElementById('version')
  //     .appendChild(document.createTextNode(request.version));
  //   if (
  //     request.popup == 'Plesk' &&
  //     (lowerVersion(request.version, plesk_11_version) ||
  //       (parseFloat(request.version) >= parseFloat('11.5') &&
  //         lowerVersion(request.version, plesk_115_version)) ||
  //       (parseFloat(request.version) >= parseFloat('12.0') &&
  //         lowerVersion(request.version, plesk_12_version)))
  //   )
  //     document
  //       .getElementById('outdated')
  //       .appendChild(
  //         document.createTextNode(chrome.i18n.getMessage('outdated'))
  //       );
  //   if (
  //     request.popup == 'cPanel' &&
  //     request.version != 'Hidden' &&
  //     lowerVersion(request.version, cpanel_version)
  //   )
  //     document
  //       .getElementById('outdated')
  //       .appendChild(
  //         document.createTextNode(chrome.i18n.getMessage('outdated'))
  //       );
  // }
});

//Checks if version in use is lower than the current version
function lowerVersion(in_use_version, current_version) {
  return false;
}
