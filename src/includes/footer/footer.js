let currentDate = new Date();
let copyright = document.createElement('div');
copyright.className = 'footer__copyright';
copyright.innerHTML = '© Southern Federal, ' + currentDate.getFullYear();

document.querySelector('.footer__info').append(copyright);
