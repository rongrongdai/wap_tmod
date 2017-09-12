<topic-item-card>
		<a each="{ opts.list }" href="{url}">
		   <div class="card-item-box">
			<img class="card-item-face" src="{ face }"></img>
			<p class="card-item-title">{ title }</p>
			<p class="card-item-name">{ topicName }</p>
		   </div> 
		   <div class="margin-line"></div>
		</a>
	<script>
		let self =this;
		this.update();
	</script>
</topic-item-card>