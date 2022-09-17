<template>
  <div :class="cn.root"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainPage",
  components: {},
  setup() {
    const cn = getClassNames();

    return {
      cn,
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
