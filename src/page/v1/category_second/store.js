const store = riotux.Store({
  state: {
    // collect_change: false,
    items: [],
    items_idx: 0,
    total_itmes: 0,
    items_cache: [],
    has_more: true,
    should_prefetch: false,
    each_count: 12,   // 每次渲染12条数据
    page_idx: 0,
    ps: 48
  },
  mutations: {
    // reset_collect_change (state) {
    //   state.collect_change = false;
    // },
    // do_collect_change (state) {
    //   state.collect_change = true;
    // },
  	go_each_items (state) {
      let sizeOfCache = state.items_cache.length;
      let endIdx = state.items_idx + state.each_count;
      if (endIdx <= sizeOfCache) {
        state.items = state.items_cache.slice(state.items_idx, endIdx);
        if ((endIdx + state.each_count) >= sizeOfCache && state.has_more) {
          state.should_prefetch = true;
        }
      } else {
        state.items = state.items_cache.slice(state.items_idx, sizeOfCache);
      }
    },
    update_rendered_item_idx (state) {
      state.items_idx += state.each_count;
    },
    add_items_to_cache (state, items) {
      state.items_cache = state.items_cache.concat(items);
      state.total_itmes = state.items_cache.length;
    },
    prefetch_finished (state, items) {
      state.should_prefetch = false;
    },
    shutdown_to_fetch (state) {
      state.has_more = false;
    },
    add_page_idx (state) {
      state.page_idx += 1;
    }
  }
});

export { store };