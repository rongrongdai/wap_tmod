import './refundApply.scss';
import './refundApply.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../../js/qqw_eventutil';
import QqwApp from '../../../../js/qqw_app';

import { BackendApiApplyRefund } from 'BackendApi';		// 后台api接口文件引入请求地址
// 定义参数
   let reflectData
    ,goodsInstance
    ,scrollHandler;
   let ordersn=getQueryString('order_sn');
   let goodsid=getQueryString('goods_id');
   let goodsnum=getQueryString('goods_num');

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
	reflectData.goods_id =goodsid;
	reflectData.goods_num =goodsnum;
	reflectData.return_money =data.return_money;
	reflectData.max_return =data.max_return;
	reflectData.is_allow_refund =data.is_allow_refund;
	let idx = 0;
	Array.from(data.goods_list || []).map((goodsitem) => {
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
	let idxs = 0;
	reflectData.reasonlist = [];
	Array.from(data.reason || []).map((resonitem) => {
		           let items = {};
			items.refundReason= {
				type_id:resonitem.type_id,
				parent_id: resonitem.parent_id,
				type_name: resonitem.type_name,
				type_desc: resonitem.type_desc,
				sort: resonitem.sort,
			}
			reflectData.reasonlist.push(items);
		         ++idxs;
	});
	let idxx = 0;
	reflectData.reasontype = [];
	Array.from(data.return_type || []).map((typeitem) => {
		           let items = {};
			items.typeReason= {
				key:typeitem.key,
				value:typeitem.value,
			}
			reflectData.reasontype.push(items);
		         ++idxx;
	});
	return reflectData;
}
function getGoodsList(){
  let param={order_sn:ordersn,goods_id:goodsid,goods_number:goodsnum}
  QqwUtil.ajaxData('get', BackendApiApplyRefund, param, (data) => {
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(data);
	               riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    goodsInstance=riot.mount('refundApply', reflectData)[0];
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