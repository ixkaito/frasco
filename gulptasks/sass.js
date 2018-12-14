const autoprefixer = require('autoprefixer');
const config       = require('../frasco.config.js');
const gulp         = require('gulp');
const gulpPostcss  = require('gulp-postcss');
const gulpSass     = require('gulp-sass');

function sass() {
  return gulp.src(config.assets + '/' + config.sass.src + '/**/*')
    .pipe(gulpSass({outputStyle: config.sass.outputStyle}).on('error', gulpSass.logError))
    .pipe(gulpPostcss([
      autoprefixer({
        browsers: config.sass.autoprefixer.browsers
      })
    ]))
    .pipe(gulp.dest(config.assets + '/' + config.sass.dest));
};

gulp.task('sass', sass);

// exports.sass = sass;
