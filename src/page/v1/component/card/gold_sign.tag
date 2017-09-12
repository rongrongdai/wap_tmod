<goldsign>
	<div class="goldsign">
	           <div class="signcont">
	                   <div class="conto">
	                   	   <p class="p1">每日签到赚金币</p>
	                   	   <p class="p2">在连续签到<span>7</span>天即可获得<span>30</span>个金币</p>
	                   </div>

	                   <div class="contw">
	                   	    <div class="contimg"></div>
	                   </div>
	                   <div class="conts">
	                   	  <span>已签到</span>
	                   </div>
	           </div>	


                   <div class="signcont2">
                        <span class="circle1"  onclick={signgl}></span>
                        <span class="circle2"  onclick={signgl}></span>
                        <span class="circle3"  onclick={signgl}></span>
                        <span class="circle4"  onclick={signgl}></span>
                        <span class="circle5"  onclick={signgl}></span>
                        <span class="circle6"  onclick={signgl}></span>
                        <span class="circle7"  onclick={signgl}></span>
                   </div>


	</div>


  <script>
        let self = this;
        let index ='';
        
        this.signgl = function(event) {
               $(event.target).addClass('spbg');
	};        
  </script>
</goldsign>