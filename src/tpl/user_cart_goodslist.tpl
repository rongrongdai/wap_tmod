var tpl_userGoodsList =
`
<%for (var i= 0; i < list.length; i++) {%>
   <li>
               <div class="flex-fixed b-radio b-checkbox j-selectItem" data-goods_num="<%=simpleGoodsList[j].goods_number%>" data-cart_id="<%=simpleGoodsList[j].cart_id%>" data-price="<%=simpleGoodsList[j].sale_price%>">
                   <label class="check">
                       <em class=""></em>
                       <input class="check" type="checkbox" name="checkbox" data-cart_id="<%=simpleGoodsList[j].cart_id%>" data-sku_id="<%=simpleGoodsList[j].sku_id%>" data-price="<%=simpleGoodsList[j].sale_price%>">
                   </label>
               </div>
               <div class="img">
                   <a href="http://m.quanqiuwa.com/mobile-goods/detail?id=<%=simpleGoodsList[j].goods_id%>"><img src="<%=simpleGoodsList[j].goods_thumb%>"/></a>
               </div>
               <a href="http://m.quanqiuwa.com/mobile-goods/detail?id=<%=simpleGoodsList[j].goods_id%>">
                   <div class="name"><%=simpleGoodsList[j].goods_name%></div>
               </a>
               <div class="attr"><%=simpleGoodsList[j].attr_value_format%></div>
               <div class="ovH">
                   <div class="fl price">￥<%=simpleGoodsList[j].sale_price%></div>
                   <div class="fr number">
                       <em class="minus fl minus-carts-num" data-cart_id="<%=simpleGoodsList[j].cart_id%>"></em>
                       <em class="add fr add-carts-num" data-cart_id="<%=simpleGoodsList[j].cart_id%>"></em>
                       <input type="text" id="J-goods-num-<%=simpleGoodsList[j].cart_id%>" value="<%=simpleGoodsList[j].goods_number%>" name="goods_number"/>
                   </div>
               </div>
   </li>
<%}%>
`

export default tpl_userGoodsList;