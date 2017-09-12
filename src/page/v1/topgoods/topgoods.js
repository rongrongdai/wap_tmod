import '../component/Public-head/index-search.tag';
import '../component/Public-head/index-search.scss';
import '../component/Public-head/qqw-head.scss';	
import '../component/Public-head/qqw-head.tag';
import '../component/Public-head/qqw-foot.tag';
import './topgoods.tag';
import './topgoods.scss';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';

import { BackendApiMinarticle,BackendApiBabySpecialList,BackendApiTopCategoryList} from 'BackendApi';		// 后台api接口文件

    let reflectData
    ,TopgoodsIscrollInstance
    ,OptTopgoodsList
    ,qqwPageState={}
    ,scrollHandler;
    let catId=QqwUtil.getQueryString('cat_id');
    let type='';
    let url;
    let headGoods={}
    QqwUtil.main(function*(){
     riot.mixin('util', qqwOpMixin);
	riot.mixin('event', EventUtil);
     getUrlType(catId);
    qqwPageState.param={p:1,ps:6,catId:catId};
    qqwPageState.moreFlag=false;          
    getTopgoodsList();
    if(QqwUtil.getPlatform()=='wechat' && type != ''){
             riot.mount('foot-nav',{index:0});
		     riot.mount('index-search', {index:0});
		     getHeadCategoryList();
		     $(".content-box").css("margin-top","2.1rem");
		}
});

    function  getUrlType(Id){
        var title='';
    	switch(Id){
    		case '116': type='home';
    		            title='家居生活';
    		            url=BackendApiMinarticle;
    		            headGoods=getHomeGoodData();
    		            break;
            case '130': type='baby';
                        title='妈妈宝贝' ;
                        url=BackendApiMinarticle;  
                        headGoods=getBabyGoodData();
                        break;
            case '124': type='specialty';
                        title='蛙特产' ;
                        url=BackendApiMinarticle;
                        headGoods=getSpecialtyGoodData();
                        break;            
            default:
                        type='';
                        title='热卖大牌榜单';  
                        url=BackendApiBabySpecialList;    
                        break;       

    	}
    	if (Id=null){
    		catId=2;
    	};

       setTitle(title); 
    }

function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.getPlatform = QqwUtil.getPlatform;
	this.slideToggle = AnimationUtil.slideToggle;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
	this.iscrollInit = QqwUtil.iscrollInit;
	this.getOptTopgoodsList=getOptTopgoodsList;
}



function getHeadCategoryList(){

  QqwUtil.ajaxData('get', BackendApiTopCategoryList, {}, (data) => {
    let reflectData = reflactHeadCategoryData(data);
    let index=parseInt(getQueryString('index'), 10)
        if(index){
           reflectData.categoryArr[index].is_choice=true;
        }
        riot.mount('qqwhead', reflectData);
	});
}


function reflactHeadCategoryData(data) {
	let reflectData={};
	reflectData.categoryArr = [];
	Array.from(data.category || []).map((brItem) => {
		let item={}
		item.cateName = brItem.cat_name;
		item.url = brItem.url;
        reflectData.categoryArr.push(item);
	});

	return reflectData;
}

