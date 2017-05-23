<template>
  <div>
    <scroller class="main">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="links">
        <div class="link" style="border-bottom-width: 1px;">
          <img class="avatar" src="" />
          <text class="link-title">我的客户</text>
          <text class="link-info">{{customers}}（{{customer.length}}）</text>
          <text class="tip">新增</text>
        </div>
        <div class="link" style="border-bottom-width: 1px;">
          <img class="avatar" src="" />
          <text class="link-title">留言/评价</text>
          <text class="link-info">{{message}}</text>
        </div>
        <div class="link">
          <img class="avatar" src="" />
          <text class="link-title">系统消息</text>
          <text class="link-info">{{notice.likes}}人喜欢我 {{notice.reads}}人看过我 {{notice.recommends}}新用户推荐</text>
        </div>
      </div>
      <div class="subtitle">
        <text style="font-size: 20px;padding-left: 30px;color: grey;">最近联系人</text>
      </div>
      <div class="contacts">
        <div class="contact link" v-for="(contact,index) in contacts" :style="{'border-bottom-width': index===30-1?'0px':'1px'}">
          <img class="avatar" :src="contact.avatar" />
          <div class="num">
            <text style="color: #fff;">{{contact.num}}</text>
          </div>
          <text class="link-title">{{contact.name}}</text>
          <text class="link-info">{{contact.msg}}</text>
          <text class="tip">{{formTime(contact.time)}}</text>
        </div>
      </div>
    </scroller>
    <div class="header">
      <text>联系人</text>
    </div>
    <mainTab :selectedIndex="3"></mainTab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'

  import {getBaseUrl, jump, formatDate} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        refreshing: 'hide',
        picRoot: config.picRoot,
        customer: [],
        message: '',
        notice: {likes:0, reads: 0, recommends: 0},
        contacts: []
      }
    },
    computed: {
      customers () {
        let length = this.customer.length
        if (length === 1) return this.customer[0] 
        if (length === 2) return this.customer.join('/')
        return this.customer.slice(0,3).join('/')
      }
    },
    methods: {
      fetchData () {
        return getData('getContactsData', {
          id: 1
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.customer = res.data.customer
          this.message = res.data.message
          this.notice = res.data.notice
          this.contacts = res.data.contacts
          this.refreshing = 'hide'
        })
      },
      formTime (time) {
        return formatDate (time, 'hh:mm')
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      mainTab
    }
  }
</script>

<style scoped>
  /* 头部标题 */
  .header{
    position: fixed;
    height: 100px;
    width: 750px;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    background-color: #f9f9f9;
  }
  .main{
    position: fixed;
    width: 750px;
    top: 100px;
    bottom: 100px;
  }
  /* 链接 */
  .links, .contacts{
    padding-left: 140px;
  }
  .link{
    position: relative;
    border-bottom-color: grey;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .avatar{
    position: absolute;
    width: 90px;
    height: 90px;
    border-radius: 45px;
    background-color: #eee;
    left: -115px;
  }
  .link-title{
    font-size: 30px;
    padding-bottom: 10px;
    font-weight: bold;
  }
  .link-info{
    color: grey;
    font-size: 22px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tip{
    position: absolute;
    right: 20px;
    color: grey;
    font-size: 22px;
  }
  /* 最近联系人 */
  .subtitle{
    width: 750px;
    height: 50px;
    background-color: #f9f9f9;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    justify-content: center;
  }
  .num{
    position: absolute;
    background-color: red;
    left: -55px;
    width: 35px;
    height: 35px;
    border-radius: 18px;
    justify-content: center;
    align-items: center;
  }
</style>

