let div = document.createElement('div');
div.className = 'alert';
div.innerHTML =
  'Пока что готова только главная (хотя нужно переделать кнопку открытия статьи в мобильной версии слайдера, я хз как), слайдер обновляется при каждом обновлении / открытии страницы. я ебанутый просто держу в курсе. Это сообщение исчезнет через 1 минуту <p>НАЖМИ НА УВЕДОМЛЕНИЕ ЧТОБЫ ЗАКРЫТЬ АОАОАОАО</p>';

document.body.prepend(div);

function removeAlert() {
  document.querySelector('.alert').remove();
}

let alertBlock = document.querySelector('.alert')
document.addEventListener('click', function (e) {
  let target = e.target;
  let its_alert = target == alertBlock || alertBlock.contains(target);

  if (its_alert) {
    removeAlert();
  }
});

setTimeout(removeAlert, 60000);
