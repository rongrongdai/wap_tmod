/*jslint
  white:true, for:true
  es6, maxerr: 10, node
*/

var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entries = getEntry('src/page/v1/**/**/*.htm');
console.log(entries);

var libDir = path.resolve(__dirname, '../src/lib/');

function getEntry(globPath, pathDir) {
  var files = glob.sync(globPath);
  var entries = {},
      entry, dirname, basename, pathname, extname;

  for (var i = 0; i < files.length; i++) {
      entry = files[i];
      dirname = path.dirname(entry);
      extname = path.extname(entry);
      basename = path.basename(entry, extname);
      pathname = path.join(dirname, basename);
      pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
      var pathFile = './' + entry;
      entries[basename] = [ './' + pathname ];
  }
  return entries;
}

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist-uat/'),
    publicPath: '/',
    filename: 'static/js/app/[name].js'
  },
  externals: {   // If you load it via <script> tag
    // jquery: 'jQuery'
    FastClick: 'FastClick',
    Swiper: 'swiper',
    Zepto: 'Zepto',
    iscroll: 'iScroll',

  },
  resolve: {
    extensions: ['', '.js'],
    alias: {    // included in bundle
      src: path.resolve(__dirname, 'src'),
      BackendApi: path.resolve(libDir, '../js/qqw_backend_dev.js'),
      Swiper: path.resolve(libDir, 'swiper-3.3.1.min.js'),
      layer: path.resolve(libDir, 'layer.js'),
      riot: path.resolve(libDir, 'riot-2.6.2.min.js'),
      iScroll: path.resolve(libDir, 'iscroll.js')
      // jquery: path.join(libDir, 'jquery-1.7.2.min.js')
      // zepto: path.join(libDir, 'zepto-1.2.0.js')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      {
        test: /\.js$|\.tag$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /lib/]
      },
      {
        test: /\.tpl$|\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /lib/]
      },
      {
        test: /\.js?$/,
        loader: 'rev-replace',
        query: {
          manifestPath: 'dist-uat/manifest'
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') },
      // {
      //   test: /\.svg$/i, loader: 'inline'
      // },
      { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.eot$/,  loader: "file-loader" },
      {
        // test: /\.(png|jpg|gif|svg)$/,
        test: /\.(png|jpg|gif|webp)$/,
        loader: 'url',
        query: {
          limit: 8000,
          name: 'img/[name].[ext]?[hash:7]'
        }
      }
    ]
  }
};
