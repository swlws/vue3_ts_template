<template>
  <header class="search-fileds">
    <span>最近</span>
    <input type="number" v-model.number="days" />
    <span>天</span>
  </header>
  <base-data-grid :columns="columns" :list="data"></base-data-grid>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "@vue/runtime-core";

import { dataList } from "../@bussiness/main";
import { COLUMNS_PROJECT_ISSUE_USER } from "../@bussiness/columns";

export default defineComponent({
  name: "project-issue-user",
  setup() {
    const { days, data } = toRefs(dataList(`/api/v1/piu`));

    return {
      days,
      columns: COLUMNS_PROJECT_ISSUE_USER,
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-fileds {
  padding: 10px 10px;
  border-bottom: 1px solid #e8e8e8;

  > span {
    padding: 0px 5px;
  }

  > input {
    height: 20px;
    width: 50px;
  }
}
</style>
