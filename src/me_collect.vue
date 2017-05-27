<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 收藏列表 -->
      <div class="collects">
        <div class="collect" v-for="(collect,index) in collectsData">
          <div class="collect-header">
            <div class="header-left">
              <img :src="collect.avatar" class="avatar" />
              <text class="name">{{collect.name}}</text>
            </div>
            <div class="header-right">
              <text class="date">{{formTime(collect.date)}}</text>
              <img :src="picRoot+'minus.png'" class="del" @click="delCollect(collect.collectid, index)"/>
            </div>
          </div>
          <div class="collect-main">
            <img :src="collect.pic" class="pic" />
            <text class="title" v-if="collect.title">{{collect.title}}</text>
            <text class="desc">{{collect.desc}}</text>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="我的收藏"></sub-header>
    <tab :tabItems="tabItems" :tabIndex="tabIndex" color="red" @select="setTab" class="tab"></tab>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import tab from './components/tab.vue'

  import {getBaseUrl, jump, passtime} from './common/util.js'
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
        tabItems: ['全部','设计师','需求','文章','作品','帖子'],
        tabIndex: 0,
        collectsData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getMyCollectsList', {
          id: 1, page: 1, perpage: 5, type: this.tabIndex
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.collectsData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((collect) => {
            this.collectsData.push(collect)
          })
          this.showloading = 'hide'
        })
      },
      setTab (index) {
        this.tabIndex = index
        this.onrefresh()
      },
      delCollect (collectid, index) {
        // 提交服务器
        // 本地删除
        this.collectsData.splice(index, 1)
        if (this.collectsData.length < 5) {
          this.onloading()
        }
      },
      formTime (time) {
        return passtime(time)
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader, tab
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    width: 750px;
    top: 200px;
    left: 0;
    bottom: 0;
    background-color: #f2f2f2;
  }
  .tab{
    position: fixed;
    top: 100px;
    height: 100px;
    width: 750px;
    left: 0;
  }
  /* 收藏列表 */
  .collects{

  }
  .collect{
    margin-top: 10px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .collect-header{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
  }
  .header-left, .header-right{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .collect-main{
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 180px;
    position: relative;
    height: 140px;
    overflow: hidden;
  }
  .main-right{
    flex-direction: column;
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #ccc;
    margin-right: 10px;
  }
  .del{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: #ccc;
    margin-left: 10px;
  }
  .pic{
    width: 160px;
    height: 140px;
    background-color: #ccc;
    position: absolute;
    left: 0;
  }
  .title{
    color: red;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>