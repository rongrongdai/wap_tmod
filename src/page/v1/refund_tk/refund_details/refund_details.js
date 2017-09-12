import './refund_details.scss';
import './refund_details.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import QqwApp from '../../../../js/qqw_app';

import {BackendApirefundeta} from 'BackendApi';   	// 后台api接口文件引入

let reflectData,
    order_sn;
  
 

function qqwOpMixin() {
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.ajaxData = QqwUtil.ajaxData;
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

order_sn=getQueryString("order_sn");


/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 function getShopInfo(data) {
	let reflectData = {};
	          reflectData.id = data.id;
	          reflectData.return_sn = data.return_sn;
	          reflectData.order_sn = data.order_sn;
	          reflectData.return_goods_amount = data.return_goods_amount;
	          reflectData.user_id= data.user_id;
	          reflectData.reason=data.reason;
	          reflectData.reason_type = data.reason_type;
	          reflectData.return_type = data.return_type;
	          reflectData.reason_child_type = data.reason_child_type;
	          reflectData.desc = data.desc;
	          reflectData.reason_type_name = data.reason_type_name;
	          reflectData.reason_child_type_name = data.reason_child_type_name;
	          reflectData.return_type_name = data.return_type_name; 

	          reflectData.goods_list = []; 

          
          let idx=0;
          Array.from(data.goods_list || []).map((goodsitem) => {
               let item = {};
               item={
                          id: goodsitem.id,
                          return_sn:goodsitem.return_sn,
                          goods_id: goodsitem.goods_id,
                          product_id:  goodsitem.product_id,
                          goods_name: goodsitem.goods_name,
                          goods_thumb:goodsitem.goods_thumb,
                          goods_attr: goodsitem.goods_attr,
                          goods_return_number:goodsitem.goods_return_number,
                          goods_buy_number:goodsitem.goods_buy_number,
                          goods_return_good_qty: goodsitem.goods_return_good_qty,  
                          goods_return_bad_qty:goodsitem.goods_return_bad_qty,
                          goods_price:goodsitem.goods_price,
                          is_return:goodsitem.is_return,
                          order_sn:goodsitem.order_sn,
                          return_discount:goodsitem.return_discount,
                          discount_type:goodsitem.discount_type,
              }

           reflectData.goods_list.push(item);
          ++idx;
        });

          reflectData.img_list = []; 
          let idn=0;
          Array.from(data.img_list || []).map((goodimg)=>{
              let item1 ={};
              item1={
              	img_url:goodimg.img_url,
              }
              reflectData.img_list.push(item1);
              ++idn;
          });
                
         reflectData.info =data.info;
         reflectData.status=data.status;

	return reflectData;
}



QqwUtil.ajaxData('get', BackendApirefundeta, {order_sn:order_sn}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            let reflectData=getShopInfo(data);
             riot.mount('refundDetails',reflectData);
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });




riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
// riot.mount('refundDetails');
















