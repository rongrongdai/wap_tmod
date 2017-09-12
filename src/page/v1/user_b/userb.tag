import '../component/card/goods-list.tag';
import '../component/card/info-b.tag';
import '../component/card/article-list.tag';
<userb  style='top: 0 ; position: relative;'>
	<info-b></info-b>
  	<goods-list  goodslist="{ opts.goodslist }"></goods-list>
	<article-list  article-list="{ opts.article-list }"></article-list>
  	  <script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	let self = this;
			this.on('update',()=>{
				this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
			});
	  </script>	
</userb>