<template>
  <div :class="cn.root">
    <input
      type="text"
      v-model="filters.content"
      placeholder="Search..."
      @input="filterAction"
    />

    <form @change="filterAction">
      <input
        type="radio"
        id="filter-all"
        v-model="filters.state"
        :value="FilterStates.ALL"
      />
      <label for="filter-all">All</label>

      <input
        type="radio"
        id="filter-done"
        v-model="filters.state"
        :value="FilterStates.DONE"
      />
      <label for="filter-done">Done</label>

      <input
        type="radio"
        id="filter-undone"
        v-model="filters.state"
        :value="FilterStates.UNDONE"
      />
      <label for="filter-undone">Undone</label>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { TaskList } from "../Tasks";
import { isNonEmptyString, FilterStates } from "../common";

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
      state: FilterStates.ALL,
    });

    function filterAction(): void {
      if (filters.state === FilterStates.UNDONE) {
        // undone filter
        props.lists.forEach((list) => {
          list.applyFilter(false);
        });
      }
      if (filters.state === FilterStates.DONE) {
        // done filter
        props.lists.forEach((list) => {
          list.applyFilter(true);
        });
      }
      if (filters.state === FilterStates.ALL) {
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
      FilterStates,
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
