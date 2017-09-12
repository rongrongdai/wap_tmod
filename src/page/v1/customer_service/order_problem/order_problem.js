import './order_problem.scss';
import './order_problem.tag';
import { AnimationUtil } from '../../../../js/qqw_animation';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush.js';
import QqwApp from '../../../../js/qqw_app';

function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.ajaxData = QqwUtil.ajaxData;
          this.msg = QqwUtil.msg;
}
 let self = this;
 let type;   
   

function  getQueryStrings(name){
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
}
type=getQueryStrings("type");
if (type==0) {
   $(".title").html("订单问题");
}
if (type==1) {
    $(".title").html("退货问题");
}
if (type==2) {
    $(".title").html("售后总则");
}

riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
riot.mount('orderProblem');











