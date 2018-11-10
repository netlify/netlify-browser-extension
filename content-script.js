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

//Check for indicators of control panel use

chrome.extension.sendMessage({
  newPage: 'true'
});
// if (
//   /Parallels Plesk Panel [0-9.]+<\/title>/i.test(
//     document.getElementsByTagName('head')[0].innerHTML
//   )
// ) {
//   var version = document
//     .getElementsByTagName('head')[0]
//     .innerHTML.match(/Parallels Plesk Panel ([0-9.]+)<\/title>/i)[1];
//   chrome.extension.sendMessage(
//     {
//       software: 'Plesk',
//       version: version
//     },
//     function(response) {}
//   );
// } else if (
//   /plesk_version=psa\-[0-9.]+\-/i.test(
//     document.getElementsByTagName('head')[0].innerHTML
//   )
// ) {
//   var version = document
//     .getElementsByTagName('head')[0]
//     .innerHTML.match(/plesk_version=psa\-([0-9.]+)\-/i)[1];
//   chrome.extension.sendMessage(
//     {
//       software: 'Plesk',
//       version: version
//     },
//     function(response) {}
//   );
// } else if (
//   /<td class="stats_left">(إصدار cPanel|cPanel Build|cPanel Version|Versión de cPanel|Construction de cPanel|cPanel संस्करण|cPanel-versie|Versão de cPanel|Versão cPanel|Версия cPanel|cPanel 构建)<\/td>[\r\n ]+<td class="stats_right" title="[a-z0-9. \(\)]+"/i.test(
//     document.getElementsByTagName('body')[0].innerHTML
//   )
// ) {
//   var version = document
//     .getElementsByTagName('body')[0]
//     .innerHTML.match(
//       /<td class="stats_left">(إصدار cPanel|cPanel Build|cPanel Version|Versión de cPanel|Construction de cPanel|cPanel संस्करण|cPanel-versie|Versão de cPanel|Versão cPanel|Версия cPanel|cPanel 构建)<\/td>[\r\n ]+<td class="stats_right" title="([a-z0-9. \(\)]+)/i
//     )[2];
//   if (/build/i.test(version))
//     version =
//       version.match(/([0-9.]+) \(build [0-9]+\)/i)[1] +
//       '.' +
//       version.match(/[0-9.]+ \(build ([0-9]+)\)/i)[1];
//   chrome.extension.sendMessage(
//     {
//       software: 'cPanel',
//       version: version
//     },
//     function(response) {}
//   );
// } else if (
//   /<li class="footer_li"><a class="footer_li_a bottomlink" href="[.\/]*index.html">(الصفحة الرئيسية|Startseite|Home|Inicio|Accueil|होम|Início|Домашняя страница|主页)<\/a><\/li>/i.test(
//     document.getElementsByTagName('body')[0].innerHTML
//   )
// ) {
//   chrome.extension.sendMessage(
//     {
//       software: 'cPanel',
//       version: 'Unknown'
//     },
//     function(response) {}
//   );
// }

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
  // if (request.check == 'version') {
  //   if (
  //     /Parallels Plesk Panel [0-9.]+<\/title>/i.test(
  //       document.getElementsByTagName('head')[0].innerHTML
  //     )
  //   ) {
  //     var version = document
  //       .getElementsByTagName('head')[0]
  //       .innerHTML.match(/Parallels Plesk Panel ([0-9.]+)<\/title>/i)[1];
  //     chrome.extension.sendMessage(
  //       {
  //         popup: 'Plesk',
  //         version: version
  //       },
  //       function(response) {}
  //     );
  //   } else if (
  //     /plesk_version=psa\-[0-9.]+\-/i.test(
  //       document.getElementsByTagName('head')[0].innerHTML
  //     )
  //   ) {
  //     var version = document
  //       .getElementsByTagName('head')[0]
  //       .innerHTML.match(/plesk_version=psa\-([0-9.]+)\-/i)[1];
  //     chrome.extension.sendMessage(
  //       {
  //         popup: 'Plesk',
  //         version: version
  //       },
  //       function(response) {}
  //     );
  //   } else if (
  //     /<td class="stats_left">(إصدار cPanel|cPanel Build|cPanel Version|Versión de cPanel|Construction de cPanel|cPanel संस्करण|cPanel-versie|Versão de cPanel|Versão cPanel|Версия cPanel|cPanel 构建)<\/td>[\r\n ]+<td class="stats_right" title="[a-z0-9. \(\)]+"/i.test(
  //       document.getElementsByTagName('body')[0].innerHTML
  //     )
  //   ) {
  //     var version = document
  //       .getElementsByTagName('body')[0]
  //       .innerHTML.match(
  //         /<td class="stats_left">(إصدار cPanel|cPanel Build|cPanel Version|Versión de cPanel|Construction de cPanel|cPanel संस्करण|cPanel-versie|Versão de cPanel|Versão cPanel|Версия cPanel|cPanel 构建)<\/td>[\r\n ]+<td class="stats_right" title="([a-z0-9. \(\)]+)/i
  //       )[2];
  //     if (/build/i.test(version))
  //       version =
  //         version.match(/([0-9.]+) \(build [0-9]+\)/i)[1] +
  //         '.' +
  //         version.match(/[0-9.]+ \(build ([0-9]+)\)/i)[1];
  //     chrome.extension.sendMessage(
  //       {
  //         popup: 'cPanel',
  //         version: version
  //       },
  //       function(response) {}
  //     );
  //   } else if (
  //     /<li class="footer_li"><a class="footer_li_a bottomlink" href="[.\/]*index.html">(الصفحة الرئيسية|Startseite|Home|Inicio|Accueil|होम|Início|Домашняя страница|主页)<\/a><\/li>/i.test(
  //       document.getElementsByTagName('body')[0].innerHTML
  //     )
  //   ) {
  //     cpanelHome = document
  //       .getElementsByTagName('body')[0]
  //       .innerHTML.match(
  //         /<li class="footer_li"><a class="footer_li_a bottomlink" href="([.\/]*)index.html">(الصفحة الرئيسية|Startseite|Home|Inicio|Accueil|होम|Início|Домашняя страница|主页)<\/a><\/li>/i
  //       )[1];
  //     xmlhttp = new XMLHttpRequest();
  //     xmlhttp.open('GET', cpanelHome + 'extended_stats_enable.html', true);
  //     xmlhttp.setRequestHeader('Cache-Control', 'max-age=0');
  //     xmlhttp.onreadystatechange = function(oEvent) {
  //       if (xmlhttp.readyState === 4) {
  //         if (xmlhttp.status === 200) {
  //           xmlhttp = new XMLHttpRequest();
  //           xmlhttp.open('GET', cpanelHome + 'index.html', true);
  //           xmlhttp.setRequestHeader('Cache-Control', 'max-age=0');
  //           xmlhttp.onreadystatechange = function(oEvent) {
  //             if (xmlhttp.readyState === 4) {
  //               if (xmlhttp.status === 200) {
  //                 if (
  //                   /<td class="stats_left">(إصدار cPanel|cPanel Build|cPanel Version|Versión de cPanel|Construction de cPanel|cPanel संस्करण|cPanel-versie|Versão de cPanel|Versão cPanel|Версия cPanel|cPanel 构建)<\/td>[\r\n ]+<td class="stats_right" title="[a-z0-9. \(\)]+"/i.test(
  //                     xmlhttp.responseText
  //                   )
  //                 ) {
  //                   var version = xmlhttp.responseText.match(
  //                     /<td class="stats_left">(إصدار cPanel|cPanel Build|cPanel Version|Versión de cPanel|Construction de cPanel|cPanel संस्करण|cPanel-versie|Versão de cPanel|Versão cPanel|Версия cPanel|cPanel 构建)<\/td>[\r\n ]+<td class="stats_right" title="([a-z0-9. \(\)]+)/i
  //                   )[2];
  //                   if (/build/i.test(version))
  //                     version =
  //                       version.match(/([0-9.]+) \(build [0-9]+\)/i)[1] +
  //                       '.' +
  //                       version.match(/[0-9.]+ \(build ([0-9]+)\)/i)[1];
  //                   chrome.extension.sendMessage(
  //                     {
  //                       popup: 'cPanel',
  //                       version: version
  //                     },
  //                     function(response) {}
  //                   );
  //                 } else
  //                   chrome.extension.sendMessage(
  //                     {
  //                       popup: 'cPanel',
  //                       version: 'Hidden'
  //                     },
  //                     function(response) {}
  //                   );
  //               } else
  //                 chrome.extension.sendMessage(
  //                   {
  //                     popup: 'cPanel',
  //                     version: 'Hidden'
  //                   },
  //                   function(response) {}
  //                 );
  //             }
  //           };
  //           xmlhttp.send();
  //         }
  //       }
  //     };
  //     xmlhttp.send();
  //   }
  // }
});
