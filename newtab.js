'use strict';

async function getRandomUnsplashImageURL() {
  const { unsplashAPIKey } = await chrome.storage.local.get('unsplashAPIKey');
  const collectionId = '11649432';
  const orientation = 'landscape';
  const apiEndpoint = `https://api.unsplash.com/photos/random/?client_id=${unsplashAPIKey}&collections=${collectionId}&orientation=${orientation}`;

  const response = await fetch(apiEndpoint);
  const image = await response.json();
  const imageURL = image.urls.raw.split('?')[0];

  return `${imageURL}?q=75&fm=webp&w=4000`;
}

async function setBackgroundImage() {
  // check to see if I have the URL in local storage
  //   and it's not expired
  // if so, use that
  // if not, go get another
  //   and save the URL in local storage
  //   and use that

  let imageURL;
  const cachedImageURL = await chrome.storage.local.get('unsplashImageURL');
  if (cachedImageURL.unsplashImageURL) {
    imageURL = cachedImageURL.unsplashImageURL;
  } else {
    imageURL = await getRandomUnsplashImageURL();
    chrome.storage.local.set({ unsplashImageURL: imageURL });
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
