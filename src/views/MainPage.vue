<template>
  <div :class="cn.root">
    <div>
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
        <TasksListComponent :list="list" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { TaskList } from "../Tasks";
import TasksListComponent from "../components/TasksListComponent.vue";

export default defineComponent({
  name: "MainPage",
  components: { TasksListComponent },
  setup() {
    const cn = getClassNames();

    const listName = ref("");

    const lists = ref<TaskList[]>([]);

    function createTaskList(): void {
      const taskList = TaskList.create(listName.value);

      lists.value = [...lists.value, taskList];

      listName.value = "";
    }

    return {
      cn,
      lists,
      listName,
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
