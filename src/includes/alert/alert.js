let div = document.createElement('div');
div.className = 'alert';
div.innerHTML =
  'Это сообщение уже неактуально, но пусть висит по приколу. Оно исчезнет через 1 минуту <p>НАЖМИ НА УВЕДОМЛЕНИЕ ЧТОБЫ ЗАКРЫТЬ АОАОАОАО</p>';

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
