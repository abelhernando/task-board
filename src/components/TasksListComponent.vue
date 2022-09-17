<template>
  <div :class="cn.root">
    <input
      v-if="isEditing"
      :value="list.title"
      @keyup.enter="handlers.editTitle"
    />
    <h1 v-else :class="cn.title" @dblclick="handlers.setEditable">
      {{ list.title }}
    </h1>

    <div v-if="list.hasAnyTask()">
      <div
        v-for="(task, index) in list.getTasks()"
        :key="index"
        :class="cn.taskContainer"
      >
        <TaskComponent :task="task" />
      </div>
    </div>
    <button type="button" @click="addTask">+</button>
    <input
      type="text"
      placeholder="Add a task"
      v-model="taskName"
      @keyup.enter="addTask"
    />
  </div>
</template>
<script lang="ts">
import { Task, TaskList } from "@/Tasks";
import { defineComponent, ref } from "vue";
import TaskComponent from "./TaskComponent.vue";
import { isNonEmptyString } from "../common/utils";

export default defineComponent({
  name: "TasksListComponent",
  components: { TaskComponent },
  props: {
    list: {
      type: TaskList,
      required: true,
    },
  },
  setup(props) {
    const cn = getClassNames();

    const taskName = ref("");

    function addTask(): void {
      if (!isNonEmptyString(taskName.value.trim())) {
        return;
      }

      props.list.addTask(Task.create(taskName.value));

      taskName.value = "";
    }

    const isEditing = ref(false);

    const handlers = {
      setEditable: function () {
        isEditing.value = true;
      },
      editTitle: function (event: Event): void {
        const target = event.target as HTMLInputElement;

        props.list.setTitle(target.value);

        isEditing.value = false;
      },
    };

    return { cn, addTask, taskName, handlers, isEditing };
  },
  head: {},
});

function getClassNames(): Object {
  const root = "list-component";
  return {
    root,
    title: `${root}__title`,
    taskContainer: `${root}__task-container`,
    task: `${root}__task`,
    controls: `${root}__controls`,
  };
}
</script>
<style lang="scss" scoped>
.list-component {
  width: 212px;
  height: 266px;
  margin: 20px;

  background: #ffffff;
  border-radius: 6px;

  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.3);

  &__title {
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &__task-container {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;

    label {
      font-size: 20px;
      word-break: break-word;
    }
    label.active {
      text-decoration: line-through;
    }

    &:hover {
      .list-component__controls {
        display: flex;
      }
    }
  }

  &:hover {
    box-shadow: 0 16px 26px rgb(0 0 0 / 47%), 0 0 46px rgb(0 0 0 / 47%);
    transition: 1s;
    transform: scale(1.25);
  }

  &__controls {
    display: none;

    button {
      background: none;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>
