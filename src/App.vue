<template>
  <div class="main-app">
    <h1 class="app-title">TASK BOARD</h1>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
.main-app {
  .app-title {
    text-align-last: center;
    font-size: 3em;
    border-bottom: 2px solid;
  }
}
</style>
