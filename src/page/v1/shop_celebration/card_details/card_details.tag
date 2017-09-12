import { BackendApiGetentCardDetail } from 'BackendApi';
import '../component/credit.tag';
import { BackendApishareget} from 'BackendApi';   // 后台api接口文件
<cardDetails>
 <!--    <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>卡片详情</div>
        <div class="top_as"></div>
     </header> -->
     
     
     <div class="card_all">
              <div class="credit_all"  if="{!(opts.card_number !=0 && opts.type==2) }">
                
                  <div class="c_left">
                       <img class="le_img"  src="{opts.picture}"  />
                  </div>
                  <div class="c_center">
                       <p>{opts.card_type}</p>
                        <p class="colr" style="color: #ab2b2b" >¥{opts.card_amount}</p>
                  </div>
             </div>

                     <!--   未领取的卡 -->
          <div class="credit_all" if="{opts.card_number !=0  && opts.type==2}">
                  <div class="c_left">
                       <img class="le_img"  src="{opts.picture}"   />
                  </div>
                  <div class="c_center">
                       <p>{opts.card_type}</p>
                       <p class="t_coy">¥{opts.card_amount}</p>
                       <p class="t_coy">未领取x {opts.card_number}</p>
                  </div>
                  <div class="c_righty" onclick={donations}>
                        <p class="colr">转赠他人</p>
                  </div>
            </div>

             <credit  list="{ opts.list }"></credit>

         <!--  -->
         
         <div class="card_conw"  if="{ opts.type==1 || opts.type==2}">
                   <div class="cdconw">
                          <div class="cona">
                             <p class="fl">卡片面额</p>
                             <p class="fr">¥{opts.card_amount }</p>
                          </div>
                          <div class="cona">
                             <p class="fl">积分</p>
                             <p class="fr">{opts.score}</p>
                          </div>
                          <div class="cona">
                             <p class="fl">商品数量</p>
                             <p class="fr">{opts.quantity}张店庆卡</p>
                          </div>
                          <div class="cona">
                             <p class="fl">实付</p>
                             <p class="fr tes">¥{opts.order_amount}</p>
                          </div>
                   </div>

                   <p class="con_jf">说明:积分会记录在您的账户，不会连同卡赠送他人</p>
                 
               <div class="cdconter">
                   <p>订单编号:{opts.order_sn}</p>
                   <p>下单时间:{opts.order_time }</p>
                   <p>付款时间:{opts.pay_time }</p>
                   <!-- <p>领取时间:{opts.get_time}</p> -->
               </div>
        </div>

      <!--  -->

       
       <div class="ca_give"   if="{opts.type==3}">
               <div class="cona">
                              <p class="fl">订单编号:</p>
                              <p class="fr">{opts.order_sn}</p>
                </div>
                <div class="cona">
                             <p class="fl">赠送人</p>
                             <p class="fr">{opts.nickname}</p>
                 </div>
                 <div  class="cona">
                     <p>赠言</p>
                 </div>
                  <div  class="cona">
                     <p>{opts.message}</p>
                 </div>
        </div>


       <div class="cd_customer">
            <div  class="cona">
                  <p class="fl phone"  onclick={phones}><span></span>电话客服</p>
                  <p class="fr time">服务时间:9:00 - 18:00</p> 
            </div>
       </div>

     </div>


     <div class="codebg">
        <div class="code">
            <div class="codeimg">
                <span class="share-img"></span>
            </div>
            <div class="closebtn"  onclick={closebtn}></div>
        </div>
</div>


<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
      //点击打电话
     self.phones = function(event) {
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                var isweixin=u.indexOf('MicroMessenger') > -1;//微信终端
                if(isweixin){
                       window.location.href='tel://400-6516-838';                 
                }else if(isiOS){
                     callPhone("400-6516-838");                       
                }else if(isAndroid){
                    window.JSInterface.callPhone("400-6516-838");
                                      
               }
    };


       self.donations= function(event) {
             $('.codebg').show();
       };
     self.closebtn= function(event) {
            $('.codebg').hide(); 
       };

</script>
</cardDetails>