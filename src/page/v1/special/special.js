import './navitem.scss';
import './navitem.tag';
import '../choice_mager/chomger.scss';
import '../choice_mager/chomger.tag';
import '../component/Public-head/qqw-commen-head.scss';	
import '../component/Public-head/qqw-commen-head.tag';
import '../component/Public-head/qqw-foot.tag';

import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import { BackendApiSpecialTwo,BackendApiDiscovery} from 'BackendApi';		// 后台api接口文件

let categoryArr,
qqwheadIstall,
scrollHandler,
navitemInstance,
globalIndex=0;
QqwUtil.main(function*(){
    riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
    // getSpecialCategory();
    getChooseList();
    // getArticleList();
});
function getSpecialCategory(){
		let reflectData={};
		reflectData.categoryArr=[{id:1,cateName:'全球蛙达人'},{id:2,cateName:'专题精选'}];
		categoryArr=reflectData.categoryArr;
		qqwheadIstall=riot.mount('qqwhead',reflectData)[0];
	    qqwheadIstall.trigger('switch-opacity',{'opacity':1,'autoScroll':1});//atoScroll  置为1 不需要锚点定位
		listenTagChange(qqwheadIstall);
	    // FastClick.attach(document.body);         // 移动端点击事件 hack
	    initScroll();
}

function  listenTagChange(install){
	install.on('switch_change', (switchObject)=>{
		 globalIndex=switchObject.index;
		 let index=switchObject.index;
		 let $navitem=document.getElementById('navitem');
		 let $chomger=document.getElementById('chomger');
		 if(globalIndex==0){
		 	 $navitem.style.display='none';
		 	 $chomger.style.display='block';
		     return;
		 }
		     $chomger.style.display='none';
		 	 $navitem.style.display='block';
		 if(!$navitem.firstElementChild)
             {
			 navitemInstance=riot.mount('navitem',{category:globalIndex})[0];
			 scrollHandler.isHandling=false;	
			 }

	   });
	}

function initScroll(){
		scrollHandler = new PullPush(100, () => {
	            scrollHandler.isHandling=true;
	            if(globalIndex==1){
	            	navitemInstance.trigger('getMoreCallBack',{scrollHandler:scrollHandler});
	            }
		});
		scrollHandler.ob();
     }


function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.getPlatform = QqwUtil.getPlatform;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}    



/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getBackChoosData(data) {
	let reflectData = {};
	reflectData.chooseList = [];
	let idx = 0;
	Array.from(data.doyen[0].list || []).map((choositem) => {
		    let item = {};
			item={
				doyen_id: choositem.doyen_id,
				position:choositem.position,
				nickname: choositem.nickname,
				face: choositem.face,
				show_picture: choositem.show_picture,
				name: choositem.name,
				slogan:choositem.slogan,
				article_num:choositem.goods_num+'件商品',
				doyen_type:choositem.doyen_type,
                is_delete:choositem.is_delete,
                haveFocus:choositem.isFollow=='1'?1:0,
                follows:choositem.follows,
                position_type:choositem.position_type,
                uid:choositem.uid
			}

			reflectData.chooseList.push(item);
	});
  if(data.doyen[1]){
   Array.from(data.doyen[1].list || []).map((choositem) => {
		    let item = {};
			item={
				doyen_id: choositem.doyen_id,
				position:choositem.position,
				nickname: choositem.nickname,
				face: choositem.face,
				show_picture: choositem.show_picture,
				name: choositem.name,
				slogan:choositem.slogan,
				article_num:choositem.article_num+'篇文章',
				doyen_type:choositem.doyen_type,
                is_delete:choositem.is_delete,
                haveFocus:choositem.isFollow=='1'?1:0,
                follows:choositem.follows,
                position_type:choositem.position_type,
                uid:choositem.uid
			}

			reflectData.chooseList.push(item);
	});
   }
    if(data.doyen[2]){
	Array.from(data.doyen[2].list || []).map((choositem) => {
		    let item = {};
			item={
				doyen_id: choositem.doyen_id,
				position: choositem.position,
				nickname: choositem.nickname,
				face: choositem.face,
				show_picture: choositem.show_picture,
				name: choositem.name,
				slogan:choositem.slogan,
				article_num:choositem.goods_num+'件商品',
				doyen_type:choositem.doyen_type,
                is_delete:choositem.is_delete,
                haveFocus:choositem.isFollow=='1'?1:0,
                follows:choositem.follows,
                position_type:choositem.position_type,
                uid:choositem.uid
			}

			reflectData.chooseList.push(item);
	});
   }
	reflectData.url=data.video_url;
	reflectData.pic=data.video_pic;
	return reflectData;
}
  function getChooseList(){
  	  	QqwUtil.ajaxData('get', BackendApiDiscovery, null, (data) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
		if(data.os=='wechat'){
			riot.mount('foot-nav',{index:1});
		}
		let reflectData=getBackChoosData(data);
		reflectData.index=1;
	    riot.mount('chomger',reflectData);
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});
  }

  window.nativeChangeFocusE=function(uid,state,count){
	state =parseInt(state);
	var className='.btnfocus'+ uid;
	$(className).attr('data-haveFocus',state);
    $(className).each(function(index,event){
           	 if($(event).hasClass('ma_opt')){
           	   focusState ? $(className).addClass('chang_bg'): $(className).removeClass('chang_bg');
              }
           });
    $(className).find('span').html= state==1 ? '已关注':'关注';  
}

window.playPause=function(){
       var qqwVideo = document.getElementsByTagName('video')[0];
       if (qqwVideo.paused){
           // qqwVideo.play();
         }
       else{
           qqwVideo.pause();
        }
       }