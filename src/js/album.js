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
    imgInnerSelector,
    prevImgBlockSelector,
    middleImgBlockSelector,
    nextImgBlockSelector,
    albumImgClass,
    imgBtnPrevSelector,
    imgBtnNextSelector,
    imgBtnSelector,
    thumbnailsSelector,
    thumbnailsInnerSelector,
    thumbnailsImgs,
    thumbnailsImgsClass,
    thumbnailsBtnSelector,
    thumbnailsBtnPrevSelector,
    thumbnailsBtnNextSelector,
    activeThumbClass,
  }) {
    this.imgInner = document.querySelector(`.${albumSelector} .${imgInnerSelector}`);
    this.prevImgBlock = document.querySelector(`.${albumSelector} .${prevImgBlockSelector}`);
    this.middleImgBlock = document.querySelector(`.${albumSelector} .${middleImgBlockSelector}`);
    this.nextImgBlock = document.querySelector(`.${albumSelector} .${nextImgBlockSelector}`);
    this.imgBtns = document.querySelectorAll(`.${albumSelector} .${imgBtnSelector}`);

    this.albumImgClass = albumImgClass;
    this.imgBtnPrevSelector = imgBtnPrevSelector;
    this.imgBtnNextSelector = imgBtnNextSelector;

    this.albumImgs = [];
    this.currentImg = 0;

    this.thumbnailsInner = document.querySelector(`.${albumSelector} .${thumbnailsInnerSelector}`);
    this.thumbnailsImgs = [...thumbnailsImgs];
    this.thumbnailsImgsClass = thumbnailsImgsClass;
    this.thumbnailsBtns = document.querySelectorAll(`.${albumSelector} .${thumbnailsBtnSelector}`);
    this.thumbnailsBtnPrevSelector = thumbnailsBtnPrevSelector;
    this.thumbnailsBtnNextSelector = thumbnailsBtnNextSelector;
    this.thumbnailsImgElems = [];
    this.activeThumbClass = activeThumbClass;

    this.thumbnailsWidth = +document.querySelector(`.${albumSelector} .${thumbnailsSelector}`)
      .offsetWidth;
    this.thumbnailsOffsetPatterns = [0];
    this.thumbnailsCurrentPattern = 0;
    this.posX1 = 0;
    this.posX2 = 0;
    this.posInit = 0;
    this.posFinal = 0;
    this.posThreshold = this.thumbnailsWidth * 0.2;

    this.windowWidth = document.documentElement.clientWidth;
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

  changeImg() {
    this.prevImgBlock.innerHTML = '';
    this.middleImgBlock.innerHTML = '';
    this.nextImgBlock.innerHTML = '';

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
    console.log(this);
  }

  nextImg() {
    this.currentImg += 1;
    this.changeActiveThumb();
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
    this.imgInner.style.transform = 'translateX(0)';
    setTimeout(() => {
      this.imgInner.style.transition = '0s';
      this.changeImg();
      this.imgInner.style.transform = 'translateX(-100vw)';
    }, 300);
    this.imgInner.style.transition = '';
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
          this.nextImgBlock.innerHTML = '';

          let nextImg = document.createElement('img');
          nextImg.classList.add(this.albumImgClass);
          nextImg.src = this.albumImgs[selectedImg];
          this.nextImgBlock.append(nextImg);
          this.currentImg = selectedImg;

          this.changeActiveThumb();
          this.imgInner.style.transform = 'translateX(-200vw)';
          setTimeout(() => {
            this.imgInner.style.transition = '0s';
            this.changeImg();
            this.imgInner.style.transform = 'translateX(-100vw)';
          }, 300);
          this.imgInner.style.transition = '';
          console.log(this);
        }

        if (selectedImg < this.currentImg) {
          this.prevImgBlock.innerHTML = '';

          let prevImg = document.createElement('img');
          prevImg.classList.add(this.albumImgClass);
          prevImg.src = this.albumImgs[selectedImg];
          this.prevImgBlock.append(prevImg);
          this.currentImg = selectedImg;

          this.changeActiveThumb();
          this.imgInner.style.transform = 'translateX(0)';
          setTimeout(() => {
            this.imgInner.style.transition = '0s';
            this.changeImg();
            this.imgInner.style.transform = 'translateX(-100vw)';
          }, 300);
          this.imgInner.style.transition = '';
          console.log(this);
        }
      });
    });
  }

  calcThumbnailsOffset() {
    let imgsWidthSum = 0;
    let allThumbsWidth = 0;
    let patternN = 0;
    this.thumbnailsImgElems = this.thumbnailsInner.querySelectorAll('img');

    this.thumbnailsOffsetPatterns = [0];

    for (let i = 0; i < this.thumbnailsImgElems.length; i++) {
      let thumbnailWidth = this.thumbnailsImgElems[i].clientWidth;

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

  // setResizeListener() {
  //   window.addEventListener('resize', () => {
  //     if (document.documentElement.clientWidth != this.windowWidth) {
  //       console.log('Ширина окна')
  //       this.thumbnailsCurrentPattern = 0;
  //       this.calcThumbnailsOffset();
  //       this.changeThumbsOffset();

  //       this.windowWidth = document.documentElement.clientWidth;
  //       console.log(this);
  //     }
  //   });
  // }

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

      this.imgInner.style.transform = `translateX(-${this.posX2}px)`;
    });

    this.imgInner.addEventListener('touchend', () => {

      this.posFinal = this.posInit - this.posX1;
      this.imgInner.style.transition = '';

      if (Math.abs(this.posFinal) > this.posThreshold) {
        if (this.posInit < this.posX1) {
          this.currentImg--;
        } else if (this.posInit > this.posX1) {
          this.currentImg++;
        }
      }
      if (this.posInit !== this.posX1) {
        this.changeImg();
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
    // this.setResizeListener();
    // this.setImgSwipeListeners();
    this.setImgBtnsLsiteners();
    this.setThumbnailsBtnsLsiteners();
    this.setThumbnailsSwipeListeners();
  }
}

const Zaharov = new Album({
  albumSelector: 'album_zaharov',
  imgInnerSelector: 'js_img-inner',
  prevImgBlockSelector: 'js_img-block-prev',
  middleImgBlockSelector: 'js_img-block-middle',
  nextImgBlockSelector: 'js_img-block-next',
  imgBtnSelector: 'js_img-btn',
  imgBtnPrevSelector: 'album__img-btn_prev',
  imgBtnNextSelector: 'album__img-btn_next',
  albumImgClass: 'album__img',
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
  thumbnailsImgsClass: 'album__thumbnail',
  thumbnailsBtnSelector: 'js_thumbnails-btn',
  thumbnailsBtnPrevSelector: 'album__thumbnails-btn_prev',
  thumbnailsBtnNextSelector: 'album__thumbnails-btn_next',
  activeThumbClass: 'album__thumbnail_active',
});
console.log(Zaharov);
Zaharov.init();
