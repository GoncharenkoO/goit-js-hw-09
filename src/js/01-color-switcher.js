const bodyChangeEl = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStop.setAttribute("disabled", "");

buttonStart.addEventListener('click', (element) => {
element.target.setAttribute("disabled", true);
   buttonStop.removeAttribute("disabled");

     intervalId = setInterval(() => {
        bodyChangeEl.style.backgroundColor = getRandomHexColor();
     }, 1000);
});

buttonStop.addEventListener('click', (element) => {
   element.target.setAttribute("disabled", true);
   buttonStart.removeAttribute('disabled');

    clearInterval(intervalId);
 });




