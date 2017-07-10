<template>
  <div>
    <scroller class="main">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="links">
        <div class="link" @click="goToCustomer">
          <div class="link-avatar">
            <img class="avatar-img" src="" />
          </div>
          <div class="link-main">
            <text class="link-title">我的客户</text>
            <text class="link-info">{{customers}}（{{customer.length}}）</text>
            <text class="link-tip" @click="addCustomer">新增</text>
          </div>
        </div>
        <div class="link"  @click="goToMessage">
          <div class="link-avatar">
            <img class="avatar-img" src="" />
          </div>
          <div class="link-main">
            <text class="link-title">留言/评价</text>
            <text class="link-info">{{message}}</text>
          </div>
        </div>
        <div class="link" @click="goToNotice">
          <div class="link-avatar">
            <img class="avatar-img" src="" />
          </div>
          <div class="link-main">
            <text class="link-title">系统消息</text>
            <text class="link-info">{{notice.likes}}人喜欢我 {{notice.reads}}人看过我 {{notice.recommends}}新用户推荐</text>
          </div>
        </div>
      </div>
      <div class="subtitle">
        <text style="font-size: 20px;padding-left: 30px;color: grey;">最近联系人</text>
      </div>
      <div class="contacts" v-if="contacts.length > 0">
        <div class="contact link" v-for="(contact,index) in contacts" @click="goToContact(contact.contactid)">
          <div class="link-avatar">
            <img class="avatar-img" :src="contact.avatar" />
            <div class="avatar-num">
              <text style="color: #fff;">{{contact.num}}</text>
            </div>
          </div>
          <div class="link-main">
            <text class="link-title">{{contact.name}}</text>
            <text class="link-info">{{contact.msg}}</text>
            <text class="link-tip">{{formTime(contact.time)}}</text>
          </div>
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
        if (length === 2) return this.customer.join(' / ')
        return this.customer.slice(0,3).join(' / ')
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
      },
      goToCustomer () {
        jump('me_customer.js')
      },
      goToMessage () {
        jump('message_message.js')
      },
      goToNotice () {
        jump('message_notice.js')
      },
      goToContact (id) {
        jump('message_contact.js', 'true', {contactid: id})
      },
      addCustomer () {
        jump('me_add-customer.js')
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
  }
  .link{
    flex-direction: row;
  }
  .link-avatar{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .avatar-img{
    width: 90px;
    height: 90px;
    border-radius: 45px;
    background-color: #eee;
  }
  .link-main{
    flex: 1;
    border-bottom-color: grey;
    border-bottom-width: 1px;
    padding-top: 20px;
    padding-bottom: 20px;
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
  .link-tip{
    position: absolute;
    right: 0;
    top: 0;
    color: grey;
    font-size: 22px;
    padding-top: 20px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
  }
  /* 最近联系人 */
  .subtitle{
    width: 750px;
    height: 60px;
    background-color: #f9f9f9;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    justify-content: center;
  }
  .avatar-num{
    position: absolute;
    background-color: red;
    right: 10px;
    top: 10px;
    width: 35px;
    height: 35px;
    border-radius: 18px;
    justify-content: center;
    align-items: center;
  }
</style>

