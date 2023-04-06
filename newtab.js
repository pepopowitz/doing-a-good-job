'use strict';

const sites_div = document.getElementById('display_top');

const createTop = () => {
  const div = document.createElement('div');
  div.className = 'colorFun';
  div.innerText = '2raddads';
  sites_div.appendChild(div);
};

createTop();

// 2raddads - this is maybe how we'll do local storage
// function setToDo() {
//   chrome.storage.sync.get(['todo']).then((value) => {
//     if (!value.todo) {
//       todo.innerText = '';
//     } else {
//       todo.innerText = value.todo;
//     }
//   });
// }

// setToDo();
