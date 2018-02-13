const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const config      = require('../frasco.config.js');
const cp          = require('child_process');
const gulp        = require('gulp');

let browser = (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default';

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browsersync', ['jekyll-build'], function () {
  return browsersync.init({
    port: config.port,
    browser: browser,
    server: {
      baseDir: config.jekyll.dest,
    }
  });
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('browser-reload', ['jekyll-build'], function () {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
});
