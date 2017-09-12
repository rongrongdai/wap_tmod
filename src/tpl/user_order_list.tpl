import tpl_userOrderDetailItem from './user_order_detail_item.tpl';

const tpl_userOrderList =
`
<ul class="shipping-good-info-container">
  <%for (var i = 0; i < list.length; i++) {%>
    <%var data = list[i]%>
    <%for (var j = 0; j < data.goods_list.length; j++) {%>
    <li class="shipping-good-info-item">${tpl_userOrderDetailItem}</li>
    <%}%>
  <%}%>
</ul>
`
/*
`
<%for (var i= 0; i < list.length; i++) {%>
    <li>
        <div class="top ovH">
            <div class="state fr cRed"><%=list[i].status%></div>
        </div>
       <div class="list" data-order_sn="<%=list[i].order_sn%>">
            <table border="0" cellpadding="0" cellspacing="0">
            <tbody>
                <tr>
          <%for (var j= 0; j < list[i].goods_list.length; j++) {%>
                    <td><img src="<%=list[i].goods_list[j].goods_thumb%>"/></td>
          <%}%>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="bottom ovH">
            <%if(list[i].order_type==5){%>
        <div class="price fl">使用礼券：<%=list[i].order_amount%></div>
            <%}else{%>
        <div class="price fl">订单价格：¥<%=list[i].order_amount%></div>
            <%}%>
      <%for (var m= 0; m < list[i].status_code.length; m++) {%>
        <%if (list[i].status_code[m].title != '确认收货'){%>
            <button class="delete fr <%=list[i].status_code[m].btnClass%>" data-btn-name="<%=list[i].status_code[m].btnClass%>" data-order-sn="<%=list[i].order_sn%>" style="margin-left:0.5rem;"><%=list[i].status_code[m].title%></button>
        <%}%>
      <%}%>
        </div>

  </li>
<%}%>
`
*/

export default tpl_userOrderList;
