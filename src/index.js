import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

import Notiflix from 'notiflix';

import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api'
const breed = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

window.addEventListener('load', onLoad);

function onLoad() {
  fetchBreeds('cats')
    .then(resp => {
      const markup = makeSelectMarkup(resp);
      addMarkup(breed, markup);
      new SlimSelect({
        select: '#breedElement',
      });
    })
    .catch(error => console.log(error.message));
}

function makeSelectMarkup(items) {
  return items
    .map(({ id, name }) => {
      return `<option value="${id}">Cat type: ${name}</option>`;
    })
    .join('');
}

function addMarkup(ref, markup) {
  ref.innerHTML = markup;
}

breed.addEventListener('change', onChange);

function onChange(event) {
  const id = event.target.value;
  loaderEl.classList.add('display');

  fetchCatByBreed(id)
    .then(response => {
      const catInfo = response[0];
      const catMarkup = createCatMarkup(catInfo);
      catInfoContainer.innerHTML = catMarkup;
      loaderEl.classList.remove('display');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function createCatMarkup(catInfo) {
  return `
<div class="js-part">
<div class="img-part">
  <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" class="cat-img"/>
</div>
  <div class="info-part">
    <h2>${catInfo.breeds[0].name}</h2>
    <p class="cat-text">${catInfo.breeds[0].description}</p>
    <p>
      <span class="temperament">Temperament: </span>
      ${catInfo.breeds[0].temperament}
    </p>
  </div>
</div>
  `;
}