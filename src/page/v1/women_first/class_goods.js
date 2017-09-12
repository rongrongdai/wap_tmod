import './class_goods.scss';
import './class_goods.tag';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import QqwApp from '../../../js/qqw_app';
import {  BackendApiClassCon } from 'BackendApi';		// 后台api接口文件
let startGetQqwDataTime = new Date().getTime(); // for 性能检测
let  class_id=geturl("class_id");
let reflectData,
    classInstance,
    isWechat,
    OptClassList,
    qqwPageState={},
    scrollHandler;
    qqwPageState.param={p:1,ps:6};
    qqwPageState.param.class_id=class_id;
    qqwPageState.moreFlag=false;
 QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            riot.mixin('qqwUtil',QqwUtil);
            geturl();
            getClassList();
  });

function qqwOpMixin() {
  // this.ajaxData = QqwUtil.ajaxData;
  this.ajaxOriginalData = QqwUtil.ajaxOriginalData;
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.msg = QqwUtil.msg;
  this.getOptClassList=getOptClassList;
}

//获取URL里面的uid
function geturl(class_id){
  let reg = new RegExp('(^|&)' + class_id + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
// ===========================================================
/**
 * 字典映射 - “38专题首页”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
function getClassListReflectData(data) {
	let reflectData={};
	let urlClassTogo = '/app-goods/rec?class_id=';
	let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
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
                        price:'￥'+goodsitem.shop_price,
                    }
            reflectData.goodslist.push(item);
                   ++idx;
        });
          if(data.cat_img){
           reflectData.cat_img=data.cat_img;
        }
        if(data.cat_name){
           reflectData.cat_name=data.cat_name;
        }
        if(data.class_img){
           reflectData.class_img=data.class_img;
        }
        reflectData.classurl=urlClassTogo +class_id;
        return reflectData;
}
/**
   请求接口渲染列表
 **/
function getClassList(classid){
  let self=this;
             if(class_id==null){
                // console.log(uid);
                   return;
             }else{
                 qqwPageState.enableGetMore=false;
                 QqwUtil.ajaxOriginalData('get',  BackendApiClassCon,qqwPageState.param,(json) => {
                    isWechat=json.os=='wechat'?true:false;
                    qqwPageState.enableGetMore=true;
                    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
                    let reflectData = getClassListReflectData(json.data);
                    let titname=json.data.cat_name;
                    let list=json.data.list;
                         if(qqwPageState.param.p==1){
                            // renderHomepageBanner(json.data.class_img);
                            riot.mixin('util', qqwOpMixin);
                        riot.mixin('event', EventUtil);
                        classInstance=riot.mount('class-goods', reflectData)[0];
                        $('#pushDown').hide();
                         $('#homepage-todoyen').show();
                         initScroll(); 
                         setTitle(titname);
                         noneGoods(list);
                    }else{
                      OptClassList=reflectData.goodslist;
                      classInstance.update({more:true});
                    }
                    if(qqwPageState.param.p<json.data.totalpage){
                      qqwPageState.moreFlag=true;
                      qqwPageState.param.p++;
                     }
                     else{
                      qqwPageState.moreFlag=false;
                        scrollHandler.cancelOb();
                        changPullDisplay(false);
                     }
                    json = null;
                    scrollHandler.isHandling=false;
                    console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
                      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
                });
            }
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
    }

    function noneGoods(list){
      var listlength=list.length;
        if(listlength%2==0){
            $(".goodsmore").addClass("hide");
        }else if(listlength%2==1){
            $(".goodsmore").removeClass("hide");
        }
    }
/**
 * 渲染首屏 banner 块
 * @param  {[type]} banner [banner数据]
 */
// 
// 
// 
// 

/**
 分页
 **/

function getOptClassList(){
	return OptClassList;
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
     	  	getClassList();
            }
                  },(topStance)=>{
                let puljup=document.getElementById('rtt');
                if(topStance<=400){
                    puljup.style.display='none';
                }
                else{
                    puljup.style.display='block';
                }
		});
		scrollHandler.ob();
     }