import { Report } from 'notiflix/build/notiflix-report-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImg } from './js/api/api-fetch';
import createMarkup from './js/tamplate/create-markup';
import refs from './js/refs';

refs.formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const inputValue = evt.currentTarget.elements.searchQuery.value.trim();

if(!inputValue){
   return 
} 

  fetchImg(inputValue).then(resp =>{
    
    if(resp.data.total === 0){
        Report.warning(
            'Nothing found',
            "Sorry, there are no images matching your search query. Please try again.",
            'Okay',
            );
    }
    
    addLibraryImgToHTML(createMarkup(resp.data.hits))})
    .then(()=> initSimpleLightBox());
    
  
}


function addLibraryImgToHTML(markup) {
    refs.galleryWrapperEl.innerHTML = markup;
}

function initSimpleLightBox(){
    const lightbox = new SimpleLightbox(".gallery a", {
        captions: true,
        captionsData: "alt",
        captionPosition: "bottom",
        captionDelay: 250,
      });
      lightbox.refresh()
}