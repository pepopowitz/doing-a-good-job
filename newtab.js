'use strict';

const { unsplashClientId } = window;

async function setBackgroundImage() {
  // check to see if I have the URL in local storage
  //   and it's not expired
  // if so, use that
  // if not, go get another
  //   and save the URL in local storage
  //   and use that

  const collectionId = '11649432';
  const orientation = 'landscape';
  const apiEndpoint = `https://api.unsplash.com/photos/random/?client_id=${unsplashClientId}&collections=${collectionId}&orientation=${orientation}`;

  const response = await fetch(apiEndpoint);
  const image = await response.json();
  const imageURL = image.urls.raw.split('?')[0];
  const optimizedImageURL = `${imageURL}?q=75&fm=webp&w=4000`;

  var element = document.getElementById('background');
  element.style.backgroundImage = `url('${optimizedImageURL}')`;
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

(async () => {
  setCurrentTime();
  setPraise();
  setInterval(setCurrentTime, 1000);
  await setBackgroundImage();
})();
