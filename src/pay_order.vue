<template>
  <div>
    <scroller class="main">
      <div class="orders">
        <div class="order" v-for="order in data.orders">
          <text class="title">{{order.title}}</text>
          <text class="desc">{{order.desc}}</text>
          <div style="justify-content: space-between;flex-direction: row;">
            <text></text>
            <text class="price">{{order.price}}元/{{order.unit}} × {{order.num}}</text>
          </div>
        </div>
        <div class="item">
          <text class="left">税率</text>
          <text class="right">{{data.taxRate}}% (￥{{tax}})</text>
        </div>
        <div class="item">
          <text class="left">总计</text>
          <text class="right" style="color: red;">￥{{data.amount}}</text>
        </div>
      </div>
      <div class="types">
        <div class="type" v-for="(type,index) in types" @click="selectType(index)">
          <div class="circle" >
            <div class="check-circle" :key="'checked'+index" v-if="type.checked" style="background-color: #000;"></div>
          </div>
          <img :src="type.img" style="width: 30px; height: 30px;"/>
          <text> {{type.text}}</text>
        </div>
      </div>
    </scroller>
    <sub-header title="确认订单"></sub-header>
    <div class="pay" @click="pay">
      <text class="pay-text">支&emsp;付</text>
    </div>
    <confirm-pay v-if="showConfirm" @confirmPay="confirmPay"></confirm-pay>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import confirmPay from './components/confirm-pay.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        data: {},
        types: [
          {checked: true, img: config.picRoot+'alipay.png', text: "支付宝"},
          {checked: false, img: config.picRoot+'wepay.png', text: "微信支付"}
        ],
        selectedType: 0,
        showConfirm: false
      }
    },
    computed: {
      tax () {
        let tax = this.data.amount * this.data.taxRate
        return Math.round(tax) / 100
      }
    },
    methods: {
      initData () {
        storage.getItem('order', e => {
          console.log(e)
          if (e.result === 'success') {
            this.data = JSON.parse(e.data)
          } else {
            navigator.pop()
          }
        })
      },
      selectType (index) {
        if (this.selectedType === index) return false
        this.types[0].checked = false
        this.types[1].checked = false
        this.types[index].checked = true
        this.selectedType = index
      },
      pay () {
        this.showConfirm = true
      },
      confirmPay () {
        // 发送支付请求
        // success
        storage.removeItem('order', () => {
          jump('pay_result.js', {
            id: this.data.designerid,
            pay: 'success'
          })
        })
      }
    },
    created () {
      this.initData()
    },
    components: {
      subHeader, confirmPay
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 80px;
    bottom: 100px;
    left: 0;
    width: 750px;
    background-color: #f2f2f2;
  }
  /* 订单 */
  .orders{
    margin-top: 20px;
    margin-bottom: 40px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }
  .order, .item{
    width: 700px;
    border-bottom-width: 2px;
    border-bottom-color: #f2f2f2;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .title{
    font-size: 35px;
    color: #000;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .desc{
    font-size: 25px;
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-bottom: 10px;
  }
  .price{
    font-size: 25px;
    color: #000;
  }
  .item{
    flex-direction: row;
    justify-content: space-between;
  }
  .left, .right{
    font-size: 25px;
  }
  /* 支付方式 */
  .types{
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }
  .type{
    flex-direction: row;
    width: 700px;
    border-bottom-width: 2px;
    border-bottom-color: #f2f2f2;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-start;
    align-items: center;
  }
  /* check */
  .circle{
    width: 25px;
    height: 25px;
    border-radius: 13px;
    background-color: #ddd;
    border-width: 1px;
    border-color: #000;
    position: relative;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 3px;
  }
  .check-circle{
    position: absolute;
    width: 15px;
    height: 15px;
    top: 4px;
    left: 4px;
    border-radius: 10px;
  }
  /* 支付 */
  .pay{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 100px;
    justify-content: center;
    align-items: center;
    background-color: #409ad6;
  }
  .pay-text{
    color: #fff;
    font-size: 25px;
  }
</style>