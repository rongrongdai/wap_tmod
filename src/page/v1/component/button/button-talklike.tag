import { BackendApiTopicmainikeLike ,BackendApiTopicmainundLike} from 'BackendApi';
<button-like>
	<div class="thumbs_up"  onclick={ likeClick }  data-loveid="{opts.items. cid }" >
                	       <span>{opts.items.likes}人赞过</span> 
                	       <img class="button-like-sign button-like-sign--active" src="/static/css/product_funding/funding/app_img/like@2x.png" if="{is_like==true}"  data-lovenum="{opts.items.likes }">
		       <img class="button-like-sign" src="/static/css/product_funding/funding/app_img/unlike@2x.png" if="{is_like==false}" data-lovenum="{ opts.items.likes }">
                	       
                </div>

	<script>
	// 引入 mixin
	this.mixin('util');
	this.mixin('event');
                   let self = this;
		//self.btnName='关注';

		self.one('update',()=>{
			self.is_like=self.opts.items.is_like;
		})
		this.likeClick  = function(event) {
			 this.preventDefault(event);
	         this.stopPropagation(event);
			 let cid=event.currentTarget.dataset.loveid;
			if(!self.is_like){
			    self.ajaxData('post', BackendApiTopicmainikeLike,{cid:cid}, (data) => {
                   self.opts.items.likes=parseInt(self.opts.items.likes)+1;
                   self.update({is_like:true});
			   });
		    }
		    else{
	        self.ajaxData('post', BackendApiTopicmainundLike,{cid:cid}, (data) => {
			       self.opts.items.likes=parseInt(self.opts.items.likes)-1;
                   self.update({is_like:false});
			    });
			}
		};

	</script>
</button-like>