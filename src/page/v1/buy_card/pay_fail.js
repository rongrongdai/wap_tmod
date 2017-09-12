import { QqwUtil,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import'./pay_fail.scss'
import'./pay_fail.tag'
import { BackendApipayResult} from 'BackendApi';		// 后台api接口文件



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

var order_sn = request('order_sn');
$('.ordersn').text(order_sn);

QqwUtil.ajaxData('get', BackendApipayResult, {order_sn:order_sn}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
             $('.ordern').text(data.order_amount+'元 '+data.card_name +''+data.quantity +'张');
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });


$('.again-pay').click(function(){
    location.href = '/payment-pay/wechat?order_sn='+ order_sn + '&client=web&os=h5&fromCard=1'});

