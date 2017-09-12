import './topiclist.scss';
import './topiclist.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';

import { BackendApiGetTopicList,BackendApiGetZhuanlanList,BackendApiSpecialTwo} from 'BackendApi';		// 后台api接口文件

    let reflectData
    ,hotgoodsIscrollInstance
    ,OptTopicList
    ,qqwPageState={}
    ,scrollHandler;
    // let $pullDownEl,$pullUpEl,$pullContent;
    qqwPageState.param={p:1,ps:6};
    qqwPageState.param.cid=getQueryString('id');

    qqwPageState.moreFlag=false; 
    let title=getQueryString('title');   
    let articleType=parseInt(getQueryString('type'));
    setTitle(title);          
    getTopicList();

function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.slideToggle = AnimationUtil.slideToggle;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
	this.iscrollInit = QqwUtil.iscrollInit;
	this.getOptTopicList=getOptTopicList;
}

function getTopicList(){
  qqwPageState.enableGetMore=false;
  QqwUtil.ajaxData('get', getUrl(), qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflect(data);
    if(qqwPageState.param.p==1){
        riot.mixin('util', qqwOpMixin);
        riot.mixin('event', EventUtil);
        hotgoodsIscrollInstance=riot.mount('topiclist', reflectData)[0];
        $('#pushDown').hide();
         $('#homepage-todoyen').show();
         initScroll(); 

    }else{
      OptTopicList=reflectData.topicList;
      hotgoodsIscrollInstance.update({more:true});
    }
    if(qqwPageState.param.p<data.pagecount){
      qqwPageState.moreFlag=true;
      qqwPageState.param.p++;
     }
     else{
      qqwPageState.moreFlag=false;
        // scrollHandler.cancelOb();
        changPullDisplay(false);
     }
    data = null;
    scrollHandler.isHandling=false;
    console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });
}

// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectData(data) {
              let reflectData = {};
              let urlTopicDetailTogo = '/mobile-topic-main/detail?id=';
              let urlTopicDetailTogoTwo = '/mobile-topic-main/detailTwo?id=';
              reflectData.topicList = [];
              Array.from(data.list || []).map((topicList) => {
              	let url= topicList.type==1 ? urlTopicDetailTogo:urlTopicDetailTogoTwo; 
                let articleItem = {};
                articleItem.title = topicList.module_name;
                articleItem.picurl1 =topicList.picture;
                articleItem.url =url+topicList.tid;
                articleItem.tid =topicList.tid;
                articleItem.joins = '已有'+topicList.joins+'人参与'; 
                articleItem.joinsCount = topicList.joins; 
                articleItem.btnDestribe = topicList.type==1 ? '去晒图':'说两句' ; 
                articleItem.btncolor = topicList.btncolor+' '+'!important';
                  reflectData.topicList.push(articleItem);
              });
              return reflectData;
}

/**
 * 模板 - 专栏数据字典映射
 * @param  {[type]} data [接口json数据]
 */

function getZhuanlanReflectData(data) {
  let reflectData = {};
  let urlGoodTogo = '/app-goods/detail?id=';
  let urlArticlTogo = '/app-article/detail?id=';
  reflectData.topicList = [];
  Array.from(data.list || []).map((goodslist) => {
    let articleItem = {};
    articleItem.title = goodslist.intro;
    articleItem.ads = goodslist.ads;
    articleItem.picurl1 =goodslist.images;
    articleItem.url =urlArticlTogo+goodslist.id;
    articleItem.articleList = []; 
      Array.from(goodslist.articleList || []).map((articleitem) => {
      
    let item= {
        url: urlArticlTogo + articleitem.id,
        topicName: articleitem.doyen_name,
        face: articleitem.picurl1,
        title: articleitem.title, 
      }
      articleItem.articleList.push(item)

  });


      // articleItem.goods.push({
      // url: urlArticlTogo + goodslist.id + '&ref=special',
      // showStyle: goodslist.style_type || 1,
      // more: '更多' 
      // });
      reflectData.topicList.push(articleItem);
  });
  return reflectData;
}


/**
 * 模板 - 专题数据字典映射
 * @param  {[type]} data [接口json数据]
 */

function getArticleListReflectData(data) {
  let reflectData={};
  let urlGoodTogo = '/app-goods/detail?id=';
  let urlArticlTogo = '/app-article/detail?id=';
    reflectData.topicList = [];
  Array.from(data.list || []).map((brItem) => {
    let brandItem = {};
    let nickname = brItem.nickname;
    brandItem = {
      id: brItem.id,
      face: brItem.picurl1,
      title:brItem.title,
      url:urlArticlTogo + brItem.id,
      topicName:brItem.column,
      nickname:brItem.nickname,
      lovenum:parseInt(brItem.like_num),
      islove :brItem.is_like.toString(),
      identity :'['+data.column+'·'+data.name+']',
      class:true

    }
    reflectData.topicList.push(brandItem);
  });
  return reflectData;
}


function getReflect(data){
  let commonReflectData={}
  switch(articleType){
    case 0:
       commonReflectData=getReflectData(data);
       break;
    case 1:
       commonReflectData=getZhuanlanReflectData(data);
       break;
    case 2:
       commonReflectData=getArticleListReflectData(data);
       break;
    default:
      commonReflectData=getReflectData(data);
       break;
         
  }
  commonReflectData.articleType=articleType;
  return commonReflectData;
}


function getUrl(){
  let url=''
  switch(articleType){
    case 0:
       url=BackendApiGetTopicList;
       break;
    case 1:
       url=BackendApiGetZhuanlanList;
       qqwPageState.param.cate_id=32;
       $('title').html('专栏列表');
       break;
    case 2:
       url=BackendApiSpecialTwo;
       qqwPageState.param.cate_id=1;
       qqwPageState.param.nogoods=1;
       $('title').html('专题列表');
       break;
    default:
       url=BackendApiGetTopicList;
       break;
         
  }
  return url;
}

function getOptTopicList(){
	return OptTopicList
}


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
		scrollHandler = new PullPush(800, () => {
           if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
           	scrollHandler.isHandling=true;
           	changPullDisplay(true);
     	  	getTopicList();
            }
		});
		scrollHandler.ob();
     }
// function initScroll(){

// $pullDownEl=document.getElementsByClassName('iscrollPullDown')[0];
// $pullUpEl=document.getElementsByClassName('iscrollPullUp')[0];
// $pullContent=document.getElementsByClassName('goodslist')[0];

// hotgoodsIscrollInstance=QqwUtil.iscrollInit($pullDownEl,$pullUpEl,$pullContent,function(instance){
//    console.log('down');
//     qqwPageState.param={p:1,ps:6};
//         getHotgoodsList();
//   },function(instance){
//      if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
//      	  	getHotgoodsList();
//      }
//     console.log('up');
//   });
// hotgoodsIscrollInstance.refresh();
	
// }



    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    function setTitle(name){
    	if(name){
    		document.getElementsByTagName('title')[0].innerHTML=name;
    	}
    }
window.nativeChangeJoinE=function(id){
    var className='.tidItem'+id;
    var count=parseInt($(className).data('count'), 10)+1;
    var html='已有'+count+'人参与';
    $(className).html(html);
 }
