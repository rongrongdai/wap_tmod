<article-list>
	<section  id="article" class="article-list">
	<div class="con_tit" if="{ opts.articlelist.length!=0}">TA推荐的文章</div>
		<a class="geek-article" each="{ opts.articlelist}" href="{ speclife.url }">
		     <div class="article-con">
				<div class="article-bg">
				     <img src="{ speclife.bg }">
				 </div>
				<div class="article-mask">
				<yield/>
					<div class="article-info">
		                        	    <p><img class="show-logo" src="{speclife.logo }" if="{ speclife.logo }"></p> 
					    <p class="geek-show-solgan">{ speclife.desc}</p>
				                <p><span class="geek-show-tip">[&nbsp;</span><span class="geek-show-tip geek-show-tip-text">{ speclife.identity }</span><span class="geek-show-tip">&nbsp;]</span></p> 
				             </div>
				</div>
		     </div>
		</a>
	</section>
	<p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p> 
	<script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	let self = this;
	  	this.on('update',()=>{
				let self = this;
				if(self.getOptConList()){
				    self.opts.articlelist=self.opts.articlelist.concat(self.getOptConList());	
				}
				// this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
			});

	  </script>
</article-list>