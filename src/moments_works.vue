<template>
  <div>
    <scroller class="main">
      
    </scroller>
    <div class="works-header">
      <img :src="picRoot+'left.png'" class="back" @click="goBack"/>
      <div class="select-type" @click="selectType">
        <text>最新作品</text>
        <img :src="picRoot+'down.png'" style="width: 40px; height: 40px;margin-top:10px;"/>
      </div>
    </div>
    <div class="works-tabs">
      
    </div>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        linkItems: [
          {title: '全部', type: 0},
          {title: '平面', type: 1},
          {title: 'GUI', type: 2},
          {title: '网页', type: 3},
          {title: '服装', type: 4},
          {title: '空间', type: 5},
          {title: '空间2', type: 6},
          {title: '空间3', type: 7},
          {title: '空间4', type: 8}
        ]
      }
    },
    methods: {
      goBack () {
        navigator.pop()
      },
      selectType () {

      }
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  /* 顶部 */
  .works-header{
    position: fixed;
    top: 0;
    left: 0;
    height: 100px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
  }
  .back{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 10px;
  }
  .select-type{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /* 内容 */
  .main{
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 750px;
    background-color: #eee;
  }
</style>