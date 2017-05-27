<template>
  <div>
    <scroller class="main">
      <div class="content">
        <div class="header">
          <img src="" class="avatar" />
          <text class="li-title">姓名</text>
          <input type="text" class="input" v-model="name"/>
        </div>
        <div class="ul">
          <div class="li">
            <text class="li-title">电话</text>
            <input type="text" class="input" v-model="tel"/>
          </div>
          <div class="li">
            <text class="li-title">邮箱</text>
            <input type="text" class="input" v-model="email"/>
          </div>
          <div class="li">
            <text class="li-title">公司</text>
            <input type="text" class="input" v-model="corp"/>
          </div>
          <div class="li">
            <text class="li-title">备注</text>
            <input type="text" class="input" v-model="remark"/>
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="添加客户"><text @click="save" class="save">保存</text></sub-header>
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
        refreshing: 'hide',
        showloading: 'hide',
        picRoot: config.picRoot,
        name: '',
        tel: '',
        email: '',
        corp: '',
        remark: ''
      }
    },
    methods: {
      save () {
        // 提交服务器
      }
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
    background-color: #f2f2f2;
  }
  .save{
    font-size: 25px;
    padding-top: 15px;
    padding-right: 20px;
  }
  .content{
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    background-color: #fff;
  }
  .header{
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    padding-bottom: 20px;
    justify-content: flex-start;
    align-items: center;
  }
  .avatar{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border-width: 1px;
    margin-right: 20px;
  }
  .name{
    font-size: 25px;
  }
  .ul{

  }
  .li{
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: flex-start;
    align-items: center;
  }
  .li-title{
    color: grey;
    font-size: 30px;
    padding-right: 20px;
    border-right-width: 1px;
    border-right-color: grey;
  }
  .input{
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 25px;
  }
</style>