var tpl_userOrderConfrimSettle =
`
<a class="fr submitBtn" href="javascript:;" id="U-btnOrderSubmit">提交订单</a>
<div class="price">实付款：<span class="cRed">￥<%=data.orderPayAmount%></span></div>
<font id="payAmount"><%=data.orderPayAmount%></font>
`

export default tpl_userOrderConfrimSettle;