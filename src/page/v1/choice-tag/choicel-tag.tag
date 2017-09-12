import '../component/button/choicebu.tag';
import './choicelHead.tag';
<choicel-tag>
<!-- <div class="choli_title"><p>为了提供更好的服务请选择    <span>跳过</span></p></div> -->
<form action="" method="POST " id="butsubid" > 
 <div class="choiceall">
        <choicelhead></choicelhead>
<!--         <p class="chsex_p">您是属于哪个族群（可多选）:</p>
       <div class="choiconnen1">
               <div class="choiconnen1">
                       <span class="ch_sper1">
                         <choicebu data-type='checkbox' data-name='groups' data-url='{opts.groups[0].picture}' data-value='{opts.groups[0].tagid}'></choicebu>
                       <span class="choice_name">{opts.groups[0].name}</span>
                      </span>
               </div>
               <div class="choiconnen1">
                    <span class="ch_sper">
                         <choicebu data-type='checkbox' data-name='groups' data-url='{opts.groups[1].picture}' data-value='{opts.groups[1].tagid}'></choicebu>
                         <span class="choice_name">{opts.groups[1].name}</span>
                    </span>
                    <span class="ch_sper1">
                        <choicebu data-type='checkbox' data-name='groups' data-url='{opts.groups[2].picture}' data-value='{opts.groups[2].tagid}'></choicebu>
                        <span class="choice_name">{opts.groups[2].name}</span>
                    </span>
              </div> 
                <div class="choiconnen1">
                       <span class="ch_sper1">
                         <choicebu data-type='checkbox' data-name='groups' data-url='{opts.groups[3].picture}' data-value='{opts.groups[3].tagid}'></choicebu>
                       <span class="choice_name">{opts.groups[3].name}</span>
                      </span>
               </div>

            <span class="ch_sperchlick" data-value='1' onclick={changeData}>换一波</span>
       </div> 


     </div>

     <p class="chsex_p choicel_tsu">您喜欢的品类是（可多选）:</p>
      <div class="choiconnen1">
             <ul class="video_list" >
                <li each="{opts.category}">
                     <choicebu data-type='checkbox' data-name='category'  data-url='{picture}' data-value='{tagid}'></choicebu>
                     <span class="choice_name">{name}</span>
                </li>
             </ul>
             <span class="ch_sperchlick" data-value='2'  onclick={changeData}>换一波</span>
       </div> 

       <p class="chsex_p choicel_tsu">您的爱好是（可多选）:</p>
      <div class="choiconnen1">
             <ul class="video_list">
                <li  each="{opts.hobby}">
                     <choicebu data-type='checkbox' data-name='hobby'  data-url='{picture}' data-value='{tagid}'></choicebu>
                     <span class="choice_name">{name}</span>
                </li>                                         
             </ul>
                <span class="ch_sperchlick" data-value='3'  onclick={changeData}>换一波</span>
       </div> -->

       <div class="choic_but" type='summit'   onclick={butsubmission}><span>提交</sapn></div> 
</div>
</form> 

<script>
      this.mixin('event');
      this.mixin('util');
      this.mixin('param');
      let self =this;
      this.changeData=(event)=>{
        self.trigger('changeData',{buttonIndex:event.target.getAttribute('data-value')});
        $(event.target).parent().find('input').attr("checked", false);
        $(event.target).parent().find('.choicadd').css('display','none');
      }
     self.butsubmission  = function(event) {
            let param=self.param;
            if(param.sex==null){
               self.msg('请选择性别',3);
               return;
            }
            if(param.age==null){
               self.msg('请选择年龄段',3);
               return;
            }
            // if(!param.groups){
            //    self.msg('请选择族群',3);
            //    return;
            // }
            // if(!param.category){
            //    self.msg('请选择品类',3);
            //    return;
            // }
            // if(!param.hobby){
            //    self.msg('请选择爱好',3);
            //    return;
            // }
        self.ajaxData('post','/tag-main/saveTag',param,function(data){
              Global.sendSelectedTag(data.selected);
              self.msg('保存成功',3);
        });

     }
</script>

</choicel-tag>







