import './women_first.scss';
import './women_first.tag';	
import './women_second.tag';	
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApiCateGoodsList} from 'BackendApi';		// 后台api接口文件
import { PullPush } from '../../../js/qqw_pullpush.js';
function qqwOpMixin() {
	this.msg = QqwUtil.msg;
    this.ajaxData = QqwUtil.ajaxData;
	this.getPlatform = QqwUtil.getPlatform;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}
let womenFirstInstance,womenSecondInstance,globalIndex=0,
    womenFirstReflectData = {},isWechat,isGoodGoods,enable=true,CategoryArrList=[];

QqwUtil.main(function*(){
	riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
	isGoodGoods=null;
			// 移动端点击事件 hack
			        if(isGoodGoods){
			            $('#content').hide();
			        	$('#second').show();
			            getCateGoodsList(90);
			        }
			    	getCateList(getQueryString('cat_id'));
			    	 }

    // isGoodGoods=getQueryString('isGoodGoods');
    // let cat_id=getQueryString('cat_id');
    // if(isGoodGoods){
    // 	class_id=90;

    // }else if(!cat_id){
    // 	class_id=getQueryString('class_id');
    // }

);
 function getCateGoodsList(id){
 	// 后台数据
	QqwUtil.ajaxOriginalData('get', BackendApiCateGoodsList, {class_id:id}, (json) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
	    isWechat=json.os=='wechat'?true:false;
	    // renderHomepageBanner(json.data.firstClass.class_img);
	    json.data.firstClass.allName.splice(6,2);
		let womenFirstReflectData = getReflectData(json.data,1);
		CategoryArrList[1]=womenFirstReflectData.mainMessage.categoryArr;
	    let tag='women-first#'+'second';
		womenFirstInstance= riot.mount(tag,'women-first', womenFirstReflectData)[0];
		womenSecondInstance= riot.mount('women-second', womenFirstReflectData)[0];
		womenSecondInstance.on('switch_change_state',(object)=>{
	    womenSecondInstance.trigger('change-sub-head',CategoryArrList[object.index]); 	
					    if(object.index==1){
						$('#content').hide();
			        	$('#second').show();
					   }else{
			        	$('#second').hide();
			            $('#content').show();
					  }
			})
	    addFunction();
	          
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
    console.log('白屏时间 = ' + (new Date().getTime() - window.startTime));
	FastClick.attach(document.body);	
}

 function getCateList(id){
 	// 后台数据
	QqwUtil.ajaxOriginalData('get', BackendApiCateGoodsList, {class_id:id}, (json) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
	    isWechat=json.os=='wechat'?true:false;
	    // renderHomepageBanner(json.data.firstClass.class_img);
		let womenFirstReflectData = getReflectData(json.data,2);
		CategoryArrList[0]=womenFirstReflectData.mainMessage.categoryArr;
		   let tag='women-first#'+'content';
		womenFirstInstance= riot.mount(tag,'women-first', womenFirstReflectData)[0];
		if(!isGoodGoods){
			womenSecondInstance= riot.mount('women-second', womenFirstReflectData)[0];
		}
		addFunction();
		$('.homepage-edoyen-aside').show();
		Global.sendShare(getQueryString('cat_id'),8);
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
	if(enable){
	   initScroll();
	   	enable=false;
	}

    console.log('白屏时间 = ' + (new Date().getTime() - window.startTime));
	FastClick.attach(document.body);	
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
function getReflectData(data,indexGood) {
	let i=0;
	$('title').html(data.firstClass.cat_name);
	if(isGoodGoods&&indexGood==2){
		data.firstClass.cat_name='保税直邮'
	}
	if(isGoodGoods){
		$('title').html('蛙国际');
	}
    let reflectData={};
	let mainMessage = {};
	let idx = 0;
	let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
	let activeUrl='/mobile-special/womenActivity?spec_id=';
	let specialUrl='/mobile-special/womenActivity?cat_id=';
	let thirdTypeUrl='/mobile-special/specialThird?class_id=';
	mainMessage.banner=data.firstClass.cat_img;
	mainMessage.title=data.firstClass.cat_name;
	mainMessage.isGoodGoods=isGoodGoods?true:false;
	mainMessage.head_goods_list=data.firstClass.goods_ids;
	mainMessage.categoryArr=[];
	mainMessage.url=urlGoodTogo;
    mainMessage.colorList=data.firstClass.color;
    // mainMessage.colorList={qian:'#232332',shen:'#ff00ff'};
    Array.from(data.firstClass.allName || []).map((brItem) => {
        		let Item = {};
        		Item.cateName=brItem;
        		mainMessage.categoryArr.push(Item);
	});
	mainMessage.goodsBg=data.firstClass.biqiang;
	mainMessage.categoryType= indexGood==1?('categoryType1'):('categoryType');
    reflectData.mainMessage=mainMessage;
    reflectData.brandArr=[];
	Array.from(data.seClass || []).map((brItem) => {
		
		let brandItem = {};
		let nickname = brItem.nickname;
		brandItem.brandid = 'brand'+i.toString() + brItem.id;
		brandItem.speclife = {
			is_show:brItem.is_show=='0'?false:true,
			id: brItem.id,
			title:data.firstClass.cat_name+" · "+brItem.cat_name,
			url: brItem.top10==true? urlTop10Togo:urlGoodTogo + brItem.cat_id,
			id: indexGood==1?('categoryType1'+i):('categoryType'+i)
		}
		i++;
		brandItem.brand = [];		// 品牌特供商品
		if(brItem.goodslist.length>6&&data.firstClass.isMore=='1'){
			brItem.goodslist=brItem.goodslist.splice(0,5);
		}
		Array.from(brItem.goodslist || []).map((goodsItem) => {
			let reflectItem = {
			    userid: goodsItem.uid,
				goodsid:goodsItem.goods_id,
				pic: goodsItem.goods_thumb,
				url: urlGoodTogo + goodsItem.goods_id,
				goodsname: goodsItem.goods_name,
				face: goodsItem.face,
				nickname: goodsItem.nickname,
				price:'￥'+goodsItem.shop_price,
			};
			brandItem.brand.push(reflectItem);
		});
		if(data.firstClass.isMore=='1' ||(data.firstClass.isMore!='1'&& brItem.goodslist.length%2==1)){
			brandItem.brand.push({
			url: thirdTypeUrl+brItem.cat_id,
			showStyle: brItem.style_type || 1,
			more: '查看更多'
		   });
		}
		reflectData.brandArr.push(brandItem);
	});
	return reflectData;
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
  Array.from(banner).map((banneritem) => {
    let bannerLink = document.createElement("a");
    bannerLink.href = banneritem.jump_value || '#';
    bannerLink.className += 'swiper-slide qqw-op-bg';
    bannerLink.style.background = 'transparent url(' + banneritem.ad_img + ') center center / cover no-repeat';
    d.appendChild(bannerLink);
  });
  let $homepageBanner = document.getElementById('homepageRecomBanner');
  $homepageBanner.appendChild(d);


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
  
            