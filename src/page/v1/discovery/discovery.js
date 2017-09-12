import './discovery.scss';		// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载

import './discoverysubpage.tag';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app';
import { BackendApiDiscovery } from 'BackendApi';

function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}

let reflectDiscoveryData;

/**
 * 字典映射 - “发现”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
function getDiscoveryReflectData(data) {
	let reflectData = {};
	reflectData.isSubpageActive = true;
	reflectData.subs = [];
	Array.from(data.doyen).map((item) => {
		let reflectSub = {
			id: 'discovery' + item.doyen_type,
			title: item.name,
			column: []
		}
		Array.from(item.list).map((listItem) => {
			let reflectItem = {
				id: listItem.doyen_id,
				url: '/app-doyen/detail?doyen_id=' + listItem.doyen_id,
				face: listItem.face,
				pic: listItem.show_picture,
				name: listItem.nickname,
				title: '-  ' + listItem.name + '  -',
				subtitle: listItem.slogan,
				tip: listItem.article_num + ' 篇'
			};
			reflectSub.column.push(reflectItem);
		});
		reflectData.subs.push(reflectSub);
	});

	return reflectData;
}

(new QqwApp())
		.domReady(() => {
			FastClick.attach(document.body);			// 移动端点击事件 hack
			riot.mixin('util', qqwOpMixin);
		})
		.fetch(BackendApiDiscovery, (data) => {
			reflectDiscoveryData = getDiscoveryReflectData(data);
			data = null;
			riot.mount('discoverysubpage', reflectDiscoveryData);
		})
		.start();
