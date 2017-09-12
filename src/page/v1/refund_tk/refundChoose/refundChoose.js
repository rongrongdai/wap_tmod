import './refundChoose.scss';
import './refundChoose.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../../js/qqw_eventutil';
import QqwApp from '../../../../js/qqw_app';

import { BackendApiChoicegoods } from 'BackendApi';		// 后台api接口文件引入接口
// 定义参数
   let reflectData
    ,goodsInstance
    ,scrollHandler;
   let ordersn=getQueryString('order_sn');

 QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
             getGoodsList();
	});

function qqwOpMixin() {
	this.$q = QqwUtil.$q; 
	this.each = QqwUtil.each;
	this.slideToggle = AnimationUtil.slideToggle;
	this.ajaxData = QqwUtil.ajaxData;
}

// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */  
function getReflectData(data) {
	let reflectData = {};
	reflectData.goodslist = [];
	reflectData.order_sn =ordersn;
	let idx = 0;
	Array.from(data.list || []).map((goodsitem) => {
		           let item = {};
			item.Product= {
				goodsid:goodsitem.goods_id,
				pic: goodsitem.goods_thumb,
				goodsname: goodsitem.goods_name,
				goods_attr: goodsitem.goods_attr,
				price:'￥'+goodsitem.shop_price,
				num:goodsitem.goods_number,
				fav_price: goodsitem.fav_price,
				fav_type: goodsitem.fav_type,

			}
			reflectData.goodslist.push(item);
		         ++idx;
	});
	return reflectData;
}
function getGoodsList(){
  let param={order_sn:ordersn}
  QqwUtil.ajaxData('get', BackendApiChoicegoods, param, (data) => {
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(data);
	               riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    goodsInstance=riot.mount('refundChoose', reflectData)[0];
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



