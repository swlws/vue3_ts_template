<template>
  <article class="home-frame">
    <base-menu :data="menuData" />

    <section>
      <router-view></router-view>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import menuData from "../../data/menus";

export default defineComponent({
  setup() {
    return {
      menuData,
    };
  },
});
</script>

<style lang="scss">
.home-frame {
  height: 100%;
  display: flex;
  flex-direction: column;

  > section {
    flex: 1;
    overflow: auto;
  }
}
</style>
