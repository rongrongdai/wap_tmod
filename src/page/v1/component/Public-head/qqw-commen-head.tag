<qqwhead>
<!-- <div class="qqw_head_box">
    <div class="qqw_head">
            <ul class="swiper-wrapper  header_ul" >
               <li class="swiper-slide header_li   { header_lpdq: done }"  data-id={index}  onclick={ switch_head }  each="{value, index in opts.categoryArr}"  >{value.cateName} </li>
            </ul>
    </div>
</div> -->
<div class="qqw_special_head" style="display:{displayEable}">
       <div class="head_fix" style="opacity:{opacityCount}">
              <div class="head_cto  head_cto_{categoryArrLength}_cow" each="{value, index in opts.categoryArr}" onclick={ switch_head }>
                     <p class="head_cto_name {choose_line:index==0} {line:index!=0}">{value.cateName} </p>
              </div>
       </div>
</div>


    <script> 
            this.mixin('util');
            this.mixin('event'); 
             let self = this,liArray=[];
             this.autoScroll=2;
             this.opacityCount=0,this.displayEable='none';
             let i=100;
            this.on('update',()=>{
                   this.categoryArrLength=opts.categoryArr.length.toString();
            }) 
            this.on('mount',()=>{
            liArray=self.root.getElementsByClassName('head_cto_name');
            changeStatue(0); 
            })
            this.switch_head = (e)=>{
                     let index=parseInt(e.item.index);
                     // if(index==3){
                     //  window.location.href='/mobile-topic-main/index?type=0';
                     //  return;
                     // }
                     self.trigger('switch_change',{'index':index})
                     changeStatue(index);
                    if(self.autoScroll==2){
                      // $("body").scrollTo({toT:self.opts.categoryArr[index].point}); 
                       // window.scrollTo(100,self.opts.categoryArr[index].point);
                       let scrollHereId='scrollHereId'+index;
                       if(!document.getElementById(scrollHereId)){
                        return;
                       }
                       document.getElementById(scrollHereId).scrollIntoView();
                       scrollBy(0,-100);
                    }
                      i=i+100;
            };
            function changeStatue(index){
                     let length=liArray.length;
                     for (var i = length - 1; i >= 0; i--) {
                     liArray[i].className='head_cto_name line';
                     }
                    liArray[index].className='head_cto_name choose_line';

            };
            
            //监听
           self.on('switch_change_state',(data)=>{
             let index=parseInt(data.index);
             changeStatue(index);
            });
            //监听来之首页homePage-nav的指令；
            self.on('scrollPoint',(data)=>{
             let index=parseInt(data.index);
             changeStatue(index);
              // $("body").scrollTo({toT:self.opts.categoryArr[index].point}); 
             // window.scrollTo(100,self.opts.categoryArr[index].point);
            });



           self.on('switch-opacity',(object)=>{
                let opacity=object.opacity;
                self.autoScroll= object.autoScroll||2;
                let displayEable= opacity==0 ? 'none':'block';
                self.update({opacityCount:opacity,displayEable:displayEable});
                });

            $.fn.scrollTo = function(options) {
            var defaults = {
              toT: 90, //滚动目标位置
              durTime: 500, //过渡动画时间
              delay: 2, //定时器时间
              callback: null //回调函数
            };
            defaults.durTime=Math.abs(this.scrollTop()-options.toT)/8;
            var opts = $.extend({},defaults, options),
              timer = null,
              _this = this,
              curTop = _this.scrollTop(), //滚动条当前的位置
              subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
              index = 0,
              dur = Math.round(opts.durTime / opts.delay),
              smoothScroll = function(t) {
                index++;
                var per = Math.round(subTop / dur);
                if (index >= dur) {
                  _this.scrollTop(t);
                  window.clearInterval(timer);
                    self.trigger('scrollEnd');
                    console.log('scrollEnd');
                  if (opts.callback && typeof opts.callback == 'function') {
                    opts.callback();

                  }
                  return;
                } else {
                  _this.scrollTop(curTop + index * per);
                }
              };
            timer = window.setInterval(function() {
              smoothScroll(opts.toT);
            }, opts.delay);

            return _this;
          };


    </script>
</qqwhead>