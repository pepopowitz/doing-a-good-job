'use strict';

function setCurrentTime() {
  const timePara = document.querySelector('main p');
  timePara.innerText = new Date().toLocaleTimeString();
}

const praises = [
  `<h2>Jon says I'm cool</h2>
    <p>
      This one time Steve saved my life and all I had to do in return was
      find his jacket
    </p>
  `,
  `<h2 id="pavlos-travels-across-london">Pavlos travels across London</h2>
   <p>
     I had a layover in London and got stranded but Pavlos commuted over an hour one way to have a beer with my while I ranted about British Airways
   </p>`,
  `<h2 id="jon-saves-my-coat">Jon saves my coat</h2>
   <p>Jon says I&#39;m a cool guy and he likes my jacket very much</p>
   `,
];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function setPraise() {
  const praisePara = document.querySelector('#praise');

  const randomIndex = getRandomInt(praises.length);
  praisePara.innerHTML = praises[randomIndex];
}

setCurrentTime();
setPraise();
setInterval(setCurrentTime, 1000);
