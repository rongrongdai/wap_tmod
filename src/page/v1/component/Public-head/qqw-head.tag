<qqwhead>
            <div class="qqw_head">
                <div class="swiper-container  sweephead">
                    <ul class="swiper-wrapper  header_ul" >
                       <li class="swiper-slide header_li" data-id={index} onclick={ switch_head } each={value, index in opts.categoryArr}  >{value.cateName} </li>
                    </ul> 
                </div>
            </div>
    <script>    
    this.mixin('util');
    this.mixin('event'); 
     let self = this;
    this.one('mount',()=>{
        // console.log('kkkk');
          var swipers = new  Swiper('.sweephead', {
               slidesPerView: 5,
               paginationClickable: true,
         });
      self.root.getElementsByTagName('li')[0].className+=' logo_shop_celebration';
      $('.logo_shop_celebration').html('');
      var length=self.opts.categoryArr.length;
      for (var i = length - 1; i >= 0; i--) {
             if(self.opts.categoryArr[i].is_choice){
                self.root.getElementsByTagName('li')[i].className+=' header_lpdq';
             }
           }
    });
    this.switch_head = (e)=>{
             let index=e.item.index;
            // if(index!=0&&index!=1){
                window.location.href=opts.categoryArr[index].url;
             // }
             return;
             self.trigger('switch_change',{'index':index})
             let liArray=self.root.getElementsByTagName('li');
             let length=liArray.length;
             for (var i = length - 1; i >= 0; i--) {
             self.root.getElementsByTagName('li')[i].className='swiper-slide header_li';
             }
             self.root.getElementsByTagName('li')[index].className+=' header_lpdq';
             changeState(index);
    };
    // self.on('switch_change_state',(data)=>{
    //          let index=parseInt(data.index);
    //          // console.log('on index:'+parseInt(data.index));
    //          let liArray=self.root.getElementsByTagName('li');
    //          let length=liArray.length;
    //          for (var i = length - 1; i >= 0; i--) {
    //          self.root.getElementsByTagName('li')[i].className='swiper-slide header_li';
    //          }
    //          self.root.getElementsByTagName('li')[index].className+=' header_lpdq';
    //         changeState(index);
    //  });

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
    </script>
</qqwhead>