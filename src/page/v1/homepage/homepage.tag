import '../component/qqw-swiper/qqw-swiper.tag';
import './navitem.tag';
import '../component/card/recommend-card.tag';
import '../component/Public-head/qqw-hompage-float-bar.tag';
import '../component/Public-head/qqw-hompage-women-day-icon-enter.tag';
import '../component/Public-head/qqw-commen-picture.tag';
<!-- import '../component/card/topic-item.tag'; -->
<!-- import '../component/card/qqw-card.tag'; -->
<!-- import '../component/button/button-like.tag'; -->
import { BackendApiLike, BackendApiUnLike } from 'BackendApi';
<!-- import '../component/Public-head/qqw-head.tag'; -->

<homepage>
  <div>
     <!-- <a href="{opts.url}"><img class="women_day_title" src='/static/css/wap/img/active@2x.png'></img></a> -->
    <qqw-hompage-women-day-icon-enter list={opts.categoryArr}></qqw-hompage-women-day-icon-enter>
<!--     <h2 class="homepage-headline" id='scrollHereId3'>
        <a class="homepage-headline-title"  href="{opts.url}"> <span class="line">- </span><span class='content'>爆款推荐</span><span class="line"> -</span></a>
    </h2> -->

    <a><img class="women_day_title" src='/static/css/wap/img/active@2x.png?v=1.0'></img></a>
    <qqwpicture list='{opts.niceGoodList}'></qqwpicture>
    <qqw-hompage-float-bar catid={opts.cat_id}></qqw-hompage-float-bar>

    <div each={value,index in opts.categoryArr}>
      <navitem param={value}></navitem>
    </div>
<!--     <h2 class="homepage-headline" id='scrollHereId3'>
        <a class="homepage-headline-title"  href="{opts.url}">- 3.8曜变专场 -</a>
    </h2>
    <div each="{value,index in opts.activeArr}">
      <recommend-card speclife="{value}"></recommend-card>
    </div>
    <h2 class="homepage-headline" id='scrollHereId3'>
        <a class="homepage-headline-title"  href="{opts.categoryArr[0].url}">- 热销品类专场 -</a>
    </h2>
    <div each="{value,index in opts.categoryArr}">
       <recommend-card speclife="{value}"></recommend-card>
    </div> -->
    <div id="brandRecommend" each="{value,index in opts.brandArr}">
      <recommend-card speclife="{ value.speclife }">
      <!-- <button-like></button-like>-->
      </recommend-card>
      <qqw-swiper selectorid={ value.brandid } brand={ value.brand }></qqw-swiper>
    </div> 

    <!--点击返回顶部-->
    <div class="return_head" id='rtt'  onclick={jumptop}></div>
   </div>


  <script>
    // 引入 mixin
    this.mixin('util');
    this.mixin('event');
    let self=this;
    // let firstEnable =true;
    this.clickPurchase = (event) => {
      Global.sendToDoyen('1', '产品体验官');   // hardcode
    }
    this.clickDoyen = (event) => {
      event = this.getEvent(event);
      let target = this.getTarget(event);
      Global.sendToDoyen(target.dataset.id, '达人推荐');
    }
    // this.one('update',()=>{
    //   self.opts.categoryArr.splice(0,1);
    // });

  //点击回到顶部
    self.jumptop = function(event) {
          window.scrollTo(1,0);
    };
    this.on('update', () => {
         let self = this;
         if(self.getOptArticleList()){
          console.log(self.getOptArticleList().toString());
        self.opts.brandArr=self.opts.brandArr.concat(self.getOptArticleList());
         }
      });
    this.on('mount',()=>{
         let navitemInstances= this.tags['navitem'];
         let length=navitemInstances.length;
         for(let k =0;k<length;k++){
              navitemInstances[k].on('startNextGetData',(object)=>{
                  if(object.index==length-1){
                     this.trigger('startGetGoodsList');
                     return;
                  }
                  navitemInstances[object.index+1].trigger('startGetData');
         })
        }       
     
    })
  </script>
</homepage>