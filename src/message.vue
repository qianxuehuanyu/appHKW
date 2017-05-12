<template>
  <div>
    <scroller class="main">
      <div class="links">
        <div class="link" style="border-bottom-width: 1px;">
          <img class="avatar" src="" />
          <text class="link-title">我的客户</text>
          <text class="link-info">张兰/张凡/杨雷（25）</text>
          <text class="tip">新增</text>
        </div>
        <div class="link" style="border-bottom-width: 1px;">
          <img class="avatar" src="" />
          <text class="link-title">留言/评价</text>
          <text class="link-info">作品真不错，我会关注你啦哦！</text>
          <text class="tip">新增</text>
        </div>
        <div class="link">
          <img class="avatar" src="" />
          <text class="link-title">系统消息</text>
          <text class="link-info">6人喜欢我 25人看过我 12新用户推荐</text>
          <text class="tip">新增</text>
        </div>
      </div>
      <div class="subtitle">
        <text style="font-size: 20px;padding-left: 30px;color: grey;">最近联系人</text>
      </div>
      <div class="contacts">
        <div class="contact link" v-for="(contact,index) in 30" :style="{'border-bottom-width': index===30-1?'0px':'1px'}">
          <img class="avatar" src="" />
          <div class="num">
            <text style="color: #fff;">4</text>
          </div>
          <text class="link-title">MiaZhang</text>
          <text class="link-info">你好，在吗？</text>
          <text class="tip">16:12</text>
        </div>
      </div>
    </scroller>
    <div class="header">
      <text>联系人</text>
    </div>
    <mainTab :selectedIndex="3"></mainTab>
  </div>
</template>

<script>
  import {getBaseUrl, jump} from './common/util.js'
  import mainTab from './components/main-tab.vue'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  const baseUrl = getBaseUrl()

  export default {
    data () {
        return {
         
        }
    },
    methods: {
      
    },
    components: {
      mainTab
    }
  }
</script>

<style scoped>
  /* 头部标题 */
  .header{
    position: fixed;
    height: 100px;
    width: 750px;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    background-color: #f9f9f9;
  }
  .main{
    position: fixed;
    width: 750px;
    top: 100px;
    bottom: 100px;
  }
  /* 链接 */
  .links, .contacts{
    padding-left: 140px;
  }
  .link{
    position: relative;
    border-bottom-color: grey;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .avatar{
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 45px;
    background-color: #eee;
    left: -115px;
  }
  .link-title{
    font-size: 30px;
    padding-bottom: 10px;
  }
  .link-info{
    color: grey;
    font-size: 22px;
  }
  .tip{
    position: absolute;
    right: 20px;
    color: grey;
    font-size: 22px;
  }
  /* 最近联系人 */
  .subtitle{
    width: 750px;
    height: 50px;
    background-color: #f9f9f9;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    justify-content: center;
  }
  .num{
    position: absolute;
    background-color: red;
    left: -55px;
    width: 35px;
    height: 35px;
    border-radius: 18px;
    justify-content: center;
    align-items: center;
  }
</style>

