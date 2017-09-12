import '../component/card/message-alert.tag';
import '../component/card/talk-comment.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwPagestate from '../../../js/qqw_pagestate';
import QqwApp from '../../../js/qqw_app';

import { BackendApiGetTopicCommentList ,BackendApiRegister } from 'BackendApi';


<talkall>
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
            <p class="cont_p2" style="height:{price}" >
                <span id="descriptions">{opts.description }</span>
                <p id="contents">{opts.content }</p>
            </p>

            <p class="cont_p3" onclick={changeHeight}  if={shoeBtn}></p>
            
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
           <div class="mid_left"><span>大家正在说</span></div>
           <div class="mid_right">
                <span  data-id='0'   class="equal {tesu: hasBeenChoose}" onclick={changSwitch}>最新</span>
                <span  data-id='1'   class="equal {tesu: !hasBeenChoose}"   onclick={changSwitch}>最热</span>
           </div>
     </div>
    
    <div class=""> 
         <talk-comment data-isWechat={opts.isWechat}  data-order='addtime' class="hottest_hd  {hottest:hasBeenChoose}"></talk-comment>
         <talk-comment data-isWechat={opts.isWechat}  data-order='likes' class="hottest_hd  {hottest:!hasBeenChoose}"></talk-comment>
    </div>   

    <div class="bask_tail" onclick={sendToSay}>
          <span  class="tail_img" ></span>
          我想说
    </div>  

  



    <script>
       this.mixin('util');
       let index=0;
       let self = this;
       let id;
       self.shoeBtn=false;
       self.hasBeenChoose=true;
       this.downs= function(event) {
              $(".cont_con").removeClass('cont_con');
              $(event.target).addClass('spdk');

        };        


         this.changSwitch=function(event){
              self.hasBeenChoose=  event.target.dataset['id']=='1' ? false:true; 
                index=parseInt(event.target.dataset['id']);
               self.update({hasBeenChoose:self.hasBeenChoose});
         }

         this.on('getMore',(object)=>{
        // object.scrollHandler;
         this.tags['talk-comment'][index].trigger('getMoreCallBack',object);
      })
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
      this.sendToSay=function(event){
            if(self.opts.isWechat){
                   self.ajaxOriginalData('GET',BackendApiRegister,null,(data) =>{
                        if(data.ret==0){
                            location.href="/mobile-topic-main/comment?id="+id +"&bp="+2;
                          }else {
                            location.href="/mobile-butler-main/joinUser?rform=wx";
                          }
                    })
               //self.msg('请下载全球蛙app',1);
               return;
            }
           Global.sendToSay(self.opts.tid);
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
</talkall>