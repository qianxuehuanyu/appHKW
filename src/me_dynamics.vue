<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="posts" v-if="tabIndex === 0" key="tab0">
        <div class="post" v-for="(post,index) in data[0]">
          <div class="post-left" >
            <text class="post-left-text">{{new Date(post.date).getDate()}}</text>
            <text class="post-left-text">{{month[new Date(post.date).getMonth()]}}</text>
            <text class="post-left-text">{{post.tag}}</text>
          </div>
          <div class="post-right">
            <div class="post-header">
              <text class="post-content-text">{{post.content}}</text>
            </div>
            <div class="post-pics">
              <img :src="pic" class="post-pic" v-for="pic in post.pics.slice(0,3)"/>
            </div>
            <div class="post-footer">
              <div class="post-footer-left">
                <div class="post-show" v-if="!showDynastics" @click="showPost(post.postid,index)">
                  <img :src="picRoot+'show.png'" class="post-show-img" />
                  <text class="post-sm-text">显示</text>
                </div>
                <div class="post-hide" v-if="showDynastics" @click="hidePost(post.postid,index)">
                  <img :src="picRoot+'hide.png'" class="post-hide-img" />
                  <text class="post-sm-text">隐藏</text>
                </div>
                <div class="post-del" @click="delPost(post.postid,index)">
                  <img :src="picRoot+'delete.png'" class="post-del-img" />
                  <text class="post-sm-text">删除</text>
                </div>
              </div>
              <div class="post-footer-right">
                <div class="post-like">
                  <img :src="picRoot+'heart.png'" class="post-like-img" />
                  <text class="post-sm-text">0</text>
                </div>
                <div class="post-msg">
                  <img :src="picRoot+'message.png'" class="post-msg-img" />
                  <text class="post-sm-text">0</text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="requires" v-if="tabIndex === 1" key="tab1">
        <div class="require" v-for="(require, index) in data[1]">
          <div class="require-header">
            <div class="require-header-left">
              <text class="require-title">{{require.title}}</text>
              <text class="require-subtitle">{{require.subtitle}}</text>
            </div>
            <div class="require-header-right">
              <text class="require-price1">预算价格：</text>
              <text class="require-price2">{{require.price}}元</text>
            </div>
          </div>
          <div class="require-main">
            <text class="require-content">{{require.content}}</text>
          </div>
          <div class="require-btns">
            <div class="require-edit" @click="editRequire(require.requireid, index)"><text class="require-edit-text">编辑</text></div>
            <div class="require-del" @click="delRequire(require.requireid, index)"><text class="require-del-text">删除</text></div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="我的动态">
      <img :src="picRoot+'show.png'" class="show" v-if="showDynastics" @click="toggleShowAll"/>
      <img :src="picRoot+'hide.png'" class="show" v-if="!showDynastics" @click="toggleShowAll"/>
    </sub-header>
    <tab :tabItems="tabItems" :tabIndex="tabIndex" @select="setTab" class="tab"></tab>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import tab from './components/tab.vue'

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
        showDynastics: true,
        tabItems: ['帖子', '需求'],
        tabIndex: 1,
        data: [null, null],
        api: ['getMyPostsList', 'getMyRequiresList'],
        month: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }
    },
    methods: {
      fetchData () {
        return getData(this.api[this.tabIndex], {
          id: 1, page: 1, perpage: 5, show: this.showDynastics
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.data[this.tabIndex] = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((item) => {
            this.data[this.tabIndex].push(item)
          })
          this.showloading = 'hide'
        })
      },
      toggleShowAll () {
        this.showDynastics = !this.showDynastics
        this.onrefresh()
      },
      setTab (index) {
        this.tabIndex = index
        if (!this.data[index]) this.onrefresh()
      },
      showPost (postid, index) {
        // 提交服务器
        // 本地删除
        this.data[0].splice(index, 1)
        this.$set(this.data, 0, this.data[0])
        if (this.data[0].length < 5) {
          this.onloading()
        }
      },
      hidePost (postid, index) {
        // 提交服务器
        // 本地删除
        this.data[0].splice(index, 1)
        this.$set(this.data, 0, this.data[0])
        if (this.data[0].length < 5) {
          this.onloading()
        }
      },
      delPost (postid, index) {
        // 提交服务器
        // 本地删除
        this.data[0].splice(index, 1)
        this.$set(this.data, 0, this.data[0])
        if (this.data[0].length < 5) {
          this.onloading()
        }
      },
      editRequire (requireid, index) {

      },
      delRequire (requireid, index) {
        // 提交服务器
        // 本地删除
        this.data[1].splice(index, 1)
        this.$set(this.data, 1, this.data[1])
        if (this.data[1].length < 5) {
          this.onloading()
        }
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
  .show{
    width: 50px;
    height: 50px;
    margin-top: 5px;
    margin-right: 10px;
  }
  .tab{
    position: fixed;
    top: 100px;
    left: 0;
    width: 750px;
    height: 100px;
  }
  /* 帖子 */
  .posts{}
  .post{
    width: 750px;
    margin-bottom: 2px;
    flex-direction: row;
    background-color: #fff;
  }
  .post-left{
    width: 100px;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
  }
  .post-right{
    flex: 1;
  }
  .post-header{
    padding-top: 10px;
  }
  .post-pics{
    flex-direction: row;
    height: 220px;
  }
  .post-pic{
    width: 180px;
    height: 180px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 40px;
  }
  .post-footer{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .post-footer-left{
    flex-direction: row;
  }
  .post-show{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .post-show-img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .post-hide{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .post-hide-img{
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .post-del{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  .post-del-img{
    width: 25px;
    height: 25px;  
    margin-right: 10px; 
  }
  .post-footer-right{
    flex-direction: row;
  }
  .post-like{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .post-like-img{
    width: 25px;
    height: 25px;
    margin-right: 10px;      
  }
  .post-msg{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
  .post-msg-img{
    width: 25px;
    height: 25px; 
    margin-right: 10px;
  }
  .post-left-text{
    font-size: 25px;
    margin-bottom: 20px;
  }
  .post-content-text{
    font-size: 25px;
  }
  .post-sm-text{
    font-size: 25px;
    color: grey;
  }
  /* 需求 */
  .requires{}
  .require{
    background-color: #fff;
    margin-bottom: 10px;
    width: 750px;
  }
  .require-header{
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .require-header-left{
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
  }
  .require-header-right{
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
  }
  .require-main{
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .require-btns{
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .require-title{
    font-weight: bold;
    font-size: 30px;
    padding-right: 10px;
  }
  .require-subtitle{
    color: grey;
    font-size: 22px;
  }
  .require-price1{
    font-size: 22px;
    color: grey;
  }
  .require-price2{
    font-size: 22px;
    color: red;
  }
  .require-content{
    font-size: 25px;
  }
  .require-edit{
    border-width: 1px;
    border-radius: 12px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 40px;
    padding-right: 40px;
    margin-left: 40px;
  }
  .require-edit-text{
    font-size: 22px;
  }
  .require-del{
    border-width: 1px;
    border-radius: 12px;
    border-color: red;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 40px;
    padding-right: 40px;
    margin-left: 40px;
  }
  .require-del-text{
    font-size: 22px;
    color: red;
  }
</style>