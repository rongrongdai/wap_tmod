import './userb.scss';
import '../component/card/doyen-goods.tag';
import '../component/card/info-b.tag';
import '../component/card/article-list.tag';
import '../component/button/button-like.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwPagestate from '../../../js/qqw_pagestate';
import QqwApp from '../../../js/qqw_app';


import { BackendApiNavItem,BackendApiUserb,BackendApiBindButler,BackendApiArticleList } from 'BackendApi';		// 后台api接口文件
let  doyen_id='?doyen_id='+ geturl("doyen_id");
 // let paramid={doyen_id,uid};
 let reflectData
      ,hotgoodsIscrollInstance
     ,articleIscrollInstance
      ,uesrinfoInstance
    // ,OptgoodsList
    // ,OptarticleList
    ,OptConList
    ,qqwPageState={}
    ,scrollHandler;
    qqwPageState.param={p:1,ps:10};
    qqwPageState.moreFlag=false; 
    let udata=null;
 function getUrlReg(gjid){
             let self=this;
             if(doyen_id==null){
                // console.log(uid);
                   return;
             }else{
                  //用户信息
	         QqwUtil.ajaxData('get', BackendApiUserb,doyen_id, (data) => {
			    let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
			     let reflectData = getUserReflectData(data);
			     uesrinfoInstance=riot.mount('info-b', reflectData);
			     var drname=data.doyen.nickname;
			     $(".username").text(drname);
			     udata=data;
			     getConList();
		});

	        
             }
}
function getUserReflectData(data) {
	   let positiontype=data.doyen.position_type;
	   if(positiontype==1){
	   	data.doyen.article_num= data.doyen.goods_num+'件商品';
		 }else if(positiontype==2){
		 	data.doyen.article_num= data.doyen.article_num+'篇文章';
		 }else if(positiontype==3){
		 	data.doyen.article_num= data.doyen.goods_num+'件商品';
               }
               let reflectData = {};
    	    reflectData.wchat= data.os;
                reflectData.uid= data.doyen.uid;
	    reflectData.nickname = data.doyen.nickname;
	    reflectData.position= data.doyen.position;
	    reflectData.position_type=data.doyen.position_type;
	    reflectData.show_picture= data.doyen.show_picture;
	    reflectData.brief = data.doyen.brief;
	    reflectData.article_num= data.doyen.article_num;
	    reflectData.face= data.doyen.face;
	    reflectData.userid= data.doyen.userid;
	    reflectData.is_follow= data.doyen.is_follow;
                return reflectData;
}

function getConList() {
	let positiontype=udata.doyen.position_type;
	let userid=udata.doyen.userid;
	 if(positiontype==1){
	 	getGoodsList(userid);
	 }else if(positiontype==2){
	 	getArticleList(userid);
	 }else if(positiontype==3){
	 	getGoodsList(userid); 
	 }
}
function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.slideToggle = AnimationUtil.slideToggle;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
	this.getPlatform = QqwUtil.getPlatform;
	this.iscrollInit = QqwUtil.iscrollInit;
	this.getOptConList=getOptConList;
	// this.getOptgoodsList=getOptgoodsList;
	// this.getOptarticleList=getOptarticleList;
}
(new QqwApp())
		.domReady(() => {
			getUrlReg();
			riot.mixin('util', qqwOpMixin);
			riot.mixin('event', EventUtil);
			riot.mixin('qqwUtil',QqwUtil);
		})
		.start();

//获取URL里面的uid
function geturl(uid){
	let reg = new RegExp('(^|&)' + uid + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
// ===========================================================
/**
 * 字典映射 - “商品列表”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
function getGoodsReflectData(data) {
	let reflectData = {};
	let urlGoodTogo = '/app-goods/detail?id=';
	reflectData.goodslist = [];
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
				price:goodsitem.shop_price,
			}
			reflectData.goodslist.push(item);
		         ++idx;
	});
	return reflectData;

}


/**
 * 字典映射 - “文章列表”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
function getArticleReflectData(data) {
	let reflectData = {};
	let urlArticlListTogo = '/app-article/detail?id=';
	reflectData.isSubpageActive = true;
	reflectData.articlelist = [];
	let idx = 0;
	Array.from(data.list || []).map((articleitem) => {
		           let articlecon = {};
			articlecon.speclife= {
				logo:articleitem.logo,			// 图标
				identity: articleitem.title || '这里是标语',
				bg: articleitem.picurl1,
				url: urlArticlListTogo +articleitem.id,
				title: articleitem.doyen_name,
				desc: articleitem.doyen_name,
				lovenum: articleitem.love_num,
				islove: articleitem.islove,
				id:articleitem.id
			}
			reflectData.articlelist.push(articlecon);
		         ++idx;
	});

	return reflectData;
}


function getGoodsList(userid){
  qqwPageState.enableGetMore=false;
  qqwPageState.param.userid=userid;
  QqwUtil.ajaxData('get', BackendApiNavItem, qqwPageState.param,(data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getGoodsReflectData(data);
	       if(qqwPageState.param.p==1){
	                riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    hotgoodsIscrollInstance=riot.mount('doyen-goods', reflectData)[0];
		    $('#pushDown').hide();
		     $('#homepage-todoyen').show();
		     initScroll(); 
		}else{
			OptConList=reflectData.goodslist;
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

function getArticleList(userid){
  qqwPageState.enableGetMore=false;
  qqwPageState.param.userid=userid;
  QqwUtil.ajaxData('get', BackendApiArticleList,qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getArticleReflectData(data);
	           if(qqwPageState.param.p==1){
	                riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    articleIscrollInstance=riot.mount('article-list', reflectData)[0];
		    $('#pushDown').hide();
		     $('#homepage-todoyen').show();
		     initScroll(); 
		}else{
			OptConList=reflectData.goodslist;
			 articleIscrollInstance.update({more:true});
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


/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */

function getOptConList(){
	return OptConList
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
     	  	getConList();
            }
		});
		scrollHandler.ob();
     }