'use strict';

let urlString = document.location.search;
let urlParams = new URLSearchParams(urlString);
let currentPage = urlParams.get('page');
const articles = document.querySelectorAll('.js_article');
const links = document.querySelectorAll('.js_sub-menu-list li');
console.log(currentPage);

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault;
    history.pushState(null, null, link.dataset.article);
    changeArticle();
  });
});

changeArticle();

function changeArticle() {
  urlString = document.location.search;
  urlParams = new URLSearchParams(urlString);
  currentPage = urlParams.get('page');
  articles.forEach((article) => {
    article.classList.remove('article_active');
    if (article.dataset.name == currentPage) {
      article.classList.add('article_active');
    }
  });
  links.forEach((link) => {
    link.classList.remove('sub-menu__item_active');
    if (link.dataset.name == currentPage) {
      link.classList.add('sub-menu__item_active');
    }
  });
}
