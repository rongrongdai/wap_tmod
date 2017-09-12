import './consult_record.scss';
import './consult_record.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import QqwApp from '../../../../js/qqw_app';
import {BackendApicurecord} from 'BackendApi';   	// 后台api接口文件
// 协商列表
let reflectData,
    order_sn;
  
function  getQueryString(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg); 
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}

order_sn=getQueryString("order_sn");


function qqwOpMixin() {
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.ajaxData = QqwUtil.ajaxData;
  this.msg = QqwUtil.msg;
} 



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

	          reflectData.create_time = data.create_time;
	          reflectData.desc = data.desc;
	          reflectData.return_type_name = data.return_type_name;


	          reflectData.log_list = []; 

          
          let idx=0;
          Array.from(data.log_list || []).map((goodsitem) => {
               let item = {};
               item={
                          time: goodsitem.time,
                          msg:goodsitem.msg,
                          type: goodsitem.type,
              }

           reflectData.log_list.push(item);
          ++idx;
        });

         
                
         reflectData.reason_type_name =data.reason_type_name;

         return reflectData;
}


QqwUtil.ajaxData('get', BackendApicurecord, {order_sn:order_sn}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            let reflectData=getShopInfo(data);
             riot.mount('consultRecord',reflectData);
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });


riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
//riot.mount('consultRecord');
















