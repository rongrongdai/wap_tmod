<!-- import'../component/button/choicemgerall.tag'; -->
import'../component/button/choicemger.tag';
<chomger>
        <!-- <div class="maer_top"></div> -->
        <!-- <div class="maer_topbg" if='{opts.index==1}'></div> -->
      <video  class="maer_contentbg video" controls="controls" autoplay="autoplay" onclick={play} webkit-playsinline  id="video"  poster="http://7xp9qs.com1.z0.glb.clouddn.com/587f44788d6f2.jpg" webkit-playsinline=""  style="width: 100%;background-size: 100% !important;" 
      if='{opts.index==1}'>
      <source src="http://7xp9qs.com1.z0.glb.clouddn.com/butler2.0.mp4"  type="video/mp4" if='{opts.index==1}'>
      </video> 
       <div class="maer_brief" if='{opts.index==1}'>
            <p>深访工厂甄选优质良品</p>
            <p>精耕专栏分享产品体验</p>
  
            <p class="tesu">他们是</p>
              <p>生活美学的传递者</p>
              <p>贴心客服&私人管家</p>
            <!-- <p class="tesu">为你品质生活而来</p> -->
            <p class="tesu">他们</p>
              <p>为你品质生活而来</p>
              <p>一起见证中国质造的力量</p>
        </div>
        <h2 class="homepage-headline" id='scrollHereId2' if='{opts.index==0}'>
            <a class="homepage-headline-title"   href="/mobile-topic-main/index">- 达人推荐 -</a>
        </h2>
        <div class="maer_sub">
                  <choicemger item={opts.chooseList} ></choicemger>
           <!-- <choicemgerall   list={opts.chooseList}></choicemgerall> -->
        </div>
        <!-- <a if='{opts.index==1}' href="https://jinshuju.net/f/ew9Z9L"><div class="maer_tailbg"></div></a> -->
        <a if='{opts.index==1}'><div class="maer_tailbg"></div></a>
        <script>
        // 引入 mixin
        this.mixin('util');
        this.mixin('event');
        let self = this;
        this.play = function(event) {
            let video=document.getElementById("video");
            video.play();
        };
        self.on('update',()=>{
             self.vedioUrl =  isIos() ? 'http://7xp9qs.com1.z0.glb.clouddn.com/butler.mp4' : 'http://7xp9qs.com1.z0.glb.clouddn.com/butler2.0.mp4';
             self.autoplay =  isIos() ? '' : 'autoplay';
        })
        function isIos(){
          return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }
    </script>
</chomger>







