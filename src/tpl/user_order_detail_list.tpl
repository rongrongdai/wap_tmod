import tpl_userOrderDetailItem from './user_order_detail_item.tpl';

const tpl_userOrderDetailList =
`
    <ul class="shipping-good-info-container">
        <%for (var j= 0; j < 5; j++) {%>
        <li>${tpl_userOrderDetailItem}</li>
        <%}%>
        <div id="shippingGoodsLeft" class="hidden">
            <%for (var j= 5; j < data.goods_list.length; j++) {%>
        		<li>${tpl_userOrderDetailItem}</li>
            <%}%>
        </div>
        <%if (data.goods_list.length > 5) {%>
        <li class="shipping-good-item shipping-good-item-collapse" id="shippingGoodsLeftBtn"><span class="shipping-good-item-collapse-desc">展开</span><span class="shipping-good-item-collapse-icon-down"></span></li>
        <%}%>
    </ul>
`

export default tpl_userOrderDetailList;
