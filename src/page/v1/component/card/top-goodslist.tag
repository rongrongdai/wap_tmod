<goods-list>
	<section class="goods-list-layout newgoods-list  goods-list" id="goods">
		<a class="{ goods-list-container: true, goods-list-container--fix: odd }" each="{ opts.goodslist }" href="{ Product.url }">
			<div class="goods-list-container-bg">
				<img class="goods-face" src="{ Product.pic }"></img>
			</div>
			<div class="goodsinfo">
				<p class="card-goodsname">{ Product.goodsname }</p>
				<p class="goods-item-user">
					{ Product.goods_brief }
				</p>
				<p class="goods-price">{ Product.price }</p>
			</div>
			
		</a>
	</section>
	<script>
		this.mixin('util');
		let self =this; 
		this.on('update', () => {
         	  	 	 if(self.opts.userb){
         	  	 	    this.goods.className = this.stateStore.subpageId === 'b' ? 'goods-list' : 'hidden';
         	  	 	 }
		});
	</script>
</goods-list>