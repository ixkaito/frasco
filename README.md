# Frasco

__Jekyll starter project for Gulp with Bourbon/Neat/Bitters, etc.__

## Version

0.2.0

## Features

- Gulp
- Sass
- Autoprefixer
- Bourbon
- Neat
- Bitters
- Imagemin
- Browserify
- Watchify
- UglifyJS
- Browser-Sync

Bourbon is a lightweight Sass framework. If you don't use it, it will do nothing to your CSS file.

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer, Homebrew, etc.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (Mac users may need sudo)

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

### Development Mode

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc etc.

```shell
$ gulp
```

### Jekyll

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Deploy with Gulp

You can easily deploy your site build to a gh-pages branch. First, follow the instructions at [gulp-gh-pages](https://github.com/rowoot/gulp-gh-pages) to get your branch prepared for the deployment and to install the module. Then, in `gulpfile.js` you'll want to include something like the code below. `gulp.src()` needs to be the path to your final site folder, which by default will be `_site`. If you change the `destination` in your `_config.yml` file, be sure to reflect that in your gulpfile.

```javascript
var deploy = require("gulp-gh-pages");

gulp.task("deploy", ["jekyll-build"], function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy());
});
```

## Configurations and Defaults

You can change the configuration by editing `gulpconfig.json`

### port

default: `4000`  
options: integer  

### tasks

Tasks to run when you exec `gulp` command.

#### sass

To compile Sass.

default: `true`  
options: boolean (`true` / `false`)

#### browserify

To use Browserify.

default: `true`  
options: boolean (`true` / `false`)

#### imagemin

To minify images.

default: `true`  
options: boolean (`true` / `false`)

#### jekyll

To compile sources via Jekyll and to keep browsers in sync with file changes via Browsersync.

default: `true`  
options: boolean (`true` / `false`)

#### watch

To watch files and run tasks on file changes.

### paths

Settings about paths.

#### dest

The destination directory for the whole project.

default: `"_site"`  
options: string

#### posts

The directory of posts source files.

default: `"_posts"`  
options: string

#### assets

The directory to gather all assets.

default: `"./assets"`  
options: string  
example: `"./"` (directly under the theme direcotry)

#### css

The CSS destination directory for Sass.

default: `"css"`  
options: string  
example: `"stylesheets"`

#### js

The JavaScript destination directory for Browserify.

default: `"js"`  
options: string  
example: `"javascripts"`

#### images

The destination directory of compressed image files for Imagemin.

default: `"images"`  
options: string  
example: `"img"`

#### sass

The directory of Sass files.

default: `"_sass"`  
options: string  
example: `"src/sass"`

#### jsSrc

The directory of JavaScript source files to bundle up by Browserify.

default: `"_js"`  
options: string  
example: `"src/js`"

#### imageSrc

The directory of image source files to compress.

default: `"_images"`  
options: string  
example: `"src/images"`

### sass

Sass settings.

#### outputStyle

The output style of Sass.

default: `"compressed"`  
options: `"expanded"`, `"nested"`, `"compact"`, `"compressed"`

### autoprefixer

Autoprefixer settings.

#### browsers

List of browsers, which are supported in your theme.

default: `["> 1%", "last 2 versions", "Firefox ESR"]`  
options: array. See [Browserslist docs](https://github.com/ai/browserslist#queries) for available queries.
example: `["> 5%", "last 2 versions", "IE 8"]`

### js

JavaScript settings.

#### src

File name(s) of JavaScript source file(s).

default: `["main.js"]`  
options: array  
example: `["pluginA.js", "pluginB.js", "main.js"]`

#### dist

The distribution JavaScript file name.

default: `"main.js"`  
options: string  
example: `"script.js"`

## Copyright / License

Copyright &copy; 2015-2016 the contributors of the Frasco project under the [GPL version 2](https://raw.githubusercontent.com/ixkaito/frasco/master/LICENSE) or later.
