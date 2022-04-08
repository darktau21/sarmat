const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const jsImport = require('gulp-js-import');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const sassglob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagecomp = require('gulp-imagemin');
const concat = require('gulp-concat');
const del = require('del');

function browsersync() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    notify: false,
    online: true,
  });
}

function scripts() {
  return src(['src/js/*.js'])
  .pipe(sourcemaps.init())
  .pipe(jsImport({hideConsole: false}))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream());
}

function styles() {
  return src('src/sass/main.sass')
    .pipe(sassglob())
    .pipe(sass({ 'include css': true }))
    .pipe(autoprefixer())
    .pipe(
      cleancss({
        level: { 1: { specialComments: 0 } }
      })
    )
    .pipe(concat('styles.min.css'))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

async function images() {
  return src('src/img/*.{jpg,jpeg,png,gif}')
    .pipe(
      imagecomp([
        imagecomp.gifsicle({ interlaced: true }),
        imagecomp.mozjpeg({ quality: 85, progressive: true }),
        imagecomp.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(dest('dist/img/'));
}

async function uploadimg() {
  return src('src/uploads/**/*.{jpg,jpeg,png,gif}')
    .pipe(
      imagecomp([
        imagecomp.gifsicle({ interlaced: true }),
        imagecomp.mozjpeg({ quality: 75, progressive: true }),
        imagecomp.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(dest('dist/uploads/'));
}

async function copywebp() {
  return src('src/img/**/*.webp').pipe(dest('dist/img/'));
}

async function copyfav() {
  return src('src/favicons/**/*').pipe(dest('dist/favicons/'));
}

async function copysvg() {
  return src('src/img/**/*.svg').pipe(dest('dist/img/'));
}

async function copyhtml() {
  return src('src/**/*.html').pipe(dest('dist/'));
}

async function copyfonts() {
  return src('src/fonts/**/*').pipe(dest('dist/fonts/'));
}

function cleandist() {
  return del('dist/**/*', { force: true });
}

function startwatch() {
  watch('src/**/*.js', scripts);
  watch('src/**/*.sass', styles);
  watch('src/fonts/**/*', copyfonts);
  watch('src/img/**/*.{jpg,jpeg,png,gif}', images);
  watch('src/uploads/**/*.{jpg,jpeg,png,gif}', uploadimg);
  watch('src/img/**/*.webp', copywebp);
  watch('src/img/**/*.svg', copysvg);
  watch('src/favicons/**/*', copyfav);
  // watch('src/**/*.{jpg,jpeg,png,svg,gif}', dataimg);
  watch('src/**/*.html', copyhtml).on(
    'change',
    series(copyhtml, browserSync.reload)
  );
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.uploadimg = uploadimg;
exports.copywebp = copywebp;
exports.copysvg = copysvg;
exports.copyfav = copyfav;
exports.copyfonts = copyfonts;
exports.copyhtml = copyhtml;
exports.cleandist = cleandist;

exports.default = parallel(
  copyhtml,
  copyfonts,
  images,
  uploadimg,
  copywebp,
  copysvg,
  copyfav,
  styles,
  scripts,
  browsersync,
  startwatch
);

exports.build = series(
  cleandist,
  copyhtml,
  copyfonts,
  images,
  uploadimg,
  copywebp,
  copysvg,
  copyfav,
  styles,
  scripts
);