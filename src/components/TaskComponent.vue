<template>
  <div :class="cn.root">
    <input
      type="checkbox"
      :id="`task-element-${task.id}`"
      :name="task.id"
      :checked="task.isDone"
      :value="task.isDone"
    />

    <input
      v-if="isEditing"
      :value="task.text"
      @keyup.enter="handlers.editTask"
    />
    <label
      v-else
      :class="{ active: task.isDone }"
      @dblclick="handlers.setEditable"
    >
      {{ task.text }}
    </label>

    <button @click="$emit('task:delete', task.id)">delete</button>
  </div>
</template>
<script lang="ts">
import { Task } from "@/Tasks";
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
