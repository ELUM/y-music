<template>
  <div class="footer">
    <div class="progress-bar" @mouseenter="enterDrag" @mouseleave="closeDrag" @mousedown="downDrag" @click="clickDrag"
         @mouseup="upDrag" @mousemove="moveDrag">
      <div class="progress-bar-line" :style="{width:playStatusWidth+'px'}"></div>
      <div class="progress-bar-line-back" style="width: 100vw"></div>
      <div v-if="dragStatus" :style="{marginLeft:playStatusWidth+'px'}" class="progress-bar-wrapper"></div>
    </div>
    <audio
        controls
        ref="music"
        hidden
        @timeupdate="handleTimeUpdate"
        @play="audioStatus"
        @pause="audioStatus"
        autoplay
        :src="musicList.get(musicIds[musicLength])">
    </audio>
    <div>
      <div style="position: absolute">{{ musicNames[musicLength] }}</div>
      <div class="music-pic" :style="{backgroundImage:'url('+musicImgs[musicLength]+')'}"></div>
    </div>
    <div class="icon">
      <div @click="back">
        <svg style="transform: rotate(180deg)" t="1640744161953" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg"
             p-id="3465" width="24" height="24">
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
             p-id="3465" width="25" height="25">
          <path
              d="M922.069625 477.9341L472.652621 151.089311a43.342807 43.342807 0 0 0-68.847075 35.055725V328.665491L159.636492 151.089311a43.364482 43.364482 0 0 0-68.847076 35.055725v653.682354a43.350032 43.350032 0 0 0 68.847076 35.062951L403.805546 697.328611v142.498779a43.364482 43.364482 0 0 0 68.847075 35.062951l449.417004-326.837565a43.342807 43.342807 0 0 0 0-70.118676z"
              fill="red" p-id="3466"></path>
        </svg>
      </div>
    </div>
    <div>
      {{ currentTime }}
      {{ duration }}
      <div v-for="item in musicLyric" style="position: absolute">
        <div v-if="item[1] === musicLyric.get(currentTime)">
          {{item[1]}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch} from "vue";
import {handleFormatDuration} from "@/utils/time";
import {useMusic} from "@/store";
import {getLyric, getMusicFile, getMusicStatus} from "@/apis/musicApi";

let music = ref(null)
let duration = ref(null)
let currentTime = ref(null)
let status = ref(true)
let musicList = ref(new Map)
let musicIds = ref([])
let musicImgs = ref([])
let musicNames = ref([])
let musicLength = ref(0)
let musicLyric = ref(new Map)

let dragStatus = ref(false)
let dragBarStatus = ref(false)
let playStatusWidth = ref(0)

let musicDatas = reactive({
  currentTime: 0,
  duration: 0,
  scale: 0,
  num: 0
})


watch(
    () => useMusic().musicData,
    () => {
      musicLength.value = 0
      musicImgs.value = []
      musicNames.value = []
      playStatusWidth.value = 0
      useMusic().musicData.map(res => {
        musicNames.value.push(res.name)
      })
      let ids = ""
      useMusic().musicData.map(({id}) => {
        // getMusicStatus(id).then(res => {
        //   if (res.data.success) {
        //     console.log(res.data.message)
        //   }
        // })
        musicIds.value.push(id)
        ids = ids + id + ','
      })
      ids = ids.substring(0, ids.length - 1)
      getMusicFile(ids).then(res => {
        // musicList.value = []
        res.data.data.map(item => {
          musicList.value.set(item.id,item.url)
        })
        status.value = false
      })
      getLyric(useMusic().musicData[0].id).then(res => {
        res.data.lrc.lyric.split("\n").forEach((res2: String) => {
          let a = res2.split(".")
          a[0] = a[0].split("[")[1]
          try {
            a[1] = a[1].split("]")[1]
          } catch (e) {
          }
          musicLyric.value.set(a[0], a[1])
        })
      })
    }
)

function enterDrag() {
  dragStatus.value = true
}

function closeDrag() {
  dragStatus.value = false
  dragBarStatus.value = false
}

function downDrag() {
  dragBarStatus.value = true
}

function upDrag() {
  dragStatus.value = false
  dragBarStatus.value = false
  music.value.currentTime = musicDatas.num * musicDatas.scale
}

function moveDrag(v: MouseEvent) {
  if (dragBarStatus.value) {
    computeMusicPg(v.screenX)
  }
}

function clickDrag(v: MouseEvent) {
  computeMusicPg(v.screenX)
}

function computeMusicPg(num: any) {
  musicDatas.num = num / (document.body.clientWidth / 100)
  musicDatas.num = Number(musicDatas.num.toFixed(0))
  playStatusWidth.value = num
}

function onStatus() {
  if (musicList.value.length === 0) {
    alert("现在没有歌曲噢")
    return
  }
  if (status.value) {
    music.value.play()
  } else {
    music.value.pause()
  }
  // getLyric().then(res => {
  //
  // })
  status.value = !status.value
}

function audioStatus(v: any) {

}

function next() {
  status.value = false
  playStatusWidth.value = 0
  musicLength.value = (musicLength.value + 1) % musicNames.value.length
}

function back() {
  status.value = false
  playStatusWidth.value = 0
  musicLength.value--
  if (musicLength.value < 0) {
    musicLength.value = musicNames.value.length - Math.abs(musicLength.value)
  }
}

function handleTimeUpdate(musicData: any) {
  currentTime.value = handleFormatDuration(musicData.target.currentTime)
  duration.value = handleFormatDuration(musicData.target.duration)
  musicDatas.currentTime = Math.floor(musicData.target.currentTime)
  musicDatas.duration = Math.floor(musicData.target.duration)
  musicDatas.scale = musicDatas.duration / 100
  if (!dragBarStatus.value) {
    playStatusWidth.value = Math.floor(musicDatas.currentTime * (document.body.clientWidth / musicDatas.duration))
  }
  if (musicData.target.currentTime == musicData.target.duration) {
    next()
    status.value = false
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
  height: 20px;
  width: 100vw;
  margin-bottom: -10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .progress-bar-wrapper {
    position: absolute;
    left: 0;
    height: 16px;
    width: 16px;
    transform: translateX(-8px);
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
    z-index: 2;
  }

  .progress-bar-line {
    position: absolute;
    left: 0;
    height: 3px;
    background-color: brown;
    z-index: 1;
  }

  .progress-bar-line-back {
    position: absolute;
    height: 3px;
    background-color: #F2F2F2;
  }
}

.music-pic {
  height: 60px;
  width: 60px;
  background-size: 60px;
}
</style>