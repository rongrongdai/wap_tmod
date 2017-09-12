<categorysubpage>
	<section id="category" class="category-subpage">
		<div data-subpageid='{ categorySubpageId }' class="" each={ opts.category }>
			<a class="dicovery-banner" href="{ url }"></a>
			<div class="discovery-item-container">
				<a class="discovery-item" each="{ children }" href="{ url }">{ name }</a>
			</div>
		</div>
	</section>

	<script>
		this.mixin('util');
		let self = this;
		this.on('mount', () => {
			this.each( this.$q('.dicovery-banner'), (el, idx) => {
				el.style.background = 'transparent url(' + self.opts.category[idx].pic + ') 0 0 / 100% 100% no-repeat';
			});
		});
		this.on('update', () => {
			this.category.className = this.stateStore.subpageId === 'a' ? 'category-subpage' : 'hidden';
		});
	</script>
</categorysubpage>