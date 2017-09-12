import './my-group.scss';
import'./group-nav.tag';
import './group-list.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../../js/qqw_eventutil';
import QqwApp from '../../../../js/qqw_app';
import { BackendApiGroupList } from 'BackendApi';   // 后台api接口文件

    let reflectData,
    headIstall,
    groupInstance,
    globalIndex="-1",
    OptGroupList,
    qqwPageState={},
    scrollHandler;
    qqwPageState.param={p:1,ps:6};
    qqwPageState.moreFlag=false;       
    QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
	      riot.mixin('event', EventUtil);
            nav();
           getGroupList(globalIndex);
	});
function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
      this.getOptGroupList=getOptGroupList;
}    
//订单导航
function nav() {
	riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            headIstall=riot.mount('group-nav', reflectData)[0];
             listenTagChange(headIstall);
            FastClick.attach(document.body);         // 移动端点击事件 hack
}
function  listenTagChange(install){
	install.on('switch_change', (switchObject)=>{
		 let index=switchObject.index;
            globalIndex=index-1;
             getGroupList(globalIndex);
	   });
}
/**
    导航切换渲染;
     */    
function getGroupList(globalIndex){
       qqwPageState.param.type=globalIndex;
      QqwUtil.ajaxData('get', BackendApiGroupList, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
        let reflectData = getReflectData(data);
         
             if(qqwPageState.param.p==1){
                  riot.mixin('util', qqwOpMixin);
                  riot.mixin('event', EventUtil);
                  groupInstance=riot.mount('group-list', reflectData)[0];
                  $('#pushDown').hide();
                   initScroll(); 
              }else{
                OptGroupList=reflectData.cardlist;
                groupInstance.update({more:true});
              }
              if(qqwPageState.param.p<data.pageCount){
                qqwPageState.moreFlag=true;
                qqwPageState.param.p++;
               }
               else{
                qqwPageState.moreFlag=false;
                  scrollHandler.cancelOb();
                  changPullDisplay(false);
               }
              data = null;
              scrollHandler.isHandling=false;
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
                let urlgoodsTogo = '/mobile-goods/detail?id=';
                // let urlgroupTogo = '/mobile-user-groupbuy/detail?buyid=';
                let urlgroupTogo1 = '/mobile-user-groupbuy/detailIng?buyid=';
                let urlgroupTogo2 = '/mobile-user-groupbuy/detailSuccess?buyid=';
                let urlgroupTogo3 = '/mobile-user-groupbuy/detailFail?buyid=';
                let urlorderTogo = '/mobile-user-order/detail?order_sn=';
      reflectData.grouplist = [];
      let idx = 0;
      Array.from(data.list || []).map((grouplist) => {
           let item = {};
           var url='';
           switch(parseInt(grouplist.state)){
                  case 0: url=urlgroupTogo1;
                  break;                  
                  case 1: url=urlgroupTogo2;
                  break;                
                  case 2: url=urlgroupTogo3;
                  break;
                  default:url=urlgroupTogo1;
                  break;
           }
          item.groupinfo= {
            type_id:globalIndex,
            goodsurl: urlgoodsTogo + grouplist.goods_id,
            groupurl: url + grouplist.buyid+'&joinid='+grouplist.joinid,
            orderurl: urlorderTogo + grouplist.order_sn,
            goods_name:grouplist.goods_name,
            picture:grouplist.picture,
            price:grouplist.price,
            all_num:grouplist.all_num,
            has_num:grouplist.has_num,
            state:grouplist.state,
            buyid:grouplist.buyid,
            joinid:grouplist.joinid,
            order_id:grouplist.order_id,
            goods_id:grouplist.goods_id,
          }
          reflectData.grouplist.push(item);
                 ++idx;
      });
      return reflectData;
    }

  /**
 分页
 **/

function getOptGroupList(){
  return OptGroupList;
}


function changPullDisplay(enable){
    let pullUpEl=document.getElementById('pushMore');
    if(enable){
          pullUpEl.style.display='block';
    }else{
        pullUpEl.className = 'qqw-push-more-no-content';
        pullUpEl.firstElementChild.innerHTML = '— 暂无拼团记录 —';
    }
        
}
function initScroll(){
    scrollHandler = new PullPush(30, () => {
           if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
            scrollHandler.isHandling=true;
            changPullDisplay(true);
             getGroupList();
            }
                  },(topStance)=>{
    });
    scrollHandler.ob();
     }