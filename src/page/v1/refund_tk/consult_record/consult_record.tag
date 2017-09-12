
<consultRecord>
    <!-- <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>退货详情</div>
        <div class="top_as"></div>
     </header>
      -->

     <div class="consult_top">
          <div class="test" each="{ opts.log_list }"  if="{ type ==1 }">
                   <div class="sult_con">
                        <div class="con_left">
                            <span class="leone"></span>
                            <span class="letwo">客服</span>
                        </div>
                        <div class="con_right">
                            <span class="rgone">{time}</span> 
                        </div>
                   </div>

                 <div class="consu_cet">
                      <p class="re_yi"><span class="re_img"></span><span class="re_tk">{msg}</span></p>
                 </div>
        </div>

          

          <div class="test" each="{ opts.log_list }" if="{ type ==2 }">
                    <div class="sult_con">
                          <div class="con_left">
                              <span class="leone1"></span>
                              <span class="letwo">自己</span>
                          </div>
                          <div class="con_right">
                              <span class="rgone">{time}</span>
                          </div>
                     </div>
                     <div class="consu_cet">
                        <p class="re_yi"><span class="re_img"></span><span class="re_tk">{msg}</span></p>
                   </div>
       </div>

          
     </div> 


        <div class="consult_w"></div>
        <div class="sult_ye">
               <p class="tes">协商详情</p>
               <p>你于{opts.create_time}创建退款申请单</p>
               <p>退款原因：<span>{opts.reason_type_name }</span></p>
               <p>退款类型：<span>{opts.return_type_name }</span></p>
               <p>退款金额：<span>¥{opts.return_goods_amount }</span></p>
               <p>退款说明（可不填）：<span>{opts.desc }</span></p>
        </div>
    

<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
     

</script>
</consultRecord>