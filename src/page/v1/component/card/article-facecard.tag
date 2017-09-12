<article-facecard>
	<section class="qqw-article-facecard-layout">
		<a class="{ article-facecard-item-container: true, article-facecard-item-container--fix: odd }" each="{ opts.column }" href="{ speclife.url }">
			 <div class="article-facecard-item">
				<div class="article-facecard-bg">{ speclife.images }</div>
				<div class="article-facecard-mask">
	            <yield/>
					<div class="item-info">
						<img class="article-facecard-item-logo" src="{speclife.logo}" if="{ speclife.logo }">
	                    <p class="tit">{ speclife.desc }</p>
	                  </div>
	        </div>
				</div>
	    </div>
			<h4 class="aticle-facecard-desc">{speclife.identity}</h4>
		</a>
	</section>
</article-facecard>