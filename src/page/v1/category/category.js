import './category.scss';		// 样式由页面进行统筹，单页应用则需按组件等进行拆分，按优先级加载

import './categorysubpage.tag';
import './brandsubpage.tag';
// import './store';
// import './actions';
import { QqwUtil } from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import QqwApp from '../../../js/qqw_app.js';

import { BackendApiBrand, BackendApiCategory } from 'BackendApi';

let startGetQqwDataTime = new Date().getTime();	// for 性能检测
let isBrandMount = false,
		isCategoryMount = false,
		reflectBrandData,
		reflectCategoryData;

let brandInstance,
		categoryInstance,
		pageActiveObj = new PageActive();

let firstFetchApi = BackendApiCategory;
let firstFetchCallback = (data) => {
	reflectCategoryData = getCategoryReflectData(data);
	data = null;
	mountSubPage(false);
	// let locationHash = location.hash;
	// if (locationHash.length === 0 || locationHash === '#category') {
	// }
};
let nextFetchApi = BackendApiBrand;
let nextFetchCallback = (data) => {
	reflectBrandData = getBrandReflectData(data);
	data = null;
	isBrandMount = true;
	mountSubPage(true);
}

if (location.hash === '#brand') {
	let tmpFetchCallback = firstFetchCallback;
	firstFetchApi = BackendApiBrand;
	firstFetchCallback = nextFetchCallback;
	nextFetchApi = BackendApiCategory;
	nextFetchCallback = tmpFetchCallback;
}

// 数据状态, riotux in Tercent X5 not supported!!!
let stateStore = {
	subpageId: 'a',
	$brand: null,
	$category: null
};

// for qqw-op tag mixin
function qqwOpMixin() {
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
	this.stateStore = stateStore;
}

(new QqwApp())
		.domReady(() => {
			FastClick.attach(document.body);
			stateStore.$brand = document.getElementById('brand');
			stateStore.$category = document.getElementById('category');
  		pageClassActiveHandler(stateStore.$brand);
  		pageClassActiveHandler(stateStore.$category);
			riot.mixin('util', qqwOpMixin);
		})
		.fetch(firstFetchApi, firstFetchCallback)
		.fetchNext(nextFetchApi, nextFetchCallback)
		.start();

/**
 * 挂载对应的子页面并切换子页面标题
 * @param  {Boolean} isbrand [是否为“发现”子页面]
 * @return {[type]}              [description]
 */
function mountSubPage(isbrand) {
	if (isbrand) {
		brandInstance = riot.mount('brandsubpage', reflectBrandData)[0];
	} else {
		categoryInstance = riot.mount('categorysubpage', reflectCategoryData)[0];
	}
}

/**
 * 子页面标题点击 tap 事件处理器
 *   - 切换标题和挂载子页面（如果没有挂载mount的话）
 * @param  {[type]} $selector [description]
 * @return {[type]}           [description]
 */
function pageClassActiveHandler($selector) {
	EventUtil.addHandler($selector, "click", (e) => {
  	e = EventUtil.getEvent(e);
  	let target = EventUtil.getTarget(e);
    EventUtil.preventDefault(event);
    EventUtil.stopPropagation(event);
   	if (target.id === 'brand' || target.parentElement.id === 'brand') {
   		if (!isBrandMount) {
   			isCategoryMount = false;
   			isBrandMount = true;
   			mountSubPage(true);
   		}
   		pageActiveObj.trigger('brand');
   		return ;
   	}
   	if (!isCategoryMount) {
   		isBrandMount = false;
   		isCategoryMount = true;
   		mountSubPage(false);
   	}
   	pageActiveObj.trigger('category');
  });
}

/**
 * 子页面标题“订阅 - 监听”对象
 */
function PageActive() {
	riot.observable(this);
  this.on('brand', () => {
  	toggleTitleStyle(true);
  	stateStore.subpageId = 'b';
		categoryInstance.update();
		brandInstance.update();
  });
  this.on('category', () => {
  	toggleTitleStyle(false);
  	stateStore.subpageId = 'a';
		brandInstance.update();
		categoryInstance.update();
  });
}

function toggleTitleStyle(isBrand) {
	if (isBrand) {
		stateStore.$category.className = 'category-submenu-item';
		stateStore.$brand.className = 'category-submenu-item category-submenu-item--active';
	} else {
		stateStore.$brand.className = 'category-submenu-item';
		stateStore.$category.className = 'category-submenu-item category-submenu-item--active';
	}
}

/**
 * 字典映射 - “发现”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
function getBrandReflectData(data) {
	let reflectData = {};
	reflectData.isSubpageActive = true;
	reflectData.column = [];
	Array.from(data.list).map((item) => {
		let reflectSub = {
			id: 'brand' + item.brand_id,
			url: '/mobile-brand?brand_id=' + item.brand_id,
			name: item.brand_name,
			logo: item.brand_logo,
			pic: item.brand_picture,
			minPrice: '￥ ' + item.min_price + ' 起'
		}
		reflectData.column.push(reflectSub);
	});

	return reflectData;
}

/**
 * 字典映射 - “商品分类”子页面接口数据
 * @param  {[type]} data [接口数据]
 */
function getCategoryReflectData(data) {
	let reflectData = {};
	let urlPrefix = '/mobile-goods/list?cat_id=';

	reflectData.categorySubpageId = 'a',
	reflectData.category = [];
	Array.from(data).map((item) => {
		let reflectItem = {
			id: item.cat_id,
			url: urlPrefix + item.cat_id + '&title=' + item.cat_name,
			pic: item.cat_img,
			title: '' + item.cat_name,
			// level: item.level,
			children: []
		};
		Array.from(item.child).map((child) => {
			let subItem = {
				id: child.cat_id,
				url: urlPrefix + child.cat_id + '&title=' + child.cat_name,
				pic: child.cat_img,
				name: '' + child.cat_name
			}
			reflectItem.children.push(subItem);
		});

		reflectData.category.push(reflectItem);
	});
	// reflectData.items.push({
	// 	url: '',
	// 	more: '查看更多'
	// });
	return reflectData;

}
