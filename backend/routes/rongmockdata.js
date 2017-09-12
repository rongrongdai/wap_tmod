var express = require('express'),
	router = express.Router(),
	moment = require('moment');

router.get('/list', function(req, res, next) {
	res.json({"ret":"0","msg":"\u64cd\u4f5c\u6210\u529f","data":{"count":"11","list":[{"id":"11","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c9651983a18.png","title":"\u5f88\u597d\u975e\u5e38\u597d","doyen_name":"","love_num":"0","islove":"0"},{"id":"10","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c7d845359e8.png","title":"gogogo","doyen_name":"","love_num":"0","islove":"0"},{"id":"9","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c7d6712250f.png","title":"\u59b9\u59b9\u4f60\u771f\u597d","doyen_name":"","love_num":"0","islove":"0"},{"id":"8","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c7d6712250f.png","title":"\u59b9\u59b9\u4f60\u771f\u597d","doyen_name":"","love_num":"0","islove":"0"},{"id":"7","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c7d2ece8aa2.png","title":"\u5566\u5566\u5566","doyen_name":"","love_num":"0","islove":"0"},{"id":"6","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c7ccd50f5b9.jpg","title":"test","doyen_name":"","love_num":"0","islove":"0"},{"id":"5","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c7c7ef498ae.jpg","title":"\u6211\u665a\u70b9\u70b9","doyen_name":"","love_num":"0","islove":"0"},{"id":"4","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c792b1b3046.png","title":"\u8fd9\u4e2a\u662f\u6587\u7ae0","doyen_name":"","love_num":"0","islove":"0"},{"id":"3","picurl1":"","title":"\u8fd9\u4e2a\u662f\u4f17\u7b79","doyen_name":"","love_num":"0","islove":"0"},{"id":"2","picurl1":"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57c6b048ddcff.png","title":"\u4f60\u662f\u6700\u597d\u7684","doyen_name":"","love_num":"1","islove":"0"}],"pagecount":"2"},"timestamp":1472903958});
});

router.get('/mock/discovery/category', function(req, res, next) {
	res.json({
		ret: "0",
		msg: "操作成功",
		data: {
			list: [{
				cat_id: "629",
				cat_name: "日化用品",
				cat_img: "/img/category_second/discover_img11@2x.png",
				level: 1,
				child:[{
					cat_id: "704",
					cat_name: "家用洗涤",
					cat_img: "http://7xp9qs.com1.z0.glb.clouddn.com/56dd3514981f9.jpg",
					level: 2
				}, {
					cat_id: "636",
					cat_name: "日化护理",
					cat_img: "",
					level: 2
				}]
			}, {
				cat_id: "1002",
				cat_name: "母婴*",
				cat_img: "/img/category_second/discover_img09@2x.png",
				level: 1,
				child: [{
					cat_id: "1202",
					cat_name: "婴儿辅食",
					cat_img: "",
					level: 2
				}, {
					cat_id: "1003",
					cat_name: "奶粉",
					cat_img: "",
					level: 2
				}]
			}]
		}
	});
});



router.get('/mock/discovery/subcategory', function(req, res, next) {
	let items = [
		{
			id: '5',
			image: '/img/category_second/discover_pro_img01@3x.png',
			name: '银锐系列六件套',
			price: '499.90',
			collect_num: 20
		}, {
			id: '15',
			image: '/img/category_second/discover_pro_img02@3x.png',
			name: '克劳斯梅格汤锅炒锅超级无敌长标题套装',
			price: '30.80',
			collect_num: 20
		}, {
			id: '25',
			image: '/img/category_second/discover_pro_img03@3x.png',
			name: '你没看错，只要0.99，不是9块9',
			price: '0.99',
			collect_num: 111222333
		}
	];
	items = items.concat(items);			// 6
	items = items.concat(items);			// 12
	items = items.concat(items);			// 24
	items = items.concat(items);			// 48
	res.json({
		ret: "0",
		msg: "操作成功",
		data: {
			merchant: items
		}
	});
});


