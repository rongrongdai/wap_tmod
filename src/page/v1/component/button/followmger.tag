import { BackendApiBindButler} from 'BackendApi';
<choicemger>
          <div class="magerall" >
		<div class="mager1" onclick={seebutle}  each="{opts.item}"  data-butler_id="{butler_id}" >
			<img calss="maimg"  src="{picture}"></img>
		            <p class="ma_p">{ nickname }</p>
		            <p class="ma_p1">{butler_desc}</p>
		            <div class="ma_opt"  data-butler_id="{butler_id}"  onclick={optbutler} >
		              <span>关注</span>
		             </div>
		        </div>
          </div>
 <script>
// 	// 引入 mixin
		this.mixin('util');
		this.mixin('event');
		let self = this;
		this.optbutler = function(event) {
			this.preventDefault(event);
	                     this.stopPropagation(event);
			 let butid=event.currentTarget.dataset.butler_id;
			 let butlerid='?butler_id='+ butid;
 			self.ajaxData('get', BackendApiBindButler,butlerid, (data) => {
				location.href='/src/page/v1/index.htm';				
			});
		};

		this.seebutle =function(event){
			  let  uids=event.currentTarget.dataset.butler_id;
			  console.log(uids);
                                 let  goods=2;
                                 location.href="/app-butler/detail?uid="+ uids+ "&goods="+goods;
		};
 </script>
</choicemger>