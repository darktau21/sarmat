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

class Album {
  constructor({
    albumSelector,
    albumHeaderSelector,
    albumHeaderShowClass,
    imgInnerSelector,
    prevImgBlockSelector,
    middleImgBlockSelector,
    nextImgBlockSelector,
    albumImgClass,
    imgBtnPrevSelector,
    imgBtnNextSelector,
    imgBtnSelector,
    imgBtnShowClass,
    thumbnailsBlockSelector,
    thumbnailsInnerSelector,
    thumbnailsImgs,
    thumbnailsImgsClass,
    thumbnailsBtnSelector,
    thumbnailsBtnPrevSelector,
    thumbnailsBtnNextSelector,
    thumbnailsShowClass,
    activeThumbClass,
    controlsTimeout,
    controlsTime,
    closeBtnSelector,
    albumActiveClass,
    captions,
    captionSelector,
  }) {
    this.album = document.querySelector(`.${albumSelector}`);
    this.albumHeader = document.querySelector(`.${albumSelector} .${albumHeaderSelector}`);
    this.imgInner = document.querySelector(`.${albumSelector} .${imgInnerSelector}`);
    this.prevImgBlock = document.querySelector(`.${albumSelector} .${prevImgBlockSelector}`);
    this.middleImgBlock = document.querySelector(`.${albumSelector} .${middleImgBlockSelector}`);
    this.nextImgBlock = document.querySelector(`.${albumSelector} .${nextImgBlockSelector}`);
    this.imgBtns = document.querySelectorAll(`.${albumSelector} .${imgBtnSelector}`);
    this.closeBtn = document.querySelector(`.${albumSelector} .${closeBtnSelector}`);
    this.captionBlock = document.querySelector(`.${albumSelector} .${captionSelector}`);

    this.albumHeaderShowClass = albumHeaderShowClass;
    this.albumImgClass = albumImgClass;
    this.imgBtnPrevSelector = imgBtnPrevSelector;
    this.imgBtnNextSelector = imgBtnNextSelector;
    this.imgBtnShowClass = imgBtnShowClass;
    this.albumActiveClass = albumActiveClass;

    this.albumImgs = [];
    this.currentImg = 0;
    this.controlsTime = controlsTime * 1000;
    this.controlsTimeout = controlsTimeout;
    this.captions = [...captions];

    this.thumbnailsBlock = document.querySelector(`.${albumSelector} .${thumbnailsBlockSelector}`);
    this.thumbnailsInner = document.querySelector(`.${albumSelector} .${thumbnailsInnerSelector}`);
    this.thumbnailsImgs = [...thumbnailsImgs];
    this.thumbnailsImgsClass = thumbnailsImgsClass;
    this.thumbnailsBtns = document.querySelectorAll(`.${albumSelector} .${thumbnailsBtnSelector}`);
    this.thumbnailsBtnPrevSelector = thumbnailsBtnPrevSelector;
    this.thumbnailsBtnNextSelector = thumbnailsBtnNextSelector;
    this.thumbnailsImgElems = [];
    this.activeThumbClass = activeThumbClass;
    this.thumbnailsShowClass = thumbnailsShowClass;

    this.thumbnailsOffsetPatterns = [0];
    this.thumbnailsCurrentPattern = 0;
    this.posX1 = 0;
    this.posX2 = 0;
    this.posInit = 0;
    this.posFinal = 0;
    this.windowWidth = +document.documentElement.clientWidth;
    this.posThreshold = +document.documentElement.clientWidth * 0.2;
    this.thumbnailsWidth = +document.documentElement.clientWidth * 0.75;
  }

  changeActiveThumb() {
    this.thumbnailsImgElems.forEach((elem) => {
      elem.classList.remove(this.activeThumbClass);
    });
    this.thumbnailsImgElems[this.currentImg].classList.add(this.activeThumbClass);

    this.thumbnailsCurrentPattern = this.thumbnailsImgElems[this.currentImg].dataset.offsetPattern;
    this.changeThumbsOffset();
  }

