console.log('hiiii');

const handleConfigSubmit = (event) => {
  event.preventDefault();
  // TODO: finish connecting this form submit handler!!!
  const praiseElement = document.querySelector('#praiseMarkdown');
  const praiseString = praiseElement.value;
  const praiseArray = praiseString.split('\n\n---\n\n');

  chrome.storage.local.set({ praiseMarkdown: praiseArray });
};

function readValue() {
  chrome.storage.local.get('praiseMarkdown').then((result) => {
    console.log('Value currently is ' + JSON.stringify(result, null, 2));
	const praiseElement = document.querySelector('#praiseMarkdown');
	praiseElement.value = result.praiseMarkdown.join('\n\n---\n\n');
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
