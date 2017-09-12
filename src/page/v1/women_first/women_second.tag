
import '../component/women-day/qqw-women-head.tag';
import '../component/women-day/qqw-women-sub-head.tag';
import '../component/women-day/qqw-women-head.tag';
import '../component/women-day/qqw-women-sub-head.tag';
<women-second>
    <div class="head">
        <img class="banner"  src="{opts.mainMessage.banner}">
        <div class="fix-box">
		        <qqwhead if={opts.mainMessage.isGoodGoods} colorlist={opts.mainMessage.colorList}></qqwhead>
			    <qqwsub-head class='z_index' categoryArr={opts.mainMessage.categoryArr}  colorlist={opts.mainMessage.colorList}></qqwsub-head>
	    </div>
    </div>
  	  <script>
	  	let self = this;
	  	if(opts.mainMessage.isGoodGoods){
	  	   self.index=1;
	  	}else{
           self.index='';
	  	}
	  	    this.on('change-sub-head',(object)=>{
	  	    	 self.opts.mainMessage.categoryArr=object;
	  	    	 self.update();
                 this.tags['qqwsub-head'].trigger('change-categoryArr');
	  	    });
	  	    this.on('switch_change_state',(object)=>{
                 this.tags['qqwsub-head'].trigger('switch_change_state',object);  
	  	    });
			this.on('updated',()=>{
				this.tags['qqwsub-head'].on('switch_change',(object)=>{
					object.index;
					document.getElementsByClassName('dom_location')[object.index].scrollIntoView();
					scrollBy(0,-300);
				});
				
			    this.tags['qqwhead'].on('switch_change',(object)=>{
			    	 if(self.index==object.index){
			    	 	return;
			    	 }
	                 this.trigger('switch_change_state',object);
	                 self.index = object.index==0 ? '' : 1;
				});
			})
	  </script>	
</women-second>