<template>
  <div>
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
    <p>age: {{ age }}</p>
    <p>gender: {{ gender }}</p>
  </div>

  <router-link tag="span" :to="{ path: '/blog/be/java', query: { a: 123 } }"
    >go to</router-link
  >

  <child />
</template>
<script lang="ts">
import {
  defineComponent,
  provide,
  reactive,
  toRefs,
  ref,
} from "@vue/runtime-core";
import Child from "./child.vue";

export default defineComponent({
  components: {
    Child,
  },
  setup() {
    // 定义一个reactive对象
    const userInfo = reactive({
      id: 1,
      name: "Petter",
      age: 18,
      gender: "male",
    });

    const name = [11, 22, 33];
    provide("name", name);

    // 定义一个新的对象，它本身不具备响应性，但是它的字段全部是ref变量
    const userInfoRefs = toRefs(userInfo);

    // 2s后更新userInfo
    setTimeout(() => {
      userInfo.id = 2;
      userInfo.name = "Tom";
      userInfo.age = 20;

      name.push(88);
    }, 2000);

    // 在这里结构toRefs对象才能继续保持响应式
    return {
      ...userInfoRefs,
    };
  },
});
</script>
