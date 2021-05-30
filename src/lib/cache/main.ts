import { PlainObject } from "@/typings/app";
import { initHook } from "./hook";
import { initMixin } from "./init";
import { initMethod } from "./method";

function Cache(options: PlainObject) {
  this._init(options);

  return this;
}

initMixin(Cache);
initHook(Cache);
initMethod(Cache);

export default Cache;
