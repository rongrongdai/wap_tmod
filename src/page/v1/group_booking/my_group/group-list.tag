<group-list>
	<section class="card-list">
		<!-- 送朋友的卡 -->
		<div class="cardlist" each="{ opts.grouplist }">
			<a class="cardcon"  href="{ groupinfo.goodsurl }">
				<div class="goodsphoto fl">
					<img src="{ groupinfo.picture }">
				</div>
				<div class="instructions fr">
					<p class="goodsname">{ groupinfo.goods_name }</p>	
					<p>
						<span class="fl allnum">{ groupinfo.all_num }人团</span>
						<span class="fl price">￥{ groupinfo.price }</span>
						<span class="fr price joinnum">已有{ groupinfo.has_num }人参团</span>
						
					</p>	
				</div>
		             </a>
		             <div class="card_state">
		                       <a class="fr  btn orderdetail"  href="{ groupinfo.orderurl }">查看订单详情</a>
		             	<a class="fr btn groupdetail"  href="{ groupinfo.groupurl }">查看团详情</a>
				
		             </div>
		</div>
		<div class=" remind">
			<p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p> 
		</div>
	</section>
	<script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	let self = this;
	  	this.on('update',()=>{
				let self = this;
				if(self.getOptGroupList()){
				    self.opts.grouplist=self.opts.grouplist.concat(self.getOptGroupList());	
				}
			});
	  </script>
</group-list>