
// 单独使用时：webpack --config build\webpack.config.js --display-error-details
var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const debug = process.env.NODE_ENV !== 'production';

var [entries, templates] = getEntry('src/page/v1/**/**/*.htm');
// var chunks = Object.keys(entries);

templates.index = ['./src/page/v1/index.htm'];
console.log(entries);

var libDir = path.resolve(__dirname, '../src/lib/');

var config = {
  entry: entries,
  // entry: {
  //   list: [path.resolve(__dirname, '../src/page/user/order/order.js')],
  // },
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
    iScroll:'iScroll',
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {    // included in bundle
      src: path.resolve(__dirname, 'src'),
      BackendApi: path.resolve(libDir, '../js/qqw_backend_dev.js'),
      Swiper: path.resolve(libDir, 'swiper-3.3.1.min.js'),
      layer: path.resolve(libDir, 'layer.js'),
      riot: path.resolve(libDir, 'riot-2.5.0.min.js'),
      iScroll: path.resolve(libDir, 'iscroll.js')
      // jquery: path.join(libDir, 'jquery-1.7.2.min.js')
      // zepto: path.join(libDir, 'zepto-1.2.0.js')
    }
  },
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      // {
      //     test: /\.tpl$/,
      //     loader: "tmod",
      //     query: {
      //         // 编译输出目录设置
      //         output: "dist-uat",

      //         // 设置输出的运行时路径
      //         runtime: "dist-uat/template-debug-new.js",

      //         // 定义模板采用哪种语法，内置可选：
      //         // simple: 默认语法，易于读写。可参看语法文档
      //         // native: 功能丰富，灵活多变。语法类似微型模板引擎 tmpl
      //         syntax: "native",

      //         // 模板文件后缀
      //         suffix: '.tpl'
      //     }
      // },
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
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          limit: 8000,
          name: 'app_img/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  plugins: [
        new webpack.ProvidePlugin({ //加载jq
            $: 'Zepto',
            riot: "riot",
            riotux: "riotux",
            layer: "layer",
            iscroll: "iscroll",
        }),
        new ExtractTextPlugin('static/css/[name].[hash].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
        // debug ? function() {} : new UglifyJsPlugin({ //压缩代码
        // new UglifyJsPlugin({ //压缩代码
        //     compress: {
        //         warnings: false
        //     },
        //     except: ['$super', '$', 'exports', 'require'] //排除关键字
        // }),
        // new HtmlWebpackPlugin({
        //   filename: 'list.htm',
        //   template: path.resolve(__dirname, '../src/page/user/order/list.htm'),
        //   // chunks: ['order'],
        //   cache: false,
        //   inject: true
        // }),
        // new webpack.HotModuleReplacementPlugin() //热加载
    ],
    // devServer: {
    //   publicPath:'http://localhost:9090/static/',
    //   proxy: {
    //     "*": "http://localhost:54999"
    //   },
    //   inline: true,
    //   hot: true
    // }
}

var pageNames = Object.keys(entries);
Array.from(pageNames).map((page) => {
  filename = entries[page] + '.htm';
  template = path.resolve(__dirname, '../' + templates[page]);
  var htmlWebpackPlugin = new HtmlWebpackPlugin({
    filename: filename,
    template: template,
    chunks: [page],
    cache: false,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  });
  config.plugins.push(htmlWebpackPlugin);
});

// Array.from(pageNames).map((page) => {
//   let js = path.basename(path.dirname(path.resolve(__dirname, '../' + templates[page])));
//   console.log('js = ' + js);
//   var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
//       filename: "order.js",
//       name: js,
//       async: true,
//       minChunks: Infinity
//   });
//   config.plugins.push(commonsChunkPlugin);
// });

config.plugins.push(new webpack.HotModuleReplacementPlugin());

// var pages = Object.keys(getEntry('src/views/**/*.html', 'src/views/'));
// pages.forEach(function(pathname) {
//     var conf = {
//         filename: '../views/' + pathname + '.html', //生成的html存放路径，相对于path
//         template: 'src/views/' + pathname + '.html', //html模板路径
//         inject: false,    //js插入的位置，true/'head'/'body'/false
//         minify: { //压缩HTML文件
//             removeComments: true, //移除HTML中的注释
//             collapseWhitespace: false //删除空白符与换行符
//         }
//     };
//     if (pathname in config.entry) {
//         conf.inject = 'body';
//         conf.chunks = ['vendors', pathname];
//         conf.hash = true;
//     }
//     config.plugins.push(new HtmlWebpackPlugin(conf));
// });

function getEntry(globPath, pathDir) {
    var files = glob.sync(globPath);
    var entries = {},
        templates = {},
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
        // entries[basename] = [ dirname + '/' + path.basename(dirname) ];
        // entries[path.basename(dirname)] = [ dirname + '/' + path.basename(dirname) ];     // order -> src/page/user/order/order.js
        // templates[path.basename(dirname)] = [files[i]]; // order -> src/page/user/order/list.htm
        // entries[basename] = [ path.resolve(dirname, './' + path.basename(dirname)) + '.js' ];     // list -> src/page/user/order/order
        templates[basename] = files[i]; // list -> src/page/user/order/list.htm
    }
    console.log(templates);
    return [entries, templates];
}

module.exports = config
