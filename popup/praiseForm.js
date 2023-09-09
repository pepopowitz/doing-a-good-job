const handleConfigSubmit = (event) => {
  event.preventDefault();
  const praiseElement = document.querySelector('#praiseMarkdown');
  const praiseString = praiseElement.value;
  const praiseArray = praiseString.split('\n\n---\n\n');

  const unsplashAPIKey = document.querySelector('#unsplashAPIKey').value;

  chrome.storage.local.set({ unsplashAPIKey, praiseMarkdown: praiseArray });
};

function readValues() {
  chrome.storage.local
    .get(['unsplashAPIKey', 'praiseMarkdown'])
    .then(({ unsplashAPIKey, praiseMarkdown }) => {
      const unsplashKeyElement = document.querySelector('#unsplashAPIKey');
      unsplashKeyElement.value = unsplashAPIKey;

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
