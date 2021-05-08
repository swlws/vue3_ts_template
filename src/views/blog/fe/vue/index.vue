<template>
  <div>
    <p>id: {{ id }}</p>
    <p>name: {{ name }}</p>
    <p>age: {{ age }}</p>
    <p>gender: {{ gender }}</p>
  </div>

  <button @click="dobus">do bus</button>

  <router-link tag="span" :to="{ path: '/blog/be/java', query: { a: 123 } }"
    >go to</router-link
  >
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "@vue/runtime-core";

import { getBus } from "@lib/eventbus";

export default defineComponent({
  setup() {
    // 定义一个reactive对象
    const userInfo = reactive({
      id: 1,
      name: "Petter",
      age: 18,
      gender: "male",
    });

    // 定义一个新的对象，它本身不具备响应性，但是它的字段全部是ref变量
    const userInfoRefs = toRefs(userInfo);

    // 2s后更新userInfo
    setTimeout(() => {
      userInfo.id = 2;
      userInfo.name = "Tom";
      userInfo.age = 20;
    }, 2000);

    getBus("swl").once("show", () => {
      console.log(123);
    });

    const dobus = () => {
      getBus("swl").emit("show");
    };

    // 在这里结构toRefs对象才能继续保持响应式
    return {
      ...userInfoRefs,
      dobus,
    };
  },
});
</script>
