import '../component/card/qqw-simple-card.tag';

<brandsubpage>
	<section id="brand" class="brand-subpage">
		<qqw-simple-card id="{ id }" column="{ opts.column }"></qqw-simple-card>
	</section>
	<script>
		this.mixin('util');
		this.on('mount', () => {
			let pics = [];
			Array.from(opts.column).map((item) => {
				pics.push(item.pic);
			});
			this.each( this.$q('.simple-card-item-container-bg'), (el, idx) => {
				el.style.background = 'transparent url(' + pics[idx] + ') center center / cover no-repeat';
			});
		});
		this.on('update', () => {
			this.brand.className = this.stateStore.subpageId === 'b' ? 'brand-subpage' : 'hidden';
		});
	</script>
</brandsubpage>