<template>
  <div>
    <div class="mask"></div>
    <div class="container">
      <div class="header">
        <img src="" />
        <text>付款详情</text>
        <img src="" />
      </div>
      <div class="main">
        
      </div>
      <div class="footer">
        <text>确认支付</text>
      </div>
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
        picRoot: config.picRoot
      }
    },
    methods: {
      
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
  .container{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    background-color: #fff;
  }
  .header{

  }
  .main{

  }
  .footer{

  }
</style>