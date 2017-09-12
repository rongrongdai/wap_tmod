import {BackendApiGetTopicList,BackendApiGetTopicHead} from 'BackendApi';
import './topic-item.tag';
<topic-head-box>
      <div class="topic-head-box" id='scrollHereId0'>
        <div class="img-banner" style="background: url({opts.topicHead.picurl1}) center center no-repeat;"> 
         <div class="content">
           <!-- <p class="font-time">十二月 DEC</p> -->
           <p class="font-time">{opts.topicHead.date}</p>
           <div class="img-time">
             <span class="ten number{opts.topicHead.ten}"></span>
             <span class="digit number{opts.topicHead.ge}"></span>
           </div>
         </div>  
         
        </div> 
      	<!-- <img class="img-banner" src="http://7xp9qs.com1.z0.glb.clouddn.com/584629e9e9100.png"> -->
        <div class="title-box">
          <p class="left">本期话题</p>
          <a href="/mobile-topic-main/list?type=0">
            <p class="right">
              <span>
                更多＞
              </span>
            </p>
          </a>
        </div>
        <topic-item topicList={opts.topicList}></topic-item>
        <script>
            this.mixin('util');
            let self=this;
            this.one('update',()=>{
                   getTopicHead();
                   getTopicList();
            });

            function getTopicList(){
                     self.ajaxData('get',BackendApiGetTopicList, {p:1,ps:2}, (data) => {
                     let reflectData=getTopicListReflectData(data);
                     self.opts.topicList=reflectData.topicList;
                     self.update();
               });
            }

                        /**
             * 模板 - 话题列表数据字典映射
             * @param  {[type]} data [接口json数据]
             */

            function getTopicListReflectData(data) {
              let reflectData = {};
              let urlTopicDetailTogo = '/mobile-topic-main/detail?id=';
              let urlTopicDetailTogoTwo = '/mobile-topic-main/detailTwo?id=';
              reflectData.topicList = [];
              data.list=data.list.slice(0, 2);
              Array.from(data.list || []).map((topicList) => {
                let url= topicList.type==1 ? urlTopicDetailTogo:urlTopicDetailTogoTwo; 
                let articleItem = {};
                articleItem.title = topicList.module_name;
                articleItem.picurl1 =topicList.picture;
                articleItem.btncolor = topicList.btncolor+' '+'!important';
                articleItem.url =url+topicList.tid;
                articleItem.tid =topicList.tid;
                articleItem.joins = '已有'+topicList.joins+'人参与'; 
                articleItem.joinsCount = topicList.joins; 
                articleItem.btnDestribe = topicList.type==1 ? '去晒图':'说两句'; 
                  reflectData.topicList.push(articleItem);
              });
              return reflectData;
            }
            function getTopicHead(){
                     self.ajaxData('get',BackendApiGetTopicHead, {}, (data) => {
                     let reflectData=getTopicHeadReflectData(data);
                     self.opts.topicHead=reflectData.topicHead;
                     self.update();
               });
            }
                        /**
             * 模板 - 话题列表数据字典映射
             * @param  {[type]} data [接口json数据]
             */

            function getTopicHeadReflectData(topicHead) {
              let reflectData={};
              let months=['一月 JAN','二月 FEB','三月 MAR','四月 APR','五月 MAY','六月 JUN','七月 JUL','八月 AUG','九月 SEP','十月 OCT','十一月 NOV','十二月 DEC']
              let topicContent = {};
                topicContent.title = topicHead.title;
                topicContent.picurl1 =topicHead.image;
                topicContent.author =topicHead.author;
                topicContent.date =topicHead.date;
                let data=0;
                let tenIsNan=isNaN(parseInt(topicHead.date.slice(6, 7)));
                let geIsNan=isNaN(parseInt(topicHead.date.slice(-2, -1)));
                if(tenIsNan){
                   data=parseInt(topicHead.date.slice(5, 6))-1;
                   topicContent.ten=0;
                }else{
                   data=parseInt(topicHead.date.slice(5, 7))-1;
                   topicContent.ten=1;
                }
                topicContent.ten= geIsNan?0:parseInt(topicHead.date.slice(-2, -1));
                topicContent.ge=parseInt(topicHead.date.slice(-1));
                topicContent.date=months[data];
                reflectData.topicHead=topicContent;
                return reflectData;
              }

        </script>
</topic-head-box>