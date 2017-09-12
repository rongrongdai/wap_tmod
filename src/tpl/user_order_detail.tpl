var tpl_userOrderDetail =
`
<div class="indentInfo ovH" >

    <div class="shippingAddress clickBtn boxStyle">
        <div class="name"><%=data.user_address.consignee%>　<%=data.user_address.mobile%></div>
        <div class="add"><%=data.user_address.province + data.user_address.city + data.user_address.district + data.user_address.details%></div>
    </div>
    <div class="addInof mt20">
        <h2>订单跟踪</h2>
        <ul class="list">
			<%for (var i= 0; i < data.track.length; i++) {%>
            <li>
                <%=data.track[i].content%>
                <p class="time"><%=data.track[i].dateline%></p>
            </li>
			<%}%>
        </ul>
    </div>
    <div class="goodsInfo mt20">
        <!--<h2>全球哇自营</h2>-->
        <ul class="list">
			<%for (var j= 0; j < data.goods_list.length; j++) {%>
            <li>
  				<a href="/mobile-goods/detail?id=<%=data.goods_list[j].goods_id%>">
                <div class="img"><img src="<%=data.goods_list[j].goods_thumb%>"/></div>
                <div class="ovH">
                    <div class="name fl"><%=data.goods_list[j].goods_name%></div>
                    <% if (data.order_type==5){ %>
                    <div class="price fr">积分:<%=data.goods_list[j].shop_price%></div>
                    <%} else{%>
                    <div class="price fr">¥<%=data.goods_list[j].shop_price%></div>
                    <%}%>

                </div>
                <div class="ovH mt20">
                    <div class="attr fl">规格:<%=data.goods_list[j].goods_attr%></div>
                    <div class="num fr">X<%=data.goods_list[j].goods_number%></div>
                </div>
				</a>
            </li>
			<%}%>
        </ul>
    </div>
    <div class="indentClearing mt20">
        <% if (data.order_type!=5){ %>
        <ul class="top">
            <li>
                <span class="fl">商品金额：</span>
                <span class="fr cRed">¥<%=data.goods_amount%></span>
            </li>
            <li>
                <span class="fl">运费：</span>
                <span class="fr cRed">+¥<%=data.shipping_fee%></span>
            </li>
            <li>
                <span class="fl">优惠：</span>
                <span class="fr cRed">-¥<%=data.discount%></span>
            </li>
            <li>
                <span class="fl">实付：</span>
                <span class="fr cRed">¥<%=data.order_amount%></span>
            </li>
        </ul>
        <%}%>
        <ul class="bottom">
            <li>下单时间：<%=data.format_create_time%></li>
            <li>下单编号：<%=data.order_sn%></li>
        </ul>
    </div>
</div><!--订单详情End-->
<!--添加地址-->
<dl class="bottomBtnBox" id="J-btnOrderDetail" data-order_sn="<%=data.order_sn%>" data-goods_id="<%=data.goods_list[0].goods_id%>">
	<%for(var i = 0; i < data.status_code.length; i++){%>
	<dd data-btn="<%=data.status_code[i].btnClass%>" data-order_sn="<%=data.order_sn%>"><%=data.status_code[i].title%></dd>
	<%}%>

</dl><!--底部结算End-->
<input type="hidden" name="" id="U-isWechat" value="{$data['iswechat']}" >
`

export default tpl_userOrderDetail;