module.exports = {
  port: 4000,

  tasks: {
    browsersync: true,
    eslint:      true,
    imagemin:    true,
    sass:        true,
    watch:       true,
    webpack:     true,
  },

  assets: './assets',

  browsersync: {
    browsers: [
      // "Google Chrome Canary",
      // "Google Chrome",
      // "Firefox Nightly",
      // "Firefox Developer Edition",
      // "Firefox",
      // "Safari Technology Preview",
      // "Safari",
      // "Opera",
      // "Opera Developer",
    ],
  },

  eslintLoader: {
    enforce: "pre",
    test:    /\.js$/,
    exclude: /node_modules/,
    loader:  "eslint-loader",
  },

  imagemin: {
    src:         '_images',
    dest:        'images',
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
  },

  jekyll: {
    config: {
      default:     '_config.yml',
      development: '_config_development.yml',
      production:  '',
    },
    dest:     '_site',
    data:     '_data',
  },

  js: {
    src:   '_js',
    dest:  'js',
    entry: [
      'bundle.js',
    ],
  },

  sass: {
    src:          '_sass',
    dest:         'css',
    outputStyle:  'compressed',
    autoprefixer: {
      browsers: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
      ],
    },
  },

  webpack: {
    mode:   'production',
    module: {
      rules: [],
    },
  },
}
