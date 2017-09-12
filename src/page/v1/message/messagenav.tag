<messagenav>
  <section class="order-nav">
            <div class="qqw_special_head">
               <div class="head_fix">
                      <div class="head_cto checkd" onclick={navbtn}>
                             <span class="head_cto_name">私信</span>
                      </div>
                      <div class="head_cto" id="pingjia" onclick={navbtn}>
                             <span class="head_cto_name">评论</span>
                      </div>
                      <div class="head_cto" id="xitong" onclick={navbtn}>
                             <span class="head_cto_name">系统消息</span>
                      </div>
               </div>
            </div>
  </section>
  <script>
              this.mixin('util');
              let self =this; 
              this.on('updated', () => {
                let self = this;
              });
              this.navbtn = function(event) {
                         let navbtn=$(".head_cto");
                         navbtn.removeClass("checkd");
                         $(event.currentTarget).addClass("checkd");
                          let index=$(event.currentTarget).index();
                         self.trigger('switch_change',{'index':index})
              };
  </script>
</messagenav> 