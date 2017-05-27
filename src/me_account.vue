<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="header">
        <text class="header-text">余额：{{amount}}元&emsp;待解冻：{{frozen}}元</text>
      </div>
      <div class="cash">
        <text class="cash-text">{{cash}}</text>
        <div class="cashing" @click="cashing">
          <text class="cashing-text">提现</text>
        </div>
      </div>
      <div class="list">
        <div class="title">
          <text class="title-text">收支明细</text>
        </div>
        <div class="ul">
          <div class="li" v-for="pay in payList">
            <div class="left">
              <text class="pay-type">{{types[pay.type]}}</text>
              <text class="pay-afteramount">余额：{{pay.afterAmount}}</text>
            </div>
            <div class="right">
              <text class="pay-date">{{pay.date}}</text>
              <text class="pay-amount">{{pay.amount}}</text>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="我的帐户"></sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        refreshing: 'hide',
        showloading: 'hide',
        picRoot: config.picRoot,
        cash: 0,
        amount: 0,
        frozen: 0,
        payList: [],
        types: ['充值','在线支付']
      }
    },
    methods: {
      fetchData () {
        return getData('getMyAccount', {
          id: 1, page: 1, perpage: 10
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.cash = res.data.cash
          this.frozen = res.data.frozen
          this.payList = res.data.payList
          // this.amount = res.data.amount
          this.amount = this.cash + this.frozen
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.payList.forEach((pay) => {
            this.payList.push(pay)
          })
          this.showloading = 'hide'
        })
      },
      cashing () {
        
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    width: 750px;
    top: 100px;
    left: 0;
    bottom: 0;
  }
  /* 余额、待解冻 */
  .header{
    background-color: #dcf1f8;
    width: 750px;
    height: 80px;
    justify-content: center;
    align-items: center;
  }
  .header-text{

  }
  /* 提现 */
  .cash{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .cash-text{
    font-size: 60px;
    padding-right: 20px;
  }
  .cashing{
    width: 110px;
    height: 110px;
    border-radius: 55px;
    background-color: #17a9de;
    justify-content: center;
    align-items: center;
  }
  .cashing-text{
    color: #fff;
    font-size: 30px;
  }
  /* 收支明细 */
  .list{
    
  }
  .title{
    justify-content: center;
    align-items: center;
    margin-bottom: -20px;
  }
  .title-text{
    background-color: #fff;
    padding-left: 40px;
    padding-right: 40px;
  }
  .ul{

  }
  .li{
    border-top-width: 1px;
    border-top-color: #ddd;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .left{

  }
  .right{
    align-items: flex-end;
  }
  .pay-type{
    font-size: 28px;
    padding-bottom: 10px;
  }
  .pay-afteramount{
    font-size: 24px;
  }
  .pay-date{
    font-size: 24px;
    color: grey;
    padding-bottom: 10px;
  }
  .pay-amount{
    font-size: 30px;
    font-weight: bold;
  }
</style>