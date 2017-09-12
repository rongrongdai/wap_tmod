import { BackendApiFocus,BackendApiCancelFocus} from 'BackendApi';
<recommend-card>
      <div class="box_line">
		<a class="{geek-article:!opts.speclife.hack, geek-article-hack:opts.speclife.hack} a-lazy-upload" data-src="{opts.speclife.bg}" href="{ opts.speclife.url }" speclife={ opts.speclife }>
			<div class="geek-article-mask ">
			</div>
			  <div class="finish-icon" if={opts.speclife.face && toastShow}><img  src='{opts.speclife.face}'><span class="name">{opts.speclife.user_name}</span></div>
		</a>                             
	    <div class="daren">
	      <p class="goods_name">{opts.speclife.goods_name}</p>
	      <p class="num">{opts.speclife.num}</p>
               <!-- <span class="price_before">￥{opts.speclife.price}</span> -->
               <span class="price">{opts.speclife.price}</span>
               <span class="old-price">{opts.speclife.old_price}</span>

          <!-- <img  class="photo" src="{opts.speclife.face}"> -->
         
            
	             <div class="focus btnfocus" onclick={optbutler}>
	                 <img src='/static/css/wap/img/booking/icon_person@2x.png'></img> 
	                 <span class="name">2人团</span>
	                 <a href=" {opts.speclife.url} ">
	                   <span class="btn_booking">马上拼团</span>
	                 </a>
	             </div>
           
    	</div> 
       </div> 
	<script>
		   this.mixin('util');
		   this.mixin('event');
	       let self=this;
	       self.toastShow=true;
	       setTimeout(()=>{
	       	self.update({toastShow:false});
	       },3000)
	</script>
</recommend-card>
