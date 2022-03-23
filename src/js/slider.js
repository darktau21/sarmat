'use strict';

window.addEventListener('load', () => {
  const slidesArticles = [
    {
      title: 'Морфология почв',
      text: 'Сумма внешних признаков, которые являются результатом процессов формирования и поэтому отражают происхождение почв, историю их развития, их физические и химические свойства.',
      link: '/exposition.html?page=morfologiya-pochv',
    },
    {
      title: 'Биология почв',
      text: 'Почва — это среда обитания множества организмов. Существа, обитающие в почве, называются педобионтами. Наименьшими из них являются бактерии, водоросли, грибки и одноклеточные организмы, обитающие в почвенных водах.',
      link: '/exposition.html?page=biologiya-pochv',
    },
    {
      title: 'Химия почв',
      text: 'Изучение химических основ почвообразования и плодородия почв, путем исследования состава, свойств почв и протекающих в почвах процессов на ионно-молекулярном и коллоидном уровнях.',
      link: '/exposition.html?page=himiya-pochv',
    },
    {
      title: 'ФИЗИКА ПОЧВ',
      text: 'Физические свойства и процессы в почвах. Особое внимание уделяется движению воды, переносу питательных веществ, теплопроводности, транспортировке газа. Кроме того, прочность почвы, ее механика, уплотнение, несущая способность, набухание и усадка, макропоры и т. д.',
      link: '/exposition.html?page=fizika-pochv',
    },
    {
      title: 'О почве',
      text: 'Почва — это особое природное тело, образующееся на поверхности Земли, в результате взаимодействия живой (органической) и неживой (неорганической) природы. Важнейшим свойством почвы, отличающим её от горных пород, является плодородие.',
      link: '/exposition.html?page=o-pochve',
    },
  ];

  let offset = 0;

  const prevBtn = document.querySelector('.js_slider-prev');
  const nextBtn = document.querySelector('.js_slider-next');
  const prevBtnMob = document.querySelector('.js_slider-prev-mob');
  const nextBtnMob = document.querySelector('.js_slider-next-mob');
  const articleTitle = document.querySelector('.js_slider-title');
  const articleText = document.querySelector('.js_slider-text');
  const articleLink = document.querySelector('.js_slider-link');
  const slidesImgsContainer = document.querySelector('.js_slider-img-container');
  const slidesImgsInner = document.querySelector('.js_slider-img-inner');
  const slidesImgs = document.querySelectorAll('.js_slider-img');
  const imgWidth = window.getComputedStyle(slidesImgsContainer).width;

  slidesImgs.forEach((img) => {
    img.style.width = imgWidth;
  });

  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  prevBtnMob.addEventListener('click', prevSlide);
  nextBtnMob.addEventListener('click', nextSlide);



  function prevSlide() {
    if (offset == 0) {
      offset = parseInt(imgWidth) * (slidesImgs.length - 1);
      changeArticle(slidesImgs.length - 1);
    } else {
      offset -= parseInt(imgWidth);
      changeArticle(offset / parseInt(imgWidth));
    }
    slidesImgsInner.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() {
    if (offset == parseInt(imgWidth) * (slidesImgs.length - 1)) {
      offset = 0;
      changeArticle(0);
    } else {
      offset += parseInt(imgWidth);
      changeArticle(offset / parseInt(imgWidth));
    }
    slidesImgsInner.style.transform = `translateX(-${offset}px)`;
  }

  function changeArticle(n) {
    articleTitle.textContent = slidesArticles[n].title;
    articleText.textContent = slidesArticles[n].text;
    articleLink.setAttribute('href', slidesArticles[n].link);
  }
});
