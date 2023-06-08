const handleConfigSubmit = (event) => {
  event.preventDefault();
  // TODO: finish connecting this form submit handler!!!
  console.log('yoooooo', event);

  // const inputTags = Array.from(document.querySelectorAll("input[type='text']"));

  // const config = inputTags.reduce((accumulator, inputTag) => {
  //   accumulator[inputTag.name] = inputTag.value;
  //   return accumulator;
  // }, {});

  chrome.storage.local.set({ praiseMarkdown: 'steve and jon' });
};

const initializeForm = () => {
  const [form] = document.getElementsByTagName('form');
  // form.addEventListener("reset", handleConfigReset);
  form.addEventListener('submit', handleConfigSubmit);
  // setFormValues();

  // setListItems();
};

window.addEventListener('load', initializeForm);
