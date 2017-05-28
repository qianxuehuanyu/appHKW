<template>
  <div class="mask">
    <div class="share-box">
      <div class="info" v-if="info">
        <img v-if="info === '发送成功'" :src="picRoot+'success.png'" class="info-img" />
        <img v-else :src="picRoot+'fail.png'" class="info-img" />
        <text>{{info}}</text>
      </div>
      <div class="share" v-for="share in items" @click="">
        <img src="" style="width: 90px; height: 90px;border-width: 1px;"/>
        <text style="font-size: 30px;">{{share.text}}</text>
      </div>
    </div>
    <div class="cancel" @click="cancel">
      <text>取消</text>
    </div>
  </div>
</template>

<script>
  import config from '../common/config.js'

  const dom = weex.requireModule('dom')

  export default {
    props: {
      info: {
        type: String
      }
    },
    data () {
      return {
        picRoot: config.picRoot,
        items: [
          {img: '', url: '', text: '微信'},
          {img: '', url: '', text: '邮件'},
          {img: '', url: '', text: 'QQ'},
          {img: '', url: '', text: '空间'},
          {img: '', url: '', text: '朋友圈'},
          {img: '', url: '', text: '收藏'}
        ]
      }
    },
    methods: {
      cancel () {
        this.$emit('cancelShare')
      }
    }
  }
</script>

<style scoped>
  .mask{
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
  }
  .share-box{
    position: absolute;
    bottom: 110px;
    left: 10px;
    width: 730px;
    padding-bottom: 10px;
    background-color: #fff;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .info{
    width: 750px;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    flex-direction: row;
  }
  .info-img{
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .share{
    width: 160px;
    height: 150px;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: space-around;
    align-items: center;
    padding-top: 20px;
  }
  .cancel{
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 730px;
    height: 80px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }
</style>