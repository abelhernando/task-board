<template>
  <div :class="cn.root">
    <div v-if="isEditing" :class="cn.listInfo">
      <input
        ref="titleInput"
        :value="list.title"
        @keyup.enter="handlers.editTitle"
      />
      <!-- @blur="isEditing = false" -->
      <button :class="cn.deleteBtn" @click="handlers.deleteList">
        <img src="../assets/delete.svg" alt="" />
      </button>
    </div>
    <h1 v-else :class="cn.title" @click="handlers.setEditable">
      {{ list.title }}
    </h1>

    <div v-if="list.hasAnyVisibleTask()">
      <div
        v-for="(task, index) in list.getTasks()"
        :key="index"
        :class="cn.taskContainer"
      >
        <TaskComponent :task="task" @task:delete="handlers.removeTask" />
      </div>
    </div>
    <div :class="cn.bottom">
      <button :class="cn.addTaskBtn" type="button" @click="addTask">
        <img src="../assets/add.svg" alt="" />
      </button>
      <input
        type="text"
        placeholder="Add a task"
        v-model="taskName"
        @keyup.enter="addTask"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { Task, TaskList } from "../Tasks";
import { defineComponent, ref } from "vue";
import TaskComponent from "./TaskComponent.vue";
import { isNonEmptyString } from "../common/utils";

export default defineComponent({
  name: "TasksListComponent",
  emits: ["list:delete"],
  components: { TaskComponent },
  props: {
    list: {
      type: TaskList,
      required: true,
    },
  },
  setup(props, { emit }) {
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

    const titleInput = ref<HTMLInputElement | null>(null);

    const handlers = {
      setEditable: function () {
        isEditing.value = true;

        setTimeout(() => {
          if (!titleInput.value) {
            return;
          }
          titleInput.value.focus();
        }, 0);
      },
      editTitle: function (event: Event): void {
        const target = event.target as HTMLInputElement;

        props.list.setTitle(target.value);

        isEditing.value = false;
      },
      removeTask: function (taskId: string) {
        props.list.removeTask(taskId);
      },
      deleteList: function () {
        if (props.list.hasAnyTask()) {
          return;
        }

        isEditing.value = false;
        emit("list:delete", props.list.id);
      },
    };

    return {
      cn,
      addTask,
      taskName,
      handlers,
      isEditing,
      titleInput,
    };
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
    deleteBtn: `${root}__delete--button`,
    listInfo: `${root}__list-info`,
    addTaskBtn: `${root}__add-task--button`,
    bottom: `${root}__bottom`,
  };
}
</script>
<style lang="scss" scoped>
.list-component {
  width: 50%;
  min-height: 266px;
  margin: 20px;

  background: #ffffff;
  border-radius: 6px;

  box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.3);

  &__list-info {
    input {
      text-align-last: center;

      font-size: 2em;
      font-weight: bold;
    }
  }

  &__delete--button {
    border: none;
    outline: none;
    background-color: transparent;
    margin-top: 12px;
  }

  &__title {
    margin: 0;
    text-align: center;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  &__add-task--button {
    height: 30px;
  }

  &__bottom {
    height: 30px;
    align-items: center;

    input {
      height: 30px;
    }
  }

  &__task-container {
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
    // transform: scale(1.25);
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
