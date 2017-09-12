

var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path');
var dirs = '/home/dev/node_test/';
// router.get('/main/main', function(req, res, next) {
// 	fs.readFile( dirs + 'backend/test/app_test/main-main.json','utf-8', function(err, data) {
// 		var testMainMainJson = JSON.parse(data);
// 		res.json(testMainMainJson) ;  
// 	});
// });
router.get('/main/main', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/main-main-2.0.json','utf-8', function(err, data) {
		var testMainMain2Json = JSON.parse(data);
		res.json(testMainMain2Json);
	});
});

router.get('/main', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/main-category.json','utf-8', function(err, data) {
		var testMainCategory = JSON.parse(data);
		res.json(testMainCategory);
	});
});

router.get('/main/rec', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/main_articlelist.json','utf-8', function(err, data) {
		var testMainArticleListjson = JSON.parse(data);
		res.json(testMainArticleListjson);
	});
});

router.get('/tag-main/showTag', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/tag-list.json','utf-8', function(err, data) {
		var testTagListjson = JSON.parse(data);
		res.json(testTagListjson);
	});
});

router.get('/tag-main/changeTag', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/tag-list-change.json','utf-8', function(err, data) {
		var testTagListChangejson = JSON.parse(data);
		res.json(testTagListChangejson);
	});
});

router.get('/butler-article/special', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/wap_article_special.json','utf-8',function(err, data) {
		var testArticleSpecialJson = JSON.parse(data);
		res.json(testArticleSpecialJson);
	});
});
router.get('/butler-main/bindButler', function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/bindButler.json','utf-8',function(err, data) {
		var testBindButlerJson = JSON.parse(data);
		res.json(testBindButlerJson);
	});
});
router.get('/goods-main/newlist',function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/newgoods-list.json','utf-8', function(err, data) {
		var testGoodsListJson = JSON.parse(data);
		res.json(testGoodsListJson);
	});
});
router.get('/butler-doyen/detail',function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/userb.json','utf-8', function(err, data) {
		var testUserbJson = JSON.parse(data);
		res.json(testUserbJson);
	});
});
router.get('/discovery/category',function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/discovery-category.json','utf-8',function(err, data) {
		var testDiscoveryCategoryJson = JSON.parse(data);
		res.json(testDiscoveryCategoryJson);
	});
});

router.get('/discovery/subcategory',function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/discovery-subcategory.json','utf-8',function(err, data) {
		var testDiscoverySubcategoryJson = JSON.parse(data);
		res.json(testDiscoverySubcategoryJson);
	});
});

router.get('/butler-article/list',function(req, res, next) {
	fs.readFile( dirs + 'backend/test/app_test/article-list.json','utf-8',function(err, data) {
		var testDoyenArticleListJson = JSON.parse(data);
		res.json(testDoyenArticleListJson);
	});
});

// router.get('/butler-article/detail', function(req, res, next) {
// 	fs.readFile(dirs + 'backend/test/app_test/article_brand.json','utf-8',function(err, data) {
// 		var testDoyenArticleDetailJson = JSON.parse(data);
// 		res.json(testDoyenArticleDetailJson);
// 	});
// });

router.get('/butler-article/special', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/wap_article_special.json','utf-8', function(err, data) {
		var testArticleSpecialJson = JSON.parse(data);
		res.json(testArticleSpecialJson);
	});
});
router.get('/butler-main/butlerChooseList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/wap_chooseList.json','utf-8', function(err, data) {
		var testArticlechooselistJson = JSON.parse(data);
		res.json(testArticlechooselistJson);
	});
});
router.get('/user-follow/addFollow', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/focus.json','utf-8',function(err, data) {
		var testFocusJson = JSON.parse(data);
		res.json(testFocusJson);
	});
});
router.get('/user-follow/cancelFollow', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/cancel_focus.json','utf-8', function(err, data) {
		var testCancelFocusJson = JSON.parse(data);
		res.json(testCancelFocusJson);
	});
});
router.get('/butler-article/category', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/category_special.json','utf-8', function(err, data) {
		var testCategorySpecialJson = JSON.parse(data);
		res.json(testCategorySpecialJson);
	});
});
router.get('/butler-article/specialTwo', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/new_special.json','utf-8', function(err, data) {
		var testNewSpecialJson = JSON.parse(data);
		res.json(testNewSpecialJson);
	});
});
router.get('/butler-main/bind', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/bind.json','utf-8', function(err, data) {
		var testbindJson = JSON.parse(data);
		res.json(testbindJson);
	});
});
router.get('/butler-main/saveBind', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/save-bind.json','utf-8', function(err, data) {
		var testsavabindJson = JSON.parse(data);
		res.json(testsavabindJson);
	});
});
router.get('/integral-main/sendSms', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/send-sms.json','utf-8', function(err, data) {
		var testsendsmsJson = JSON.parse(data);
		res.json(testsendsmsJson);
	});
});
router.get('/topic-main/list', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/topic_list.json','utf-8', function(err, data) {
		var testsendsmsJson = JSON.parse(data);
		res.json(testsendsmsJson);
	});
});

