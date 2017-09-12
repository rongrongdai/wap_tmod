<goods-list>
	<section class="goods-list-layout newgoods-list  goods-list {goods-list-bg-color:from_homepage}" id="goods">
		<a class="{ goods-list-container: true, goods-list-container--fix: odd }" each="{ opts.goodslist }" href="{ url }">
		    <img src='/static/css/wap/img/bg_more_large2x.png' class="goods-brand-more"   if="{more}">
			<div if='{!more}'>
				<div class="goods-list-container-bg">
					<img class="goods-face  img-lazy-upload" data-src='{pic}'></img>
				</div>
			    <div>
					<p class="card-goodsname">{goodsname }</p>
					<p class="goods-price goods-price-hack">{ price }</p>
				    <div class="btn-exchange" onclick="{exchangAtOnce}">立即兑换</div>
				</div>
		
			</div>

		</a>
	</section>
	<script>
		this.mixin('util');
		this.mixin('event');
		let self =this; 
		this.on('update', () => {
 	  	 	 if(self.opts.userb){
 	  	 	    this.goods.className = this.stateStore.subpageId === 'b' ? 'goods-list' : 'hidden';
 	  	 	 }
 	  	 	 if(opts.goodslist[0].from_homepage){
 	  	 	 	self.from_homepage=true;
 	  	 	 }
		});

		this.exchangAtOnce=function(e){
             this.preventDefault(event);
	         this.stopPropagation(event);
	         console.log('6778789');
		}
	</script>
</goods-list>