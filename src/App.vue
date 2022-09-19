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
  background-color: #e1f1f9;
  min-height: 92vh;

  .app-title {
    background-color: #ffff;
    text-align-last: center;
    font-size: 3em;
    margin-bottom: 0;

    @media (max-width: 800px) {
      font-size: 2em;
    }
  }
}
</style>
