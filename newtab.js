'use strict';

function setCurrentTime() {
  const timePara = document.querySelector('main p');
  timePara.innerText = new Date().toLocaleTimeString();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setPraise() {
  // TODO: get the praise from local storage instead of a json file
  const url = chrome.runtime.getURL('data/praise.json');

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const { praises } = json;
      const praisePara = document.querySelector('#praise');
      const randomIndex = getRandomInt(praises.length);
      praisePara.innerHTML = praises[randomIndex];
    });
}

setCurrentTime();
setPraise();
setInterval(setCurrentTime, 1000);
