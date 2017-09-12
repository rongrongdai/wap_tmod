import { QqwUtil,valiatorReg} from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApiBinds } from 'BackendApi';		// 后台api接口文件
import'./pay_success.scss'
import'./pay_success.tag'
import { BackendApipayResult} from 'BackendApi';		// 后台api接口文件
import { BackendApishareget} from 'BackendApi';		// 后台api接口文件


        function request() {
        var query = location.search;
        var paras = arguments[0];
        if (arguments.length == 2) {
            query = arguments[1];
        }
        if (query != "") {
            if (query.indexOf("?") != -1) {
                query = query.split("?")[1];
            }
            query = query.split("&");
            for (var i = 0; i < query.length; i++) {
                var querycoll = query[i].split("=");
                if (querycoll.length == 2) {
                    if (querycoll[0].toUpperCase() == paras.toUpperCase()) {
                        return querycoll[1];
                        break;
                    }
                }
            }
        }
        return "";
    };
var order_id = request('order_id');
var order_sn = request('order_sn');
$('.ordersn').text(order_sn);



var postdata = '?id='+ order_id + '&type=12' ;    
var URL = '';
var fximg ='';
var fxtt = '';
QqwUtil.ajaxData('get', BackendApishareget, postdata, (datatoken) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
             console.log(datatoken);
             fximg = datatoken.img;
             URL = datatoken.url;
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });

QqwUtil.ajaxData('get', BackendApipayResult, {order_sn:order_sn}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
              fxtt = '您收到了一张'+ data.order_amount +'元美特好全球蛙购物卡，赶紧过来领取！'
             $('.ordern').text(data.order_amount+'元 '+data.card_name +''+data.quantity +'张');
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });


// 微信分享
var targetUrl = location.href.split('#')[0];
var targetUrl = targetUrl.replace('&', '%26');

var appId = '';
var timestamp = '';
var nonceStr = '';
var signature = '';     
$.get("/wx/getShareConfig/",{url:targetUrl}, function(json) {	
    if (json.ret == "0") 
    {
        appId = json.data.appId; 
        timestamp = json.data.timestamp;
        nonceStr = json.data.noncestr;
        signature = json.data.signature;
    }
    
    wx.config({
    	//debug: true,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'translateVoice',
          'startRecord',
          'stopRecord',
          'onRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ]
    });
    
    wx.ready(function () {
  	  // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
  	    wx.checkJsApi({
  	      jsApiList: [
  	        'onMenuShareTimeline',
  	        'onMenuShareAppMessage'
  	      ],
  	      success: function (res) {
  	         //alert(JSON.stringify(res));
  	      }
  	    });
     
     console.log(URL);
     console.log(fximg);
  	  var shareData = {
  	    title: "426全球蛙&美特好周年庆",
  	    desc: fxtt,
  	    link: URL,
  	    imgUrl: fximg,
  	  };
       
  	  wx.onMenuShareAppMessage(shareData);  
  	  wx.onMenuShareTimeline(shareData);
   	  wx.onMenuShareQQ(shareData);
    	  wx.onMenuShareWeibo(shareData);
    	  
    	  
    	  wx.error(function (res) {
  	  	 alert(res.errMsg);
  	  });
  	
  });
}, 'json');












$('.give-button').click(function(){
    $('.codebg').show();
});

$('.closebtn').click(function(){
    $('.codebg').hide(); 
});
