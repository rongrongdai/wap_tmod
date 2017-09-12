const actions = riotux.Actions({
	init_page_title_selector: function ( store, selectors) {
		store.dispatch('init_page_title_selector', selectors);
	},
	toggle_title_style: function ( store, isDiscovery ) {
		store.dispatch('toggle_title_style', isDiscovery);
	},
  toggle_discovery: function ( store ) {
    store.dispatch('toggle_discovery');
  },
  toggle_category: function ( store ) {
  	store.dispatch('toggle_category');
  }
});

export { actions };

