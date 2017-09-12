var tpl_userOrderConfirmDetail =
`
<input type="hidden" id="U-order-address-id" value="<%=data.address.address_id%>" />
<input type="hidden" id="U-order-s" value="<%=data.address.address_id%>" />
<input type="hidden" id="U-order-invite-id" value="{$data['goods']['invite_id']}" />
<div class="shippingAddress mt20 clickBtn boxStyle" id="U-selectAddress" data-form="{$data['form_data']}">
  <div class="name">
    <%=data.address.name%>
    <%=data.address.mobile%>
  </div>
  <div class="add">
    <%=data.address.province%>
    <%=data.address.city%>
    <%=data.address.district%>
    <%=data.address.details%>
  </div>
</div>
<div class="goodsList clickBtn boxStyle mt20">
  <dl class="list fl">
    <%if(data.orderForm.goodsList.length>4){ %>
    	<%for(var i=0;i<4;i++){%>
      <dd><img src="<%=data.orderForm.goodsList[i].goods_thumb%>" /></dd>
    <%}} else{for(var i=0;i<data.orderForm.goodsList.length;i++){%>
      <dd><img src="<%=data.orderForm.goodsList[i].goods_thumb%>" /></dd>
    <%}}%>
    <%if(data.type==2&&data.orderPayAmount>=128){%>
      <dd> <img src="http://7xp9qs.com1.z0.glb.clouddn.com/5798b6bcd7378.jpg" id="btn_more_gift" />赠品</dd>
    <%}%>
    <!--<div class="more"></div>-->
  </dl>
  <span class="fr number">共<%=data.goodsNumbers%>件</span>
</div>
<div class="feature clickBtn boxStyle mt20">
  <%if(data.type==1){%>
    <label class="title"><font color="#29c26b">配送(银行客户首单免邮)</font></label>
  <%}else{%>
    <label class="title"><font color="#29c26b">配送(全场满99包邮)</font></label>
  <%}%>
  <span class="fr number"><font color="#29c26b"><%=data.shippingFee%>元</font></span>
  <!--<a class="expressWay"  >
    <span class="fl">管家配送</span>
    <u class="fr cGreen">绑定管家</u>
  </a>-->
</div>
<!--<div class="feature clickBtn boxStyle mt20">
  <label class="title">发票信息</label>
  <span class="fr number">个人</span>
</div>-->
<div class="textForm boxStyle mt20">
  <label class="title fl">给商家留言</label>
  <textarea placeholder="选填，45字以内" id=""></textarea>
</div>
<div class="feature clickBtn boxStyle mt20" id="U-orderCoupon">
  <label class="title">优惠券<em><%if(data.couponList.length > 0){%>有可用<%}else{%>无可用<%}%></em></label>
  <span style="color:red;">订单金额低于优惠券金额不能使用优惠券</span>
  <span class="fr number"><%=data.couponTips%></span>
</div>
<%if(data.vipCondition){%>
  <div class="feature clickBtn boxStyle mt20">
  	<label class="title"><%=data.vipCondition.tips%><em></em></label>
    <span class="fr number"><%=data.vipCondition.vipAmount%></span>
  </div>
<%}%>
`

export default tpl_userOrderConfirmDetail;