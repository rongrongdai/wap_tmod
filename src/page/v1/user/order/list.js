import './orderList.scss';
import { QqwUtil, Loading } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';
import { PullPush } from '../../../../js/qqw_pullpush';
import QqwPagestate from '../../../../js/qqw_pagestate';
import QqwApp from '../../../../js/qqw_app';

// import template from '../../../../js/template-native-debug.js';
// import tpl_userOrderList from '../../../../tpl/user_order_list.tpl';
// import { orderApi, doBtnClick } from './order_module';

let OrderListApp
		, tplRender
		, orderStor
		, scrollHandler
		, orderListType = 'all'
		, fetchListCallback
		, $cancelOrderForm
		, $cancelOrderBtn
		, $confirmCancelBtn
		;

let cancelReasonArr = ['我不想买了', '信息填写错误，重新下单', '下错单了', '其它原因'];
let orderList = {
	all: { type: 'all', list: [], size: 0, lastSize: 0, curIdx: 0 },
	unpaid: { type: 'unpaid', list: [], size: 0, lastSize: 0, curIdx: 0  },
	unexpressed: { type: 'unexpressed', list: [], size: 0, lastSize: 0, curIdx: 0  },
	expressed: { type: 'expressed', list: [], size: 0, lastSize: 0, curIdx: 0  },
	unrated: { type: 'unrated', list: [], size: 0, lastSize: 0, curIdx: 0  },
};

let doBtnClickLoading = new Loading();

// 数据状态
orderStore = {
	p: 1,
	lastP: 1,
	ps: 48,			// 抓取48条
	each: 12,		// 每次渲染加载12条
	totalItemCount: 0,
	orderItemIdx: 0,		// 已加载条数，当数据只剩下12条未渲染时，预先抓取
	orderItemArr: [],		// 缓存已加载的数据
	type: 1,
	speed: 5,
	scrollSignDistance: 40,
	flag: true,			// 还有更多数据？
	isLock: false,
	loading: new Loading(true)
};

fetchListCallback = (data) => {
		makeListReflectData(data, orderListType);
		orderStore.totalItemCount += data.length;
		orderStore.flag = data.length < orderStore.ps ? false : true;
		orderStore.flag && ++orderStore.p;
		orderStore.orderItemArr =
				orderStore.orderItemArr.concat(
					orderList[orderListType].list.slice(orderList[orderListType].lastSize, orderList[orderListType].size));
		scrollHandler.setHandling(false);
	};

// 监听滚动事件
scrollHandler = new PullPush(orderStore.scrollSignDistance, () => {
	if (!orderStore.flag) {			// 没有更多数据了
		if (orderStore.orderItemIdx < (orderStore.totalItemCount - 1)) {
			renderOrder();
		} else {
			scrollHandler.cancelOb();
		}
		return ;
	}
	if (orderStore.lastP !== orderStore.p) {		// 分页索引相等则表示先前的网络请求没有返回或失败
		// 1. 检测是否到达预先抓取的条件
		if ((orderStore.orderItemIdx + orderStore.each) >= orderStore.totalItemCount) {
			let paramObj = { type: orderStore.type, p: orderStore.p, ps: orderStore.ps };
			orderStore.lastP = orderStore.p;
			scrollHandler.setHandling(true);
			OrderListApp.doAjaxFetch();
		}
	}
	// 2. 加载更多
	renderOrder();
});

let searchJson = QqwUtil.getSearchToJson();

OrderListApp = new QqwApp();

if (searchJson.reason) {
	QqwUtil.main(function*(){
		yield EventUtil.domReady();
		document.getElementById('orderNav').style.display = 'none';
		document.getElementById('cancelReason').innerHTML += searchJson.reason;
		document.getElementById('cancelOk').className = '';
		EventUtil.addHandler(document.getElementById('checkCancelDetail'), 'click', (event) => {
			event = EventUtil.getEvent(event);
    	let target = EventUtil.getTarget(event);
    	EventUtil.preventDefault(event);
			location.replace('/mobile-user-order/detail?order_sn=' + searchJson.ordersn);
		});
	});

} else {

	orderStore.type = +(searchJson.type);

	OrderListApp
		.domReady(() => {
			orderStore.loading.show();

			if (orderStore.type !== 1) {
				let navItem = orderStore.type - 1;
				// 导航菜单效果切换
				let $choose = $('.order-nav-item').eq(navItem);
				if ($choose.hasClass('order-nav-item--active')) {
					return ;
				}
				$choose.addClass('order-nav-item--active').siblings().removeClass('order-nav-item--active');
				switch (orderStore.type) {
					case 1: orderListType = 'unpaid'; break;
					case 2: orderListType = 'unexpressed'; break;
					case 3: orderListType = 'expressed';  break;
					case 4: orderListType = 'unrated'; break;
					default: orderListType = 'all'; break;
				}
			}

			FastClick.attach(document.body);			// 移动端点击事件 hack
			tplRender = template.compile(tpl_userOrderList);
			bindOrderList();
			bindOrderNav();
			$cancelOrderForm = document.getElementById('cancelOrderForm');
			$cancelOrderBtn = document.getElementById('cancelBtn');
			$confirmCancelBtn = document.getElementById('confirmCancelBtn');
		})
		.useScrollListener(scrollHandler)
		.useStateParam(() => {
			return {type: orderStore.type, p: orderStore.p, ps: orderStore.ps };
		})
		.initAfterFirstFetch(renderOrder)
		.fetch(orderApi.listOrder, fetchListCallback)
		.start();

}

