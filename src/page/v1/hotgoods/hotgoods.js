import './hotgoods.scss';
import './hotgoods.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';

import { BackendApiNavItem } from 'BackendApi';		// 后台api接口文件

    let reflectData
    ,hotgoodsIscrollInstance
    ,OptHotgoodsList
    ,qqwPageState={}
    ,scrollHandler;
    // let $pullDownEl,$pullUpEl,$pullContent;
    qqwPageState.param={p:1,ps:6};
    qqwPageState.param.cid=getQueryString('id');

    let goodsType=getQueryString('type')

    qqwPageState.moreFlag=false; 
    let title=getQueryString('title');   
    setTitle('商品列表');  
    if(goodsType==1){
        getCommentGoodsList();
    }else{
        getHotgoodsList();	
    }        




function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.slideToggle = AnimationUtil.slideToggle;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
	this.iscrollInit = QqwUtil.iscrollInit;
	this.getOptHotgoodsList=getOptHotgoodsList;
}

// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectData(data) {
	let reflectData = {};
	let urlGoodTogo = data.os=='wechat'?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
	reflectData.goodslist = [];
	reflectData.category={};
	let idx = 0;
	Array.from(data.list || []).map((goodsitem) => {
		           let item = {};
			item.Product= {
				userid: goodsitem.uid,
				goodsid:goodsitem.goods_id,
				pic: goodsitem.goods_thumb,
				url: urlGoodTogo + goodsitem.goods_id,
				goodsname: goodsitem.goods_name,
				face: goodsitem.face,
				nickname: goodsitem.nickname,
				price:'￥'+goodsitem.shop_price,
			}
			reflectData.goodslist.push(item);
		         ++idx;
	});
    if(data.banner){
		 reflectData.banner=data.banner;
	}
	return reflectData;
}

function getOptHotgoodsList(){
	return OptHotgoodsList
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


function initScroll(){
		scrollHandler = new PullPush(30, () => {
           if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
           	scrollHandler.isHandling=true;
           	changPullDisplay(true);
     	  	getHotgoodsList();
            }
		});
		scrollHandler.ob();
     }
// function initScroll(){

// $pullDownEl=document.getElementsByClassName('iscrollPullDown')[0];
// $pullUpEl=document.getElementsByClassName('iscrollPullUp')[0];
// $pullContent=document.getElementsByClassName('goodslist')[0];

// hotgoodsIscrollInstance=QqwUtil.iscrollInit($pullDownEl,$pullUpEl,$pullContent,function(instance){
//    console.log('down');
//     qqwPageState.param={p:1,ps:6};
//         getHotgoodsList();
//   },function(instance){
//      if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
//      	  	getHotgoodsList();
//      }
//     console.log('up');
//   });
// hotgoodsIscrollInstance.refresh();
	
// }
function getHotgoodsList(){
  qqwPageState.enableGetMore=false;
  QqwUtil.ajaxData('get', BackendApiNavItem, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(data);
    if(qqwPageState.param.p==1){
	        riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    hotgoodsIscrollInstance=riot.mount('hotgoods', reflectData)[0];
		    $('#pushDown').hide();
		     $('#homepage-todoyen').show();
		     initScroll();
		}else{
			OptHotgoodsList=reflectData.goodslist;
			hotgoodsIscrollInstance.update({more:true});
		}
		if(qqwPageState.param.p<data.pagecount){
		 	qqwPageState.moreFlag=true;
		 	qqwPageState.param.p++;
		 }
		 else{
		 	qqwPageState.moreFlag=false;
		    // scrollHandler.cancelOb();
		    changPullDisplay(false);
		 }
		data = null;
		scrollHandler.isHandling=false;
		console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
}

function  getCommentGoodsList(){
  qqwPageState.enableGetMore=false;
  QqwUtil.ajaxData('get', '/main/more', {index_id:qqwPageState.param.cid}, (data) => {
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(data);
    riot.mixin('util', qqwOpMixin);
    riot.mixin('event', EventUtil);
    hotgoodsIscrollInstance=riot.mount('hotgoods', reflectData)[0];
	$('#pushDown').hide();
	$('#homepage-todoyen').show();
		data = null;
		console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
}

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function setTitle(name){
    	if(name){
    		document.getElementsByTagName('title')[0].innerHTML=name;
    	}
    }

