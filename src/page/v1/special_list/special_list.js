import './special_list.scss';
import './special_list.tag';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import QqwApp from '../../../js/qqw_app';
import {  BackendApiwomenIndex } from 'BackendApi';		// 后台api接口文件
let startGetQqwDataTime = new Date().getTime(); // for 性能检测
let  cat_id=geturl("cat_id");
let reflectData,
    classInstance,
    isWechat,
    OptClassList,
    qqwPageState={},
    scrollHandler;
    qqwPageState.param={p:1,ps:3};
    qqwPageState.param.cat_id=cat_id;
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
function geturl(cat_id){
  let reg = new RegExp('(^|&)' + cat_id + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
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
      banner_img2:brItem.banner_img2,
    }
    reflectData.listArr.push(brandItem);
  });
  return reflectData;
}
/**
   请求接口渲染列表
 **/
function getClassList(cat_id){
                let self=this;
                 qqwPageState.enableGetMore=false;
                 QqwUtil.ajaxOriginalData('get', BackendApiwomenIndex,qqwPageState.param,(json) => {
                    isWechat=json.os=='wechat'?true:false;
                    qqwPageState.enableGetMore=true;
                    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
                    let reflectData = getWomenListReflectData(json.data);
                         if(qqwPageState.param.p==1){
                            riot.mixin('util', qqwOpMixin);
                        riot.mixin('event', EventUtil);
                        classInstance=riot.mount('special-list', reflectData)[0];
                        $('#pushDown').hide();
                         $('#homepage-todoyen').show();
                         initScroll(); 
                    }else{
                      OptClassList=reflectData.goodslist;
                      classInstance.update({more:true});
                    }
                    if(qqwPageState.param.p<json.data.page){
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