import './sixin.tag';
import './commont.tag';
import './xitong.tag';
import './messagenav.tag';
import './message.scss';	
import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import QqwApp from '../../../js/qqw_app';
import { BackendApiSixinList,BackendApiCommontList,BackendApiXitongList } from 'BackendApi';		// 后台api接口文件
let startGetQqwDataTime = new Date().getTime(); // for 性能检测
let reflectData,
    categoryArr,
    // messagelistInstances=[],
    globalIndex=0,
    scrollHandler,
    listInstance=['','',''],
    riotnav;
 QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
            riot.mixin('event', EventUtil);
            riot.mixin('qqwUtil',QqwUtil);
            nav();
            riotSixin();
            // mountNavitem(0,{index:0});
  });
function qqwOpMixin() {
  this.ajaxData = QqwUtil.ajaxData;
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.msg = QqwUtil.msg;
}
/**
 * 渲染顶部导航
 */
function nav(){
  riot.mixin('util', qqwOpMixin);
  riot.mixin('event', EventUtil);
  riotnav=riot.mount('messagenav')[0];
  listenTagChange(riotnav);
}
/**
 * 点击导航切换列表
 */
function  listenTagChange(install){
    install.on('switch_change', (switchObject)=>{
       let index=switchObject.index;
       globalIndex=index;
         if(index==0){
            riotSixin();
            $("#list0").css("display","block");
            $("#list1").css("display","none");
            $("#list2").css("display","none");
         }else if(index==1){
             listInstance[index]=riot.mount('commont')[0];
             listInstance[1].on('scrollHandler', () => {    
                     initScroll();
               });
            $("#list1").css("display","block");
            $("#list0").css("display","none");
            $("#list2").css("display","none");
         }else if(index==2){
            listInstance[index]=riot.mount('xitong')[0];
            listInstance[2].on('scrollHandler', () => {    
                     initScroll();
               });
            $("#list2").css("display","block");
            $("#list0").css("display","none");
            $("#list1").css("display","none");
         }
       });
}
/**
 * 渲染私信
 */
function riotSixin(){
  riot.mixin('util', qqwOpMixin);
  riot.mixin('event', EventUtil);
   listInstance[0]=riot.mount('sixin')[0];
   listInstance[0].on('scrollHandler', () => {    
         initScroll();
   });
}

// function  listenTagChange(install){
//     install.on('switch_change', (switchObject)=>{
//        globalIndex=index;
//        let index=switchObject.index;
//        let typeId='orderlist'+index; 
//        $('order-list').css('display','none');
//        let $typeId=document.getElementById(typeId);
//        if($typeId.firstElementChild)
//         {
//           $typeId.style.display='block';
//         }else{
//           mountNavitem(index,{index:index});
//            $typeId.style.display='block';
//         }
//        });
// }
/**
 * 字典映射 - “文章列表”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
// function mountNavitem(index,categoryMessage){
//   let indexs = parseInt(index)
//           let idName='orderlist'+indexs
//           let tag='order-list#'+idName;
//           let install=riot.mount(tag,'order-list',categoryMessage)[0];
//           install.index=indexs;
//           orderlistInstances.push(install);
// }
/**
 * 
 */  
function initScroll(){
    scrollHandler = new PullPush(30, () => {
              scrollHandler.isHandling=true;
                        // getMoreMessage();
                        listInstance[globalIndex].trigger('getMoreCallBack',{"scrollHandler":scrollHandler});
    });
    scrollHandler.ob();
}
/**
 * 整个页面共用一个下拉刷新回调；
 * @param  {[type]} data [接口json数据]
 */     
function getMoreMessage(){
          for(let i=0;i<messagelistInstances.length;i++){
             let install=listInstance[i]
             if(install.index==globalIndex){
             install.trigger('getMoreCallBack',{scrollHandler:scrollHandler});
          }
  }
} 