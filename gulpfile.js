'use strict';

/**
 * Gulp modules
 */
var gulp         = require('gulp');
var newer        = require('gulp-newer');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var browserify   = require('browserify');
var watchify     = require('watchify');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var uglify       = require('gulp-uglify');
var watch        = require('gulp-watch');
var cp           = require('child_process');
var argv         = require('yargs').argv;

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Load configurations & set variables
var config = require('./frascoconfig.json');
var tasks  = [];
var build  = [];
var paths  = {};
var jsSrc  = [];

/**
 * All tasks
 */
Object.keys(config.tasks).forEach(function (key) {
  if (config.tasks[key]) {
    tasks.push(key);
  }
});

/**
 * Build tasks
 */
build = tasks.concat();
var index;
['server', 'watch'].forEach(function (value) {
  index = build.indexOf(value);
  if (index > -1) {
    build.splice(index, 1);
  }
});

/**
 * Paths
 */
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
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  var jekyllConfig = config.jekyll.config.default;
  if (argv.production) {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }
  return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
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
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('server', ['jekyll-build'], function() {
  return browserSync.init({
    port: config.port,
    server: {
      baseDir: config.paths.dest,
    }
  });
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

  if (config.tasks.sass) {
    watch(paths.sass + '/**/*', function () {
      gulp.start('sass');
    });
  }

  if (config.tasks['server']) {
    watch([
      '!./node_modules/**/*',
      '!./README.md',
      '!' + paths.dest + '/**/*',
      '_includes/**/*',
      '_layouts/**/*',
      '*.html',
      './**/*.md',
      './**/*.markdown',
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
 * Build for production
 */
gulp.task('build', build, function (done) {
  var jekyllConfig = config.jekyll.config.default;
  if (argv.production) {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }
  return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
    .on('close', done);
});

/**
 * Default task, running just `gulp` will minify the images, compile the sass, js, and jekyll site,
 * launch BrowserSync, and watch files. Tasks can be configured by frascoconfig.json.
 */
gulp.task('default', tasks);

/**
 * Test
 */
gulp.task('test', ['build']);
