import './details_share.scss';
import './details_share.tag';
import { QqwUtil,GlobleToNative} from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApigroupBuyDetail} from 'BackendApi';		// 后台api接口文件

// 获取URL参数

        var plat = QqwUtil.getPlatform();
        if (plat == 'wechat' ){
                $('.iconbox').click(function(){
                    $('.codebg').show();
                });
                $('.closebtn').click(function(){
                    $('.codebg').hide(); 
                });                
        }
        else  {
            $('.qqw-nav').hide();
            $('.shareh').click(function(){
                GlobleToNative.sendTobookshare(0,URL,fximg,fxtt);
            });
            $('.sharep').click(function(){
                GlobleToNative.sendTobookshare(1,URL,fximg,fxtt);
            })            
        }

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
var buyid = request('buyid');
var joinid = request('joinid');
var URL = "/mobile-user-groupbuy/detailJoin?buyid="+ buyid +"&joinid=" + joinid;
var fximg = '';
var fxtt ='';
var sharename = '';
// 微信分享注册
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
     
          console.log(fximg);
          console.log(fxtt);
  	  var shareData = {
  	    title: fxtt,
  	    desc: "品质生活全球挖，全球商品蛙拼购",
  	    link: URL ,
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
//




var postdata = '?joinid='+ joinid + '&buyid='+ buyid ;
    

QqwUtil.ajaxData('get', BackendApigroupBuyDetail, postdata, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
             console.log(data);
             fximg = data.picture;
             sharename = data.goods_name;
             console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
             $('.namer').text(data.goods_name);
             fxtt ='快来' + data.price + '元拼' +  data.goods_name;
             var timeends =parseInt(data.create_time) + 86400
             var timeStart = new Date(parseInt(data.create_time) * 1000);
             var start_time  = timeStart.toLocaleString('chinese',{hour12:false});
             var timeEnd = new Date(parseInt(timeends) * 1000);
             var end_time = timeEnd.toLocaleString('chinese',{hour12:false});
            
              $('.timer').text(start_time);
              var arr = data.user
              var face1 =[];
              arr.map(function(item){
                  item.typeid == 1 && face1.push(item.face)
              })
              $('.colonel').attr('src',face1);
            //   倒计时
              function GetRTime(){
                    var EndTime= new Date(end_time);
                    var NowTime = new Date();
                    var t =EndTime.getTime() - NowTime.getTime();
                    var d=0;
                    var h=0;
                    var m=0;
                    var s=0;
                    if(t>=0){
                      h=(Array(2).join(0)+ Math.floor(t/1000/60/60%24)).slice(-2);
                      m=(Array(2).join(0)+ Math.floor(t/1000/60%60)).slice(-2);
                      s=(Array(2).join(0)+ Math.floor(t/1000%60)).slice(-2);
                }
                    $('.ckh').text(h);
                    $('.ckm').text(m);
                    $('.cks').text(s);
                  }
                    setInterval(GetRTime,1000);

        //循环遍历输出推荐商品
        var len = data.groupByRecommend.length;
        var item =data.groupByRecommend;
        var pp = "";
        for (var i =0 ; i<len ; i++){
          pp+= '<div class="good_releft" data-goods_id="'+ item[i].goods_id +'"><div class="goods-list-container-bg"><img src="' + item[i].picture + ' "></div><p class="card-goodsname">'+ item[i].goods_name +
               '</p><p class="goods-item-user"><img class="user-face" src=" ' + item[i].face + '"><span class="user-name">' + item[i].nickname + '</span></p><p class="goods-price">¥' + item[i].price + '</p></div>';

        };
        
          $('.good_recontent').append(pp);
           //点击商品推荐跳转到详情页面

          $(".good_releft").click(function(){
              console.log(111);
                  var id=$(this).attr('data-goods_id');
                  console.log(id);
                  location.href="/app-goods/detail?id="+id;
          });
  });







     