  fillAlbumImgs() {
    this.thumbnailsImgs.forEach((src) => {
      this.albumImgs.push(src.replace('thumbnails/', ''));
    });
  }

  removeImg(imgBlock) {
    let img = imgBlock.querySelector(`.${this.albumImgClass}`);
    if (img) {
      img.remove();
    }
  }

  changeImg() {
    this.removeImg(this.prevImgBlock);
    this.removeImg(this.middleImgBlock);
    this.removeImg(this.nextImgBlock);

    let prevImg = document.createElement('img');
    let middleImg = document.createElement('img');
    let nextImg = document.createElement('img');

    prevImg.classList.add(this.albumImgClass);
    middleImg.classList.add(this.albumImgClass);
    nextImg.classList.add(this.albumImgClass);

    prevImg.src = this.albumImgs[this.currentImg - 1];
    middleImg.src = this.albumImgs[this.currentImg];
    nextImg.src = this.albumImgs[this.currentImg + 1];

    this.prevImgBlock.append(prevImg);
    this.middleImgBlock.append(middleImg);
    this.nextImgBlock.append(nextImg);
  }

  nextImg() {
    this.currentImg += 1;
    this.changeActiveThumb();
    this.changeCaption();
    this.imgInner.style.transform = 'translateX(-200vw)';
    setTimeout(() => {
      this.imgInner.style.transition = '0s';
      this.changeImg();
      this.imgInner.style.transform = 'translateX(-100vw)';
    }, 300);
    this.imgInner.style.transition = '';
  }

  prevImg() {
    this.currentImg -= 1;
    this.changeActiveThumb();
    this.changeCaption();
    this.imgInner.style.transform = 'translateX(0)';
    setTimeout(() => {
      this.imgInner.style.transition = '0s';
      this.changeImg();
      this.imgInner.style.transform = 'translateX(-100vw)';
    }, 300);
    this.imgInner.style.transition = '';
  }

  showContorls() {
    this.imgBtns.forEach((btn) => {
      btn.classList.add(this.imgBtnShowClass);
    });

    this.albumHeader.classList.add(this.albumHeaderShowClass);
    this.thumbnailsBlock.classList.add(this.thumbnailsShowClass);
  }

  hideContorls() {
    this.imgBtns.forEach((btn) => {
      btn.classList.remove(this.imgBtnShowClass);
    });

    this.albumHeader.classList.remove(this.albumHeaderShowClass);
    this.thumbnailsBlock.classList.remove(this.thumbnailsShowClass);
  }

  changeCaption() {
    if (this.captions[this.currentImg]) {
      this.captionBlock.style.display = '';
      this.captionBlock.textContent = this.captions[this.currentImg];
    } else {
      this.captionBlock.style.display = 'none';
    }
  }

  setCloseBtnListener() {
    this.closeBtn.addEventListener('click', () => {
      this.album.classList.remove(this.albumActiveClass);
      document.body.style.overflow = '';
    });
  }

