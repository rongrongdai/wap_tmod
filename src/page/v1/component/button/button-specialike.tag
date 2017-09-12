import { BackendApilikeArticle ,BackendApunlikeArticle} from 'BackendApi';
<button-like>
      
	<div class="taill_left"  onclick={ likeClick } >
                	       <img class="button-like-sign button-like-sign--active" src="/static/css/product_funding/funding/app_img/like@2x.png" if="{islove==true}"  data-lovenum="{opts.items.love_num }">
		       <img class="button-like-sign" src="/static/css/product_funding/funding/app_img/icon_unlike1x.png" if="{islove==false}" data-lovenum="{ opts.items.love_num }">
                	       <span>{opts.items.love_num}</span> 
                </div>

	<script>
	// 引入 mixin
	this.mixin('util');
	this.mixin('event');
                   let self = this;
		//self.btnName='关注';


                function  getQueryString(name){
                 var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		            var r = window.location.search.substr(1).match(reg);
		            if (r != null) {
		                return unescape(r[2]);
		            }
		            return null;
                }

               let id=getQueryString("id");

		self.one('update',()=>{
			self.islove=self.opts.items.islove;
		})
		this.likeClick  = function(event) {
			 this.preventDefault(event);
	         this.stopPropagation(event);
			
			if(!self.islove){
			    self.ajaxData('get', BackendApilikeArticle,{id:id}, (data) => {
                   self.opts.items.love_num=parseInt(self.opts.items.love_num)+1;
                   self.update({islove:true});
			   });
		    }
		    else{
	        self.ajaxData('get', BackendApunlikeArticle,{id:id}, (data) => {
			       self.opts.items.love_num=parseInt(self.opts.items.love_num)-1;
                   self.update({islove:false});
			    });
			}
		};

	</script>
</button-like>