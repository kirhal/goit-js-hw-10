import { listMarkUp, countryMarkUp, clearAllMarkUp } from './markUp';
import { fetchCountries } from './fetchCountries';
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

inputEl.addEventListener('input', debounce(onInputData, DEBOUNCE_DELAY));

function onInputData(e) {
  const name = e.target.value.trim();
  if (name === '') {
    clearAllMarkUp();
    return;
  }
  fetchCountries(name)
    .then(data => {
      dataReceive(data);
    })
    .catch(error => {
      Notify.failure('❌ Oops, there is no country with that name');
      clearAllMarkUp();
    });
}
function dataReceive(obj) {
  if (obj.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (2 <= obj.length && obj.length <= 10) {
    listMarkUp(obj);
  } else countryMarkUp(obj[0]);
}
