<template>
  <div class="login">
    <input class="username" placeholder="请输入用户名" type="text" v-model="username"/>
    <input class="password" placeholder="请输入密码" type="password" v-model="password"/>
    <input class="text" type="text" v-model="gotoUrl" />
    <text>{{bundleUrl}}</text>
    <text>{{baseUrl}}</text>
    <text>{{gotoUrl}}</text>
    <button class="btn" @click="login">登陆</button>
  </div>
</template>

<script>
  import {getBaseUrl, jump} from './common/util.js'
  import {iconfont} from './common/config.js'

  const navigator = weex.requireModule('navigator')
  const event = weex.requireModule('event')

  export default {
    data: {
      bundleUrl: weex.config.bundleUrl,
      baseUrl: getBaseUrl(),
      username: '',
      password: '',
      gotoUrl: 'home.js'
    },
    methods: {
      login () {
        jump(this.gotoUrl)
      }
    }
  }
</script>

<style scoped>
  .login{
    width: 750px;
    justify-content: center;
    align-items: center;
    padding-top: 300px;
  }
  .username,
  .password,
  .text{
    width: 600px;
    height: 60px;
    line-height: 60px;
    border-width: 1px;
    margin-bottom: 20px; 
  }
  .password{
    margin-bottom: 300px;
  }
  .btn{
    width: 300px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background: #abcdef;
    color: #fff;
    font-size: 30px;
    margin-top: 50px;
  }
</style>
