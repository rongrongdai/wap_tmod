import '../component/card/special-recommend-card.tag';
import '../component/button/button-like.tag';
import '../component/card/topic-item-card.tag';
import { BackendApiSpecialTwo} from 'BackendApi';
<special-navitem  style='width: 100%;'>

  <topic-item-card  list={opts.brandArr}></topic-item-card>
  <div> 
       <a href="https://jinshuju.net/f/ew9Z9L" class='a-edoyen-aside'><p class="homepage-geek-recruit-container homepage-edoyen-aside" ></p></a>
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
    // id=self.opts.category.id;
    qqwPageState.param={p:1,ps:6,cate_id:1,nogoods:1};
    qqwPageState.moreFlag=false;              
    getNavitemList();
     pullUpEl=self.root.getElementsByClassName('qqw-push-more')[0];
    });
// ===========================================================
     this.on('getMoreCallBack',(param)=>{
      // console.log('on navitem......');
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

function getArticleListReflectData(data) {
  let reflectData={};
  let urlGoodTogo = '/app-goods/detail?id=';
  let urlArticlTogo = '/app-article/detail?id=';
    reflectData.brandArr = [];
  Array.from(data.list || []).map((brItem) => {
    let brandItem = {};
    let nickname = brItem.nickname;
    brandItem = {
      id: brItem.id,
      face: brItem.picurl1,
      url:urlArticlTogo + brItem.id,
      title:brItem.title,
      // face: brItem.face,
      topicName: brItem.column,
      nickname:brItem.nickname,
      lovenum:parseInt(brItem.like_num),
      islove :brItem.is_like.toString(),
      identity :'['+data.column+'·'+data.name+']',
      class:true

    }
    reflectData.brandArr.push(brandItem);
  });
  return reflectData;
}


// function changeBoxWrapperHeight(){ 
//     let $navitem=$(".qqw-banner-box").find('navitem').eq(self.opts.index-1);
//     let H =  $navitem.height()+10;
//     $($navitem).parent().css('height', H + 'px');
//     $($navitem).parent().parent().css('height', H + 'px');
// }


function changPullDisplay(enable){
    // enable ? pullUpEl.style.display='block':'none';
    if(enable){
          pullUpEl.style.display='block';
    }else{
        pullUpEl.style.display='block';
        pullUpEl.className = 'qqw-push-more-no-content';
        pullUpEl.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
  
    }

        
}


function getNavitemList(){
  qqwPageState.enableGetMore=false;
  self.ajaxData('get', BackendApiSpecialTwo, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getArticleListReflectData(data);
    if(qqwPageState.param.p==1){
    self.opts.brandArr=reflectData.brandArr;
    self.update();
    setTimeout(()=>{
       // self.root.getElementsByClassName('a-edoyen-aside')[0].style.display='block';
     },1000);
    }else{
    self.opts.brandArr=self.opts.brandArr.concat(reflectData.brandArr);
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
    // changeBoxWrapperHeight();
    console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });
}
  </script>
</special-navitem>               