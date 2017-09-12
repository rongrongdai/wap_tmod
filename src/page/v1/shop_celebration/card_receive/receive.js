import './receive.scss';
import './receive.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import QqwApp from '../../../../js/qqw_app';

import { BackendApireceive } from 'BackendApi';   // 后台api接口文件
import { BackendApireceived } from 'BackendApi';   // 后台api接口文件

    let  param='?order_id='+ geturl("order_id");
    let received='order_id='+ geturl("order_id")+'&token='+geturl("token");
    let reflectData,
    receiveInstall    
    QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            getReceive(param);
  });
//获取URL里面的uid
function geturl(uid){
  let reg = new RegExp('(^|&)' + uid + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
function qqwOpMixin() {
  this.ajaxData = QqwUtil.ajaxData;
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
}    
/**
    请求接口渲染;
     * */      
function getReceive(param){
      QqwUtil.ajaxData('get', BackendApireceive,param, (data) => {
        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
        let reflectData = getReflectData(data);
        if(data.is_receive==1||data.is_rest==0){
              window.location.href='/mobile-user-card/result?order_id='+ geturl("order_id");
        }else{
               receiveInstall=riot.mount('receive', reflectData);
        }
         receivebtn(param);
      });
      
    }
/**
     * 模板 - 数据字典映射
     * @param  {[type]} data [接口json数据]
     */
    function getReflectData(data) {
      let reflectData = {};
          reflectData.uid= data.uid;
          reflectData.picture= data.picture;
          reflectData.nickname= data.nickname;
          reflectData.message= data.message;
          reflectData.card_amount=data.card_amount;
          reflectData.card_name=data.card_name;
          reflectData.face=data.face;
          reflectData.is_receive=data.is_receive;
          return reflectData;
    }
/**
     领卡
     */
function  receivebtn(){
              $(".receive_btn").click(function(){
                     $.post("/user-card/receive",received, function(json) {
                                  if(JSON.parse(json).ret==0){
                                          window.location.href='/mobile-user-card/result?order_id='+ geturl("order_id");
                                  }else{
                                       QqwUtil.msg(JSON.parse(json).msg);
                                  }
                     });
              });
}



 