import '../component/card/topic-head-box.tag';
import '../component/card/special-goods-list.tag';
import '../component/card/topic-item-card.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwPagestate from '../../../js/qqw_pagestate';
import QqwApp from '../../../js/qqw_app';
import { BackendApiGetZhuanlanList} from 'BackendApi';

<navitem  style='width: 100%;'>
  <!-- <p  class=" pushDown qqw-push-more qqw-push-down" style='display:none'><span>全球蛙正在为您刷新</span></p> -->
    <topic-head-box></topic-head-box>

  <div class='content{opts.category.id} content-box' id='scrollHereId1' >
    <!-- <div class="special-category-line"></div> -->
<!--     <div class="special-category">
      <p class="cate-name">{opts.category.cateName}</p>
      <p class="ads">{opts.category.ads}</p>
    </div>  -->
        <div class="title-box">
          <p class="left">最新专栏</p>
          <a href="/mobile-topic-main/list?type=1">
            <p class="right">
              <span>
                更多＞
              </span>
            </p>
          </a>
        </div>
    <div each="{ opts.column}" style="z-index: -1">
     <!--      <a  class="selecte-imgbg" >
        <img class="special-picture"  src="{picurl1}">
        <div class="special-title">
              <p class="tit1">{title}</p>
              <p class="tit2">{ads}</p>
        </div>
     </a>   -->  
       <topic-item-card list={articleList}></topic-item-card>
    </div>
        <div class="title-box" id='scrollHereId2'>
          <p class="left">热门专题</p>
          <a href="/mobile-topic-main/list?type=2">
            <p class="right">
              <span>
                更多＞
              </span>
            </p>
          </a>
        </div>
  </div>
  <!--      <a href="/app-doyen/apply" class='a-edoyen-aside'><p class="homepage-geek-recruit-container homepage-edoyen-aside" ></p></a> -->
  </div>
  <p class="pushUp qqw-push-more qqw-push-down  "><span>全球蛙正在为您下拉刷新</span></p>  

    <script>
    this.mixin('util');
    let reflectData
    ,navitemIscrollInstance
    ,qqwPageState={}
    ,self
    ,id
    ,scrollHandler
    ,pullUpEl;
    this.on('mount', () => {    
    window.startTime = new Date().getTime(); //挂载标记时间    
    self = this;
    id=self.opts.category.id;
    qqwPageState.param={p:1,ps:6,cate_id:32,ps:6};
    qqwPageState.moreFlag=false;            
    getNavitemList();
     pullUpEl=self.root.getElementsByClassName('qqw-push-more')[0];
    });
// ===========================================================
     this.on('getMoreCallBack',(param)=>{
      console.log('on navitem......');
      scrollHandler=param.scrollHandler;
      if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
        changPullDisplay(true);
         getNavitemList();
       }
       else{
          changPullDisplay(false);
       }
     })


/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */

function getReflectData(data) {
  let reflectData = {};
  let urlGoodTogo = '/app-goods/detail?id=';
  let urlArticlTogo = '/app-article/detail?id=';
  reflectData.column = [];
  let i=0;
  let parentLength=data.list.length;
  for(let j=0;j<parentLength;j++){
    if(i==6){
      break;
    }
    let goodslist=data.list[j];
    let articleItem = {};
    articleItem.title = goodslist.intro;
    articleItem.ads = goodslist.ads;
    articleItem.picurl1 =goodslist.images;
    articleItem.url =urlArticlTogo+goodslist.id;
    articleItem.articleList = []; 
    let childLength=goodslist.articleList.length;
    if(childLength>0){
      for(let k=0;k<childLength;k++){
              i++;
              let articleitem=goodslist.articleList[k];     
                    let item= {
                        url: urlArticlTogo + articleitem.id,
                        topicName: articleitem.doyen_name,
                        face: articleitem.picurl1,
                        title: articleitem.title, 
                    }
              articleItem.articleList.push(item)
              if(i==6){
                 reflectData.column.push(articleItem);
                 break;
              }
      }
    }
      if(i!=6){
              reflectData.column.push(articleItem);
            }
  }
  return reflectData;
}

function changeBoxWrapperHeight(){ 
    let $navitem=$(".qqw-banner-box").find('navitem').eq(self.opts.index-1);
    let H =  $navitem.height()+10;
    $($navitem).parent().css('height', H + 'px');
    $($navitem).parent().parent().css('height', H + 'px');
}


function changPullDisplay(enable){
    // enable ? pullUpEl.style.display='block':'none';
    if(enable){
          pullUpEl.style.display='block';
    }else{
        pullUpEl.className = 'qqw-push-more-no-content';
        pullUpEl.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
  
    }

        
}


function getNavitemList(){
  qqwPageState.enableGetMore=false;
  QqwUtil.ajaxData('get', BackendApiGetZhuanlanList, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(data);
    if(qqwPageState.param.p==1){
    self.opts.column=reflectData.column;
    self.update();
    // setTimeout(()=>{
    //    self.root.getElementsByClassName('a-edoyen-aside')[0].style.display='block';
    //  },1000);
    }else{
    self.opts.column=self.opts.column.concat(reflectData.column);
    self.update();
    }

    if(qqwPageState.param.p<data.pagecount){
      qqwPageState.moreFlag=true
      qqwPageState.param.p++;
     }
     else{
      qqwPageState.moreFlag=false;

     }
    data = null;
    if(scrollHandler){
     scrollHandler.isHandling=false;
    }
    changeBoxWrapperHeight();
    console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });
}



  </script>
</navitem>               