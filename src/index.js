import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  fontSize: '20px',
  width: '400px',
  position: 'center-center',
});

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const url = `https://restcountries.com/v2/name/`;
const urlOpt = `?fields=name,capital,population,flag,languages`;

inputEl.addEventListener('input', debounce(onInputData, DEBOUNCE_DELAY));

function fetchCountries(name) {
  fetch(`${url}${name}${urlOpt}`)
    .then(r => {
      return r.json();
    })
    .then(data => onDataReceive(data));
}

function onInputData(e) {
  let name = e.target.value.trim();
  fetchCountries(name);
}
function onDataReceive(data) {
  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (2 <= data.length && data.length <= 10) {
    Notify.success('From 2 to 10');
  } else Notify.success('111111111111');
}

// function onSubmitForm(event) {
//   event.preventDefault();
//   const {
//     elements: { delay, step, amount },
//   } = event.currentTarget;
//   for (let i = 0; i < Number(amount.value); i += 1) {
//     createPromise(i + 1, Number(delay.value) + Number(step.value) * i)
//       .then(({ position, delay }) => {
//         Notify.success(`✔ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// }
// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }
