import './show.scss';
import './show.tag';
import './receive_foot.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import QqwApp from '../../../../js/qqw_app';

import { BackendApisShow } from 'BackendApi';   // 后台api接口文件
let  param='?uid='+ geturl("uid")+'&card_id='+geturl("card_id");
    let reflectData,
    showInstall,
    footerNav
    QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            getShow(param);
  });
function qqwOpMixin() {
  this.ajaxData = QqwUtil.ajaxData;
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
}  

//获取URL里面的uid
function geturl(uid){
  let reg = new RegExp('(^|&)' + uid + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
/**
    请求接口渲染;
     */    
function getShow(param){
      QqwUtil.ajaxData('get', BackendApisShow, param, (data) => {
        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
        let reflectData = getReflectData(data);
         showInstall=riot.mount('show', reflectData);
          footerNav=riot.mount('receive_foot');
        console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
          ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
      });
    }
/**
     * 模板 - 数据字典映射
     * @param  {[type]} data [接口json数据]
     */
    function getReflectData(data) {
      let reflectData = {};
          reflectData.card_name= data.card_name;
          reflectData.picture= data.picture;
          reflectData.card_amount = data.card_amount;
          reflectData.card_desc= data.card_desc;
          reflectData.nickname=data.nickname;
          reflectData.face=data.face;
          return reflectData;
    }





