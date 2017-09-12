<merchant-facecard>
	<section class="merchant-facecard-layout" id="merchantSection" onclick="{ collect }">
		<a class="merchant-facecard-item-container" each="{ opts.items }" href="{ url }" no-reorder>
			<p class="merchant-facecard-item-name"><span>{ name }</span></p>
			<span class="merchant-facecard-item-price">{ price }</span>
			<button class="pull-right--fix merchant-facecard-item-collect" data-id="{ id }">{ collectNum }</button>
		</a>
	</section>
</merchant-facecard>