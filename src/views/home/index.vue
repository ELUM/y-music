<template>
  <Banner />
  <div class="discover-module">
    <Recommend />
  </div>
</template>

<script setup lang="ts">
import Banner from '@/components/home/Banner.vue'
import Recommend from '@/components/home/Recommend.vue'
</script>

<style lang="scss">
@import "@/style/home";
.discover-module {
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    min-width: $MinWidth;
    width: $MainWidth;
  }

}
</style>