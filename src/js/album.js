'use strict';

class Menu {
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
    this.setLinksListeners();
  }
}

// const AlbumsMenu = new Menu({
//   articlesSelector: 'js_album',
//   linksSelector: 'js_album-link',
//   articleActiveClass: 'album_active',
// });

// AlbumsMenu.init();

class Album {
  constructor({
    albumSelector,
    thumbnailsSelector,
    thumbnailsInnerSelector,
    thumbnailsPrevBtnSelector,
    thumbnailsNextBtnSelector,
  }) {
    this.thumbnailsInner = document.querySelector(`.${albumSelector} .${thumbnailsInnerSelector}`);
    this.thumbnailsImgs = document.querySelectorAll(`.${albumSelector} img`);
    this.thumbnailsPrevBtn = document.querySelector(
      `.${albumSelector} .${thumbnailsPrevBtnSelector}`
    );
    this.thumbnailsNextBtn = document.querySelector(
      `.${albumSelector} .${thumbnailsNextBtnSelector}`
    );

    this.thumbnailsWidth = +document.querySelector(`.${albumSelector} .${thumbnailsSelector}`)
      .offsetWidth;
    this.thumbnailsOffsetPatterns = [0];
  }

  calcThumbnailsOffset() {
    let imgsWidthSum = 0;
    let allThumbsWidth = 0;

    for (let i = 0; i < this.thumbnailsImgs.length; i++) {
      let thumbnailWidth = this.thumbnailsImgs[i].offsetWidth;

      imgsWidthSum += thumbnailWidth;
      allThumbsWidth += thumbnailWidth;

      if (imgsWidthSum >= this.thumbnailsWidth) {
        allThumbsWidth -= thumbnailWidth;
        this.thumbnailsOffsetPatterns.push(allThumbsWidth);
        imgsWidthSum = 0;
      }
    }
  }
}

const Zaharov = new Album({
  albumSelector: 'album_zaharov',
  thumbnailsSelector: 'js_thumbnails-window',
  thumbnailsInnerSelector: 'js_thumbnails-inner',
  thumbnailsPrevBtnSelector: 'js_thumbnails-prev',
  thumbnailsNextBtnSelector: 'js_thumbnails-next',
});

Zaharov.calcThumbnailsOffset();
console.log(Zaharov.thumbnailsOffsetPatterns);
console.log(Zaharov.thumbnailsWidth);