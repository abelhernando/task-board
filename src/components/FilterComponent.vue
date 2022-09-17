<template>
  <div :class="cn.root">
    <input
      type="text"
      v-model="filters.content"
      placeholder="Search..."
      @input="filterAction"
    />

    <form @change="filterAction">
      <input type="radio" id="filter-all" v-model="filters.state" value="2" />
      <label for="filter-all">All</label>

      <input type="radio" id="filter-done" v-model="filters.state" value="1" />
      <label for="filter-done">Done</label>

      <input
        type="radio"
        id="filter-undone"
        v-model="filters.state"
        value="0"
      />
      <label for="filter-undone">Undone</label>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { TaskList } from "@/Tasks";
import { isNonEmptyString } from "@/common/utils";

export default defineComponent({
  name: "FilterComponent",
  props: {
    lists: {
      type: Array as () => Array<TaskList>,
      required: true,
    },
  },
  setup(props) {
    const cn = getClassNames();

    const filters = reactive({
      content: "",
      state: "2",
    });

    function filterAction(): void {
      if (filters.state === "0") {
        // undone filter
        props.lists.forEach((list) => {
          list.applyFilter(false);
        });
      }
      if (filters.state === "1") {
        // done filter
        props.lists.forEach((list) => {
          list.applyFilter(true);
        });
      }
      if (filters.state === "2") {
        // no filter
        props.lists.forEach((list) => {
          list.resetFilter();
        });
      }

      if (isNonEmptyString(filters.content)) {
        // filter by content
        props.lists.forEach((list) => {
          list.applyFilter(filters.content);
        });
      }
    }

    return {
      cn,
      filterAction,
      filters,
    };
  },
  head: {},
});

function getClassNames(): Object {
  const root = "filter-component";
  return {
    root,
  };
}
</script>
<style lang="scss" scoped></style>
