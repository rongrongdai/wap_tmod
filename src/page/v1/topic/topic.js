import './navitem.scss';
import './navitem.tag';
import './special-navitem.scss';
import './special-navitem.tag';
import '../component/Public-head/qqw-commen-head.scss';	
import '../component/Public-head/qqw-commen-head.tag';

import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import { BackendApiSpecialTwo} from 'BackendApi';		// 后台api接口文件
const FirstPoint=0,SecondPoint=1500;
let categoryArr,
qqwheadIstall,
scrollHandler,
navitemInstance,
specialInstall,
globalIndex=0;
QqwUtil.main(function*(){
  riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
    getSpecialCategory();
    // getArticleList();
});
function getSpecialCategory(){
		let reflectData={};
		reflectData.categoryArr=[{id:1,cateName:'话题',point:FirstPoint},{id:2,cateName:'蛙严选',point:SecondPoint},{id:3,cateName:'专题',point:''}];
		categoryArr=reflectData.categoryArr;
		qqwheadIstall=riot.mount('qqwhead',reflectData)[0];
		listenTagChange(qqwheadIstall);
        mountNavitem(0,{category:categoryArr[0]});
	    FastClick.attach(document.body);         // 移动端点击事件 hack
	    initScroll();
 specialInstall=riot.mount('special-navitem')[0];         

}



function  listenTagChange(install){
	install.trigger('switch-opacity',{'opacity':1});  
	install.on('switch_change', (switchObject)=>{
		 // globalIndex=switchObject.index;
		 // let index=switchObject.index;
   //   let $topicNavitem=document.getElementById('navitem0');
   //   let $specilNavitem=document.getElementById('special-navitem');
   //   if(index==2){
   //        $topicNavitem.style.display='none';
   //        $specilNavitem.style.display='block'; 
   //          if(!$specilNavitem.firstElementChild){
   //               specialInstall=riot.mount('special-navitem')[0];         
   //          }

   //      }
   //   else{
   //        $specilNavitem.style.display='none'; 
   //        $topicNavitem.style.display='block'; 
   //      }   
   //   });
		 // let navitemId='navitem'+index;
		 // $('navitem').css('display','none');
		 // let $navitem=document.getElementById(navitemId);
		 // if($navitem.firstElementChild)
			// {
			// 	$navitem.style.display='block';
			// }
			// else{
			// 	mountNavitem(index,{category:categoryArr[index]});
			// }
	  //    scrollHandler.isHandling=false;	
	   });
	}

function mountNavitem(index,categoryMessage){
	let indexs = parseInt(index)
    	    let idName='navitem'+indexs
    	    let tag='navitem#'+idName;
    	    let install=riot.mount(tag,'navitem',categoryMessage)[0];
    	    install.index=indexs;
    	    navitemInstance=install;
    	}

function initScroll(){
		scrollHandler = new PullPush(1500, () => {
			scrollHandler.isHandling=true;
      if(globalIndex==2){
        specialInstall.trigger('getMoreCallBack',{scrollHandler:scrollHandler});
        return;
      }
      // getMoreMessage();
		},(scrollTop)=>{
          // console.log('scrollTop:'+scrollTop);
          if(globalIndex!=2){
            triggerHeadState(scrollTop);
          }
		});
		scrollHandler.ob();
    scrollHandler.isHandling=false;
       }

/**
 * 改变头部的状态；
 * @param scrollTop 滑动距离顶部的距离
 */ 

function triggerHeadState(scrollTop){
       let $a=$('#scrollHereId0')[0];
       let $b=$('#scrollHereId1')[0];
       let $c=$('#scrollHereId2')[0];
       if($a){
           var top = $a.offsetTop-150;
           if(scrollTop >= top && scrollTop <= 300 + top){
           qqwheadIstall.trigger('switch_change_state',{'index':0});
           globalIndex=0;
           }
       }
       if($b){
           var top = $b.offsetTop-150;
           if(scrollTop >= top && scrollTop <= 300 + top){
             // console.log('1................');
           globalIndex=1;
           qqwheadIstall.trigger('switch_change_state',{'index':1});
           }
           else if( scrollTop <= top &&   top <= 300 + scrollTop ){
             qqwheadIstall.trigger('switch_change_state',{'index':0});
             globalIndex=0;
           }

        }   
        if($c){
           var top = $c.offsetTop-150;
           if(scrollTop >= top && scrollTop <= 300 + top){
             // console.log('1................');
           qqwheadIstall.trigger('switch_change_state',{'index':2});
           globalIndex=2;
           }
           else if( scrollTop <= top &&   top <= 300 + scrollTop ){
             qqwheadIstall.trigger('switch_change_state',{'index':1});
             globalIndex=1;
           }
        }      
     }   

function check(str,m,n){
        var re = /(\d+)/g;
        while(re.exec(str))
        {
                var int = parseInt(RegExp.$1);
                if(int <m || int> n)return false;
        }
        return true;
}


function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}    

/**
 * 整个页面共用一个下拉刷新回调；
 * @param  {[type]} data [接口json数据]
 */     
function getMoreMessage(){
          // for(let i=0;i<navitemInstances.length;i++){
          // 	let install=navitemInstances[i];
          // 	 if(install.index==globalIndex){
            console.log('getMoreMessage.......');
    navitemInstance.trigger('getMoreCallBack',{scrollHandler:scrollHandler});
          // }
	}

window.nativeChangeJoinE=function(id){
    var className='.tidItem'+id;
    var count=parseInt($(className).data('count'), 10)+1;
    var html='已有'+count+'人参与';
    $(className).html(html);
 }
 