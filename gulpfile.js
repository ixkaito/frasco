var gulp        = require('gulp');
var browserSync = require('browser-sync');
var compass     = require('gulp-compass');
var plumber     = require('gulp-plumber');
var cp          = require('child_process');

var messages = {
  jekyllRebuild: 'Rebuilded Jekyll'
};

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('server', ['compass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
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
  browserSync.notify(messages.jekyllRebuild);
  browserSync.reload();
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('compass', function () {
  gulp.src('./assets/_sass/**/*')
    .pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      comments: false,
      css: 'assets/css/',
      sass: 'assets/_sass/'
    }));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('./assets/_sass/**/*', ['compass']);
  gulp.watch([
    './**/*.html',
    './*.md',
    '_posts/**/*',
    './assets/**/*',
    '!./assets/_sass/**/*'
  ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['server', 'watch']);
