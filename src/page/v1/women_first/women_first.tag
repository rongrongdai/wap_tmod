
import '../component/women-day/qqw-women-head.tag';
import '../component/women-day/qqw-women-sub-head.tag';
import '../component/women-day/qqw-women-good-goods.tag';
import '../component/card/special-goods-list.tag';
<women-first>
    <div class="head">
        <div>
	        <div class="title_main">
		       <!--   <span>{opts.mainMessage.title}</span> -->
		    </div>
	        <qqwgood-goods imgList={opts.mainMessage.head_goods_list}  url={opts.mainMessage.url}  goodsBg={opts.mainMessage.goodsBg}></qqwgood-goods>
	        <div class="goodslist-box" each={opts.brandArr}>
		        <div id={speclife.id}  class="title dom_location">
		         <span>{speclife.title}</span>
		        </div>
		        <goods-list class="goodslist" goodslist = {brand}></goods-list>
	        </div>
        </div>
    </div>
    <div class="return_head" id='rtt'  onclick={jumptop}></div>
    </div>
  	  <script>
  	     this.mixin('util');
	  	let self = this;
	
	self.jumptop = function(event) {
           window.scrollTo(1,0);
  };
	  </script>	
</women-first>