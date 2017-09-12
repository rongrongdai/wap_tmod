import { BackendApiRegister } from 'BackendApi';
<entityCard>
    <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>实体卡</div>
        <div class="top_as"></div>
     </header>
     
     <div class="content_entit">
          <img class="card_img"  src="{opts.picture}"  />
     </div>

     <div class="conte_contr">
           <p class="livey"><span>{opts.card_name}</span>  <span class="let">¥{opts.amount}元面值</sapn>  <span class="let">{opts.card_type}</span></p>
           <p class="livet">{opts.card_desc}</p>
           <p class="lives">4.26周年庆火热开启。</p>
     </div>

     <div class="conte_contw">
           <p class="fl lef">积分:{opts.score} </p>
           <p class="fr righ">点击查看积分可换<span class="imgs"></span></p>
     </div>

     <div class="conte_contw">
           <p class="fl lef">领取地址</p>
           <p class="fr righ">点击查看<span class="imgs"></span></p>
     </div>


     <div class="cont_tail">
           <div class="ta_left">立即购买</div>
           <div class="ta_righ">转赠他人</div>
     </div>
<script>
      
</script>
</entityCard>