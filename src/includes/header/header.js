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
  const target = e.target;
  const its_menuBody = target == menuBody || menuBody.contains(target);
  const its_menuBtn = target == menuBtn;
  const menu_is_active = menuBody.classList.contains('main-menu__body_active');

  if (!its_menuBody && !its_menuBtn && menu_is_active) {
    toggleMenu();
  }
});
