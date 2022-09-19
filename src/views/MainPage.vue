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
  overflow: auto;

  &__list-control {
    width: 40%;
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
    display: grid;
    gap: 1rem;
    grid-auto-flow: dense;
    grid-auto-rows: 20rem;
    grid-template-columns: repeat(auto-fill, minmax(32rem, 1fr));
  }

  @media (max-width: 1000px) {
    overflow-x: hidden;

    &__list-control {
      width: 100%;

      input[type="text"] {
        width: 80%;
      }
    }
  }

  @media (max-width: 450px) {
    input[type="text"] {
      width: 80%;
    }
    &__tasks-list {
      grid-template-columns: repeat(auto-fill, minmax(22rem, 0.9fr)) !important;
    }
  }
}
</style>
