import '../component/card/goods-list.tag';
<hotgoods style='top: 0 ; position: relative;'>
<!-- <div class="iscrollPullDown" style="display: none" >
    <span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span>
  </div> -->
    <img class="goods-category-picture"  src="{opts.banner}">
  	<goods-list class="goodslist" goodslist="{ opts.goodslist }"></goods-list>
<!--   <div class="iscrollPullUp" style="display: none">
    <span class="pullUpIcon"></span><span class="pullUpLabel">上拉加载更多...</span>
  </div> -->
    <p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p> 
  	  <script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	console.log('opts.banner:'+opts.banner);
	  	let self = this;
			this.on('update',()=>{
				let self = this;
				if(self.getOptHotgoodsList()){
				    self.opts.goodslist=self.opts.goodslist.concat(self.getOptHotgoodsList());	
				}
				// this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
			});
	  </script>	
</hotgoods>