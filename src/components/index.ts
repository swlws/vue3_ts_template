import { App } from "@vue/runtime-core";

import FrameView from "./FrameView/index.vue";
import BaseMenu from "./BaseMenu/index.vue";

export default function install(app: App) {
  app.component(FrameView.name, FrameView);
  app.component(BaseMenu.name, BaseMenu);
}