router.get('/topic-main/detail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/topic-details.json','utf-8', function(err, data) {
		var testopicdetailsJson = JSON.parse(data);
		res.json(testopicdetailsJson);
	});
});

router.get('/topic-main/commentList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/topic-commentList.json','utf-8', function(err, data) {
		var testopiccommentListJson = JSON.parse(data);
		res.json(testopiccommentListJson);
	});
});

router.get('/topic-main/index', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/topic-head-content.json','utf-8', function(err, data) {
		var topicMain = JSON.parse(data);
		res.json(topicMain);
	});
});

router.get('/butler-article/detail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/column-details.json','utf-8', function(err, data) {
		var testopiccolumnderailsJson = JSON.parse(data);
		res.json(testopiccolumnderailsJson);
	});
});
router.get('/butler-article/commonList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/column-comment.json','utf-8', function(err, data) {
		var testevalListJson = JSON.parse(data);
		res.json(testevalListJson);
	});
});
router.get('/butler-article/getCateArticleList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/zhuanlan_list.json','utf-8', function(err, data) {
		var testJson = JSON.parse(data);
		res.json(testJson);
	});
});

router.get('/topic-main/like', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/basklike.json','utf-8', function(err, data) {
		var testbasklikeJson = JSON.parse(data);
		res.json(testbasklikeJson);
	});
});
router.get('/topic-main/unlike', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/baskunlike.json','utf-8', function(err, data) {
		var testbaskunlikeJson = JSON.parse(data);
		res.json(testbaskunlikeJson);
	});
});
router.get('/user-pm/index', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/massage-sixin.json','utf-8', function(err, data) {
		var testSixinJson = JSON.parse(data);
		res.json(testSixinJson);
	});
});
router.get('/butler-article/commentList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/massage-commont.json','utf-8', function(err, data) {
		var testCommontJson = JSON.parse(data);
		res.json(testCommontJson);
	});
});
router.get('/user-message/index', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/massage-xitong.json','utf-8', function(err, data) {
		var testXitongJson = JSON.parse(data);
		res.json(testXitongJson);
	});
});
router.get('/user-pm/detail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/private_letter.json','utf-8', function(err, data) {
		var testprivateletterJson = JSON.parse(data);
		res.json(testprivateletterJson);
	});
});
router.get('/user-message/detail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/messageDetails.json','utf-8', function(err, data) {
		var testmessagedetailsJson = JSON.parse(data);
		res.json(testmessagedetailsJson);
	});
});
router.get('/marketing-special/getSpecialListByCate', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/wmitem-list.json','utf-8', function(err, data) {
		var WmitemListJson = JSON.parse(data);
		res.json(WmitemListJson);
	});
});

router.get('/marketing-special/getSpecialGoodsBySpec', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/woman_cook.json','utf-8', function(err, data) {
		var WomanListJson = JSON.parse(data);
		res.json(WomanListJson);
	});
});

router.get('/category-main/oneCateGoodsList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/class_con.json','utf-8', function(err, data) {
		var ClassConJson = JSON.parse(data);
		res.json(ClassConJson);
	});
});

router.get('/category-main/cateGoodsList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/category_first_list.json','utf-8', function(err, data) {
		var cateGoodsListJson = JSON.parse(data);
		res.json(cateGoodsListJson);
	});
});

router.get('/marketing-anniversary/card', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/entity_card.json','utf-8', function(err, data) {
		var cardentityJson = JSON.parse(data);
		res.json(cardentityJson);
	});
});

