'use strict';

window.addEventListener('load', () => {
  let windowInnerHeight = window.innerHeight;
  const albumImg = document.querySelector('.js_album-img');
  const albumImgBlock = document.querySelector('.js_album-img-block');
  const album = document.querySelector('.js_album');
  const thumbnailsContainer = document.querySelector('.js_thumbnails');
  const thumbnailsImgs = thumbnailsContainer.querySelectorAll('img');
  let albumWidth = album.offsetWidth - 75;
  const thumbnailsPrev = document.querySelector('.js_album-thumbnails-prev');
  const thumbnailsNext = document.querySelector('.js_album-thumbnails-next');
  const albumPrev = document.querySelector('.js_album-prev');
  const albumNext = document.querySelector('.js_album-next');
  let thumbOffset = 0;
  let thumbRemain = 0;
  let allThumbsWidth = 0;
  albumImg.style.maxWidth = `${albumWidth}px`;
  albumImg.style.maxHeight = `${windowInnerHeight * 0.7}px`;
  albumImgBlock.style.minHeight = `${windowInnerHeight * 0.8}px`;
  thumbnailsContainer.style.width = `${albumWidth}px`;

  const viewPatterns = [0];

  let imgsWidthSum = 0;
  let viewPatternN = 0;
  for (let i = 0; i < thumbnailsImgs.length; i++) {
    imgsWidthSum += thumbnailsImgs[i].offsetWidth;
    allThumbsWidth += thumbnailsImgs[i].offsetWidth;
    thumbnailsImgs[i].setAttribute('data-view-pattern', viewPatternN);
    thumbnailsImgs[i].setAttribute('data-num', i);
    if (imgsWidthSum >= albumWidth) {
      thumbnailsImgs[i].removeAttribute('data-view-pattern');
      thumbnailsImgs[i].removeAttribute('data-num');
      viewPatternN += 1;
      imgsWidthSum -= thumbnailsImgs[i].offsetWidth;
      viewPatterns.push(imgsWidthSum);
      imgsWidthSum = 0;
      allThumbsWidth -= thumbnailsImgs[i].offsetWidth;
      i--;
    }
  }

  for (let i = 1; i < viewPatterns.length; i++) {
    viewPatterns[i] += viewPatterns[i - 1];
  }

  thumbRemain = allThumbsWidth - albumWidth - viewPatterns[viewPatterns.length - 1];
  if (thumbRemain < 0) {
    viewPatterns[viewPatterns.length - 1] += thumbRemain + 5;
  }

  thumbnailsImgs[0].classList.add('album__thumbnail_active');
  let path = thumbnailsImgs[0].getAttribute('src');
  path = path.replace('thumbnails/', '');
  albumImg.setAttribute('src', path);

  let activeImg = 0;

  albumPrev.addEventListener('click', () => {
    if (activeImg > 0) {
      activeImg -= 1;
      let imgPattern;
      thumbnailsImgs.forEach((img) => {
        img.classList.remove('album__thumbnail_active');
        if (img.dataset.num == activeImg) {
          img.classList.add('album__thumbnail_active');
          let path = img.getAttribute('src');
          path = path.replace('thumbnails/', '');
          albumImg.setAttribute('src', path);
          imgPattern = +img.dataset.viewPattern;
          return;
        }
        if (thumbOffset != imgPattern) {
          thumbOffset = imgPattern;
          changeThumbPattern();
        }
      });
      console.log(activeImg)
    }
  });

  albumNext.addEventListener('click', () => {
    if (activeImg < thumbnailsImgs.length - 1) {
      activeImg += 1;
      let imgPattern;
      thumbnailsImgs.forEach((img) => {
        img.classList.remove('album__thumbnail_active');
        if (img.dataset.num == activeImg) {
          img.classList.add('album__thumbnail_active');
          let path = img.getAttribute('src');
          path = path.replace('thumbnails/', '');
          albumImg.setAttribute('src', path);
          imgPattern = +img.dataset.viewPattern;
          return;
        }
        if (thumbOffset != imgPattern) {
          thumbOffset = imgPattern;
          changeThumbPattern();
        }
      });
      console.log(activeImg)
    }
  });

  thumbnailsContainer.addEventListener('click', (e) => {
    thumbnailsImgs.forEach((img) => {
      img.classList.remove('album__thumbnail_active');
    });
    e.target.classList.add('album__thumbnail_active');
    activeImg = +e.target.dataset.num;
    console.log(activeImg);
    let path = e.target.getAttribute('src');
    path = path.replace('thumbnails/', '');
    albumImg.setAttribute('src', path);
  });

  thumbnailsNext.addEventListener('click', () => {
    if (thumbOffset < viewPatterns.length - 1) {
      thumbOffset += 1;
      changeThumbPattern();
    }
  });

  thumbnailsPrev.addEventListener('click', () => {
    if (thumbOffset > 0) {
      thumbOffset -= 1;
      changeThumbPattern();
    }
  });

  function changeThumbPattern() {
    thumbnailsContainer.style.transform = `translateX(-${viewPatterns[thumbOffset]}px)`;
  }
});
