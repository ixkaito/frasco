const config = require('../frasco.config.js');
const eslint = require('gulp-eslint');
const gulp   = require('gulp');

function lint () {
  return gulp.src([config.assets + '/' + config.js.src + '/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}