router.get('/user-card/detail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/card_details.json','utf-8', function(err, data) {
		var carddetailsJson = JSON.parse(data);
		res.json(carddetailsJson);
	});
});
/*卡片列表*/
router.get('/user-card/list', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/card_list.json','utf-8', function(err, data) {
		var cardlistJson = JSON.parse(data);
		res.json(cardlistJson);
	});
});
router.get('/marketing-anniversary/index', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/shop_celebration_index.json','utf-8', function(err, data) {
		var shopCelebrationIndexJson = JSON.parse(data);
		res.json(shopCelebrationIndexJson);
	});
});
router.get('/Integral-main/exchange', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/shop_celebration_goodslist.json','utf-8', function(err, data) {
		var shopCelebrationGoodslistJson = JSON.parse(data);
		res.json(shopCelebrationGoodslistJson);
	});
});
/*卡片列表*/
router.get('/user-groupbuy/list', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/group_list.json','utf-8', function(err, data) {
		var grouplistJson = JSON.parse(data);
		res.json(grouplistJson);
	});
});
/*卡片列表*/
router.get('/marketing-group/index', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/booking_index.json','utf-8', function(err, data) {
		var grouplistJson = JSON.parse(data);
		res.json(grouplistJson);
	});
});


/*卡包-确认订单*/
router.get('/user-card/confirmOrder', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/confirmOrder.json','utf-8', function(err, data) {
		var confirmOrder = JSON.parse(data);
		res.json(confirmOrder);
	});
});

/*卡包-创建订单*/
router.get('/user-card/createOrder', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/createOrder.json','utf-8', function(err, data) {
		var createOrder = JSON.parse(data);
		res.json(createOrder);
	});
});
/*炫耀*/
router.get('/user-card/showCard', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/show.json','utf-8', function(err, data) {
		var showJson = JSON.parse(data);
		res.json(showJson);
	});
});
/*领卡*/
router.get('/user-card/receiveInfo', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/receive.json','utf-8', function(err, data) {
		var receiveJson = JSON.parse(data);
		res.json(receiveJson);
	});
});
/*领卡结果*/
router.get('/user-card/receiveResult', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/receive_result.json','utf-8', function(err, data) {
		var receiveresultJson = JSON.parse(data);
		res.json(receiveresultJson);
	});
});

/*获取城市以及区域*/
router.get('/user-card/receiveArea', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/receive_area.json','utf-8', function(err, data) {
		var receivereAreaJson = JSON.parse(data);
		res.json(receivereAreaJson);
	});
});

/*获取店铺列表*/
router.get('/user-card/receiveAddress', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/receive_shop_list.json','utf-8', function(err, data) {
		var receivereShopListJson = JSON.parse(data);
		res.json(receivereShopListJson);
	});
});
/*卡包-支付结果*/
router.get('/user-card/payResult', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/payResult.json','utf-8', function(err, data) {
		var payResult = JSON.parse(data);
		res.json(payResult);
	});
});

/*分享朋友圈*/
router.get('/share/get', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/shareget.json','utf-8', function(err, data) {
		var shareget = JSON.parse(data);
		res.json(shareget);
	});
});

/*我的拼团-拼团详情*/
router.get('/User-Groupbuy/groupBuyDetail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/groupBuyDetail.json','utf-8', function(err, data) {
		var groupBuyDetail = JSON.parse(data);
		res.json(groupBuyDetail);
	});
});

/*妈妈宝贝特卖列表*/
router.get('/marketing-special/list', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/baby-special-list.json','utf-8', function(err, data) {
		var list = JSON.parse(data);
		res.json(list);
	});
});

/* 最优惠 */
router.get('/goods-main/newGiftGoods', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/gift_goods.json','utf-8', function(err, data) {
		var newGiftGoods = JSON.parse(data);
		res.json(newGiftGoods);
	});
});
/*选择售后商品 */
router.get('/user-order/getOrderGoods', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/choice_goods.json','utf-8', function(err, data) {
		var newChoiceGoods = JSON.parse(data);
		res.json(newChoiceGoods);
	});
});
/* 申请退款页面 */
router.get('/user-order/refundDetail', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/apply_refund.json','utf-8', function(err, data) {
		var newApplyRefund= JSON.parse(data);
		res.json(newApplyRefund);
	});
});
/* 退款详情页面(提交后) */
router.get('/user-order/refundAfter', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/refund_details.json','utf-8', function(err, data) {
		var newreFund= JSON.parse(data);
		res.json(newreFund);
	});
});
/* 退款协商记录 */
router.get('/user-order/refundConsult', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/consult_record.json','utf-8', function(err, data) {
		var newconsRecord= JSON.parse(data);
		res.json(newconsRecord);
	});
});

/* 秒杀首页 */
router.get('/marketing-seckill/goodsList', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/app_test/seckill-index.json','utf-8', function(err, data) {
		var seckillIndex= JSON.parse(data);
		res.json(seckillIndex);
	});
});




module.exports = router;
