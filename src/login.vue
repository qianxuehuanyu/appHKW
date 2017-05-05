<template>
  <div class="login">
    <input class="username" placeholder="请输入用户名" type="text" v-model="username"/>
    <input class="password" placeholder="请输入密码" type="password" v-model="password"/>
    <button class="btn" @click="login">登陆</button>
  </div>
</template>

<script>
  import {setBundleUrl} from './common/util.js'
  const navigator = weex.requireModule('navigator')

  export default {
    data: {
      username: '',
      password: ''
    },
    methods: {
      login () {
        const baseurl = this.$getConfig().bundleUrl
        navigator.push({
          url: setBundleUrl(baseurl, 'Home.js')
        })
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
