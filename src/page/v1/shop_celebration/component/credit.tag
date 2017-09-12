import { BackendApishareget } from 'BackendApi';
<credit>
   <div each="{ opts.list }">

    <div class="credit_all" if="{get_state ==1 || get_state ==2}">
         
          <div class="nickname" if="{type==2}">
                  <img class="nick_img"  src="{face}"  />
                  <span class="nick_name">{nickname}</span>
          </div>

          <div class="c_left">
               <img class="le_img"  src="{picture}"  />
          </div>
          <div class="c_center">
               <p>{card_type}</p>
               <p  if="{ type==1 || type==3}">领取码:{get_code }</p>
               <p class="tes" if="{get_state ==1}">线上已领取</p>
               <p class="tes" if="{get_state ==2}">线下已领取</p>
          </div>
          <div class="c_right">
                <p class="colr">¥{card_amount}</p>
          </div>
    </div>
</div>
   






<script>
       this.mixin('util');
       this.mixin('event');
       console.log('opts.list:'+opts.list);
      


 
</script>
</credit>