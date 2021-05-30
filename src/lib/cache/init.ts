import { PlainObject } from "@/typings/app";
import { initStorage } from "./init/storage";
import { initIndexDB } from "./init/indexdb";
import { initServiceWorker } from "./init/servie-worker";

export function initMixin(Cache: any) {
  console.log("initMixin", Cache);

  Cache.prototype._init = function (options: PlainObject) {
    // eslint-disable-next-line
    const self = this;
    self.$options = options;

    initStorage(Cache);
    initIndexDB(Cache);
    initServiceWorker(Cache);
  };
}

function checkOptions(mode: string, options: PlainObject) {
  console.log("check options");
}
