<template>
  <div>
    123
    <ul v-for="item in recommends.data">
      <li>
        <div style="display: inline-block">
          <img style="width: 200px;height: 200px" :src="item.picUrl">
          {{item.name}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {Recommend} from "@/apis/homeApi";
import {onMounted, reactive} from "vue";

let recommends = reactive({
  data: null
})
onMounted(() => {
  Recommend(8).then(res => {
    recommends.data = res.data.result
  })
})
</script>

<style scoped>

</style>