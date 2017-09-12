<orderProblem>
   <!--  <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>{title}</div>
        <div class="top_as"></div>
     </header> -->
     

  
       <div class="page_link">

    <!--  订单问题 -->
         <div class="or_question"   if="{ type==0}">
              <p class="page_cor">
                  <span>取消订单</span>
                  <b class="bottom" data-id='0'   onclick={bottom}   if={flag[0]}><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                  <b class="top" data-id='0'   onclick={bottom}  if={!flag[0]}><i class="top-arrow1"></i><i class="top-arrow2"></i></b>
              </p>

               <div class="page_p" if={flag[0]}>
                   <p>1.下单后12小时内“待发货”状态下会员可取消订单。取消订单可
                   拨打您的私人管家电话或拨打全球蛙客服电话400-6516-838，
                   服务时间09:00-18:00。</p>
                   <p>2.商品发货后，会员需要取消订单，可拨打您的私人管家电话，
                   或者拨打全球蛙客服电话400-6516-838。取消订单后需会员拒
                   收，若正常签收，则取消退款。</p>
                   <p>3.全球蛙客服收到客户取消未发货订单后3-5个工作日内退款至
                   客户付款账户，节假日顺延。</p>
                   <p>4.全球蛙客服收到客户取消已发货订单，确认收到退货后3-5个
                   工作日内退款至客户付款账户，节假日顺延。</p>
               </div>

              <p class="page_cor">
                  <span>退款须知</span>
                   <b class="bottom" data-id='1'   onclick={bottom}   if={flag[1]}><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                  <b class="top" data-id='1'   onclick={bottom}  if={!flag[1]}><i class="top-arrow1"></i><i class="top-arrow2"></i></b>
              </p>

              <div class="page_p"  if={flag[1]}>
                   <p>1.参加平台活动的订单，整单取消订单，退款按实际支付金额退
                         款。订单中部分产品退货，则按照活动的比例或者活动时实际收
                         取的此产品的金额进行退款。
                   </p>
             </div>


               <p class="page_cor">
                  <span>修改收货人/联系方式</span>
                   <b class="bottom" data-id='2'   onclick={bottom}   if={flag[2]}><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                  <b class="top" data-id='2'   onclick={bottom}  if={!flag[2]}><i class="top-arrow1"></i><i class="top-arrow2"></i></b>
               </p>

              <div class="page_p"  if={flag[2]}>
                   <p>1.订单状态在“待发货”时，您可拨打您的私人管家电话，或者拨
                   打公司客服电话400-6516-838修改地址/电话。</p>
                   <p> 2.商品发货后，则不可修改地址/电话。</p>
              </div>

          </div>


    <!--  退货问题 -->
            <div class="return_q"   if="{ type==1}">
                  <p class="page_cor">
                     <span>七天无理由退货条件</span>
                        <b class="bottom" data-id='0'   onclick={bottom}   if={flag[0]}><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        <b class="top" data-id='0'   onclick={bottom}  if={!flag[0]}><i class="top-arrow1"></i><i class="top-arrow2"></i></b>
                  </p>
                  <div  class="page_p page_h"  if={flag[0]}>
                        <h2>买家提出“七天无理由退货”服务申请的条件：</h2>
                        <p>1.买家在签收商品之日起七天内（按照物流签收后的第二天零
                        时起计算时间,满168小时为7天）发起申请；</p>
                        <p>2.申请金额仅以买家实际支付的商品价款为限；</p>
                        <p>3.买家退的货物不得影响商家的二次销售，详情见售后总则。</p>

                       <h2>全球蛙支持七天无理由退货，但以下情况将不予办理退货：</h2>
                       <p>1.非全球蛙出售的商品（序列号不符）；</p>
                       <p>2.签收次日算起超过7天；</p>
                       <p>3.未经授权的维修、误用、碰撞、疏忽、滥用、进液、事故、
                        改动、不正确的安装所造成的商品质量问题，或撕毁、涂改
                        标贴、机器序号、防伪标记；</p>
                       <p>4.配件、赠品、发票等不齐全的；</p>
                       <p>5.基于安全及健康考虑，已拆封的食品、药品、保健品、化妆
                       品、贴身用品等；</p>
                       <p>6.已经激活的手机、电脑、数码产品等；</p>
                       <p> 7.礼包或者套装中商品不可以部分退换货；</p>
                       <p>8.法律法规中规定的不可退货的商品，详情见售后总则。</p>
                  </div>
                  <p class="page_cor">
                     <span>退货运费说明</span>
                        <b class="bottom" data-id='1'   onclick={bottom}   if={flag[1]}><i class="bottom-arrow1"></i><i class="bottom-arrow2"></i></b>
                        <b class="top" data-id='1'   onclick={bottom}  if={!flag[1]}><i class="top-arrow1"></i><i class="top-arrow2"></i></b>
                  </p>
                    <div class="page_p" if={flag[1]}>
                        <p>全球蛙承诺提供7天无理由退货服务的商品，买家以无理由形式
                         退货或拒签的，由买家承担退货运费。</p>
                       <p>如果是商品质量问题、物流破损问题，或者收到的货物与网上描
                         述不符而导致的退货，退货费用则由全球蛙承担。</p>
                    </div>
            </div>
           
  

  <!--  售后总则 -->
           <div class="qeneral"  if="{ type==2}">
                 <div class="page_q">
                      <span class="kua">Q</span>全球蛙售后总则
                 </div>

                 <div class="customer_yi">
                     <h2>各位尊敬的全球蛙用户：</h2>
                     <p class="spag">近日，国家工商总局公布《网络购买商品七日无理由退货暂行
                           办法》，根据《办法》中的规则，现对《全球蛙7天无理由退货
                           规则》进行更新，明确了适用范围、商品完好标准等细节。本规
                           则于2017年3月15日正式生效。</p>
                 </div>

                <div class="customer_yi">
                 <p>全球蛙</p>
                 <p>2017年3月15日</p>
                 <h2>全球蛙七天无理由退货规则</h2>
                 </div>

                 <div  class="customer_yi">
                     <h2>第一章  概述</h2>
                        <p>第一条  为保证买卖双方合法权益，保证全球蛙正常的交易秩序，
                        根据《消费者权益保护法》、工商总局《网络购买商品七日无理
                        由退货暂行办法》等相关法律法规及全球蛙规则的要求，制定本
                        规则。</p>
                        <p>第二条 买家购买全球蛙出售的商品，依法享有七天无理由退货的
                        权利。退货商品若满足退货条件，卖家有义务向买家提供退货服
                        务。</p>
                 </div>

                 <div  class="customer_yi">
                    <h2>第二章  申请条件</h2>
                             <p>第三条  买家申请7天无理由退货条件</p>
                             <p class="yi_y">1、买家的申请符合国家相关法律法规的规定。</p>
                             <p class="yi_y">2、买家应当在签收商品次日起七天内发起申请。</p>
                             <p class="yi_y">3、买家退货时应将商品本身、配件及赠品一并寄回，赠品包
                                      括赠送的实物、优惠券等形式。赠品遗失、破损的不影响原商
                                      品退还，赠品破损或遗失买家可以和卖家协商处理，协商不能
                                      达成一致的，卖家可以要求买家按不超过在售市场价的价格支
                                      付赠品价款。</p>
                             <p class="yi_y"> 4、退货商品如开具发票，发票需一并寄回，如发票遗失，相
                                      应退税点由买家承担。</p>
                             <p class="yi_y"> 5、符合本规则第四条“不适用退货的商品范围”和第五条“商品
                                      完好标准 ”的规定。</p>
                             <p>第四条  不适用退货的商品范围</p>
                                     <p class="yi_y">1、下列商品不适用七日无理由退货规定：</p> 
                                                    <p class="yi_er">（1）消费者定作的商品；</p>
                                                    <p class="yi_er">（2）鲜活易腐的商品；</p>
                                                    <p class="yi_er">（3）在线下载或者消费者拆封的音像制品、计算机软件等数
                                                              字化商品； </p>
                                                    <p class="yi_er">（4）交付的报纸、期刊。</p>
                                      <p class="yi_y">   2、下列性质的商品经买家在购买时确认，可以不适用七日无
                                                          理由退货规定： </p>
                                                    <p class="yi_er">（1）拆封后易导致商品品质改变、影响人身安全或者生命健
                                                              康的商品； </p>
                                                     <p class="yi_er">（2）一经激活或者试用后价值贬损较大的商品；</p>
                                                     <p class="yi_er">（3）销售时已明示的临近保质期的商品、有瑕疵的商品。</p>
                                <p>第五条  商品完好标准</p>
                                       <p class="yi_y">1、买家退回的商品应当完好。</p>
                                                      <p class="yi_er">（1）商品能够保持原有品质、功能，商品本身、配件、商标
                                                        标识等齐全的，视为商品完好；</p>
                                                       <p class="yi_er">（2）买家基于查验需要而打开商品包装，或者为确认商品的
                                                        品质、功能而进行合理的调试不影响商品的完好。</p>
                                         <p class="yi_y"> 2、对超出查验和确认商品品质、功能需要而使用商品，导致
                                              商品价值贬损较大的，视为商品不完好。具体判定标准如下：</p>
                                                        <p class="yi_er">（1）食品（含保健食品）、化妆品、医疗器械、计生用品、
                                                          办公耗材、汽车耗材类：必要的一次性密封包装被损坏；</p>
                                                         <p class="yi_er">（2）电子电器类：进行未经授权的维修、改动，破坏、涂改
                                                          强制性产品认证标志、指示标贴、机器序列号等，有难以恢
                                                          复原状的外观类使用痕迹，或者产生激活、授权信息、不合
                                                          理的个人使用数据留存等数据类使用痕迹；</p>
                                                         <p class="yi_er">（3）服装、鞋帽、箱包、玩具、家纺、家居类：商标标识被
                                                          摘、标识被剪，商品受污、受损，商品原厂密封包装或封签
                                                          被拆封、移位、撕毁等。</p>
                 </div>

                 
               <div  class="customer_yi">
                     <h2>第三章  具体要求</h2>
                          <p>第六条  7天自买家签收商品的次日开始计算；如物流信息不完
                                整，则7天退货时间从确认收货后次日开始计算，物流时间以物
                                流公司物流系统传递的时间/物流签收单时间为准。</p>
                         <p> 第七条  运费处理的原则，由买家发起的7天退货申请，买家承担
                                来回运费；如商品为卖家包邮商品，买家只需要承担退货运费。</p>
                          <p>第八条  卖家可以与买家约定退货方式，但不应当限制买家的退
                          货方式。未经双方同意，不得以到付的方式退货。</p>
              </div>

             <div  class="customer_yi">
                  <h2>第四章  退货程序</h2>
                   <p>  第九条 7天无理由退货流程</p>
                          <p class="yi_y">1、在满足本规则第二章申请条件的前提下，买家在“我的订
                                单”页面中提交申请或者拨打全球蛙客服电话400-6516-838
                                提交申请。</p>
                          <p class="yi_y">2、在买家发起退货申请后，卖家需在7个自然日内处理该请
                          求，如卖家没有人为介入处理该请求的，系统将在期满时默认
                          同意买家的申请。</p>
                          <p class="yi_y">3、卖家收到退货通知后应当在48小时内向买家提供真实、准
                          确的退货地址、退货联系人、退货联系电话等有效联系信息。
                          买家获得上述信息后应当及时退回商品，并保留退货凭证。</p>
                          <p class="yi_y">4、买家退回的商品完好的，卖家应当在收到退回商品之日起
                          48小时内同意退款。</p>
             </div> 


           </div>




       </div>

<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
      let type;
      this.title='订单问题';
      //点击收起
      this.flag=[false,false,false];
     self.bottom = function(event) {
             self.flag[parseInt(event.currentTarget.dataset['id'])]=!self.flag[parseInt(event.currentTarget.dataset['id'])];
             self.update({flag:self.flag});
    };



function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
this.type=getQueryStrings("type");
type=getQueryStrings("type");
// if (type==0) {

//    this.title='订单问题';
// }
// if (type==1) {
//    this.title='退货问题';
// }
// if (type==2) {
//    this.title='售后总则';
// }


</script>
</orderProblem>