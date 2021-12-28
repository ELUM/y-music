<template>
  <TopBar/>
  <div class="main">
    <div style="margin-top: 70px"></div>
    <Main/>
    <Footer/>
    <div style="margin-top: 60px"></div>
  </div>
</template>

<script setup lang="ts">
import TopBar from '@/components/layout/topbar/index.vue'
import Main from '@/components/layout/main/index.vue'
import Footer from '@/components/layout/footer/index.vue'
</script>

<style lang="scss">

</style>