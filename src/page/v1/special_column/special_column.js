import './special_column.scss';
import './special_column.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';

import { BackendApiGetColumnDetails ,BackendApiGetColumnComment} from 'BackendApi';		// 后台api接口文件

let reflectData,
    id,
    goodslistIscrollInstance,
     Optgoodslist,
     scrollHandler,
     footerNav,
     pullUpEl,
      baskinInstances,
      OptHotgoodsList,
     qqwPageState={};
    qqwPageState.param={p:1,ps:6, id:"",pagecount:""};
    qqwPageState.moreFlag=false;              


function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.slideToggle = AnimationUtil.slideToggle;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
	this.iscrollInit = QqwUtil.iscrollInit;
     this.msg = QqwUtil.msg;
    this.getOptHotgoodsList=getOptHotgoodsList;
}


function getOptHotgoodsList(){
	return OptHotgoodsList
}
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 function getShopInfo(data) {
	let reflectData = {};
	reflectData.title = data.title;
          reflectData.doyen_id =parseInt(data.doyen_id);
          reflectData.doyen_name = data.doyen_name;
          reflectData.face=data.face;
          reflectData.cate_name = data.cate_name;
          reflectData.clumun_name = data.clumun_name;
          reflectData.picture = data.picture;
          reflectData.uid = data.uid;
          reflectData.create_time = data.create_time;
          reflectData.content = data.content;
          reflectData.love_num = data.love_num;
          reflectData.comment_num = data.comment_num;
          reflectData.share_num = data.share_num;
          reflectData.reward_num = data.reward_num;
          reflectData.article_type = data.article_type;
          reflectData.brand_id = data.brand_id;
          reflectData.isdoyen = data.isdoyen;
          reflectData.islove = data.islove==0?false:true;
         if(data.butler_userinfo==null){
             return reflectData;
         }
         let item = {};
	
	     item = {
                 uid : data.butler_userinfo.uid,
                 nickname:data.butler_userinfo.nickname,
                 lv:data.butler_userinfo.lv,
                 sex:data.butler_userinfo.sex,
                 face:data.butler_userinfo.face
	      }
          reflectData.butler_userinfo =item;

	return reflectData;
}


/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 function getColumnInfo(data) {
	let reflectData = {};
	reflectData.count = data.count;

          reflectData.list = []; 
          let idx = 0;
	Array.from(data.list || []).map((orderlist) => {
		           let item = {};
			item={
                     comment_id: orderlist.comment_id,
				content: orderlist.content,
				create_time:orderlist.create_time,
				uid: orderlist.uid,
				nickname: orderlist.nickname,
				face: orderlist.face,
				likes: orderlist.likes,
                     is_like:orderlist.is_like			
				}

			reflectData.list.push(item);
		         ++idx;
	});
          reflectData.pagecount = data.pagecount;
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




 QqwUtil.ajaxData('get', BackendApiGetColumnDetails, {id:id}, (data) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
		let reflectData=getShopInfo(data);
	           baskinInstances= riot.mount('specialColumn',reflectData)[0];
                   //let spconte=document.getElementById("sp_content");
                   $('#sp_content').html(data.content);

	           getColumnComment();
                 //监听
                baskinInstances.on('refresh',() =>{
                    qqwPageState.param.p=1;
                    baskinInstances.trigger('reset');
                    getColumnComment();
                });

	           footerNav=riot.mount('footer-bar', {index:0});
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});


function getColumnComment(){
           qqwPageState.param.id=getQueryString("id");
          QqwUtil.ajaxData('get', BackendApiGetColumnComment, qqwPageState.param, (data) => {
                     qqwPageState.pagecount =data.pagecount;
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
          if( qqwPageState.param.p==1){
                  initScroll();
          }
		OptHotgoodsList=getColumnInfo(data);
	           baskinInstances.update('specialColumn');
          
	     
	           footerNav=riot.mount('footer-bar', {index:0});
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});	
}


riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
riot.mixin('valiatorReg', valiatorReg);


function changPullDisplay(enable){
      let pullUpEl=document.getElementById('pushMore');
	    if(enable){
	          pullUpEl.style.display='block';
	    }else{
	        pullUpEl.className = 'qqw-push-more-no-content';
	        pullUpEl.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
	    }

        
}

function initScroll(){
    scrollHandler = new PullPush(100, () => {
             console.log('22222')
              scrollHandler.isHandling=true;
               qqwPageState.moreFlag=false;  

                if(qqwPageState.param.p<qqwPageState.pagecount){
                	    qqwPageState.moreFlag=true
                         qqwPageState.param.p++;
                         changPullDisplay(true);
                }
                else{
                	changPullDisplay(false);
                    qqwPageState.moreFlag=false;
                 return;

     }
             
              //qqwPageState.param.p=2;
              getColumnComment();

    },(topStance)=>{
          let puljup=document.getElementById('rtt');
          if(topStance<=400){
              puljup.style.display='none';
          }
          else{
              puljup.style.display='block';
          }
        console.log('topStance.....:'+topStance);
        
           //三个按钮的id
           let specialpalls=document.getElementById('special_pall');
           //提交评论的按钮
           let specialpla=document.getElementById('special_pl');
          specialpalls.style.display='block';
            if(topStance<=200){
              specialpalls.style.display='block';
          }
          else{
              specialpla.style.display='none';
          }

    });
    scrollHandler.ob();

     }





