<template>
  <div>
    <div class="mask"></div>
    <div class="share-box">
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
  export default {
    props: {
      showShare: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
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
    position: fixed;
    bottom: 110px;
    left: 10px;
    width: 730px;
    padding-top: 20px;
    padding-bottom: 10px;
    background-color: #fff;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .share{
    width: 160px;
    height: 150px;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: space-around;
    align-items: center;
  }
  .cancel{
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 730px;
    height: 80px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }
</style>