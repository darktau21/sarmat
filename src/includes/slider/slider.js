let slides = [
  {
    title: 'Расистский анекдот',
    text: 'Кавказ – огромная неповторимая страна, где проживает большое количество народов, каждый со своими интересными традициями: семейными, свадебными, кулинарными, которые представляют собой «мост», связывающий далеко прошлое с настоящим и поэтому многие традиции дошли и до наших дней.',
    picture: 'data/slider/anekdot.jpg',
    alt: 'Анекдот про кавказца (смешно)',
    link: '0',
  },
  {
    title: 'Бегающий гвоздь',
    text: 'Наиболее острые современные экологические проблемы Африки — это снижение плодородия почв, ускорение процессов эрозии, обезлесение, рост дефицита воды, ухудшение качества поверхностных вод и воздуха, вырубка вечнозеленых лесов, исчезновение видов растений и животных.',
    picture: 'data/slider/gvozd.jpg',
    alt: 'Гвоздь убегает',
    link: '1',
  },
  {
    title: 'Студент ДГТУ насрал в руку',
    text: 'По сообщениям очевидцев, студент ДГТУ пробрался на территорию общежитий ЮФУ, после чего снял штаны и стал бросаться в прохожих предметами, похожими на говно (предположительно фото "предмета" с личной страницы нападавшего). Обстоятельства произошедшего выясняются.',
    picture: 'data/slider/nasral.jpg',
    alt: 'Говно в руке',
    link: '2',
  },
  {
    title: 'Смерть Огузка (блять, 5 утра, чем я занимаюсь)',
    text: 'Сегодня был найден мертвым в ресторане Клод Моне один из работников - Максим "Огузок" Лавров.',
    picture: 'data/slider/oguzok.jpg',
    alt: 'НЕ Огузок в ахуе',
    link: '3',
  },
  {
    title: 'Это я на пикче',
    text: 'А может нахуй уник, в армию и на завод? Я так заебался, помогите. 5 утра, я какой то бесполезной, нахер никому не нужной хуйнёй маюсь. И вообще пива хочу или ягера. Ягера конечно лучше... Вот НГ будет нажрусь пздц',
    picture: 'data/slider/zavod.jpg',
    alt: 'Грустный думер не хочет работать на заводе',
    link: '4',
  },
];

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currentSlide = slides[getRandom(0, 4)];

document
  .querySelector('#slider__picture')
  .setAttribute('src', currentSlide.picture);
document
  .querySelector('#slider__picture')
  .setAttribute('alt', currentSlide.alt);

document.querySelector('.slider__title').textContent = currentSlide.title;
document.querySelector('.slider__text').textContent = currentSlide.text;
document.querySelector('#slider__to-article').setAttribute('href', currentSlide.link);
document.querySelector('#slider__to-article-mobile').setAttribute('href', currentSlide.link);
