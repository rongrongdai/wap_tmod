<qqwhead>
         <div class="qqw_head_content" style="background:{opts.colorlist.qian}">
           <div class="item" data-index='0' onclick="{switch_head}"><span>保税直邮</span></div>
           <div class="item" data-index='1' onclick="{switch_head}"><span>口碑好货</span></div>
         </div>
    <script>    
    // this.mixin('util');
    // this.mixin('event'); 
     let self = this;
    this.on('mount',()=>{
           self.root.getElementsByClassName('item')[1].style.background=opts.colorlist.shen;
    });
    this.switch_head = (e)=>{
             let index=parseInt(e.currentTarget.dataset.index, 10);
             self.trigger('switch_change',{'index':index})
             let liArray=self.root.getElementsByClassName('item');
             let length=liArray.length;
             for (var i = length - 1; i >= 0; i--) {
             liArray[i].style.background=opts.colorlist.qian;
             }
             liArray[index].style.background=opts.colorlist.shen;
    };
    </script>
</qqwhead>