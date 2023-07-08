const { src, dest, watch, series, parallel, gulp } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

function server() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  });
  watch('src/*.html').on('change', browserSync.reload);
}

function compileScss() {
  return src('src/sass/**/*.+(scss|sass)')
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function watchFiles() {
  watch('src/sass/**/*.+(scss|sass)', compileScss);
}

exports.server = server;
exports.compileScss = compileScss;
exports.watch = watchFiles;
exports.default = parallel(compileScss, server, watchFiles);
