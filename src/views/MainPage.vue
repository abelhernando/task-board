<template>
  <div :class="cn.root">
    <div>
      <!-- FILTERS -->
      <FilterComponent :lists="lists" />

      <!-- INITIAL INPUT -->
      <input
        type="text"
        placeholder="Name your list"
        v-model="listName"
        @keyup.enter="createTaskList"
      />
      <button type="submit" @click="createTaskList">OK</button>
    </div>

    <!-- TASKS LISTS  -->
    <div>
      <div v-for="(list, index) in lists" :key="index">
        <TasksListComponent :list="list" @list:delete="deleteList" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { TaskList } from "../Tasks";
import TasksListComponent from "../components/TasksListComponent.vue";
import FilterComponent from "../components/FilterComponent.vue";
import { isNonEmptyString } from "@/common";

export default defineComponent({
  name: "MainPage",
  components: { TasksListComponent, FilterComponent },
  setup() {
    const cn = getClassNames();

    const listName = ref("");

    const lists = ref<TaskList[]>([]);

    function createTaskList(): void {
      if (!isNonEmptyString(listName.value)) {
        return;
      }

      const taskList = TaskList.create(listName.value);

      lists.value = [...lists.value, taskList];

      listName.value = "";
    }

    function deleteList(listId: string) {
      const index = lists.value.findIndex((list) => list.id === listId);
      lists.value.splice(index, 1);
    }

    return {
      cn,
      lists,
      listName,
      deleteList,
      createTaskList,
    };
  },
  head: {},
});

function getClassNames(): Object {
  const root = "main-page";
  return {
    root,
    listContainer: `${root}__list-container`,
  };
}
</script>

<style lang="scss" scoped></style>
