<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/style/layout';
body,html {
  margin: 0;
  padding: 0;
  min-width: $MinWidth;
}
#app {
  height: 100vh;
}
</style>
