import { App } from "@vue/runtime-core";

import FrameView from "./FrameView/index.vue";
import BaseDataGrid from "./BaseDataGrid/index.vue";

export default function install(app: App) {
  app.component(FrameView.name, FrameView);
  app.component(BaseDataGrid.name, BaseDataGrid);
}
