<template>
  <div style="justify-content:center; align-items: center;">
    <div class="back" @click="back">
      <img :src="picRoot+'left.png'" class="back-btn"/>
    </div>
    <div class="result" v-if="result">
      <img :src="result.img" class="result-pic"/>
      <text class="result-text">{{result.text}}</text>
    </div>
    <div class="action" v-if="result" @click="go">
      <text class="action-text">{{result.action}}</text>
    </div>
  </div>
</template>

<script>
  import {jump, urlParse} from './common/util.js'
  import config from './common/config.js'

  export default {
    data () {
      return {
        designerid: urlParse().id,
        pay: urlParse().pay,
        picRoot: config.picRoot
      }
    },
    computed: {
      result () {
        if (this.pay === 'success') {
          return {
            img: this.picRoot + 'smile.png',
            text: '支付成功',
            action: '查看订单'
          }
        } else {
          return {
            img: this.picRoot + 'cry.png',
            text: '支付失败',
            action: '重新下单'
          }
        }
      }
    },
    methods: {
      back () {
        jump('designer.js', {
          id: this.designerid
        })
      },
      go () {
        if (this.pay === 'success') {
          // jump('me-orders')
        } else {
          this.back()
        }
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  .back{
    width: 750px;
    height: 80px;
    padding-left: 10px;
    padding-top: 10px;
  }
  .back-btn{
    width: 50px;
    height: 50px;
  }
  .result{
    width: 750px;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
  }
  .result-pic{
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
  }
  .result-text{
    font-size: 25px;
  }
  .action{
    background-color: #797979;
    width: 270px;
    height: 80px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    margin-top: 200px;
  }
  .action-text{
    color: #fff;
    font-size: 25px;
  }
</style>