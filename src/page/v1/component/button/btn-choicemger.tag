import { BackendApiFocus,BackendApiCancelFocus} from 'BackendApi';
<btn-choicemger>
		<!-- <div class="mager1" onclick={seebutle}  data-butler_id="{opts.items.doyen_id}" >
			        <div class="maimg" style="background: url({opts.items.show_picture}) center center no-repeat">
			        </div>
		            <p class="ma_p">{opts.items.nickname }</p>
		            <p class="ma_p1">{opts.items.slogan}</p>
		            <div class="ma_opt {chang_bg:haveFocus}"  data-butler_id="{doyen_id}" onclick={optbutler} >
		              <span>{btnName}</span>
		             </div>
		        </div>
                     </div> -->

                    <div class="mager1" onclick={seebutle}  data-butler_id="{opts.items.doyen_id}" >
                    	       <div class="img">
                                   <img class="magdd" src="{opts.items.show_picture}">
	                                  <div class="photo">
	                                       <div class="useimg">
	                                       <img src="{opts.items.face}">
	                                     </div>
	                                 </div>
	                <div class="follow_p">     
	                <img class="follimg" src="/static/css/wap/img/icon_like2@2x.png" if="{haveFocus==1}">
		            <img class="follimg" src="/static/css/wap/img/icon_like@2x.png" if="{haveFocus==0}" data-loveid="{ opts.items.tid }" data-lovenum="{ opts.items.likes }">
		            <div class="follows">{opts.items.follows}人关注</div>
	                   </div>        
                           </div>
                           <div class="desc">
                           	 <p class="tit">{opts.items.nickname}</p>
	                         <p class="usename">{opts.items.position}</p>
	                         <p class="titdetail">{opts.items.slogan}</p>
	                         <p class="articlelist">{opts.items.article_num}
                           </div>

                            <div class="ma_opt {chang_bg:haveFocus==1} btnfocus{opts.items.uid}" data-haveFocus='{haveFocus}' data-butler_id="{opts.items.uid}" onclick={optbutler} >
		                        <span>{btnName}</span>
		                    </div>
                    </div>
 <script>
// 	// 引入 mixin
		this.mixin('util');
		this.mixin('event');
		let self = this;
		self.btnName='关注';
		let items;
		self.one('update',()=>{
			self.haveFocus=self.opts.items.haveFocus;
			self.btnName= self.haveFocus==1?'已关注':'关注';
		})
		this.optbutler = function(event) {
			 this.preventDefault(event);
	         this.stopPropagation(event);
			 let butid=event.currentTarget.dataset.butler_id;
			 let butlerid='?butler_id='+ butid;
			 let haveFocus=parseInt(event.currentTarget.dataset.havefocus);
			if(haveFocus==0){
			    self.ajaxData('get', BackendApiFocus,{fuid:butid}, (data) => {
                   self.opts.items.follows=parseInt(self.opts.items.follows)+1;
                   self.update({btnName:'已关注',haveFocus:1});
                   changeState(true,butid,0);
			   });
		    }
		    else{
			    self.ajaxData('get', BackendApiCancelFocus,{fuid:butid}, (data) => {
			       self.opts.items.follows=parseInt(self.opts.items.follows)-1;
                   self.update({'btnName':'关注',haveFocus:0});
                   changeState(false,butid,0);
			    });
			}
		};
		this.seebutle =function(event){
			  let  uids=event.currentTarget.dataset.butler_id;
			  console.log(uids);
              let  goods=2;
              let  uid=self.opts.items.uid;
              let  doyen_id=self.opts.items.doyen_id;
              location.href="/app-butler/detail?doyen_id="+doyen_id+"&uid="+uid;
		};

		function sendToFocusState(uids,state,count){
			if(self.getPlatform()=='ios'){
                    sendFocusState(uids,state,count);
			}else if(self.getPlatform()=='android'){
                    window.JSInterface.sendFocusState(uids,state,count);
			   }
		}

		function changeState(focusState,butid,count) {
         	  let state = focusState ? 1 : 0 ;
         	  let className='.btnfocus'+ butid;
         	   // $(className).attr('data-haveFocus')= state;
         	   $(className).find('span').text(focusState ? '已关注':'关注');  
               $(className).attr('data-haveFocus',state);
               $(className).each(function(index,event){
               	 if($(event).hasClass('ma_opt')){
               	   focusState ? $(className).addClass('chang_bg'): $(className).removeClass('chang_bg');
                  }
               })
               sendToFocusState(butid,state,count);  
         } 
 </script>
</btn-choicemger>