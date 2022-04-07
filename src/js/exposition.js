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
    '/uploads/albums/zaharov/thumbnails/001.jpg',
    '/uploads/albums/zaharov/thumbnails/002.jpg',
    '/uploads/albums/zaharov/thumbnails/003.jpg',
    '/uploads/albums/zaharov/thumbnails/004.jpg',
    '/uploads/albums/zaharov/thumbnails/005.jpg',
    '/uploads/albums/zaharov/thumbnails/006.jpg',
    '/uploads/albums/zaharov/thumbnails/007.jpg',
    '/uploads/albums/zaharov/thumbnails/008.jpg',
    '/uploads/albums/zaharov/thumbnails/009.jpg',
    '/uploads/albums/zaharov/thumbnails/010.jpg',
    '/uploads/albums/zaharov/thumbnails/011.jpg',
    '/uploads/albums/zaharov/thumbnails/012.jpg',
    '/uploads/albums/zaharov/thumbnails/013.jpg',
    '/uploads/albums/zaharov/thumbnails/014.jpg',
    '/uploads/albums/zaharov/thumbnails/015.jpg',
    '/uploads/albums/zaharov/thumbnails/016.jpg',
    '/uploads/albums/zaharov/thumbnails/017.jpg',
    '/uploads/albums/zaharov/thumbnails/018.jpg',
    '/uploads/albums/zaharov/thumbnails/019.jpg',
    '/uploads/albums/zaharov/thumbnails/020.jpg',
    '/uploads/albums/zaharov/thumbnails/021.jpg',
    '/uploads/albums/zaharov/thumbnails/022.jpg',
    '/uploads/albums/zaharov/thumbnails/023.jpg',
    '/uploads/albums/zaharov/thumbnails/024.jpg',
    '/uploads/albums/zaharov/thumbnails/025.jpg',
    '/uploads/albums/zaharov/thumbnails/026.jpg',
    '/uploads/albums/zaharov/thumbnails/027.jpg',
    '/uploads/albums/zaharov/thumbnails/028.jpg',
    '/uploads/albums/zaharov/thumbnails/029.jpg',
    '/uploads/albums/zaharov/thumbnails/030.jpg',
    '/uploads/albums/zaharov/thumbnails/031.jpg',
    '/uploads/albums/zaharov/thumbnails/032.jpg',
    '/uploads/albums/zaharov/thumbnails/033.jpg',
    '/uploads/albums/zaharov/thumbnails/034.jpg',
    '/uploads/albums/zaharov/thumbnails/035.jpg',
    '/uploads/albums/zaharov/thumbnails/036.jpg',
    '/uploads/albums/zaharov/thumbnails/037.jpg',
    '/uploads/albums/zaharov/thumbnails/038.jpg',
    '/uploads/albums/zaharov/thumbnails/039.jpg',
    '/uploads/albums/zaharov/thumbnails/040.jpg',
    '/uploads/albums/zaharov/thumbnails/041.jpg',
    '/uploads/albums/zaharov/thumbnails/042.jpg',
    '/uploads/albums/zaharov/thumbnails/043.jpg',
    '/uploads/albums/zaharov/thumbnails/044.jpg',
    '/uploads/albums/zaharov/thumbnails/045.jpg',
  ],
  captions: [
    'Отец - Александр Васильевич Захаров',
    'Мать - Юлия Каземировна Захарова',
    'Сергей  Александрович Захаров',
    'Мужская гимназия, в которой учился Сережа Захаров',
    'С.А. Захров - студент',
    'Мужская гимназия в г. Тифлис. Сережа Захаров  в центре справа во втором ряду',
    'С.А. Захаров студент Москвы 1900 г.',
    'Кисловодск. Санаторий КСУ',
    'Захаров С.А. со своей семьей братьями и родителями',
    'Захаров среди друзей и учеников. Июль 1947 г.',
    'Захаров С.А. Доктор почвенных и сельскохозяйственных наук, заведующий кафедрой почвоведения РГУ (1940 г.)',
    'Москва. Межевой институт . С.А. Захаров со студентами. 1911 г.',
    'С.А. Захаров за научной работой',
    'Сабанин А.Н. и Захаров С.А. среди студентов',
    'На добрую память Сергею Александровичу Захарову от сердечно благодарного А.Н. Сабанина',
    'Захаров С.А с ассистентом Орловым М. в Подмосковье 1914г.Захаров С.А с ассистентом Орловым М. в Подмосковье 1914г.',
    'С.А. Захаров среди педагогв Межевого института г. Москва',
    '12/1-1926 г. Москва. 5 Всесоюзный  съезд почвоведов. Президиум: проф. Захаров, проф. Неуструев, проф. Ярилов, проф. Геммерлинг',
    'Делегация 1-го международного конгресса по почвоведению. Чикаго. 20 июля 1922 г.',
    'Захаров С.А. в экспедиции 1938 г.',
    'Захаров С.А. на практике со студентами 11.10.1938 г.',
    'Захаров С.А. на практике с 3 курсом. ст. Аксай. 11.10.1938 г.',
    'Овражная система в районе ст. Аксай. Эрозия почвы и естественные разрезы. сентябрь 1939 г.',
    'Овражная система в районе ст. Аксай. Эрозия почвы и естественные разрезы. сентябрь 1939 г.',
    'Научная конференция 23-27 декабря 1946 г.',
    'На областном агрономическом совещании. 5-7 января 1940   г. Ростов-на-Дону',
    'С.А. Захаров со студентами',
    'Научная конференция 26 декабря 1940 г.',
    'Ученики С.А. Захарова: проф. Блажий Е.С.',
    '4-й выпуск почвоведов Ростовского на Дону ГосУниверситета им. Молотова. 15.08.1941',
    'Ученики С.А. Захарова: проф. Качинский Н.А.',
    'Ученики С.А. Захарова: проф. Акимцев В.В.',
    'Ученики С.А. Захарова: Волобуев В.Р.',
    'Ученики С.А. Захарова: Сабашвили М.Н.',
    'Ученики С.А. Захарова: Фильков В.А.',
    'Ученики С.А. Захарова: Кириченко К.С.',
    'Ученики С.А. Захарова: Солдатов А.С.',
    'Ученики С.А. Захарова: Налбандян А.М.',
    'Ученики С.А. Захарова: Гришин А.Д.',
    'Ученики С.А. Захарова: Серебряков А.К.',
    'Ученики С.А. Захарова: Новикова А.В.',
    'Ученики С.А. Захарова:  Тукалова Е.И.',
    'Выпуск почвоведов 1943-1948 г.',
    'Выпуск почвоведов 1946-1951 г.',
    'Выпуск почвоведов 1945-1950 г.',
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