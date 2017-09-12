import './join_share.scss';
import './join_share.tag';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApigroupBuyDetail} from 'BackendApi';		// 后台api接口文件

        var plat = QqwUtil.getPlatform();
        if (plat == 'wechat' ){
                console.log('这是微信端')             
        }
        else  {
            $('.qqw-nav').hide();           
        }


// 获取URL参数

        function request() {
        var query = location.search;
        var paras = arguments[0];
        if (arguments.length == 2) {
            query = arguments[1];
        }
        if (query != "") {
            if (query.indexOf("?") != -1) {
                query = query.split("?")[1];
            }
            query = query.split("&");
            for (var i = 0; i < query.length; i++) {
                var querycoll = query[i].split("=");
                if (querycoll.length == 2) {
                    if (querycoll[0].toUpperCase() == paras.toUpperCase()) {
                        return querycoll[1];
                        break;
                    }
                }
            }
        }
        return "";
    };
var buyid = request('buyid');
var joinid = request('joinid');



var postdata = '?joinid='+ joinid + '&buyid='+ buyid ;
var goods_id

QqwUtil.ajaxData('get', BackendApigroupBuyDetail, postdata, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
             console.log(data);
                 if(data.state ==2){
                      window.location.href = '/mobile-user-groupbuy/detailFail?buyid='+ buyid + '&joinid=' + joinid;
                 }
                 if(data.state ==1){
                     window.location.href = '/mobile-user-groupbuy/detailSuccess?buyid='+ buyid + '&joinid=' + joinid;
                 }
             console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
             var timeends =parseInt(data.create_time) + 86400   
             var timeEnd = new Date(parseInt(timeends) * 1000);
             var end_time = timeEnd.toLocaleString('chinese',{hour12:false});
              var arr = data.user
              var face1 =[];
              arr.map(function(item){
                  item.typeid == 1 && face1.push(item.face)
              })
              $('.colonel').attr('src',face1);
              $('.all_num').text(data.all_num);
              $('.shopname').text(data.goods_name);
              $('.price').text(data.price);
              $('.shop_price').text(data.shop_price);
              $('.shopimg').attr('src',data.picture);
              goods_id =data.goods_id;
            //   倒计时
              function GetRTime(){
                    var EndTime= new Date(end_time);
                    var NowTime = new Date();
                    var t =EndTime.getTime() - NowTime.getTime();
                    var d=0;
                    var h=0;
                    var m=0;
                    var s=0;
                    if(t>=0){
                      h=(Array(2).join(0)+ Math.floor(t/1000/60/60%24)).slice(-2);
                      m=(Array(2).join(0)+ Math.floor(t/1000/60%60)).slice(-2);
                      s=(Array(2).join(0)+ Math.floor(t/1000%60)).slice(-2);
                }
                    $('.ckh').text(h);
                    $('.ckm').text(m);
                    $('.cks').text(s);
                  }
                    setInterval(GetRTime,1000);
  });
  $('.shareicon').click(function(){
      let url = '/app-goods/detail?id=' + goods_id +'&groups_type=1';
      window.location.href = url;
  });