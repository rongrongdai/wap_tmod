import { BackendApiFocus,BackendApiCancelFocus} from 'BackendApi';
import'./btn-choicemger.tag';
<choicemger>
          <div class="magerall" >
          <div each='{value,index in opts.item}'>
          	   <btn-choicemger items='{value}' ></btn-choicemger>
          </div>

          </div>
</choicemger>