import { BackendApiBindButler} from 'BackendApi';	
<info-tag>
	<section class="article-leadingcard-layout">
			<!-- <div class="video_box">
				<video controls="controls" autoplay="autoplay" onclick={play}  id="video"  poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfAAAAEeCAYAAAB14kcUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJBMDAzNkIyQzY2MDExRTZBOTdCRTQzMzg5RTUyRTk0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJBMDAzNkIzQzY2MDExRTZBOTdCRTQzMzg5RTUyRTk0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkEwMDM2QjBDNjYwMTFFNkE5N0JFNDMzODlFNTJFOTQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkEwMDM2QjFDNjYwMTFFNkE5N0JFNDMzODlFNTJFOTQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5mZQBKAAADrUlEQVR42uzVQREAAAjDMMC/56Fjd4mEfrpJBgDochIAgIEDAAYOABg4ABg4AGDgAICBA4CBAwAGDgAYOAAYOABg4ACAgQMABg4ABg4AGDgAYOAAYOAAgIEDAAYOAAYOABg4AGDgAGDgAICBAwAGDgAYOAAYOABg4ACAgQOAgQMABg4AGDgAGDgAYOAAgIEDgIEDAAYOABg4AGDgAGDgAICBAwAGDgAGDgAYOABg4ABg4ACAgQMABg4ABg4AGDgAYOAAgIEDgIEDAAYOABg4ABg4AGDgAICBA4CBAwAGDgAYOABg4ABg4ACAgQMABg4ABg4AGDgAYOAAYOAAgIEDAAYOAAYOABg4AGDgAICBA4CBAwAGDgAYOAAYOABg4ACAgQOAgQMABg4AGDgAGDgAYOAAgIEDAAYOAAYOABg4AGDgAGDgAICBAwAGDgAGDgAYOABg4ABg4ACAgQMABg4AGDgAGDgAYOAAgIEDgIEDAAYOABg4ABg4AGDgAICBAwAGDgAGDgAYOABg4ABg4ACAgQMABg4ABg4AGDgAYOAAYOAAgIEDAAYOABg4ABg4AGDgAICBA4CBAwAGDgAYOAAYOABg4ACAgQOAgQMABg4AGDgAYOAAYOAAgIEDAAYOAAYOABg4AGDgAGDgAICBAwAGDgAGDgAYOABg4ACAgQOAgQMABg4AGDgAGDgAYOAAgIEDgIEDAAYOABg4AGDgAGDgAICBAwAGDgAGDgAYOABg4ABg4ACAgQMABg4ABg4AGDgAYOAAgIEDgIEDAAYOABg4ABg4AGDgAICBA4CBAwAGDgAYOAAYOABg4ACAgQMABg4ABg4AGDgAYOAAYOAAgIEDAAYOAAYOABg4AGDgAGDgAICBAwAGDgAYOAAYOABg4ACAgQOAgQMABg4AGDgAGDgAYOAAgIEDAAYOAAYOABg4AGDgAGDgAICBAwAGDgAGDgAYOABg4ABg4ACAgQMABg4AGDgAGDgAYOAAgIEDgIEDAAYOABg4ABg4AGDgAICBA4CBAwAGDgAYOABg4ABg4ACAgQMABg4ABg4AGDgAYOAAYOAAgIEDAAYOAAYOABg4AGDgAICBA4CBAwAGDgAYOAAYOABg4ACAgQOAgQMABg4AGDgAGLgEAGDgAICBAwAGDgAGDgAYOABg4ABg4ACAgQMABg4ABg4AGDgAYOAAgIEDgIEDAAYOABg4ABg4AGDgAICBA4CBAwAGDgAYOAAYOABg4ACAgQMABg4AzV4AAQYAFWMFOcfaO7UAAAAASUVORK5CYII="  class="video" style="background:url({opts.video_pic}) no-repeat; background-size:100% 100%;">
				     <source src="{opts.video_url}"  type="video/mp4">
				</video> 
			</div> -->
			<div class="banner-box">                                                                                                                                                            
					<img class="bg" src="{opts.bgurl}"></img>
					<span class="article-leadingcard-item-face-container"></span>
					<img class="article-leadingcard-item-face" src="{opts.face}"></img>
					<div class="project-title">
						<div class="userb-info">
							<span  class="userb-name">{ opts.nickname }</span>
						</div>
						<div class="level">
								<div class="uncheckstar starbox">
									<div class="star_box">
										<div class="star"></div>
										<div class="star"></div>
										<div class="star"></div>
										<div class="star"></div>
										<div class="star"></div>
									</div>
								</div>
								<div class="checkstar starbox " if='{opts.level==1}'>
									<div class="star_box">
									     <div class="star"></div>
									 </div>
								</div>
								<div class="checkstar starbox" if='{opts.level==2}'>
									     <div class="star_box">
									              <div class="star"></div>
									              <div class="star"></div>
									      </div>
								</div>
								<div class="checkstar starbox" if='{opts.level==3}'>
									     <div class="star_box">
									     	<div class="star"></div>
									              <div class="star"></div>
									              <div class="star"></div>
									      </div>
								</div>
								<div class="checkstar starbox" if='{opts.level==4}'>
									     <div class="star_box">
									              <div class="star"></div>
									              <div class="star"></div>
									              <div class="star"></div>
									              <div class="star"></div>
									      </div>
								</div>
								<div class="checkstar starbox" if='{opts.level==5}'>
									     <div class="star_box">
									              <div class="star"></div>
									              <div class="star"></div>
									              <div class="star"></div>
									              <div class="star"></div>
									              <div class="star"></div>
									      </div>
								</div>
					           </div>
						<!-- <p class="b-work">[ 产品体验官 ]</p> -->
						<p class="signature">你正好需要，而我一直都在</p>
						<p class="contact_box">
							<a class="choose"  onclick={prompt}>选TA</a>
						</p>
					</div>
			</div>
			 <div class="massge">
			       <p class="massge_con">{ opts.butler_desc }</p>
			       <p class="userb_listnum">
                                                      <span class="listnum">- 签名 -</span>
                                             </p>
                                    </div>

	</section>
	<script>
		// 引入 mixin
		this.mixin('util');
		this.mixin('event');
		let self = this;
		this.prompt = function(event) {
			let gjid=opts.butler_id;
			let butlerid='?butler_id='+ gjid;
			self.ajaxData('get', '/butler-article/islogin', null, function(data){
				self.ajaxData('get', BackendApiBindButler,butlerid, (data) => {

	 				//self.msg("成功选择管家！",5);
					location.href='/app-main';				
			              });
			            return ;
		            });
 			
		};
		this.play = function(event) {
			let video=document.getElementById("video");
			video.play();
		};
	</script>
</info-tag>