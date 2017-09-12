import './bind.scss';
import './bind.tag';
import { QqwUtil,valiatorReg } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { BackendApiBinds } from 'BackendApi';		// 后台api接口文件
function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.ajaxData = QqwUtil.ajaxData;
    this.msg = QqwUtil.msg;
}
// 主控制器
/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
 function getShopInfo(data) {
	let reflectData = {};
	reflectData.user = {};
	let item = {};
	item = {
                 uid : data.user.uid,
                 face : data.user.face,
                 nickname : data.user.nickname
	}
          reflectData.user = item;
	return reflectData;
}


QqwUtil.ajaxData('get', BackendApiBinds, null, (data) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
		let reflectData=getShopInfo(data);
	           riot.mount('bindpage',reflectData);
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});

riot.mixin('util', qqwOpMixin);
riot.mixin('valiatorReg', valiatorReg);
riot.mixin('event', EventUtil);