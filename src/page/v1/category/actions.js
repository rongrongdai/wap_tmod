const actions = riotux.Actions({
	init_page_title_selector: function ( store, selectors) {
		store.dispatch('init_page_title_selector', selectors);
	},
	toggle_title_style: function ( store, isBrand ) {
		store.dispatch('toggle_title_style', isBrand);
	},
  toggle_brand: function ( store ) {
    store.dispatch('toggle_brand');
  },
  toggle_category: function ( store ) {
  	store.dispatch('toggle_category');
  }
});

export { actions };

