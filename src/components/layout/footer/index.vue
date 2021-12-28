<template>
  <div class="footer">
    <audio
        controls
        ref="music"
        hidden
        @timeupdate="handleTimeUpdate"
        src="http://m8.music.126.net/20211228174901/36e2a00f34c0f855931ea95eb8aa2161/ymusic/d621/581d/ba84/fe555d31f18204ae4f096402c7ffb179.mp3">
    </audio>
    <div>

    </div>
    <div>
      <button v-if="status" @click="onStatus">播放</button>
      <button v-else @click="onStatus">暂停</button>
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
let duration = ref('')
let currentTime = ref('')
let status = ref(true)
let musicList = ref([])

watch(
    () => useMusic().musicUrl,
    () => {
      let ids = ""
      useMusic().musicUrl.map(({id}) => {
        ids = ids + id + ','
      })
      ids = ids.substring(0, ids.length - 1)
      getMusicFile(ids).then(res => {
        musicList.value.splice(0,musicList.value.length)
        res.data.data.map(({url}) => {
          musicList.value.push(url)
        })
        console.log(musicList.value)
      })
    }
)

function onStatus() {
  status.value ? music.value.play() : music.value.pause()
  status.value = !status.value
}

function handleTimeUpdate(musicData: any) {
  currentTime.value = handleFormatDuration(musicData.target.currentTime)
  duration.value = handleFormatDuration(musicData.target.duration)
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
  border-top: solid 1px #C2C2C2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-right: 10vw;
  padding-left: 10vw;
}

</style>