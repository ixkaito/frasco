# Frasco [![GitHub release](https://img.shields.io/github/release/ixkaito/frasco.svg)](https://github.com/ixkaito/frasco/releases) [![Build Status](https://travis-ci.org/ixkaito/frasco.svg?branch=master)](https://travis-ci.org/ixkaito/frasco) [![license](https://img.shields.io/github/license/ixkaito/frasco.svg?maxAge=2592000)](https://github.com/ixkaito/frasco/blob/master/LICENSE)

__Jekyll starter project including full setup for gulp, Sass, Autoprefixer, Bourbon/Neat/Bitters, Webpack, imagemin, Browsersync, etc.__

## Features

- [gulp](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [Bourbon](http://bourbon.io/)/[Neat](http://neat.bourbon.io/)/[Bitters](http://bitters.bourbon.io/)
- [Webpack](https://webpack.github.io/)
- [UglifyJS](https://github.com/mishoo/UglifyJS2)
- [imagemin](https://github.com/imagemin/imagemin)
- [Browsersync](https://www.browsersync.io/)

## System Preparation

To use this starter project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer, Homebrew, etc.

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

### Development Mode

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting, etc.

```shell
$ npm start
```

Or, if you have installed gulp globally, this is also available and is same as `npm start`.

```shell
$ gulp
```

#### Build for Production

This will set the `JEKYLL_ENV` to `production` and use the production config file(s) set in `frasco.config.js` to override default settings.

```shell
$ npm run build-production
```

#### To See More Commands

This will display all available commands.

```shell
$ npm run
```

### Jekyll

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Configurations and Defaults

You can change the configurations by editing `frasco.config.js`

- ### port

    default: `4000`  
    options: integer  

- ### tasks

    Tasks to run when you exec `npm start` or `gulp` commands.

    - #### imagemin

        To minify images.

        default: `true`  
        options: boolean (`true` / `false`)

    - #### sass

        To compile Sass.

        default: `true`  
        options: boolean (`true` / `false`)

    - #### server

        To compile sources via Jekyll and to keep browsers in sync with file changes via Browsersync.

        default: `true`  
        options: boolean (`true` / `false`)

    - #### webpack

        To bundle JavaScript files.

        default: `true`  
        options: boolean (`true` / `false`)

- ### paths

    Settings about paths.

    - #### dest

        The destination directory for the whole project.

        default: `"_site"`  
        options: string

    - #### posts

        The directory of posts source files.

        default: `"_posts"`  
        options: string

    - #### assets

        The directory to gather all assets.

        default: `"./assets"`  
        options: string  
        example: `"./"` (directly under the theme direcotry)

    - #### css

        The CSS destination directory for Sass.

        default: `"css"`  
        options: string  
        example: `"stylesheets"`

    - #### js

        The JavaScript destination directory for Browserify.

        default: `"js"`  
        options: string  
        example: `"javascripts"`

    - #### images

        The destination directory of compressed image files for imagemin.

        default: `"images"`  
        options: string  
        example: `"img"`

    - #### sass

        The directory of Sass files.

        default: `"_sass"`  
        options: string  
        example: `"src/sass"`

    - #### jsSrc

        The directory of JavaScript source files to bundle up by Browserify.

        default: `"_js"`  
        options: string  
        example: `"src/js`"

    - #### imagesSrc

        The directory of image source files to compress.

        default: `"_images"`  
        options: string  
        example: `"src/images"`

- ### jekyll

    Jekyll settings.

    - #### config

        Jekyll config files.

        - ##### default

            The default Jekyll config file(s).

            default: `"_config.yml`  
            options: string (`"FILE1[,FILE2,...]"`)  
            example: `"_config1.yml,_config2.yml`

        - ##### development

            Development mode config file(s) to override default settings.

            default: `""`  
            options: string (`"FILE1[,FILE2,...]"`)  
            example: `"_config_development"`

        - ##### production

            Production mode config file(s) to override default settings.

            default: `""`  
            options: string (`"FILE1[,FILE2,...]"`)  
            example: `"_config_production"`

- ### sass

    Sass settings.

    - #### outputStyle

        The output style of Sass.

        default: `"compressed"`  
        options: `"expanded"`, `"nested"`, `"compact"`, `"compressed"`

- ### autoprefixer

    Autoprefixer settings.

    - #### browsers

        List of browsers, which are supported in your theme.

        default: `["> 1%", "last 2 versions", "Firefox ESR"]`  
        options: array. See [Browserslist docs](https://github.com/ai/browserslist#queries) for available queries.  
        example: `["> 5%", "last 2 versions", "IE 8"]`

- ### js

    JavaScript settings.

    - #### entry

        File name(s) of JavaScript entry points.

        default: `["main.js"]`  
        options: array  
        example: `["pluginA.js", "pluginB.js", "main.js"]`

## Copyright / License

Copyright © 2015-2016 the contributors of the Frasco project under the [MIT License](https://github.com/ixkaito/frasco/blob/master/LICENSE).
