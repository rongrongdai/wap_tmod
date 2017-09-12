import './windex.scss';
import './whead.tag';
import './item-list.tag';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import QqwApp from '../../../js/qqw_app';
import {  BackendApiwomenIndex } from 'BackendApi';		// 后台api接口文件
let startGetQqwDataTime = new Date().getTime(); // for 性能检测
let  cat_id=geturl("cat_id");
let reflectData,
   womenitemInstance,
    categoryArr,
    isWechat,
    globalIndex=0,
    OptItemList,
    riothead,
    qqwPageState={},
    goodsnum={},
    scrollHandler;
    qqwPageState.param={p:1,ps:2};
    goodsnum.num={pagesize:7};
    goodsnum.num.cat_id=cat_id;
    qqwPageState.moreFlag=false;
 QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            riot.mixin('qqwUtil',QqwUtil);
            geturl();
            getItemList();
            // mountNavitem(0,{index:0});
  });
function qqwOpMixin() {
  // this.ajaxData = QqwUtil.ajaxData;
  this.ajaxOriginalData = QqwUtil.ajaxOriginalData;
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.msg = QqwUtil.msg;
  this.getOptItemList=getOptItemList;
}
//获取URL里面的uid
function geturl(cat_id){
  let reg = new RegExp('(^|&)' + cat_id + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
/**
 * 渲染顶部导航
 */
function head(reflectData){
  riot.mixin('util', qqwOpMixin);
  riot.mixin('event', EventUtil);
  riothead=riot.mount('whead',reflectData)[0];
  listenTagChange(riothead);
}
/**
 * 点击导航切换列表
 */
function  listenTagChange(install){
    install.on('switch_change', (switchObject)=>{
       let index=switchObject.index;
       console.log(index);
       globalIndex=index;
         if(index==0){
         	document.getElementById("goods0").scrollIntoView();
         	window.scrollBy(0,-150);
         }else if(index==1){
            document.getElementById("goods1").scrollIntoView();
            window.scrollBy(0,-150);
         }else if(index==2){
            document.getElementById("goods2").scrollIntoView();
            window.scrollBy(0,-150);
         }else if(index==3){
         	document.getElementById("goods3").scrollIntoView();
         	window.scrollBy(0,-150);
         }else if(index==4){
         	document.getElementById("goods4").scrollIntoView();
         	window.scrollBy(0,-150);
         }else if(index==5){
         	document.getElementById("goods5").scrollIntoView();
         	window.scrollBy(0,-150);
         }
       });
}
// ===========================================================
/**
 * nav定位
 */
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
    $('#navbox').sildeers(); 
   
}
// ===========================================================
/**
 * 字典映射 - “38专题首页”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
 let i=0;
function getWomenListReflectData(data) {
	let reflectData={};
	let urlClassTogo = '/mobile-special/womenActivity?spec_id=';
	let urlGoodTogo =  isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
      reflectData.endTime=data.end_time;
      reflectData.startTime=data.start_time;
      reflectData.resetTime=data.reset_time;
	// 品牌特供
	reflectData.listArr = [];
	Array.from(data.list || []).map((brItem) => {
		i++;
		let brandItem = {};
		brandItem.speclife = {
			spec_id:brItem.spec_id,
			spec_name: brItem.spec_name,
                  format_start_time: brItem.format_start_time,
                  format_end_time: brItem.format_end_time,
			banner_img: brItem.banner_img,
			classurl: urlClassTogo +brItem.spec_id,
		}
		brandItem.goodslist = [];		// 品牌特供商品
		Array.from(brItem.goods_list|| []).map((goodsitem) => {
			let Product= {
				userid: goodsitem.uid,
				goodsid:goodsitem.goods_id,
				pic: goodsitem.goods_thumb,
				goodsurl: urlGoodTogo + goodsitem.goods_id,
				goodsname: goodsitem.goods_name,
				face: goodsitem.face,
				nickname: goodsitem.nickname,
				price:goodsitem.promote_price,
			}
			brandItem.goodslist.push(Product);
		});
		reflectData.listArr.push(brandItem);
	});
	return reflectData;
}
/**
   请求接口渲染列表
 **/
function getItemList(userid){
  qqwPageState.enableGetMore=false;
  // qqwPageState.param.userid=userid;
  QqwUtil.ajaxOriginalData('get',  BackendApiwomenIndex,goodsnum.num,(json) => {
        isWechat=json.os=='wechat'?true:false;
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getWomenListReflectData(json.data);
    let titname=json.data.cat_name;
     setTitle(titname);  
     head(reflectData);
	       if(qqwPageState.param.p==1){
	          riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    womenitemInstance=riot.mount('item-list', reflectData)[0];
                addFunction();
		    $('#pushDown').hide();
		     $('#homepage-todoyen').show();
		     initScroll(); 
         Global.sendShare(1,10);
		}else{
			OptItemList=reflectData.listArr;
			womenitemInstance.update({more:true});
		}
		if(qqwPageState.param.p<json.data.pagecount){
		 	qqwPageState.moreFlag=true;
		 	qqwPageState.param.p++;
		 }
		 else{
		 	qqwPageState.moreFlag=false;
		    // scrollHandler.cancelOb();
		    changPullDisplay(false);
		 }
		json = null;
		scrollHandler.isHandling=false;
		console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
}
    function setTitle(titname){
      var $body = $('body');
      document.title =titname;
      // var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
      // $iframe.on('load',function() {
      //   setTimeout(function() {
      //     $iframe.off('load').remove();
      //   }, 0);
      // }).appendTo($body);
     // let head=document.getElementsByTagName("head")[0];
     // var title = document.createElement("title");
     //  title.innerHTML = titname;
     //  head.appendChild(title);
    }
/**
 分页
 **/

function getOptItemList(){
	return OptItemList;
}


function changPullDisplay(enable){
    let pullUpEl=document.getElementById('pushMore');
    if(enable){
          // pullUpEl.style.display='block';
    }else{
        // pullUpEl.className = 'qqw-push-more-no-content';
        // pullUpEl.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
    }
        
}


function initScroll(){
		scrollHandler = new PullPush(30, () => {
           if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
           	scrollHandler.isHandling=true;
           	changPullDisplay(true);
     	  	getItemList();
            }
		});
		scrollHandler.ob();
     }