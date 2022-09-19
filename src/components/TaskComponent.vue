<template>
  <div :class="cn.root">
    <input
      type="checkbox"
      :checked="task.isDone"
      :value="task.isDone"
      @change="task.setIsDone($event.target.checked)"
    />

    <div v-if="isEditing" :class="cn.taskInfo">
      <input
        ref="textInput"
        :value="task.text"
        @keyup.enter="handlers.editTask"
      />
      <button
        :class="cn.deleteBtn"
        title="Delete task"
        @click="$emit('task:delete', task.id)"
      >
        <img src="../assets/delete.svg" alt="" />
      </button>
    </div>

    <label
      v-else
      :class="[cn.taskInfo, { active: task.isDone }]"
      @click="handlers.setEditable"
    >
      {{ task.text }}
    </label>
  </div>
</template>
<script lang="ts">
import { Task } from "../Tasks";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TaskComponent",
  emits: ["task:delete"],
  props: {
    task: {
      type: Task,
      required: true,
    },
  },
  setup(props) {
    const cn = getClassNames();

    const isEditing = ref(false);

    const textInput = ref<HTMLInputElement | null>(null);

    const handlers = {
      setEditable: function () {
        isEditing.value = true;

        setTimeout(() => {
          if (!textInput.value) {
            return;
          }
          textInput.value.focus();
        }, 0);
      },
      editTask: function (event: Event): void {
        const target = event.target as HTMLInputElement;

        props.task.setText(target.value);

        isEditing.value = false;
      },
    };

    return {
      cn,
      handlers,
      textInput,
      isEditing,
    };
  },
  head: {},
});

function getClassNames(): Object {
  const root = "task-component";
  return {
    root,
    deleteBtn: `${root}__delete--button`,
    taskInfo: `${root}__task-info`,
  };
}
</script>
<style lang="scss" scoped>
.task-component {
  border-bottom: 1px solid black;

  display: flex;
  width: 100%;

  input[type="checkbox"] {
    width: 25px;
    height: 50px;
    outline: none;
    cursor: pointer;
    margin-left: 15px;
  }

  &__delete--button {
    border: none;
    outline: none;
    background-color: transparent;
  }

  &__task-info {
    width: 100%;
    align-self: center;
    cursor: pointer;
    padding-left: 15px;

    input {
      height: 30px;
      font-style: italic;
      color: grey;
    }
  }

  label.active {
    text-decoration: line-through;
  }
}
</style>
