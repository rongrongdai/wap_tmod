import '../component/recommend-card.tag';
<!-- import '../../component/women-day/qqw-women-good-goods.tag'; -->
<homepage>

  <div style="background-color: white;">
    <div class="head">
<!--        <div class="qqw_goods_content">
            <div class="box hide-box">
                 <a href="{opts.top_list[0].url}"><img class="item" src={opts.top_list[0].pic}></a>
                <div class='right-box'>
                    <a href="{opts.top_list[1].url}"><img class="item" src={opts.top_list[1].pic}></a>
                    <a href="{opts.top_list[2].url}"><img class="item" src={opts.top_list[2].pic}></a>
                </div>
            </div>
        </div> -->
        <div>
          <div class="goodslist-box" each={ value,index in opts.brandArr}>
<!--             <div id={speclife.id}  class="title dom_location">
             <span>{speclife.title}</span>
            </div> -->
            <div class="line" if={index != 0}></div>
            <recommend-card speclife={value.speclife}></recommend-card>
<!--             <div class="type-banner">
                 <img src="http://7xp9qs.com1.z0.glb.clouddn.com/580747ac23b77.jpg">
            </div> -->
<!--             <goods-list class="goodslist" goodslist = {brand}></goods-list> -->
          </div>
        </div>
    </div>
  <div class="return_head" id='rtt'  onclick={jumptop}></div>
  </div>
  <script>
    // 引入 mixin
    this.mixin('util');
    this.mixin('event');
    let self=this;
  //点击回到顶部

    this.on('update', () => {
         let self = this;
         if(self.getOptArticleList()){
          console.log(self.getOptArticleList().toString());
        self.opts.brandArr=self.opts.brandArr.concat(self.getOptArticleList());
         }
      });
    self.jumptop = function(event) {
          window.scrollTo(1,0);
    };
  </script>
</homepage>