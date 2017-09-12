<croupCore>
   <!--  <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>拼团说明</div>
        <div class="top_as"></div>
     </header> -->
     

  
       <div class="page_link">
              <p class="croup_page">拼团说明</p>
              <p class="page_cor" onclick={brrow}>
                  <span>关于拼团</span>
                     <b class="bottom"  ><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
              </p>

                <p class="page_cor"  onclick={brrowy}>
                  <span>关于售后</span>
                    <b class="bottom" ><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
              </p>

                <p class="page_cor" onclick={brrowe}>
                  <span>关于拼团流程</span>
                    <b class="bottom" ><i class="right-arrow1"></i><i class="right-arrow2"></i></b>
              </p>
       </div>

     
<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
     self.brrow = function(event) {
           location.href="/mobile-group/groupDetail?type="+0;   
          
     };
     self.brrowy = function(event) {
         location.href="/mobile-group/groupDetail?type="+1;           
     };
     self.brrowe = function(event) {
         location.href="/mobile-group/groupDetail?type="+2;         
     };

</script>
</croupCore>