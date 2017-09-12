import { BackendApiLike, BackendApiUnLike } from 'BackendApi';
<button-like>
	<button class="button-like" onclick={ likeClick }>
		<img class="button-like-sign button-like-sign--active" src="/static/css/product_funding/funding/app_img/icon_like@2x.png" if="{ opts.speclife.islove === '1' }" data-loveid="{ opts.speclife.id }" data-lovenum="{ opts.speclife.lovenum }">
		<img class="button-like-sign" src="/static/css/product_funding/funding/app_img/icon_unlike@2x.png" if="{ opts.speclife.islove === '0' }" data-loveid="{ opts.speclife.id }" data-lovenum="{ opts.speclife.lovenum }">
		<span class="button-like-text">{ opts.speclife.lovenum }</span>
	</button>

	<script>
	// 引入 mixin
	this.mixin('util');
	this.mixin('event');
	let self = this;
	this.likeClick = function(event) {
		event.stopPropagation();
                        event.preventDefault();
	  self.ajaxData('get', '/butler-article/islogin', null, function(data){
			event = self.getEvent(event);
			let target = self.getTarget(event);
			let parentEle;
			let firstChild;
			let lastChild;
			parentEle = target;
			if (target.nodeName !== 'BUTTON') {
				parentEle = target.parentElement;
			}
			firstChild = parentEle.firstElementChild;
			lastChild = parentEle.lastElementChild;
			if (firstChild.classList.contains("button-like-sign--active")) {
				self.trigger('like', { isLike: false, firstChild: firstChild, lastChild: lastChild});
			} else {
				self.trigger('like', { isLike: true, firstChild: firstChild, lastChild: lastChild});
			}
			return ;
		});
		console.log(event);
	};
	// 监听 like
	this.on('like', (likeObj) => {
		if (likeObj.isLike) {
			self.ajaxData('get', BackendApiLike, { id: likeObj.firstChild.dataset.loveid }, function(data){
				if (data.stat === 0) {
					let curNum = parseInt(likeObj.firstChild.dataset.lovenum, 10);
					let lovenum = curNum - 1;
					likeObj.lastChild.innerHTML = lovenum;
					likeObj.firstChild.dataset.lovenum = lovenum;
					likeObj.firstChild.className = 'button-like-sign';
					likeObj.firstChild.src = '/static/css/product_funding/funding/app_img/icon_unlike@2x.png';
					console.log('点赞失败');
				}
			});
			let lovenum = parseInt(likeObj.firstChild.dataset.lovenum, 10) + 1;
			likeObj.lastChild.innerHTML = lovenum;
			likeObj.firstChild.dataset.lovenum = lovenum;
			likeObj.firstChild.className += ' button-like-sign--active';
			likeObj.firstChild.src = '/static/css/product_funding/funding/app_img/icon_like@2x.png';
		} else {
			self.ajaxData('get', BackendApiUnLike, { id: likeObj.firstChild.dataset.loveid }, function(data){
				if (data.stat === 1) {
					let lovenum = parseInt(likeObj.firstChild.dataset.lovenum, 10) + 1;
					likeObj.lastChild.innerHTML = lovenum;
					likeObj.firstChild.dataset.lovenum = lovenum;
					likeObj.firstChild.className += ' button-like-sign--active';
					likeObj.firstChild.src = '/static/css/product_funding/funding/app_img/icon_like@2x.png';
					console.log('取消点赞失败');
				}
			});
			let curNum = parseInt(likeObj.firstChild.dataset.lovenum, 10) || 1;
			let lovenum = curNum - 1;
			likeObj.lastChild.innerHTML = lovenum;
			likeObj.firstChild.dataset.lovenum = lovenum;
			likeObj.firstChild.className = 'button-like-sign';
			likeObj.firstChild.src = '/static/css/product_funding/funding/app_img/icon_unlike@2x.png';
		};
	});

	window.refreshLikeE = function (articleIds) {
		if(!articleIds){
			return;
		}
		let articleIdArr = articleIds.split(',');
		let $btnLikes = self.$q('.button-like');

		let curNum, lovenum, likeSrc, $iconLike;
	  for (let i = 0, size = articleIdArr.length; i < size; ++i) {
		 	self.each($btnLikes, (el, idx) => {
		 		$iconLike = $btnLikes[idx].childNodes[3];
		 		if ($iconLike.nodeName !== 'IMG') {
		 			$iconLike = $btnLikes[idx].childNodes[1];
		 		}
			 	if ($iconLike.dataset.loveid === articleIdArr[i]) {
					likeSrc = $iconLike.src;
					if (likeSrc.indexOf('icon_like') !=-1 ) {	// 已点赞状态
						curNum = parseInt($iconLike.dataset.lovenum, 10) || 1;
						lovenum = curNum - 1;
						$btnLikes[idx].childNodes[5].innerHTML = lovenum;
						$iconLike.dataset.lovenum = lovenum;
						$iconLike.className = 'button-like-sign';
						$iconLike.src = '/static/css/product_funding/funding/app_img/icon_unlike@2x.png';
					} else {
						lovenum = parseInt($iconLike.dataset.lovenum, 10) + 1;
						$btnLikes[idx].childNodes[5].innerHTML = lovenum;
						$iconLike.dataset.lovenum = lovenum;
						$iconLike.className = 'button-like-sign button-like-sign--active';
						$iconLike.src = '/static/css/product_funding/funding/app_img/icon_like@2x.png';
					}
				}
			})
		}
	};
	</script>
</button-like>