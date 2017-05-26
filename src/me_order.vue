<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 收藏列表 -->
      <div class="orders">
        <div class="order" v-for="(order,index) in orderData">
          <div class="order-header">
            <div class="header-left">
              <img :src="order.avatar" class="avatar" />
              <text class="name">{{order.name}}</text>
            </div>
            <div class="header-right">
              <text class="date">{{order.startdate.slice(0,10)}}———{{order.enddate.slice(0,10)}}</text>
            </div>
          </div>
          <div class="order-main">
            <div class="items">
              <div class="item" v-for="item in order.items">
                <text class="title">{{item.title}}</text>
                <text class="money">{{item.order}}元/{{item.unit}} × {{item.num}}</text>
              </div>
              <div class="count">
                <text class="count-num">共{{order.items.length}}项服务</text>
              </div>
              <div class="amount">
                <text class="amount-title">总计：</text>
                <text class="amount-num">￥{{calc(order.items)}}</text>
              </div>
            </div>
          </div>
          <!-- 作为服务方-不同状态对应文字和按钮 -->
          <div class="order-footer">
            <div v-if="tabIndex === 0 && order.state === 0" class="order-state-bar">
              <text class="order-action" style="color: #55a1d8;">作业中</text>
              <div class="btns">
                <div class="btn" @click="remindOrder(order.orderid, index)">
                  <text class="btn-text">提醒付款</text>
                </div>
                <div class="btn" @click="delayOrder(order.orderid, index)">
                  <text class="btn-text">申请延期</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 0 && order.state === 1" class="order-state-bar">
              <text class="order-action" style="color: #429f29;">已完成</text>
              <div class="btns">
                <div class="btn" @click="evalOrder(order.orderid, index)">
                  <text class="btn-text">评价</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 0 && order.state === 2" class="order-state-bar">
              <text class="order-action" style="color: grey;">已评价</text>
              <div class="btns">
                <div class="btn" @click="delOrder(order.orderid, index)">
                  <text class="btn-text">删除</text>
                </div>
              </div>
            </div>
            <!-- 作为需求方-不同状态对应文字和按钮 -->
            <div v-if="tabIndex === 1 && order.state === 0" class="order-state-bar">
              <text class="order-action" style="color: #55a1d8;">作业中</text>
              <div class="btns">
                <div class="btn" @click="checkOrder(order.orderid, index)">
                  <text class="btn-text">方案验收</text>
                </div>
                <div class="btn" @click="delayOrder(order.orderid, index)">
                  <text class="btn-text">申请延期</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 1 && order.state === 1" class="order-state-bar">
              <text class="order-action" style="color: #429f29;">已完成</text>
              <div class="btns">
                <div class="btn" @click="evalOrder(order.orderid, index)">
                  <text class="btn-text">评价</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 1 && order.state === 2" class="order-state-bar">
              <text class="order-action" style="color: grey;">已评价</text>
              <div class="btns">
                <div class="btn" @click="delOrder(order.orderid, index)">
                  <text class="btn-text">删除</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="我的订单"></sub-header>
    <tab :tabItems="tabItems" :tabIndex="tabIndex" @select="setTab" class="tab"></tab>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import tab from './components/tab.vue'

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
        tabItems: ['作为服务方', '作为需求方'],
        tabIndex: 0,
        states: ['作业中','已完成','已评价'],
        orderData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getMyOrdersList', {
          id: 1, page: 1, perpage: 5, type: this.tabIndex
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.orderData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((order) => {
            this.orderData.push(order)
          })
          this.showloading = 'hide'
        })
      },
      setTab (index) {
        this.tabIndex = index
        this.onrefresh()
      },
      calc (items) {
        let amount = 0
        items.forEach((item) => {
          amount += item.price * item.num
        })
        return amount
      },
      remindOrder (orderid, index) {

      },
      delOrder (orderid, index) {

      },
      cdelayOrder (orderid, index) {

      },
      evalOrder (orderid, index) {

      },
      checkOrder (orderid, index) {

      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader, tab
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    width: 750px;
    top: 160px;
    left: 0;
    bottom: 0;
    background-color: #f2f2f2;
  }
  .tab{
    position: fixed;
    top:80px;
    height: 80px;
    width: 750px;
    left: 0;
  }
  /* 报价单列表 */
  .orders{

  }
  .order{
    margin-bottom: 20px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .order-header{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    padding-bottom: 10px;
  }
  .header-left{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .avatar{
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin-right: 20px;
  }
  .name{
    font-weight: bold;
    font-size: 25px;
  }
  .header-right{

  }
  .date{
    font-size: 22px;
    color: grey;
  }
  .order-main{
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .items{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .item{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .title{
    font-size: 25px;
  }
  .money{
    font-size: 25px;
  }
  .count{
    justify-content: center;
    align-items: center;
  }
  .count-num{
    color: grey;
    font-size: 22px;
  }
  .amount{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .amount-title{
    font-size: 25px;
    font-weight: bold;
  }
  .amount-num{
    font-size: 25px;
    font-weight: bold;
  }
  .order-footer{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .order-state-bar{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .order-action{
    font-size: 25px;
  }
  .btns{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .btn{
    width: 150px;
    height: 44px;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-radius: 22px;
    margin-left: 20px;
  }
  .btn-text{
    font-size: 25px;
  }
</style>