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
}
#app {
  width: 100%;
  height: 100%;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>
