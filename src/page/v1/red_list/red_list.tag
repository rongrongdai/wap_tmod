import '../component/card/goods-list.tag';
import { BackendApinewGiftGoods } from 'BackendApi';		// 后台api接口文件
<redlist>
	
	<header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>最优惠都在这</div>
        <div class="top_as"></div>
    </header>
    
	<goods-list class="goodslist" goodslist="{ opts.goodslist }"></goods-list>
	<script>
		let self = this;
		this.mixin('util');
		this.on('update', () => {
			let self = this;
			self.items = [1, 2, 3, 4, 5];
		});
		
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
				result.push(reflectData);
			}
			return result;
		}
		
	</script>	
	
</redlist>