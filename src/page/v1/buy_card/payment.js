import { QqwUtil,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApiconfirmOrder } from 'BackendApi';		// 后台api接口文件
import { BackendApicreateOrder } from 'BackendApi';		// 后台api接口文件
import { BackendApiGetentCard} from 'BackendApi';		// 后台api接口文件
import'./payment.scss'
import'./payment.tag'

window.onload = function () {
        var Allprice;
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
    var id=request('id');
    QqwUtil.ajaxData('get', BackendApiGetentCard, {card_id:id}, (data) => {
     let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            $('.price').text(data.amount);
            $('#score').text(data.score);
            $('.card-img').attr('src',data.picture);
            Allprice = data.amount;
            $('#price').text(total*Allprice);
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });

    
    var mannum =request('x');
    var everynum =request('y');
    var total = mannum * everynum ;
    var Leave =request('z');
    var leave = decodeURI(decodeURI(Leave));
    
    if (leave == ''){
        leave ='祝您天天开心';
    }
    
    $('#mannum').text(mannum);
    $('#everynum').text(everynum);
    $('#total').text(total);
    $('.input-leave').text(leave);
   
    var postdata ={
        card_id : id,
        people_num : mannum,
        order_type :"2",
        per_num :everynum,
        message :leave 
    }
     
    $('.botbuy').click(
        function(){
        QqwUtil.ajaxData('post', BackendApiconfirmOrder, postdata, (data) => {
           let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            console.log(data);
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
            var postdatat =JSON.stringify(data.orderForm);
            console.log(postdatat);
        QqwUtil.ajaxData('post', BackendApicreateOrder, {orderForm:postdatat}, (datat) => {
           let startGetQqwOpDataTime = new Date().getTime(); // for 性能检测
             // 保证首屏先渲染结构
            console.log(datat);
            location.href = '/payment-pay/wechat?order_sn='+ datat.order_sn + '&client=web&os=h5&fromCard=1';
            console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
      ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
  });

  }); 
        }
    )
}
    
