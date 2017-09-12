import { QqwUtil } from '../../../../js/qqw_ultilities';
<refundChoose>
	       <div class="goodslist" data-order_sn="{ opts.order_sn }"> 
			<div class="goodcon" each="{ opts.goodslist }">
				<div class="checkbox fl checkid" data-good_id="{ Product.goodsid }"  data-good_num="{ Product.num}" onclick={prompt}>
				</div>
				<div class="goodinfo fl"> 
					<div class="goodsphoto fl">
						<img src="{ Product.pic }"></img>
					</div>	
					<div class="detail fl">
						<p class="goodsname">{ Product.goodsname }</p>
						<p class="guige">{ Product.goods_attr }</p>
						<div class="pricebox">
						      <p class='price fl'>{ Product.price }</p>
						      <p class='num fr'>×{ Product.num }</p>
						</div>
					</div>
				</div>
		             </div>
		</div> 
		<div class="fotbar" onclick={submitlink}>确定</div>
  	  <script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	let self = this;
	  	let flog=true;
		this.prompt = function(event) {
			if(flog==true){
				event.currentTarget.className="checked fl checkid";
				flog=false;
			}else if(flog==false){
				event.currentTarget.className="checkbox fl checkid";
				flog=true; 
			}
		};
		this.submitlink = function(event) {
			var goods_id=''
			 var totalNums = "";
			 var ordersn=$(".goodslist").data("order_sn");
			 var checkboxEl = $(".goodslist").find('.checkid');
			 if (checkboxEl.length < 1 ){
				 return;
			 }
			 for(var i = 0; i < checkboxEl.length; i++){
				 var goodsId = $(checkboxEl[i]).data("good_id");
				 var goods_num = $(checkboxEl[i]).data("good_num");
				 if($(checkboxEl[i]).hasClass("checked")){
					 if(goods_id==''){
						 goods_id=goodsId;
					 }else {
						 goods_id=goods_id+","+goodsId;
					 }
					 if(totalNums==''){
						 totalNums=goods_num;
					 }else {
						 totalNums=totalNums+","+goods_num;
					 }
				 }
			 }

			 if (checkboxEl.length < 1 ){
				 return;
			 }
			 if (totalNums <= 0){
				  QqwUtil.msg("请选择商品！",true);
				  return;
			 }else{
			 	window.location.href= '/mobile-user-order/refundApply?order_sn='+ordersn+"&goods_id="+goods_id+"&goods_num="+totalNums;
			 }
		};
	  </script>	
</refundChoose>