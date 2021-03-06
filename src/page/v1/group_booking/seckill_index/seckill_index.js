import '../../component/Public-head/index-search.tag';
import '../../component/Public-head/index-search.scss';
import '../../component/Public-head/qqw-head.scss';	
import '../../component/Public-head/qqw-head.tag';
import './seckill_index.scss';			// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载
import './seckill_index.tag';	
import '../../component/Public-head/qqw-foot.tag';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { QqwUtil,GlobleToNative } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil.js';
import {BackendApiseckillIndex,BackendApiTopCategoryList} from 'BackendApi';		// 后台api接口文件
 let qqwheadIstall
    ,hompageInstall
    ,enable=true
    ,search
    ,isWechat
    ,scrollHandler
    ,OptArticleList
    ,qqwPageState={};
    qqwPageState.param={p:1,ps:6};
    qqwPageState.moreFlag=false;
    let distance;
QqwUtil.main(function*(){
	FastClick.attach(document.body);			// 移动端点击事件 hack
    riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
	isWechat=QqwUtil.getPlatform()=='wechat' ? true:false;
	if(isWechat){
	     riot.mount('foot-nav',{index:0});
	     search=riot.mount('index-search', {index:0});
	     $(".first-screen-box").css("margin-top","2.05rem");
	     getHeadCategoryList();
	}
    getMainMessage();
});

function getMainMessage(){
	QqwUtil.ajaxOriginalData('get', BackendApiseckillIndex, qqwPageState.param, (json) => {
     qqwPageState.enableGetMore=true;
     if(qqwPageState.param.p==1){


		    // renderHomepageBanner(json.data.banner);
			let reflectData = reflactMainData(json.data);
		    // qqwheadIstall=riot.mount('qqwhead',reflectData)[0];
		    hompageInstall=riot.mount('homepage',reflectData)[0];
		    // qqwheadIstall.on((object)=>{
		    // 	let index = object.index;
		    // })
		    LazyUpLoadIndexImg(0,2000);
		    // initScroll(); 

    }else{
	    	let reflectData = reflactMainData(json.data);
	        OptArticleList=reflectData.brandArr;
	    	hompageInstall.update();
    }
    if(qqwPageState.param.p<json.data.pagecount){
      qqwPageState.moreFlag=true;
      qqwPageState.param.p++;
     }
     else{
      qqwPageState.moreFlag=false;
        changPullDisplay(false);
     }
    json.data = null;
	});
}

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

/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function reflactMainData(data) {
	let reflectData = {};
	reflectData.top_list=[];
	reflectData.brandArr=[];
	let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
	let idx = 0;
	reflectData.banner = data.head_img;
    Array.from(data.list || []).map((brItem) => {
    	var brandItem={};
		brandItem.speclife = {
			id: brItem.goods_id,
			goods_name: brItem.goods_name,
			bg: brItem.banner_img,
			url:urlGoodTogo+brItem.goods_id,
			face: brItem.face,
			price: '￥'+brItem.seckill_price,
			old_price: '￥'+(brItem.seckill_price/brItem.discount).toFixed(2),
			num: '已抢'+brItem.total_num+'件',
			toast_str:brItem.seckill_str,
			start_time:parseInt(brItem.start_time, 10),
			end_time:parseInt(brItem.end_time, 10),
			activity: true
		}
	    reflectData.top_list.push(brandItem);
	});
	Array.from(data.future_list || []).map((brItem) => {
    	var brandItem={};
		brandItem.speclife = {
			id: brItem.goods_id,
			goods_name: brItem.goods_name,
			bg: brItem.banner_img,
			url:brItem.is_fin==1 ? urlGoodTogo+brItem.goods_id : ''  ,
			price: '￥'+brItem.seckill_price,
			old_price: '￥'+(brItem.seckill_price/brItem.discount).toFixed(2),
			toast_str: brItem.seckill_str,
			num: '已团'+brItem.join_num+'件',
			activity:false
		}
	    reflectData.brandArr.push(brandItem);
	});
	return reflectData;
}
 function getQueryString(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        };

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
            getMoreMessage();
		},(scrollTop)=>{
			 let puljup=document.getElementById('rtt');
			 if(scrollTop<=400){
			 	  puljup.style.display='none';
			 	}else {
			 	   puljup.style.display='block';
			 	}
          LazyUpLoadIndexImg(scrollTop,2000);
          // QqwUtil.LazyUpLoadImg(scrollTop,2000);
          },
          );
		scrollHandler.ob();
     }

/**
 * 整个页面共用一个下拉刷新回调；
 * @param  {[type]} data [接口json数据]
 */     
function getMoreMessage(){
     if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
     	    changPullDisplay(true);
     	    qqwPageState.enableGetMore=false;
     	  	getMainMessage();
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
	this.getOptArticleList = getOptArticleList;
}

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
		bannerLink.style.background = 'transparent url(' + item.picure + ') center center / cover no-repeat';
		d.appendChild(bannerLink);
	});
	let $homepageBanner = document.getElementById('homepageRecomBanner');
	$homepageBanner.appendChild(d);


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
                    top: 80,
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