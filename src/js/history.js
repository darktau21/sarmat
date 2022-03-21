'use strict';

let urlString = document.location.search;
let urlParams = new URLSearchParams(urlString);
let currentPage = urlParams.get('page');
const articles = document.querySelectorAll('.js_article');
const paginator = document.querySelector('.js_paginator');
const firstBtn = paginator.querySelector('.js_paginator-first');
const secondBtn = paginator.querySelector('.js_paginator-second');
const thirdBtn = paginator.querySelector('.js_paginator-third');
const prevBtn = paginator.querySelector('.js_paginator-prev');
const nextBtn = paginator.querySelector('.js_paginator-next');
const lastPage = articles.length;

paginator.addEventListener('click', (e) => {
  let page;
  if (e.target.classList.contains('paginator__prev') && currentPage != 1) {
    page = 1;
  } else if (e.target.classList.contains('paginator__next')  && currentPage != lastPage) {
    page = lastPage;
  } else if (
    e.target.classList.contains('paginator__first') ||
    e.target.classList.contains('paginator__second') ||
    e.target.classList.contains('paginator__third')
  ) {
    page = +e.target.textContent;
  }
  if (page) {
    history.pushState(null, null, `?page=${page}`);
    changeArticle();
    changePaginator();
  }
});

changeArticle();
changePaginator();

function changeArticle() {
  urlString = document.location.search;
  urlParams = new URLSearchParams(urlString);
  currentPage = urlParams.get('page');
  articles.forEach((article) => {
    article.classList.remove('article_active');
  });
  articles[currentPage - 1].classList.add('article_active');
  window.scrollTo(0, 0);
}

function changePaginator() {
  firstBtn.classList.remove('paginator__btn_active');
  secondBtn.classList.remove('paginator__btn_active');
  thirdBtn.classList.remove('paginator__btn_active');
  prevBtn.classList.remove('paginator__btn_blocked');
  nextBtn.classList.remove('paginator__btn_blocked');

  if (currentPage == 1) {
    prevBtn.classList.add('paginator__btn_blocked');
    firstBtn.textContent = +currentPage;
    secondBtn.textContent = +currentPage + 1;
    thirdBtn.textContent = +currentPage + 2;
    firstBtn.classList.add('paginator__btn_active');
  } else if (currentPage == lastPage) {
    nextBtn.classList.add('paginator__btn_blocked');
    firstBtn.textContent = +currentPage - 2;
    secondBtn.textContent = +currentPage - 1;
    thirdBtn.textContent = +currentPage;
    thirdBtn.classList.add('paginator__btn_active');
  } else {
    firstBtn.textContent = +currentPage - 1;
    secondBtn.textContent = +currentPage;
    thirdBtn.textContent = +currentPage + 1;
    secondBtn.classList.add('paginator__btn_active');
  }
}
