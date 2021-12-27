<template>
  <div class="discover-module">
    <div class="discover-content">
      <div class="discover-bar">
        热门推荐
      </div>
      <ul v-for="item in recommends.data">
        <li>
          <div class="rcmd">
            <a :href="'/playlist/detail?id='+item.id"><img :src="item.picUrl"></a>
            <p>
              <a :href="'/playlist/detail?id='+item.id">{{ item.name }}</a><br>
              <span>热门推荐</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script setup lang="ts">
import {Recommend, test} from "@/apis/homeApi";
import {onMounted, reactive} from "vue";

let recommends = reactive({
  data: null
})
onMounted(() => {
  Recommend(10).then(res => {
    recommends.data = res.data.result
  })
  test().then(res => {
    console.log(res)
  })
})
</script>

<style lang="scss">
@import "@/style/home.scss";

.discover-module {
  display: flex;
  align-items: center;
  justify-content: center;

  .discover-content {
    width: $MainWidth;
    background-color: white;
    border-left: solid 1px #d3d3d3;
    border-right: solid 1px #d3d3d3;
    .discover-bar {
      color: brown;
      font-size: 25px;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: inline-block;

      li {
        margin: 5px 5px 5px 0;

        .rcmd {
          width: 255px;
          height: 255px;
          margin: 0 auto;
          img {
            margin: 0 auto;
            width: 220px;
            border-radius: 10px;
          }
          p {
            margin-top: 0;
            font-weight: bold;
            font-size: 15px;
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