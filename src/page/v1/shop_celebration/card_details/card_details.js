import './card_details.scss';
import './card_details.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import QqwApp from '../../../../js/qqw_app';

import { BackendApiGetentCardDetail} from 'BackendApi';		// 后台api接口文件
import { BackendApishareget} from 'BackendApi';   // 后台api接口文件

let reflectData,
    order_id,
    type,
    cardDesc,
    goodslistIscrollInstance,
     Optgoodslist,
     baskinInstances,
     scrollHandler,
     footerNav,
     picTure,
     wa_title,
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
}

function  getQueryString(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}

order_id=getQueryString("order_id");
type=getQueryString('type');
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */

 function getShopInfo(data) {
	let reflectData = {};
	     reflectData.order_sn = data.order_sn;
          reflectData.nickname = data.nickname;
          reflectData.card_name = data.card_name;
          reflectData.score = data.score;
          reflectData.card_desc= data.card_desc;
          reflectData.card_amount=data.card_amount;
          reflectData.card_type = data.card_type=='1'?'实体卡':'虚拟卡',
          reflectData.quantity = data.quantity;
          reflectData.get_num = data.get_num;
          reflectData.order_amount = data.order_amount;
          reflectData.message = data.message;
          reflectData.pay_time = data.pay_time;
          reflectData.order_time = data.order_time;
          reflectData.get_time =data.get_time;
          reflectData.picture =data.picture;
          reflectData.card_number=parseInt(data.quantity) -parseInt(data.get_num);
          reflectData.type=getQueryString('type');
          reflectData.list = []; 
          
          let idx=0;
          Array.from(data.list || []).map((goodsitem) => {
               let item = {};
               item={
                          card_id: goodsitem.card_id,
                          get_uid:goodsitem.get_uid,
                          get_code: goodsitem.get_code,
                          get_state:  goodsitem.get_state,
                          nickname: goodsitem.nickname,
                          face: goodsitem.face,
                          picture:goodsitem.picture,
                          card_amount:data.card_amount,
                          card_type:data.card_type=='1'?'实体卡':'虚拟卡',
                          type: reflectData.type,  
                          card_number:parseInt(data.quantity) -parseInt(data.get_num),
              }

           reflectData.list.push(item);
          ++idx;
        });

	return reflectData;
}




let URL = '';
QqwUtil.ajaxData('get', BackendApiGetentCardDetail, {order_id:order_id,type:type}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            let reflectData=getShopInfo(data);
             riot.mount('cardDetails',reflectData);
             picTure=data.picture;
             cardDesc=data.card_desc;
             wa_title=data.card_name;
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
            let postdata ={ id :order_id, type :"12"}; 
            QqwUtil.ajaxData('get', BackendApishareget, postdata, (datatoken) => {
             let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
                     // 保证首屏先渲染结构
                     console.log(datatoken);
                     URL = datatoken.url;
                    console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
              ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
          });
  });



     // 微信分享
var targetUrl = location.href.split('#')[0];
var targetUrl = targetUrl.replace('&', '%26');

var appId = '';
var timestamp = '';
var nonceStr = '';
var signature = '';
$.get("/wx/getShareConfig/",{url:targetUrl}, function(json) { 
    if (json.ret == "0") 
    {
        appId = json.data.appId; 
        timestamp = json.data.timestamp;
        nonceStr = json.data.noncestr;
        signature = json.data.signature;
    }
    
     wx.config({
                debug: false,
                appId: appId,
                timestamp: timestamp,
                nonceStr: nonceStr,
                signature: signature,
                jsApiList: [
                  'checkJsApi',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'hideMenuItems',
                  'showMenuItems',
                  'hideAllNonBaseMenuItem',
                  'showAllNonBaseMenuItem',
                  'translateVoice',
                  'startRecord',
                  'stopRecord',
                  'onRecordEnd',
                  'playVoice',
                  'pauseVoice',
                  'stopVoice',
                  'uploadVoice',
                  'downloadVoice',
                  'chooseImage',
                  'previewImage',
                  'uploadImage',
                  'downloadImage',
                  'getNetworkType',
                  'openLocation',
                  'getLocation',
                  'hideOptionMenu',
                  'showOptionMenu',
                  'closeWindow',
                  'scanQRCode',
                  'chooseWXPay',
                  'openProductSpecificView',
                  'addCard',
                  'chooseCard',
                  'openCard'
                ]
            });
    
    wx.ready(function () {
      // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ],
          success: function (res) {
             //alert(JSON.stringify(res));
          }
        });
     console.log(URL)
 
      var shareData = {
        title: wa_title,
        desc:cardDesc,
        link: URL,
        imgUrl:picTure
      };
       
      wx.onMenuShareAppMessage(shareData);  
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
                
       wx.error(function (res) {
                 alert(res.errMsg);
              });
    
  });
}, 'json');

riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);












