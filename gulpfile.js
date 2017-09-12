/*jslint
  white:true, for:true
  es6, maxerr: 10, node
*/

var gulp = require('gulp'),
    del = require('del'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    replace = require('gulp-replace'),
    base64 = require('gulp-base64'),
    htmlmin = require('gulp-htmlmin'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    tmodjs = require('gulp-tmod');

var gulpSequence = require('gulp-sequence');

gulp.task('js:common', gulpSequence('js:uglify', 'js:rev', 'htm:re'));

gulp.task('js:uglify', function() {
  'use strict';
  del(['src/lib/concat/*.js']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
  return gulp.src(['src/js/rem.js', 'src/lib/zepto-1.2.0.min.js', 'src/lib/fastclick-1.0.6.min.js', 'src/lib/swiper-3.3.1.min.js'])
    .pipe(concat({ path: 'qqw-rzfs.js'}))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('homepage/lib/concat'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('homepage/lib/concat'));
});

gulp.task('js:uglify2', function() {
  'use strict';
  // del(['homepage/dist-uat/static/js/*.js']).then(paths => {
  //   console.log('Deleted files and folders:\n', paths.join('\n'));
  // });
  return gulp.src(['src/js/rem.js', 'src/lib/zepto-1.2.0.min.js', 'src/lib/fastclick-1.0.6.min.js'])
    .pipe(concat({ path: 'qqw-rzf.js'}))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist-uat/static/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist-uat/static/js'));
});

gulp.task('js:rev', function() {
  return gulp.src(['./js-rev-manifest.json', 'dist-uat/src/page/v1/**/**/*.htm'])
      .pipe( revCollector({
          replaceReved: true,
          // dirReplacements: {
          //   'should/replace': shouldReplaceUat
          // }
        }) )
      .pipe(gulp.dest('dist-uat/src/page/v1'));
})

gulp.task('htm:re', function() {
  // 首页
  gulp.src("dist-uat/src/page/v1/index.htm")
      .pipe(rename("index_v5.htm"))
      .pipe(gulp.dest("./dist-uat/src/page/v1/"));
  // 其它页面
  let htmFiles = [
    "dist-uat/src/page/v1/category/category.htm",
    "dist-uat/src/page/v1/category_second/category_second.htm",
    "dist-uat/src/page/v1/discovery/discovery.htm",
    "dist-uat/src/page/v1/discovery_second/discovery_second.htm",
    "dist-uat/src/page/v1/special/special.htm",
    "dist-uat/src/page/v1/user/order/customservice.htm",
    "dist-uat/src/page/v1/user/order/detail_v2.htm",
    "dist-uat/src/page/v1/user/order/list.htm"
  ];
  let renameHtmFiles = [
    "category/index_v2.htm",
    "category_second/list_v2.htm",
    "discovery/index.htm",
    "discovery/all.htm",
    "special/special.htm",
    "user/order/customservice.htm",
    "user/order/detail_v3.htm",
    "user/order/list_v2.htm"
  ];
  for (var i = 0, size = htmFiles.length; i < size; ++i) {
    gulp.src(htmFiles[i])
      .pipe(rename(renameHtmFiles[i]))
      .pipe(gulp.dest("dist-uat/src/page/v1/"));
  }

});

gulp.task('htm:min', function () {
    var options = {
        removeComments: true,  //清除HTML注释
        collapseWhitespace: true,  //压缩HTML
        collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
        removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
        minifyJS: true,  //压缩页面JS
        minifyCSS: true  //压缩页面CSS
    };
    gulp.src(['doyen/*.htm'])         // 替换为你的工程文件
        .pipe(htmlmin(options))
        .pipe(gulp.dest('doyen/dist-uat'));
});

gulp.task('img:base64', function () {
  'use strict';
  return gulp.src('./funding/css/funding/*.css')
      .pipe(base64({
          baseDir: './funding/css/funding',
          extensions: ['svg', 'png', /\.jpg#datauri$/i],
          exclude: [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
          maxImageSize: 8 * 1024, // bytes
          debug: true
      }))
      // .pipe(concat('funding.css'))
      .pipe(gulp.dest('./funding/css'));
});

gulp.task('jpg:compress', () =>
    gulp.src('homepage/img/tmp/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('homepage/img/tmp/compress/'))
);

gulp.task('tpl:build', function(){
  'use strict';
  var stream = gulp.src('src/tpl/user_order_list.tpl')
          .pipe(tmodjs({
              syntax: 'native',
              templateBase: 'src',
              runtime: 'user_order_list.js'
          }))
          .pipe(gulp.dest('src/tpl'));
  return stream;
});

// gulp.task('inline:js', function(){
//   'use strict';
//   return gulp.src(...)
//     .pipe(replace(/<link href="style.css"[^>]*>/, function(s) {
//         var style = fs.readFileSync('style.css', 'utf8');
//         return '<style>\n' + style + '\n</style>';
//     }))
//     .pipe(gulp.dest(...));
// });

