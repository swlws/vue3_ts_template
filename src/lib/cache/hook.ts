function created(Cache: any) {}

function beforeDestroy(Cache: any) {}

function destroyed(Cache: any) {}

export function initHook(Cache: any) {
  created(Cache);
  beforeDestroy(Cache);
  destroyed(Cache);
}
