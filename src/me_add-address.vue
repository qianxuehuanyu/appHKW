<template>
  <div>
    <scroller class="main">
      <div class="content">
        <div class="title">
          <text class="title-text">名称：</text>
          <input class="title-input" type="text" placeholder="家，公司，..." />
        </div>
        <div class="address">
          <text class="address-text">详细地址：</text>
          <textarea class="address-input" placeholder="请输入详细地址" ></textarea>
        </div>
      </div>
    </scroller>
    <sub-header title="添加地址"><text @click="save" class="save">保存</text></sub-header>
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
        address: {
          title: '',
          address: '',
          addressid: ''
        }
      }
    },
    methods: {
      save () {
        // 判断addressid
        // 提交服务器
      }
    },
    mounted () {
      storage.getItem('editAddress', e => {
        console.log(e)
        if (e.result === 'success') {
          this.address = JSON.parse(e.data)
          console.log(this.address)
        }
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
  .title{
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    padding-bottom: 20px;
  }
  .title-text{
    font-size: 30px;
    font-weight: bold;
  }
  .title-input{
    flex: 1;
    font-size: 25px;
  }
  .address{
    padding-top: 20px;
  }
  .address-text{
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .address-input{
    font-size: 25px;
    height: 400px;
  }
</style>