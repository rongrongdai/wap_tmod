import { BackendApiFocus,BackendApiCancelFocus} from 'BackendApi';
<recommend-card>
    <h2 class="{homepage-headline:true,hide:!opts.speclife.is_show}" id="purchaseDoyen" data-id="{ opts.purchaseId }" onclick={ clickPurchase }>
        <a class="homepage-headline-title"  href="{ opts.speclife.url }" id='{scrollHereId}'><span class="line">- </span>{opts.speclife.slogan}<span  class="line"> -</span></a>
    </h2>
	<a class="geek-article {geek-article-mask-hack:opts.speclife.showHack}" href="{ opts.speclife.url }" speclife={ opts.speclife }>
		<div class="geek-article-mask {geek-article-mask-hack:opts.speclife.showHack}">
	    <yield/>
	    	<span></span>
            <h2>
                <div>
                	<img class="geek-show-face" src="{opts.speclife.face }">
                </div>
				<!-- <p class="card-goodsname">{opts.speclife.title}</p> -->
				<p class="geek-show-solgan">{ opts.speclife.title }</p>
				<p class="{ geek-show-name: true, show: speclife.nickname }" if="{ opts.speclife.class }">{ opts.speclife.identity}</p>
			</h2> 
		</div>
	</a>

	<script>
		   this.mixin('util');
		   this.mixin('event');
	       let self=this;
	       this.one('update',()=>{ 


	       	// if(opts.speclife.slogan.indexOf('中国质造')!=-1&&opts.speclife.is_show){
	       	// // if(opts.speclife.slogan.indexOf('测试6')!=-1){
	       	// 	self.scrollHereId='scrollHereId0';
	       	// }else if(opts.speclife.slogan.indexOf('全球好货')!=-1&&opts.speclife.is_show){
	       	// // }else if(opts.speclife.slogan.indexOf('测试5')!=-1){
         //        self.scrollHereId='scrollHereId1';
	       	// };
            self.haveFocus=self.opts.speclife.haveFocus;
             if(self.haveFocus==1){
             	  self.btnName='已关注';
	              self.btnadd='';
             }else{
             	  self.btnName='关注';
	              // self.btnadd='十';
             }
	       })
	       this.one('updated', ()=>{
	       	let  event=this.root.childNodes[2];
		    // event.firstElementChild.style.background = 'rgba(0,0,0,.2)';
            if (event.childNodes[5]) event.childNodes[5].className += ' hidden';
            if (event.childNodes[7]) event.childNodes[7].className += ' hidden';
            let Img = new Image();
            Img.src = self.opts.speclife.bg;
            Img.onload = () => {
            event.style.background = 'transparent url(' + self.opts.speclife.bg + ') center center / cover no-repeat';
            if (event.childNodes[5]) event.childNodes[5].className = event.childNodes[5].className.substring(0, event.childNodes[5].className.length - 7);
            if (event.childNodes[7]) event.childNodes[7].className = event.childNodes[7].className.substring(0, event.childNodes[7].className.length - 7);
            }
	       });

	       this.optbutler = function(event) {
			 this.preventDefault(event);
	         this.stopPropagation(event);
			 let butid=event.currentTarget.dataset.butler_id;
			 let haveFocus=parseInt(event.currentTarget.dataset.havefocus, 10);
			 console.log('havefocus:'+haveFocus);
			if(haveFocus==0){
			    self.ajaxData('get', BackendApiFocus,{fuid:butid}, (data) => {
			    	// self.btnName='已关注';
			    	// self.btnadd='';
			    	// self.haveFocus=true;
                   self.update({btnName:'已关注',haveFocus:1,btnadd:''});
                   changeState(true,butid,0)
			   });
		   }
		    else{
			    self.ajaxData('get', BackendApiCancelFocus,{fuid:butid}, (data) => {
                   self.update({'btnName':'关注',haveFocus:0,btnadd:'+'});
        //              self.btnName='关注';
        //              self.btnadd='+';
			    	// self.haveFocus=false;
			    	changeState(false,butid,0)
			    });
			}
		};
         function changeState(focusState,butid,count) {
         	  let state = focusState ? 1 : 0 ;
         	  let className='.btnfocus'+ butid;
         	   // $(className).attr('data-haveFocus')= state;
              $(className).each(function(index,event){
               	 if($(event).hasClass('ma_opt')){
               	   focusState ? $(className).addClass('chang_bg'): $(className).removeClass('chang_bg');
                  }
               });
               $(className).find('span').text(focusState ? '已关注':'关注');  
               $(className).attr('data-haveFocus',state);
               sendToFocusState(butid,state,count);  
         } 


		function sendToFocusState(uids,state,count){
			if(self.getPlatform()=='ios'){
                    sendFocusState(uids,state,count);
			}else if(self.getPlatform()=='android'){
                    window.JSInterface.sendFocusState(uids,state,count);
			   }
		}
	</script>
</recommend-card>