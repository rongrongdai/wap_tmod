/**
 *
 * note:
 *   - 第一次取48条数据，每次渲染12条，最后12条时要预抓取
 *   - store.js: items_cache
 *
 */
import './discovery_second.scss';

import '../component/card/qqw-card.tag';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwPagestate from '../../../js/qqw_pagestate';
import QqwApp from '../../../js/qqw_app';

import { BackendApiDoyenList } from 'BackendApi';

// import template from '../../../js/template-native-debug.js';
// import html_menu_slider_list from '../../../tpl/html_menu_slider_list.tpl';

let searchJson
		, reflectData
		, doyencardInstance
		, qqwPageState
		, discoverySecondApp
		;

discoverySecondApp = new QqwApp();
qqwPageState = new QqwPagestate();
qqwPageState
		.set('ps', 48)
		.set('each', 12)
		.set('scrollSignDistance', 120)
		.build();			// should be call before app start

function addEventForRiotInstance() {
	doyencardInstance.on('update', () => {
		doyencardInstance.opts.column = doyencardInstance.opts.column.concat(qqwPageState.get('items'));
	});
	doyencardInstance.on('updated', () => {
		let skipIdx = qqwPageState.get('itemIdx');
		let $selectors = QqwUtil.$q('.card-item-container-bg');
		if ($selectors.length > skipIdx) {
			QqwUtil.each($selectors, (el, idx) => {
				if (idx >= skipIdx) {
					el.style.background = 'transparent url(' + doyencardInstance.opts.column[idx].pic + ') center center / cover no-repeat';
				}
			});
			qqwPageState.set( 'itemIdx', skipIdx+qqwPageState.get('each') );
		}
		qqwPageState.setHandling(false);
	});
}

function getReflectData(data) {
	let reflectData = {};

	reflectData.column = [];
	Array.from(data.list).map((listItem) => {
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
		reflectData.column.push(reflectItem);
	});
	// reflectData.items.push({
	// 	url: '',
	// 	more: '查看更多'
	// });
	return reflectData;

}

searchJson = QqwUtil.getSearchToJson();
discoverySecondApp
		.domReady(() => {
			FastClick.attach(document.body);
			if (searchJson.doyentype === '1') {
  			document.getElementById('qqwNavTitle').innerHTML = '采购';
  		}
  		// let tplRender = template.compile(html_menu_slider_list);
			// QqwUtil.renderTemplate.append('TPL-sliderList', tplRender({}));
		})
		.useScrollListener(qqwPageState.getScrollHandler())
		.useStateParam(() => {
			let pageIdx = qqwPageState.get('p') + 1;
			qqwPageState.set('p', pageIdx);
			return '?doyen_type=' + searchJson.doyentype + '&p=' + (pageIdx) + '&ps=' + qqwPageState.get('ps');
		})
		.initAfterFirstFetch((data) => {
			qqwPageState.updatePageState();				// 更新页面状态，之后页面状态类会自行处理
			doyencardInstance = riot.mount('*', { column: [] })[0];
			addEventForRiotInstance();
			qqwPageState
					.preTrigger(discoverySecondApp.doAjaxFetch)
					.updateCallback(doyencardInstance.update);
			data = null;
		})
		.fetch(BackendApiDoyenList, (data) => {
			reflectData = getReflectData(data);
			qqwPageState.set( 'totalItemCount', (qqwPageState.get('totalItemCount') + data.list.length) );
			qqwPageState.addItemToCache(reflectData.column);
			if (reflectData.column.length < qqwPageState.get('ps')) {
				qqwPageState.set('noMoreFlag', false);
				let $more = document.getElementById('pushMore');
				$more.className = 'qqw-push-more-no-content';
				$more.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
			}
			qqwPageState.setHandling(false);
		})
		.start();