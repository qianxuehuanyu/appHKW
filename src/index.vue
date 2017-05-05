<template>
  <div class="login">
    <input class="username" placeholder="请输入用户名" type="text" v-model="username"/>
    <input class="password" placeholder="请输入密码" type="password" v-model="password"/>
    <button class="btn" @click="login">登陆</button>
  </div>
</template>

<script>
  var getBaseURL = require('./common/util.js').getBaseURL
  var event = weex.requireModule('event')

  module.exports = {
    data: {
      username: '',
      password: ''
    },
    methods: {
      login () {
        var base = getBaseURL(weex)
        event.openURL(base+'views/Home.js')
      }
    }
  }
</script>

<style scope>
  .login{
    margin-top: 200px;
    justify-content: center;
    align-items: center;
  }
  .username,
  .password{
    width: 80%;
    border-width: 1px;
    margin-bottom: 20px;

  }
  .btn{
    width: 200px;
    height: 50px;
    text-align: center;
    background: #abcdef;
    color: #fff;
    font-size: 30px;
    margin-top: 50px;
  }
</style>
