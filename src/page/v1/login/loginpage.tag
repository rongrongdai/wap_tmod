<loginpage>
  <article class='article-special-btn--up login-article'>
      <div class='content'>
         <div  class='box-close'>
           <button class='btn-close'></button>
         </div>
           <div class='box-logo'></div>
         <div class='box-input'>
           <span class="logo phone"></span>
           <input class='input-content ' type="numbert" placeholder="输入手机号">
         </div>  
         <div class='box-input box-pass'>
           <span class="logo pass"></span>
           <input class='input-content' type="text" placeholder="输入密码">
         </div>  
         <button class='btn-submit' onclick={sendLogin}>登录</button>
         <div class="register">
          <span class="register-text">注册</span>
         </div>
         <div class="other-register">
           <div class='line'></div>
           <div class='text-box'>
              <span class="text">其他登录方式</span>
           </div>
         </div>
         <button class="btn-qq" onclick={sendLoginByQQ}></button>
         <button class="btn-wechat" onclick={sendLoginByWechat}></button>
      </div>
  </article>
  <script>
  	this.mixin('util');
  	this.mixin('event');
  	let self = this;
		this.sendLoginByQQ = (event) =>{  
      console.log('sendLoginByQQ');       
		}
    this.sendLoginByWechat = (event) =>{   
      console.log('sendLoginByWechat'); 
    }
  </script>
</loginpage>