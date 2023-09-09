const handleConfigSubmit = (event) => {
  event.preventDefault();
  const praiseElement = document.querySelector('#praiseMarkdown');
  const praiseString = praiseElement.value;
  const praiseArray = praiseString.split('\n\n---\n\n');

  const unsplashKey = document.querySelector('#unsplashKey').value;

  chrome.storage.local.set({ unsplashKey, praiseMarkdown: praiseArray });
};

function readValues() {
  chrome.storage.local
    .get(['unsplashKey', 'praiseMarkdown'])
    .then(({ unsplashKey, praiseMarkdown }) => {
      const unsplashKeyElement = document.querySelector('#unsplashKey');
      unsplashKeyElement.value = unsplashKey;

      const praiseElement = document.querySelector('#praiseMarkdown');
      praiseElement.value = praiseMarkdown.join('\n\n---\n\n');
    });
}

const initializeForm = () => {
  const [form] = document.getElementsByTagName('form');
  form.addEventListener('submit', handleConfigSubmit);

  readValues();
};

window.addEventListener('load', initializeForm);
