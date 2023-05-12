const URL = 'https://restcountries.com/v3.1/name/';

export function fetchCountries(name) {
  return fetch(
    `${URL}${name}?fields=name,flags,capital,population,languages&fullText=false`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Oops, there is no country with that name');
      }
    })
    .then(data => {
      return data;
    });
}
