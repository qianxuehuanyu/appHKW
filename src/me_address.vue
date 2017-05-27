<template>
  <div>
    <scroller class="main">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="addresses">
        <div class="address" v-for="(address, index) in addressData">
          <div class="address-main">
            <text class="address-title">{{address.title}}</text>
            <text class="address-address">{{address.address}}</text>
          </div>
          <div class="address-footer">
            <text class="address-edit" @click="editAddress(address.addressid, index)">编辑</text>
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="我的常用地址">
      <text class="add-address" @click="addAddress">添加地址</text>
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
        addressData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getAddressList', {
          id: 1
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.addressData = res.data
          this.refreshing = 'hide'
        })
      },
      addAddress () {
        jump('me_add-address.js')
      },
      editAddress (addressid, index) {
        storage.setItem('editAddress', JSON.stringify(this.addressData[index]), e => {
          jump('me_add-address.js')
        })
      }
    },
    mounted () {
      storage.removeItem('editAddress')
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
    top: 100px;
    left: 0;
    bottom: 0;
    background-color: #f2f2f2;
  }
  .addresses{
    
  }
  .address{
    width: 750px;
    background-color: #fff;
    margin-bottom: 20px;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }
  .address-main{
    justify-content: center;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .address-footer{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: center;
    align-items: flex-end;
  }
  .address-title{
    font-size: 25px;
    font-weight: bold;
    padding-bottom: 20px;
    
  }
  .address-address{
    font-size: 25px;

  }
  .address-edit{
    font-size: 25px;
  }
  .add-address{
    font-size: 25px;
    margin-top: 15px;
    margin-right: 20px;
  }
</style>