## 全球蛙 Hybird App 前端 & 移动前端

> 1. 环境要尽量和生产环境一致（本地开发环境，测试环境【虚拟机】，集成测试环境【beta】，生产环境）
> 2. 本项目文档：/home/kevin/qqwdev/project.md（虚拟机）

- 前端先行（拥有自己的模拟接口）的好处
	- 有利于快速出demo版
	- 有利于独立测试
	- 有利于保持项目的整洁与干净
	- 有利于快速切换系统：比如服务端渲染

- 相关命令
	- npm run dev 	# 启动本地开发服务器
	- 上线步骤
		- npm run uat   	# 1. 编译打包（对应beta版和生产环境）
		- gulp js:common 	# 2. 版本号额外处理（详见gulpfile.js）

### 技术栈
- ES5
- ES6（bable-loader，.babelrc）
- SASS
- 框架与库
  - Vue.js（暂时未用）
	- riot.js
	- jQuery.js
	- artTemplate.js
- 工具
  - webpack（https://segmentfault.com/a/1190000006843916，webpack多页应用架构系列）
  - gulp

>备注
>- NodeJs
>- Express.js
>- Linux 基础 (可以使用 ftp filezilla 做一些日常操作)
>- nginx 基础 (除非新添加资源映射外，无需额外配置)

---

### 虚拟机（192.168.0.166）
- 账号
	- root：quanqiuwa（仅限负责人使用，小组成员禁止使用，特定情况下需申请）
	- dev：qqwhijkl（Node后台测试服务器账号，仅限负责人使用，小组成员禁止使用，特定情况下需申请）
	- kevin：1q2w3e4r（小组组长账号）
	- ben：***（本剑）
	- qian：***（倩倩）
	- rong：***（蓉蓉）
- 相关文件
  - /home/dev/node_test (模拟接口数据 - Node后台测试服务器【即模拟接口服务】)
		- 端口（9696) ，说明：参见文件 package.json 下scripts一节的 node ./bin/www (本身是个js文件，可修改端口号等)
		- 启动：npm start
  - /home/kevin/qqwdev (前端静态服务器)
		- 端口（10001）: nginx (/etc/nginx/nginx.conf)
  	- /home/kevin/qqwdev/article_erp (文章后台系统)

#### 模拟接口数据 - Node后台测试服务器（/home/dev/node_test）

``` bash
├── middleware				# Node 中间件（log 服务）
├── public						# 公共静态资源映射目录
│   ├── images
│   ├── javascripts
│   ├── static
│   └── stylesheets
├── routes									# 接口映射文件（改版建议重新组织，按'系统-模块.js'命名分类，模块接口过多可拆分为子模块）
│   ├── erpmock.js 					# 文章后台系统模拟接口
│   ├── index.js 						# 示例文件，暂时未用
│   ├── kevinmockdata.js 		# Kevin - App端部分模拟接口
│   ├── kevinwapmock.js 		# Kevin - 微信端部分模拟接口
│   ├── rongmockdata.js 		# 蓉蓉 - 部分模拟接口
│   ├── stocksina.js 				# 示例文件，暂时未用
│   └── users.js 						# 示例文件，暂时未用
├── test
│   └── erp
│       ├── menu.json 							# 导航菜单接口模拟数据
│       └── orderlist.json 					# 订单列表接口模拟数据
│   ├── article_brand.json 					# 文章详情页接口模拟数据
│   ├── discovery-category.json     # 商品分类接口模拟数据
│   ├── discovery-subcategory.json  # 商品子分类接口模拟数据
│   ├── doyen_articlelist.json 			# 达人文章列表接口模拟数据
│   ├── doyen_list.json 						# 达人列表接口模拟数据
│   ├── main-main.json 							# 首页接口模拟数据
│   ├── wap_article_special.json    # 微信端专题精选接口模拟数据
│   ├── wap_order_detail.json 			# 微信端订单详情接口模拟数据
│   ├── wap_order_getservice.json 	# 微信端退换货服务售后接口模拟数据
│   └── wap_order_list.json 				# 微信端订单列表接口模拟数据
└── views 					# Node html模板目录，暂时未用
```

##### 写模拟测试接口步骤 (routes目录)
- app.js 第11行 - `var kevinmockdata = require('./routes/kevinmockdata');` (一般一个项目对应一个文件!!!)
- app.js 第41行 - `app.use('/', kevinmockdata);`
- 在 test目录下准备 (各接口模拟 json 数据)
- 拷贝 kevinmockdata.js（示例）并进行接口，模拟数据替换修改

#### 前端静态资源（/home/kevin/qqwdev）

