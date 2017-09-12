import './refund_conmet.tag';
<refundDetails>
    <!-- <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>退货详情</div>
        <div class="top_as"></div>
     </header>
      -->

  <div class="refund_top1"  if="{ opts.status ==2 }">
         <div class="top_cont">
            {opts.info}   
         </div>
  </div>

 <div class="refund_top2" if="{ opts.status ==1 }">
         <div class="top_cont">
          {opts.info}
         </div>
  </div> 
  
   <div class="refund_top3" if="{ opts.status ==3 }">
         <div class="top_cont1">
          {opts.info}
         </div>
  </div>

   <div class="refund_top4" if="{ opts.status ==4 }">
         <div class="top_cont">
          {opts.info}
         </div>
  </div>

   <div class="refund_top5" if="{ opts.status ==0 }">
         <div class="top_cont">
          {opts.info}   
         </div>
  </div>

   <div class="refund_top6" if="{ opts.status ==5 }">
         <div class="top_cont">
          {opts.info}   
         </div>
  </div>    

<div class="refu_con" onclick={re_details}>
          <span class="re_left">协商详情</span>
          <span class="re_arrow"></span>
</div>
<div class="refu_con">
          <span class="re_left">退款信息</span>
</div>

<refundCommet  goods_list="{ opts.goods_list }"></refundCommet>

<div class="ref_well">
    <div class="well_cont">
      <p>退款原因：<span>{opts.reason_type_name }</span></p>
      <p>退款类型：<span>{opts.return_type_name}</span></p>
      <p>退款金额：<span>¥{opts.return_goods_amount}</span></p>
      <p>退款说明（可不填）：<span>{opts.desc }</span></p>
      <div class="cont_img">
          <img  each="{ opts.img_list }" src="{img_url}" />
      </div>
    </div>


    <div class="refu_but"  onclick={refuDeta}  if="{ opts.status ==4 }">
        <p>修改退款申请</p>
     </div>
</div>






<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
      let order_sn;
      

      function  getQueryString(name){
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) {
                        return unescape(r[2]);
                    }
                    return null;
        }

     order_sn=getQueryString("order_sn");
     console.log(self.opts.goods_list);

     //点击修改退款申请
      self.refuDeta=function(){
             let optgoodlist= self.opts.goods_list;
             let goodlist={};
              goodlist.goods_id=[];
              goodlist.goods_return_number=[];

              for(var i =0; i <optgoodlist.length; i++){
                      goodlist.goods_id.push(optgoodlist[i].goods_id);
                      goodlist.goods_return_number.push(optgoodlist[i].goods_return_number);
              }
            

         location.href="/mobile-user-order/refundApply?order_sn="+order_sn +"&goods_id="+goodlist.goods_id.toString() +"&goods_num="+goodlist.goods_return_number.toString();   
      };

      //点击协商详情跳转
      self.re_details=function(){
              location.href="/mobile-user-order/refundRecord?order_sn="+order_sn;   
      };
     

</script>
</refundDetails>