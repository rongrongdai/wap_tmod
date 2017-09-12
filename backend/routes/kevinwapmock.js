var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path');

router.get('/user-order/list', function(req, res, next) {
	fs.readFile('backend/test/wap_order_list.json', function(err, data) {
		var testOrderListJson = JSON.parse(data);
		res.json(testOrderListJson);
	});
});

router.get('/user-order/detail', function(req, res, next) {
	fs.readFile('backend/test/wap_order_detail.json', function(err, data) {
		var testOrderDetailJson = JSON.parse(data);
		res.json(testOrderDetailJson);
	});
});


router.get('/butler-doyen/list', function(req, res, next) {
	fs.readFile('backend/test/doyen_list.json', function(err, data) {
		var testDoyenListJson = JSON.parse(data);
		res.json(testDoyenListJson);
	});
});


/* 最优惠 */
router.get('/goods-main/newGiftGoods', function(req, res, next) {
	fs.readFile(dirs + 'backend/test/gift_goods.json','utf-8', function(err, data) {
		var list = JSON.parse(data);
		res.json(list);
	});
});

module.exports = router;
