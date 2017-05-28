<template>
  <div>
    <scroller class="main">
      <div class="ul">
        <div class="li">
          <text class="left">加入黑名单</text>
          <div class="right">
            <switch @change="toggle('black')"></switch>
          </div>
        </div>
      </div>
      <div class="ul">
        <div class="li">
          <text class="left">清空聊天记录</text>
          <div class="right">
            <img :src="picRoot+'right.png'" class="clear" />
          </div>
        </div>
        <div class="li">
          <text class="left">关注他</text>
          <div class="right">
            <switch :checked="watch" @change="toggle('watch')"></switch>
          </div>
        </div>
        <div class="li">
          <text class="left">举报他</text>
          <div class="right">
            <img :src="picRoot+'right.png'" class="report" />
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="资料设置"></sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump, urlParse} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        contactid: urlParse().contactid,
        black: true,
        watch: false
      }
    },
    methods: {
      fetchData () {
        // return getData('', {
        //   id: 11
        // })
      },
      onrefresh () {
        // this.fetchData().then((res) => {
          
        // })
      },
      toggle (key) {
        this[key] = !this[key]
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    width: 750px;
    top: 100px;
    left: 0;
    bottom: 0;
    background-color: #f2f2f2;
  }
  .ul{
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .li{
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .clear, .report{
    width: 40px;
    height: 40px;
  }
  .right{
    align-items: flex-start;
  }
</style>