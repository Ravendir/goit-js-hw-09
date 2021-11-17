import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function onSubmit(e) {
  e.preventDefault();

  let delay = Number(formRef.elements.delay.value);
  let step = Number(formRef.elements.step.value);
  let amount = Number(formRef.elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`Promise ${position} created with ${delay} ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`Promise ${position} not created with ${delay} ms`);
        }, delay);
      });

    delay += step;
  }
}
