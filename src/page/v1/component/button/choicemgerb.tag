import { BackendApiBindButler} from 'BackendApi';
<choicemgerb>
	<div class="magerb" onclick={seebutle}>
		<img calss="maimg"  src="{opts.item.picture}"></img>
                     <p class="ma_p">{ opts.item.nickname }</p>
                     <p class="ma_p1">{opts.item.butler_desc}</p>
                     <div class="ma_opt" onclick={optbutler} >
                       <span>选TA</span>
                     </div>
	</div>
<script>
	// 引入 mixin
		this.mixin('util');
		this.mixin('event');
		let self = this;
		this.optbutler = function(event) {
			this.preventDefault(event);
	                     this.stopPropagation(event);
			let butid=opts.item.butler_id;
			let butlerid='?butler_id='+ butid;
 			self.ajaxData('get', BackendApiBindButler,butlerid, (data) => {
				location.href='/src/page/v1/index.htm';				
			});
		};
		this.seebutle =function(event){
			  let  butid= opts.item.butler_id;
                                 let  goods=2;
                                 location.href="/app-butler/detail?uid="+ butid+ "&goods="+goods;
		};
</script>	
</choicemgerb>