---
layout: index
title: 'Frasco: Jekyll Quick Starter'
---

## System Preparation

To use this Jekyll starter, you'll need the following things installed on your machine.

1. [**Ruby**](https://www.ruby-lang.org/en/){:target="_blank" :rel="noopener"}
2. [**Node.js**](https://nodejs.org){:target="_blank" :rel="noopener"}

## Local Installation

1. Clone the repo, or download it into a directory of your choice.

   ```shell
   $ git clone https://github.com/ixkaito/frasco.git
   ```
   [Create a new repository from frasco](https://github.com/ixkaito/frasco/generate)
   or
   [Download ZIP](https://github.com/ixkaito/frasco/archive/master.zip)

2. Inside the directory, run `npm install` or `yarn`.

   ```shell
   $ cd /path/to/frasco
   $ npm install # or yarn
   ```

## Usage

### Start to Develop

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting, etc.

```shell
$ npm run dev # or yarn dev
```

### Build for Production

This will set the `JEKYLL_ENV` to `production` to generate files.

```shell
$ npm run build # or yarn build
```

## What's in Frasco

- [Sass](http://sass-lang.com/)
- [Autoprefixer](https://github.com/postcss/autoprefixer)
- [PostCSS](http://postcss.org/)
- [stylelint](https://stylelint.io/)
- [Webpack](https://webpack.js.org/)
- [ESLint](https://eslint.org/)
- [imagemin](https://github.com/imagemin/imagemin)
- [Browsersync](https://www.browsersync.io/)

## Configurations and Defaults

You can modify the configurations by editing `config` in `package.json`.

### Default

```json
"config": {
  "browsersync": {
    "port": 4000
  },
  "image": {
    "src": "assets/_src/images",
    "dist": "assets/images"
  },
  "js": {
    "entry": "bundle.js",
    "src": "assets/_src/js",
    "dist": "assets/js"
  },
  "css": {
    "src": "assets/_src/sass",
    "dist": "assets/css",
    "style": "compressed",
    "map": "--map"
  },
  "jekyll": {
    "config": {
      "default": "_config.yml",
      "development": "_config.dev.yml"
    }
  }
}
```