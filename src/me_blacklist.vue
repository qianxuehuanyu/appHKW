<template>
  <div>
    <scroller class="main">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="blacklist">
        <div class="black" v-for="(black, index) in blackListData">
          <div class="avatar">
            <img :src="black.avatar" class="avatar-img" />
          </div>
          <div class="container">
            <div class="black-main">
              <text class="black-name">{{black.name}}</text>
              <text class="black-num">{{black.job}} | {{black.exp}}年 | {{black.works}}件作品</text>
            </div>
            <div class="del" @click="delBlack(black.designerid, index)">
              <img :src="picRoot+'minus.png'" class="del-img" />
            </div>
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="黑名单"></sub-header>
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
        blackListData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getBlackList', {
          id: 1
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.blackListData = res.data
          this.refreshing = 'hide'
        })
      },
      delBlack (designerid, index) {
        // 发送服务器
        // 删除成功，本地删除
        this.blackListData.splice(index, 1)  
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
    top: 100px;
    left: 0;
    bottom: 0;
  }
  .blacklist{

  }
  .black{
    flex-direction: row;
    background-color: #fff;
  }
  .avatar{
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .avatar-img{
    width: 90px;
    height: 90px;
    border-radius: 45px;
  }
  .container{
    border-bottom-width: 1px;
    border-bottom-color: grey;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    flex: 1;
  }
  .black-main{
  }
  .black-name{
    font-size: 30px;
    font-weight: bold;
  }
  .black-num{
    font-size: 25px;
    color: grey;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .del{
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #ededed;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .del-img{
    width: 30px;
    height: 30px;
  }
</style>