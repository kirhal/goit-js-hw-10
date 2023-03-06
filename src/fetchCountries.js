const url = `https://restcountries.com/v2/name/`;
const urlOpt = `?fields=name,capital,population,flags,languages`;

export const fetchCountries = name => {
  return fetch(`${url}${name}${urlOpt}`).then(r => {
    return r.json();
  });
};
