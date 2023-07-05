console.log('hiiii');

const handleConfigSubmit = (event) => {
  event.preventDefault();
  // TODO: finish connecting this form submit handler!!!
  const praiseElement = document.querySelector('#praiseMarkdown');
  const praiseValue = praiseElement.value;

  chrome.storage.local.set({ praiseMarkdown: praiseValue });
};

function readValue() {
  chrome.storage.local.get('praiseMarkdown').then((result) => {
    console.log('Value currently is ' + JSON.stringify(result, null, 2));
	const praiseElement = document.querySelector('#praiseMarkdown');
	praiseElement.value = result.praiseMarkdown;
  });
}

const initializeForm = () => {
  const [form] = document.getElementsByTagName('form');
  // form.addEventListener("reset", handleConfigReset);
  form.addEventListener('submit', handleConfigSubmit);
  // setFormValues();

  // setListItems();
  readValue();
};

window.addEventListener('load', initializeForm);
