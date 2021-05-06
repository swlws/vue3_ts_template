import { makeTree } from "@/lib/tool";
import router from "@/router";
import { ref } from "@vue/reactivity";
import { computed, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";

/**
 * 菜单数据类型声明
 */
export type TMenuItem = {
  id: string;
  pid?: string;
  label: string;
  path?: string;
};

function currentRouteInfo(data: TMenuItem[]) {
  const route = useRoute();
  const match = route.matched.slice(-1)[0];
  if (!match) return ["", "", ""];

  const path = match.path;
  const obj = data.find((item) => item.path === path);
  if (!obj) return ["", "", ""];

  const ids = [obj.pid, obj.id];
  const tmp = data.find((item) => item.id === obj.pid);
  if (tmp) {
    ids.unshift(tmp.pid);
  }

  return ids;
}

/**
 * Menu业务处理
 *
 * @param data
 * @returns
 */
export function menu(data: TMenuItem[]) {
  const ids = currentRouteInfo(data);

  const oneId = ref(ids[0]);
  const twoId = ref(ids[1]);
  const threeId = ref(ids[2]);

  const treeMenu = makeTree(data);

  const firstLevelMenu = computed(() => {
    return treeMenu.map((item) => {
      const info = { ...item };
      Reflect.deleteProperty(info, "child");

      return info;
    });
  });

  const secondLevelMenu = computed(() => {
    if (!Array.isArray(treeMenu) || treeMenu.length === 0) return [];

    const id = oneId.value || treeMenu[0].id;
    oneId.value = id;

    const data = treeMenu.find((item) => item.id === id)?.child || [];
    twoId.value = data.length > 0 ? data[0].id : "";

    const hasThreeLevel =
      data[0] && Array.isArray(data[0].child) && data[0].child.length > 0;
    threeId.value = hasThreeLevel ? data[0].child[0].id : "";

    return data;
  });

  watch(oneId, (v) => {
    const twoLevel = treeMenu.find((item) => item.id === v).child;
    if (!Array.isArray(twoLevel) || twoLevel.length === 0) return;

    const threeLevel = twoLevel[0].child;
    if (Array.isArray(threeLevel) && threeLevel.length > 0) {
      router.push(threeLevel[0].path);
    } else {
      router.push(twoLevel[0].path);
    }
  });

  return {
    oneId,
    twoId,
    threeId,
    firstLevelMenu,
    secondLevelMenu,
  };
}
