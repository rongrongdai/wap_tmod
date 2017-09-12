import './join_success.scss';
import './join_success.tag';
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



// 时间戳转换
function formatDate(now) { 
var year=now.getYear(); 
var month=(Array(2).join(0)+now.getMonth()+1).slice(-2);
var date=(Array(2).join(0)+ now.getDate()).slice(-2);
var hour=(Array(2).join(0)+ now.getHours()).slice(-2);
var minute=(Array(2).join(0)+ now.getMinutes()).slice(-2);
var second=(Array(2).join(0)+ now.getSeconds()).slice(-2);
return "20"+year+"/"+month+"/"+date+" "+hour+":"+minute+":"+second; 
} 
// 时间戳转换--End

var postdata = '?joinid='+ joinid + '&buyid='+ buyid ;

QqwUtil.ajaxData('get', BackendApigroupBuyDetail, postdata, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
             console.log(data);
             console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
             $('.namer').text(data.goods_name);
              var arr = data.user
              var face1 =[];
              var face2 =[];
              arr.map(function(item){
                  item.typeid == 1 && face1.push(item.face)
                  item.typeid == 2 && face2.push(item.face)
              })
              $('.colonel').attr('src',face1);
              $('.hicon').attr('src',face2);
              $('.shopimg').attr('src',data.picture);
              $('.shoppname').text(data.goods_name);
              $('.price').text(data.price);
              $('.shop_price').text(data.shop_price);
             
  });

