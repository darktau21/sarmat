'use strict';

const album = document.querySelector('.js_album');
const thumbnailsContainer = document.querySelector('.js_thumbnails');
const thumbnailsImgs = thumbnailsContainer.querySelectorAll('img');
const albumWidth = parseInt(window.getComputedStyle(album).width) - 100;
const thumbnailsPrev = document.querySelector('.js_album-thumbnails-prev');
const thumbnailsNext = document.querySelector('.js_album-thumbnails-next');
let viewWidth = 0;
let thumbnailsNextCounter = 1;

thumbnailsContainer.style.width = `${albumWidth}px`;

thumbnailsNext.addEventListener('click', () => {
  calculateTrans();
  thumbnailsNextCounter++;
  thumbnailsContainer.style.transform = `translateX(-${viewWidth}px)`;
});

let prevThumb;
function calculateTrans() {
  for (const img of thumbnailsImgs) {
    if (viewWidth >= albumWidth * thumbnailsNextCounter) {
      viewWidth -= img.offsetWidth + prevThumb;
      console.log(albumWidth * thumbnailsNextCounter)
      console.log(viewWidth)
      return;
    }
    viewWidth += img.offsetWidth;
    prevThumb = img.offsetWidth;
  }
}