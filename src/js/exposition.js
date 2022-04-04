'use strict';

class Exposition {
  constructor({ articlesSelector, linksSelector, articleActiveClass, linkActiveClass }) {
    this.articles = document.querySelectorAll(`.${articlesSelector}`);
    this.links = document.querySelectorAll(`.${linksSelector}`);
    this.articleActiveClass = articleActiveClass;
    this.linkActiveClass = linkActiveClass;

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
      if (article.dataset.name == this.currentPage) {
        article.classList.add(this.articleActiveClass);
      }
    });
  }

  changeActiveLink() {
    this.links.forEach((link) => {
      link.classList.remove(this.linkActiveClass);
      if (link.dataset.name == this.currentPage) {
        link.classList.add(this.linkActiveClass);
      }
    });
  }

  setLinksListeners() {
    this.links.forEach((link) => {
      link.addEventListener('click', () => {
        history.pushState(null, null, link.dataset.article);
        this.changeArticle();
        this.changeActiveLink();
        window.scrollTo(0, 0);
      });
    });
  }

  init() {
    this.getUrlString();
    this.getUrlParams();
    this.getCurrentPage();
    this.changeArticle();
    this.changeActiveLink();
    this.setLinksListeners();
  }
}

const MainExposition = new Exposition({
  articlesSelector: 'js_article',
  linksSelector: 'js_article-link',
  articleActiveClass: 'exposition__article_active',
  linkActiveClass: 'sub-menu__item_active',
});

MainExposition.init();
