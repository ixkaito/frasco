const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const config      = require('../frasco.config.js');
const cp          = require('child_process');
const gulp        = require('gulp');

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  const jekyllConfig = config.jekyll.config.default;
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
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('server', ['jekyll-build'], function () {
  return browsersync.init({
    port: config.port,
    browser: config.browsersync.browsers,
    server: {
      baseDir: config.jekyll.dest,
    }
  });
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
});
