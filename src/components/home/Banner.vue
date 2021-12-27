<template>
  <div class="banner" >
    <div class="banner-img">
      <img :src="getBannerImgPath" alt="">
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, reactive} from "vue";
import {banner} from "@/apis/homeApi";

let imgs = reactive({
  img: '',
  imgList: []
})
let getBannerImgPath = computed(() => {
  banner(0).then(res => {
    res.data.banners.forEach((item: { imageUrl: String; }) => {
      imgs.imgList.push(item.imageUrl)
    })
  })
  imgs.img = imgs.imgList[parseInt(String(Math.random() * 10))]
  return imgs.img
})
</script>

<style lang="scss">
@import "@/style/home.scss";

.banner {
  height: $Banner;
  background-size: 2000px;
  background-repeat: no-repeat;
  background-position: center center;
  .banner-img {
    text-align: center;
    background-color: white;
    height: $Banner;
    img {
      height: $Banner;
    }
  }
}
</style>