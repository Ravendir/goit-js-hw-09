const refs = {
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stop.setAttribute('disabled', true);

let colorId = null;

const onStartChange = () => {
  refs.stop.removeAttribute('disabled');
  refs.start.setAttribute('disabled', true);
  colorId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onStopChange = () => {
  refs.stop.setAttribute('disabled', true);
  refs.start.removeAttribute('disabled');
  clearInterval(colorId);
};

refs.start.addEventListener('click', onStartChange);
refs.stop.addEventListener('click', onStopChange);
