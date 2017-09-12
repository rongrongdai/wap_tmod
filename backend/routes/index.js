var express = require('express'),
	router = express.Router(),
	redis =  require('redis'),
	client = redis.createClient(),
  cheerio = require('cheerio'),
	fs = require('fs'),
	path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log("什么意思？");
  var rootPath = path.resolve('./');
  fs.readFile(rootPath + '/dist/dev/index.template.html', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if(err) {
      res.render('index', { title: 'Express' });   // jade template
      console.error(err);
      return;
    }
    var username = 'mSolo';
  	client.get('stock_sina:' + username, function(err, stockSinaPriceData){

      if (err) {
  			res.send(data);
  		} else {
        let $ = cheerio.load(data);
        console.log("现在能打印出html吗");
        console.log($.html());
        $('#firstBlood').text(stockSinaPriceData);
        res.send($.html());
  		}

  	});

  });

});

module.exports = router;
