<template>
  <div>
    <scroller class="main">
      <div class="card">
        <div class="card-header">
          <div class="avatar">
            <img :src="cardData.avatar" class="avatar-img"/>
          </div>
          <div class="info">
            <div class="info-header">
              <text class="job">{{cardData.job}}</text>
              <text class="distance">{{cardData.distance}}</text>
            </div>
            <div class="info-main">
              <text class="info-text">{{cardData.name}} | {{cardData.sex?'男':'女'}} | {{cardData.exp}}年 | {{cardData.works}}件作品</text>
            </div>
            <div class="info-footer">
              <div class="stars" v-if="cardData.rank">
                <template v-for="star in stars">
                  <img :src="picRoot + 'star.png'" v-if="star === 'star'" class="star"/>
                  <img :src="picRoot + 'star-half.png'" v-if="star === 'star-half'" class="star"/>
                  <img :src="picRoot + 'star-full.png'" v-if="star === 'star-full'" class="star"/>
                </template>
              </div>
              <text class="rank">{{cardData.rank}}</text>
            </div>
          </div>
        </div>
        <div class="card-main">
          <div class="tags">
            <div class="tag" v-for="tag in cardData.tags"><text class="tag-text">{{tag}}</text></div>
          </div>
        </div>
      </div>
      <div class="dialog">
        <div class="talk" v-for="talk in talkData">
          <div class="time" v-if="talk.type === 'time'">
            <text class="time-text">{{talk.text}}</text>
          </div>
          <div class="say" v-if="talk.type === 'talk'">
            <div :class="talk.from+'-avatar'">
              <img :src="talk.from === 'me' ? user.avatar : cardData.avatar" class="say-avatar-img" />
            </div>
            <div :class="talk.from+'-content'">
              <div :class="talk.from+'-container'">
                <div class="msg" v-if="talk.data.type === 'text'">
                  <text class="msg-text">{{talk.data.text}}</text>
                </div>
                <div class="request" v-if="talk.data.type === 'request'">
                  <div class="request-header">
                    <text class="request-header-text">对方向您发起了约见请求：</text>
                  </div>
                  <div class="request-main">
                    <text class="request-text">{{talk.data.text}}</text>
                  </div>
                  <div class="request-footer">
                    <text class="request-detail">查看详细</text>
                    <text class="request-share">分享到</text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="Mia Zhang">
      <img :src="picRoot+'more.png'" class="menu" @click="setting"/>
    </sub-header>
    <dialog-footer></dialog-footer>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import dialogFooter from './components/dialog-footer.vue'

  import {getBaseUrl, jump, urlParse} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        cardData: {},
        contactid: urlParse().contactid,
        user: {},
        talkData: [
          {
            type: 'time',
            text: '昨天'
          },
          {
            type: 'talk',
            from: 'opposite',
            data: {
              type: 'text',
              text: '你好！看了你的作品，挺喜欢的，我就在你附近，有时间兼职吗？'
            }
          },
          {
            type: 'talk',
            from: 'me',
            data: {
              type: 'text',
              text: '你好！谢谢，我最近挺忙，你说一下大致需求，看是不是来得及做好吗？'
            }
          },
          {
            type: 'talk',
            from: 'opposite',
            data: {
              type: 'request',
              text: '时间：10月12日（星期三）下午：14:00 地址：杭州市天目山路136号（天堂软件园）23层2302室',
              url: ''
            }
          }
        ]
      }
    },
    computed: {
      stars () {
        let num = 0
        if (this.cardData.rank) {
          num = Math.round(this.cardData.rank * 2) / 2
        }
        console.log(num)
        let arr = []
        for (let i = 1; i <= num; i++) {
          arr.push('star-full')
        }
        if (num !== parseInt(num)) {
          arr.push('star-half')
        }
        let space = 5 - arr.length
        for(let i=1; i <= space; i++) {
          arr.push('star')
        }
        console.log(arr)
        return arr
      }
    },
    methods: {
      fetchData () {
        return getData('getContact', {
          id: this.contactid
        })
      },
      onrefresh () {
        // 服务器获取名片
        this.fetchData().then((res) => {
          this.cardData = res.data
        })
        // 本地获取对话
        // 
      },
      setting () {
        jump('message_setting-contact.js', {
          contactid: this.contactid
        })
      }
    },
    mounted () {
      storage.getItem('user', e => {
        this.user = JSON.parse(e.data)
        this.onrefresh()
      })
    },
    components: {
      subHeader, dialogFooter
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
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #f2f2f2;
  }
  .menu{
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-right: 20px;
  }
  /* 名片 */
  .card{
    border-radius: 20px;
    border-width: 1px;
    border-color: grey;
    overflow: hidden;
  }
  /* 上面蓝色部分 */
  .card-header{
    flex-direction: row;
    background-color: #17a9de;
    height: 160px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .avatar{
    padding-right: 20px;
  }
  .avatar-img{
    width: 130px;
    height: 130px;
    border-radius: 80px;
  }
  .info{
    flex: 1;
  }
  .info-header{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .job{
    font-size: 35px;
    color: #fff;
  }
  .distance{
    color: #fff;
    font-size: 30px;
  }
  .info-main{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .info-text{
    font-size: 25px;
    color: #fff;
  }
  .info-footer{
    flex-direction: row;
  }
  .stars{
    flex-direction: row;
  }
  .star{
    width: 25px;
    height: 25px;
  }
  .rank{
    font-size: 22px;
    padding-left: 20px;
    color: #fff;
  }
  /* 下面标签部分 */
  .card-main{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
  }
  .tags{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .tag{
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-width: 1px;
    border-color: grey;
    border-radius: 20px;
  }
  .tag-text{
    font-size: 22px;
  }
  /* 对话框 */
  .dialog{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .talk{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  /* 时间 */
  .time{
    justify-content: center;
    align-items: center;
  }
  .time-text{
    font-size: 18px;
    color: #fff;
    background-color: #cfcfcf;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 20px;
  }
  /* 对话 */
  .say{
    position: relative;
  }
  /* 头像 */
  .me-avatar{
    right: 0;
  }
  .opposite-avatar{
    left: 0;
  }
  .me-avatar, .opposite-avatar{
    position: absolute;
  }
  .say-avatar-img{
    width: 90px;
    height: 90px;
    border-radius: 45px;
    background-color: #ddd;
  }
  /* 内容 */
  .me-content{
    padding-right: 120px;
    padding-left: 30px;
  }
  .opposite-content{
    padding-left: 120px;
    padding-right: 30px;
  }
  .me-container{
    background-color: #c1e0f0;
  }
  .opposite-container{
    background-color: #fff;
  }
  .me-container, .opposite-container{
    border-width: 1px;
    border-color: grey;
    border-radius: 10px;
    overflow: hidden;
  }
  /* 消息 */
  .msg{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .msg-text{
    font-size: 25px;
  }
  /* 请求 */
  .request{

  }
  .request-header{
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .request-header-text{
    font-size: 30px;
    font-weight: bold;
  }
  .request-main{
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 10px;
  }
  .request-text{
    font-size: 25px;
    color: grey;
  }
  .request-footer{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .request-detail{
    background-color: #17a9de;
  }
  .request-share{
    background-color: #f15b20;
  }
  .request-detail, .request-share{
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>