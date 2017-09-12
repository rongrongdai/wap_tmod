import './red_list.scss';
import './red_list.tag';
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
riot.mount('redlist');
