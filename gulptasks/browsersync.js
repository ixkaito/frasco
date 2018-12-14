const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const config      = require('../frasco.config.js');
const cp          = require('child_process');
const gulp        = require('gulp');

/**
 * Start Browsersync
 */
function browser() {
  return browsersync.init({
    port: config.port,
    browser: (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default',
    server: {
      baseDir: config.jekyll.dest,
    }
  });
}

/**
 * Rebuild Jekyll & do page reload
 */
function reload() {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
}
