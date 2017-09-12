import './message_details.scss';
import './message_details.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil ,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';

import { BackendApimessageDetails } from 'BackendApi';   // 后台api接口文件

let reflectData
    , goodsInstance
    , qqwPageState
    ,letternInstances
    , choolslistApp  
    ;
 
  
choolslistApp = new QqwApp();
 let param={};
 let id;


function qqwOpMixin() {
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.qqwPageState = qqwPageState;
  this.ajaxData = QqwUtil.ajaxData;
  this.msg = QqwUtil.msg;
}


/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getBackChoosData(data) {
  let reflectData = {};
   reflectData.id =data.detail.id;
  reflectData.uid=data.detail.uid;
  reflectData.content =data.detail.content;
  reflectData.dateline=data.detail.dateline; 
  reflectData.is_read =data.detail.is_read;
  reflectData.is_delete=data.detail.is_delete;

  
  return reflectData;
}
 //传id
function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
id=getQueryStrings("id");


param.id=id;




    QqwUtil.ajaxData('get', BackendApimessageDetails, param, (data) => {
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    // 保证首屏先渲染结构
    let reflectData=getBackChoosData(data);
                letternInstances = riot.mount('messagedetails',reflectData)[0];
          console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
           ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));

    
           //监听
          letternInstances.on('lettertes',() =>{
                
           });

  });

riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
riot.mixin('valiatorReg', valiatorReg);


