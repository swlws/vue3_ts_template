<template>
  <div class="child">
    <h2>child</h2>
    <p>{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref, watch } from "@vue/runtime-core";

export default defineComponent({
  setup() {
    const name = inject("name") as string;

    setTimeout(() => {
      console.log(name);
      console.log(name.length);
    }, 3000);

    return {
      name,
    };
  },
});
</script>

<style lang="scss" scoped>
.child {
  border: 1px solid #e8e8e8;
  margin: 10px;
  padding: 10px;
}
</style>
