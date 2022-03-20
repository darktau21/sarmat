'use strict';

const copyrightYear = document.querySelector('.js_copyright-year');

window.addEventListener('DOMContentLoaded', () => {
  let date = new Date();
  copyrightYear.textContent = date.getFullYear();
}, { once: true });