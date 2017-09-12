import './card_address.scss';
import './card-list.tag';
import { QqwUtil } from '../../../../js/qqw_ultilities';
import { EventUtil } from '../../../../js/qqw_eventutil';

    let reflectData,
    cardheadIstall,
    cardIscrollInstance,
    scrollHandler,
    globalIndex="1"       
    QqwUtil.main(function*(){
            riot.mixin('util', qqwOpMixin);
	          riot.mixin('event', EventUtil);
            riot.mount('card-list');
	});
function qqwOpMixin() {
	this.ajaxData = QqwUtil.ajaxData;
	this.$q = QqwUtil.$q;
	this.each = QqwUtil.each;
}    