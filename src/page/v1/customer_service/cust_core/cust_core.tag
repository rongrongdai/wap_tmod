<custCore>
    <!-- <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>客服中心</div>
        <div class="top_as"></div>
     </header>
      -->

  
       <div class="page_link">
              <p class="page_cor"  onclick={brrow}>
                  <span>订单问题</span>
                     <b class="bottom" ><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
              </p>

                <p class="page_cor" onclick={brrowy}>
                  <span>退货问题</span>
                    <b class="bottom" ><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
              </p>

                <p class="page_cor" onclick={brrowe}>
                  <span>售后总则</span>
                    <b class="bottom"  ><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
              </p>
       </div>

     
<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
     self.brrow = function(event) {
           location.href="/mobile-main/customerService?type="+0;   
          
     };
     self.brrowy = function(event) {
         location.href="/mobile-main/customerService?type="+1;         
     };
     self.brrowe = function(event) {
         location.href="/mobile-main/customerService?type="+2;         
     };

</script>
</custCore>