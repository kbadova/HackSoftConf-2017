const path = require('path');

module.exports = function (config) {
  return {
    entry: {
      bookingCreate: './src/BookingCreate.jsx',
    },
    output: {
      filename: config.DIST_DIR + '/react/[name].js',
      sourceMapFilename: config.DIST_DIR + '/react/[name].js.map'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    loaders: [{
      test: /\.jsx?/,
      include: [
        config.SOURCE_DIR,
        path.resolve('node_modules')
      ],
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }, {
      test: /\.css$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: 'css-loader'
        }
      ]
    }, {
      test: /\.scss$/,
      include: [
        config.SOURCE_DIR,
        path.resolve('node_modules', 'react-dates'),
      ],
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader"
        },
        {
          loader: "sass-loader"
        }]
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      test: /\.(png|jpe?g|gif)$/,
      loader: "url-loader",
      query: { mimetype: "image/png" }
    }],
    plugins: []
  }
}
