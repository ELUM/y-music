<template>
  <div class="new-Music-send">
    <div class="new-Music-send-content">
      <div class="new-Music-send-bar">
        新专速递
      </div>
      <div class="new-Music-send-list">
        <ul v-for="item in newMusics.data">
          <li>
            <div>
              <div class="icon-side">
                <div class="icon" >
                  <svg t="1640665306444" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                       p-id="2028" width="32" height="32">
                    <path
                        d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
                        fill="white" p-id="2029">
                    </path>
                  </svg>
                </div>
                <img style="cursor: pointer;">
              </div>
              <div class="new-Music-send-name"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {newMusicSend} from "@/apis/homeApi";
import router from "@/router";

let newMusics = reactive({
  data: null
})

onMounted(() => {
  newMusicSend(0).then(res => {
    console.log(res.data.data)
    newMusics.data = res.data.data
  })
})

function goMusicPage(id: Number) {
  router.push(`${id}`)
}
</script>

<style lang="scss">
@import "@/style/home.scss";

.new-Music-send {
  display: flex;
  align-items: center;
  justify-content: center;

  .new-Music-sendcontent {
    width: $MainWidth;
    min-width: $MainWidth;
    background-color: white;
    padding-bottom: 20px;

    .new-Music-send-bar {
      margin: 10px;
      padding-left: 30px;
      font-size: 25px;
      font-weight: bold;
    }

    .new-Music-send-list {
      ul {
        display: inline-block;
        list-style-type: none;

        li {
          div {
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
              border-radius: 50%;
              height: 170px;
            }

            .new-Music-send-name {
              text-align: center;
            }
          }
        }
      }
    }

  }

}
</style>