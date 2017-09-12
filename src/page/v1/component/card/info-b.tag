import { QqwUtil } from '../../../../js/qqw_ultilities';
import { BackendApiFocus,BackendApiCancelFocus } from 'BackendApi';
<info-b>
	<section class="article-leadingcard-layout">
			<div class="banner-box">
					<img class="bg" src="{opts.show_picture}"></img>
					<span class="article-leadingcard-item-face-container"></span>
					<img class="article-leadingcard-item-face" src="{opts.face}"></img>
					<div class="project-title">
						<p class="userb-name">{ opts.nickname }</p>
						<p class="b-work">[ { opts.position } ]</p>
						<p class="contact_box">
							<span class="focus" onclick={Focus}  >
							      <em>
							          <b class="focustext">关注</b>
							      </em>
							 </span>
							<span class="chat" onclick={chat}>
							      <em>
							           <b>私聊</b>
							       </em>
						            </span>
						</p>
					</div>
			</div>
			<div class="massge">
			       <p class="massge_con">{ opts.brief }</p>
			       <p class="userb_listnum">
                                                      <span class="listnum">- { opts.article_num } -</span>
                                             </p>
                                    </div>

	</section>
	<script> 
		// 引入 mixin
		this.mixin('util');
		this.mixin('event');
		let self = this;
		let wchat=self.opts.wchat;
		let isFollow=self.opts.is_follow;
		let uname=self.opts.nickname;
                        let uids=self.opts.userid;
                        let  fuid='?fuid='+uids;
		this.on('updated', () => {
         	  	 	 if(isFollow==true){
         	  	 	     $(".focus").addClass("addfocus");
         	  	 	     $(".focustext").html("已关注");
         	  	 	 }else if(isFollow==false){
         	  	 	       $(".focustext").html("关注");
         	  	 	      $(".focus").removeClass("addfocus");
         	  	 	 }
		});
		this.Focus = function(event) {
				if ($(".focus").hasClass("addfocus")) {
					self.trigger('focus', { isLike: false});
				} else {
					self.trigger('focus', { isLike: true});
				}
	
		};
		//监听关注
		this.on('focus', (likeObj) => {
		           if(isFollow==true){
				QqwUtil.ajaxData('get', BackendApiCancelFocus, fuid,(data) => {
		       			QqwUtil.msg("取消关注成功",true);
		       			 $(".focustext").html("关注");
		       			 $(".focus").removeClass("addfocus");
		       			 isFollow=false;
		       			sendToFocusState(uids,0,0);
		                                       });

			}else if(isFollow==false){
				QqwUtil.ajaxData('get', BackendApiFocus, fuid,(data) => {
		       			QqwUtil.msg("关注成功",true);
		       			$(".focustext").html("已关注");
		       			$(".focus").addClass("addfocus");
		       			isFollow=true;
		       			sendToFocusState(uids,1,0);
		                                       });
			}
		});
		this.chat = function(event) {
			var u = navigator.userAgent;
		            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		            var isweixin=u.indexOf('MicroMessenger') > -1;//微信终端
			if(isweixin){
		               self.ajaxData('get', '/butler-article/islogin', null, function(data){
				window.location.href='/app-message/pm?uid='+uids;
			            return ;
		                        });
		            }else{
		            	self.ajaxData('get', '/butler-article/islogin', null, function(data){
				Global.sendToPrivateMsg(uids,uname);
			            return ;
		                        });
		            }
		}

		function sendToFocusState(uids,state,count){
			if(QqwUtil.getPlatform()=='ios'){
                    sendFocusState(uids,state,count);
			}else if(QqwUtil.getPlatform()=='android'){
                    window.JSInterface.sendFocusState(uids,state,count);
			   }
		}
	</script> 
</info-b>