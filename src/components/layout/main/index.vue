<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss">
@import "@/style/layout";
.main {
  min-height: $MainHeight;
}
</style>