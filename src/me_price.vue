<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 收藏列表 -->
      <div class="prices">
        <div class="price" v-for="(price,index) in priceData">
          <div class="price-header">
            <div class="header-left">
              <img :src="price.avatar" class="avatar" />
              <text class="name">{{price.name}}</text>
            </div>
            <div class="header-right">
              <text class="date">{{price.date}}</text>
            </div>
          </div>
          <div class="price-main">
            <div class="items">
              <div class="item" v-for="item in price.items">
                <text class="title">{{item.title}}</text>
                <text class="money">{{item.price}}元/{{item.unit}} × {{item.num}}</text>
              </div>
              <div class="count">
                <text class="count-num">共{{price.items.length}}项服务</text>
              </div>
              <div class="amount">
                <text class="amount-title">总计：</text>
                <text class="amount-num">￥{{calc(price.items)}}</text>
              </div>
            </div>
          </div>
          <!-- 发出的-不同状态对应文字和按钮 -->
          <div class="price-footer">
            <div v-if="tabIndex === 0 && price.state === 0" class="price-state-bar">
              <text class="price-action" style="color: green;">等待客户处理</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">再次编辑</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 0 && price.state === 1" class="price-state-bar">
              <text class="price-action" style="color: blue;">客户已通过</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">删除</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 0 && price.state === 2" class="price-state-bar">
              <text class="price-action" style="color: #ffa142;">客户不满意</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">删除</text>
                </div>
                <div class="btn">
                  <text class="btn-text">再次编辑</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 0 && price.state === 3" class="price-state-bar">
              <text class="price-action" style="color: red;">您已取消</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">删除</text>
                </div>
                <div class="btn">
                  <text class="btn-text">再次编辑</text>
                </div>
              </div>
            </div>
            <!-- 收到的-不同状态对应文字和按钮 -->
            <div v-if="tabIndex === 1 && price.state === 0" class="price-state-bar">
              <text class="price-action" style="color: green;">待处理</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">同意合作</text>
                </div>
                <div class="btn">
                  <text class="btn-text">不满意</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 1 && price.state === 1" class="price-state-bar">
              <text class="price-action" style="color: blue;">已同意</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">删除</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 1 && price.state === 2" class="price-state-bar">
              <text class="price-action" style="color: #ffa142;">您已拒绝</text>
              <div class="btns">
                <div class="btn">
                  <text class="btn-text">删除</text>
                </div>
              </div>
            </div>
            <div v-if="tabIndex === 1 && price.state === 3" class="price-state-bar">
              <text class="price-action" style="color: red;">设计师已取消</text>
              <div class="btns">
                <div class="btn">
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
    <sub-header title="报价单"></sub-header>
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
        tabItems: ['发出的', '收到的'],
        tabIndex: 0,
        states: ['待处理','已同意','已拒绝','已取消'],
        priceData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getMyPriceList', {
          id: 1, page: 1, perpage: 5, type: this.tabIndex
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.priceData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((price) => {
            this.priceData.push(price)
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
  .prices{

  }
  .price{
    margin-bottom: 20px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .price-header{
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
  .price-main{
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
  .price-footer{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .price-state-bar{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .price-action{
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