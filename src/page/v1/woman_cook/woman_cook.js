import './woman_cook.scss';
import './woman_cook.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';


import { BackendApiwomanCook } from 'BackendApi';   // 后台api接口文件


    let reflectData
    ,hotgoodsIscrollInstance
    ,OptTopicList
    ,isWechat
    ,qqwPageState={}
    ,scrollHandler;
    qqwPageState.param={page:1,pagesize:6};
    qqwPageState.param.spec_id=geturl('spec_id');

    qqwPageState.moreFlag=false; 
   // let title=getQueryString('title')           
    getTopicList();
    geturl();

//获取URL里面的uid
function geturl(spec_id){
  let reg = new RegExp('(^|&)' + spec_id + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}



function qqwOpMixin() {
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.slideToggle = AnimationUtil.slideToggle;
  this.qqwPageState = qqwPageState;
  this.ajaxOriginalData = QqwUtil.ajaxOriginalData;
  this.iscrollInit = QqwUtil.iscrollInit;
  this.getOptTopicList=getOptTopicList;
}

// ===========================================================
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getReflectData(data) {
  let reflectData = {};
    let urlGoodTogo = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
    let urlWomenTogo = '/mobile-special/womenDay?cat_id=';
    reflectData.spec_id=data.spec_id;
    reflectData.cat_id=data.spec_cat_id;
    reflectData.WomenTogo=urlWomenTogo+reflectData.cat_id;
    reflectData.spec_name=data.spec_name;
    reflectData.spec_desc = data.spec_desc;
    reflectData.banner_img=data.banner_img;
    reflectData.goods_img=data.goods_img;
    reflectData.recommend_img=data.recommend_img;
    reflectData.head_img=data.head_img;
    reflectData.start_time=data.start_time;
    reflectData.end_time=data.end_time;
    reflectData.format_start_time=data.format_start_time;
    reflectData.format_end_time=data.format_end_time;
    reflectData.reset_time=parseInt(data.reset_time);
    reflectData.label =data.label;
    reflectData.os = isWechat?'/mobile-goods/detail?id=':'/app-goods/detail?id=';
   reflectData.goodslist = [];
 
  let idx = 0;
  Array.from(data.list || []).map((goodsitem) => {
        let item = {};
        item.Product= {
        // userid: goodsitem.uid,
        // goodsid:goodsitem.goods_id,
        // pic: goodsitem.goods_thumb,
        // url: urlGoodTogo + goodsitem.goods_id,
        // goodsname: goodsitem.goods_name,
        // face: goodsitem.face,
        // nickname: goodsitem.nickname,
        // price:goodsitem.shop_price,
        // goods_brief:goodsitem.goods_brief,
         url: urlGoodTogo + goodsitem.goods_id,
         goods_sn: goodsitem.goods_sn,
         userid: goodsitem.uid,
         goodsname: goodsitem.goods_name,
         pic: goodsitem.goods_thumb,
         goods_img: goodsitem.goods_img,
         product_id: goodsitem.product_id,
         price: goodsitem.promote_price,
         discount: goodsitem.discount,
         nickname: goodsitem.nickname,
         lv: goodsitem.lv,
         sex: goodsitem.sex,
         face: goodsitem.face,
      }
      reflectData.goodslist.push(item);
             ++idx;
  });
    if(data.banner){
     reflectData.banner=data.banner;
  }
  return reflectData;
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
    },(topStance)=>{
          let puljup=document.getElementById('rtt');
          if(topStance<=400){
              puljup.style.display='none';
          }
          else{
              puljup.style.display='block';
          }
    });


    scrollHandler.ob();
     }


function getTopicList(){
  qqwPageState.enableGetMore=false;
  QqwUtil.ajaxOriginalData('get', BackendApiwomanCook, qqwPageState.param, (json) => {
        isWechat=json.os=='wechat'?true:false;
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(json.data);
    let titname=json.data.spec_name
    setTitle(titname);  
    if(qqwPageState.param.page==1){
           riot.mixin('util', qqwOpMixin);
           riot.mixin('event', EventUtil);
           renderHomepageBanner(json.data.banner);
           hotgoodsIscrollInstance=riot.mount('womanCook', reflectData)[0];
        $('#pushDown').hide();
         $('#homepage-todoyen').show();
         initScroll(); 
         Global.sendShare(qqwPageState.param.spec_id,7);
    }else{
      OptTopicList=reflectData.goodslist;
      hotgoodsIscrollInstance.update({more:true});
    }
    if(qqwPageState.param.page<json.data.pagecount){
      qqwPageState.moreFlag=true;
      qqwPageState.param.page++;
     }
     else{
      qqwPageState.moreFlag=false;

        changPullDisplay(false);
     }
    json = null;
    scrollHandler.isHandling=false;
    console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });
}

    function setTitle(titname){
       var $body = $('body');
        document.title =titname;
        // var $iframe = $("<iframe style='display:none;' src='/favicon.ico'></iframe>");
        // $iframe.on('load',function() {
        //   setTimeout(function() {
        //     $iframe.off('load').remove();
        //   }, 0);
        // }).appendTo($body); 
    }
/**
 * 渲染首屏 banner 块
 * @param  {[type]} banner [banner数据]
 */
function renderHomepageBanner(banner) {
  if (!banner) {
    return;
  }
  let d = document.createDocumentFragment();
  Array.from(banner).map((banneritem) => {
    let bannerLink = document.createElement("a");
    bannerLink.href = banneritem.url || '#';
    bannerLink.className += 'swiper-slide qqw-op-bg';
    bannerLink.style.background = 'transparent url(' + banneritem.img + ') center center / cover no-repeat';
    d.appendChild(bannerLink);
  });
  let $homepageBanner = document.getElementById('homepageRecomBanner');
  $homepageBanner.appendChild(d);


     // $('#test').click(()=>{
     //   console.log(qqwBoxSwiper.params);
     // })

    var qqwOpSwiper = new window.Swiper ('.qqw-banner-top', {
    autoplay: 4000,
      loop: true,
      touchRatio: 1,
      observer: true,
      freeMode: false,
      pagination: '.swiper-pagination-top'
  });
}
    // function getQueryString(name) {
    //     var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    //     var r = window.location.search.substr(1).match(reg);
    //     if (r != null) {
    //         return unescape(r[2]);
    //     }
    //     return null;
    // }














