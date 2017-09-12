<pe-letter>
       <div class="letter_content" each={opts.item}>
	 <div class="letter_conleft"  if="{ isSelf == 0}" >
                  <p class="cont_p">{dateline} </p>
                  <div class="cont_con">
                          <img class="cont_img" src="{sface}">
                          <div class="cont_chat">
                          <p class="p_sjx"></p>
                          <p class="p_cont">{content}</p>
                      </div>
                  </div>
            </div>


            <div class="letter_conright" if="{ isSelf == 1 }" >
                  <p class="cont_p">{dateline}  </p>
                  <div class="cont_con">
                      <div class="cont_chat">
                          <p class="p_cont">{content}</p>
                           <p class="p_sjx"></p>
                      </div>
                       <img class="cont_img" src="{sface}">
                  </div>
            </div>
 </div>

 <script>
      this.mixin('util');
      this.mixin('event');

      let self=this;
      //console.log('opts.item:'+opts.item);
 </script>
</pe-letter>