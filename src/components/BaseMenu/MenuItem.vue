<template>
  <el-popover
    placement="bottom"
    trigger="hover"
    v-if="hasChild"
    v-model:visible="visible"
  >
    <section class="menu-body" ref="menuGroupRef">
      <div
        v-for="item in data.child"
        :key="item.id"
        class="item leaf-item"
        :class="{ 'three-checked': item.id === threeId }"
        :data-id="item.id"
        :data-pid="item.pid"
        :data-path="item.path"
      >
        <span>{{ item.label }} </span>
      </div>
    </section>

    <template #reference>
      <div class="menu-item" :class="{ 'two-checked': data.id === twoId }">
        {{ data.label }}
      </div>
    </template>
  </el-popover>
  <div
    v-else
    class="menu-item"
    :class="{ 'two-checked': data.id === twoId }"
    @click="secondClick"
  >
    {{ data.label }}
  </div>
</template>

<script lang="ts">
import { clickProxy } from "@/lib/dom";
import router from "@/router";
import { computed, defineComponent, onMounted, ref } from "@vue/runtime-core";
import { TMenuItem } from "./menu";

export default defineComponent({
  name: "MenuItem",
  props: {
    data: {
      type: Object,
      default: () => ({} as TMenuItem),
    },
    twoId: {
      type: String,
      default: "",
    },
    threeId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const menuGroupRef = ref();
    const visible = ref(false);

    onMounted(() => {
      clickProxy(menuGroupRef.value as HTMLElement, (target) => {
        const id = target.dataset.id;
        const pid = target.dataset.pid;
        const path = target.dataset.path;
        if (!path) return;

        router.push(path);
        emit("update:threeId", id);
        emit("update:twoId", pid);

        visible.value = false;
      });
    });

    const hasChild = computed(() => {
      const data = props.data;
      return Array.isArray(data.child) && data.child.length > 0;
    });

    const secondClick = () => {
      const path = props.data.path;
      const id = props.data.id;

      if (!path) return;

      router.push(path);
      emit("update:threeId", "");
      emit("update:twoId", id);
    };

    return {
      menuGroupRef,
      visible,
      hasChild,
      secondClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-item {
  cursor: pointer;
  margin: 0px 10px;
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

.two-checked {
  color: #42b983;
}

.menu-body {
  .leaf-item {
    cursor: pointer;
    margin: 10px 5px;
    padding: 10px 5px;
    border-bottom: 1px solid #e8e8e8;

    font-size: 14px;
    padding: 0px 5px;
    color: #666;
  }

  .three-checked {
    color: #42b983;
    border-bottom: 1px solid #42b983;
  }
}
</style>
