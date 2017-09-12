var path = require('path');
var glob = require('glob');
var webpack = require('webpack'),
    config = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin,
    UglifyJsPlugin = webpack.optimize.UglifyJsPlugin,
    WebpackBrowserPlugin = require('webpack-browser-plugin'),
    StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

var templates = getEntry('src/page/v1/**/**/*.htm');
templates.index = ['./src/page/v1/index.htm'];

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.path = path.resolve(__dirname, '../dist-uat');
config.output.publicPath = '';
config.output.filename = '/static/js/wap/[name].min.js';

var libDir = path.resolve(__dirname, '../src/lib/');
config.resolve.alias.BackendApi = path.resolve(libDir, '../js/qqw_backend.js');

/*jslint
  white:true, for:true
  es6, maxerr: 10, node
*/


// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

// var SvgStore = require('webpack-svgstore-plugin')


// add hot-reload related code to entry chunks
// var polyfill = 'eventsource-polyfill';
// var hotClient = 'webpack-hot-middleware/client?noInfo=true&reload=true';
// Object.keys(config.entry).forEach(function (name, i) {
//   'use strict';
//   var extras = i === 0 ? [polyfill, hotClient] : [hotClient];
//   config.entry[name] = extras.concat(config.entry[name]);
// });

// necessary for the html plugin to work properly
// when serving the html from in-memory
// config.output.publicPath = '/';

config.plugins = (config.plugins || []).concat([
  new webpack.ProvidePlugin({ //加载jq
    $: 'Zepto',
    riot: "riot",
    riotux: "riotux",
    iScroll: "iScroll",
    layer: "layer",

  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin('/static/css/wap/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
  // debug ? function() {} : new UglifyJsPlugin({ //压缩代码
  // new UglifyJsPlugin({ //压缩代码
  //     compress: {
  //       warnings: false,
  //       pure_funcs: [ 'console.log' ]
  //     },
  //     except: ['$', 'exports', 'require'] //排除关键字
  // })
    // new webpack.HotModuleReplacementPlugin() //热加载
    // devServer: {
    //   publicPath:'http://localhost:9090/static/',
    //   proxy: {
    //     "*": "http://localhost:54999"
    //   },
    //   inline: true,
    //   hot: true
    // }
]);

var pageNames = Object.keys(config.entry);
Array.from(pageNames).map((page) => {
  filename = config.entry[page] + '.htm';
  template = path.resolve(__dirname, '../' + templates[page]);
  var htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: filename,
    template: template,
    chunks: [page],
    cache: false,
    inject: true,
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  });
  config.plugins.push(htmlWebpackPlugin);
});

// Array.from(pageNames).map((page) => {
//   var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
//       // filename: "vendors.js",
//       name: page,
//       async: true,
//       chunks: [page],
//       minChunks: Infinity
//   });
//   config.plugins.push(commonsChunkPlugin);
// });

// eval-source-map is faster for development, conflict with StyleExtHtmlWebpackPlugin
var SOURCE_MAP = false;
config.devtool = SOURCE_MAP ? 'source-map' : false;

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var templates = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename);
        pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
        var pathFile = './' + entry;
        templates[basename] = files[i]; // list -> src/page/user/order/list.htm
    }
    console.log(templates);
    return templates;
}

module.exports = config;
