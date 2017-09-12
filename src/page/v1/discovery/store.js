const store = riotux.Store({
  state: {
    selectors: {},
    subpageId: 'a'			// '发现'子页面id = 'a', '商品分类'子页面id = 'b'
  },
  mutations: {
  	init_page_title_selector: function (state, selectors) {
  		state.selectors.discovery = selectors.discovery;
  		state.selectors.category = selectors.category;
  	},
  	toggle_title_style: function (state, isDiscovery) {
  		if (isDiscovery) {
	  		state.selectors.category.className = 'discovery-submenu-item';
				state.selectors.discovery.className = 'discovery-submenu-item discovery-submenu-item--active';
  		} else {
	  		state.selectors.discovery.className = 'discovery-submenu-item';
				state.selectors.category.className = 'discovery-submenu-item discovery-submenu-item--active';
  		}
  	},
    toggle_discovery: function ( state ) {
      state.subpageId = 'a';
    },
    toggle_category: function ( state ) {
      state.subpageId = 'b';
    }
  }
});

export { store };