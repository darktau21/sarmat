'use strict';

class MobileMenu {
  constructor({ openBtnSelector, wrapperSelector, menuSelector, closeBtnSelector, activeClass }) {
    this.menuSelector = menuSelector;
    this.wrapperSelector = wrapperSelector;
    this.openBtnSelector = openBtnSelector;
    this.closeBtnSelector = closeBtnSelector;
    this.activeClass = activeClass;
    this.menu = document.querySelector(`.${menuSelector}`);
    this.openBtn = document.querySelector(`.${openBtnSelector}`);
  }

  openMenu() {
    window.scrollTo(0, 0);
    this.menu.classList.add(this.activeClass);
    document.body.style.overflowY = 'hidden';
  }

  closeMenu() {
    this.menu.classList.remove(this.activeClass);
    document.body.style.overflowY = '';
  }

  init() {
    this.openBtn.addEventListener('click', () => {
      this.openMenu();
    });

    this.menu.addEventListener('click', (e) => {
      if (
        e.target.classList.contains(this.closeBtnSelector) ||
        e.target.classList.contains(this.wrapperSelector)
      ) {
        this.closeMenu();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {

const mobileMenu = new MobileMenu({
  menuSelector: 'js_mobile-menu',
  wrapperSelector: 'js_mobile-menu-wrapper',
  openBtnSelector: 'js_mobile-menu-openBtn',
  closeBtnSelector: 'js_mobile-menu-closeBtn',
  activeClass: 'mobile-menu_active'
});

mobileMenu.init();

});