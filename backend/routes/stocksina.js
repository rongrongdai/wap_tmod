var express = require('express'),
	router = express.Router(),
	request = require('request'),
	moment = require('moment'),
	iconv = require('iconv-lite'),
	redis = require('redis'),
	client = redis.createClient(),
	flow = require('flow-maintained');

router.get('/', function(req, res, next) {

	var curDate = moment();
	var curHour = curDate.hour();
	var curMin = curDate.minute();

	var username = 'mSolo';
	client.get('stock_sina:' + username, function(err, stockSinaPriceData){

		// 取不到值或者交易时间内
		if (err || (curHour > 9 && curHour < 15) || stockSinaPriceData === null) {

			request('http://hq.sinajs.cn/etag.php?_=' + (new Date().getTime()) + '&list=sh600023,sh600467,sz000598')
				.pipe(iconv.decodeStream('gb2312')).collect(function(err, body) {
					// console.log(body);

					flow.exec(
						function(){
							client.set('stock_sina:' + username, body, redis.print);
						},function(){
							res.send(body);
						});

    		});

		} else {
			res.send(stockSinaPriceData);
		}

	});
});

module.exports = router;
