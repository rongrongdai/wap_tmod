import '../component/card/qqw-card.tag';

<discoverysubpage>
	<section class="discovery-subpage" id="discoverySubpage">
		<div each={ opts.subs }>
			<p onclick="{ parent.checkmore }"><span class="discovery-sub-title">{ title }</span><span class="discovery-sub-action pull-right--fix">查看全部</span></p>
			<qqw-card id="{ id }" column="{ column }"></qqw-card>
		</div>
	</section>
	<script>
		this.mixin('util');
		let self = this;
		this.on('mount', () => {
			let pics = [];
			Array.from(this.opts.subs).map((sub) => {
				Array.from(sub.column).map((item) => {
					pics.push(item.pic);
				});
			});
			this.each( this.$q('.card-item-container-bg'), (el, idx) => {
				el.style.background = 'transparent url(' + pics[idx] + ') center center / cover no-repeat';
			});
		});
		this.checkmore = function(event) {
			// looped item
    	let item = event.item;
    	console.log(item);
    	console.log(this);
    	// index on the collection
   	 	let index = this.parent.opts.subs.indexOf(item);
   	 	if (index === 0) {		// 采购
   	 		location.href = '/mobile-find/all?doyentype=1';
   	 	} else {		// 达人
   	 		location.href = '/mobile-find/all?doyentype=3';
   	 	}
		};
	</script>
</discoverysubpage>