'use strict';

function setCurrentTime() {
  const timePara = document.querySelector('main p');
  timePara.innerText = new Date().toLocaleTimeString();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setPraise() {
  chrome.storage.local.get('praiseMarkdown').then((result) => {
    const praises = result.praiseMarkdown;
    const randomIndex = getRandomInt(praises.length);
    const praise = praises[randomIndex];

    const praiseHtml = marked.parse(praise);

    const praisePara = document.querySelector('#praise');
    praisePara.innerHTML = praiseHtml;
  });
}

setCurrentTime();
setPraise();
setInterval(setCurrentTime, 1000);
