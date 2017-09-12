const actions = riotux.Actions({
  // reset_collect_change (state) {
  //   store.dispatch('reset_collect_change');
  // },
  // do_collect_change (state) {
  //   store.dispatch('do_collect_change');
  // },
  go_each_items ( store ) {
    store.dispatch('go_each_items');
  },
  update_rendered_item_idx (store) {
  	store.dispatch('update_rendered_item_idx');
  },
  add_items_to_cache (store, items) {
  	store.dispatch('add_items_to_cache', items);
  },
  prefetch_finished (store) {
  	store.dispatch('prefetch_finished');
  },
  shutdown_to_fetch (store) {
  	store.dispatch('shutdown_to_fetch');
  },
  add_page_idx (store) {
  	store.dispatch('add_page_idx');
  }
});

export { actions };
