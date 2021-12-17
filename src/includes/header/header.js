console.log('Приветствую смотрящих!')
let menuBtn = document.querySelector('.main-menu__mobile-button')
let menuBody = document.querySelector('.main-menu__body')

menuBtn.addEventListener('click', function(){
  menuBtn.classList.toggle('main-menu__mobile-button_active')
  menuBody.classList.toggle('main-menu__body_active')
})