function renderOrder() {
	let curItemArr = orderStore.orderItemArr.slice(orderStore.orderItemIdx, orderStore.orderItemIdx + orderStore.each);
	orderStore.orderItemIdx += orderStore.each;
	orderList[orderListType].curIdx = orderStore.orderItemIdx;
	QqwUtil.renderTemplate.append( 'U-orderList', tplRender({list: curItemArr}) );
}

function makeListReflectData(data, type) {
	orderList[type].lastSize = orderList[type].size;
	Array.from(data).map((item) => {
		let listItem = [];
		for (let idx = 0, size = item.goods_list.length; idx < size; ++idx) {
			let goodItem = {
				sn: '订单编号：' + item.order_sn,
				order_sn: item.order_sn,
				packageStatus: item.status,
				pay: '实付：' + item.order_amount,
				goods_id: item.goods_list[idx].order_id,
				goods_name: item.goods_list[idx].goods_name,
				goods_attr: '共 ' + item.goods_list[idx].goods_number + ' 个商品',
				shop_price: item.goods_amount,
				goods_number: '',
				goods_thumb: item.goods_list[idx].goods_thumb,
				status_code: item.status_code,
				isNotlist: false,		// 订单详情？
			};
			listItem.push(goodItem);
			break ;
		}
		orderList[type].list.push({goods_list: listItem});
	});
	orderList[type].size = orderList[type].list.length;
}

// ===========================================================
/**
 * 订单列表模板父结点绑定click事件
 * @return {[type]} [description]
 */
function bindOrderList() {
	EventUtil.addHandler(document.body, 'click', (event) => {
  	event = EventUtil.getEvent(event);
    let target = EventUtil.getTarget(event);
    if (target.nodeName === 'BUTTON') {
    	EventUtil.stopPropagation(event);
    	EventUtil.preventDefault(event);
    	console.log(target.dataset);
    	if (target.dataset.btnName === 'btnCancel') {
    		$cancelOrderForm.className = 'cancelOrder';
    		$confirmCancelBtn.dataset.btnName = target.dataset.btnName;
    		$confirmCancelBtn.dataset.orderSn = target.dataset.orderSn;
    		return ;
    	}
    	doBtnClick(target.dataset.btnName, target.dataset.orderSn);
    	return ;
    }
    if (target.id === 'confirmCancelBtn') {
    	$cancelOrderForm.className += ' hidden';
    	doBtnClickLoading.show();
    	doBtnClick(target.dataset.btnName, target.dataset.orderSn, (data) => {
    		doBtnClickLoading.hide();
    		document.getElementById( 'orderItemStatus' + (+(target.parentElement.id)) ).innerHTML = '交易关闭';
    		let $orderBtn = document.getElementById( (+(target.parentElement.id)) + 'orderItemBtn' );
    		$orderBtn.firstElementChild.className += ' hidden';
    		$orderBtn.lastElementChild.className += ' hidden';
    		// 清除缓存相关记录, order_sn
    		let unpaidIndex = 0;
    		let unexpressedIndex = 0;
    		let orderSn = target.dataset.orderSn;
    		Array.from(orderList.all.list).map((item, idx) => {
    			if (item.order_sn === orderSn) {
    				allIndex = idx;
    				orderList.all.list[idx].status = '交易关闭';
    				orderList.all.list[idx].status_code = [];
    			}
    		});
    		// ============ 代付款取消订单
    		for (let k = 0, size = orderList.unpaid.list.length; k < size; ++k) {
    			if (orderList.unpaid.list[k].order_sn === ordersn) {
    				unpaidIndex = k;
    				break;
    			}
    		}
    		let tmpList = orderList.unpaid.list;
    		orderList.unpaid.list = [...tmpList.slice(0, unpaidIndex), ...tmpList.slice((unpaidIndex + 1), tmpList.length)];
    		// ============ 代发货取消订单
    		for (let k = 0, size = orderList.unexpressed.list.length; k < size; ++k) {
    			if (orderList.unexpressed.list[k].order_sn === ordersn) {
    				unexpressedIndex = k;
    				break;
    			}
    		}
    		tmpList = orderList.unexpressed.list;
    		orderList.unexpressed.list = [...tmpList.slice(0, unexpressedIndex), ...tmpList.slice((unexpressedIndex + 1), tmpList.length)];
    		// 跳转显示取消成功页面
    		let $cancelReasonChoosen = QqwUtil.$q('.or_item1');
    		for (let j = 0, size = $cancelReasonChoosen.length; j < size; ++j) {
    			if ($cancelReasonChoosen[j].checked) {
		    		// location.href = location.href + '?ordersn=' + ordersn + '&reason=' + cancelReasonArr[+($cancelReasonChoosen[j].value)];
    				break;
    			}
    		}
    	});
    	return ;
    } else if (target.id === 'cancelBtn') {
    	$cancelOrderForm.className += ' hidden';
    }
    if (target.className.indexOf('list') !== -1) {
    	location.href = orderApi.gotoOrderDetail + target.dataset.order_sn;
    }
  });
}

