'use strict';

class Paginator {
  constructor({
    articlesSelector,
    paginatorSelector,
    firstBtnSelector,
    secondBtnSelector,
    thirdBtnSelector,
    prevBtnSelector,
    nextBtnSelector,
    articleActiveClass,
    paginatorActiveClass,
    paginatorBlockedClass,
  }) {
    this.firstBtnSelector = firstBtnSelector;
    this.secondBtnSelector = secondBtnSelector;
    this.thirdBtnSelector = thirdBtnSelector;
    this.prevBtnSelector = prevBtnSelector;
    this.nextBtnSelector = nextBtnSelector;
    this.articleActiveClass = articleActiveClass;
    this.paginatorActiveClass = paginatorActiveClass;
    this.paginatorBlockedClass = paginatorBlockedClass;

    this.articles = document.querySelectorAll(`.${articlesSelector}`);
    this.paginator = document.querySelector(`.${paginatorSelector}`);
    this.firstBtn = document.querySelector(`.${firstBtnSelector}`);
    this.secondBtn = document.querySelector(`.${secondBtnSelector}`);
    this.thirdBtn = document.querySelector(`.${thirdBtnSelector}`);
    this.prevBtn = document.querySelector(`.${prevBtnSelector}`);
    this.nextBtn = document.querySelector(`.${nextBtnSelector}`);

    this.urlString;
    this.urlParams;
    this.currentPage;
  }

  getUrlString() {
    this.urlString = document.location.search;
  }

  getUrlParams() {
    this.urlParams = new URLSearchParams(this.urlString);
  }

  getCurrentPage() {
    this.currentPage = this.urlParams.get('page');
  }

  changeArticle() {
    this.getUrlString();
    this.getUrlParams();
    this.getCurrentPage();

    this.articles.forEach((article) => {
      article.classList.remove(this.articleActiveClass);
    });
    this.articles[this.currentPage - 1].classList.add(this.articleActiveClass);
    window.scrollTo(0, 0);
  }

  changePaginator() {
    this.firstBtn.classList.remove(this.paginatorActiveClass);
    this.secondBtn.classList.remove(this.paginatorActiveClass);
    this.thirdBtn.classList.remove(this.paginatorActiveClass);
    this.prevBtn.classList.remove(this.paginatorBlockedClass);
    this.nextBtn.classList.remove(this.paginatorBlockedClass);

    if (this.currentPage == 1) {
      this.prevBtn.classList.add(this.paginatorBlockedClass);
      this.firstBtn.textContent = +this.currentPage;
      this.secondBtn.textContent = +this.currentPage + 1;
      this.thirdBtn.textContent = +this.currentPage + 2;
      this.firstBtn.classList.add(this.paginatorActiveClass);
    } else if (this.currentPage == this.articles.length) {
      this.nextBtn.classList.add(this.paginatorBlockedClass);
      this.firstBtn.textContent = +this.currentPage - 2;
      this.secondBtn.textContent = +this.currentPage - 1;
      this.thirdBtn.textContent = +this.currentPage;
      this.thirdBtn.classList.add(this.paginatorActiveClass);
    } else {
      this.firstBtn.textContent = +this.currentPage - 1;
      this.secondBtn.textContent = +this.currentPage;
      this.thirdBtn.textContent = +this.currentPage + 1;
      this.secondBtn.classList.add(this.paginatorActiveClass);
    }
  }

  setPaginatorListener() {
    this.paginator.addEventListener('click', (e) => {
      if (e.target.classList.contains(this.prevBtnSelector) && this.currentPage != 1) {
        this.currentPage = 1;
      } else if (
        e.target.classList.contains(this.nextBtnSelector) &&
        this.currentPage != this.articles.length
      ) {
        this.currentPage = this.articles.length;
      } else if (
        e.target.classList.contains(this.firstBtnSelector) ||
        e.target.classList.contains(this.secondBtnSelector) ||
        e.target.classList.contains(this.thirdBtnSelector)
      ) {
        this.currentPage = e.target.textContent;
      }
      history.pushState(null, null, `?page=${this.currentPage}`);
      this.changeArticle();
      this.changePaginator();
    });
  }

  init() {
    this.getUrlString();
    this.getUrlParams();
    this.getCurrentPage();
    this.changeArticle();
    this.changePaginator();
    this.setPaginatorListener();
  }
}

const MainPaginator = new Paginator({
  articlesSelector: 'js_article',
  paginatorSelector: 'js_paginator',
  firstBtnSelector: 'js_paginator-first',
  secondBtnSelector: 'js_paginator-second',
  thirdBtnSelector: 'js_paginator-third',
  prevBtnSelector: 'js_paginator-prev',
  nextBtnSelector: 'js_paginator-next',
  articleActiveClass: 'history__article_active',
  paginatorActiveClass: 'paginator__btn_active',
  paginatorBlockedClass: 'paginator__btn_blocked',
});

MainPaginator.init();