router.get('/mock/butler-article/detail', function(req, res, next) {
	 res.json({
		 ret: "0",
		 msg: "操作成功",
		 data: {
			 title: "工厂直供",
			 doyen_id: "115",
			 doyen_name: null,
			 face: null,
			 cate_name: "厂家直供",
			 clumun_name: null,
			 picture: "http://7xp9qs.com1.z0.glb.clouddn.com/57ee0889dd509.jpg",
			 content: "<p>\n\t\u65c5\u884c\uff0c\u5c31\u662f\u79bb\u5f00\u751f\u6d3b\u719f\u6089\u7684\u5730\u65b9\uff0c\u7136\u540e\u4e0d\u4e00\u6837\u7684\u5f52\u6765\u3002\u5982\u679c\u751f\u6d3b\u7f81\u7eca\u4e86\u4f60\u7684\u8eab\u4f53\uff0c\u522b\u8ba9\u5b83\u4e5f\u7f81\u7eca\u4f60\u7684\u5fc3\u3002\u6c88\u4ece\u6587\u4e5f\u66fe\u8bf4\uff0c\u6211\u8d70\u8fc7\u8bb8\u591a\u5730\u65b9\u7684\u8def\uff0c\u884c\u8fc7\u8bb8\u591a\u5730\u65b9\u7684\u6865\uff0c\u770b\u8fc7\u8bb8\u591a\u5730\u65b9\u7684\u4e91\uff0c\u559d\u8fc7\u8bb8\u591a\u79cd\u7c7b\u7684\u9152\uff0c\u5374\u53ea\u7231\u8fc7\u4e00\u4e2a\u6b63\u5f53\u6700\u597d\u5e74\u9f84\u7684\u4eba\u3002&nbsp;\n<\/p>\n<p style=\"text-align:center;\">\n\t<img src=\"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57e61b25b6562.png\" alt=\"\" \/> \n<\/p>\n<p>\n\t\u897f\u85cf\u662f\u89e6\u624b\u53ef\u53ca\u7684\u795e\u79d8\u5929\u5802\u3002\u62c9\u8428\uff0c\u5411\u5f80\u4e4b\u5730\uff01\u4e00\u8f88\u5b50\u4e00\u5b9a\u8981\u53bb\u4e00\u6b21\uff0c\u7528\u6700\u8654\u8bda\u7684\u5fc3\uff0c\u6da4\u8361\u51fa\u6700\u7eaf\u51c0\u7684\u7075\u9b42\u3002\u629b\u5f00\u5c18\u4e16\u4e00\u5207\u70e6\u607c\uff0c\u53bb\u548c\u81ea\u5df1\u5bf9\u5bf9\u8bdd\uff0c\u8bd5\u7740\u627e\u56de\u5185\u5fc3\u6df1\u5904\u6700\u539f\u59cb\u7684\u81ea\u5df1\uff0c\u7ed9\u7075\u9b42\u505a\u4e00\u6b21\u671d\u5723\u3002\n<\/p>\n<p style=\"text-align:center;\">\n\t<img src=\"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57e61b40a264f.jpg\" alt=\"\" \/> \n<\/p>\n<p>\n\t&nbsp;\u4e91\u5357\uff0c\u4e3d\u6c5f\uff01\u4e00\u4e2a\u4ee4\u6211\u9b42\u7275\u68a6\u7ed5\u7684\u5730\u65b9\u3002\u542c\u8bf4\u90a3\u91cc\u6709\u7eaf\u51c0\u6e5b\u84dd\u7684\u5929\u7a7a\uff0c\u542c\u8bf4\u90a3\u91cc\u6709\u968f\u9047\u800c\u5b89\u7684\u767d\u4e91\uff0c\u542c\u8bf4\u90a3\u91cc\u6709\u6f7a\u6f7a\u7684\u6eaa\u6d41\uff0c\u542c\u8bf4\u90a3\u91cc\u6709\u8fdc\u79bb\u4fd7\u4e16\u7684\u751f\u6d3b\uff1b\u5927\u7406\uff0c\u80cc\u9760\u82cd\u5c71\uff0c\u9762\u671d\u6d31\u6d77\uff0c\u4e0a\u6709\u4e91\u5f69\u6735\u6735\uff0c\u4e0b\u6709\u9752\u7816\u77f3\u74e6\u3002\u5728\u8fd9\u91cc\uff0c\u542c\u5f97\u89c1\u9e1f\u9e23\u866b\u8bed\uff0c\u72d7\u5420\u9e21\u53eb\uff0c\u542c\u4e0d\u89c1\u4eba\u58f0\u6742\u8bed\uff0c\u6d6e\u8e81\u811a\u6b65\u3002\n<\/p>\n<p style=\"text-align:center;\">\n\t<img src=\"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57eb1b164d1c6.jpg\" alt=\"\" \/> \n<\/p>\n<p style=\"text-align:center;\">\n\t<img src=\"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57eb1b21c07a5.jpg\" alt=\"\" \/> \n<\/p>\n<p>\n\t\u53a6\u95e8\uff0c\u9f13\u6d6a\u5c7f\u3002\u6f2b\u6b65\u7f8e\u4e3d\u7684\u53a6\u95e8\u6c99\u6ee9\uff0c\u8046\u542c\u6d77\u6d6a\u7684\u58f0\u54cd\u4eab\u53d7\u6d77\u98ce\u7684\u8f7b\u62c2\uff0c\u653e\u677e\u8eab\u5fc3\u5378\u53bb\u75b2\u60eb\u3002\u7a7f\u8857\u8d70\u5df7\uff0c\u7528\u53cc\u811a\u4e08\u91cf\u8fd9\u5ea7\u57ce\u5e02\uff0c\u7528\u5fc3\u611f\u53d7\u8fd9\u5ea7\u57ce\u5e02\u7684\u547c\u5438\uff0c\u65c5\u884c\uff0c\u53ea\u8981\u5f00\u59cb\uff0c\u5c31\u4e0d\u4f1a\u7ed3\u675f\u3002\n<\/p>\n<p style=\"text-align:center;\">\n\t<img src=\"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57e60c4cc81f6.jpg\" alt=\"\" \/> \n<\/p>\n<p>\n\t\u7f8e\u666f\u4e0d\u4ec5\u4ec5\u662f\u76ee\u7684\u5730\uff0c\u8fd8\u5e94\u8be5\u662f\u5728\u8def\u4e0a\uff0c\u65c5\u884c\u4e5f\u4e0d\u4ec5\u4ec5\u662f\u76ee\u7684\u5730\uff0c\u8fd8\u5728\u611f\u53d7\u6cbf\u9014\u7684\u90a3\u4e9b\u4eba\u90a3\u4e9b\u4e8b\u3002\u4e16\u754c\u662f\u4e00\u672c\u4e66\uff0c\u4e0d\u65c5\u884c\u7684\u4eba\u53ea\u770b\u5230\u5176\u4e2d\u7684\u4e00\u9875\u3002\u4eba\u4eba\u90fd\u5728\u61a7\u61ac\u4e00\u573a\u8bf4\u8d70\u5c31\u8d70\u7684\u65c5\u884c\uff0c\u4f46\u8fd9\u79cd\u70ed\u60c5\u5f80\u5f80\u5728\u6536\u62fe\u884c\u674e\u7684\u65f6\u5019\u88ab\u4e00\u56e2\u4e71\u9ebb\u7684\u51fa\u884c\u88c5\u5907\u77ac\u95f4\u7834\u706d\uff0c\u90a3\u4eca\u5929\u5c31\u7ed9\u5927\u5bb6\u63a8\u8350\u4e00\u4e9b\u65c5\u884c\u597d\u7269\u3002\n<\/p>\n<p style=\"text-align:center;\">\n\t<img src=\"http:\/\/7xp9qs.com1.z0.glb.clouddn.com\/57e61c55ddbf4.jpg\" alt=\"\" \/> \n<\/p>\n<p>\n\t&nbsp;\u8def\u4e0a\u9047\u89c1\u7684\u98ce\u666f\uff0c\u6709\u7684\u60ca\u8273\u5230\u8ba9\u4f60\u5c16\u53eb\uff0c\u6709\u7684\u9759\u8c27\u5230\u8ba9\u4f60\u4e0d\u5fcd\u53d1\u58f0\u3002\u8fd9\u5c31\u662f\u65c5\u884c\uff0c\u8fd9\u4e5f\u662f\u4eba\u751f\u3002\u5982\u82e5\u5fc3\u5e95\u6709\u90a3\u4efd\u5fc5\u5c06\u5230\u8fbe\u7684\u4fe1\u5ff5\uff0c\u5c31\u6ca1\u6709\u4ec0\u4e48\u53ef\u4ee5\u963b\u6321\u4f60\u3002\u4e5f\u8bb8\u5728\u4e00\u8d9f\u65c5\u884c\u540e\u56de\u6765\u4f60\u5c31\u4f1a\u660e\u767d\u81ea\u5df1\u8981\u7684\u662f\u4ec0\u4e48\uff0c\u4e0d\u5728\u5f77\u5fa8\uff0c\u4e0d\u5728\u8ff7\u832b\u3002\u6709\u7684\u53ea\u662f\u5bf9\u7406\u60f3\u7684\u5e0c\u5180\uff0c\u52aa\u529b\u548c\u594b\u6597\u3002\n<\/p>",
			 love_num: "0",
			 comment_num: "0",
			 share_num: "0",
			 reward_num: "0",
			 article_type: "1",
			 brand_id: "444",
			 isdoyen: "1",
			 article_brief:"偶然之间，发现这家对比性比较高的制造商。这家制造商多年来产品一直以优良品质，畅销日本市场。自2008年起，公司成功开发中国市场。尤其是以桐木保鲜米箱为代表的“自然@风”木质日用系类产品。",
			 article_title:"[今日一推，德清和风艺术]",
			 introduce:"旅行，就是离开生活熟悉的地方，然后不一样的归来。如果生活羁绊了你的身体，别让它也羁绊你的心。沈从文也曾说，我走过许多地方的路，行过许多地方的桥，看过许多地方的云，喝过许多种类的酒，却只爱过一个正当最好年龄的人",
			 supplier_introduce:"和风艺术已成为当代流行家居模式生活可以不高雅，思想和品位却不能落俗。我喜欢末班车经过城市每一个角落的美妙，喜欢下雨天不打伞踩过路面水花的疯狂，享受在熟悉的小路发现一朵明艳小花的惊喜，陶醉一个人料理一道精致美食的闲暇",
			 list: [
				 {
					 goods_id: "233",
					 goods_name: "成美玻尿酸集中补水面膜",
					 shop_price: "35.00",
					 goods_brief: "哈哈",
					 goods_thumb: "http://7xp9qs.com1.z0.glb.clouddn.com/57496be0ca44b.jpg",
					 favorite_number: "34"
				 },
				 {
					 goods_id: "234",
					 goods_name: "成美洋甘菊舒缓修护面膜",
					 shop_price: "31.80",
					 goods_brief: "哈哈",
					 goods_thumb: "http://7xp9qs.com1.z0.glb.clouddn.com/57496bb07d50e.jpg",
					 favorite_number: "33"
				 }
			 ],
			 rec: [
				 {
					 id: "35",
					 picurl1: "http://7xp9qs.com1.z0.glb.clouddn.com/57de609fa8410.jpg",
					 title: "工厂直供第二期",
					 doyen_name: "厂家直供",
					 logo: "http://7xp9qs.com1.z0.glb.clouddn.com/57ce631762a96.jpg"
				 },
				 {
					 id: "33",
					 picurl1: "http://7xp9qs.com1.z0.glb.clouddn.com/57d7d20f8a5fd.jpg",
					 title: "工厂直供第一期",
					 doyen_name: "厂家直供",
					 logo: "http://7xp9qs.com1.z0.glb.clouddn.com/57ce631762a96.jpg"
				 }
			 ],
			 cate: {
				 cate_id: "2",
				 name: "厂家直供",
				 picture: "http://7xp9qs.com1.z0.glb.clouddn.com/57ce631c9a6da.jpg",
				 slogan: "",
				 article_num: "2"
			 },
			 brand: {
				 brand_name: "自然之风",
				 brand_logo: "http://7xp9qs.com1.z0.glb.clouddn.com/57edf2a2d69e5.png",
				 supplier_name: "德清和风木艺有限公司",
				 brand_desc: "德清和风木艺有限公司，成立于2003年1月，是一家专业生产日用木制品的中日合资企业.始终专注于汇集大"
			 },
			 doyen: {
				 nickname: "方圆几里",
				 position: "金牌达人",
				 face: "http://7xp9qs.com1.z0.glb.clouddn.com/57e38a5444970.jpg",
				 brief: "唯美主义、理想主义的浪漫主义者，顶级吃货，音乐发烧友，旧物搜集君，生活可以不高雅，思想和品位却不能落俗。我喜欢末班车经过城市每一个角落的美妙，喜欢下雨天不打伞踩过路面水花的疯狂，享受在熟悉的小路发现一朵明艳小花的惊喜，陶醉一个人料理一道精致美食的闲暇。",
				 article_num: "7"
			 },
			 reward: [ ]
		 },
		 timestamp: 1475223498

	 });
});





module.exports = router;
