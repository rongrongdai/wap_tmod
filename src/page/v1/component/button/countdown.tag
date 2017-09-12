<countdown>
    <div class="countdown">

	    <div class="more">
	            <div class="line"></div>
	            <div class="info">活动商品</div>
	     </div>
  
	     <div class="time-item">  
	        <span id="day1" class="clock"></span>
	        <span id="day2" class="clock"></span>
	        天
	   
	        <span id="hour1" class="clock"></span>
	        <span id="hour2" class="clock"></span>
	        时 
	        
	        <span id="minute1" class="clock"></span>
	        <span id="minute2" class="clock"></span>
	        分 
	        
	        <span id="second1" class="clock"></span>
	        <span id="second2" class="clock"></span>
	        秒
	        
	        <span id="haomiao" class="second">0</span>  
	</div>
</div>
<script>
       this.mixin('util');
       let self = this;
//       var aborts= this.opts.countdow.format_end_time;
//     //  var begins= this.opts.countdow.format_start_time;
//       //countDown("2017,3,8 00:00:00");    
//       countDown(aborts);    

//  function countDown(time){ 
//    var end_time = new Date(time).getTime(),
//      sys_second = (end_time-new Date().getTime());
//     // var end_time = time;
//      //var sys_second=(end_time-begins);
//     var timer = setInterval(function(){  
//         if (sys_second > 0) {  
//             sys_second -= 10;  
//               var day = Math.floor((sys_second /1000/ 3600) / 24);  
            
//               var day_h= (Math.floor((sys_second /1000/ 3600) / 24))%10;
//               var day_q=(day-day_h)/10;
//               document.getElementById("day1").innerHTML = day_q; 
//               document.getElementById("day2").innerHTML = day_h;
          


//             var hour = Math.floor((sys_second /1000/ 3600) % 24);  
            
//             var hour_h= (Math.floor((sys_second /1000/ 3600) % 24))%10;
//             var hour_q=(hour-hour_h)/10;
//             document.getElementById("hour1").innerHTML = hour_q; 
//             document.getElementById("hour2").innerHTML = hour_h;
              
            
            
//             var minute = Math.floor((sys_second /1000/ 60) % 60); 
            
//             var minute_h= (Math.floor((sys_second /1000/ 60) % 60))%10;
//             var minute_q=(minute - minute_h)/10;
//             document.getElementById("minute1").innerHTML = minute_q; 
//             document.getElementById("minute2").innerHTML = minute_h;
            
            
            
            
//             var second = Math.floor(sys_second/1000 % 60);
            
//             var second_h= (Math.floor(sys_second/1000 % 60))%10;
//             var second_q=(second-second_h)/10;
//             document.getElementById("second1").innerHTML = second_q; 
//             document.getElementById("second2").innerHTML = second_h;
            
            
//             var haomiao = Math.floor(sys_second%1000/100);  
//             document.getElementById("haomiao").innerHTML = haomiao;
            
         
            
//         } else {   
        	
//             clearInterval(timer);  
//         }  
//     }, 10);  
// }   


var sys_second = this.opts.countdow.reset_time;
  //console.log(sys_second);
    window,setTimeout(()=>{
       clearInterval(timerHaoMiao);
       clearInterval(timer);
       document.getElementById("haomiao").innerHTML = 0;
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
            
            
            var haomiao = Math.floor(sys_second%1000/100);  
            document.getElementById("haomiao").innerHTML = haomiao;
             //console.log('...')
         
            
        } 
    }, 1000);  
  var k=0;
  var timerHaoMiao = setInterval(function(){  
             k++;
            if(k==10){
              k=0;
            }
            var haomiao = Math.floor(sys_second%1000/100);  
            document.getElementById("haomiao").innerHTML = k;
            //console.log(k);
    }, 100);  



</script>
</countdown>