<template>
  <div :class="cn.root">
    <input
      type="checkbox"
      :id="`task-element-${task.id}`"
      :name="task.id"
      :checked="task.isDone"
      :value="task.isDone"
    />
    <label :for="`task-element-${task.id}`" :class="{ active: task.isDone }">
      {{ task.text }}
    </label>
  </div>
</template>
<script lang="ts">
import { Task } from "@/Tasks";
import { defineComponent } from "vue";

export default defineComponent({
  name: "TaskComponent",
  props: {
    task: {
      type: Task,
      required: true,
    },
  },
  setup(props) {
    console.log("~ props", props);
    const cn = getClassNames();

    return {
      cn,
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
