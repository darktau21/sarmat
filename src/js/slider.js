let slides = [
  {
    title: 'Морфология почв',
    text: 'Сумма внешних признаков, которые являются результатом процессов формирования и поэтому отражают происхождение почв, историю их развития, их физические и химические свойства.',
    picture: 'data/slider/picture1.jpg',
    alt: 'Морфология почв',
    link: '0',
  },
  {
    title: 'Химия почв',
    text: 'Изучение химических основ почвообразования и плодородия почв, путем исследования состава, свойств почв и протекающих в почвах процессов на ионно-молекулярном и коллоидном уровнях.',
    picture: 'data/slider/picture2.jpg',
    alt: 'Химия почв',
    link: '1',
  },
  {
    title: 'ЗАЛОЖЕНИЕ ПОЧВЕННЫХ РЕЗЕРВОВ',
    text: 'Для изучения и определения почв в природе, установления границ между различными почвами, взятия образцов для анализов закладывают специальные ямы, которые принято называть почвенными разрезами. Они бывают трех типов: полные (основные) разрезы, полуямы (контрольные), прикопки (поверхностные).',
    picture: 'data/slider/nasral.jpg',
    alt: 'Заложение почвенных ресурсов',
    link: '2',
  },
  {
    title: 'ФИЗИКА ПОЧВ',
    text: 'Физические свойства и процессы в почвах. Особое внимание уделяется движению воды, переносу питательных веществ, теплопроводности, транспортировке газа. Кроме того, прочность почвы, ее механика, уплотнение, несущая способность, набухание и усадка, макропоры и т. д.',
    picture: 'data/slider/picture3.jpg',
    alt: 'Физика почв',
    link: '3',
  },
  {
    title: 'БИОЛОГИЯ ПОЧВ',
    text: 'Почва — это среда обитания множества организмов. Существа, обитающие в почве, называются педобионтами. Наименьшими из них являются бактерии, водоросли, грибки и одноклеточные организмы, обитающие в почвенных водах.',
    picture: 'data/slider/picture4.jpg',
    alt: 'Биология почв',
    link: '4',
  },
  {
    title: 'ГЕОГРАФИЯ ПОЧВ',
    text: 'Наука о закономерностях распространения почв на поверхности Земли в целях почвенно-географического районирования.',
    picture: 'data/slider/picture4.jpg',
    alt: 'География почв',
    link: '5',
  },
];


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
