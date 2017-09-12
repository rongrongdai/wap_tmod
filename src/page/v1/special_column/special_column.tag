import '../component/card/bask-comment-sp.tag';
import '../component/button/button-specialike.tag';
import { BackendApipublishComment} from 'BackendApi';   // 后台api接口文件
<specialColumn>
       <div class="spColumn">
            <div class="sp_top"><span>{opts.clumun_name}</span></div>
            <p class="sp_title">{opts.title}</p>
            <p class="sp_time">{opts.create_time}  by 
            <span  data-doyenid='{opts.doyen_id}' onclick={butlefavarticles}>{opts.butler_userinfo.nickname}</span></p>
           <!--  <p class="sp_summary">
                <span class="tes"></span>茶之所在，器之所在，泥与火的淬炼，成就茶器由泥土到陶器的一个蜕变过程。惊艳了时光，温柔了岁月。往来之间，杯盏交错，共谱一曲茶与壶的交响。沉醉于茶之味、器之美。
            </p> -->

            <div class="sp_content" id="sp_content">{opts.content}</div>


        
       </div>

         <p class="sp_colute"></p>


    
       <div class="discuss" id="discuss">评论<span>{opts.comment_num}</span></div>
       <div >
                 <baskcommentsp item={opts.list}></baskcommentsp>
       </div>
    
      <div class="return_head" id='rtt'  onclick={jumptop}></div>
      

  <div class="special_pall" id="special_pall">
      <div class="sp_taill">
          <button-like items='{opts}' ></button-like>
            <!-- <div class="taill_left"  onclick={ likeClick }>
            <img class="button-like-sign button-like-sign--active" src="/static/css/product_funding/funding/app_img/like@2x.png" if="{islove==="1"}"  data-loveid="{ id }" data-lovenum="{ love_num }">
           <img class="button-like-sign" src="/static/css/product_funding/funding/app_img/icon_unlike1x.png" if="{islove==="0"}" data-loveid="{ id }" data-lovenum="{ love_num }">
                <span>{opts.love_num}</span>
            </div> -->
           

            <div class="taill_left">
                <em class="leftcont2" onclick={cotarea}></em>
                <span>{opts.comment_num}</span>
            </div>

            <div class="taill_left" onclick={comment_t}>
                <em class="leftcont3"></em>
                 <span>{opts.comment_num}</span>
                <!-- <span>{opts.share_num}</span> -->
            </div>
      </div>
</div>

      <div class="special_pl" id="special_pl">
       <table class="eval_Bar">
            <tbody>
            <tr>
                <td class="evalinput">
                    <textarea  placeholder="请输入您的评论" id="textAreaCon" contenteditable="true" class="con  textAreaCon" maxlength="150"></textarea>
                </td>
                <td class="eval_btn" >
                    <button onclick={submitcont}>提交</button>
                </td>
            </tr>
            </tbody>
        </table>
   </div>
<script>
     this.mixin('util');
     this.mixin('event');
     this.mixin('valiatorReg');
     let id;
     let self=this;
     this.on('reset',()=>{
            self.opts.list=[];
        });
    this.on('update',()=>{
        let self = this;

        if(self.getOptHotgoodsList()){
            if (!self.opts.list) {
              self.opts.list=[];
            }
            self.opts.list=self.opts.list.concat(self.getOptHotgoodsList().list);  
            self.update();
        }
        // this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
      });



//点击回到顶部
  self.jumptop = function(event) {
        //$("body").scrollTo({toT:0}); 
        window.scrollTo(1,0);
  };
  
//点击查看作者
 this.butlefavarticles = function(event) {
  
     let doyenid = event.currentTarget.dataset.doyenid;
      location.href="/app-doyen/detail?doyen_id="+doyenid;
};

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


//点击跳到评论区
self.cotarea=function(event){
   document.getElementById("discuss").scrollIntoView();
};


//点击评论
this.comment_t=function(event){
      let specialpalls=document.getElementById('special_pall');
      let specialpla=document.getElementById('special_pl');
      specialpalls.style.display='none';
      specialpla.style.display='block';   
};

//提交评论
self.submitcont=function(event){

    let textAreaCons=document.getElementById("textAreaCon").value;
     if(self.isEmpty(textAreaCons)){
               self.msg('请输入评论内容',1);
               return;
           };
    if(textAreaCons.trim().length<10){
             self.msg('评论内容至少为10个字',1);
               return;
    };
    let  param={};
    param.id=id;
    param.content=textAreaCons;
     self.ajaxData('POST', BackendApipublishComment, param,(data) => {
                   self.msg('你评论成功',1); 
                    let specialpalls=document.getElementById('special_pall');
                    let specialpla=document.getElementById('special_pl');
                   specialpalls.style.display='block';
                   specialpla.style.display='none'; 
                   //调用
                   self.trigger('refresh',{});  
                   self.opts.comment_num =parseInt(self.opts.comment_num)+1;
                   document.getElementById("textAreaCon").value="";
         });
};

   // $.fn.scrollTo = function(options) {
   //          var defaults = {
   //            toT: 90, //滚动目标位置
   //            durTime: 500, //过渡动画时间
   //            delay: 2, //定时器时间
   //            callback: null //回调函数
   //          };
   //          defaults.durTime=Math.abs(this.scrollTop()-options.toT)/8;
   //          var opts = $.extend({},defaults, options),
   //            timer = null,
   //            _this = this,
   //            curTop = _this.scrollTop(), //滚动条当前的位置
   //            subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
   //            index = 0,
   //            dur = Math.round(opts.durTime / opts.delay),
   //            smoothScroll = function(t) {
   //              index++;
   //              var per = Math.round(subTop / dur);
   //              if (index >= dur) {
   //                _this.scrollTop(t);
   //                window.clearInterval(timer);
   //                  self.trigger('scrollEnd');
   //                  console.log('scrollEnd');
   //                if (opts.callback && typeof opts.callback == 'function') {
   //                  opts.callback();

   //                }
   //                return;
   //              } else {
   //                _this.scrollTop(curTop + index * per);
   //              }
   //            };
   //          timer = window.setInterval(function() {
   //            smoothScroll(opts.toT);
   //          }, opts.delay);

   //          return _this;
   //        };
   
</script>
</specialColumn>