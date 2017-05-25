<template>
  <div>
    <scroller class="main">
      <div class="ul">
        <div class="li" @click="goTo('')">
          <text>修改密码</text>
          <img :src="picRoot+'right.png'" class="right" />
        </div>
      </div>
      <div class="ul">
        <div class="li" v-for="item in items" @click="goTo(item.url)">
          <text>{{item.text}}</text>
          <img :src="picRoot+'right.png'" class="right" />
        </div>
      </div>
      <div class="ul">
        <div class="logout" @click="logout">
          <text class="logout-text">退出登录</text>
        </div>
      </div>
    </scroller>
    <sub-header title="设置"></sub-header>
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
        picRoot: config.picRoot,
        items: [
          {text: '意见反馈', url: ''},
          {text: '我要评价', url: ''},
          {text: '关于我们', url: ''}
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
    margin-top: 40px;
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
  .right{
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
</style>