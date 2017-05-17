<template>
  <div class="buy-footer">
    <div class="toggle-part" ref="slide">
      <div class="tax-bar">
        <div class="taxs">
          <template v-for="(tax,index) in taxItems">
            <div class="tax" v-if="tax.checked" @click="selectTax(tax)" style="background-color: #409ad6;">
              <text class="tax-text" style="color: #fff;">{{tax.text}}</text>
            </div>
            <div class="tax" v-if="!tax.checked" @click="selectTax(tax)" style="background-color: #fff;">
              <text class="tax-text" style="color: #000;">{{tax.text}}</text>
            </div>
          </template>
        </div>
        <div class="ask" @click="help">
          <text style="color: grey;">?</text>
        </div>
      </div>
      <div class="toggle-btn"  @click="toggleSlide" ref="btn">
        <img :src="picRoot + 'down-white.png'" style="width: 50px; height: 50px;" />
      </div>
    </div>
    <div class="pay-bar">
      <div class="amount">
        <text class="amount-text">合计：￥{{amount}}</text>
      </div>
      <div class="pay-btn" @click="pay">
        <text >购买</text>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBaseUrl, jump} from '../common/util.js'
  import config from '../common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')

  export default {
    props: {
      cart: Array,
      designerid: null
    },
    computed: {
      amount () {
        let num = 0
        this.cart.forEach((item) => {
          let money = item.price * item.num
          num += money
        })
        num = num * (100 - this.tax) / 100
        return num
      }
    },
    data () {
      return {
        picRoot: config.picRoot,
        getBaseUrl: getBaseUrl(),
        taxItems: [
          {text: '不需要税率', num: 0, checked: true}, 
          {text: '3%', num: 3, checked: false}, 
          {text: '6%', num: 6, checked: false}
        ],
        tax: 0,
        hide: false
      }
    },
    methods: {
      selectTax (tax) {
        if (tax.checked) return false
        this.taxItems.forEach((item) => {
          item.checked = false
        })
        tax.checked = true
        this.tax = tax.num
      },
      toggleSlide () {
        const slide = this.$refs.slide
        const btn = this.$refs.btn
        this.hide = !this.hide
        animation.transition(slide, {
          styles: {
            transform: this.hide ? 'translate(0, 80px)' : 'translate(0, 0)'
          },
          duration: 200,
          timingFunction: 'ease',
          delay: 0
        }, () => {
          animation.transition(btn, {
            styles: {
              transform: this.hide ? 'rotate(180deg)' : 'rotate(0deg)'
            },
            duration: 200,
            timingFunction: 'ease',
            delay: 0
          })
        })
      },
      pay () {
        let obj = {}
        obj.taxRate = this.tax
        obj.amount = this.amount
        obj.orders = this.cart
        obj.designerid = this.designerid
        // 提交服务器下单
        let order = JSON.stringify(obj)
        // 本地存储
        storage.setItem('order', order, () => {
          jump('pay_order.js')
        })
      },
      help () {
        // 跳转
      }
    }
  }
</script>

<style scoped>
  .buy-footer{
    position: fixed;
    bottom: 0;
    width: 750px;
  }
  .toggle-part{position: relative;}
  .toggle-btn{
    position: absolute;
    top: -40px;
    left: 350px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #eee; 
    justify-content: center;
    align-items: center;
  }
  .tax-bar{
    height: 80px;
    width: 750px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
  .taxs{
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .tax{
    height: 50px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-width: 1px;
    border-radius: 6px;
    margin-left: 20px;
    margin-right: 20px;
    justify-content: center;
    align-items: center;
  }
  .tax-text{
    font-size: 25px;
  }
  .ask{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border-width: 1px;
    border-color: grey;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .pay-bar{
    height: 100px;
    width: 750px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-top-width: 1px;
    border-top-color: grey;
  }
  .amount{
    justify-content: center;
    align-items: flex-start;
    flex: 3;
    height: 100px;
  }
  .amount-text{
    padding-left: 20px;
    font-size: 30px;
  }
  .pay-btn{
    background-color: #409ad6;
    justify-content: center;
    align-items: center;
    flex: 5;
    height: 100px;
  }
</style>