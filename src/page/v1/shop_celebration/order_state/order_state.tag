<orderState>
    <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>积分换购</div>
        <div class="top_as"></div>
     </header>
     <div class="state_con"  if="{ type==0}">
          <p class="notic">兑换成功！</p>
          <p class="instruction">您的礼品已经兑换成功可以去<a href="/mobile-user-order/list?type=1" class="page_link">我的订单</a>查看！</p>
     </div>


       <div class="state_con"  if="{ type==1}">
          <p class="notic1">兑换失败！</p>
          <p class="instruction">非常抱歉，建议您返回<a href="/mobile-anniversary/index" class="page_link">积分兑礼</a>重新兑换！</p>
     </div>
 <script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
      let type;
    



function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
this.type=getQueryStrings("type");


</script>  
</orderState>