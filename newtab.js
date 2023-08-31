'use strict';

const { unsplashClientId } = window;

async function getRandomUnsplashImageURL() {
  const collectionId = '11649432';
  const orientation = 'landscape';
  const apiEndpoint = `https://api.unsplash.com/photos/random/?client_id=${unsplashClientId}&collections=${collectionId}&orientation=${orientation}`;

  const response = await fetch(apiEndpoint);
  const image = await response.json();
  const imageURL = image.urls.raw.split('?')[0];

  return `${imageURL}?q=75&fm=webp&w=4000`;
}

async function setBackgroundImage() {
  const cacheDuration = 1000 * 60 * 60; // 1 hour
  const now = new Date().getTime();
  let imageURL;

  const { unsplashImageURL, expiresAt } = await chrome.storage.local.get();

  if (unsplashImageURL && expiresAt > now) {
    imageURL = unsplashImageURL;
  } else {
    imageURL = await getRandomUnsplashImageURL();

    // note: window.setTimeout(() => chrome.storage.local.remove...) does not work
    //   because I will likely have exited the tab before the timeout lapses
    const cacheExpiration = new Date().getTime() + cacheDuration;
    chrome.storage.local.set({
      unsplashImageURL: imageURL,
      expiresAt: cacheExpiration,
    });
  }

  var element = document.getElementById('background');
  element.style.backgroundImage = `url('${imageURL}')`;
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
