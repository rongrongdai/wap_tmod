import './login.scss';
import './loginpage.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';
let loginApp
    ,loginInstance
;
loginApp = new QqwApp();
function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.ajaxData = QqwUtil.ajaxData;
}
// 主控制器
loginApp.domReady(() => {
			FastClick.attach(document.body);			// 移动端点击事件 hack
			riot.mixin('util', qqwOpMixin);
			riot.mixin('event', EventUtil);
		    loginInstance = riot.mount('loginpage')[0];
		    loginInstance.update;
		})
		.start();
