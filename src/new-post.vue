<template>
  <div>
    <scroller class="main">
      <textarea class="textarea" placeholder="请填写帖子内容" @input="oninput" ref="textarea"></textarea>
      <!-- 拍照上传需要去weex-market -->
      <div class="add">
        <img :src="picRoot+'plus.png'" style="width:80px; height: 80px;"/>
      </div>
      <div class="line"></div>
    </scroller>
    <sub-header title="发帖子">
      <text style="margin-top: 10px;margin-right:10px;">确定</text>
    </sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const dom = weex.requireModule('dom')

  export default {
    data () {
      return {
        picRoot: config.picRoot
      }
    },
    methods: {
      oninput () {

      }
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    width: 750px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .textarea{
    font-size: 30px;
    height: 400px;
  }
  .add{
    width: 120px;
    height: 120px;
    border-width: 1px;
    border-color: grey;
    border-style: dashed;
    justify-content: center;
    align-items: center;
  }
  .line{
    height: 1px;
    margin-top: 20px;
    background-color: #000;
  }
</style>