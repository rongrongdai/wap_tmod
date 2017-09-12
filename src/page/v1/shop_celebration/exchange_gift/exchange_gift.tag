
import '../component/exchange-goods-list.tag';
<women-first>
    <div class="head">
        <div>
	        <div class="goodslist-box" each={opts.brandArr}>
		        <div id={speclife.id}  class="title dom_location">
		         <span>{speclife.title}</span>
		        </div>
		        <div class="type-banner">
		             <img src="http://7xp9qs.com1.z0.glb.clouddn.com/580747ac23b77.jpg">
		        </div>
		        <goods-list class="goodslist" goodslist = {brand}></goods-list>
	        </div>
        </div>
    </div>
    <div class="return_head" id='rtt'  onclick={jumptop}></div>
    </div>
  	  <script>
  	     this.mixin('util');
  	     this.mixin('event');
	  	let self = this;
	
	self.jumptop = function(event) {
           window.scrollTo(1,0);
  };
	  </script>	
</women-first>