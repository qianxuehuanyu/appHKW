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
      <div class="customers">
        <div class="customer-header">
          <text class="customer-header-text">客户信息</text>
          <img :src="picRoot+'user.png'" class="customer-header-img" @click="selectCustomer"/>
        </div>
        <div class="customer-list">
          <div class="customer" v-for="(customer,index) in customers" @click="toggleCustomer(index)">
            <div class="circle" >
              <div class="check-circle" :key="'checked'+index" v-if="customer.checked" style="background-color: #000;"></div>
            </div>
            <text class="name">{{customer.name}}</text>
            <text class="tel">{{customer.tel}}</text>
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="报价详情"></sub-header>
    <div class="footer" >
      <div class="discount">
        <div class="discount-header">
          <div class="circle" @click="toggleShowDiscount">
            <div class="check-circle" v-if="showDiscount" style="background-color: #000;"></div>
          </div>
          <text style="margin-right: 20px;">设置优惠</text>
          <div class="discount-items" v-if="showDiscount">
            <template v-for="(item,index) in discountItems">
              <div class="discount-item" @click="toggleDiscountItem(index)"  v-if="item.checked" style="background-color: #409ad6;"><text style="font-size: 25px;color: #fff;">{{item.text}}</text></div>
              <div class="discount-item" @click="toggleDiscountItem(index)"  v-else><text style="font-size: 25px;color: grey;">{{item.text}}</text></div>
            </template>
          </div>
        </div>
        <div class="discount-price" v-if="showDiscount">
          <text>总计：</text><text style="color:red;margin-right:100px;">￥{{data.amount}}</text>
          <text>优惠后：</text><text style="color:red;">￥{{discountPrice}}</text>
        </div>
      </div>
      <div class="send" @click="send">
        <text class="send-text">发送并分享</text>
      </div>
    </div>
    <selector v-if="showSelector" :items="selectorItems" @cancelSelect="cancelSelector" @confirmSelect="confirmSelector"></selector>
    <share v-if="showShare" :info="shareInfo" @cancelShare="cancelShare"></share>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import selector from './components/selector.vue'
  import share from './components/share.vue'

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
        customers: [
          {checked: true, name: "张三", tel: 13562555456},
          {checked: false, name: "李四", tel: 13562555456}
        ],
        showDiscount: true,
        discount: 1,
        discountItems:[
          {checked: true, text: '自定义'},
          {checked: false, text: '1折'}
        ],
        showSelector: false,
        selectorItems: ['1折', '2折', '3折', '4折', '5折', '6折', '7折', '8折', '9折'],
        showShare: false,
        shareInfo: ''
      }
    },
    computed: {
      tax () {
        let tax = this.data.amount * this.data.taxRate
        return Math.round(tax) / 100
      },
      discountPrice () {
        return this.data.amount * this.discount / 10
      }
    },
    methods: {
      initData () {
        storage.getItem('price', e => {
          this.data = JSON.parse(e.data)
        })
      },
      toggleCustomer (index) {
        let customer = this.customers[index]
        customer.checked = !customer.checked
      },
      selectCustomer () {
        // jump()
      },
      toggleShowDiscount () {
        this.showDiscount = !this.showDiscount
      },
      toggleDiscountItem (index) {
        if (index === 0) {
          this.discountItems[0].checked = true
          this.discountItems[1].checked = false
        } else {
          this.discountItems[0].checked = false
          this.discountItems[1].checked = true
          this.showSelector = true
        }
      },
      cancelSelector () {
        this.showSelector = false
      },
      confirmSelector (value) {
        this.discountItems[1].text = value
        this.discount = parseInt(value)
        this.showSelector = false
      },
      send () {
        // 向服务器发送请求
        // success
        this.shareInfo = '发送成功'
        this.showShare = true
      },
      cancelShare () {
        this.showShare = false
      }
    },
    created () {
      this.initData()
    },
    components: {
      subHeader, selector, share
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    width: 750px;
    background-color: #f2f2f2;
  }
  /* 报价单 */
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
  /* 客户信息 */
  .customers{
    background-color: #fff;
    justify-content: center;
    align-items: center;
  }
  .customer-header{
    width: 750px;
    justify-content: space-between;
    flex-direction: row;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
  }
  .customer-header-text{
    font-size: 25px;
  }
  .customer-header-img{
    width: 40px;
    height: 40px;
  }
  .customer-list{

  }
  .customer{
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
  /* 发送并分享 */
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    justify-content: center;
    align-items: center;
    border-top-width: 1px;
    border-top-color: #777;
  }
  .send{
    height: 100px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #409ad6;
  }
  .send-text{
    color: #fff;
    font-size: 25px;
  }
  .name, .tel{
    font-size: 25px;
    padding-right: 20px;
  }
  .discount{
    background-color: #eee;
    width: 750px;
  }
  .discount-header{
    flex-direction: row;
    height: 80px;
    width: 750px;
    justify-content: flex-start;
    align-items: center;
  }
  .discount-items{
    flex-direction: row;
  }
  .discount-item{
    border-width: 1px;
    border-color: #777;
    border-radius: 6px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 20px;
  }
  .discount-price{
    flex-direction: row;
    height: 80px;
    width: 750px;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
  }
</style>