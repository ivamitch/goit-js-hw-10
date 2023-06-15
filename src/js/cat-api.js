const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_USGMTE468xCPrCfRDJbrM2gwcjaPP3Nk0fwtTjn9JCvJq3aYcEdVOoMmUTPmblmH';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds/?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }

    return response.json();
  });
}

export function fetchCatByBreed(id) {
  return fetch(
    `${BASE_URL}/images/search?breed_ids=${id}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText || response.status);
    }
    return response.json();
  });
}