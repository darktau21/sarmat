let slides = [
  {
    title: 'Морфология почв',
    text: 'Сумма внешних признаков, которые являются результатом процессов формирования и поэтому отражают происхождение почв, историю их развития, их физические и химические свойства.',
    picture: 'uploads/picture1.jpg',
    alt: 'Морфология почв',
    link: '0',
  },
  {
    title: 'Химия почв',
    text: 'Изучение химических основ почвообразования и плодородия почв, путем исследования состава, свойств почв и протекающих в почвах процессов на ионно-молекулярном и коллоидном уровнях.',
    picture: 'uploads/picture3.jpg',
    alt: 'Химия почв',
    link: '1',
  },
  {
    title: 'О ПОЧВЕ',
    text: 'Почва — это особое природное тело, образующееся на поверхности Земли, в результате взаимодействия живой (органической) и мертвой (неорганической) природы. Важнейшим свойством почвы, отличающим её от горных пород, является плодородие.',
    picture: 'uploads/picture5.jpg',
    alt: 'О почве',
    link: '2',
  },
  {
    title: 'ФИЗИКА ПОЧВ',
    text: 'Физические свойства и процессы в почвах. Особое внимание уделяется движению воды, переносу питательных веществ, теплопроводности, транспортировке газа. Кроме того, прочность почвы, ее механика, уплотнение, несущая способность, набухание и усадка, макропоры и т. д.',
    picture: 'uploads/picture4.jpg',
    alt: 'Физика почв',
    link: '3',
  },
  {
    title: 'БИОЛОГИЯ ПОЧВ',
    text: 'Почва — это среда обитания множества организмов. Существа, обитающие в почве, называются педобионтами. Наименьшими из них являются бактерии, водоросли, грибки и одноклеточные организмы, обитающие в почвенных водах.',
    picture: 'uploads/picture2.jpg',
    alt: 'Биология почв',
    link: '4',
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
