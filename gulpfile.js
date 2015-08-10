var gulp        = require('gulp');
var browserSync = require('browser-sync');
var compass     = require('gulp-compass');
var plumber     = require('gulp-plumber');
var cp          = require('child_process');

var config = {
  port: 4000,
  messages: {
    jekyllRebuild: 'Rebuilded Jekyll'
  },
  paths: {
    dest:   '_site',
    posts:  '_posts',
    assets: 'assets',
    css:    'assets/css',
    sass:   'assets/_sass'
  },
  compass: {
    config:   './config.rb',
    style:    'compressed',
    comments: false
  }
};

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('server', ['compass', 'jekyll-build'], function() {
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
  browserSync.notify(config.messages.jekyllRebuild);
  browserSync.reload();
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('compass', function () {
  gulp.src(config.paths.sass + '/**/*')
    .pipe(plumber())
    .pipe(compass({
      config_file: config.compass.config,
      style: config.compass.style,
      comments: config.compass.comments,
      css: config.paths.css,
      sass: config.paths.sass
    }));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(config.paths.sass + '/**/*', ['compass']);
  gulp.watch([
    '!./node_modules/**/*',
    '!./.sass-cache/**/*',
    '!' + config.paths.dest + '/**/*',
    '!' + config.paths.sass + '/**/*',
    './**/*.html',
    './**/*.md',
    config.paths.posts + '/**/*',
    config.paths.assets + '/**/*'
  ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['server', 'watch']);
