<template>
  <div class="login">
    <input class="username" placeholder="请输入用户名" type="text" v-model="username"/>
    <input class="password" placeholder="请输入密码" type="password" v-model="password"/>
    <div class="btn" @click="login">
      <text class="btn-text">登陆</text>
    </div>
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
    
  }
  .btn{
    margin-top: 400px;
    width: 500px;
    height: 100px;
    background-color: #3e9bd7;
    justify-content: center;
    align-items: center;
  }
  .btn-text{
    font-size: 30px;
    color: #fff;
  }
</style>
