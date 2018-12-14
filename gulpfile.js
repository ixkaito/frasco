'use strict';

const config     = require('./frasco.config.js');
const gulp       = require('gulp');
// const requireDir = require('require-dir');
// const HubRegistry = require('gulp-hub');

/* load some files into the registry */
// var hub = new HubRegistry(['gulptasks/sass.js']);

/* tell gulp to use the tasks just loaded */
// gulp.registry(hub);

// requireDir('./gulptasks', {recurse: true});
// const sass = require('./gulptasks/sass.js');

// const tasks = [];
// Object.keys(config.tasks).forEach(function (key) {
//   if (config.tasks[key] && key != 'eslint') {
//     tasks.push((key == 'webpack' && config.tasks.watch) ? '_' + key : key);
//   }
// });

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
// exports.clean = clean;
// exports.styles = styles;
// exports.scripts = scripts;
// exports.watch = watch;

// exports.browser = gulp.series(jekyllBuild, browser);
// exports.reload = gulp.series(jekyllBuild, reload);
// exports.build = gulp.series(gulp.parallel(...build));
// exports.test = gulp.series(gulp.parallel(...build));
// exports.lint = lint;
// exports.image = image;
// exports.style = style;
// exports.watch = watch;

/**
 * Default task, running just `gulp` will minify the images,
 * compile the sass, bundle the js, launch BrowserSync, and
 * watch files.
 */
// exports.default = gulp.series(gulp.parallel(...tasks));


/**
 * Browsersync
 */
const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const cp          = require('child_process');

function browser() {
  return browsersync.init({
    port: config.port,
    browser: (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default',
    server: {
      baseDir: config.jekyll.dest,
    }
  });
}

function reload() {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
}

exports.browser = gulp.series(jekyllBuild, browser);
exports.reload = gulp.series(jekyllBuild, reload);

/**
 * Sass
 */
const autoprefixer = require('autoprefixer');
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

exports.sass = sass;

/**
 * build
 */
let jekyll        = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

let build = [];
Object.keys(config.tasks).forEach(function (key) {
  if (config.tasks[key] && key != 'browsersync' && key != 'watch') {
    build.push(key);
  }
});
build.push('jekyll-build');

/**
 * Build the Jekyll Site
 */
function jekyllBuild(done) {
  let jekyllConfig = config.jekyll.config.default;
  if (argv.jekyllEnv == 'production') {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }
  return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
    .on('close', done);
}

/**
 * Build task, this will minify the images, compile the sass,
 * bundle the js, but not launch BrowserSync and watch files.
 */
// gulp.task('build', gulp.series(gulp.parallel(...build)));

/**
 * Test task, this use the build task.
 */
// gulp.task('test', gulp.series(gulp.parallel(...build)));

/**
 * eslint
 */
const gulpEslint = require('gulp-eslint');

function eslint () {
  return gulp.src([config.assets + '/' + config.js.src + '/**/*.js', '!node_modules/**'])
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpEslint.failOnError());
}

/**
 * imagemin
 */
const gulpImagemin = require('gulp-imagemin');
const newer    = require('gulp-newer');
const plumber  = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');

function imagemin () {
  return gulp.src(config.assets + '/' + config.imagemin.src + '/**/*')
    .pipe(plumber())
    .pipe(newer(config.assets + '/' + config.imagemin.dest))
    .pipe(gulpImagemin({
      progressive: config.imagemin.progressive,
      svgoPlugins: config.imagemin.svgoPlugins,
      use:         [pngquant()],
    }))
    .pipe(gulp.dest(config.assets + '/' + config.imagemin.dest));
}

exports.imagemin = imagemin;

/**
 * watch
 */
const gulpWatch     = require('gulp-watch');

function watch() {
  //   gulpWatch(config.assets + '/' + config.imagemin.src + '/**/*', function () {
  //     gulp.series(imagemin);
  //   });
  // }

  // gulp.watch(config.assets + '/' + config.imagemin.src + '/**/*', function () {
  //   gulp.series(imagemin);
  // });

  if (config.tasks.imagemin) {
    gulp.watch(config.assets + '/' + config.imagemin.src + '/**/*', gulp.series(imagemin));
  }

  if (config.tasks.sass) {
    gulp.watch(config.assets + '/' + config.sass.src + '/**/*', gulp.series(sass));
  }

  if (config.tasks.browser) {
    gulp.watch([
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
    ], gulp.series(jekyllBuild, reload));
  }
}

exports.watch = watch;

/**
 * Webpack
 */
const babel         = require('gulp-babel');
const named         = require('vinyl-named');
const webpackStream = require('webpack-stream');
const webpack       = require('webpack');

let entry = [];
for (var i = 0; i <= config.js.entry.length - 1; i++) {
  entry.push(config.assets + '/' + config.js.src + '/' + config.js.entry[i]);
}

if (config.tasks.eslint) config.webpack.module.rules.push(config.eslintLoader);

config.webpack.watch = argv.watch;
config.webpack.mode = argv.mode || config.webpack.mode;

gulp.task('webpack', function () {
  return gulp.src(entry)
    .pipe(plumber())
    .pipe(named())
    .pipe(babel())
    .pipe(webpackStream(config.webpack, webpack))
    .pipe(gulp.dest(config.assets + '/' + config.js.dest));
});

// For internal use only
gulp.task('_webpack', function () {
  config.webpack.watch = config.tasks.watch;
  gulp.series('webpack');
});

exports.default = gulp.series(gulp.parallel(sass, webpack, imagemin), gulp.parallel(browser, watch));