/**
 * 文章列表模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 let i=0;
function reflactMainData(data) {
	let reflectData={};
	let urlGoodTogo = '/app-goods/detail?id=';
	let urlTop10Togo = '/app-goods/hotlist';
	let urlArticlTogo = '/app-article/detail?id=';
	let urlGoodListTogo = '/app-goods/rec?type=1&id=';
	// 品牌特供
	reflectData.brandArr = [];
	reflectData.head = {};
	Array.from(data.list || []).map((brItem) => {
		i++;
		let brandItem = {};
		let nickname = brItem.nickname;
		brandItem.brandid = 'brand'+i.toString() + brItem.id;
		brandItem.speclife = {
			is_show: brItem.is_show == '1' ? true : false,
			showHack:true,
			id: brItem.id,
			bg: type=='' ? brItem.banner_img:brItem.picurl1,
			url: urlGoodTogo + brItem.id,
			slogan: brItem.title,
			doyen_id: type=='' ? '':brItem.uid,
			position: brItem.position+' ·',
			face: brItem.face,
			haveFocus:brItem.isFollow==0?0:1,
			nickname:brItem.nickname+'  '+'推荐'
		}
		brandItem.brand = [];		// 品牌特供商品
        brItem.goods = brItem.goods.splice(0,9);
		Array.from(brItem.goods || []).map((goodsItem) => {
			let reflectItem = {
				url: urlGoodTogo + goodsItem.goods_id,
				pic: goodsItem.goods_thumb,
				showStyle: brItem.style_type || 1,
				name: goodsItem.goods_name,
				price: '￥' + ( ( type==''? goodsItem.promote_price : goodsItem.shop_price) || '0.00')
			};
			brandItem.brand.push(reflectItem);
		});
        if(brItem.goods.length==9){
           brandItem.brand.push({
            url: urlGoodListTogo+brItem.index_id,
            // showStyle: brItem.style_type || 1,
            more: '查看更多'
         });
        }
		reflectData.brandArr.push(brandItem);
	});


        reflectData.head.type=type;
        reflectData.head.goodList=[]
        Array.from(headGoods || []).map((goodsItem) => {
			let reflectItem = {
				url: goodsItem.url ? goodsItem.url : (urlGoodTogo + goodsItem.goods_id),
				pic: goodsItem.goods_thumb,
			};
		  reflectData.head.goodList.push(reflectItem);
		});
	return reflectData;
}

function getHomeGoodData(){
    return[
    {
    "goods_id":"2789",
    "url":' http://m.quanqiuwa.com/app-special/homedaily',
    "goods_thumb":"/static/css/wap/img/active/home-goods1.png"},

    {
    "goods_id":"2571",
     "url":'http://m.quanqiuwa.com/app-special/yima',
    "goods_thumb":"/static/css/wap/img/active/home-goods2.png"},

    {
    "goods_id":"2693",
    "goods_thumb":"/static/css/wap/img/active/home-goods3.png"},

    {
    "goods_id":"3073",
    "goods_thumb":"/static/css/wap/img/active/home-goods4.png"},

    {
    "goods_id":"2671",
    "goods_thumb":"/static/css/wap/img/active/home-goods5.png"},

    {
    "goods_id":"2591",
    "goods_thumb":"/static/css/wap/img/active/home-goods6.png"},

    {
    "goods_id":"2790",
    "goods_thumb":"/static/css/wap/img/active/home-goods7.png"},

    {
    "goods_id":"2735",
    "goods_thumb":"/static/css/wap/img/active/home-goods8.png"}];

    }


    function getBabyGoodData(){
    return[

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=131",
    "goods_thumb":"/static/css/wap/img/active/1@2x.png"},

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=132",
    "goods_thumb":"/static/css/wap/img/active/2@2x.png"},

    {
    "goods_id":"2571",
    "url":'http://m.quanqiuwa.com/app-category/vlist?cat_id=133',
    "goods_thumb":"/static/css/wap/img/active/3@2x.png"},

    {
    "goods_id":"2571",
    "url":'http://m.quanqiuwa.com/app-category/vlist?cat_id=134',
    "goods_thumb":"/static/css/wap/img/active/4@2x.png"},

    {
    "goods_id":"2571",
    "url":'http://m.quanqiuwa.com/app-category/vlist?cat_id=146',
    "goods_thumb":"/static/css/wap/img/active/5@2x.png"}];
    }


    function getSpecialtyGoodData(){
    return[

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=128",
    "goods_thumb":"/static/css/wap/img/active/wa-special1.png"},

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=127",
    "goods_thumb":"/static/css/wap/img/active/wa-special2.png"},

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=126",
    "goods_thumb":"/static/css/wap/img/active/wa-special3.png"},

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=129",
    "goods_thumb":"/static/css/wap/img/active/wa-special4.png"},

    {
    "goods_id":"2571",
    "url":"http://m.quanqiuwa.com/app-category/vlist?cat_id=125",
    "goods_thumb":"/static/css/wap/img/active/wa-special5.png"}];

    }


function getOptTopgoodsList(){
	return OptTopgoodsList
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
		scrollHandler = new PullPush(30, () => {
           if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
           	scrollHandler.isHandling=true;
           	changPullDisplay(true);
     	  	getTopgoodsList();
            }
		},(scrollTop)=>{
          LazyUpLoadIndexImg(scrollTop,2000);
          QqwUtil.LazyUpLoadImg(scrollTop,2000);
		});
		scrollHandler.ob();
     }

function getTopgoodsList(){
  qqwPageState.enableGetMore=false;
  QqwUtil.ajaxData('get', url, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = reflactMainData(data);
    if(qqwPageState.param.p==1){
	               riot.mixin('util', qqwOpMixin);
		    riot.mixin('event', EventUtil);
		    TopgoodsIscrollInstance=riot.mount('hotgoods', reflectData)[0];
		    $('#pushDown').hide();
		     $('#homepage-todoyen').show();
		     initScroll(); 
		    LazyUpLoadIndexImg(0,2000);
            QqwUtil.LazyUpLoadImg(0,2000);

		}else{
			OptTopgoodsList=reflectData.brandArr;
			TopgoodsIscrollInstance.update({more:true});
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

function LazyUpLoadIndexImg(scrollTop,distance){
	    var winH = $(window).height();
        $('.a-lazy-upload').each(function(index, evevt){//遍历每一个元素
            let $cur = $(evevt);
            let top = $cur.offset().top;
            let url= ($cur.data('src'));
            if(url==''){return;}//判断是否已加载
            if(top < scrollTop + winH+distance){
               $cur.css('background','transparent url(' + $cur.data('src') + ') center center / cover no-repeat');
               $cur.data('src')=='';
               $cur.removeClass('a-lazy-upload');
            }
        });
    }