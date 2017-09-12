<qqwhead>
<!-- <div class="qqw_head_box">
    <div class="qqw_head">
            <ul class="swiper-wrapper  header_ul" >
               <li class="swiper-slide header_li   { header_lpdq: done }"  data-id={index}  onclick={ switch_head }  each="{value, index in opts.categoryArr}"  >{value.cateName} </li>
            </ul>
    </div>
</div> -->
<div class="qqw_special_head">
       <div class="head_fix" >
             <div class="head_cto" each="{value, index in opts.categoryArr}" onclick={ switch_head }>
                     <img class="head_img" src="{value.bg}">
                     <p class="head_p">{value.cateName} </p>
              </div>
       </div>
</div>


    <script>    
            this.mixin('util');
            this.mixin('event'); 
             let self = this,liArray=[];
            this.on('mount',()=>{
            liArray=self.root.getElementsByClassName('head_cto');
            changeStatue(0); 
            })
            this.switch_head = (e)=>{
                     let index=e.item.index;
                     self.trigger('switch_change',{'index':index})
                     changeStatue(index);
            };
            function changeStatue(index){
                     let length=liArray.length;
                     for (var i = length - 1; i >= 0; i--) {
                     liArray[i].style.opacity='0.5';
                     }
                     liArray[index].style.opacity='1';
            }
    </script>
</qqwhead>