import '../component/qqw-swiper.tag';
import '../component/recommend-card.tag';
import '../component/message-choose-type.tag';
import '../component/qqw-shop-sub-head.tag';
import '../component/exchange-goods-list.tag';
<homepage>
  <div style="background-color: white">
    <div id="brandRecommend">
<!--       <recommend-card speclife="{opts.user.head}"></recommend-card> -->
<!--       <qqw-swiper  brand={opts.user.cardList }></qqw-swiper>
      <div class="qqw-hompage-float-bar"> -->
      <!-- <recommend-card speclife="{opts.user.head}"></recommend-card> -->
<!--        <input class="mark-card" type="radio" checked=true data-index = 0  data-id ={opts.user.markCard.id} name='card' style="background-image: url({opts.user.markCard.pic})">      --> 
      <!-- <input class="mark-card" data-id={opts.markCard.id} name='card' style="background-image: url({opts.markCard.pic})"> -->
<!--       <div class="head_fix" >
              <div class="head_cto left" onclick={buyAtonce}>
                 犒劳自己
              </div>

              <div class="head_cto right" onclick={giveOther}>
                 转赠他人
              </div>   
       </div> -->
      </div>
    </div> 
    <!-- <div class="margin-line"></div> -->
<!--     <h2 class="homepage-headline" >
         <a class="homepage-headline-title" ><span class="line">- </span>积分兑礼<span class="line"> -</span></a>
    </h2> -->
     <a><img class="women_day_title" src='/static/css/wap/img/cardtit.png'></img></a>
    <div class="fix-box-homepage">
      <qqw-shop-sub-head class='z_index' categoryArr={opts.mainMessage.categoryArr}  colorlist={opts.mainMessage.colorList}></qqw-shop-sub-head>
    </div>
    <div class="head">
        <div>
          <div class="goodslist-box" each={opts.brandArr}>
<!--             <div id={speclife.id}  class="title dom_location">
             <span>{speclife.title}</span>
            </div> -->
            <div class="type-banner dom_location" id={speclife.id}>
                 <img src="{speclife.bg}">
            </div>
<!--             <goods-list class="goodslist" goodslist = {brand}></goods-list> -->
             <div each={value,index in brand}>
                <recommend-card speclife="{value}"></recommend-card>
             </div>

          </div>
        </div>
    </div>
  <div class="return_head" id='rtt'  onclick={jumptop}></div>
  </div>
  <message-choose-type></message-choose-type>
  <script>
    // 引入 mixin
    this.mixin('util');
    this.mixin('event');
    let self=this;
  //点击回到顶部
    self.jumptop = function(event) {
          window.scrollTo(1,0);
    };
    // this.on('update', () => {
    //      let self = this;
    //      if(self.getOptArticleList()){
    //     self.opts.brandArr=self.opts.brandArr.concat(self.getOptArticleList());
    //      }
    //   });

    this.giveOther=function(event){
        var index=$("input[name='card']:checked").data('index');
        var id=$("input[name='card']:checked").data('id').toString();
        if(isWeiXin()){
          window.location.href='/mobile-user-card/confirmOrder?id='+id;
          return;
        }
        self.GlobleToNative.toPay(id,2);
    }

    this.buyAtonce=function(event){
        var index=$("input[name='card']:checked").data('index');
        var id=$("input[name='card']:checked").data('id').toString();
        if(isWeiXin()){
              var cardMessage={};
              if(index==0){
                 cardMessage=opts.user.markCard;
              }else{
                 cardMessage=opts.user.cardList[index-1];
              }
              this.tags['message-choose-type'].opts=cardMessage;
              this.tags['message-choose-type'].update();
              $('.maskbox').show();
              return;
         }
              self.GlobleToNative.toPay(id,1);

    }
    this.on('mount',()=>{    
         console.log('12233');

    })
    this.on('change-sub-head',(object)=>{
           self.opts.mainMessage.categoryArr=object;
           self.update();
             this.tags['qqw-shop-sub-head'].trigger('change-categoryArr');
        });
    this.on('switch_sub_change_state',(object)=>{
             this.tags['qqw-shop-sub-head'].trigger('switch_change_state',object);  
        });
    this.on('updated',()=>{
      this.tags['qqw-shop-sub-head'].on('switch_change',(object)=>{
        object.index;
        document.getElementsByClassName('dom_location')[object.index].scrollIntoView();
        scrollBy(0,-300);
      });
    })

    function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    }

  </script>
</homepage>