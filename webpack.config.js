const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const folders = [
    'index',
    'musee',
    'belgisch',
    'stading',
    'crush',
    'contact',

  ]
  const mapFolders = folders.map(filename => {
    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `./src/${filename}.html`),
        filename: `${filename}.html`,
        minify: true,
        meta : {
          'og:title': { property: 'og:title', content: 'Design Museum Brussels' },
          'og:description': { property: 'og:description', content: 'Site sur le musée Design Museum Brussels' },
          'og:type': { property: 'og:type', content: 'website' },
          'og:url': { property: 'og:url', content: 'https://design-museum.netlify.app/' },
          'og:image': { property: 'og:image', content: 'https://design-museum.netlify.app/assets/img/card_meta.jpg' },
          'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
          'twitter:title': { name: 'twitter:title', content: 'Design Museum Brussels' },
          'twitter:description': { name: 'twitter:description', content: 'Site sur le musée Design Museum Brussels' },
          'twitter:image': { name: 'twitter:image', content: 'https://design-museum.netlify.app/assets/img/card_meta.jpg' }
        }
    })
  })

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/assets/js/script.js'),
  output: {
    filename: 'assets/js/[contenthash:7].js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '/dist'),
    },
    compress: true,
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(jpg|png|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[contenthash:7][ext]'
        }
      },
      {
        test: /\.(ttf|eot|otf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[contenthash:7][ext]'
        }
      },
      {
        test: /\.webmanifest$/i,
        use: 'webpack-webmanifest-loader',
        type: 'asset/resource',
        generator: {
            filename: './[contenthash:7][ext]'
          }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                [
                  'postcss-preset-env',
                  'autoprefixer',
                ]
              ]
            }
          }
        }, 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/style/style.css'
  })
  ].concat(mapFolders)
}