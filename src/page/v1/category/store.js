const store = riotux.Store({
  state: {
    selectors: {},
    subpageId: 'a'			// '商品分类'子页面id = 'a', '品牌制造商'子页面id = 'b',
  },
  mutations: {
  	init_page_title_selector: function (state, selectors) {
  		state.selectors.brand = selectors.brand;
  		state.selectors.category = selectors.category;
  	},
  	toggle_title_style: function (state, isBrand) {
  		if (isBrand) {
	  		state.selectors.category.className = 'category-submenu-item';
				state.selectors.brand.className = 'category-submenu-item category-submenu-item--active';
  		} else {
	  		state.selectors.brand.className = 'category-submenu-item';
				state.selectors.category.className = 'category-submenu-item category-submenu-item--active';
  		}
  	},
    toggle_brand: function ( state ) {
      state.subpageId = 'b';
    },
    toggle_category: function ( state ) {
      state.subpageId = 'a';
    }
  }
});

export { store };