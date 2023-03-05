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
    .then(data => dataReceive(data))
    .catch(error => {
      Notify.failure('❌ Oops, there is no country with that name');
    });
}

function onInputData(e) {
  const name = e.target.value.trim();
  fetchCountries(name);
}
function dataReceive(obj) {
  if (obj.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (2 <= obj.length && obj.length <= 10) {
    Notify.success('From 2 to 10');
  } else Notify.success('_!_(-_-)_!_');
}
