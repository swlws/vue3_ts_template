import { onMounted, ref, watch } from "@vue/runtime-core";

export function dataList(baseURL: string) {
  const days = ref(3);
  const data = ref([]);

  const loadData = async () => {
    const url = `${baseURL}?days=${days.value}`;

    const response = await fetch(url);
    const json = await response.json();
    data.value = json.rows;
  };
  onMounted(loadData);
  watch(days, loadData);

  return {
    days,
    data,
  };
}
