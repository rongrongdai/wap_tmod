<qqw-card>
	<section class="qqw-card-layout" id="qqwCardSection">
		<a class="{ card-item-container: true, card-item-container--fix: odd }" each="{ opts.column }" href="{ url }">
			<p class="card-item-container-bg"></p>
			<span class="card-item-face-container">
			</span>
			<img class="card-item-face" src="{ face }"></img>
			<p class="card-item-name">{ name }</p>
			<p class="card-item-title">{ title }</p>
			<p class="card-item-subtitle">{ subtitle }</p>
			<p class="card-item-tip">{ tip }</p>
		</a>
	</section>
	<script>
		let self =this;
		this.update();
	</script>
</qqw-card>