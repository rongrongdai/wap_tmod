// import './homepage/navitem.scss';			// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载
// import './homepage/navitem.tag';
import './component/Public-head/index-search.tag';
import './component/Public-head/index-search.scss';
import './choice_mager/chomger.scss';
import './choice_mager/chomger.tag';
import './component/Public-head/qqw-head.scss';	
import './component/Public-head/qqw-head.tag';
import './homepage/homepage.scss';			// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载
import './homepage/homepage.tag';
// import './homepage/homepage-nav.tag';	
import './component/Public-head/qqw-foot.tag';
// import './component/card/message-img-alert-tip.tag';
import { PullPush } from '../../js/qqw_pullpush.js';
import { QqwUtil } from '../../js/qqw_ultilities';
import { EventUtil } from '../../js/qqw_eventutil.js';
import { BackendApiwomenIndex,BackendApiMinarticle,BackendApiDiscovery,BackendApiTopCategoryList} from 'BackendApi';		// 后台api接口文件


 const FirstPoint=1800,SecondPoint=8100,ThirdPoint=20000,FouthPoint=30000;
 let qqwBoxSwiper
    ,qqwheadIstall
    ,categoryArr
    ,top20
    ,search
    ,isWechat
    ,reflectTopicList
    ,homepageInstance
    ,iscrollInstance
    ,navitemHomepageInstances=[]
    ,globalIndex=0
    ,OptArticleList
    ,scrollHandler
    ,qqwPageState={};
    qqwPageState.param={p:1,ps:6};
    qqwPageState.moreFlag=false;
    let scrollTopIndex,distance;


QqwUtil.main(function*(){
	FastClick.attach(document.body);			// 移动端点击事件 hack
    riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
    getMainMessage();
  // yield domReady();
  // yield bindChannelMenu();
});



