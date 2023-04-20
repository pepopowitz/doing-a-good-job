'use strict';

function setCurrentTime() {
  const timePara = document.querySelector('main p');
  timePara.innerText = new Date().toLocaleTimeString();
};

setCurrentTime();
setInterval(setCurrentTime, 1000);
