'use strict';

function setBackgroundImage() {
  const unsplashClientId = "gTtYkW-Asvj99utxmQWxQYDXdozNTjwrJg0K-klrnYQ"
  const collectionId = "11649432"
  const orientation = "landscape"
  const apiEndpoint = `https://api.unsplash.com/photos/random/?client_id=${unsplashClientId}&collections=${collectionId}&orientation=${orientation}`

  fetch(apiEndpoint).then(response => response.json()).then(data => {
    const { raw } = data.urls;
    const rawBase = raw.split("?")[0];
    const fixedBase = `${rawBase}?q=75&fm=webp&w=4000`

    var element = document.getElementById("background");
    element.style.backgroundImage = `url('${fixedBase}')`;
  })
}

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
setBackgroundImage();
