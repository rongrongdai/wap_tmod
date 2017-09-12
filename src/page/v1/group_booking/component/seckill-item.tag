<seckill-card>
    <a href=" {opts.speclife.url} ">
      <div class="seckill-card-content">
      	  <img  class="icon-img" src='{opts.speclife.bg}'>
      	  <div class="right-content">
      	  	<p class="name">{opts.speclife.goods_name}</p>
      	  	<div class="bottom" if={opts.speclife.activity}>
	            <div class="left-second-content">
	            	<p class="price"><span>{opts.speclife.price}</span><span>{opts.speclife.old_price}</span>
	            	</p>
	            	<p>{toast_str}</p>
	            	<p>
	            	<span>{lessTime[0]}</span>
	            	<span>{lessTime[1]}</span>
	            	:
	                <span>{lessTime[2]}</span>
	            	<span>{lessTime[3]}</span>
	            	:
	            	<span>{lessTime[4]}</span>
	            	<span>{lessTime[5]}</span>
	            	</p>
	            </div>
	            <div class="right-second-content">
	            	<p>{opts.speclife.num}</p>
	                <a href=" {opts.speclife.url} ">
		                <img  src='/static/css/wap/img/booking/btn-seckill@2x.png'>
		            </a>
	            </div>
            </div>
            <div class="bottom" if={!opts.speclife.activity}>
	            <div class="left-second-content">
	            	<p class="price"><span>{opts.speclife.price}</span><span>{opts.speclife.old_price}</span></p>
	            	<p class="time">{opts.speclife.toast_str}</p>
	            </div>
            </div>
      	  </div>
      </div>
    </a> 
	<script>
		   this.mixin('util');
		   this.mixin('event');
	       let self=this;
	       var time=0;
           this.on('mount',()=>{
               if(self.opts.speclife.activity){
           	    var nowTime=Math.floor((new Date).valueOf()/1000);
           	    if(self.opts.speclife.start_time > nowTime){
           	    	time = self.opts.speclife.start_time - nowTime ;
           	    	self.update({lessTime:formatDateTime(time),toast_str:'距离开始时间'});
           	    }else if(self.opts.speclife.end_time > nowTime){
           	    	time = self.opts.speclife.end_time -nowTime;
           	    	self.update({lessTime:formatDateTime(time),toast_str:'距离结束时间'});
           	    }else{
           	    	time=0;
           	    	self.update({lessTime:formatDateTime(time),toast_str:'距离结束时间'});
                    return;
           	    }
           		this.on('timeout',()=>{
			       	 time--;
		             self.update({lessTime:formatDateTime(time)});
		             if(time == 0 && self.opts.speclife.end_time > Math.floor((new Date).valueOf()/1000) ){
                        time= self.opts.speclife.end_time - Math.floor((new Date).valueOf()/1000);
                        self.update({toast_str:'距离结束时间'});
		             }else if(time == 0){
		             	self.off("timeout");
		             }
                })
             }
           }) 

	         function  formatDateTime(time){
	         	 var hour = Math.floor((time%(3600*24))/3600);
		         hour = hour<10 ? ('0'+ hour) : hour.toString();
	             var second = Math.floor((time/60)%60);
	             second = second<10 ? ('0'+ second ): second.toString();
	             var minute = Math.floor(time%60);
	             minute = minute<10 ? ('0'+ minute ): minute.toString();
	             return hour+second+minute
	         }

	</script>
</seckill-card>
