<template>
  <div>
    <scroller class="main">
      <div class="content">
        <div class="title">
          <text class="text">服务名称</text>
          <input type="text" v-model="service.title" class="input" />
        </div>
        <textarea placeholder="详细描述一下您的服务吧" class="desc" v-model="service.desc"></textarea>
      </div>
      <div class="price">
        <text class="text">服务单价</text>
        <input type="text" v-model="service.price" class="input" />
        <text class="text">元 /</text>
        <input type="text" v-model="service.unit" class="input" />
      </div>
    </scroller>
    <sub-header title="添加服务">
      <text class="saveBtn" @click="saveService">保存</text>
    </sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        index: '',
        service: {
          title: '',
          desc: '',
          price: '',
          unit: '',
          checked: false,
          num: 1
        }
      }
    },
    methods: {
      getData () {
        storage.getItem('addService', (e) => {
          if (e.result === 'failed') return false
          let data = JSON.parse(e.data)
          this.index = data.index
          this.service = data.service
          storage.removeItem('addService')
        })
      },
      saveService () {
        // 提交服务器
      }
    },
    mounted () {
      this.getData()
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 750px;
  }
  .content{
    border-bottom-width: 20px;
    border-bottom-color: #f2f2f2;
  }
  .title{
    justify-content: space-between;
  }
  .title, .price{
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 2px;
    border-bottom-color: #f2f2f2;
  }
  .desc{
    height: 300px;
    font-size: 25px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .price{
    justify-content: flex-start;
  }
  .input{
    font-size: 25px;
    flex: 1;
    text-align: center;
  }
  .text{
    font-size: 25px;
  }
  .saveBtn{
    font-size: 30px;
    padding-top: 10px;
    padding-right: 20px;
  }
</style>