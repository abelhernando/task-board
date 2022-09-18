<template>
  <div :class="cn.root">
    <!-- FILTERS -->
    <FilterComponent v-if="lists.length" :lists="lists" />

    <div :class="cn.listControl">
      <!-- INITIAL INPUT -->
      <input
        type="text"
        placeholder="Name your list"
        v-model="listName"
        @keyup.enter="createTaskList"
      />
      <button :class="cn.createListBtn" type="submit" @click="createTaskList">
        <img src="../assets/ok.svg" alt="" />
      </button>
    </div>

    <!-- TASKS LISTS  -->
    <div :class="cn.taskList">
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
    listControl: `${root}__list-control`,
    createListBtn: `${root}__create-list--button`,
    taskList: `${root}__tasks-list`,
  };
}
</script>

<style lang="scss" scoped>
.main-page {
  background-color: #e1f1f9;
  &__list-control {
    width: 30%;
    margin: 1em;

    input {
      border-radius: 20px 0 0px 20px;
      padding: 5px;
      width: 86%;
    }
    img {
      height: 35px;
    }
  }
  &__tasks-list {
  }
  &__create-list--button {
  }
}
</style>
