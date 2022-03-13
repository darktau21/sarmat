let menuBtn = document.querySelector('.main-menu__mobile-button');
let menuBody = document.querySelector('.main-menu__body');

const toggleMenu = function () {
  menuBtn.classList.toggle('main-menu__mobile-button_active');
  menuBody.classList.toggle('main-menu__body_active');
};

menuBtn.addEventListener('click', function (e) {
  toggleMenu();
});

document.addEventListener('click', function (e) {
  let target = e.target;
  let its_menuBody = target == menuBody || menuBody.contains(target);
  let its_menuBtn = target == menuBtn || menuBtn.contains(target);
  let menu_is_active = menuBody.classList.contains('main-menu__body_active');

  if (!its_menuBody && !its_menuBtn && menu_is_active) {
    toggleMenu();
  }
});
