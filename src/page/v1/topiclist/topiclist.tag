import '../component/card/topic-item.tag';
import '../component/card/topic-item-card.tag';
<topiclist style='top: 0 ; position: relative; background-color: #f6f6f6;'>
    <topic-item topicList={opts.topicList} if = {opts.articleType==0}></topic-item>
     <!--      <a  class="selecte-imgbg" >
        <img class="special-picture"  src="{picurl1}">
        <div class="special-title">
              <p class="tit1">{title}</p>
              <p class="tit2">{ads}</p>
        </div>
     </a>   -->  
    <div if = {opts.articleType==1} >
	    <div each="{opts.topicList}" style="z-index: -1;background-color:#f6f6f6">
	          <topic-item-card list={articleList} style='background-color: #f6f6f6;'></topic-item-card>
	    </div>
    </div> 
    <topic-item-card list={opts.topicList} if = {opts.articleType==2} style='background-color: #f6f6f6;'></topic-item-card>

    <p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p> 
  	  <script>
	  	this.mixin('util');
	  	this.mixin('event');
	  	console.log('opts.banner:'+opts.banner);
	  	let self = this;
			this.on('update',()=>{
				let self = this;
				if(self.getOptTopicList()){
				    self.opts.topicList=self.opts.topicList.concat(self.getOptTopicList());	
				}
				// this.opts.goodslist = this.opts.goodslist.concat(this.qqwPageState.get('items'));
			});
	  </script>	
</topiclist>