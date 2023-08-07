import { Report } from 'notiflix/build/notiflix-report-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './js/api/api-fetch';
import createMarkup from './js/tamplate/create-markup';
import refs from './js/refs';

refs.formEl.addEventListener('submit', onSubmit);

// Variable
let page = 1;
let inputValue;
let totalImg = 0;
let loadImg = 0;

// Options for IntersectionObserver
const options = {
  root: null,
  rootMargin: '400px',
  threshold: 1.0,
};
// Infinity scroll instance
const observer = new IntersectionObserver(endScroll, options);

//  Init SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

// When the end of the list is reached, the download of additional images starts.
function endScroll(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onLoad();
    }
  });
}

// Uploading additional images
function onLoad() {
  page += 1;
  getImage(inputValue, page);
}

// Getting data from a form
function onSubmit(evt) {
  evt.preventDefault();

  inputValue = evt.currentTarget.elements.searchQuery.value.trim();

  if (!inputValue) {
    return;
  }

  refs.spanEl.textContent = '';
  page = 1;
  loadImg = 0;

  clearGallery();

  getImage(inputValue, page);
}

// Set to HTML new gallery
function addGalleryImgToHTML(markup) {
  refs.galleryWrapperEl.insertAdjacentHTML('beforeend', markup);
  // Refreshing simpleLightBox
  lightbox.refresh();
  // Keep an eye on the scroll
  observer.observe(refs.guardEl);
}

// Gallery cleaning
function clearGallery() {
  refs.galleryWrapperEl.innerHTML = '';
}

//  Get rending function
 async function getImage(value, page) {
   try{

     const resp = await fetchImg(value, page)
       
         if (resp.data.total === 0) {
           Report.warning(
             'Nothing found',
             'Sorry, there are no images matching your search query. Please try again.',
             'Okay'
           );
         }
         // Get total load images
         loadImg += resp.data.hits.length;
         totalImg = resp.data.totalHits;
   
         addGalleryImgToHTML(createMarkup(resp.data.hits));
       
      
       
         // Show text if you scrolled to end
         if (loadImg === totalImg || loadImg < 40) {
           refs.spanEl.textContent =
             "We're sorry, but you've reached the end of search results.";
           return;
         }
   
         //Smooth scrolling down 2 items
         if(loadImg > 40){
           const { height: cardHeight } = document
           .querySelector('.gallery')
           .firstElementChild.getBoundingClientRect();
   
         window.scrollBy({
           top: cardHeight * 2,
           behavior: 'smooth',
         });
         }
   }catch(err){console.log(err.massage)};
     
   
}


