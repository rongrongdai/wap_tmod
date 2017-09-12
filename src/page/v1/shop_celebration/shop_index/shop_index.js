import '../../component/Public-head/index-search.tag';
import '../../component/Public-head/index-search.scss';
import '../../component/Public-head/qqw-head.scss';	
import '../../component/Public-head/qqw-head.tag';
import './shop_index.scss';			// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载
import './shop_index.tag';	
import '../../component/card/message-img-alert-tip.tag';
import '../../component/Public-head/qqw-foot.tag';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { QqwUtil,GlobleToNative } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil.js';
import {BackendApiShopCelebrationIndex,BackendApiShopCelebrationGoodslist,BackendApiTopCategoryList,BackendApinewGiftQualify,BackendApiShopCelebrationScore } from 'BackendApi';		// 后台api接口文件
 let qqwheadIstall
    ,enable=true
    ,userMessage
    ,categoryArr
    ,search
    ,isWechat
    ,homepageInstance
    ,scrollHandler
    ,OptArticleList
    ,womenSecondInstance
    ,womenFirstInstance
    ,globalIndex=0
    ,qqwPageState={};
    qqwPageState.param={p:1,ps:6};
    qqwPageState.moreFlag=false;
    let distance;
QqwUtil.main(function*(){
	FastClick.attach(document.body);			// 移动端点击事件 hack
    riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
    // getMainMessage();
    isWechat=QqwUtil.getPlatform()=='wechat'? true:false;
    if(isWechat){
	     riot.mount('foot-nav',{index:0});
	     wechatTrafficStatistics();
	     search=riot.mount('index-search', {index:0});
	     $(".first-screen-box").css("margin-top","2.05rem");
	     getHeadCategoryList()
	}
    getShopCelebrationIndex();

});


function getHeadCategoryList(){
  QqwUtil.ajaxData('get', BackendApiTopCategoryList, {}, (data) => {
    let reflectData = reflactHeadCategoryData(data);
    let index=parseInt(QqwUtil.getQueryString('index')|| 0, 10)
        reflectData.categoryArr[index].is_choice=true;
        riot.mount('qqwhead', reflectData);
	});
}


function reflactHeadCategoryData(data) {
	let reflectData={};
	reflectData.categoryArr = [];
	Array.from(data.category || []).map((brItem) => {
		let item={}
		item.cateName = brItem.cat_name;
		item.url = brItem.url;
        reflectData.categoryArr.push(item);
	});

	return reflectData;
}



function getShopCelebrationIndex() {
		QqwUtil.ajaxOriginalData('get', BackendApiShopCelebrationIndex, {}, (json) => {
		renderHomepageBanner(json.data.list.banner);
	    userMessage = reflactShopData(json.data);
	    // qqwheadIstall=riot.mount('qqwhead',userMessage)[0];
	    // qqwheadIstall.on((object)=>{
	    // 	let index = object.index;
	    // })
	    if(json.data.ismsg=='1'){
	       riot.mount('message-img-alert-tip',{url:'/static/css/wap/img/shop-celebration/tip.png'});
	       $('.mask').removeClass("hide");
	    }
	    getgoodsList();
		
	});

}

