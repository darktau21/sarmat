'use strict';

const album = document.querySelector('.js_album');
const thumbnailsContainer = document.querySelector('.js_thumbnails');
const thumbnailsImgs = thumbnailsContainer.querySelectorAll('img');
const albumWidth = album.offsetWidth - 75;
const thumbnailsPrev = document.querySelector('.js_album-thumbnails-prev');
const thumbnailsNext = document.querySelector('.js_album-thumbnails-next');
let thumbOffset = 0;

thumbnailsContainer.style.width = `${albumWidth}px`;

const viewPatterns = [0];

let imgsWidthSum = 0;
for (let i = 0; i < thumbnailsImgs.length; i++) {
  imgsWidthSum += thumbnailsImgs[i].offsetWidth;
  if (imgsWidthSum >= albumWidth) {
    imgsWidthSum -= thumbnailsImgs[i].offsetWidth;
    viewPatterns.push(imgsWidthSum);
    imgsWidthSum = 0;
    i--;
  }
}

for (let i = 1; i < viewPatterns.length; i++) {
  viewPatterns[i] += viewPatterns[i - 1];
}
console.log(viewPatterns)
thumbnailsNext.addEventListener('click', () => {
  if (thumbOffset < viewPatterns.length - 1) {
    thumbOffset += 1;
    console.log(thumbOffset);
    changeThumbPattern();
  }
});
thumbnailsPrev.addEventListener('click', () => {
  if (thumbOffset > 0) {
    thumbOffset -= 1;
    console.log(thumbOffset);
    changeThumbPattern();
  }
});

function changeThumbPattern() {
  thumbnailsContainer.style.transform = `translateX(-${viewPatterns[thumbOffset]}px)`;
}