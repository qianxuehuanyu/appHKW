<template>
  <div class="mask">
    <div class="share-box">
      <text class="share-item">分享</text>
      <text class="share-item" @click="goTo('me_certificate.js')">修改资料</text>
      <text class="share-item">关闭公开展示</text>
    </div>
    <div class="cancel" @click="cancel">
      <text class="share-item">取消</text>
    </div>
  </div>
</template>

<script>
  import config from '../common/config.js'

  export default {
    props: {
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
  }
  .share-box{
    position: absolute;
    bottom: 100px;
    left: 10px;
    justify-content: center;
    align-items: center;
    width: 730px;
    background-color: #fff;
    border-radius: 8px;
    border-color: grey;
    border-width: 1px;
  }
  .cancel{
    position: absolute;
    bottom: 0;
    left: 10px;
    justify-content: center;
    align-items: center;
    width: 730px;
    background-color: #fff;
    border-radius: 8px;
    border-color: grey;
    border-width: 1px;
  }
  .share-item{
    height: 90px;
    width: 730px;
    text-align: center;
    line-height: 90px;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    font-size: 25px;
  }
</style>