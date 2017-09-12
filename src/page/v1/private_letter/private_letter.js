import './private_letter.scss';
import './private_letter.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil ,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';

import { BackendApiprivateLetter } from 'BackendApi';		// 后台api接口文件

let reflectData
    , goodsInstance
    , qqwPageState
    ,letternInstances
    , choolslistApp  
    ;
 
  
choolslistApp = new QqwApp();
 let param={};
 let id;
 let touid;

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
   reflectData.touid =data.touid;
  reflectData.nickname=data.nickname;
  reflectData.face=data.face;

  reflectData.letter_list = [];
  let idx = 0;
  Array.from(data.list || []).map((lettersitem) => {
               let item = {};
                  item={
                    id: lettersitem.id,
                    suid:lettersitem.suid,
                    snickname: lettersitem.snickname,
                    sface: lettersitem.sface,
                    touid: lettersitem.touid,
                    tonickname: lettersitem.tonickname,
                    toface: lettersitem.toface,
                    content: lettersitem.content,
                    dateline: lettersitem.dateline,
                    isSelf:lettersitem.isSelf
                  }

      reflectData.letter_list.push(item);
             ++idx;
  });
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

touid = getQueryStrings("uid");

param.id=id;
param.touid = touid;

privateLetter();


function privateLetter(){    
    QqwUtil.ajaxData('get', BackendApiprivateLetter, param, (data) => {
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    // 保证首屏先渲染结构
    let reflectData=getBackChoosData(data);
    reflectData.letter_list.reverse();
    letternInstances = riot.mount('privateLetter',reflectData)[0];

          getMoeLetter(letternInstances);
          console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
           ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));    
  });
}


function getMoeLetter(object){
   //监听
   object.on('lettertes',() =>{  
           privateLetter();
     });
 }





// letternInstances.push();


riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
riot.mixin('valiatorReg', valiatorReg);


