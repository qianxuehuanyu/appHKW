<template>
  <div>
    <scroller class="main">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="customers">
        <div class="customer" v-for="customer in customersData">
          <img :src="customer.avatar" class="avatar" />
          <text class="name">{{customer.name}}</text>
          <text class="tel">{{customer.tel}}</text>
        </div>
      </div>
    </scroller>
    <sub-header title="我的客户">
      <text class="add-customer" @click="addCustomer">添加客户</text>
    </sub-header>
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
        customersData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getCustomerList', {
          id: 1
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.customersData = []
          this.customersData = res.data
          this.refreshing = 'hide'
        })
      },
      addCustomer () {
        jump('me_add-customer.js')
      }
    },
    mounted () {
      this.onrefresh()
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
  }
  .add-customer{
    font-size: 25px;
    padding-top: 15px;
    padding-right: 20px;
  }
  /* 客户 */
  .customers{
    padding-left: 20px;
    padding-right: 20px;
  }
  .customer{
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 2px;
    border-bottom-color: #eee;
  }
  .avatar{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin-right: 40px;
  }
  .name{
    font-size: 25px;
    width: 180px;
  }
  .tel{
    font-size: 25px;
  }
</style>