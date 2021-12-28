<template>
  <div class="discover-module">
    <div class="discover-content">
      <div class="discover-bar">
        热门推荐
      </div>
      <ul v-for="item in recommends.data">
        <li>
          <div class="rcmd">
            <div class="icon-side">
              <div class="icon">
                <svg t="1640665306444" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     p-id="2028" width="32" height="32">
                  <path
                      d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
                      fill="white" p-id="2029"></path>
                </svg>
              </div>
              <img style="cursor: pointer;" :src="item.picUrl" @click="goSongSheet(item.id)">
            </div>
            <div style="position: absolute;height: 50px">
              <p>
                <a style="cursor: pointer" @click="goSongSheet(item.id)">{{ item.name }}</a><br>
                <span>热门推荐</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Recommend} from "@/apis/homeApi";
import {onMounted, reactive} from "vue";
import {musicRcmdList} from "@/apis/musicApi";
import {useMusic} from "@/store";

let recommends = reactive({
  data: null
})
onMounted(() => {
  Recommend(10).then(res => {
    recommends.data = res.data.result
  })
})

function goSongSheet(id: Number) {
  musicRcmdList(id).then(res => {
    useMusic().musicUrl = res.data.playlist.tracks
  })
}
</script>

<style lang="scss">
@import "@/style/home.scss";

.discover-module {
  display: flex;
  align-items: center;
  justify-content: center;

  .discover-content {
    width: $MainWidth;
    min-width: $MainWidth;
    background-color: white;
    padding-bottom: 20px;

    .discover-bar {
      margin: 10px;
      padding-left: 30px;
      font-size: 25px;
      font-weight: bold;
    }

    ul {
      list-style-type: none;
      display: inline-block;

      li {
        .rcmd {
          width: 15vw;
          height: 18vw;

          .icon-side {
            height: 15vw;
            width: 15vw;
            display: flex;
            align-items: center;
            justify-content: center;

            .icon {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              backdrop-filter: saturate(180%) blur(20px);
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              border: none;
              opacity: 0;
            }

            .icon:hover {
              width: 60px;
              height: 60px;
              backdrop-filter: saturate(180%) blur(20px);
              border-radius: 50%;
              position: absolute;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: default;
              opacity: 1;
            }
          }

          img {
            margin: 0 auto;
            width: 15vw;
            border-radius: 10px;
          }

          p {
            text-align: left;
            padding-left: 10px;
            margin-top: 0;
            font-weight: bold;
            font-size: 15px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 15vw;

            span {
              font-weight: normal;
              color: dimgray;
              font-size: 10px;
            }

            a {
              text-decoration: auto;
              color: inherit;
            }

            a:hover {
              font-weight: bold;
              text-decoration: underline 2px;
            }
          }
        }
      }
    }
  }
}

</style>