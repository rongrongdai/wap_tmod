import './card_package.scss';
import'./card-nav.tag';
import './card-list.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../../js/qqw_eventutil';
import QqwApp from '../../../../js/qqw_app';
import { BackendApiCardList } from 'BackendApi';   // 后台api接口文件

    let reflectData,
    cardheadIstall,
    cardIscrollInstance,
    scrollHandler, 
    globalIndex="1"       
    QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
	      riot.mixin('event', EventUtil);
            ordernav();
            getCardList(globalIndex);
	});
function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}    
//订单导航
function ordernav() {
	riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            cardheadIstall=riot.mount('card-nav', reflectData)[0];
             listenTagChange(cardheadIstall);
            // mountNavitem(0,{category:categoryArr[0]});
            FastClick.attach(document.body);         // 移动端点击事件 hack
            // initScroll();
}
function Clickevent(){
    $(".get_address").click(function(){
         event.preventDefault(); 
          window.location.href="/mobile-user-card/address";
    })
    $(".send").click(function(){
         event.preventDefault(); 
          window.location.href="/mobile-anniversary/index";
    })
}
function  listenTagChange(install){
	install.on('switch_change', (switchObject)=>{
		 let index=switchObject.index;
               if( globalIndex==index+1){
                    return;
               }
              globalIndex=index+1;
             getCardList(globalIndex);
	   });
}
/**
    导航切换渲染;
     */    
function getCardList(globalIndex){
      let param={type:globalIndex};
      QqwUtil.ajaxData('get', BackendApiCardList, param, (data) => {
        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
        let reflectData = getReflectData(data);
         cardIscrollInstance=riot.mount('card-list', reflectData);
          Clickevent();
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
      let urlCardTogo = '/mobile-user-card/detail?type=';
      let showTogo = '/mobile-user-card/show?uid=';
      reflectData.cardlist = [];
      let idx = 0;
      Array.from(data.list || []).map((cardlist) => {
                   let item = {};
          item.cardinfo= {
            type_id:globalIndex,
            url: urlCardTogo + globalIndex+'&order_id='+cardlist.order_id,
            showurl:showTogo+cardlist.uid+'&card_id='+cardlist.card_id,
            card_type:cardlist.card_type,
            buy_num:cardlist.quantity,
            order_sn:cardlist.order_sn,
            card_amount:cardlist.card_amount,
            get_num:cardlist.get_num,
            get_code:cardlist.get_code,
            order_id:cardlist.order_id,
            card_id:cardlist.card_id,
            uid:cardlist.uid,
            card_type_name:cardlist.card_type_name,
            picture:cardlist.picture,
            unreceive_num:cardlist.unreceive_num,
            receive_num:cardlist.receive_num,
            
          }
          reflectData.cardlist.push(item);
                 ++idx;
      });
      return reflectData;
    }