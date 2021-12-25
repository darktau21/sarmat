function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function preloadImages() {
  for (var i = 0; i < arguments.length; i++) {
    new Image().src = arguments[i];
  }
}
let slidesMassLenght = slides.length - 1;
let currentSlideNum = getRandom(0, slidesMassLenght);
let currentSlide = slides[currentSlideNum];

function changeSlide() {
  document
    .querySelector('#slider__picture')
    .setAttribute('src', currentSlide.picture);
  document
    .querySelector('#slider__picture')
    .setAttribute('alt', currentSlide.alt);
  document.querySelector('.slider__title').textContent = currentSlide.title;
  document.querySelector('.slider__text').textContent = currentSlide.text;
  document
    .querySelector('#slider__to-article')
    .setAttribute('href', currentSlide.link);
  preloadImages(
    slides[currentSlideNum + 1].picture,
    slides[currentSlideNum - 1].picture
  );
  console.log(slides[currentSlideNum + 1].picture, slides[currentSlideNum - 1].picture)
}

changeSlide();

function checkNextSlide() {
  currentSlideNum += 1;
  currentSlideNum = currentSlideNum == slides.length ? 0 : currentSlideNum;
  currentSlide = slides[currentSlideNum];
  changeSlide();
}

function checkPrevSlide() {
  currentSlideNum -= 1;
  currentSlideNum = currentSlideNum == -1 ? slidesMassLenght : currentSlideNum;
  currentSlide = slides[currentSlideNum];
  changeSlide();
}

let nextSlideBtn = document.querySelector('.slider__slide-btn_next');
document.addEventListener('click', function (e) {
  let target = e.target;
  let its_nextSlideBtn =
    target == nextSlideBtn || nextSlideBtn.contains(target);

  if (its_nextSlideBtn) {
    checkNextSlide();
  }
});

let prevSlideBtn = document.querySelector('.slider__slide-btn_prev');
document.addEventListener('click', function (e) {
  let target = e.target;
  let its_prevSlideBtn =
    target == prevSlideBtn || prevSlideBtn.contains(target);

  if (its_prevSlideBtn) {
    checkPrevSlide();
  }
});

let nextSlideBtnMobile = document.querySelector(
  '.slider__slide-btn-mobile_next'
);
document.addEventListener('click', function (e) {
  let target = e.target;
  let its_nextSlideBtnMobile =
    target == nextSlideBtnMobile || nextSlideBtnMobile.contains(target);

  if (its_nextSlideBtnMobile) {
    checkNextSlide();
  }
});

let prevSlideBtnMobile = document.querySelector(
  '.slider__slide-btn-mobile_prev'
);
document.addEventListener('click', function (e) {
  let target = e.target;
  let its_prevSlideBtnMobile =
    target == prevSlideBtnMobile || prevSlideBtnMobile.contains(target);

  if (its_prevSlideBtnMobile) {
    checkPrevSlide();
  }
});
