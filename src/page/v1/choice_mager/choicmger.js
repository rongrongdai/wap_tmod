import './chomger.scss';
import './chomger.tag';

import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwPagestate from '../../../js/qqw_pagestate';
import QqwApp from '../../../js/qqw_app';

import { BackendApiChooseList } from 'BackendApi';		// 后台api接口文件

let reflectData
		, goodsInstance
		, qqwPageState
		, choolslistApp
		;

choolslistApp = new QqwApp();
// qqwPageState = new QqwPagestate(null,() => {
// 	choolslistApp.start();
// });

function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.qqwPageState = qqwPageState;
	this.ajaxData = QqwUtil.ajaxData;
}


/**
 * 模板 - 数据字典映射
 * @param  {[type]} data [接口json数据]
 */
function getBackChoosData(data) {
	let reflectData = {};
	reflectData.chooseList = [];
	let idx = 0;
	Array.from(data.list || []).map((choositem) => {
		           let item = {};
			item={
				butler_id: choositem.butler_id,
				nickname:choositem.nickname,
				picture: choositem.picture,
				butler_desc: choositem.butler_desc,
				sex: choositem.sex,
				create_time: choositem.create_time,

			}

			reflectData.chooseList.push(item);
		         ++idx;
	});
	reflectData.url=data.video_url;
	reflectData.pic=data.video_pic;
	return reflectData;
}

// // 主控制器
// choolslistApp
// 		.domReady(() => {
// 			FastClick.attach(document.body);			// 移动端点击事件 hack
// 			riot.mixin('util', qqwOpMixin);
// 			riot.mixin('event', EventUtil);
// 		})
// 		.initAfterFirstFetch((data) => {
// 			// qqwPageState.updatePageState();				// 更新页面状态，之后页面状态类会自行处理
// 			goodsInstance = riot.mount('choicmgera', { chooseList: [] })[0];
// 			qqwPageState
// 					.preTrigger(choolslistApp.doAjaxFetch)
// 					.updateCallback(goodsInstance.update);
// 			data = null;
// 		})
		
// 		.start();
  	QqwUtil.ajaxData('get', BackendApiChooseList, null, (data) => {
		let startGetQqwOpDataTime = new Date().getTime();	// for 性能检测
		// 保证首屏先渲染结构
		let reflectData=getBackChoosData(data);
	          riot.mount('chomger',reflectData);
		console.log('加载HTML到渲染后台数据花费毫秒数 = ' + (new Date().getTime() - window.startTime) +
			', 其中渲染后台数据花费 = ' + (new Date().getTime() - startGetQqwOpDataTime));
	});

riot.mixin('util', qqwOpMixin);
riot.mixin('event', EventUtil);


