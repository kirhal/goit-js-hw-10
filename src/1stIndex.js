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
const listEl = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');
const url = `https://restcountries.com/v2/name/`;
const urlOpt = `?fields=name,capital,population,flags,languages`;

inputEl.addEventListener('input', debounce(onInputData, DEBOUNCE_DELAY));

function onInputData(e) {
  const name = e.target.value.trim();
  if (name === '') {
    clearAllMarkUp();
    return;
  }
  fetchCountries(name);
}
function fetchCountries(name) {
  fetch(`${url}${name}${urlOpt}`)
    .then(r => {
      return r.json();
    })
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
function listMarkUp(countries) {
  countryEl.innerHTML = '';
  const markUpData = countries
    .map(
      ({ flags: { svg }, name }) =>
        `<li><img src=${svg} alt="flag of ${name}" width="70">
          <span style="font-weight: medium;font-size: 25px;"> ${name}</span></li>`
    )
    .join('');

  listEl.innerHTML = markUpData;
}
function countryMarkUp({
  name,
  capital,
  population,
  flags: { svg },
  languages,
}) {
  listEl.innerHTML = '';
  const countryLanguages = languages.map(el => el.name).join(', ');
  const markUpData = `<h1 style="font-size:45px;">
  <img src=${svg} alt="flag of ${name}" width="70"> ${name}</h1>
  <li><span style="font-weight: bold;font-size: 25px;">Capital: </span><span style="font-size: 25px;">${capital}</span></li>
  <li><span style="font-weight: bold;font-size: 25px;">Population: </span><span style="font-size: 25px;">${population}</span></li>
  <li><span style="font-weight: bold;font-size: 25px;">Languages: </span><span style="font-size: 25px;">${countryLanguages}</span></li>`;

  countryEl.innerHTML = markUpData;
}
function clearAllMarkUp() {
  countryEl.innerHTML = '';
  listEl.innerHTML = '';
}
