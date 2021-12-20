let div = document.createElement('div');
div.className = 'alert';
div.innerHTML =
  'Пока что готова только главная (хотя нужно переделать кнопку открытия статьи в мобильной версии слайдера, я хз как), слайдер обновляется при каждом обновлении / открытии страницы. я ебанутый просто держу в курсе. Это сообщение исчезнет через 1 минуту';

document.body.prepend(div);

setTimeout(() => {
  document.querySelector('.alert').remove();
}, 60000);
