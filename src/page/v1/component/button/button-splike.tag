import { BackendApiunlikeComment, BackendApilikeComment } from 'BackendApi';
<button-likes>
	<div class="eval_right fr"  onclick={ likeClick }  data-loveid="{opts.items.comment_id }" >
                	       <img class="button-like-sign button-like-sign--active" src="/static/css/product_funding/funding/app_img/like@2x.png" if="{is_like==true}"  data-lovenum="{opts.items.likes }">
		       <img class="button-like-sign" src="/static/css/product_funding/funding/app_img/icon_unlike1x.png" if="{is_like==false}" data-lovenum="{ opts.items.likes }">
                	       <span>{opts.items.likes}</span> 
                </div>

	<script>
	// 引入 mixin
	this.mixin('util');
	this.mixin('event');
                   let self = this;
		self.one('update',()=>{
			self.is_like=self.opts.items.is_like;
		})
		this.likeClick  = function(event) {
			     this.preventDefault(event);
	                         this.stopPropagation(event);
			 let comment_id=event.currentTarget.dataset.loveid;

			if(!self.is_like){
			    self.ajaxData('post', BackendApilikeComment,{comment_id:comment_id}, (data) => {
                   self.opts.items.likes=parseInt(self.opts.items.likes)+1;
                   self.update({is_like:true});
			   });
		    }
		    else{
	        self.ajaxData('post', BackendApiunlikeComment,{comment_id:comment_id}, (data) => {
			       self.opts.items.likes=parseInt(self.opts.items.likes)-1;
                   self.update({is_like:false});
			    });
			}
		};

	</script>
</button-likes>