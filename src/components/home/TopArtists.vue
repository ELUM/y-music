<template>
  <div class="top-artists">
    <div class="top-artists-content">
      <div class="top-artists-bar">
        热门歌手
      </div>
      <div class="top-artists-list">
        <ul v-for="item in artists.data">
          <li>
            <div>
              <div class="icon-side">
                <div class="icon" @click="playArtistsTopMusic(item.id)">
                  <svg t="1640665306444" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                       p-id="2028" width="20" height="20">
                    <path
                        d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
                        fill="white" p-id="2029">
                    </path>
                  </svg>
                </div>
                <img style="cursor: pointer;" :src="item.img1v1Url" @click="goArtistPage(item.id)">
              </div>
              <div class="artist-name">{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {topArtists} from "@/apis/homeApi";
import router from "@/router";
import {getArtistsTopMusic} from "@/apis/musicApi";
import {useMusic} from "@/store";

let artists = reactive({
  data: null
})

onMounted(() => {
  topArtists(6).then(res => {
    artists.data = res.data.artists
  })
})

function goArtistPage(id: Number) {
  router.push(`${id}`)
}

function playArtistsTopMusic(id: Number) {
  getArtistsTopMusic(id).then(res => {
    useMusic().musicData = res.data.songs
  })
}
</script>

<style lang="scss">
@import "@/style/home.scss";

.top-artists {
  display: flex;
  align-items: center;
  justify-content: center;

  .top-artists-content {
    width: $MainWidth;
    min-width: $MainWidth;
    background-color: white;
    padding-bottom: 20px;

    .top-artists-bar {
      margin: 10px;
      padding-left: 30px;
      font-size: 25px;
      font-weight: bold;
    }

    .top-artists-list {
      ul {
        display: inline-block;
        list-style-type: none;
        li {
          div {
            .icon-side {
              height: 12vw;
              width: 12vw;
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
                width: 40px;
                height: 40px;
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
              border-radius: 50%;
              height: 10vw;
              width: 10vw;
            }

            .artist-name {
              text-align: center;
            }
          }
        }
      }
    }

  }

}
</style>