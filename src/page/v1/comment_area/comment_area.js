import './comment_area.scss';
import './comment_area.tag';
import { AnimationUtil } from '../../../js/qqw_animation';
import { QqwUtil ,valiatorReg} from '../../../js/qqw_ultilities';
import { EventUtil } from '../../../js/qqw_eventutil';
import { PullPush } from '../../../js/qqw_pullpush.js';
import QqwApp from '../../../js/qqw_app';


let commentApp
    ,loginInstance
;
commentApp = new QqwApp();
function qqwOpMixin() {
  this.$q = QqwUtil.$q;
  this.each = QqwUtil.each;
  this.ajaxData = QqwUtil.ajaxData;
  this.msg = QqwUtil.msg;
}
// 主控制器
commentApp.domReady(() => {
      riot.mixin('util', qqwOpMixin);
      riot.mixin('event', EventUtil);
      riot.mixin('valiatorReg', valiatorReg);

      loginInstance = riot.mount('commentarea')[0];
      loginInstance.update;
    })
    .start();

  








