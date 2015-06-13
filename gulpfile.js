var gulp        = require('gulp');
var browserSync = require('browser-sync');
var compass     = require('gulp-compass');
var plumber     = require('gulp-plumber');
var cp          = require('child_process');

var messages = {
  jekyllRebuild: 'Rebuilded Jekyll'
};

var port      = 4000;
var destDir   = '_site';
var postsDir  = '_posts';
var assetsDir = 'assets';
var assetsCss = 'assets/css';
var assetsSass = 'assets/_sass';

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('server', ['compass', 'jekyll-build'], function() {
  browserSync({
    port: port,
    server: {
      baseDir: destDir,
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
  gulp.src(assetsSass + '/**/*')
    .pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      comments: false,
      css: assetsCss,
      sass: assetsSass
    }));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(assetsSass + '/**/*', ['compass']);
  gulp.watch([
    '!' + destDir + '/**/*',
    '!' + assetsSass + '/**/*',
    './**/*.html',
    './*.md',
    postsDir + '/**/*',
    assetsDir + '/**/*'
  ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['server', 'watch']);
