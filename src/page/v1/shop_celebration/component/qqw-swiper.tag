<qqw-swiper>
	<header class="swiper-container qqw-banner" style="margin:0px;background-color:#F6F7F1">
		<div id="{ opts.selectorid }" class="swiper-wrapper" if={ opts.banner }>
			<a class="swiper-slide qqw-op-bg" each="{ opts.banner }" href="{ url }"></a>
		</div>
		<div id="{ opts.selectorid }" class="swiper-wrapper" if={ opts.recommened }>
			<a class="swiper-slide qqw-recommened-bg" each="{ opts.recommened }" href="{ url }">
				<div class="qqw-recommended-mask">
					<span class="qqw-recommened-title">{ title }</span>
					<p class="qqw-recommened-column">{ column }</p>
				</div>
			</a>
		</div>
		<!-- <div id="{ opts.selectorid }" class="swiper-wrapper" if={ opts.crowfunding }>
			<a class="swiper-slide swiper-slide-crowfunding qqw-op-bg" each="{ opts.crowfunding }" href="{ url }">
				<div class="for-click-cf" data-url="{ url }" if="{!more}" >
					<p class="swiper-crowfunding-announce"> -->
						<!-- <aside class="swiper-crowfunding-progress"><span></span></aside> -->
						<!-- <progress class="swiper-crowfunding-progress swiper-crowfunding-progress-animated" value="{ percentage }" max="100"></progress>
						<span class="swiper-crowfunding-progress-num text-right">{ percent }</span>
					</p>
					<p class="swiper-crowfunding-announce swiper-crowfunding-flex">
						<span class="swiper-crowfunding-announce-item text-left">{ price }</span>
						<span class="swiper-crowfunding-announce-item text-center">{ num }</span>
				<span class="swiper-crowfunding-announce-item text-right swiper-crowfunding-announce-item--fix">{ leftday }</span>
					</p>
					<p class="swiper-crowfunding-title">{ name }</p>
				</div>
				<div class="swiper-slide-crowfunding-more" if="{more}">
					{ more }
				</div>
			</a>
		</div> -->
		<div id="{ opts.selectorid }" data-url="{ url }" class="swiper-wrapper" if={ opts.brand }>
			<a class="swiper-slide swiper-slide-brand qqw-op-bg" each="{ opts.brand }" href="{ url }">
	<!-- 			<div if="{!more}">
				    <div class="picbox">
				           <div class="swiper-slide-brand-img a-lazy-upload " style="border-radius:{radiusValue}"  data-src='{pic}'></div>
				    </div>
					<p class="swiper-brand-label">{ name }</p>
					<span class="swiper-brand-tip">{ price }</span>
				</div> -->
                <div class="img-box" style=" background:url({pic})center center no-repeat">
                	<input class="common-card"  type="radio" data-index={index} data-id={id} name='card' checked="checked" >   
                </div>
				
	<!-- 			<div class="swiper-slide-brand-more" if="{more && showStyle ==1}">
					<span class="swiper-slide-brand-more-text">{ more }</span>
				</div>
				<div class="swiper-slide-brand-more" style="border-radius: 50%;"  if="{more && showStyle ==2}">
					<span class="swiper-slide-brand-more-text">{ more }</span>
				</div> -->
			</a>
		</div>
		<!-- Add Pagination -->
		<div class="swiper-pagination"></div>
  </header>

	<script>
		this.mixin('util');
		this.showStyles = [];
		this.bgStyles = [];
		// console.log('clean bgStyles');
		let self = this;
		// this.one('update',()=>{
		// 	self.radiusValue= opts.brand[0].showStyle ==2 ? '50%':'0';
		// })
		this.one('updated', () => {
			// if (this.opts.banner) {
			// 	this.$q('.qqw-banner')[0].className += ' qqw-banner-top';
			// }
			// let $selector = this.opts.selectorid ? ('#' + (this.opts.selectorid || '') + ' .qqw-op-bg') : ' .qqw-op-bg';
			// // console.log('$selector:'+$selector);
			// // 添加图片 src 或 background-image 样式
			// if (this.opts.brand) {
   //              for (var idx = 0, size = this.opts.brand.length; idx < size; idx++) {
			// 		this.showStyles.push(this.opts.brand[idx].showStyle);
			// 		this.bgStyles.push(this.opts.brand[idx].pic);
			// 	}	
		 //       let $img=self.root.getElementsByClassName('swiper-slide-brand-img');		
			// 	this.each($img, function(el, idx) {
			// 		if (el.nodeName === 'IMG') {
			// 			el.src = self.bgStyles[idx];
			// 			// console.log('el.src:'+el.src);
			// 			if (self.showStyles[idx] === '2') {
			// 				el.style.borderRadius = '50%';
			// 			}
			// 		}
			// 	});
			// } else {
			// 	this.each( this.$q($selector), function(el, idx) {
			// 		el.style.background = self.bgStyles[idx];
			// 	});
			// }
			let swiperOption = {
				// autoplay: 4000,
		    loop: this.opts.banner ? true : false,
		    touchRatio: 1,
    		observer: true,
    		freeMode: true,
		    pagination: this.opts.banner ? '.swiper-pagination' : ''
		  };
		  if (this.opts.brand) {
		  	swiperOption.slidesPerView = 'auto';
		  } else if (this.opts.crowfunding) {
		  	swiperOption.slidesPerView = 'auto';
		  	// swiperOption.width = this.$q('.swiper-slide-crowfunding')[0].clientWidth;
		  }
			new Swiper ('.qqw-banner', swiperOption);
			// var qqwOpSwiper = new window.Swiper ('.qqw-banner', swiperOption);

		});
		// this.update();
	</script>

</qqw-swiper>