  setAlbumControlsListener() {
    this.showContorls();
    this.controlsTimeout = setTimeout(() => {
      clearTimeout(this.controlsTimeout);
      this.controlsTimeout = false;
      this.hideContorls();
    }, this.controlsTime);
    this.middleImgBlock.addEventListener('click', () => {
      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout);
        this.controlsTimeout = false;
        this.hideContorls();
      } else {
        this.showContorls();
        this.controlsTimeout = setTimeout(() => {
          clearTimeout(this.controlsTimeout);
          this.controlsTimeout = false;
          this.hideContorls();
        }, this.controlsTime);
      }
    });
  }

  setImgBtnsLsiteners() {
    this.imgBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (btn.classList.contains(this.imgBtnPrevSelector)) {
          if (this.currentImg == 0) {
            return;
          }

          this.prevImg();
        }

        if (btn.classList.contains(this.imgBtnNextSelector)) {
          if (this.currentImg == this.albumImgs.length - 1) {
            return;
          }

          this.nextImg();
        }
      });
    });
  }

  fillThumbsInner() {
    let imgsCounter = 0;
    let onLoad = () => {
      imgsCounter++;
      if (imgsCounter == this.thumbnailsImgs.length) this.calcThumbnailsOffset();
    };

    this.thumbnailsImgs.forEach((src) => {
      let img = document.createElement('img');

      img.classList.add(this.thumbnailsImgsClass);
      img.src = src;
      img.onload = onLoad;
      this.thumbnailsInner.append(img);
    });
  }

  changeThumbsOffset() {
    this.thumbnailsInner.style.transform = `translateX(-${
      this.thumbnailsOffsetPatterns[this.thumbnailsCurrentPattern]
    }px)`;
  }

  setThumbImgListener() {
    this.thumbnailsImgElems.forEach((elem) => {
      elem.addEventListener('click', (e) => {
        let selectedImg = +e.currentTarget.dataset.num;

        if (selectedImg > this.currentImg) {
          this.removeImg(this.nextImgBlock);

          let nextImg = document.createElement('img');
          nextImg.classList.add(this.albumImgClass);
          nextImg.src = this.albumImgs[selectedImg];
          this.nextImgBlock.append(nextImg);
          this.currentImg = selectedImg;

          this.changeActiveThumb();
          this.changeCaption();
          this.imgInner.style.transform = 'translateX(-200vw)';
          setTimeout(() => {
            this.imgInner.style.transition = '0s';
            this.changeImg();
            this.imgInner.style.transform = 'translateX(-100vw)';
          }, 300);
          this.imgInner.style.transition = '';
        }

        if (selectedImg < this.currentImg) {
          this.removeImg(this.prevImgBlock);

          let prevImg = document.createElement('img');
          prevImg.classList.add(this.albumImgClass);
          prevImg.src = this.albumImgs[selectedImg];
          this.prevImgBlock.append(prevImg);
          this.currentImg = selectedImg;

          this.changeActiveThumb();
          this.changeCaption();
          this.imgInner.style.transition = '0s';
          this.imgInner.style.transform = 'translateX(0)';
          setTimeout(() => {
            this.imgInner.style.transition = '0s';
            this.changeImg();
            this.imgInner.style.transform = 'translateX(-100vw)';
          }, 300);

          this.imgInner.style.transition = '';
        }
      });
    });
  }

  calcThumbnailsOffset() {
    this.thumbnailsWidth = this.windowWidth * 0.75;
    let imgsWidthSum = 0;
    let allThumbsWidth = 0;
    let patternN = 0;
    this.thumbnailsImgElems = this.thumbnailsInner.querySelectorAll('img');

    this.thumbnailsOffsetPatterns = [0];

    for (let i = 0; i < this.thumbnailsImgElems.length; i++) {
      let thumbnailWidth = this.thumbnailsImgElems[i].offsetWidth;

      imgsWidthSum += thumbnailWidth;
      allThumbsWidth += thumbnailWidth;

      this.thumbnailsImgElems[i].dataset.offsetPattern = patternN;
      this.thumbnailsImgElems[i].dataset.num = i;

      if (imgsWidthSum > this.thumbnailsWidth) {
        i--;

        allThumbsWidth -= thumbnailWidth;
        this.thumbnailsOffsetPatterns.push(allThumbsWidth);

        imgsWidthSum = 0;
        patternN++;
      }
    }
    this.thumbnailsOffsetPatterns[this.thumbnailsOffsetPatterns.length - 1] =
      allThumbsWidth - this.thumbnailsWidth;
    this.changeActiveThumb();
    this.setThumbImgListener();
  }

  setThumbnailsBtnsLsiteners() {
    this.thumbnailsBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (btn.classList.contains(this.thumbnailsBtnPrevSelector)) {
          if (this.thumbnailsCurrentPattern == 0) {
            return;
          }

          this.thumbnailsCurrentPattern--;
          this.changeThumbsOffset();
        }

        if (btn.classList.contains(this.thumbnailsBtnNextSelector)) {
          if (this.thumbnailsCurrentPattern == this.thumbnailsOffsetPatterns.length - 1) {
            return;
          }

          this.thumbnailsCurrentPattern++;
          this.changeThumbsOffset();
        }
      });
    });
  }

  setImgSwipeListeners() {
    this.imgInner.addEventListener('touchstart', (e) => {
      this.posX2 = 0;

      this.posInit = this.posX1 = e.touches[0].clientX;

      this.imgInner.style.transition = '0s';
    });

    this.imgInner.addEventListener('touchmove', (e) => {
      this.posX2 += this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;

      this.imgInner.style.transform = `translateX(-${this.windowWidth + this.posX2}px)`;
    });

    this.imgInner.addEventListener('touchend', () => {
      this.posFinal = this.posInit - this.posX1;

      if (Math.abs(this.posFinal) > this.posThreshold) {
        if (this.posInit < this.posX1) {
          if (this.currentImg == 0) {
            this.imgInner.style.transform = 'translateX(-100vw)';
            return;
          }

          this.currentImg--;
          this.imgInner.style.transform = 'translateX(0)';
        } else if (this.posInit > this.posX1) {
          if (this.currentImg == this.albumImgs.length - 1) {
            this.imgInner.style.transform = 'translateX(-100vw)';
            return;
          }

          this.currentImg++;
          this.imgInner.style.transform = 'translateX(-200vw)';
        }
      }
      if (this.posInit !== this.posX1) {
        setTimeout(() => {
          this.imgInner.style.transition = '0s';
          this.changeActiveThumb();
          this.changeImg();
          this.changeCaption();
          this.imgInner.style.transform = 'translateX(-100vw)';
        }, 300);
        this.imgInner.style.transition = '';
      }
    });
  }

  setThumbnailsSwipeListeners() {
    this.thumbnailsInner.addEventListener('touchstart', (e) => {
      this.posX2 = this.thumbnailsOffsetPatterns[this.thumbnailsCurrentPattern];

      this.posInit = this.posX1 = e.touches[0].clientX;

      this.thumbnailsInner.style.transition = '0s';
    });

    this.thumbnailsInner.addEventListener('touchmove', (e) => {
      if (this.thumbnailsCurrentPattern == 0) {
        if (this.posInit < this.posX1) {
          this.changeThumbsOffset();
          return;
        }
      }

      if (this.thumbnailsCurrentPattern == this.thumbnailsOffsetPatterns.length - 1) {
        if (this.posInit > this.posX1) {
          this.changeThumbsOffset();
          return;
        }
      }

      this.posX2 += this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;

      this.thumbnailsInner.style.transform = `translateX(-${this.posX2}px)`;
    });

    this.thumbnailsInner.addEventListener('touchend', () => {
      this.posFinal = this.posInit - this.posX1;
      this.thumbnailsInner.style.transition = '';

      if (Math.abs(this.posFinal) > this.posThreshold) {
        if (this.posInit < this.posX1) {
          this.thumbnailsCurrentPattern--;
        } else if (this.posInit > this.posX1) {
          this.thumbnailsCurrentPattern++;
        }
      }
      if (this.posInit !== this.posX1) {
        this.changeThumbsOffset();
      }
    });
  }

  init() {
    this.fillThumbsInner();
    this.fillAlbumImgs();
    this.changeImg();
    this.changeCaption();
    this.setCloseBtnListener();
    this.setAlbumControlsListener();
    this.setImgSwipeListeners();
    this.setImgBtnsLsiteners();
    this.setThumbnailsBtnsLsiteners();
    this.setThumbnailsSwipeListeners();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const MainExposition = new Exposition({
    articlesSelector: 'js_article',
    linksSelector: 'js_article-link',
    articleActiveClass: 'exposition__article_active',
    linkActiveClass: 'sub-menu__item_active',
  });

  const PhotoMonolitov = new Album({
    albumSelector: 'album_photo-monolitov',
    albumHeaderSelector: 'js_header',
    albumHeaderShowClass: 'album__header_showed',
    controlsTime: 15,
    imgInnerSelector: 'js_img-inner',
    prevImgBlockSelector: 'js_img-block-prev',
    middleImgBlockSelector: 'js_img-block-middle',
    nextImgBlockSelector: 'js_img-block-next',
    imgBtnSelector: 'js_img-btn',
    imgBtnPrevSelector: 'album__img-btn_prev',
    imgBtnNextSelector: 'album__img-btn_next',
    imgBtnShowClass: 'album__img-btn_showed',
    albumImgClass: 'album__img',
    thumbnailsBlockSelector: 'js_footer',
    thumbnailsSelector: 'js_thumbnails-window',
    thumbnailsInnerSelector: 'js_thumbnails-inner',
    thumbnailsImgs: [
      '/uploads/albums/monoliti/thumbnails/01.jpg',
      '/uploads/albums/monoliti/thumbnails/02.jpg',
      '/uploads/albums/monoliti/thumbnails/03.jpg',
      '/uploads/albums/monoliti/thumbnails/04.jpg',
      '/uploads/albums/monoliti/thumbnails/05.jpg',
      '/uploads/albums/monoliti/thumbnails/06.jpg',
      '/uploads/albums/monoliti/thumbnails/07.jpg',
      '/uploads/albums/monoliti/thumbnails/08.jpg',
      '/uploads/albums/monoliti/thumbnails/09.jpg',
      '/uploads/albums/monoliti/thumbnails/10.jpg',
      '/uploads/albums/monoliti/thumbnails/11.jpg',
      '/uploads/albums/monoliti/thumbnails/12.jpg',
      '/uploads/albums/monoliti/thumbnails/13.jpg',
      '/uploads/albums/monoliti/thumbnails/14.jpg',
      '/uploads/albums/monoliti/thumbnails/15.jpg',
      '/uploads/albums/monoliti/thumbnails/16.jpg',
      '/uploads/albums/monoliti/thumbnails/17.jpg',
      '/uploads/albums/monoliti/thumbnails/18.jpg',
      '/uploads/albums/monoliti/thumbnails/19.jpg',
      '/uploads/albums/monoliti/thumbnails/20.jpg',
      '/uploads/albums/monoliti/thumbnails/21.jpg',
      '/uploads/albums/monoliti/thumbnails/22.jpg',
      '/uploads/albums/monoliti/thumbnails/23.jpg',
      '/uploads/albums/monoliti/thumbnails/24.jpg',
      '/uploads/albums/monoliti/thumbnails/25.jpg',
      '/uploads/albums/monoliti/thumbnails/26.jpg',
      '/uploads/albums/monoliti/thumbnails/27.jpg',
      '/uploads/albums/monoliti/thumbnails/28.jpg',
      '/uploads/albums/monoliti/thumbnails/29.jpg',
      '/uploads/albums/monoliti/thumbnails/30.jpg',
      '/uploads/albums/monoliti/thumbnails/31.jpg',
      '/uploads/albums/monoliti/thumbnails/32.jpg',
      '/uploads/albums/monoliti/thumbnails/33.jpg',
      '/uploads/albums/monoliti/thumbnails/34.jpg',
      '/uploads/albums/monoliti/thumbnails/35.jpg',
      '/uploads/albums/monoliti/thumbnails/36.jpg',
      '/uploads/albums/monoliti/thumbnails/37.jpg',
      '/uploads/albums/monoliti/thumbnails/38.jpg',
      '/uploads/albums/monoliti/thumbnails/39.jpg',
      '/uploads/albums/monoliti/thumbnails/40.jpg',
      '/uploads/albums/monoliti/thumbnails/41.jpg',
      '/uploads/albums/monoliti/thumbnails/42.jpg',
      '/uploads/albums/monoliti/thumbnails/43.jpg',
      '/uploads/albums/monoliti/thumbnails/44.jpg',
      '/uploads/albums/monoliti/thumbnails/45.jpg',
      '/uploads/albums/monoliti/thumbnails/46.jpg',
      '/uploads/albums/monoliti/thumbnails/47.jpg',
    ],
    captions: [
      'Солонец каштановый корковый контенский район Ростовской области',
      'Солончак сульфатный Весёловский районе Ростовской области',
      'Солончако-солонец луговый Неклиновский район Ростовской области',
      'Солончак лугово-чернозёмный Ростовской области',
      'Солонец каштановый глубокий Ростовская область',
      'Солонец каштановый корковый Волгоградская область',
      'Солонец каштановый средний Ростовкая область',
      'Светло каштановая Ростовкая область',
      'Каштановая ....',
      'чернозём южный Миллеровский район Ростовской области',
      'Чернозём обыкновенный карбоватный (100-200 см) Аксайский район Ростовской области',
      'Чернозём обыкновенный карбоватный (0-100 см) Аксайский район Ростовской области',
      'Чернозём обыкновенно-карбонатный мощный (100-200см)Азовский район',
      'Чернозём обыкновенно-карбонатный мощный (0-100см)Азовский район',
      'Чернозём обыкновенно-карбонатный совхоз Донское; заповедник',
      'Луговая солончаковатая Неклиновский районе Ростовской области',
      'Аллювиальная слоистая на погребённой лугово-чернозёмной солончаковатой Неклиновский район Ростовской области',
      'Терра-росса Крым',
      'Желтозём Краснодарский край',
      'Краснозём Грузия',
      'Серозём светлый Киргизия',
      'Чернозём остаточно-луговатый Азовский район Ростовской области',
      'Луговая солончаковатая Неклиновский район Ростовской области',
      'Чернозём остаточно-луговатый осолоделый Азовский район Ростовской области',
      'Чернозём обыкновенный слитый осолоделый Октябрьский район Ростовской области',
      'Чернозём долинный Ростовкая область',
      '... лесная кислая Крым',
      'Чернозём обыкновенный карбонатный Ростовкая область',
      'Чернозём обыкновенныый карбонатный ... Донское ...',
      'Чернозём обыкновенный карбонатный среднемощный Аксайский район Ростовской области',
      'Чернозём обыкновенный карбонатный среднемощный супесчаный Весёловский район Ростовской области',
      'Чернозём обыкновенный Воронежская область',
      'Чернозём типичный республика Башкорктостан',
      'Чернозём выщелоченный Воронежская обалсть',
      'Серая лесная Брянская область',
      'Светло-серая лесная Рязанская область',
      'Серая лесная Рязанская область',
      'Бурая лесная Кабардино-Балкарская республика',
      'Дерново-среднеподзолистая Московская область',
      'Подзолистая Ленинградская область',
      'Подзолистая железисто-гумусовая Эстонии',
      'Дерново-сильноподзолистая Московская область',
      'Глееподзолистая Ленинградская Область',
      'Торфяно-подзолистая Ленинградская область',
      'Торфяно-болотная Ленинградская область',
      'Тундровая глеевая типичная Республика Коми',
      '',
    ],
    captionSelector: 'js_caption',
    thumbnailsImgsClass: 'album__thumbnail',
    thumbnailsBtnSelector: 'js_thumbnails-btn',
    thumbnailsBtnPrevSelector: 'album__thumbnails-btn_prev',
    thumbnailsBtnNextSelector: 'album__thumbnails-btn_next',
    thumbnailsShowClass: 'album__footer_showed',
    activeThumbClass: 'album__thumbnail_active',
    closeBtnSelector: 'js_close-btn',
    albumActiveClass: 'album_active',
  });

  MainExposition.init();
  PhotoMonolitov.init();

  document.querySelector('.album__link').addEventListener('click', () => {
    PhotoMonolitov.album.classList.add('album_active');
    document.body.style.overflow = 'hidden';
  });
});
