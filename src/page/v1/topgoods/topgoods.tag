import '../component/qqw-swiper/qqw-swiper.tag';
import '../component/card/recommend-card.tag';
import './qqw-active-good-goods.tag';
<hotgoods style='top: 0 ; position: relative;'>
    <div class='baby-head' if={opts.head.type == 'baby'} >
        <!-- <div class="banner" >
        	<a class="goShop"    href ='/app-special/baby'></a>
        	<a class="goBooking" href='/mobile-group/index'></a>
        </div>
        <img class="title" src='/static/css/wap/img/active/baby-title.png'>
        <div class="goodslist">
        <qqwgood-goods type='{opts.head.type}' goodList={opts.head.goodList}></qqwgood-goods>
        </div> -->
        <div class="mmbb_head">
            <a class="mm_upper" href="http://m.quanqiuwa.com/app-goods/detail?id=3889"></a>
            <a class="mm_midder" href="http://m.quanqiuwa.com/app-goods/detail?id=3944"></a>
            <a class="mm_lower-middle" href="http://m.quanqiuwa.com/app-page/detail?pageid=10"></a>
            <a class="mm_lower" href="http://m.quanqiuwa.com/app-page/detail?pageid=7"></a>
        </div>
    </div>

    
    <div class='home-head' if={opts.head.type == 'home'} >
        <div class="banner">
        </div>
         <a href='http://m.quanqiuwa.com/app-goods/detail?id=2789'>
               <img class="goods" src='/static/css/wap/img/active/home-goods0.png'>
         </a>
        <img class="title" src='/static/css/wap/img/active/home-title.png'>
        <div class="goodslist">
        <qqwgood-goods type='{opts.head.type}' goodList={opts.head.goodList}></qqwgood-goods>
        </div>
    </div>

    <div class='specialty-head' if={opts.head.type == 'specialty'} >  
        <div class="banner"> </div>
        <div class="goodslist">
        <qqwgood-goods type='{opts.head.type}' goodList={opts.head.goodList}></qqwgood-goods>
        </div>
    </div>


    <div id="brandRecommend" each="{value,index in opts.brandArr}">
       <recommend-card speclife="{ value.speclife }">
      <!-- <button-like></button-like>-->
       </recommend-card>
       <qqw-swiper selectorid={ value.brandid } brand={ value.brand }></qqw-swiper>
    </div> 
    <p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p> 
  	  <script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	console.log('opts.banner:'+opts.banner);
	  	let self = this;
			this.on('update',()=>{
				let self = this;
				if(self.getOptTopgoodsList()){
				    self.opts.brandArr=self.opts.brandArr.concat(self.getOptTopgoodsList());	
				}
				// this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
			});
	  </script>	
</hotgoods>