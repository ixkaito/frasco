const config        = require('../frasco.config.js');
const gulp          = require('gulp');
const gulpWatch     = require('gulp-watch');

function watch() {
  if (config.tasks.imagemin) {
    gulpWatch(config.assets + '/' + config.imagemin.src + '/**/*', function () {
      gulp.series('imagemin');
    });
  }

  if (config.tasks.sass) {
    gulpWatch(config.assets + '/' + config.sass.src + '/**/*', function () {
      gulp.series('sass');
    });
  }

  if (config.tasks.browsersync) {
    gulpWatch([
      '!./node_modules/**/*',
      '!./README.md',
      '!' + config.jekyll.dest + '/**/*',
      '_config*.yml',
      '*.html',
      './**/*.md',
      './**/*.markdown',
      config.jekyll.includes + '/**/*',
      config.jekyll.layouts + '/**/*',
      config.jekyll.posts + '/**/*',
      config.assets + '/' + config.sass.dest + '/**/*',
      config.assets + '/' + config.js.dest + '/**/*',
      config.assets + '/' + config.imagemin.dest + '/**/*'
    ], function () {
      gulp.series('browser-reload');
    });
  }
}
