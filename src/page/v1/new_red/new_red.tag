import '../component/card/goods-list.tag';
import { BackendApinewGift, BackendApinewGiftGoods } from 'BackendApi';		// 后台api接口文件
<newred>
	
	<header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>新人有礼</div>
        <div class="top_as"></div>
    </header>
    
    <div class="new_banner">
		<a href="{opts.banner}"><img src="/static/css/product_funding/funding/app_img/img_banner02.png" /></a>
    </div>	
	
	<div class="new_coupon">
		<div class="coupon_list" each={items}>
			<img src="/static/css/product_funding/funding/app_img/img_cupon.png" />
		</div>
	</div>
	
	<button class="new_btn" onclick="{immediateUse}" id="new_red" name="new_red">立即使用</button>	
	<!--<a name="new_red" id="new_red">立即使用</a>-->	
	
	<div class="new_red_content">
		<h3>全球蛙新人礼活动规则</h3>	
		<div>
			<p>	1、活动时间：2017.04.26—2017.05.31 </p>
			<p>	2、活动内容：在活动期间凡注册全球蛙微商城或APP的用户， 
	                                    均可获得50元新人券礼包，可在全球蛙新人礼专
	                                    题专区使用。</p>
			<p>	3、活动规则：在本专区任意下单立减10元，全场满99元包邮。
	                                    每单仅限使用一张10元优惠券。</p>
			<p>	4、退货流程：拨打平台客服电话：400-6516-838联系退货。</p>
			<p>	5、退货条件：商品包装未拆封，不影响二次销售的情况下即
	                                    可退货。</p>
			<p class="last">	6、退货邮费：因产品质量问题所造成的退货，平台承担邮费；</p>
		</div>
	</div>	
	
	<div class="red_gray_bg"></div>
	
	<div class="discount" id="discount">
		<div class="discount_title">
			<span class="fl"></span>
			<h3 class="fl">最优惠的都在这</h3>
			<span class="fl"></span>
		</div>	
		<goods-list class="goodslist" goodslist="{ opts.goodslist }"></goods-list>
	</div>	
	
	<script>
		let self = this;
		this.mixin('util');
		this.on('update', () => {
			let self = this;
			self.items = [1, 2, 3, 4, 5];
		});
		
		// 检测获取券
		this.immediateUse = function() {
			// 滚动到  最优惠
			document.getElementById("discount").scrollIntoView();
			window.scrollBy(0, -114);
		}
		
		// 获取最优惠
		this.ajaxData('get', BackendApinewGiftGoods, null, (data) => {
			self.opts.banner = data.banner;
			var d = getNewRed(data.list);
			self.opts.goodslist = d.slice(0, 10);
			this.update();
		});
		
		
		/**
		 * 模板 -- 数据字典映射
		 * @param { Array } data
		 * @return { Array }
		 */
		function getNewRed(data) {
			if (!data) return ;
			let result = [];
			for (var i=0; i<data.length; ++i) {
				var reflectData = {};
				reflectData.Product = {
					pic: data[i].goods_thumb,
					goodsname: data[i].goods_name,
					price: data[i].market_price,
					url: '/app-goods/detail?id=' + data[i].goods_id
				};
				if (i === 9) {
					reflectData.Product = {
						pic: '/static/css/wap/img/bg_more_large2x.png',
						url: '/mobile-anniversary/newGoodsAll'
					}
				}
				result.push(reflectData);
			}
			return result;
		}
		
	</script>	
	
</newred>