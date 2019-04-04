const argv   = require('yargs').argv;
const config = require('../frasco.config.js');
const cp     = require('child_process');
const gulp   = require('gulp');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const build  = Object.keys(config.tasks).filter((key) => config.tasks[key] && !['browsersync', 'watch'].includes(key))
build.push('jekyll-build');

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  let jekyllConfig = config.jekyll.config.default;
  if (argv.jekyllEnv == 'production') {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }
  return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
    .on('close', done);
});

/**
 * Build task, this will minify the images, compile the sass,
 * bundle the js, but not launch BrowserSync and watch files.
 */
gulp.task('build', build);

/**
 * Test task, this use the build task.
 */
gulp.task('test', build);
