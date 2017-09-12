
<qqwsub-head>
<!-- <qqwhead></qqwhead> -->
<div class="qqw_head_box">
    <div class="qqw_head">
        <div class="swiper-container  sweephead"  style="background:{opts.colorlist.qian}" >
            <ul class="swiper-wrapper  header_ul">
               <li class="swiper-slide header_li "  data-id={index}  onclick={ switch_head }  each="{value, index in opts.categoryarr}"  >{value.cateName}</li>
     
            </ul> 
        </div>

    </div>
</div>

    <script>    
    // this.mixin('util');
    // this.mixin('event'); 
    let self = this;
    let type='#'+self.opts.category+'choose';
    let changCategoryArr=true;
    this.on('updated',()=>{
         if(changCategoryArr){
             initSwiper();
             changCategoryArr=false;
         }
    });
    // this.on('mount',()=>{
    //   initSwiper();
    // });
    this.on('change-categoryArr',()=>{
           changCategoryArr=true;
    })

    this.switch_head = (e)=>{
             let index=e.item.index;
             self.trigger('switch_change',{'index':index})
             let liArray=self.root.getElementsByTagName('li');
             let length=liArray.length;
             for (var i = length - 1; i >= 0; i--) {
             self.root.getElementsByTagName('li')[i].style.background=opts.colorlist.qian;
             }
             self.root.getElementsByTagName('li')[index].style.background=opts.colorlist.shen;
             changeState(index);
           
    };
    self.on('switch_change_state',(data)=>{
             let index=parseInt(data.index);
             // console.log('on index:'+parseInt(data.index));
             let liArray=self.root.getElementsByTagName('li');
             let length=liArray.length;
             for (var i = length - 1; i >= 0; i--) {
             self.root.getElementsByTagName('li')[i].style.background=opts.colorlist.qian;
             }
             self.root.getElementsByTagName('li')[index].style.background=opts.colorlist.shen;
            changeState(index);
     });

    function changeState(index){
        let scrollLength;
        if(index>1&&index<$('li').length-1){
        scrollLength=-(document.body.clientWidth/6.5)*(index-2)+'px'; 
        }else if(index==1){
           scrollLength='0px'; 
        }
        $('.swiper-wrapper').eq(0).css('-webkit-transition-duration','0.5s');
        $('.swiper-wrapper').eq(0).css('transform','translate3d('+scrollLength+', 0px, 0px)');
    }

    function initSwiper(){
              let length=parseInt(self.opts.categoryarr.length);
              console.log(length);
              let count = length>4 ? 5:length;
              var swipers = new  window.Swiper('.sweephead', {
               slidesPerView: count,
               paginationClickable: true,
         });
       for (var i = length - 1; i >= 0; i--) {
             self.root.getElementsByTagName('li')[i].style.background=opts.colorlist.qian;
             }
       self.root.getElementsByTagName('li')[0].style.background=opts.colorlist.shen;
   }
    </script>
</qqwsub-head>