- 线上资源路径
	- svn://svn.sa.quanqiuwa.com/qqw/trunk/api/shop/App/Views
		- app/**, app htm文件
		- **, wap htm文件
	- svn://svn.sa.quanqiuwa.com/qqw/trunk/api/shop/web
  	- /static/js/*.js, 公用
  	- /static/js/app/*.js, App相关
  	- /static/js/wap/*.js, Wap相关
	  - /static/css/*.css
	  - /static/css/product_funding/funding/*.css
	  - /static/css/wap/*.css
		- /static/css/img
	  - /static/css/product_funding/funding/app_img

            -------打包后上传到svn beat 版的路径----------：
              js：api\shop\web\static\js\wap\index.*.js
             css：api\shop\web\static\css\wap\index.css
             图片：api\shop\web\static\css\wap\img
             html:api\shop\App\Views\app\main\index.htm   
             html:api\shop\App\Views\main


- ERP 后台文章系统
	- svn://svn.sa.quanqiuwa.com/qqw/trunk/admin/man/App/Views/Article
		- *.htm, app htm文件
	- svn://svn.sa.quanqiuwa.com/qqw/trunk/admin/man/web
		- /Static/Js/*.js, 公用
		- /Static/Js/article_erp
			- plugins, KindEditor.js 编辑器插件相关子插件
			- themes, KindEditor.js 编辑器插件相关主题
			- *.js 相关页面js文件
			- iframe.htm, 文章编辑预览，重要！！！（article_new.htm）
		- /Static/Css/article_erp/*.css
			- default.css, KindEditor.js 编辑器插件样式（article_new.htm）


		--------打包后上传到svn beat 版的路径-------：
		html :admin\man\App\Views\Article
		css,js,图片:
		admin\man\web\Static\css\article_erp 
		admin\man\web\Static\Js\article_erp  



---

### Hybird App - Riot.js 框架项目说明

``` bash
├─backend							# 本地测试 Node 服务器，可做服务器端渲染实践
	├─middleware					# 中间件
	├─public						# 暂时不用
	│  ├─images
	│  ├─javascripts
	│  └─stylesheets
	├─routes						# 测试接口路由
	├─test							# 测试接口json文件目录
	└─views							# 模板文件
	└─app.js 						# 主控制器
├─src
	├─component 					# 组件目录
	│  ├─card
	│  └─qqw-swiper				  # -----> 规范：加识别后缀，比如，使用swiper库时，-swiper；使用uslider库，-uslider
	├─dist							# UAT生产环境打包目录
	│  ├─v1.0.0
	│  ├─v1.0.1
	├─dist-uat						# UAT测试环境打包目录
	│  ├─app_img
	│  └─static
	│  └─index.html
	├─entry							# 其它静态html文件入口目录
	├─img 							# 项目使用的静态图片
	├─js							# 项目通用的js库
		 ├─common.js 						# 外包时的通用js，拷贝自线上/static/js/common.js
		 ├─qqw_app.js 						# 页面加载通用框架
		 ├─qqw_backend.js 				# 线上接口
		 ├─qqw_backend_dev.js 		# 本地开发测试接口
		 ├─qqw_eventutil.js 			# 通用事件处理器
		 ├─qqw_pagestate.js 			# 页面滚动状态类
		 ├─qqw_pullpush.js 			# 页面（上拉）滚动加载更多类
		 ├─qqw_regex.js 					# 通用正则表达式方法集合
		 ├─qqw_ultilities.js 		# 通用方法集合（网络请求，弹框处理等）
		 ├─qqw_wap_menu.js 			# 通用菜单栏，侧边栏模块（已废弃不用）
		 ├─rem.js 								# 早期与 native 交互的接口集合
		 ├─riot.js 							# riot框架未压缩源码（供调试研究等）
		 ├─template-debug.js 		# 早期维护 artTemplate 改造过的源码，主要改造过tag
		 ├─template-native-debug.js # artTemplate 未压缩源码
		 ├─zepto.min.js
	├─lib 							# 第三方库
	├─page 							# ----->  规范：组件化开发使用的主页面或主体模板
	│  ├─discovery				  # 发现页面模板目录
	│  ├─homepage					  # 主页模板目录
	├─sass							# 项目公共样式文件（规范：第三方样式名字以_开头，项目内部样式命名则要和第三方样式区分开）
	└─static						# 内部其它系统的js或css文件
```

---

### 移动端 - 微信端：混合 Riot.js 框架和 artTemplate.js 模板项目

``` bash
├─js                       #
├─lib                      #
├─page                     #
│  └─v1                    #
│      ├─category          # 商品分类（首页入口）页面
│      ├─category_second   # 商品分类二级页面
│      ├─component         # 页面组件
│      ├─button 						# button类组件（命名参考用途，形状等）
│      		 ├─button-like-v.scss
│      		 ├─button-like.scss
│      		 ├─button-like.tag 					# 点赞
│      ├─card 							# 卡片类组件
│      		 ├─article-facecard.scss
│      		 ├─article-facecard.tag 			# 文章名片
│      		 ├─article-leadingcard.scss
│      		 ├─article-leadingcard.tag 	# 文章引导卡片
│      		 ├─merchant-facecard.scss
│      		 ├─merchant-facecard.tag 		# 商品名片
│      		 ├─qqw-card.scss
│      		 ├─qqw-card.tag 							# 达人推荐卡片（命名是个严肃的问题）
│      		 ├─qqw-simple-card.scss
│      		 ├─qqw-simple-card.tag 			# 达人推荐简版卡片
│      		 ├─recommend-card.scss
│      		 ├─recommend-card.tag 				# 商品推荐卡片
│      └─qqw-swiper 				# 该组件命名不是很恰当（改版后推荐重命名：swiper-card【以第三方插件开头，归入card卡片类组件或按用途归类】）
│      		 ├─qqw-swiper.tag 						# swiper封装的轮播类
│      ├─discovery         # 达人推荐一级
│      ├─discovery_second  # 达人推荐二级页面
│      ├─homepage          # 首页
│      ├─img
│      ├─special           # 专题精选页面
│      └─user              # 用户模块
│          ├─order         # 订单-用户子模块相关页面（已重构）
│          └─rate          # 订单评价（未重构，暂时不用）
├─sass                     # 项目公共样式文件（规范：第三方样式名字以_开头，项目内部样式命名则要和第三方样式区分开）
└─tpl                      # artTemplate 模板库 - ES6 字符串模板
   └─html_menu_slider_list.tpl 				# 侧边栏模板（静态模板，已废弃不用）
   └─user_cart_goodslist.tpl 					# 购物车模板（暂时不用）
   └─user_order_cart_settle.tpl 				# 购物车结算模板（暂时不用）
   └─user_order_confirm_detail.tpl 		# 订单确认模板
   └─user_order_confirm_settle.tpl 		# 订单结算模板
   └─user_order_detail.tpl 						# 订单详情模板（已废弃，使用v2版本）
   └─user_order_detailv2.tpl 					# 订单详情模板（嵌套子模板：user_order_detail_list.tpl）
   └─user_order_detail_item.tpl 				# 订单详情条目模板
   └─user_order_detail_list.tpl 				# 订单详情条目列表模板（嵌套子模板：user_order_detail_item.tpl）
   └─user_order_list.tpl 							# 订单列表模板（嵌套子模板：user_order_detail_item.tpl）
   └─user_order_track.tpl 							# 订单跟踪模板

---

### 纯 artTemplate 模板项目说明

#### tmod（目录）（示例项目）

``` bash
├─tmod
	├─dist-uat				# 打包目录
	│  └─static
	│      └─js
	│          └─app
	├─page
	│  └─doyen			# 兼容旧项目，以页面进行划分，示例中doyen为page下的二级目录
	├─scripts			  # artTemplate文件：template.js
	├─static
	└─tpl				  # 模板组件目录，注意：无需以页面进行划分，不可再新建二级目录
```

#### article_erp（实际项目）

- 相关开发和维护人员
  - 后台：高鹏
  - 前端：Kevin、倩倩、荣荣、本剑

``` bash
│  .babelrc
│  package.json
├─build
│      dev-server.js 									# 本地开发：启动前端服务器
│      webpack.base.conf.js 					# webpack 基础配置文件，需配合以下环境使用
│      webpack.config.js
│      webpack.dev.conf.js 						# webpack dev环境配置文件，需结合 webpack.base.conf.js
│      webpack.uat.conf.js 						# webpack uat环境配置文件，需结合 webpack.base.conf.js（该环境暂时也对应生产环境）
├─css
│      preview_article.css 						# 
│      public.css 										# 
├─js
│      erp_backend.js 								# uat环境接口文件
│      erp_backend_dev.js 						# 本地环境模拟接口文件
├─lib 										# 第三方库
├─page
│      article_b.htm 									# 栏目 - 文章列表页面
│      article_b.js
│      article_new.htm 								# 栏目 - 文章编辑页面
│      article_new.js
│      iframe.htm 										# 栏目 - 文章编辑 - 预览页面，与article_new.htm结合
│      iframe.js
│      index.htm 											# 首页
│      index.js
│      login.htm 											# 登录页
│      orderlist_detail.htm 				  # 订单 - 详情页面
│      orderlist_detail.js
│      orderlist_fahuo.htm 						# 订单列表 - 发货页面
│      orderlist_fahuo.js
│      order_list.htm 								# 订单列表页面
│      order_list.js
├─test																# 模拟数据
│      articlecategory.json 					# 栏目接口
│      articlelist.json 							# 首页文章列表
│      bgclick.json 									# 文章编辑 - 背景图
│      choicegoods.json 							# 选择商品
│      doyencolumn.json 							# 达人栏目
│      menu.json 											# 导航栏
│      orderdetails.json 							# 订单详情
│      orderlist.json 								# 订单列表
│      user.json 											# 用户资料
└─tpl
        article.tpl
        ar_sidebar.tpl
        bg_click.tpl
        choice_goods.tpl
        column_articlelist.tpl
        column_list.tpl
        doyen_column.tpl
        nav_menu.tpl
        new_rticle.tpl
        orderlist_detail.tpl
        orderlist_fahuo.tpl
        order_list.tpl
        or_sidebar.tpl 								# 
        page.tpl 											# 分页 toolbar 模板
        preview_yl.tpl
```

> 若有新工程，则 page 目录下无特殊情况，禁止无需再新建二级目录

### 项目规范
#### CSS规范（参考）
- 组件开头-*
- j-*: js钩子
- is-*, has-*: 状态或条件样式
- *--hack: 样式
- *--active: （正常）或激活样式


