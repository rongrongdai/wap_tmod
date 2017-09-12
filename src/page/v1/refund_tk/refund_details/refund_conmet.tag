<refundCommet>
       <div class="conm_all" each="{ opts.goods_list }">
               <div class="com_public">
                     <div class="p_left"><img src="{goods_thumb}" /></div>
                     <div class="p_Middle">
                            <p class="p1">{goods_name}</p>
                            <p class="p2">规格:{goods_attr}</p>
                     </div>
                     <div class="p_right">
                            <p class="p1">¥{goods_price}</p>
                            <p class="p2">x{goods_return_number}</p>
                     </div>
               </div>
               <div class="ovH"></div>
       </div>


<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
     

</script>
</refundCommet>