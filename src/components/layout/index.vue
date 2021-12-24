<template>
  <TopBar/>
  <div class="main">
    <Main/>
  </div>
  <Footer/>
</template>

<script setup lang="ts">
import TopBar from '@/components/layout/topbar/index.vue'
import Main from '@/components/layout/main/index.vue'
import Footer from '@/components/layout/footer/index.vue'
</script>

<style lang="scss">
.main {
  margin: 0 auto;
}
</style>