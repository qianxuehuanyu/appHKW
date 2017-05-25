<template>
  <div>
    <scroller class="main">
      <div class="ul">
        <div class="li" @click="goTo('')">
          <text>头像</text>
          <div class="right">
            <img :src="avatar" class="avatar" />
            <img :src="picRoot+'right.png'" class="right-arrow" />
          </div>
        </div>
      </div>
      <div class="ul">
        <div class="li" v-for="(item,index) in ul2" @click="goTo(item.url)">
          <text>{{item.title}}</text>
          <div class="right">
            <text class="text">{{item.text}}</text>
            <text v-if="index === 4 && item.certificated" class="certificate" style="color: #0091d3;">已认证</text>
            <text v-if="index === 4 && !item.certificated" class="certificate" style="color: grey;">未认证</text>
            <img :src="picRoot+'right.png'" class="right-arrow" />
          </div>
        </div>
      </div>
      <div class="ul">
        <div class="li" v-for="item in ul3" @click="goTo(item.url)">
          <text>{{item.title}}</text>
          <div class="right">
            <text class="text" style="color: grey;">{{item.text}}</text>
            <img :src="picRoot+'right.png'" class="right-arrow" />
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="完善资料"></sub-header>
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
        id: '',
        avatar: '',
        picRoot: config.picRoot,
        ul2: [
          {title: '名字', text: '', url: ''},
          {title: '性别', text: '', url: ''},
          {title: '公司', text: '', url: ''},
          {title: '职位', text: '', url: ''},
          {title: '手机号', text: '13958054565', certificated: true, url: ''}
        ],
        ul3: [
          {title: '绑定手机', text: '88098417', url: ''},
          {title: '绑定QQ', text: '88098417', url: ''},
          {title: '绑定微信', text: 'Mia@g-in.com.cn', url: ''},
          {title: '绑定邮箱', text: 'Mia@g-in.com.cn', url: ''}
        ]
      }
    },
    methods: {
      goTo (url) {
        jump(url)
      },
      logout () {
        storage.removeItem('user', e => {
          jump('login.js')
        })
      }
    },
    mounted () {
      storage.getItem('user', e => {
        let user = JSON.parse(e.data)
        this.id = user.id
        this.avatar = user.avatar
      })
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
    top: 80px;
    left: 0;
    bottom: 0;
    background-color: #f2f2f2;
  }
  .ul{
    margin-bottom: 40px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: grey;
    background-color: #fff;
  }
  .li{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: #ddd;
  }
  .avatar{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .right{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .right-arrow{
    width: 40px;
    height: 40px;
  }
  .logout{
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: center;
    align-items: center;
  }
  .logout-text{
    color: #f00;
    font-size: 30px;
  }
  .text{
    font-size: 30px;
  }
  .certificate{
    padding-left: 20px;
    padding-right: 20px;
    font-size: 30px;
  }
</style>