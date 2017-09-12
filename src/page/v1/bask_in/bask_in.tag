import '../component/card/bask-comment.tag';
import { BackendApiRegister } from 'BackendApi';
<baskin>
  
      <div class="baskintop1">
           <img class="bastopimgs" src="{opts.top_picture}">
           <div class="topcont">
                 <span class="toimg"></span>{opts.joins}人参加
                 <div class="tosjx"></div>
            </div>
      </div>

      <div class="baskintlower">
           <p>活动时间：{opts.starttime} - {opts.endtime}</p>
      </div>
      <div class="baskintcont">
            <p class="cont_p">{opts.module_name}</p>
            <p class="cont_p2"  style="height:{price}">
                <span id="descriptions">{opts.description }</span>
                <p id="contents">{opts.content }</p>
            </p>

            <p class="cont_p3" onclick={changeHeight}  if={shoeBtn}></p>
            
           <!--  <div class="cont_con">
                <p class="cont_p2">
                     <span>【来不及解释啦】</span>，新年的惊喜马上就要派发了！想要礼物的小伙伴，
                     只要说出你的新年心愿，就有可能被我们挑选实现心愿哦，还等
                     什么赶快行动吧
                </p>
                 <p class="cont_p2">
                     <span>【来不及解释啦】</span>，新年的惊喜马上就要派发了！想要礼物的小伙伴，
                     只要说出你的新年心愿，就有可能被我们挑选实现心愿哦，还等
                     什么赶快行动吧
                </p>
            </div> -->


             <div class="cont_con1">
                     <div class="line"></div>
                     <div class="info">丰厚奖品</div>
             </div>
             <div class="cont1_im">
                  <img src="{opts.gift_picture}">
             </div>
            
             <div class="cont_bar"></div>
      </div>


     <div class="baskmiddle">
           <div class="mid_left"><span>大家正在晒</span></div>
           <div class="mid_right">
                <span  data-id='0'  class="equal  {tesu:havedChoose}" onclick={switch_head}>最新</span>
                <span  data-id='1'  class="equal  {tesu:!havedChoose}" onclick={switch_head}>最热</span>
           </div>
     </div>
    
    <div class=""> 
         <bask-comment  data-isWechat='{opts.isWechat}'  data-order='addtime'  class="hottest_hd  {hottest:havedChoose}" ></bask-comment>
         <bask-comment  data-isWechat='{opts.isWechat}'  data-order='likes'  class="hottest_hd  {hottest:!havedChoose}"></bask-comment>
    </div>   

    <div class="bask_tail" onclick={sendToSai}>
          <span  class="tail_img"></span>
          我也要晒
    </div> 



<script>
       this.mixin('util');
       let self = this;
       let id;
       let index=0;
       self.havedChoose=true;
       this.downs= function(event) {
              $(".cont_con").removeClass('cont_con');
              $(event.target).addClass('spdk');
        };        
       console.log('picture:'+self.opts.picture);
       console.log('picture:'+self.opts.gift_picture);
 

      this.switch_head=function(event){
               self.havedChoose=  event.target.dataset['id']=='1' ? false:true; 
               index=parseInt(event.target.dataset['id']);
               self.update({havedChoose:self.havedChoose});
      };

      this.on('getMore',(object)=>{
        // object.scrollHandler;
         this.tags['bask-comment'][index].trigger('getMoreCallBack',object);
      });


 //传id
function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
id=getQueryStrings("id");

      this.sendToSai=function(event){
        if(self.opts.isWechat){
               self.ajaxOriginalData('GET',BackendApiRegister,null,(data) =>{
                        if(data.ret==0){
                            location.href="/mobile-topic-main/comment?id="+id +"&bp="+1;
                          }else {
                            location.href="/mobile-butler-main/joinUser?rform=wx";
                          }
                    })
               //self.msg('请下载全球蛙app',1);
               return;
            }
        Global.sendToShow(self.opts.tid);
      }

      this.changeHeight=function(event){
           self.shoeBtn=false;
           self.price='auto';
      }

      this.one('update',()=>{
        // if($('.cont_p2').height())
        if(self.opts.content.length>1000){
          self.shoeBtn=true;
          self.price='200px';
        }
      })
</script>
</baskin>