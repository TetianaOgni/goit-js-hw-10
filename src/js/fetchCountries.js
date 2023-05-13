const URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
  fields: 'name,flags,capital,population,languages',
});
export function fetchCountries(name) {
  const searchParams = new URLSearchParams({
    fields: 'name,flags,capital,population,languages',
  });
  return fetch(`${URL}${name}?${searchParams}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}
