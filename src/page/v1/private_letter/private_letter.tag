import '../component/card/pe_letter.tag';
import { BackendApisendLetter } from 'BackendApi'; 
<privateLetter>
    <header>
       <div class="top_nav"> <a class="header_left" href="#" onclick="javascript:history.go(-1);"></a>{opts.nickname}</div>
       <div class="top_as"></div>
    </header>

 
        <pe-letter  item={opts.letter_list} ></pe-letter>         
   
   


   <div class="eval_bass"></div>
    <table class="eval_Bar"> 
          <tbody>
              <tr> 
                 <td class="evalinput"> 
                      <textarea  id="textAreaCon" contenteditable="true" class="con textAreaCon" maxlength="150"></textarea>
                 </td> 
                 <td class="eval_btn">
                      <p data-touid={opts.touid}  onclick={send}>发送</p>
                 </td>
              </tr>
         </tbody>
    </table>

<script>
      this.mixin('util');
      this.mixin('event');
      this.mixin('valiatorReg');

      let self=this;
      
      self.send=function(event){
          let sendis=event.currentTarget.dataset.touid;
          let textAreaCon=document.getElementById("textAreaCon").value;
          if(self.isEmpty(textAreaCon)){
               self.msg('请输入发送内容',1);
               return;
          }
          let param={};
          param.touid=sendis;
          param.msg = textAreaCon;

         this.on('getcall',(param)=>{ });

         self.ajaxData('POST', BackendApisendLetter, param,(data) => {
               //self.msg('发送成功',1);   
                //调用
               self.trigger('lettertes',{});

         });
        
      }
</script>
</privateLetter>