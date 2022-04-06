'use strict';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const copyrightYear = document.querySelector('.js_copyright-year');

    let date = new Date();
    copyrightYear.textContent = date.getFullYear();
  },
  { once: true }
);
