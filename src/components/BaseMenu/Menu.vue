<template>
  <el-popover
    placement="bottom-start"
    trigger="hover"
    width="500px"
    v-model:visible="visible"
  >
    <section class="menu-body" ref="bodyRef">
      <div
        v-for="item in data"
        :key="item.id"
        class="item"
        :class="{ checked: item.id === checkedId }"
        :data-id="item.id"
      >
        <i class="el-icon-menu"></i>
        <span>{{ item.label }}</span>
      </div>
    </section>

    <template #reference>
      <div class="menu-title">
        <i class="el-icon-s-grid"></i>
        <div></div>
        <span class="title">菜单</span>
      </div>
    </template>
  </el-popover>
</template>

<script lang="ts">
import { clickProxy } from "@/lib/dom";
import { defineComponent, onMounted, ref } from "@vue/runtime-core";
import { TMenuItem } from "./menu";

export default defineComponent({
  name: "Menu",
  props: {
    data: {
      type: Array,
      default: () => [] as TMenuItem[],
    },
    checkedId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const bodyRef = ref(null);

    onMounted(() => {
      clickProxy(bodyRef.value as any, (target) => {
        emit("update:checkedId", target.dataset.id);

        visible.value = false;
      });
    });

    return {
      visible,
      bodyRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  > .item {
    cursor: pointer;
    padding: 10px;
    margin: 10px;
    border: 1px solid #e8e8e8;
    box-shadow: 0px 5px 10px 0px #e8e8e8;

    display: flex;
    align-items: center;

    > i {
      font-size: 20px;
      margin: 0px 10px;
    }

    &.checked {
      color: #42b983;
      border: 1px solid #42b983;
    }
  }
}

.menu-title {
  padding: 10px;

  display: flex;
  align-items: center;

  > i {
    font-size: 20px;
    padding: 0px 8px 0px 0px;
    margin: 0px 8px 0px 0px;

    position: relative;
    &::after {
      content: " ";

      width: 3px;
      height: 100%;

      background-color: #ff6a00;

      position: absolute;
      top: 0px;
      right: 0px;
    }
  }

  > span {
    color: #333;
    font-size: 16px;
  }
}
</style>
