const tpl_userOrderDetailItem =
`
<a href="/mobile-goods/detail?id=<%=data.goods_list[j].goods_id%>" class="shipping-good-item" id="orderItem<%=i%>">
    <%if (data.goods_list[j].sn) {%>
    <aside class="shipping-good-common shipping-good-item-header">
        <p class="shipping-good-common-item text-left"><%=data.goods_list[j].sn%></p>
        <p id="orderItemStatus<%=i%>" class="shipping-good-common-item text-right"><%=data.goods_list[j].packageStatus%></p>
    </aside>
    <%}%>
    <img src="<%=data.goods_list[j].goods_thumb%>" class="shipping-good-item-img" />
    <div class="shipping-good-item-info">
        <p class="shipping-good-item-info-name"><%=data.goods_list[j].goods_name%></p>
        <p class="shipping-good-item-info-spec"><%=data.goods_list[j].goods_attr%></p>
    </div>
    <div class="shipping-good-item-price">
        <p class="shipping-good-item-price-msg">¥<%=data.goods_list[j].shop_price%></p>
        <p class="shipping-good-item-price-num"><%=data.goods_list[j].goods_number%></p>
        <%if (data.goods_list[j].isNotlist || data.goods_list[j].is_after_sales) {%><!-- 列表标志位 -->
            <%if (data.goods_list[j].is_after_sales === '1') {%>
            <button class="shipping-good-item-price-action" data-alreadyReplay="1" data-returnsn="<%=data.goods_list[j].return_sn%>">已申请售后</button>
            <%} else {%>
            <button class="shipping-good-item-price-action" data-alreadyReplay="0" data-ordersn="<%=data.goods_list[j].order_sn%>" data-goodsid="<%=data.goods_list[j].goods_id%>" data-productid="<%=data.goods_list[j].product_id%>">申请售后</button>
            <%}%>
        <%}%>
    </div>
    <%if (data.goods_list[j].sn) {%>
    <aside class="shipping-good-common shipping-good-item-footer">
        <span class="shipping-good-item-footer-note text-left"><%=data.goods_list[j].pay%></span>
        <p class="shipping-good-common-item text-right" id="<%=i%>orderItemBtn">
            <%if (data.goods_list[j].status_code) {%>
            <%for (var k = data.goods_list[j].status_code.length - 1; k >= 0 ; --k) {%>
            <button class="shipping-good-item-footer-btn <%=data.goods_list[j].status_code[k].btnClass%>" data-btn-name="<%=data.goods_list[j].status_code[k].btnClass%>" data-order-sn="<%=data.goods_list[j].order_sn%>"><%=data.goods_list[j].status_code[k].title%></button>
            <%}%>
            <%}%>
        </p>
    </aside>
    <%}%>
</a>
`

export default tpl_userOrderDetailItem;
