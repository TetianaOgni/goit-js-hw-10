import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import '../css/styles.css';
import refs from './refs.js';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  refs.countryInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';
  const value = event.target.value.trim();
  if (!value) {
    return;
  } else if (value.length === 1) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else
    fetchCountries(value)
      .then(data => {
        if (data.length === 0) {
          return 'Oops, there is no country with that name';
        }
        const markup = createMarkup(data);
      })
      .catch(onError);
}

function createMarkup(data) {
  if (data.length === 1) {
    const markup = createMarkupCountryInfo(data);
    const elem = refs.countryInfo;
    updateMarkup(markup, elem);
  } else if ((data.length > 1) & (data.length < 11)) {
    const markup = createMarkupCountriesList(data);
    const elem = refs.countriesList;
    updateMarkup(markup, elem);
  }
}
function createMarkupCountryInfo(data) {
  const { flags, name, languages, population, capital } = data[0];
  return `<div class='title'><img src=${
    flags.svg
  } class='flag' width='30' height='20''><h2 class="country">${
    name.official
  }</h2></div>
    <p class='capital'><span class='accent'>Capital:</span> ${capital}</p>
    <p class='population'><span class='accent'>Population:</span> ${population}</p>
    <p class='languages'><span class='accent'>Languages:</span> ${
      Object.values(languages)[0]
    }</p>`;
}

function createMarkupCountriesList(data) {
  return data
    .map(({ flags, name }) => {
      return `<li class='country-item'>
      <img src=${flags.svg} class='flag' width='30' height='20'>
      <p class="country-name">${name.official}</p>
      </li>`;
    })
    .join('');
}

function updateMarkup(markup, elem) {
  elem.innerHTML = markup;
}

function onError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function cleanCountries() {
  refs.countryInfo.innerHTML = '';
  refs.countriesList.innerHTML = '';
}
