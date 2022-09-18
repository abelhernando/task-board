<template>
  <div :class="cn.root">
    <input
      type="checkbox"
      :checked="task.isDone"
      :value="task.isDone"
      @change="task.setIsDone($event.target.checked)"
    />

    <dir v-if="isEditing">
      <input :value="task.text" @keyup.enter="handlers.editTask" />
      <button @click="$emit('task:delete', task.id)">x</button>
    </dir>

    <label
      v-else
      :class="{ active: task.isDone }"
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

    const handlers = {
      setEditable: function () {
        isEditing.value = true;
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
      isEditing,
    };
  },
  head: {},
});

function getClassNames(): Object {
  const root = "task-component";
  return {
    root,
  };
}
</script>
<style lang="scss" scoped></style>
