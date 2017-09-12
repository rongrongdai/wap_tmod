import { AnimationUtil } from '../../../js/qqw_animation';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';
import { BackendApiXitongList } from 'BackendApi';   // 后台api接口文件
<xitong>
    <section class='content-box'>
              <a class="xitong_list box" each="{ opts.xitonglist }" href="{ xitonglistinfo.url }" >
                   <div class="xlist_info fr">
                            <div class="message_box fl">
                                   { xitonglistinfo.content }
                            </div>
                            <div class="info_time fr">
                                  <P class="time">{ xitonglistinfo.dateline }</p>
                                  <p class="status"if={xitonglistinfo.is_read==0}>
                                      <span class="red"></span>
                                  </p>
                                  <p class="status" if={xitonglistinfo.is_read==1}>
                                      <span class="write"></span>
                                  </p>
                                  
                            </div>

                        
                   </div> 
             </a>
             <p class="qqw-push-more qqw-push-down"  id='pushMore'><span>全球蛙正在为您下拉刷新</span></p>
    </section> 
    <div class="default" if={opts.xitonglist.length==0}>
                             <div class="img"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABbCAYAAAAcNvmZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk4NUQzRDgwQkM0RDExRTZBOEE5RjVBN0I1ODA0NjNFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk4NUQzRDgxQkM0RDExRTZBOEE5RjVBN0I1ODA0NjNFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTg1RDNEN0VCQzREMTFFNkE4QTlGNUE3QjU4MDQ2M0UiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTg1RDNEN0ZCQzREMTFFNkE4QTlGNUE3QjU4MDQ2M0UiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6caJmzAAAImklEQVR42uxd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"></div>
                             <p>暂时没有相关内容！</p>
                        </div>
    <script>
                this.mixin('util');
                        let reflectData
                        ,xitonglistIscrollInstance
                        ,qqwPageState={}
                        ,self
                        ,id
                        ,scrollHandler
                        ,pullUpEl;
                        this.on('mount', () => {    
                        window.startTime = new Date().getTime(); //挂载标记时间    
                        self = this;
                        //id=self.opts.index;
                        qqwPageState.param={p:1,ps:12};
                        qqwPageState.moreFlag=false;              
                        getxitonglist();
                         pullUpEl=self.root.getElementsByClassName('qqw-push-more')[0];
                        });
                    // ===========================================================
                         this.on('getMoreCallBack',(param)=>{
                          // console.log('on navitem......');
                          scrollHandler=param.scrollHandler;
                          if(qqwPageState.moreFlag&&qqwPageState.enableGetMore){
                            changPullDisplay(true);
                             getxitonglist()
                           }
                           else{
                              changPullDisplay(false);
                           }
                         })
                        /**
                     * 模板 - 数据字典映射
                     * @param  {[type]} data [接口json数据]
                     */
                    function getReflectData(data) {
                      let reflectData = {};
                                let urlXitongTogo = '/app-message/system?id=';
                      reflectData.xitonglist = [];
                      let idx = 0;
                      Array.from(data.list || []).map((xitonglist) => {
                                   let item = {};
                          item.xitonglistinfo= {
                            url: urlXitongTogo + xitonglist.id,
                            id:xitonglist.id,
                            uid: xitonglist.uid,
                            content: xitonglist.content,
                            dateline: xitonglist.dateline,
                            is_read: xitonglist.is_read,
                            is_delete: xitonglist.is_delete,
                          }
                          reflectData.xitonglist.push(item);
                                 ++idx;
                      });
                      return reflectData;
                    }

                    function changPullDisplay(enable){
                        // enable ? pullUpEl.style.display='block':'none';
                        if(enable){
                              pullUpEl.style.display='block';
                        }else{
                            pullUpEl.className = 'qqw-push-more-no-content';
                            pullUpEl.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
                      
                        }
                    }
                    function getxitonglist(){
                      qqwPageState.enableGetMore=false;
                      QqwUtil.ajaxData('get', BackendApiXitongList, qqwPageState.param, (data) => {
                            qqwPageState.enableGetMore=true;
                        let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
                        let reflectData = getReflectData(data);
                        if(qqwPageState.param.p==1){
                        self.opts.xitonglist=reflectData.xitonglist;
                        self.update();
                         setTimeout(()=>{
                            //self.root.getElementsByClassName('a-edoyen-aside')[0].style.display='block';
                          },1000);
                        }else{
                        self.opts.xitonglist=self.opts.xitonglist.concat(reflectData.xitonglist);
                        self.update();
                        }

                        if(qqwPageState.param.p<data.pagecount){
                          qqwPageState.moreFlag=true
                          qqwPageState.param.p++;
                         }
                         else{
                          qqwPageState.moreFlag=false;

                         }
                        data = null;
                        if(scrollHandler){
                         scrollHandler.isHandling=false;
                        }
                        console.log('加载HTML文章列表到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
                          ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
                      });
                    }
    </script> 
</xitong>               