import '../component/qqw-shop-sub-head.tag';
import {BackendApiGetIntegral,BackendApiGetSms} from 'BackendApi';
<exchange-gift-head>
    <div class="head">
        <img class="banner"  src="{opts.user.banner}"> 
        <!-- <img class="banner"  src="{opts.user.banner}">  -->
        <div class="ac_head">
            <!-- <p class='title'>积分兑换活动页</p> -->
            <div class="hd_left">
                <img src="{opts.user.face}"/>
            </div>
            <div class="hd_right">
                <p>用户名：<span>{opts.user.name}</span></p>
                <p>剩余积分：<span class="core">{core}</span></p>
            </div>
        </div>
        <div class="ac_content">
            <p class="p1">请输入以下信息：</p>
            <ul class="form">
   <!--              <li>
                    <input class=" input_dj" name="card_number" placeholder="请输入购卡单据号/流水号"/>
                </li> -->
                <li>
                    <div>
                        <input class="input_pt" name="mobile_number"  placeholder="请输入礼券绑定的手机号码"/>
                        <input type="button" value="{btnGetSmsName}"  onclick={getSms} disabled="{btnGetSmsDisabled}" class="btn_con yz {btn_con_disabled:btnGetSmsDisabled}" />
                    </div>
                </li>

                <li>
                    <div>
                        <input class="input_pt" name="smsCode" value='{verificationCode}' placeholder="请输入手机验证码"/>
                        <input type="button" value="立即提交"  onclick={getIntegral} disabled="{btnGetIntegralDisabled}" class="btn_con yz {btn_con_disabled:btnGetIntegralDisabled}" />
                    </div>
                </li>
      <!--           <li>
                    <input class="input_dj" name="smsCode"  placeholder="请输入手机验证码"/>
                </li>
                <li>
                    <div class=" sub_mit"><input type="button" value="获取礼券" disabled="{btnGetIntegralDisabled}" onclick={getIntegral} class="btn_con {btn_con_disabled:btnGetIntegralDisabled}" /></div>
                </li> -->
            </ul>
        </div>
        <div class="margin-line"></div>
        <div class="rule-box">
          <p class="title"><span>———— </span>充值兑礼售后规则<span> ————</span></p>
          <p class="content1">全球蛙充值积分兑换规则如下：</p>
          <p class="content1">1.兑换方法</p>
          <p class="content2">积分礼品兑换只接受网上提交，不接受电话或上门等其他方式 
   兑换。</p>
          <p class="content1">2.配送范围</p>
          <p class="content2">兑换礼品为实物礼品，其发送仅限于中国大陆地区，请在兑换礼
   品时根据提示，完整填写真实有效的地址、收件人、联系电话等。</p>
          <p class="content1">3.配送方式</p>
          <p class="content2">兑换礼品为实物礼品，礼品以快递形式发送。</p>
          <p class="content1">4.配送费用</p>
          <p class="content2"> 礼品配送费用由全球蛙承担。</p>
          <p class="content1">5.配送时间</p>
          <p class="content2">礼品在提交兑换后一周内送出，如遇到节假日或缺货情况，配送将相应延期。礼品自发送之日起，一周后仍未收到，请及时联系全球蛙客服400-6516-838。</p>
          <p class="content1">6.取消和更改</p>
          <p class="content2">积分兑换一经确认提交，将不再接受取消或更改。</p>
          <p class="content1">7.礼品退换</p>
          <p class="content2">积分兑换的礼品，除因礼品本身存在质量问题，全球蛙不接受任何退换货。</p>
        </div>


<!--         <h2 class="homepage-headline" >
             <a class="homepage-headline-title" ><span class="line">- </span>积分兑礼<span class="line"> -</span></a>
        </h2>
        <div class="fix-box">
			    <qqw-shop-sub-head class='z_index' categoryArr={opts.mainMessage.categoryArr}  colorlist={opts.mainMessage.colorList}></qqw-shop-sub-head>
	      </div> -->
    </div>
  	  <script>
	  	let self = this;
	  	this.mixin('util');
        self.btnGetSmsDisabled=false;
        self.btnGeIntegralDisabled=false;
        self.btnGetSmsName='获取验证码';
		this.getSms = function(event) {
		    var mobile_number=this.mobile_number.value;
			if(!self.valiatorReg.isPhone(mobile_number)){
                self.msg('请填入正确的手机号码')
                return;
			}
		 	var param={};
		 	param.mobile = mobile_number;
		 	 changGetSmsBtnState();
	        self.ajaxData('post',BackendApiGetSms,param,function(data){
	        });

	     }
		this.getIntegral=function(event) {
		 	var mobile_number=this.mobile_number.value;
		 	var smscode=this.smsCode.value;
		 	var param={};
		 	param.mobile = mobile_number;
            param.smscode =smscode;
            self.update({btnGeIntegralDisabled:true});
	        self.ajaxData('post',BackendApiGetIntegral,param,function(data){
                let  newCore=parseInt(self.core) + parseInt(data.score);
                self.update({btnGeIntegralDisabled:false,core:newCore,verificationCode:''});
                self.msg('兑换成功');
	        });

	     }

  	    // this.on('change-sub-head',(object)=>{
  	    // 	 self.opts.mainMessage.categoryArr=object;
  	    // 	 self.update();
       //       this.tags['qqw-shop-sub-head'].trigger('change-categoryArr');
  	    // });
  	    // this.on('switch_change_state',(object)=>{
       //       this.tags['qqw-shop-sub-head'].trigger('switch_change_state',object);  
  	    // });
		// this.on('updated',()=>{
		// 	this.tags['qqw-shop-sub-head'].on('switch_change',(object)=>{
		// 		object.index;
		// 		document.getElementsByClassName('dom_location')[object.index].scrollIntoView();
		// 		scrollBy(0,-300);
		// 	});
		// })
    this.one('update',()=>{
      self.core=self.opts.user.core;
    })
		function changGetSmsBtnState(){
			   var i=60;
               self.update({btnGetSmsDisabled:true,btnGetSmsName:i});
               var interval=setInterval(function(){
                i--;
                self.btnGetSmsName=i;
                self.update({btnGetSmsName:i});
            },1000)
            window.setTimeout(function(
            ){
                clearInterval(interval);
                 self.update({btnGetSmsName:'获取验证码',btnGetSmsDisabled:false});
            },60000)
        }
	  </script>	
</exchange-gift-head>