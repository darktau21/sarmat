let slidesMassLenght = slides.length - 1; // Количество слайдов
let currentSlideNum = getRandom(0, slidesMassLenght); // Номер текущего слайда
let nextSlideNum; // Номер следующего слайда
let prevSlideNum; // Номер предыдущего слайда
let currentSlide = slides[currentSlideNum]; // Объект с текущим слайдом

// Кнопки
let nextSlideBtn = document.querySelector('.slider__slide-btn_next'); // Кнопка вперед ПК
let nextSlideBtnMobile = document.querySelector('.slider__slide-btn-mobile_next'); // Кнопка вперед мобилки
let prevSlideBtn = document.querySelector('.slider__slide-btn_prev'); // Кнопка назад ПК
let prevSlideBtnMobile = document.querySelector('.slider__slide-btn-mobile_prev'); // Кнопка назад мобилки


function checkSlideNum(which) { // Проверка краёв массива, true - возвращает следующий, false - предыдущий
  nextSlideNum = currentSlideNum == slidesMassLenght ? 0 : currentSlideNum + 1; // Номер следующего слайда
  prevSlideNum = currentSlideNum == 0 ? slidesMassLenght : currentSlideNum - 1; // Номер предыдущего слайда
  currentSlideNum = which ? nextSlideNum : prevSlideNum;
  currentSlide = slides[currentSlideNum];
  console.log(currentSlideNum);
}

function getRandom(min, max) { // Функция рандома
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function preloadImages() { // Предзагрузка изображений
  for (var i = 0; i < arguments.length; i++) {
    new Image().src = arguments[i];
    console.log('Загрузка изображений', (arguments.length))
  }
}

function changeSlide() { // Непосредственная смена контента в слайдере
  document.querySelector('#slider__picture').setAttribute('src', currentSlide.picture);
  document.querySelector('#slider__picture').setAttribute('alt', currentSlide.alt);
  document.querySelector('.slider__title').textContent = currentSlide.title;
  document.querySelector('.slider__text').textContent = currentSlide.text;
  document.querySelector('#slider__to-article').setAttribute('href', currentSlide.link);
  preloadImages(slides[nextSlideNum].picture, slides[prevSlideNum].picture);
}

// Функции прослушивания кнопок
nextSlideBtn.addEventListener('click', function (e) {
  checkSlideNum(true);
  changeSlide();
  console.log('Следующий ПК')
});
prevSlideBtn.addEventListener('click', function (e) {
  checkSlideNum(false);
  changeSlide();
  console.log('Предыдущий ПК')
});
nextSlideBtnMobile.addEventListener('click', function (e) {
  checkSlideNum(true);
  changeSlide();
  console.log('Следующий мобила')
});
prevSlideBtnMobile.addEventListener('click', function (e) {
  checkSlideNum(false);
  changeSlide();
  console.log('Предыдущий мобила')
});

window.onload = function () {
  checkSlideNum();
  changeSlide(); // После полной загрузки вызываем функцию
};
