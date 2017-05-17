<template>
  <div>
    <div class="mask"></div>
    <div class="container">
      <div class="header">
        <img :src="picRoot+''" style="width: 30px; height: 30px;"/>
        <text>付款详情</text>
        <img :src="picRoot+'help.png'" class="help" style="width: 30px; height: 30px;"/>
      </div>
      <div class="main">
        <div class="li">
          <div class="left">
            <text class="text">订单信息</text>
          </div>
        </div>
        <div class="li">
          <div class="left">
            <text class="text">支付宝账户</text>
          </div>
        </div>
        <div class="li">
          <div class="left">
            <text class="text">付款方式</text>
          </div>
          <div class="right">
            <text class="text">招商银行</text>
            <img :src="picRoot+'right.png'" style="width: 30px;height: 30px;"/>
          </div>
        </div>
        <div class="li" style="border-bottom-width: 0;">
          <div class="left">
            <text class="text">需付款</text>
          </div>
          <div class="right">
            <text class="money">5600元</text>
          </div>
        </div>
      </div>
      <div class="btn" @click="confirmPay">
        <text class="btn-text">确认支付</text>
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
      confirmPay () {
        this.$emit('confirmPay')
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
  .container{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }
  .header{
    width: 750px;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 4px;
    border-bottom-color: #f2f2f2;
  }
  .help{
    position: absolute;
    right: 20px;
    top: 25px;
  }
  .main{
    width: 750px;
    justify-content: center;
    align-items: center;
    padding-bottom: 200px;
  }
  .li{
    flex-direction: row;
    width: 710px;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 4px;
    border-bottom-color: #f2f2f2;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .text{
    font-size: 25px;
  }
  .right{
    flex-direction: row;
  }
  .money{
    font-size: 35px;
    font-weight: bold;
  }
  .btn{
    width: 700px;
    justify-content: center;
    align-items: center;
    background-color: #797979;
    margin-bottom: 10px;
    border-radius: 6px;
  }
  .btn-text{
    color: #fff;
    font-size: 25px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>