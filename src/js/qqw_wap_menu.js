import { EventUtil } from './qqw_eventutil.js'

function bindSliderMenu() {

	EventUtil.addHandler(document.getElementById('sidebarMenu'), 'click', (e) => {
		e = EventUtil.getEvent(e);
  	let target = EventUtil.getTarget(e);
  	if (target.nodeName === 'IMG') {
  		target = target.parentElement;
  	}
  	let $sidebarFade = $('#sidebarFade');
  	let $sidebarMenu = $('.slider_list');
  	if (target.dataset.open === '1') {
      $sidebarFade.removeClass('hidden');
      $sidebarMenu.addClass('cbp-spmenu-open');
      target.dataset.open = '0';
      return;
    } else {
      $sidebarFade.addClass('hidden');
      $sidebarMenu.removeClass('cbp-spmenu-open');
      target.dataset.open = '1';
      return;
    }
	});

}

export default bindSliderMenu;