/**
 * 订单列表模板点单全部点击事件
 * @return {[type]} [description]
 */
function bindOrderNav() {
	EventUtil.addHandler(document.getElementById('orderNav'), 'click', (event) => {
		event = EventUtil.getEvent(event);
		let target = EventUtil.getTarget(event);
		if (target.nodeName === 'SPAN') {
			let navItem = parseInt(target.dataset.nav, 10) - 1;
			// 导航菜单效果切换
			let $choose = $('.order-nav-item').eq(navItem);
			if ($choose.hasClass('order-nav-item--active')) {
				return ;
			}
			$choose.addClass('order-nav-item--active').siblings().removeClass('order-nav-item--active');
			// 重置状态
			restoreOrderStoreStatus();
			switch (navItem) {
				case 1: orderListType = 'unpaid'; orderStore.type = 2; break;
				case 2: orderListType = 'unexpressed'; orderStore.type = 3; break;
				case 3: orderListType = 'expressed'; orderStore.type = 4; break;
				case 4: orderListType = 'unrated'; orderStore.type = 5; break;
				default: orderListType = 'all'; orderStore.type = 1; break;
			}
			// 恢复原先位置
			if (orderList[orderListType].size != 0) {
				orderStore.p = orderList[orderListType].size / orderStore.ps;
				orderStore.lastP = orderStore.p - 1;
				orderStore.totalItemCount = orderList[orderListType].size;
				orderStore.orderItemArr = orderList[orderListType].list;
				// orderStore.orderItemIdx = orderList[orderListType].curIdx;		// 取消一次性渲染缓存的数据
			} else {
				removeOrderList();
				// 发网络链接
				OrderListApp
					.useStateParam(() => {
						return {type: orderStore.type, p: orderStore.p, ps: orderStore.ps };
					})
					.initAfterFirstFetch(renderOrder)
					.doAjaxFetch();
					return ;
			}
			// 暂时滚动到顶部
			removeOrderList();
			renderOrder();

			EventUtil.stopPropagation(event);
			EventUtil.preventDefault(event);
			return ;
		}

	});
}

function removeOrderList() {
	let $orderList = document.getElementById('U-orderList');
	let size = $orderList.childNodes.length;
	while (size > 0) {
		$orderList.removeChild($orderList.childNodes[0]);
		--size;
	}
}

function restoreOrderStoreStatus() {
	orderStore.p = 1;
	orderStore.lastP = 1;
	orderStore.totalItemCount = 0;
	orderStore.orderItemIdx = 0;
	orderStore.orderItemArr = [];
}

///**
// * 订单列表模板点单待付款点击事件
// * @return {[type]} [description]
// */
//function bindOrderPayment() {
//	EventUtil.addHandler(document.getElementById('orderPayment'), 'click', (event) => {
//		event = EventUtil.getEvent(event);
//		let target = EventUtil.getTarget(event);
//		if (target.nodeName === 'SPAN') {
//			EventUtil.stopPropagation(event);
//			EventUtil.preventDefault(event);
//			doNavClick();
//			return ;
//		}
//
//	});
//}



