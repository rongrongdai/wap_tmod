import './new_red.scss';
import './new_red.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { PullPush } from '../../../js/qqw_pullpush.js';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';

import { BackendApinewGift } from 'BackendApi';		// 后台api接口文件

function qqwOpMixin() {
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.ajaxData = QqwUtil.ajaxData;
          this.msg = QqwUtil.msg;
}


riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);
riot.mount('newred');

/*QqwUtil.ajaxData('get', BackendApinewGift, {}, (data) => {
	let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
	// 保证首屏先渲染结构
	console.log(data, 'data');
	/*let reflectData = getShopInfo(data);
           baskinInstances=riot.mount('baskin',reflectData)[0];
           $('#contents').html(data.content);
            $('#descriptions').html(data.description);
             initScroll();
//         footerNav=riot.mount('footer-bar', {index:0});
	console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) + ', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	
});*/