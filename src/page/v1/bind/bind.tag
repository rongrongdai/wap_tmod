import { BackendApisaveBind, BackendApisendSms} from 'BackendApi';   // 后台api接口文件
<bindpage>
       <div class="bindtop">
            <img src="{opts.user.face}">
            <p class="bindt_p">{opts.user.nickname}</p>
       </div>

       <div class="bindcontent">
               <div class="contao">
                     <span class="user_icon"></sapn>
                     <input class="bind_text"  name="username" type="text" placeholder="输入手机号">
               </div>

                <div class="contaotw">
                     <div class="taotw_left">
                         <span class="login_box"></sapn>
                         <input class="bind_text1"  name="smscode" type="text" placeholder="输入短信验证码">
                     </div>
                     
                     <div class="{taotw_right_enable:btnEnable,taotw_right:!btnEnable}" onclick={getSmcode}>{smMessage}</div>
               </div>
               <button data-uid={opts.uid} class="btn-submit" onclick={submit}>验证提交</button>

       </div>

       <div class="bind_tail"></div>
       <script>
              this.mixin('util');
              this.mixin('valiatorReg');
              let self=this,enable=true;
              this.smMessage='获取验证码';
              this.btnEnable=true;
              this.submit=(event) =>{
                    let param={};
                    param.type=6;
                    param.mobile=parseInt(self.username.value);
                    if(!self.isPhone( param.mobile)){
                      self.msg('请填入正确的手机号',1);
                      return;
                    }
                    param.smscode=parseInt(self.smscode.value);
                    if(!self.isNum( param.smscode)){
                      self.msg('请填入验证码',1);
                      return;
                    }
                    this.ajaxData('POST',BackendApisaveBind,param,()=>{
                      self.msg('绑定成功',1);
                      setTimeout(()=>{
                           document.location.href='/download';
                      },2000);
           
                    })
              }

              this.getSmcode=(event) =>{
                    let param={},inTerval;
                    param.mobile=parseInt(self.username.value);
                    param.type=6;
                    if(!self.isPhone( param.mobile)){
                      self.msg('请填入正确的手机号',1);
                      return;
                    }
                    if(!enable){
                      return;
                    }
                    enable=false;
                    this.ajaxData('POST',BackendApisendSms,param,()=>{
                      enable=true;
                      let i=60;
                      self.update({ btnEnable:false});
                      inTerval= setInterval(()=>{
                         i--;
                         self.update({ smMessage: i+'s' });
                         if(i==0){
                           window.clearInterval(inTerval);
                           self.update({ smMessage: '重新发送',btnEnable:true});
                          }
                      },1000)
                   });
                }
       </script>      
</bindpage>