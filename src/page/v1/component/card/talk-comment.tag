import '../button/button-talklike.tag';
import { BackendApiGetTopicCommentList ,BackendApiTopicmainikeLike ,BackendApiTopicmainundLike ,BackendApiRegister} from 'BackendApi';
<talk-comment>
   <div class="commentall">
          <div class="commen_lefttesu {intro:!Iswechat}">
                      <div class="commentop">
                      </div>

                      <div class="commentcont" onclick={sendToSay}>
                           <span class="cont_img"></span><span>我想说...</span>
                      </div>

          </div>



           <div class="commen_left  {intro:!Iswechat}"   each="{value ,index in opts.list}" style="background-color:{value.color} ">
                  <div class="sxuan" id="sxuan">
                        
                           <img class="cons_share" id="conp_share" data-cid={value.cid}  onclick={con_share} src="/static/css/product_funding/funding/app_img/icon_sharedx.png"  if='{!Iswechat}'>

                      </div>

                      <div class="commentop">
                           <img src="{value.face}">
                           <span>{value.nickname}</span>
                      </div>

                      <div class="commentcont">
                            <span class="alone">{value.content}</span>
                      </div>

                      <!-- <div class="thumbs_up">{likes}人赞过 </div> -->
                      <button-like  items='{value}' ></button-like>
          </div>


         <message-alert></message-alert>

           
   </div> 
     <p class="pushUp qqw-push-more qqw-push-down  "><span>全球蛙正在为您下拉刷新</span></p>  

<script>
    this.mixin('util');
    this.mixin('event');
    let reflectData
    ,navitemIscrollInstance
    ,qqwPageState={}
    ,self
    ,id
    ,scrollHandler
    ,pullUpEl;

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
     let colorlist=[
     // '#96bdff',
     // '#d7c4ff',
     // '#fed0aa',
     // '#86e1ef',
     // '#feaad2',
     // '#b3da9f'
     '#fda7le',
     '#e75a4e',
     '#76cba3',
     '#a1c15c',
     '#8f83bd',
     '#f39d9f',
     '#729ce2'

     ]
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
                is_like:orderlist.is_like,
                bind_mobile: orderlist.bind_mobile,
                pictures: orderlist.pictures,
                color:colorlist[Math.ceil(Math.random()*5)]
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


//分享
this.con_share=function(event){
    Global.sendShare(event.currentTarget.dataset.cid,"6");
};

// var u = navigator.userAgent;
// var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// var isweixin=u.indexOf('MicroMessenger') > -1;//微信终端
//  if(isweixin){
//         opts.Iswechat= true;
//  }


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
    self.opts.list=removeRecoverData( self.opts.list);
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

 this.sendToSay=function(event){
       if(self.opts.dataIswechat){
                self.ajaxOriginalData('GET',BackendApiRegister,null,(data) =>{
                        if(data.ret==0){
                            location.href="/mobile-topic-main/comment?id="+id +"&bp="+2;
                          }else {
                            location.href="/mobile-butler-main/joinUser?rform=wx";
                          }
                    })
               return;
            }
           Global.sendToSay(self.opts.tid);
      }
  </script>

</talk-comment>