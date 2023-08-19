import { Notify } from 'notiflix/build/notiflix-notify-aio';

// забираю елементи форми
const formEl = document.querySelector('.form');

// слухач подій на відправку форми
formEl.addEventListener('submit', onSubmitBtn);

//функція забирає значення з інпутів введення данних
function onSubmitBtn(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  let delayTimeInput = Number(delay.value);
  let stepTimeInput = Number(step.value);

  //викликаю функцію створення промісів amount-разів
  for (let i = 1; i <= Number(amount.value); i += 1) {
    if (i !== 1) {
      delayTimeInput += stepTimeInput;
    }

    createPromise(i, delayTimeInput)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  // evt.target.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
