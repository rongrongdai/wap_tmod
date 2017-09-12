<message-choose-type>
        <div  class="mask maskbox" style="display: none" >
	        <div class="por_spec_goods" >
		        <div id="skuListDiv" class="context">
			        <div class="psp_conc psp_conc1">
			             <img class="goods_img" src="{opts.pic}" >
			                 <div class="font">
				                 <p>{opts.name}</p>
				                 <p>￥{opts.price}元面值</p>
			                 </div>
			             <img class="spec_rgImg" src="http://m.quanqiuwa.com/static/css/product_funding/funding/app_img/funding_close.png" onclick={close}>
			        </div>
		 
		            <div class="psp_conc psp_conc2">
	                    <p class="p1 din_p">可得积分：{opts.score}</p>
	                    <p class="p1">购买成功后凭领取码,可在美特好、蛙鲜生、妈妈宝贝、美都汇<a href='/mobile-user-card/address'>指定门店</a>领取,领取码在<a href='/mobile-user-card/index'>我的卡包</a>中查看</p> 
	                </div>    
		            <div class="psp_conc psp_conc3">
		                <div class="count"><span class="p1">数量</span></div>
		                <div class="con3_spe1">
		                    <p class="p2 reduce_add" onclick="{deleteCount}"><span>-</span></p>
		                    <p class="p2"><input class="ipnt" type="text" value="{count}"></p>
		                    <p class="p2 reduce_add" onclick="{addCount}"><span>+</span></p>
		                </div>
		            </div>
                    <div class='psp_conc psp_conc4' onclick={goPay}>
                          <p><span>支付方式</span></p>
                          <img src='/static/css/wap/img/图层-2@2x.png'>
                    </div> 

		        </div>
	        </div>
        </div>
        <script>
           this.count=1;
           this.mixin('util');
           let self=this;
           this.close = function(event) {
	           $('.mask').hide();
		   };
           this.goPay = function(event) {
           	   var param={};
           	   param.card_id=parseInt(self.opts.id, 10);
           	   param.goods_num=self.count;
           	   param.order_type=1;
	           self.ajaxOriginalData('post','/user-card/confirmOrder',param,(json)=>{
	           	        if(json.ret==0){
	           	        	self.ajaxOriginalData('post','/user-card/createOrder',{orderForm:JSON.stringify(json.data.orderForm)},(json)=>{
	           	        	  if(json.ret==0){
                               location.href = '/payment-pay/wechat?order_sn='+ json.data.order_sn + '&client=web&os=h5';   
                               }else{
                               	self.msg(json.msg);
                               	return;
                               }       
			              })
	           	        }else{
	           	        	self.msg(json.msg);
	           	        	return;
	           	        }
		
	           })
		   };

		   this.deleteCount = function(event) {
               if(self.count>1){
               	self.count--;
               	this.update({count:self.count});
               }
		   };
		   this.addCount = function(event) {
		   	    self.count++;
               	this.update({count:self.count});
		   };
        </script>
</message-choose-type>