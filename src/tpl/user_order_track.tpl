var tpl_userOrderTrack =
`
<div class="shippingAddress clickBtn boxStyle">
  <div class="name express">订单处理中</div>
  <div class="add">暂无运单信息</div>
</div>
<div class="addInof mt20">
  <h2>订单跟踪</h2>
  <ul class="list">
		<%for (var i= 0; i < list.length; i++) {%>
    <li>
      <%=list[i].content%>
      <p class="time"><%=list[i].dateline%></p>
    </li>
		<%}%>
  </ul>
</div>
`

export default tpl_userOrderTrack;