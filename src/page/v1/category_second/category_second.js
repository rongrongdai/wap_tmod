/**
 * note:
 *   - 第一次取48条数据，每次渲染12条，最后12条时要预抓取
 *   - store.js: items_cache
 */
import './category_second.scss';			// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载

import '../component/card/merchant-facecard.tag';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil.js';
import QqwPagestate from '../../../js/qqw_pagestate.js';
import QqwApp from '../../../js/qqw_app.js';
import { BackendApiSubcategory, BackendApiCollectAdd, BackendApiCollectDel } from 'BackendApi';

let searchJson
		, reflectData
		, merchantFacecardInstance
		, qqwPageState
		, categorySecondApp
		;

categorySecondApp = new QqwApp();
qqwPageState = new QqwPagestate();
qqwPageState
		.set('ps', 48)
		.set('each', 12)
		.set('scrollSignDistance', 120)
		.build();			// should be call before app start

// =================================================================================

/**
 * Riot 事件监听
 * @return {[type]} [description]
 */
function addEventForRiotInstance() {
	merchantFacecardInstance.on('update', () => {
		merchantFacecardInstance.opts.items = merchantFacecardInstance.opts.items.concat(qqwPageState.get('items'));
	});
	merchantFacecardInstance.on('updated', () => {
		let skipIdx = qqwPageState.get('itemIdx');
		let $selectors = QqwUtil.$q('.merchant-facecard-item-name');
		if ($selectors.length > skipIdx) {
			QqwUtil.each($selectors, (el, idx) => {
				if (idx >= skipIdx) {
					el.style.background = 'transparent url(' + merchantFacecardInstance.opts.items[idx].pic + ') 0 0 no-repeat';
				}
			});
			qqwPageState.set( 'itemIdx', skipIdx+qqwPageState.get('each') );
		}
		qqwPageState.setHandling(false);
	});
	merchantFacecardInstance.collect = function(e) {
		e = EventUtil.getEvent(e);
		let target = EventUtil.getTarget(e);
		if (target.nodeName === 'BUTTON') {
      EventUtil.preventDefault(e);
      EventUtil.stopPropagation(e);
    	if (target.className.length > 50) {
    		merchantFacecardInstance.trigger('collect', { iscollect: false, id: target.dataset.id, target: target});
    	} else {
    		merchantFacecardInstance.trigger('collect', { iscollect: true, id: target.dataset.id, target: target});
    	}
    } else {
    	return true;
    }
	};
	merchantFacecardInstance.on('collect', (collectObj) => {
		if (collectObj.iscollect) {
			QqwUtil.ajaxData('POST', BackendApiCollectAdd, {goods_id: collectObj.id}, (data) => {
      	collectObj.target.className += ' merchant-facecard-item-collect--active';
      	collectObj.target.innerHTML = (parseInt(collectObj.target.innerHTML) + 1)
				console.log('收藏成功');
			});
		} else {
			QqwUtil.ajaxData('POST', BackendApiCollectDel, {goods_id: collectObj.id}, (data) => {
      	collectObj.target.className = 'pull-right--fix merchant-facecard-item-collect';
      	collectObj.target.innerHTML = (parseInt(collectObj.target.innerHTML) - 1)
				console.log('收藏取消');
			});
		}
	});
}

function getReflectData(data) {
	let reflectData = {};
	reflectData.items = [];
	Array.from(data).map((item) => {
		let reflectItem = {
			id: item.goods_id,
			url: '/app-goods/detail?id=' + item.goods_id,
			pic: item.goods_thumb,
			name: '' + item.goods_name,
			price: '￥ ' + item.market_price,
			collectNum: item.favorite_number
		};
		reflectData.items.push(reflectItem);
	});
	// reflectData.items.push({
	// 	url: '',
	// 	more: '查看更多'
	// });
	return reflectData;
}

searchJson = QqwUtil.getSearchToJson();
categorySecondApp
		.domReady(() => {
			FastClick.attach(document.body);
			document.getElementById('qqwNavTitle').innerHTML = searchJson.title;
		})
		.useScrollListener(qqwPageState.getScrollHandler())
		.useStateParam(() => {
			let pageIdx = qqwPageState.get('p') + 1;
			qqwPageState.set('p', pageIdx);
			return '?cat_id=' + searchJson.cat_id + '&p=' + (pageIdx) + '&ps=' + qqwPageState.get('ps');
		})
		.initAfterFirstFetch((data) => {
			qqwPageState.updatePageState();				// 更新页面状态，之后页面状态类会自行处理
			merchantFacecardInstance = riot.mount('*', { items: [] })[0];
			addEventForRiotInstance();
			qqwPageState
					.preTrigger(categorySecondApp.doAjaxFetch)
					.updateCallback(merchantFacecardInstance.update);
			data = null;
		})
		.fetch(BackendApiSubcategory, (data) => {
			reflectData = getReflectData(data);
			qqwPageState.set( 'totalItemCount', (qqwPageState.get('totalItemCount') + data.length) );
			qqwPageState.addItemToCache(reflectData.items);
			if (reflectData.items.length < qqwPageState.get('ps')) {
				qqwPageState.set('noMoreFlag', false);
				let $more = document.getElementById('pushMore');
				$more.className = 'qqw-push-more-no-content';
				$more.firstElementChild.innerHTML = '— 更多内容 敬请期待 —';
			}
			qqwPageState.setHandling(false);
		})
		.start();
