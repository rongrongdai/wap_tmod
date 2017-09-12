import { QqwUtil,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApiBinds } from 'BackendApi';		// 后台api接口文件
import'./changenum.scss'
import'./changenum.tag'

window.onload = function () {
    //  数量加减
    var add = document.getElementById("next");
    var del = document.getElementById("prove");
    var val = document.getElementById("value");
    var value = val.innerHTML;

    var add1 = document.getElementById("next1");
    var del1 = document.getElementById("prove1");
    var val1 = document.getElementById("value1");
    var value1 = val1.innerHTML;

    add.onclick = function () {
        addn();
        discolour1()
    }

    add1.onclick = function () {
        addn1();
        discolour2()
    }

    del.onclick = function () {
        deln();
        discolour1()
    }
    del1.onclick = function () {
        deln1();
        discolour2()
    }

    function addn() {
        value++;
        val.innerHTML = value;
    }
    function deln() {
        if (value != 1) {
            value--;
            val.innerHTML = value;
        } else {
            $(this).css({
                "color":"#d7d7d7",
                "background-color":"#f9f9f9",
            });
            val.innerHTML = 1;
        }
    }


    function addn1() {
        value1++;
        val1.innerHTML = value1;
    }
    function deln1() {
        if (value1 != 1) {
            value1--;
            val1.innerHTML = value1;
        } else {
            val1.innerHTML = 1;
        }
    }

var discolour1 = function(){
    var c1 =$('#value').text();
    if(c1 ==1){
        $('#prove').css({
                "color":"#d7d7d7",
                "background-color":"#f9f9f9",
            });
    }
    else{
        $('#prove').css({
                "color":"#666666",
                "background-color":"#ededed",
            });
    }
};
var discolour2 = function(){
    var c1 =$('#value1').text();
    if(c1 ==1){
        $('#prove1').css({
                "color":"#d7d7d7",
                "background-color":"#f9f9f9",
            });
    }
    else{
        $('#prove1').css({
                "color":"#666666",
                "background-color":"#ededed",
            });
    }
}
    discolour1();
    discolour2();

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
    }



    var id =request('id');


    // 数据传递
    $('.fixedbot').click(function () {
        let x = $('#value').text();
        let y = $('#value1').text();
        let Z = $('.input-leave').val();
        let z =encodeURI(encodeURI(Z));
        let url = '/mobile-user-card/present?x=' + x + '&y=' + y + '&z=' + z + '&id=' + id;
        window.location.href = url;
    })
}