function getgoodsList(){
 	// 后台数据
	QqwUtil.ajaxOriginalData('get', BackendApiShopCelebrationGoodslist, {}, (json) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		let womenFirstReflectData = getReflectGoodslistData(json.data);
		womenFirstReflectData.user=userMessage;
		womenFirstInstance= riot.mount('homepage', womenFirstReflectData)[0];
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
    mainMessage.colorList={qian:'#fff',shen:'#ab2b2b'};
    var i=0
    var user={};
    user.banner=data.banner;
    user.face=data.face;
    user.name=data.nickname;
    user.core=data.score;
    reflectData.user=user;
	Array.from(data.list || []).map((brItem) => {
	    let Item = {};
        Item.cateName=brItem.title;
        mainMessage.categoryArr.push(Item);
		let brandItem = {};
		let nickname = brItem.nickname;
		brandItem.brandid = 'brand'+i.toString() + brItem.id;
		brandItem.speclife = {
			is_show:brItem.is_show=='0'?false:true,
			id: brItem.id,
			title:brItem.title,
			// url: urlGoodTogo + brItem.cat_id,
			id:'categoryType'+i,
			bg:brItem.picture,
			is_margin:true
		}
		i++;
	    brandItem.brand = [];		// 品牌特供商品
		Array.from(brItem.goods || []).map((goodsItem) => {
			let reflectItem = {
			    userid: goodsItem.uid,
				id:goodsItem.goods_id,
				bg: goodsItem.goods_thumb,
				url: urlGoodTogo + goodsItem.goods_id,
				goods_name: goodsItem.goods_name,
				face: goodsItem.face,
				nickname: goodsItem.nickname,
				price:goodsItem.score+'礼券',
				is_show:true
		     	// finish:brItem.is_fin==1 ? false : true
			};
			brandItem.brand.push(reflectItem);
		});
		// if(data.firstClass.isMore=='1' ||(data.firstClass.isMore!='1'&& brItem.goodslist.length%2==1)){
		// 	brandItem.brand.push({
		// 	url: thirdTypeUrl+brItem.cat_id,
		// 	showStyle: brItem.style_type || 1,
		// 	more: '查看更多'
		//    });
		// }
		reflectData.brandArr.push(brandItem);
	});
	reflectData.mainMessage=mainMessage;
	return reflectData;
}

/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function reflactShopData(data) {
	let reflectData = {};
	reflectData.cardList = [];
	reflectData.niceGoodList = [];
	reflectData.categoryArr=[];
	let urlCardTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
    let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
    var head={};
    head.bg=data.list.banner;
    head.url='/mobile-Integral-index/exchange';
    head.score='我的积分:'+data.list.score;
    reflectData.head=head;
    var markCard={};
    markCard.id=data.list.souvenirCard.card_id;
    markCard.pic=data.list.souvenirCard.picture;
    markCard.name=data.list.souvenirCard.card_name;
    markCard.price=data.list.souvenirCard.amount;
    markCard.score=data.list.souvenirCard.score;
    reflectData.markCard=markCard;
 //    Array.from(data.goods || []).map((choositem) => {
	// 	    let item = {};
	// 		item={
	// 			id: choositem.goods_id,
	// 			url:urlGoodTogo+choositem.goods_id,
	// 			name:choositem.goods_name,
	// 			pic: choositem.goods_thumb,
	// 			price:choositem.score+'积分',
	// 			showStyle:"1"
	// 		}
	// 		reflectData.niceGoodList.push(item);
	// });
	let i=0;
	Array.from(data.list.card || []).map((carditem) => {
		    let item = {};
		    i++;
			item={
				id: carditem.card_id,
				// url:urlCardTogo+carditem.card_id,
				index:i,
				pic:carditem.picture,
				name:carditem.card_name,
				price:carditem.amount,
				score:carditem.score,
				hack:true
			}
			reflectData.cardList.push(item);
	});
	var idx=0;
    Array.from(data.category || []).map((choositem) => {
		    let item={
				url:choositem.url,
				cateName:choositem.cat_name,
				is_choice:choositem.is_choice==1 ? true : false,
				index:idx,
				showHack:true
			}
			reflectData.categoryArr.push(item);
		    idx++;
	});
	return reflectData;
}


function wechatTrafficStatistics(){
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?30a09b195977c4ca51279be8bd802d0c";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
}


function initScroll(){
		scrollHandler = new PullPush(18150, () => {
			scrollHandler.isHandling=true;
            // getMoreMessage();
		},(scrollTop)=>{
			 let puljup=document.getElementById('rtt');
			 if(scrollTop<=400){
			 	  puljup.style.display='none';
			 	}else {
			 	   puljup.style.display='block';
			 	}
              LazyUpLoadIndexImg(scrollTop,2000);
              QqwUtil.LazyUpLoadImg(scrollTop,1000);
			  let index= QqwUtil.triggerHeadState(scrollTop,'dom_location',300,400);
			  if(index==-1){
			  	return;
			  }
              if(globalIndex==index){
              	return;
              }
              globalIndex=index;
			  womenFirstInstance.trigger('switch_sub_change_state',{index:index});
          });
		scrollHandler.ob();
     }

/**
 * 整个页面共用一个下拉刷新回调；
 * @param  {[type]} data [接口json数据]
 */     
function getMoreMessage(){
     if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
     	    changPullDisplay(true);
     	  	getArticleList();
     }else{
     	changPullDisplay(false);
     }
}



