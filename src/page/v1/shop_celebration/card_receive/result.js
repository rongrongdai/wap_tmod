import './result.scss';
import './result.tag';
import './receive_foot.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../../js/qqw_eventutil';
import QqwApp from '../../../../js/qqw_app';
import {BackendApireceiveResult } from 'BackendApi';   // 后台api接口文件
     let  param='?order_id='+ geturl("order_id");
    let reflectData,
    resultInstall,
    footerNav
    QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            getResult(param);
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
     */    
function getResult(param){
      QqwUtil.ajaxData('get', BackendApireceiveResult, param, (data) => {
        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
        let reflectData = getReflectData(data);
         resultInstall=riot.mount('result', reflectData);
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
                reflectData.carditem = [];
                let idx = 0;
                Array.from(data.list || []).map((carditem) => {
                     let item = {};
                    item.listinfo= {
                      get_uid: carditem.get_uid,
                      get_time: carditem.get_time,
                      nickname: carditem.nickname,
                      face:carditem.face,
                      picture:data.picture,
                      card_amount:data.card_amount,
                      card_name:data.card_name,
                    }
                    reflectData.carditem.push(item);
                           ++idx;
                });
                reflectData.is_receive = data.is_receive;
                reflectData.card_desc = data.card_desc;
                reflectData.rest_num = data.rest_num;
                return reflectData;
    }



