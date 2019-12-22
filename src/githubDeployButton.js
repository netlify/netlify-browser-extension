const githubHeader = document.getElementsByClassName('pagehead-actions')[0];
let urlParts = window.location.pathname.split('/');
if (urlParts.length > 2) {
  fetch(`https://api.github.com/repos${window.location.pathname}/contents`)
    .then(async res => {
      let data = await res.json();
      if (data.message == 'Not Found') {
        console.debug(
          '[Netlify Browser Extention]',
          'Repo/Files were not found!'
        );
        return;
      }
      let netlifyConfigFiles = (data || []).filter(
        file =>
          file.name == 'netlify.toml' ||
          file.name == 'netlify.yml' ||
          file.name == 'netlify.json'
      );
      if (netlifyConfigFiles.length > 0) {
        // Core Button
        var netlifyBtn = document.createElement('a');
        netlifyBtn.setAttribute('class', 'btn btn-sm');
        netlifyBtn.setAttribute(
          'href',
          `https://app.netlify.com/start/deploy?repository=${window.location.href}`
        );
        netlifyBtn.setAttribute('target', '_blank');
        netlifyBtn.appendChild(document.createTextNode('💎 Deploy To Netlify'));

        // Button Container
        var container = document.createElement('li');
        container.appendChild(netlifyBtn);

        // Add Button Container to header
        githubHeader.insertBefore(container, githubHeader.firstChild);
      }
    })
    .catch(err => {
      console.log('[Netlify Browser Extention]', 'Error:', err);
    });
}