function changPullDisplay(enable){
    let pullUpEl=document.getElementById('pushMore');
    if(enable){
          pullUpEl.style.display='block';
    }else{
        pullUpEl.className = 'qqw-push-more-no-content';
        pullUpEl.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
    }

        
}

// homepage 页面组件 mixin
function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.GlobleToNative = GlobleToNative;
	this.ajaxOriginalData = QqwUtil.ajaxOriginalData;
	this.getPlatform = QqwUtil.getPlatform;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.getOptArticleList = QqwUtil.getOptArticleList;
	this.msg = QqwUtil.msg;
}

/**
 * 渲染首屏 banner 块
 * @param  {[type]} banner [banner数据]
 */
	function renderHomepageBanner(banner){
	if(!banner){
	return;
	}
	var d=document.createDocumentFragment();
	Array.from(banner).map((item) => {
	var bannerLink=document.createElement("a");
	bannerLink.className+='swiper-slide qqw-op-bg';
	bannerLink.href='javascript:;';
	bannerLink.style.background='transparent url('+item.ad_img+') center center / cover no-repeat';
	d.appendChild(bannerLink);
	});
	var $homepageBanner=document.getElementById('homepageRecomBanner');
	$homepageBanner.appendChild(d);


	var qqwOpSwiper=new window.Swiper('.qqw-banner-top',{
    onClick: function(swiper){
    	if(swiper.clickedIndex > banner.length || swiper.clickedIndex == 0){
    		getNewGoodsStatus(banner[0]);
    	}else{
    	    getNewGoodsStatus(banner[swiper.clickedIndex-1]);
    	}
      },
	autoplay:4000,
	loop:true,
	touchRatio:1,
	observer:true,
	freeMode:false,
	pagination:'.swiper-pagination-top'});

	}

	function getNewGoodsStatus(item){
	     if(item.ad_id =='51')
	     {
	        getExchangeCore();
	     }else if(item.ad_id == '56'){
	        getGiftQualify()
	     }else{
	        window.location.href=item.jump_value||'#';
	     }  	
     }

  function getGiftQualify() {
    QqwUtil.ajaxOriginalData('get',BackendApinewGiftQualify,{},function(json){
	if(json.ret!=0){
	if(json.ret==100001){
	if(QqwUtil.getPlatform()=='wechat'){
	location.href=location.protocol+'//'+location.hostname+'/mobile-user-main/login?return_uri='+location.href;

	}else{
	GlobleToNative.sendToGoLogin();
	}

	}
	// else if(json.ret == -1){
 //       window.location.href='/mobile-anniversary/newGoodsAll';
	// }
	else{
	QqwUtil.msg(json.msg);
	}
	return false;
	}
     window.location.href='/mobile-anniversary/newGoods';

	});
  }


  function getExchangeCore() {
   QqwUtil.ajaxOriginalData('get',BackendApiShopCelebrationScore,{},function(json){
	if(json.ret!=0){
	if(json.ret==100001){
	if(QqwUtil.getPlatform()=='wechat'){
	location.href=location.protocol+'//'+location.hostname+'/mobile-user-main/login?return_uri='+location.href;
	}else{
	GlobleToNative.sendToGoLogin();
	}

	}else{
	  QqwUtil.msg(json.msg);
	}
	return false;
	}
	 window.location.href='/mobile-Integral-index/exchange';
	});

  }


/**
 * 存储网络返回数据 供实例调用
 * @param  {[type]} data [接口json数据]
 */
function getOptArticleList(){
	return OptArticleList
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
                    top: $('.qqw_head_box').height(),
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
    $('.fix-box-homepage').sildeers(); 
   
}  