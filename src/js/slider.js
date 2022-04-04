'use strict';

class Slider {
  constructor({
    bodySelector,
    imgsWindowSelector,
    imgsInnerSelector,
    articleTitlesSelector,
    articleTextsSelector,
    articleLinksSelector,
    prevBtnSelector,
    nextBtnSelector,
    activeClass,
    slideTime,
  }) {
    this.body = document.querySelector(`.${bodySelector}`);
    this.imgsWindow = document.querySelector(`.${imgsWindowSelector}`);
    this.imgsInner = document.querySelector(`.${imgsInnerSelector}`);
    this.imgs = document.querySelectorAll(`.${imgsInnerSelector} img`);
    this.articleTitles = document.querySelectorAll(`.${articleTitlesSelector}`);
    this.articleTexts = document.querySelectorAll(`.${articleTextsSelector}`);
    this.articleLinks = document.querySelectorAll(`.${articleLinksSelector}`);
    this.prevBtn = document.querySelector(`.${prevBtnSelector}`);
    this.nextBtn = document.querySelector(`.${nextBtnSelector}`);
    this.activeClass = activeClass;
    this.slideTime = slideTime * 1000;

    this.currentSlide = 0;
    this.imgsWindowWidth;
    this.offsetPatterns = this.calcOffset();
    this.slideTimer;
    this.windowWidth = document.documentElement.clientWidth;
    this.posInit;
    this.posX1;
    this.posX2;
    this.posFinal;
    this.posThreshold;
  }

  calcImgsWindowWidth() {
    this.imgsWindowWidth = this.imgsWindow.clientWidth;
    this.posThreshold = this.imgsWindowWidth * 0.20;
  }

  setImgsWidth() {
    this.imgs.forEach((img) => {
      img.style.width = `${this.imgsWindowWidth}px`;
    });
  }

  calcOffset() {
    const offsetPatterns = [0];
    let widthSum = 0;

    this.imgs.forEach(() => {
      widthSum += this.imgsWindowWidth;
      offsetPatterns.push(widthSum);
    });

    offsetPatterns.pop();

    this.offsetPatterns = offsetPatterns;
  }

  checkSlide() {
    if (this.currentSlide >= this.imgs.length) {
      this.currentSlide = 0;
    } else if (this.currentSlide < 0) {
      this.currentSlide = this.imgs.length - 1;
    }
  }

  changeContent(elementsArray) {
    elementsArray.forEach((elem) => {
      elem.classList.remove(this.activeClass);
    });
    elementsArray[this.currentSlide].classList.add(this.activeClass);
  }

  setTransform(px) {
    this.imgsInner.style.transform = `translateX(-${px}px)`;
  }

  changeSlide() {
    this.checkSlide();
    this.setTransform(this.offsetPatterns[this.currentSlide]);

    this.changeContent(this.articleTitles);
    this.changeContent(this.articleTexts);
    this.changeContent(this.articleLinks);

    this.intervaledChangeStart(this.slideTime);
  }

  showNextSlide() {
    this.currentSlide += 1;
    this.changeSlide();
  }

  showPrevSlide() {
    this.currentSlide -= 1;
    this.changeSlide();
  }

  intervaledChangeStop() {
    clearInterval(this.slideTimer);
  }

  intervaledChangeStart() {
    this.intervaledChangeStop();
    this.slideTimer = setTimeout(() => this.showNextSlide(), this.slideTime);
  }

  setMouseEnterListener() {
    this.body.addEventListener('pointerenter', () => {
      this.intervaledChangeStop();
    });
  }

  setMouseLeaveListener() {
    this.body.addEventListener('pointerleave', () => {
      this.intervaledChangeStart();
    });
  }

  setSwipeListeners() {
    this.imgsWindow.addEventListener('touchstart', (e) => {
      this.posX2 = this.offsetPatterns[this.currentSlide];

      this.intervaledChangeStop();
      this.posInit = this.posX1 = e.touches[0].clientX;

      this.imgsInner.style.transition = '0s';
    });

    this.imgsWindow.addEventListener('touchmove', (e) => {
      if (this.currentSlide == 0) {
        if (this.posInit < this.posX1) {
          this.setTransform(this.offsetPatterns[this.currentSlide]);
          return;
        }
      }

      if (this.currentSlide == this.imgs.length - 1) {
        if (this.posInit > this.posX1) {
          this.setTransform(this.offsetPatterns[this.currentSlide]);
          return;
        }
      }

      this.intervaledChangeStop();

      this.posX2 += this.posX1 - e.touches[0].clientX;
      this.posX1 = e.touches[0].clientX;

      this.imgsInner.style.transform = `translateX(-${this.posX2}px)`;
    });

    this.imgsWindow.addEventListener('touchend', () => {
      this.posFinal = this.posInit - this.posX1;
      this.imgsInner.style.transition = '';
      this.intervaledChangeStart();

      if (Math.abs(this.posFinal) > this.posThreshold) {
        if (this.posInit < this.posX1) {
          this.currentSlide--;
        } else if (this.posInit > this.posX1) {
          this.currentSlide++;
        }
      }
      if (this.posInit !== this.posX1) {
        this.changeSlide();
      }
    });
  }

  setResizeListener() {
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth != this.windowWidth) {
        this.calcImgsWindowWidth();
        this.setImgsWidth();
        this.calcOffset();
        this.changeSlide();

        this.windowWidth = document.documentElement.clientWidth;
      }
    });
  }

  setBtnsListeners() {
    this.prevBtn.addEventListener('click', () => this.showPrevSlide());

    this.nextBtn.addEventListener('click', () => this.showNextSlide());
  }

  init() {
    this.calcImgsWindowWidth();
    this.setImgsWidth();
    this.calcOffset();
    this.changeSlide();
    this.setResizeListener();
    this.setMouseEnterListener();
    this.setMouseLeaveListener();
    this.setSwipeListeners();
    this.setBtnsListeners();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const MainSlider = new Slider({
    bodySelector: 'js_slider-body',
    imgsWindowSelector: 'js_slider-img-window',
    imgsInnerSelector: 'js_slider-img-inner',
    articleTitlesSelector: 'js_slider-title',
    articleTextsSelector: 'js_slider-text',
    articleLinksSelector: 'js_slider-link',
    prevBtnSelector: 'js_slider-btn-prev',
    nextBtnSelector: 'js_slider-btn-next',
    activeClass: 'slider__active',
    slideTime: 12,
  });

  MainSlider.init();
});

