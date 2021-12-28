<template>
  <div class="topbar">
    <div>首页</div>
    <div>推荐</div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
@import "@/style/layout";

.topbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 10vw;
  padding-left: 10vw;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 100;
  height: $TopBarHeight;

  div {
    height: $TopBarHeight
  }
}

</style>