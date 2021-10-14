const isDev = process.env.NODE_ENV === 'development'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  env: {
    baseUrl: (process.env.BASE_URL || 'https://rickandmortyapi.com/api')
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'testTask',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ress'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/axios',
    { src: '~/plugins/vuex-persist', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  axios: {},

  loading: false,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },

    publicPath: process.env.PUBLIC_PATH || '/_nuxt/',

    extractCSS: false,

    loaders: {
      cssModules: {
        modules: {
          localIdentName: isDev ? '[local]_[hash:base64:4]' : '[hash:base64:6]',
        },
      },
    },

    optimizeCSS: false,

    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : 'js/' + time + '.[contenthash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/' + time + '.[contenthash].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'css/' + time + '.[contenthash].css'),
      img: ({ isDev }) => (isDev ? '[path][name].[ext]' : 'img/' + time + '.[contenthash:7].[ext]'),
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/' + time + '.[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/' + time + '.[contenthash:7].[ext]',
    },

    ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          processConditionalComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          trimCustomFragments: true,
          useShortDoctype: true,
        },
      },
    }),

    cache: true,

    splitChunks: {
      layouts: false,
      pages: false,
      commons: false,
    },

    optimization: {
      minimize: !isDev,
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  }
}
