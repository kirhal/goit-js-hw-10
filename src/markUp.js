const listEl = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');

export function listMarkUp(countries) {
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
export function countryMarkUp({
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
export function clearAllMarkUp() {
  countryEl.innerHTML = '';
  listEl.innerHTML = '';
}
