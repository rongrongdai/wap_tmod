<croupProblem>
<!--     <header>
        <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>{title}</div>
        <div class="top_as"></div>
     </header> -->
     

  
<div class="page_link">

    <!--  关于拼团 -->
          <div class="or_question"   if="{ type==0}">
                <div class="page_q">
                      <span class="kua">Q</span>什么是蛙拼团
                 </div>
                 <p class="problemP">
                   蛙拼团是全球蛙推出2人拼单购买的团购活动，通过拼团的买家可以享受比一般网购更低的折扣。
                 </p>
                 <div class="page_q">
                      <span class="kua">Q</span>怎样算拼团成功？
                 </div>
                 <p class="problemP">
                      每个团的有效期为24小时，买家发起拼团后24小时内找到规定人数参加拼团，即可算拼团成功
                 </p>
                   <div class="page_q">
                      <span class="kua">Q</span>如果拼团失败，怎么处理？
                 </div>
                 <p class="problemP">如果24小时内没有凑足指定人数，系统会自动发起退款申请，款项将原路径返回，货款将会在1-3个工作日内到账，具体到账时间则以各银行为准。
                 </p>
          </div>


    <!--  退货问题 -->
            <div class="return_q"   if="{ type==1}">
                 <div class="page_q">
                      <span class="kua">Q</span>关于售后
                 </div>
                     <p class="problemP">退换规则是，商品不影响二次销售，七天无理由退换，运费由用户承担，有质量问题的退换运费由平台承担。
                     </br>退款金额按照当时实际付款金额退回。
                     </br>破坏包装影响二次销售的不予退换。</p>
            </div>
           
  

  <!--  售后总则 -->
           <div class="qeneral"  if="{ type==2}">
                 <div class="page_q">
                      <span class="kua">Q</span>全球蛙售后总则
                 </div>
                 <p class="problemP">1.点击"去参团"或是"多人团",参与全球蛙拼团优惠活</p>
                 <img class="problemImg" src="/static/css/product_funding/funding/app_img/croup_prb1.png" >
                 <p class="problemP">2.付款成功之后可邀请朋友参团来完成此次拼团活动</p>
                 <div class="pro_imga">
                      <img class="problemIe fl" src="/static/css/product_funding/funding/app_img/croup_prb2.png" >
                      <img class="problemrih fr" src="/static/css/product_funding/funding/app_img/croup_prb3.png" >
                 </div>

        </div>
</div>

<script>
      this.mixin('util');
      this.mixin('event');
      let self = this;
    
function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
this.type=getQueryStrings("type");

</script>
</croupProblem>