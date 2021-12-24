<template>
  <div class="banner">
    <div class="banner-img">
      <img :src="getBannerImgPath" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, reactive} from "vue";
import {hotMusicList,banner} from "@/apis/homeApi";

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


let hotlist = function () {
  hotMusicList().then(res => {
    console.log(res.data)
  })
}


</script>

<style lang="scss">
@import "@/style/layout.scss";
.banner {
  height: $Banner;
  background-color: lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  .banner-img {
    background-color: white;
    height: $Banner;
    width: $MainWidth;
    img {
      height: $Banner;
    }
  }
}
</style>