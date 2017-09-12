import '../button/button-basklike.tag';
import './message-img-alert.tag';
import { BackendApiGetTopicCommentList ,BackendApiTopicmainikeLike ,BackendApiTopicmainundLike} from 'BackendApi';
<bask-comment>
   <div class="commentall">

       <div class="commenta" each="{value ,index in opts.list}">
       	   <div class="photo fl">
                    <img src="{value.face}"  >
                </div>

                <div class="eval_con fl">
                	 <p class="conp1">
                	      <span class="c1">{value.nickname}</span>
                	      <span class="c2">{value.addtime}</span> 
                            

                         <img class="conp_share" id="conp_share" data-cid={value.cid}  onclick={con_share} src="/static/css/product_funding/funding/app_img/fa_icon_share@2x.png"  if='{!Iswechat}'>
            

                	 </p>
                	 <p class="conp2">
                	 	{value.content}  
                	 </p>
                	 <p class="conp3">
                              <span each='{value , index  in value.pictures}'>
                	 	 <img  if="{index <3}"  src="{value}" data-src='{value}' onclick={previewImg}>
                              </span>
                	 </p>
                </div>
               <button-like items='{value}' ></button-like>
                <!--  <div class="eval_right fr"  onclick={ likeClick }>
                	       <img class="button-like-sign button-like-sign--active" src="/static/css/product_funding/funding/app_img/like@2x.png" if="{is_like==true}"  data-loveid="{ tid }" data-lovenum="{ likes }">
		       <img class="button-like-sign" src="/static/css/product_funding/funding/app_img/icon_unlike1x.png" if="{is_like==false}" data-loveid="{ tid }" data-lovenum="{ likes }">
                	       <span>{likes}</span> 
                </div> -->
       </div>

 <p class="pushUp qqw-push-more qqw-push-down  "><span>全球蛙正在为您下拉刷新</span></p>  


     </div>  

     <message-img-alert></message-img-alert>

<script>
    this.mixin('util');
    this.mixin('event');
    let self = this;
    let reflectData
    ,navitemIscrollInstance
    ,qqwPageState={}
    ,id
    ,scrollHandler
    ,pullUpEl,
    messageAlertInstance;

   function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}

id=getQueryStrings("id");






    this.on('mount', () => {    
    window.startTime = new Date().getTime(); //挂载标记时间    
    self = this;
    self.Iswechat=self.opts.dataIswechat;
    qqwPageState.param={p:1,ps:6,tid:id,order:self.opts.dataOrder};
    qqwPageState.moreFlag=false;              
    getNavitemList();
     pullUpEl=self.root.getElementsByClassName('qqw-push-more')[0];
     messageAlertInstance=self.tags['message-img-alert'];
    });

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

//分享
this.con_share=function(event){
    Global.sendShare(event.currentTarget.dataset.cid,"6");
};

this.previewImg=function(event){
            let imgUrl=event.currentTarget.dataset.src;
            messageAlertInstance.opts.url=imgUrl;
            messageAlertInstance.update();
            $('.mask').removeClass("hide");
    };

function removeRecoverData(list){
  var  cids=[],length=list.length,newList=[];
  for(var i=0;i<length;i++){
     if(cids.indexOf(list[i].cid)==-1){
      cids.push(list[i].cid);newList.push(list[i]);
     }
  }
  return newList;
}

/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */

function getReflectData(data) {
  let reflectData = {};

     reflectData.list = []; 
     let idx = 0;
    Array.from(data.list || []).map((orderlist) => {
            let item = {};
            item={
                cid: orderlist.cid,
                tid:orderlist.tid,
                uid: orderlist.uid,
                content: orderlist.content,
                likes: orderlist.likes,
                addtime: orderlist.addtime,
                visible: orderlist.visible,
                nickname: orderlist.nickname,
                lv: orderlist.lv,
                sex: orderlist.sex,
                face: orderlist.face,
                bind_mobile: orderlist.bind_mobile,
                is_like:orderlist.is_like,
                pictures: orderlist.pictures
                }
  
            reflectData.list.push(item);
                 ++idx;
    }); 
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
  self.ajaxData('get', BackendApiGetTopicCommentList, qqwPageState.param, (data) => {
        qqwPageState.enableGetMore=true;
    let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
    let reflectData = getReflectData(data);
    if(qqwPageState.param.p==1){
    self.opts.list=reflectData.list;
    self.update();
    // setTimeout(()=>{
    //    self.root.getElementsByClassName('a-edoyen-aside')[0].style.display='block';
    //  },1000);
    }else{
    self.opts.list=self.opts.list.concat(reflectData.list);
    self.opts.list=removeRecoverData(self.opts.list);
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

</bask-comment>