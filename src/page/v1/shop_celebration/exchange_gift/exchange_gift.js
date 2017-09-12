import './exchange_gift.scss';
import './exchange_gift.tag';	
import './exchange_gift_head.tag';	
import { QqwUtil,valiatorReg,GlobleToNative } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { BackendApiShopCelebrationGoodslist,BackendApiShopCelebrationScore} from 'BackendApi';		// 后台api接口文件
import { PullPush } from '../../../../js/qqw_pullpush.js';
function qqwOpMixin() {
	this.msg = QqwUtil.msg;
    this.ajaxData = QqwUtil.ajaxData;
    this.valiatorReg = valiatorReg;
	this.getPlatform = QqwUtil.getPlatform;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}
let womenFirstInstance,womenSecondInstance,globalIndex=0,
    womenFirstReflectData = {},isWechat,isGoodGoods,enable=true,CategoryArrList=[];
let userMessage={};    

QqwUtil.main(function*(){
	riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
	isGoodGoods=null;
	getgoodsList();
});
function getgoodsList(){
 	// 后台数据
	QqwUtil.ajaxOriginalData('get',BackendApiShopCelebrationScore, {}, (json) => {
	    if (json.ret != 0){
	        if(json.ret == 100001) {
            if(QqwUtil.getPlatform() == 'wechat'){
               location.href = (location.protocol + '//' + location.hostname + '/mobile-user-main/login?return_uri=' + location.href);
               // window.history.go(-1);
	        	}else{
               GlobleToNative.sendToGoLogin();
               GlobleToNative.sendBack();
            }
	        
	        }else{
	          QqwUtil.msg(json.msg);
	        }
	        return false;
	      }
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		let womenFirstReflectData = getReflectGoodslistData(json.data);
		let tag='women-first#'+'content';
		womenSecondInstance= riot.mount('exchange-gift-head', womenFirstReflectData)[0];
		womenFirstInstance= riot.mount(tag,'women-first', womenFirstReflectData)[0];
	    addFunction();
	    LazyUpLoadIndexImg(0,2000);
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
	if(enable){
	   initScroll();
	   	enable=false;
	}

    console.log('白屏时间 = ' + (new Date().getTime() - window.startTime));
}

 function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        };
// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectGoodslistData(data) {
    let reflectData={};
    let mainMessage={};
	let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
    reflectData.brandArr=[];
    mainMessage.categoryArr=[];
    mainMessage.colorList={qian:'#fff',shen:'#5cb531'};
    var i=0
    var user={};
    user.banner=data.banner;
    user.face=data.face;
    user.name=data.nickname;
    user.core=data.score;
    reflectData.user=user;
	// Array.from(data.list || []).map((brItem) => {
	//     let Item = {};
 //        Item.cateName=brItem.title;
 //        mainMessage.categoryArr.push(Item);
	// 	let brandItem = {};
	// 	let nickname = brItem.nickname;
	// 	brandItem.brandid = 'brand'+i.toString() + brItem.id;
	// 	brandItem.speclife = {
	// 		is_show:brItem.is_show=='0'?false:true,
	// 		id: brItem.id,
	// 		title:brItem.title,
	// 		// url: urlGoodTogo + brItem.cat_id,
	// 		id:'categoryType'+i,
	// 		bg:brItem.picture
	// 	}
	// 	i++;
	//     brandItem.brand = [];		// 品牌特供商品
	// 	Array.from(brItem.goods || []).map((goodsItem) => {
	// 		let reflectItem = {
	// 		    userid: goodsItem.uid,
	// 			goodsid:goodsItem.goods_id,
	// 			pic: goodsItem.goods_thumb,
	// 			url: urlGoodTogo + goodsItem.goods_id,
	// 			goodsname: goodsItem.goods_name,
	// 			face: goodsItem.face,
	// 			nickname: goodsItem.nickname,
	// 			price:goodsItem.score+' '+'积分'
	// 		};
	// 		brandItem.brand.push(reflectItem);
	// 	});
	// 	// if(data.firstClass.isMore=='1' ||(data.firstClass.isMore!='1'&& brItem.goodslist.length%2==1)){
	// 	// 	brandItem.brand.push({
	// 	// 	url: thirdTypeUrl+brItem.cat_id,
	// 	// 	showStyle: brItem.style_type || 1,
	// 	// 	more: '查看更多'
	// 	//    });
	// 	// }
	// 	reflectData.brandArr.push(brandItem);
	// });
	// reflectData.mainMessage=mainMessage;
	return reflectData;
}


function addFunction(){
	$.fn.sildeers = function() {
        var position = function(element) {
        var top = element.position().top, pos = element.css
        ("position");
        $(window).scroll(function() {
        var scrolls = $(this).scrollTop();
        if (scrolls > top) {
                    if (window.XMLHttpRequest) {
                    element.css({
                    position: "fixed",
                    top: 0,
                    left:0,
                    "margin-left":"0px",
                    });
                } else {
                            element.css({
                            top: scrolls,
                            "margin-left":"0px"
                            });
                        }
            }else {
                element.css({
                position: pos,
                top: top,
                "margin-left":"0px"
                });
            }
        });
        };
        return $(this).each(function() {
        position($(this));

        });
    };
    $('.fix-box').sildeers(); 
   
}

function initScroll(){
		var scrollHandler = new PullPush(100, () => {
		},(scrollTop)=>{
			 if(scrollTop<=400){
			 	  $('#rtt').hide();
			 	}else {
			 	   $('#rtt').show();
			 	}
			  QqwUtil.LazyUpLoadImg(scrollTop,1000);
			  let index= QqwUtil.triggerHeadState(scrollTop,'dom_location',300,400);
			  if(index==-1){
			  	return;
			  }
              if(globalIndex==index){
              	return;
              }
              globalIndex=index;
			  womenSecondInstance.trigger('switch_change_state',{index:index});
		});	
        scrollHandler.ob();
     }
  function LazyUpLoadIndexImg(scrollTop,distance){
	    var winH = $(window).height();
        $('.a-lazy-upload').each(function(index, evevt){//遍历每一个元素
            let $cur = $(evevt);
            let top = $cur.offset().top;
            let url= ($cur.data('src'));
            if(url==''){return;}//判断是否已加载
            if(top < scrollTop + winH+distance){
               $cur.css('background','transparent url(' + $cur.data('src') + ') center center / cover no-repeat');
               $cur.data('src')=='';
               $cur.removeClass('a-lazy-upload');
            }
        });
    }
            