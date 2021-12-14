// ----------------[ Константы и переменные ]----------------
// Здесь подключаются все плагины, и определяются важные константы
const { src, dest, parallel, series, watch } = require('gulp'); // Определяем константы Gulp
const browserSync = require('browser-sync').create(); // Подключаем Browsersync и создаём новое подключение
const concat = require('gulp-concat'); // Нужен для объединения множества файлов в один
const babel = require('gulp-babel'); // Компилятор JS
const uglify = require('gulp-uglify-es').default; // Сжимает JS
const pugcomp = require('gulp-pug'); // Препроцессор HTML
const pugInclude = require('pug-include-glob'); // Позволяет импортировать все инклуды
const sass = require('gulp-sass')(require('sass')); // Препроцессор CSS
const sassglob = require('gulp-sass-glob'); // Препроцессор CSS
const autoprefixer = require('gulp-autoprefixer'); // Автодобавление вендорных префиксов свойствам
const cleancss = require('gulp-clean-css'); // Сжатие CSS
const imagecomp = require('compress-images'); // Сжатие и оптимизация изображений
const ttf2woff2 = require('gulp-ttf2woff2'); // Конвертирует шрифты
const del = require('del'); // Удаление файлов и  папок

// ----------------[ Функции ]----------------
// Функция, определяющая логику работы Browsersync
function browsersync() {
  browserSync.init({
    // Инициализация Browsersync
    server: { baseDir: 'dist/' }, // Указываем папку сервера
    notify: false, // Отключаем уведомления в браузере (они бесят и никакой полезной инфы не несут)
    online: true, // Онлайн режим, если нет интернета, ставим false
  });
}

// Препроцессор HTML
function pug() {
  return src('src/pages/**/*.pug')
    .pipe(pugcomp({ plugins: [pugInclude()] }))
    .pipe(dest('dist/'));
}

// Работа со скриптами
function scripts() {
  return src(['src/index.js']) // Подрубаем главный скрипт, различные библиотеки так же подключаем здесь, в начале массива
    .pipe(
      babel({
        presets: ['@babel/preset-env'], // Компилятор, преобразует код из синтаксиса новых версий ES в старые, чем обеспечивает совместимость со старыми браузерами
      })
    )
    .pipe(concat('bundle.min.js')) // Объединяем в один файл (файл всего один, поэтому эта строчка здесь чисто на всякий случай)
    .pipe(uglify()) // Сжимаем JS
    .pipe(dest('dist/')) // Выгружаем
    .pipe(browserSync.stream()); // Триггерим Browsersync шоб он обновил страницу в браузере
}

// Стили
function styles() {
  return src('src/sass/main.sass') // Выбираем источник
    .pipe(sassglob()) // Подрубаем плагин для подключения сразу кучи файлов (поддержка путей вида /papka/**/*)
    .pipe(sass({ 'include css': true })) // Подрубаем препроцессор
    .pipe(concat('styles.min.css')) // Собираем все файлы в один (в данном случае таким образом просто задаём имя файлу)
    .pipe(autoprefixer()) // Создадим префиксы с помощью Autoprefixer
    .pipe(
      // Минифицируем стили
      cleancss({
        level: { 1: { specialComments: 0 } } /* , format: 'beautify' */,
      })
    )
    .pipe(dest('dist/')) // Выгрузим результат в папку "dist/css/"
    .pipe(browserSync.stream()); // Сделаем инъекцию в браузер
}

// Картинки
async function images() {
  imagecomp(
    'src/includes/**/*.{jpeg,png,svg,gif}', // Берём все изображения из папки источника
    'dist/img/', // Выгружаем оптимизированные изображения в папку назначения
    // Настраиваем основные параметры
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    // Сжимаем и оптимизируем изображеня
    { jpg: { engine: 'mozjpeg', command: ['-quality', '75'] } },
    { png: { engine: 'pngquant', command: ['--quality=75-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    {
      gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] },
    },
    function (err, completed) {
      // Обновляем страницу по завершении
      if (completed === true) {
        browserSync.reload();
      }
    }
  );
}
async function uploads() {
  imagecomp(
    'src/uploads/**/*.{jpeg,png,svg,gif}', // Берём все изображения из папки источника
    'dist/uploads/', // Выгружаем оптимизированные изображения в папку назначения
    // Настраиваем основные параметры
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    // Сжимаем и оптимизируем изображеня
    { jpg: { engine: 'mozjpeg', command: ['-quality', '80'] } },
    { png: { engine: 'pngquant', command: ['--quality=80-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    {
      gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] },
    },
    function (err, completed) {
      // Обновляем страницу по завершении
      if (completed === true) {
        browserSync.reload();
      }
    }
  );
}

async function assets() {
  imagecomp(
    'src/assets/**/*.{jpeg,png,svg,gif}', // Берём все изображения из папки источника
    'dist/assets/', // Выгружаем оптимизированные изображения в папку назначения
    // Настраиваем основные параметры
    { compress_force: false, statistic: true, autoupdate: true },
    false,
    // Сжимаем и оптимизируем изображеня
    { jpg: { engine: 'mozjpeg', command: ['-quality', '80'] } },
    { png: { engine: 'pngquant', command: ['--quality=80-100', '-o'] } },
    { svg: { engine: 'svgo', command: '--multipass' } },
    {
      gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] },
    },
    function (err, completed) {
      // Обновляем страницу по завершении
      if (completed === true) {
        browserSync.reload();
      }
    }
  );
}

// Шрифты
function fonts() {
  return src('src/fonts/**/*.ttf')
    .pipe(ttf2woff2({ clone: true }))
    .pipe(dest('dist/fonts/'));
}

// Очистка
function cleandist() {
  return del('dist/**/*', { force: true }); // Удаляем все содержимое папки "dist"
}

// Функция для слежки за изменением файлов
function startwatch() {
  watch('src/**/*.js', scripts);
  watch('src/**/*.sass', styles);
  watch('src/includes/**/*.{jpg,jpeg,png,svg,gif}', imagecomp);
  watch('src/uploads/**/*.{jpg,jpeg,png,svg,gif}', uploads);
  watch('src/assets/**/*.{jpg,jpeg,png,svg,gif}', assets);
  watch('src/fonts/**/*', fonts);
  watch('src/**/*.pug', pug).on('change', series(pug, browserSync.reload));
}

// ----------------[ Экспорты в Gulp ]----------------
/* Чтобы Gulp увидел функцию, её нужно ему передать, что и делают строки ниже
 * Каждая переданная функция может быть вызвана из консоли командой gulp [название функции]
 * Например gulp browsersync (запустит локальный сервер и откроет автообновляемую страницу в браузере)
 */
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.pug = pug;
exports.styles = styles;
exports.images = images;
exports.uploads = uploads;
exports.fonts = fonts;
exports.assets = assets;
exports.cleandist = cleandist;
// Дефолтный таск (запускает перечисленные функции командой gulp без всяких аргументов)
exports.default = parallel(
  fonts,
  images,
  pug,
  styles,
  scripts,
  browsersync,
  startwatch
);

exports.build = series(cleandist, uploads, images, fonts, pug, styles, scripts);
