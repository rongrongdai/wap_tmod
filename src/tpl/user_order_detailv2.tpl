import tpl_userOrderDetailList from './user_order_detail_list.tpl';

const tpl_userOrderDetailV2 =
`
<section class="user-order-detail-layout" >
    <div class="shipping-address">
        <p class="shipping-address-name"><%=data.user_address.consignee%>　<%=data.user_address.mobile%></p>
        <p class="shipping-address-addr"><%=data.user_address.province + data.user_address.city + data.user_address.district + data.user_address.details%></p>
    </div>
    <aside class="shipping-track-container">
        <h2 class="shipping-track-title">订单跟踪</h2>
        <ul class="shipping-track-list">
            <%for (var i= 0; i < data.track.length; i++) {%>
            <li class="shipping-track-list-item">
                <%=data.track[i].content%>
                <p class="shipping-track-list-itemtime"><%=data.track[i].dateline%></p>
            </li>
            <%}%>
        </ul>
    </aside>
    <!--<h2>全球哇自营</h2>-->
    ${tpl_userOrderDetailList}
<!--     <div class="goodsInfo mt20">
        <ul class="list">
            <%for (var j= 0; j < data.goods_list.length; j++) {%>
            <li>
                <a href="/mobile-goods/detail?id=<%=data.goods_list[j].goods_id%>">
                <div class="img"><img src="<%=data.goods_list[j].goods_thumb%>"/></div>
                <div class="ovH">
                    <div class="name fl"><%=data.goods_list[j].goods_name%></div>
                    <div class="price fr">¥<%=data.goods_list[j].shop_price%></div>
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
   -->
    <div class="shipping-total-info">
        <p class="shipping-total-info-money">商品金额：<span class="shipping-total-info-money-data pull-right--fix">¥<%=data.goods_amount%></span><p>
        <p class="shipping-total-info-expenses">运费：<span class="shipping-total-info-expenses-data pull-right--fix">+¥<%=data.shipping_fee%></span></p>
        <p class="shipping-total-info-benefit">优惠：</span><span class="shipping-total-info-benefit-data pull-right--fix">-¥<%=data.discount%></span></p>
        <p class="shipping-total-info-pay">实付：</span><span class="shipping-total-info-pay-data pull-right--fix">¥<%=data.order_amount%></span></p>
    </div>
    <ul class="shipping-order-track-info">
        <li class="shipping-order-track-item">下单时间：<%=data.format_create_time%></li>
        <li class="shipping-order-track-item">下单编号：<%=data.order_sn%></li>
    </ul>
    <aside class="shipping-custom-service">
        <a href="tel:400-6516-838" class="shipping-custom-service-tel">电话客服</a>
        <span class="shipping-custom-service-time pull-right--fix">服务时间：9:00-18:00</span>
    </aside>
</section><!--订单详情End-->
<%for(var i = 0; i < data.status_code.length; i++){%>
<button class="shipping-order-operation" data-btn="<%=data.status_code[i].btnClass%>" data-order_sn="<%=data.order_sn%>">
  <%=data.status_code[i].title%>
</button>
 <%}%>
<!-- <dl class="bottomBtnBox" id="J-btnOrderDetail" data-order_sn="<%=data.order_sn%>" data-goods_id="<%=data.goods_list[0].goods_id%>">
    <%for(var i = 0; i < data.status_code.length; i++){%>
    <dd data-btn="<%=data.status_code[i].btnClass%>" data-order_sn="<%=data.order_sn%>"><%=data.status_code[i].title%></dd>
    <%}%>
</dl> --><!--底部结算End-->
`

export default tpl_userOrderDetailV2;
