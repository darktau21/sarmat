'use strict';

const menuOpenBtn = document.querySelector('.js_menu-mobile-btn-open');
const menuList = document.querySelector('.js_menu-mobile');

menuOpenBtn.addEventListener('click', openMenu);
menuList.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('js_menu-mobile-btn-close') ||
    e.target.classList.contains('js_menu-mobile-wrapper')
  ) {
    closeMenu();
  }
});

function openMenu() {
  menuList.classList.add('mobile-menu_active');
  document.body.style.overflowY = 'hidden';
  menuList.style.transitionDelay = '0s';
  window.scrollTo(0, 0);
}

function closeMenu() {
  menuList.classList.remove('mobile-menu_active');
  document.body.style.overflowY = '';
  menuList.style.transitionDelay = '0.3s';
}