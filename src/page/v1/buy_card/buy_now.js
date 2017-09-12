import './buy_now.scss';
import './buy_now.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';
import { BackendApiGetentCard} from 'BackendApi';		// 后台api接口文件

let reflectData,
    card_id,
    id,
    goodslistIscrollInstance,
     Optgoodslist,
     baskinInstances,
     scrollHandler,
     footerNav,
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
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 function getShopInfo(data) {
  let reflectData = {};
          reflectData.card_id = data.card_id;
          reflectData.card_type = data.card_type=='1'?'实体卡':'虚拟卡';

          reflectData.card_name = data.card_name;
          reflectData.amount=data.amount;
          reflectData.score = data.score;
          reflectData.picture = data.picture;
          reflectData.card_desc = data.card_desc;
          return reflectData;
}

function  getQueryString(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}

id=getQueryString("id");

QqwUtil.ajaxData('get', BackendApiGetentCard, {card_id:id}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            let reflectData=getShopInfo(data);
            riot.mount('entityCard',reflectData);
            $('.price').text(data.amount);
            $('#score').text(data.score);
            $('.card-img').attr('src',data.picture);
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });






riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
