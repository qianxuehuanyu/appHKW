<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 消息列表 -->
      <div class="messages">
        <div class="message" v-for="msg in msgData">
          <div class="avatar">
            <img :src="msg.avatar" class="avatar-img" />
          </div>
          <div class="content">
            <div class="msg-left">
              <text class="name">{{msg.name}}</text>
              <text class="num">{{msg.job}} | {{msg.exp}}年 | {{msg.works}}件作品</text>
              <text class="action">{{actionText(msg.action)}}</text>
            </div>
            <div class="msg-right">
              <text class="time">{{formTime(msg.time)}}</text>
              <img :src="picRoot+msg.action+'.png'" class="action-img" />
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="系统消息">
      <img :src="picRoot+'setting.png'" class="setting" @click="setting"/>
    </sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump, passtime} from './common/util.js'
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
        msgData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getNoticeList', {
          id: 1, page: 1, perpage: 10
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.msgData = []
          this.msgData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((msg) => {
            this.msgData.push(msg)
          })
          this.showloading = 'hide'
        })
      },
      actionText (action) {
        if (action === 'read') return '查看了你的空间'
        if (action === 'reply') return '回复了你的帖子'
        if (action === 'new') return '发布了新需求'
        if (action === 'like') return '对你表示感兴趣'
      },
      formTime (time) {
        return passtime(time)
      },
      setting () {
        jump('message_setting-message.js')
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
  .setting{
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-right: 20px;
  }
  /* 消息列表 */
  .messages{

  }
  .message{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  /* 头像 */
  .avatar{
    width: 120px;
    align-items: flex-start;
  }
  .avatar-img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  /* 内容 */
  .content{
    flex: 1;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .msg-left{
  }
  .name{
    font-size: 30px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .num{
    font-size: 25px;
    color: grey;
    padding-bottom: 10px;
  }
  .action{
    font-size: 25px;
    color: grey;
    padding-bottom: 10px;
  }
  .msg-right{
    justify-content: center;
    align-items: flex-end;
  }
  .time{
    color: grey;
    font-size: 22px;
    padding-bottom: 20px;
  }
  .action-img{
    width: 50px;
    height: 50px;
  }
</style>