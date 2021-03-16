<template>
  <table class="dgrid">
    <tr>
      <th v-for="(title, index) in tableHeader" :key="index">{{ title }}</th>
    </tr>
    <tr v-for="(row, index) in tableBody" :key="index">
      <td v-for="(title, cIndex) in row" :key="cIndex">{{ title }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { FreeObject } from "@/types/app";
import { DataGrid } from "@/types/component";
import {
  defineComponent,
  toRefs,
  Ref,
  computed,
  PropType,
} from "@vue/runtime-core";

function formatGridDataList(
  columns: Ref<DataGrid.Column[]>,
  data: Ref<FreeObject[]>
) {
  const props = columns.value.map((item) => item.prop);
  const formatters = columns.value.map((item) => item.formatter);

  const tableHeader = columns.value.map((item) => item.label);

  const tableBody = computed(function () {
    let res = [];
    for (let item of data.value) {
      let row = props.map((key, index) => {
        let formatter = formatters[index];

        return typeof formatter === "function"
          ? formatter(item, index, item[key])
          : item[key];
      });
      res.push(row);
    }
    return res;
  });

  return {
    tableHeader,
    tableBody,
  };
}

export default defineComponent({
  name: "base-data-grid",
  props: {
    columns: {
      type: Array as PropType<DataGrid.Column[]>,
      default: () => [],
    },
    list: {
      type: Array as PropType<FreeObject[]>,
      default: () => [],
    },
  },
  setup(props) {
    const { columns, list } = toRefs(props);

    const { tableHeader, tableBody } = toRefs(
      formatGridDataList(columns, list)
    );

    return {
      tableHeader,
      tableBody,
    };
  },
});
</script>

<style lang="scss" scoped>
.dgrid {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  th {
    border-bottom: 1px solid #e8e8e8;
    text-align: left;
    padding: 0px 5px;
  }
  td {
    border-bottom: 1px solid #e8e8e8;
    padding: 8px;
  }
}
</style>
