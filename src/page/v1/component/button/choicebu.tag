<choicebu>
     <div class="choiceAll"  >
       <input class="choicera" type="{opts.dataType}" name="{opts.dataName}" value="{opts.dataValue}" onclick={choicClick} >
       <!-- <span>{opts.name}</span> -->
       <div class="choicadd"   name="{opts.dataName}" onclick={choicClick}  if= {!choose}></div>

    </div>

 
<script>
       this.mixin('event');
       this.mixin('param')
       let self = this,
       choose = false;
       self.choicClick = function(event) {
       	    choose=!choose;
            if(choose){
              self.setOpts(opts.dataValue,self.opts.dataName);
            }
            else{
              self.removeOpts(opts.dataValue,self.opts.dataName);
            }
       	 if(self.opts.dataType=='radio' && choose ){
            	let condition='input[name='+self.opts.dataName+']'
       	      	$(condition).attr("checked", false);
               let divCondition='div[name='+self.opts.dataName+']'
                     $(divCondition).css('display','none');
       	     } 
            let state=choose?'block':'none';
            if(event.target.tagName=='DIV'){
              $(event.target).prev('input').attr("checked",choose.toString());
              $(event.target).css('display',state);
            }
            else{
              $(event.target).attr("checked",choose.toString());
              $(event.target).next('div').css('display',state) 
            }      	  	 
       };   

       this.on('updated',()=>{
         let name=self.opts.dataName;
        $(self.root.getElementsByTagName('input')[0]).css('background-image','url('+self.opts.dataUrl+')');
        if(name=='sex'||name=='age'){
          return;
        }
        $(self.root).find('input').attr("checked",'false');
        $(self.root).find('.choicadd').css('display','none');
        choose=initState();
        if(choose){
          $(self.root).find('input').attr("checked",'true');
          $(self.root).find('.choicadd').css('display','block');
        }
      }) 
     function initState(){
        let name=self.opts.dataName;
        let id=self.opts.dataValue;
        if(name=='sex'||name=='age'){
          return false;
        }
       let nameKey=self.param[name]
       if(!nameKey){
          return false;
       }
       let strs=nameKey.split(","); //字符分割 
       for (let i=0;i<strs.length ;i++) 
       { 
          if(id===strs[i]){
             console.log('id'+self.opts.dataValue);
         
                    return true;
                     }

        }
       return false;
       }
</script>
</choicebu>