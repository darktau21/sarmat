"use strict";class Paginator{constructor(t){let{articlesSelector:e,paginatorSelector:s,firstBtnSelector:i,secondBtnSelector:r,thirdBtnSelector:a,prevBtnSelector:n,nextBtnSelector:c,articleActiveClass:o,paginatorActiveClass:l,paginatorBlockedClass:h}=t;this.firstBtnSelector=i,this.secondBtnSelector=r,this.thirdBtnSelector=a,this.prevBtnSelector=n,this.nextBtnSelector=c,this.articleActiveClass=o,this.paginatorActiveClass=l,this.paginatorBlockedClass=h,this.articles=document.querySelectorAll(`.${e}`),this.paginator=document.querySelector(`.${s}`),this.firstBtn=document.querySelector(`.${i}`),this.secondBtn=document.querySelector(`.${r}`),this.thirdBtn=document.querySelector(`.${a}`),this.prevBtn=document.querySelector(`.${n}`),this.nextBtn=document.querySelector(`.${c}`),this.urlString,this.urlParams,this.currentPage}getUrlString(){this.urlString=document.location.search}getUrlParams(){this.urlParams=new URLSearchParams(this.urlString)}getCurrentPage(){this.currentPage=this.urlParams.get("page")}changeArticle(){this.getUrlString(),this.getUrlParams(),this.getCurrentPage(),this.articles.forEach((t=>{t.classList.remove(this.articleActiveClass)})),this.articles[this.currentPage-1].classList.add(this.articleActiveClass),window.scrollTo(0,0)}changePaginator(){this.firstBtn.classList.remove(this.paginatorActiveClass),this.secondBtn.classList.remove(this.paginatorActiveClass),this.thirdBtn.classList.remove(this.paginatorActiveClass),this.prevBtn.classList.remove(this.paginatorBlockedClass),this.nextBtn.classList.remove(this.paginatorBlockedClass),1==this.currentPage?(this.prevBtn.classList.add(this.paginatorBlockedClass),this.firstBtn.textContent=+this.currentPage,this.secondBtn.textContent=+this.currentPage+1,this.thirdBtn.textContent=+this.currentPage+2,this.firstBtn.classList.add(this.paginatorActiveClass)):this.currentPage==this.articles.length?(this.nextBtn.classList.add(this.paginatorBlockedClass),this.firstBtn.textContent=+this.currentPage-2,this.secondBtn.textContent=+this.currentPage-1,this.thirdBtn.textContent=+this.currentPage,this.thirdBtn.classList.add(this.paginatorActiveClass)):(this.firstBtn.textContent=+this.currentPage-1,this.secondBtn.textContent=+this.currentPage,this.thirdBtn.textContent=+this.currentPage+1,this.secondBtn.classList.add(this.paginatorActiveClass))}setPaginatorListener(){this.paginator.addEventListener("click",(t=>{t.target.classList.contains(this.prevBtnSelector)&&1!=this.currentPage?this.currentPage=1:t.target.classList.contains(this.nextBtnSelector)&&this.currentPage!=this.articles.length?this.currentPage=this.articles.length:(t.target.classList.contains(this.firstBtnSelector)||t.target.classList.contains(this.secondBtnSelector)||t.target.classList.contains(this.thirdBtnSelector))&&(this.currentPage=t.target.textContent),history.pushState(null,null,`?page=${this.currentPage}`),this.changeArticle(),this.changePaginator()}))}init(){this.getUrlString(),this.getUrlParams(),this.getCurrentPage(),this.changeArticle(),this.changePaginator(),this.setPaginatorListener()}}const MainPaginator=new Paginator({articlesSelector:"js_article",paginatorSelector:"js_paginator",firstBtnSelector:"js_paginator-first",secondBtnSelector:"js_paginator-second",thirdBtnSelector:"js_paginator-third",prevBtnSelector:"js_paginator-prev",nextBtnSelector:"js_paginator-next",articleActiveClass:"history__article_active",paginatorActiveClass:"paginator__btn_active",paginatorBlockedClass:"paginator__btn_blocked"});MainPaginator.init();