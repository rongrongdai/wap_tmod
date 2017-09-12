import './bask_in.scss';
import './bask_in.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';

import { BackendApiGetTopicDetail} from 'BackendApi';		// 后台api接口文件

let reflectData,
    tid,
    id,
    goodslistIscrollInstance,
     Optgoodslist,
     baskinInstances,
     scrollHandler,
     footerNav,
     qqwPageState={};
    // let $pullDownEl,$pullUpEl,$pullContent;
    qqwPageState.param={p:1,ps:6};
    qqwPageState.moreFlag=false;              


function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.slideToggle = AnimationUtil.slideToggle;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
     this.ajaxOriginalData = QqwUtil.ajaxOriginalData;
	this.iscrollInit = QqwUtil.iscrollInit;
  this.msg = QqwUtil.msg;
	//this.getOptGoodslist=getOptGoodslist;
}
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 function getShopInfo(data) {
	let reflectData = {};
	reflectData.tid = data.tid;
          reflectData.module_name = data.module_name;
          reflectData.picture = data.picture;
          reflectData.gift_picture=data.gift_picture;
          reflectData.joins = data.joins;
          reflectData.description = data.description;
          reflectData.content = data.content;
          reflectData.addmsg = data.addmsg;
          reflectData.btnmsg = data.btnmsg;
          reflectData.visible = data.visible;
          reflectData.starttime = data.starttime;
           reflectData.endtime = data.endtime;
          reflectData.addtime = data.addtime;
          reflectData.top_picture = data.top_picture;
          reflectData.isWechat = data.os=='wechat'?true:false;
	return reflectData;
}

function  getQueryString(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}

id=getQueryString("id");

QqwUtil.ajaxData('get', BackendApiGetTopicDetail, {tid:id}, (data) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
		let reflectData=getShopInfo(data);
	           baskinInstances=riot.mount('baskin',reflectData)[0];
               $('#contents').html(data.content);
                $('#descriptions').html(data.description);
                 initScroll();
	           footerNav=riot.mount('footer-bar', {index:0});
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});






riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);


function initScroll(){
    scrollHandler = new PullPush(600, () => {
             console.log('22222')
              scrollHandler.isHandling=true;
            getMoreMessage();
    });
    scrollHandler.ob();
     }


/**
 * 整个页面共用一个下拉刷新回调；
 * @param  {[type]} data [接口json数据]
 */     
function getMoreMessage(){
             baskinInstances.trigger('getMore',{scrollHandler:scrollHandler});
  }