function getHeadCategoryList(){

  QqwUtil.ajaxData('get', BackendApiTopCategoryList, {}, (data) => {
    let reflectData = reflactHeadCategoryData(data);
    let index=parseInt(QqwUtil.getQueryString('index')|| 1, 10)
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


function getMainMessage(){
		QqwUtil.ajaxOriginalData('get', BackendApiwomenIndex, {nogoods:1,cat_id:8}, (json) => {
		isWechat = QqwUtil.getPlatform() == 'wechat'?true:false;
		renderHomepageBanner(json.data.banner);
		let reflectData = reflactMainData(json.data);
		homepageInstance=riot.mount('homepage', reflectData)[0];
		homepageInstance.on('startGetGoodsList',()=>{
             getArticleList();
		})
		// let length=reflectData.categoryArr.length;
		// let categoryArr=[];
		// for(var k=0;k<length;k++){
  //           categoryArr.push(reflectData.categoryArr[k]);
		// }
  //       let reflect={};
  //       reflect.categoryArr=categoryArr;
  //       reflect.categoryArr.unshift({index:0,cateName:'4.26',url:'/mobile-anniversary/index','is_choice':false},{index:1,cateName:'今日上新',url:'/app-main',is_choice:true});
	 //    // qqwheadIstall=riot.mount('qqwhead',reflect)[0];
	    if(isWechat){
		     riot.mount('foot-nav',{index:0});
		     wechatTrafficStatistics();
		     search=riot.mount('index-search', {index:0});
		     $(".qqw-banner-top").css("margin-top","2.05rem");
		     getHeadCategoryList();
		}
	    // qqwheadIstall.on((object)=>{
	    // 	let index = object.index;
	    // })
	    initScroll(); 
	    //添加提示
	    // riot.mount('message-img-alert-tip',{url:'/static/css/wap/img/new_year_toast_tip.png'});
	    // $('.mask').removeClass("hide");
		// let homepageNavInstall = riot.mount('homepage-nav')[0];
		// listenNavChange(homepageNavInstall);
	    FastClick.attach(document.body);			// 移动端点击事件 hack
	    changeBoxWrapperHeight();
		
	});
}
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function reflactMainData(data) {
	let reflectData = {};
	reflectData.activeArr = [];
	reflectData.categoryArr = [];
	reflectData.niceGoodList = [];
	reflectData.url='/mobile-special/womenDay?cat_id='+data.cat_id;
	reflectData.cat_id=data.cat_id;
	let activeUrl='/mobile-special/womenActivity?spec_id=';
	let specialUrl='/mobile-special/specialSecond?cat_id=';
    let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
	let idx = 0;
	Array.from(data.list || []).map((choositem) => {
		    let item = {};
			item={
				spec_id: choositem.spec_id,
				spec_name:choositem.spec_name,
				spec_desc: choositem.spec_desc,
				bg_icon: choositem.recommend_img,
				goods_img: choositem.goods_img,
				bg: choositem.banner_img2,
				url:activeUrl+choositem.spec_id,
				showHack:true
			}

			reflectData.activeArr.push(item);
	});
	Array.from(data.category || []).map((choositem) => {
		    let item = {};
			item={
				cat_id: choositem.cat_id,
				cateName:choositem.cat_name,
				bg: choositem.cat_img,
				bg_icon: choositem.cat_img2,
				url:specialUrl+choositem.cat_id,
				is_choice:false,
				index:idx,
				showHack:true
			}
			if(idx==0){
				item.url=specialUrl+choositem.cat_id+'&isGoodGoods=1111';
			}
			reflectData.categoryArr.push(item);
		    idx++;
	});

    Array.from(data.nice_goods || []).map((choositem) => {
		    let item = {};
			item={
				id: choositem.goods_id,
				url:urlGoodTogo+choositem.goods_id,
				Name:choositem.goods_name,
				bg: choositem.goods_img
			}
			reflectData.niceGoodList.push(item);
	});
    reflectData.brandArr=[];
	return reflectData;
}

function getArticleList(){
   let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
	qqwPageState.enableGetMore=false;
	QqwUtil.ajaxData('get', BackendApiMinarticle, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
		let startRenderQqwOpDataTime = new Date().getTime();	// for 性能检测
		if(qqwPageState.param.p==1){
		    let reflectData = getArticleListReflectData(data);
		    OptArticleList=reflectData.brandArr;
			homepageInstance.update();
			homepageInstance.index=0;
			navitemHomepageInstances.push(homepageInstance);
	        document.getElementById('progress').style.height = 0;
		    $('#pushDown').hide();
		     $('#homepage-todoyen').show();
		     QqwUtil.LazyUpLoadImg(0,2000);
		     // getChooseList();
		}else{
		   let reflectData = getArticleListReflectData(data);
			scrollHandler.isHandling=false;
			OptArticleList=reflectData.brandArr;
			homepageInstance.update();
		}
		if(qqwPageState.param.p<data.pagecount){
		 	qqwPageState.moreFlag=true
		 	qqwPageState.param.p++;
		 }
		 else{
		 	qqwPageState.moreFlag=false;
		 }
		data = null;
		if(scrollHandler){
			scrollHandler.isHandling=false;
		}
	   // FastClick.attach(document.body);
	    // iscrollInstance.refresh();	
		changeBoxWrapperHeight();
		// Global.sendAddPullToRefersh();
		// changPullDisplay();
		console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() -startGetQqwOpDataTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startRenderQqwOpDataTime));
	});
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
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getBackChoosData(data) {
	let reflectData = {};
	reflectData.chooseList = [];
	let idx = 0;
	Array.from(data.doyen[0].list || []).map((choositem) => {
		    let item = {};
			item={
				doyen_id: choositem.doyen_id,
				position:choositem.position,
				nickname: choositem.nickname,
				position: choositem.position,
				face: choositem.face,
				show_picture: choositem.show_picture,
				name: choositem.name,
				slogan:choositem.slogan,
				article_num:choositem.goods_num+'件商品',
				doyen_type:choositem.doyen_type,
                is_delete:choositem.is_delete,
                haveFocus:choositem.isFollow=='1'?1:0,
                follows:choositem.follows,
                position_type:choositem.position_type,
                uid:choositem.uid
			}

			reflectData.chooseList.push(item);
	});
  if(data.doyen[1]){
   Array.from(data.doyen[1].list || []).map((choositem) => {
		    let item = {};
			item={
				doyen_id: choositem.doyen_id,
				position:choositem.position,
				nickname: choositem.nickname,
				position: choositem.position,
				face: choositem.face,
				show_picture: choositem.show_picture,
				name: choositem.name,
				slogan:choositem.slogan,
				article_num:choositem.article_num+'篇文章',
				doyen_type:choositem.doyen_type,
                is_delete:choositem.is_delete,
                haveFocus:choositem.isFollow=='1'?1:0,
                follows:choositem.follows,
                position_type:choositem.position_type,
                uid:choositem.uid
			}

			reflectData.chooseList.push(item);
	});
   }
    if(data.doyen[2]){
	Array.from(data.doyen[2].list || []).map((choositem) => {
		    let item = {};
			item={
				doyen_id: choositem.doyen_id,
				position:choositem.position,
				nickname: choositem.nickname,
				position: choositem.position,
				face: choositem.face,
				show_picture: choositem.show_picture,
				name: choositem.name,
				slogan:choositem.slogan,
				article_num:choositem.goods_num+'件商品',
				doyen_type:choositem.doyen_type,
                is_delete:choositem.is_delete,
                haveFocus:choositem.isFollow=='1'?1:0,
                follows:choositem.follows,
                position_type:choositem.position_type,
                uid:choositem.uid
			}

			reflectData.chooseList.push(item);
	});
   }
	reflectData.url=data.video_url;
	reflectData.pic=data.video_pic;
	return reflectData;
}


  function getChooseList(){
  	  	QqwUtil.ajaxData('get', BackendApiDiscovery, null, (data) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
		let reflectData=getBackChoosData(data);
		 reflectData.index=0;
	    riot.mount('chomger',reflectData);
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
  }




/**
 * 存储网络返回数据 供实例调用
 * @param  {[type]} data [接口json数据]
 */
function getOptArticleList(){
	return OptArticleList
}
function initScroll(){
		scrollHandler = new PullPush(18150, () => {
			scrollHandler.isHandling=true;
			console.log('fdjvsdfvj');
            getMoreMessage();
		},(scrollTop)=>{
			 let puljup=document.getElementById('rtt');
			 if(scrollTop<=400){
			 	  puljup.style.display='none';
			 	}else {
			 	   puljup.style.display='block';
			 	}
          // console.log('scrollTop:'+scrollTop);
          // triggerHeadOpacity(scrollTop);
          triggerHeadState(scrollTop);
          LazyUpLoadIndexImg(scrollTop,2000);
          QqwUtil.LazyUpLoadImg(scrollTop,2000);
          },
          );
		scrollHandler.ob();
     }
/**
 * 改变头部的显示影藏；
 * @param scrollTop 滑动距离顶部的距离
 */ 
function triggerHeadOpacity(scrollTop){
          let opacity=0;
          if(scrollTop<300){
            opacity=0;
          }
          else if(scrollTop>300&&scrollTop<500){
           	opacity=(scrollTop-300)/200;
          }
          else{
          		opacity=1;
          }
         qqwheadIstall.trigger('switch-opacity',{'opacity':opacity});
}   

/**
 * 改变头部的状态；
 * @param scrollTop 滑动距离顶部的距离
 */ 

function triggerHeadState(scrollTop){
       let $c=$('#scrollHereId2')[0];
       var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      if($c){
       	   var top = $c.offsetTop-350;
     if(scrollTop <= top && top <= 5000 + scrollTop ){
                if(isiOS){
                 getMoreMessage();

             }
           }
        }         
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
    changeBoxWrapperHeight();
        
}

function registBoxSwiper(){
	qqwBoxSwiper = new window.Swiper ('.qqw-banner-box', {
  		calculateHeight:true,
            autoHeight: true,
    	    touchRatio: 1,
    		observer: true,
    		freeMode: false,
    		hashnav:true,
	    onSlideChangeEnd: function(swiper){
             qqwheadIstall.trigger('switch_change_state',{'index':swiper.activeIndex});
             globalIndex=swiper.activeIndex;
             creatNavitem(swiper.activeIndex);
             console.log('trigger  index:'+swiper.activeIndex);
             qqwBoxSwiper.updateContainerSize();
         }
       	});
}
// ===========================================================
function domReady() {
	return new Promise(reslove => {
    EventUtil.addHandler(document, "DOMContentLoaded", (e) => {
    	reslove('dom ready');
    });
  });
}
function bindLikeSign() {
	EventUtil.addHandler(window, 'storage', (e) => {
		let likeSignChangeObj = localStorage.get('thumb_num');
		if (likeSignChangeObj) {
			let likeArr = likeSignChangeObj.splite(';');
			let $likeSigns = QqwUtil.$q('.geek-like');
			for (let idx = 0, size = $likeSigns.length; idx < size; ++idx) {
				if ($likeSigns[idx].firstElementChild.dataset.loveid === likeArr[0]) {
					$likeSigns[idx].lastElementChild.innerHTML = likeArr[1];
					break;
				}
			}
		}
	});
}

// function bindChannelMenu() {
// 	return new Promise(reslove => {
// 		EventUtil.addHandler(document.getElementById('channelMenu'), "click", (e) => {
// 	  	e = EventUtil.getEvent(e);
// 	  	let target = EventUtil.getTarget(e);
// 	  	let className = target.className;

// 	    if (className.indexOf('hcm-1') !== -1 || className.indexOf('hcm-img-1') !== -1) {
// 	    	Global.sendEvent('event_pinpai1');
// 	    // } else if (className.indexOf('hcm-3') !== -1 || className.indexOf('hcm-img-3') !== -1) {
// 	    	// Global.sendToArtSpecial();
// 	    } else if (className.indexOf('hcm-4') !== -1 || className.indexOf('hcm-img-4') !== -1) {
// 	    	// Global.sendToDoyen();

// 	    } else if (className.indexOf('hcm-5') !== -1 || className.indexOf('hcm-img-5') !== -1) {
// 	    	// Global.sendToCategory();
// 	    }
// 	  	reslove('bind completed');

// 	  });
// 	});
// }



// homepage 页面组件 mixin
function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.ajaxOriginalData = QqwUtil.ajaxOriginalData;
	this.getPlatform = QqwUtil.getPlatform;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.getOptArticleList=getOptArticleList;
}

// EventUtil.addHandler(document, "DOMContentLoaded", (e) => {
// 	console.log('白屏时间 = ' + (new Date().getTime() - window.startTime));
// 	Global.sendAddPullToRefersh();
// 	FastClick.attach(document.body);			// 移动端点击事件 hack
// 	EventUtil.addHandler(document.getElementById('channelMenu'), "click", (e) => {
//   	e = EventUtil.getEvent(e);
//   	let target = EventUtil.getTarget(e);
//     let lenOfClassName = target.className.length;
//     let classTarget = target.className.substring(lenOfClassName-5, lenOfClassName);
//     if (classTarget === 'hcm-1') {
//     	Global.sendEvent('event_pinpai1');
//     } else if (classTarget === 'hcm-3') {
//     	Global.sendToArtSpecial();
//     } else if (classTarget === 'hcm-4') {
//     	Global.sendToDoyen();
//     }
//   });
// });

/**
 * 渲染首屏 banner 块
 * @param  {[type]} banner [banner数据]
 */
function renderHomepageBanner(banner) {
	if (!banner) {
		return;
	}
	let d = document.createDocumentFragment();
	Array.from(banner).map((item) => {
		let bannerLink = document.createElement("a");
		bannerLink.href = item.jump_value || '#';
		bannerLink.className += 'swiper-slide qqw-op-bg';
		bannerLink.style.background = 'transparent url(' + item.ad_img + ') center center / cover no-repeat';
		d.appendChild(bannerLink);
	});
	let $homepageBanner = document.getElementById('homepageRecomBanner');
	$homepageBanner.appendChild(d);

	// 进度条


     // $('#test').click(()=>{
     //   console.log(qqwBoxSwiper.params);
     // })

    var qqwOpSwiper = new window.Swiper ('.qqw-banner-top', {
		autoplay: 4000,
	    loop: true,
	    touchRatio: 1,
  		observer: true,
  		freeMode: false,
	    pagination: '.swiper-pagination-top'
	});
}


/**
 * 渲染屏幕Navitem模块
 * @param  {[type]} banner [banner数据]
 */
function renderHomepageNavitem(categoryArr) {
	if (!categoryArr) {
		return;
	}
	let d = document.createDocumentFragment();
	Array.from(categoryArr).map((item) => {
	  let swiperLink = document.createElement("div");
		swiperLink.className +='swiper-slide';
		if(item.cateName!='首页'){
             d.appendChild(swiperLink);
		}

	});
	let $homepageNavitem = document.getElementById('swiper-wrapper-box');
	$homepageNavitem.appendChild(d);
}

// 监听homepage-nav 发来的指令
function  listenNavChange(install){
	install.on('navClick', (Object)=>{
          qqwheadIstall.trigger('scrollPoint',{index:Object.index});//向头部标签发出触发滚动的指令
	    })
	}

function changeBoxWrapperHeight(){ 
var H = $(".qqw-banner-box .first-screen-box").height();
$(".qqw-banner-box .swiper-slide").eq(0).css('height', H + 'px');
$(".qqw-banner-box .swiper-wrapper").eq(0).css('height', H + 'px');
}

// function getScrollTop() {
// 	let scrollTop = 0;
// 	scrollTop = (document.body.scrollTop>document.documentElement.scrollTop) ? document.body.scrollTop:document.documentElement.scrollTop;
// 	return scrollTop;
// }


// function returnToTop(){
// 	   document.body.scrollTop=0;
//        document.documentElement.scrollTop=0;
//     // let intOutTime=5,timeOutTime=1000,i=0;
//     // let intOut,scrollTop=getScrollTop(),speed=timeOutTime/intOutTime;
//     // setTimeout(()=>{
//     //       window.clearInterval(intOut);
//     //       document.body.scrollTop=0;
//     //       document.documentElement.scrollTop=0;
//     //   	},timeOutTime);
//     // intOut=setInterval(()=>{
//     // 	  i++;
//     //       document.body.scrollTop=scrollTop/speed*(speed-i);
//     //       document.documentElement.scrollTop=scrollTop/speed*(speed-i);
//     //      },intOutTime);
// }


function creatNavitem(index){
	let indexs = parseInt(index)
	// scrollHandler.isHandling=false;
	// returnToTop();
	if(indexs==0){
		changeBoxWrapperHeight();
		return;
	};
	let $slideNavitem=$("#swiper-wrapper-box").find('div.swiper-slide')[indexs];
    if($($slideNavitem).find('navitem').length==0){
    	    let navitem = document.createElement("navitem");
    	    let idName='navitem'+indexs
    	    let tag='navitem#'+idName;
    	    navitem.id= idName;
    	    $($slideNavitem).append(navitem);
    	    let install=riot.mount(tag,'navitem',{categoryId:categoryArr[index].id,index:indexs})[0];
    	    install.index=indexs;
    	    navitemHomepageInstances.push(install);
    	}
}



function addTopic10ToArticleList(listData){
	   let list=[];
       let item={};
       item.top10=true;
       item.is_show='1';
       item.id='';
       item.picurl1='/static/css/wap/img/TOPbanner.png';
       item.style_type=1;
       item.title='Top热销榜';
       item.goods=listData;
       list.push(item);
       let box={};
       box.list=list;
       return getArticleListReflectData(box);
}

/**
 * 文章列表模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 let i=0;
function getArticleListReflectData(data) {
	let reflectData={};
	let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
	let urlTop10Togo = '/app-goods/hotlist';
	let urlArticlTogo = '/app-article/detail?id=';
	let urlGoodListTogo = '/app-goods/rec?type=1&id=';
	// 品牌特供
	reflectData.brandArr = [];
	Array.from(data.list || []).map((brItem) => {
		i++;
		let brandItem = {};
		let nickname = brItem.nickname;
		brandItem.brandid = 'brand'+i.toString() + brItem.id;
		brandItem.speclife = {
			is_show:brItem.is_show=='0'?false:true,
			id: brItem.id,
			bg: brItem.picurl1,
			url: brItem.top10==true? urlTop10Togo:urlGoodTogo + brItem.id,
			slogan: brItem.title,
			doyen_id: brItem.uid,
			position: brItem.position+' ·',
			face: brItem.face,
			haveFocus:brItem.isFollow==0?0:1,
			nickname:brItem.nickname+'  '+'推荐'
		}
		brandItem.brand = [];		// 品牌特供商品
		Array.from(brItem.goods || []).map((goodsItem) => {
			let reflectItem = {
				url: urlGoodTogo + goodsItem.goods_id,
				pic: goodsItem.goods_thumb,
				showStyle: brItem.style_type || 1,
				name: goodsItem.goods_name,
				price: '￥' + (goodsItem.shop_price || '0.00')
			};
			brandItem.brand.push(reflectItem);
		});
		brandItem.brand.push({
			url: brItem.top10==true ? urlTop10Togo:urlGoodListTogo+brItem.index_id+'&title='+encodeURI(brItem.title),
			showStyle: brItem.style_type || 1,
			more: '查看更多'
		});
		reflectData.brandArr.push(brandItem);
	});
	return reflectData;
}


window.nativeChangeJoinE=function(id){
    var className ='.tidItem'+id;
    var count=parseInt($(className).data('count'), 10)+1;
    var html='已有'+count+'人参与';
    $(className).html(html);
 }

window.nativeChangeFocusE= function(uid,state,count){
	state =parseInt(state);
	var className='.btnfocus'+ uid;
	$(className).attr('data-haveFocus',state);
    $(className).each(function(index,event){
           	 if($(event).hasClass('ma_opt')){
           	   focusState ? $(className).addClass('chang_bg'): $(className).removeClass('chang_bg');
              }
           });
    $(className).find('span').html= state==1 ? '已关注':'关注';  
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