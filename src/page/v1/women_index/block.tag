<block>
    <div class="countdown">
	     <div class="time-item">  
	    	<span id="day1" class="clock first"></span>
	    	<span id="day2" class="clock"></span>
	    	<span class="unit">天</span>
	        <span id="hour1" class="clock first"></span>
	        <span id="hour2" class="clock"></span>
                    <span class='unit'>时 </span>
	        <span id="minute1" class="clock first"></span>
	        <span id="minute2" class="clock"></span>
                    <span class="unit">分 </span>
	        <span id="second1" class="clock second first"></span>
	        <span id="second2" class="clock second"></span>
                    <span class="unit">秒</span>
	</div>
</div>
<script>
       this.mixin('util');
       let self = this;
        var sys_second =this.opts.countdow.resetTime;

              console.log(sys_second);
                window.setTimeout(()=>{
                   //clearInterval(timerHaoMiao);
                   clearInterval(timer);
                   //document.getElementById("haomiao").innerHTML = 0;
                },sys_second*1000);
             var timer = setInterval(function(){  
                 if (sys_second > 0) {  
                    sys_second = sys_second - 1; 
                  
                          var day = Math.floor((sys_second / 3600) / 24);  
                        
                          var day_h= Math.floor(day/10);
                          var day_q= day%10;
                          document.getElementById("day1").innerHTML = day_h; 
                          document.getElementById("day2").innerHTML = day_q;
                      


                        var hour = Math.floor((sys_second / 3600) % 24);  
                        
                        var hour_h= Math.floor(hour/10);
                        var hour_q= hour%10;
                        document.getElementById("hour1").innerHTML = hour_h; 
                        document.getElementById("hour2").innerHTML = hour_q;
                          
                        
                        
                        var minute = Math.floor((sys_second / 60) % 60); 
                        
                        var minute_h= Math.floor(minute/10);
                        var minute_q=minute%10;
                        document.getElementById("minute1").innerHTML = minute_h; 
                        document.getElementById("minute2").innerHTML = minute_q;
                        
                        
                        
                        
                        var second = Math.floor(sys_second % 60);
                        
                        var second_h= (Math.floor(second/10));
                        var second_q= second%10;
                        document.getElementById("second1").innerHTML = second_h; 
                        document.getElementById("second2").innerHTML = second_q;
                        
                        
                        //var haomiao = Math.floor(sys_second%1000/100);  
                        //document.getElementById("haomiao").innerHTML = haomiao;
                         //console.log('...')
                    } 
                }, 1000);  
</script>
</block>