import { BackendApiFocus,BackendApiCancelFocus} from 'BackendApi';
<recommend-card>
      <div class="box_line {with_margin: opts.speclife.is_margin}">
		<a class="{geek-article:!opts.speclife.hack, geek-article-hack:opts.speclife.hack} a-lazy-upload" data-src="{opts.speclife.bg}" href="{ opts.speclife.url }" speclife={ opts.speclife }>
			<div class="geek-article-mask ">
			</div>
			<img class="finish-icon" src='/static/css/wap/sold_out2x.png' if={opts.speclife.finish}>
		</a>
	    <div class="daren" if={opts.speclife.is_show}>
	      <p>{opts.speclife.goods_name}</p>
        <!--      <img  class="photo" src="{opts.speclife.face}">
            <span class="name">2人团</span> -->
             <a href=" {opts.speclife.url} ">
	             <div class="focus btnfocus" onclick={optbutler}>
	                 <span>立即兑换</span>
	             </div>
             </a>
            <div class="price-box">
               <!-- <span class="price_before">￥</span> -->
               <span class="price">{opts.speclife.price}</span>
<!--                <span class="old-price">{opts.speclife.old_price}</span> -->
            </div>
    	</div> 
       </div> 
	<script>
		   this.mixin('util');
		   this.mixin('event');
	       let self=this;
	</script>
</recommend-card>
