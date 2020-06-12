const path = require('path')
const glob = require('glob')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const projectRoot = process.cwd()

const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(projectRoot, './src/view/*/index.js'))

  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index]
    const match = entryFile.match(/src\/view\/(.*)\/index\.js/)
    const pageName = match && match[1]

    entry[pageName] = entryFile
    return htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        inlineSource: '.css$',
        template: path.join(projectRoot, `./public/${pageName}.html`),
        filename: `${pageName}.html`,
        chunks: ['vendors', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    )
  })
  
  return {
    entry,
    htmlWebpackPlugins,
  }
}

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, 'dist'),
    filename:
      process.env.NODE_ENV === 'production'
        ? 'static/js/[name].[chunkhash:8].js'
        : 'static/js/[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.join(projectRoot, '/src'),
      'vue$': 'vue/dist/vue.runtime.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader, // 和 style-loader 无法同时使用
          'css-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75, // 1rem = 75px
              remPrecision: 8, // px 转换成 rem 之后的小数点位数
            },
          },
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4096,
              name: 'static/img/[name]_[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/font/[name]_[hash:8][ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name]_[contenthash:8].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(projectRoot, 'public'),
          to: path.join(projectRoot, 'dist'),
          toType: 'dir',
          globOptions: {
            ignore: ['**/*.html'],
          },
        },
      ],
    }),
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
}
