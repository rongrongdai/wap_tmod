import './choicemger.tag';
import'./choicemgerb.tag';
<choicemgerall>
         <div class="magerall" >
              <div each="{value, index in opts.list}">
              <div if='{ index%4==0 }'><choicemger     item={value}></choicemger></div>
              <div if='{ index%4==1 }'><choicemgerb   item={value}></choicemgerb></div>
              <div if='{ index%4==2 }'><choicemgerb   item={value}></choicemgerb></div>
              <div if='{ index%4==3 }'><choicemger     item={value}></choicemger></div>
              </div>
         </div> 
</choicemgerall>