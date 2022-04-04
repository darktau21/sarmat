"use strict";class Slider{constructor(t){let{bodySelector:e,imgsWindowSelector:i,imgsInnerSelector:s,articleTitlesSelector:n,articleTextsSelector:h,articleLinksSelector:r,prevBtnSelector:l,nextBtnSelector:o,activeClass:d,slideTime:c}=t;this.body=document.querySelector(`.${e}`),this.imgsWindow=document.querySelector(`.${i}`),this.imgsInner=document.querySelector(`.${s}`),this.imgs=document.querySelectorAll(`.${s} img`),this.articleTitles=document.querySelectorAll(`.${n}`),this.articleTexts=document.querySelectorAll(`.${h}`),this.articleLinks=document.querySelectorAll(`.${r}`),this.prevBtn=document.querySelector(`.${l}`),this.nextBtn=document.querySelector(`.${o}`),this.activeClass=d,this.slideTime=1e3*c,this.currentSlide=0,this.imgsWindowWidth,this.offsetPatterns=this.calcOffset(),this.slideTimer,this.windowWidth=document.documentElement.clientWidth,this.posInit,this.posX1,this.posX2,this.posFinal,this.posThreshold}calcImgsWindowWidth(){this.imgsWindowWidth=this.imgsWindow.clientWidth,this.posThreshold=.2*this.imgsWindowWidth}setImgsWidth(){this.imgs.forEach((t=>{t.style.width=`${this.imgsWindowWidth}px`}))}calcOffset(){const t=[0];let e=0;this.imgs.forEach((()=>{e+=this.imgsWindowWidth,t.push(e)})),t.pop(),this.offsetPatterns=t}checkSlide(){this.currentSlide>=this.imgs.length?this.currentSlide=0:this.currentSlide<0&&(this.currentSlide=this.imgs.length-1)}changeContent(t){t.forEach((t=>{t.classList.remove(this.activeClass)})),t[this.currentSlide].classList.add(this.activeClass)}setTransform(t){this.imgsInner.style.transform=`translateX(-${t}px)`}changeSlide(){this.checkSlide(),this.setTransform(this.offsetPatterns[this.currentSlide]),this.changeContent(this.articleTitles),this.changeContent(this.articleTexts),this.changeContent(this.articleLinks),this.intervaledChangeStart(this.slideTime)}showNextSlide(){this.currentSlide+=1,this.changeSlide()}showPrevSlide(){this.currentSlide-=1,this.changeSlide()}intervaledChangeStop(){clearInterval(this.slideTimer)}intervaledChangeStart(){this.intervaledChangeStop(),this.slideTimer=setTimeout((()=>this.showNextSlide()),this.slideTime)}setMouseEnterListener(){this.body.addEventListener("pointerenter",(()=>{this.intervaledChangeStop()}))}setMouseLeaveListener(){this.body.addEventListener("pointerleave",(()=>{this.intervaledChangeStart()}))}setSwipeListeners(){this.imgsWindow.addEventListener("touchstart",(t=>{this.posX2=this.offsetPatterns[this.currentSlide],this.intervaledChangeStop(),this.posInit=this.posX1=t.touches[0].clientX,this.imgsInner.style.transition="0s"})),this.imgsWindow.addEventListener("touchmove",(t=>{0==this.currentSlide&&this.posInit<this.posX1||this.currentSlide==this.imgs.length-1&&this.posInit>this.posX1?this.setTransform(this.offsetPatterns[this.currentSlide]):(this.intervaledChangeStop(),this.posX2+=this.posX1-t.touches[0].clientX,this.posX1=t.touches[0].clientX,this.imgsInner.style.transform=`translateX(-${this.posX2}px)`)})),this.imgsWindow.addEventListener("touchend",(()=>{this.posFinal=this.posInit-this.posX1,this.imgsInner.style.transition="",this.intervaledChangeStart(),Math.abs(this.posFinal)>this.posThreshold&&(this.posInit<this.posX1?this.currentSlide--:this.posInit>this.posX1&&this.currentSlide++),this.posInit!==this.posX1&&this.changeSlide()}))}setResizeListener(){window.addEventListener("resize",(()=>{document.documentElement.clientWidth!=this.windowWidth&&(this.calcImgsWindowWidth(),this.setImgsWidth(),this.calcOffset(),this.changeSlide(),this.windowWidth=document.documentElement.clientWidth)}))}setBtnsListeners(){this.prevBtn.addEventListener("click",(()=>this.showPrevSlide())),this.nextBtn.addEventListener("click",(()=>this.showNextSlide()))}init(){this.calcImgsWindowWidth(),this.setImgsWidth(),this.calcOffset(),this.changeSlide(),this.setResizeListener(),this.setMouseEnterListener(),this.setMouseLeaveListener(),this.setSwipeListeners(),this.setBtnsListeners()}}document.addEventListener("DOMContentLoaded",(()=>{new Slider({bodySelector:"js_slider-body",imgsWindowSelector:"js_slider-img-window",imgsInnerSelector:"js_slider-img-inner",articleTitlesSelector:"js_slider-title",articleTextsSelector:"js_slider-text",articleLinksSelector:"js_slider-link",prevBtnSelector:"js_slider-btn-prev",nextBtnSelector:"js_slider-btn-next",activeClass:"slider__active",slideTime:12}).init()}));