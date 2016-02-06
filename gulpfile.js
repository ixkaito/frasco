'use strict';

/**
 * Gulp modules
 */
var gulp         = require('gulp');
var newer        = require('gulp-newer');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var compass      = require('gulp-compass');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');
var cp           = require('child_process');

// Load configurations set variables
var config = require('./gulpconfig.json');
var tasks = [];
var paths = {};
var jsSrc = [];
var build = [];

if (config.tasks.compass) {
  config.tasks.sass = false;
}

Object.keys(config.tasks).forEach(function (key) {
  if (config.tasks[key]) {
    tasks.push(key);
  }
});

Object.keys(config.paths).forEach(function (key) {
  if (key != 'assets') {
    if (config.paths.assets === '') {
      paths[key] = './' + config.paths[key];
    } else {
      paths[key] = config.paths.assets + '/' + config.paths[key];
    }
  }
});

for (var i = 0; i <= config.js.src.length - 1; i++) {
  jsSrc.push(paths.jsSrc + '/' + config.js.src[i]);
}

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('jekyll', ['jekyll-build'], function() {
  browserSync({
    port: config.port,
    server: {
      baseDir: config.paths.dest,
    }
  });
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.notify('Rebuilded Jekyll');
  browserSync.reload();
});

/**
 * Sass
 */
gulp.task('sass', function () {
  return gulp.src(paths.sass + '/**/*')
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({outputStyle: config.sass.outputStyle}))
    .pipe(autoprefixer({ browsers: config.autoprefixer.browsers }))
    .pipe(gulp.dest(paths.css));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('compass', function () {
  return gulp.src(paths.sass + '/**/*')
    .pipe(plumber())
    .pipe(compass({
      config_file: config.compass.config,
      style: config.compass.style,
      comments: config.compass.comments,
      css: paths.css,
      sass: paths.sass,
      image: paths.images
    }));
});

/**
 * Imagemin
 */
gulp.task('imagemin', function () {
  return gulp.src(paths.imagesSrc + '/**/*')
    .pipe(plumber())
    .pipe(newer(paths.images))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.images));
});

/**
 * Browserify and Watchify
 */
gulp.task('browserify', function () {
  return compile(false);
});

gulp.task('watchify', function () {
  return compile(true);
});

function compile(watching) {
  var b = browserify(jsSrc);
  if (watching) {
    b = watchify(b);
  }

  function bundle() {
    return b.bundle()
      .pipe(source(config.js.dist))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest(paths.js));
  }

  b.on('update', function () {
    bundle();
  });

  return bundle();
}

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', ['watchify'], function () {
  if (config.tasks.imagemin) {
    watch(paths.imagesSrc + '/**/*', function () {
      gulp.start('imagemin');
    });
  }

  if (config.tasks.compass) {
    watch(paths.sass + '/**/*', function () {
      gulp.start('compass');
    });
  } else if (config.tasks.sass) {
    watch(paths.sass + '/**/*', function () {
      gulp.start('sass');
    });
  }

  if (config.tasks['jekyll']) {
    watch([
      '!./node_modules/**/*',
      '!./README.md',
      '!' + paths.dest + '/**/*',
      '_includes/**/*',
      '_layouts/**/*',
      '_posts/**/*',
      '*.html',
      './**/*.md',
      paths.posts + '/**/*',
      paths.css + '/**/*',
      paths.js + '/**/*',
      paths.images + '/**/*'
    ], function () {
      gulp.start('jekyll-rebuild');
    });
  }
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', tasks);
