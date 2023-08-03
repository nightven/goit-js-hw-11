import axios from 'axios';

const API_KEY = '38613449-d53cd7f29ca45bb3b7c5eaf76';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImg(value) {
  axios.defaults.params = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
  };
  return await axios.get(`https://pixabay.com/api/`);
}

export { fetchImg };
