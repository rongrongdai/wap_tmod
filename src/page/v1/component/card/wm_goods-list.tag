<goods-list>
	<section class="goods-list-layout newgoods-list  goods-list" id="goods">
		<!-- <div class="con_tit">TA推荐的商品</div> -->
		<a class="{ goods-list-container: true, goods-list-container--fix: odd }" each="{ opts.goodslist }" href="{ Product.url }">
			<div class="goods-list-container-bg">
				<img class="goods-face" src="{ Product.pic }"></img>
			</div>
			<p class="card-goodsname">{ Product.goodsname }</p>
			<p class="goods-item-user">
				<img class="user-face" src="{ Product.face }"></img>
			            <span class="user-name">{ Product.nickname }</span>
			</p>
			<p class="goods-price">{ Product.price }</p>
		</a>
	</section>
	<p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p>
	<script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	let self = this;

	  </script>
</goods-list>