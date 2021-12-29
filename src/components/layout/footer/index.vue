<template>
  <div class="footer">
    <div class="progress-bar">
      <div style="height: 3px;background-color: brown;width: 0;"></div>
      <div class="progress-bar-wrapper" style="height: 16px;width: 16px;background-color: red;border-radius: 50%;margin-top: -8px;margin-left: -8px;cursor: pointer"></div>
    </div>
    <audio
        controls
        ref="music"
        hidden
        @timeupdate="handleTimeUpdate"
        autoplay
        :src="musicList[musicLength]">
    </audio>
    <div>
      <img style="height: 60px;width: 60px" :src="musicImgs[musicLength]">
    </div>
    <div class="icon">
      <div @click="back">
        <svg style="transform: rotate(180deg)" t="1640744161953" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="3465" width="25" height="25">
          <path
              d="M922.069625 477.9341L472.652621 151.089311a43.342807 43.342807 0 0 0-68.847075 35.055725V328.665491L159.636492 151.089311a43.364482 43.364482 0 0 0-68.847076 35.055725v653.682354a43.350032 43.350032 0 0 0 68.847076 35.062951L403.805546 697.328611v142.498779a43.364482 43.364482 0 0 0 68.847075 35.062951l449.417004-326.837565a43.342807 43.342807 0 0 0 0-70.118676z"
              fill="red" p-id="3466"></path>
        </svg>
      </div>
      <div v-if="status" @click="onStatus">
        <svg t="1640665306444" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2028" width="32" height="32">
          <path
              d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
              fill="red" p-id="2029"></path>
        </svg>
      </div>
      <div v-else @click="onStatus">
        <svg t="1640743951135" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="2548" width="32" height="32">
          <path
              d="M716.805 780.798V243.2c0-21.205-17.197-38.404-38.404-38.404S640 221.993 640 243.2v537.598c0 21.205 17.197 38.393 38.402 38.393s38.404-17.188 38.404-38.393z m-332.804 0V243.2c0-21.205-17.188-38.404-38.391-38.404-21.216 0-38.404 17.197-38.404 38.404v537.598c0 21.205 17.188 38.393 38.404 38.393 21.203 0 38.39-17.188 38.39-38.393z"
              fill="red" p-id="2549"></path>
        </svg>
      </div>
      <div @click="next">
        <svg t="1640744161953" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="3465" width="32" height="25">
          <path
              d="M922.069625 477.9341L472.652621 151.089311a43.342807 43.342807 0 0 0-68.847075 35.055725V328.665491L159.636492 151.089311a43.364482 43.364482 0 0 0-68.847076 35.055725v653.682354a43.350032 43.350032 0 0 0 68.847076 35.062951L403.805546 697.328611v142.498779a43.364482 43.364482 0 0 0 68.847075 35.062951l449.417004-326.837565a43.342807 43.342807 0 0 0 0-70.118676z"
              fill="red" p-id="3466"></path>
        </svg>
      </div>
    </div>
    <div>
      {{ currentTime }}
      {{ duration }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {handleFormatDuration} from "@/utils/time";
import {useMusic} from "@/store";
import {getMusicFile} from "@/apis/musicApi";

let music = ref(null)
let duration = ref('--:--')
let currentTime = ref('--:--')
let status = ref(true)
let musicList = ref([])
let musicImgs = ref([])
let musicLength = ref(0)

watch(
    () => useMusic().musicUrl,
    () => {
      musicLength.value = 0
      musicImgs.value = useMusic().musicImg
      console.log(useMusic().musicImg)
      let ids = ""
      useMusic().musicUrl.map(({id}) => {
        ids = ids + id + ','
      })
      ids = ids.substring(0, ids.length - 1)
      getMusicFile(ids).then(res => {
        musicList.value.splice(0, musicList.value.length)
        res.data.data.map(({url}) => {
          musicList.value.push(url)
        })
        status.value = false
      })

    }
)

function onStatus() {
  status.value ? music.value.play() : music.value.pause()
  status.value = !status.value
}

function next() {
  musicLength.value = (musicLength.value + 1) % useMusic().musicUrl.length
  console.log(musicLength.value)
}

function back() {
  musicLength.value--
  if (musicLength.value < 0) {
    musicLength.value = useMusic().musicUrl.length - Math.abs(musicLength.value)
  }
  console.log(musicLength.value)
}

function handleTimeUpdate(musicData: any) {
  console.log(musicData)
  currentTime.value = handleFormatDuration(musicData.target.currentTime)
  duration.value = handleFormatDuration(musicData.target.duration)
  if (musicData.target.currentTime == musicData.target.duration) {
    next()
    status.value = !status.value
  }
}
</script>

<style lang="scss">
@import '@/style/layout';

.footer {
  height: $FooterHeight;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.85);
  z-index: 100;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-right: 10vw;
  padding-left: 10vw;
}

.icon {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.progress-bar {
  position: absolute;
  bottom: 60px;
  width: 100vw;
  height: 3px;
  background-color: #F5F5F5;
}
</style>