const config        = require('../frasco.config.js');
const gulp          = require('gulp');
const watch         = require('gulp-watch');

gulp.task('watch', function () {
  if (config.tasks.imagemin) {
    watch(config.assets + '/' + config.imagemin.src + '/**/*', function () {
      gulp.start('imagemin');
    });
  }

  if (config.tasks.sass) {
    watch(config.assets + '/' + config.sass.src + '/**/*', function () {
      gulp.start('sass');
    });
  }

  if (config.tasks.browsersync) {
    watch([
      '!./node_modules/**/*',
      '!./README.md',
      '!' + config.jekyll.dest + '/**/*',
      '_config*.yml',
      './**/*.html',
      './**/*.md',
      './**/*.markdown',
      config.jekyll.data + '/**/*',
      config.assets + '/' + config.sass.dest + '/**/*',
      config.assets + '/' + config.js.dest + '/**/*',
      config.assets + '/' + config.imagemin.dest + '/**/*'
    ], function () {
      gulp.start('browser-reload');
    });
  }
});
