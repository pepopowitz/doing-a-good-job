console.log('hiiii');

const handleConfigSubmit = (event) => {
  event.preventDefault();
  // TODO: finish connecting this form submit handler!!!
  console.log('yoooooo', event);

  // const inputTags = Array.from(document.querySelectorAll("input[type='text']"));

  // const config = inputTags.reduce((accumulator, inputTag) => {
  //   accumulator[inputTag.name] = inputTag.value;
  //   return accumulator;
  // }, {});
  console.log(chrome.storage.local);
  chrome.storage.local.set({ steve: 'cool' });
  console.log('it should be set?');
};

const initializeForm = () => {
  console.log('yooooooo');
  const [form] = document.getElementsByTagName('form');
  // form.addEventListener("reset", handleConfigReset);
  form.addEventListener('submit', handleConfigSubmit);
  // setFormValues();

  // setListItems();

  chrome.storage.local.get(['steve']).then((result) => {
    console.log('Value currently is ' + JSON.stringify(result, null, 2));
  });
};

window.addEventListener('load', initializeForm);
