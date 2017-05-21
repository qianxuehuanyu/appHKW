<template>
  <div>
    <!-- 内容 -->
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="works">
        <div class="work" v-for="work in worksData">
          <img :src="work.pic" class="pic"/>
          <text class="title">{{work.title}}</text>
          <text class="author">{{work.author}}</text>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <!-- 顶部 -->
    <div class="works-header">
      <img :src="picRoot+'left.png'" class="back" @click="goBack"/>
      <div class="select-type" @click="selectType">
        <text>最新作品</text>
        <img :src="picRoot+'down.png'" style="width: 40px; height: 40px;margin-top:10px;"/>
      </div>
    </div>
    <!-- 导航 -->
    <div class="works-tabs">
      <div class="ul">
        <div class="container" ref="tabs">
          <template v-for="(tab,index) in linkItems">
            <div class="li" @click="selectTab(index)" v-if="index === curTab" style="border-bottom-width:5px;border-bottom-color:red;">
              <text class="tab-text">{{tab.title}}</text>
            </div>
            <div class="li" @click="selectTab(index)" v-else>
              <text class="tab-text">{{tab.title}}</text>
            </div>
          </template>
        </div>
      </div>
      <div class="more" @click="toggleTab">
        <img :src="picRoot+'down.png'" class="more-btn" ref="more"/>
      </div>
    </div>
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
        linkItems: [
          {title: '全部', type: 0},
          {title: '平面', type: 1},
          {title: 'GUI', type: 2},
          {title: '网页', type: 3},
          {title: '服装', type: 4},
          {title: '空间', type: 5},
          {title: '空间2', type: 6},
          {title: '空间3', type: 7},
          {title: '空间4', type: 8}
        ],
        showMore: false,
        curTab: 0,
        curType: 0,
        worksData: []
      }
    },
    methods: {
      goBack () {
        navigator.pop()
      },
      selectType () {

      },
      toggleTab () {
        const tabs = this.$refs.tabs
        const more = this.$refs.more
        this.showMore = !this.showMore
        let that = this
        animation.transition(tabs, {
          styles: {
            transform: !this.showMore?'translate(0,0)':'translate(-650px,0)'
          },
          duration: 500,
          timingFunction: 'ease',
          delay: 0
        }, function () {
          animation.transition(more, {
            styles: {
              transform: !that.showMore?'rotate(0)':'rotate(180deg)'
            },
            duration: 200,
            timingFunction: 'ease',
            delay: 0
          })
        })
      },
      selectTab (index) {
        this.curTab = index
        this.curType = this.linkItems[index].type
        this.onrefresh()
      },
      fetchData () {
        return getData('getWorksList', {
          id: 1, page: 1, perpage: 10, type: this.curType
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.worksData = []
          this.worksData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((work) => {
            this.worksData.push(work)
          })
          this.showloading = 'hide'
        })
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
  /* 顶部 */
  .works-header{
    position: fixed;
    top: 0;
    left: 0;
    height: 80px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
  }
  .back{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 10px;
  }
  .select-type{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /* 导航 */
  .works-tabs{
    position: fixed;
    width: 750px;
    height: 80px;
    top: 80px;
    left: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background-color: #fff;
  }
  .ul{
    width: 650px;
    height: 80px;
    overflow: hidden;
  }
  .container{
    height: 80px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .li{
    height: 80px;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .more{
    width: 100px;
    height: 80px;
    justify-content: center;
    align-items: center;
  }
  .more-btn{
    width: 50px;
    height: 50px;
  }
  .tab-text{
    font-size: 30px;
  }
  /* 内容 */
  .main{
    position: fixed;
    top: 160px;
    left: 0;
    bottom: 0;
    width: 750px;
    background-color: #eee;
  }
  .works{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .work{
    width: 350px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .pic{
    width: 350px;
    height: 500px;
  }
  .title{
    padding-top: 10px;
    padding-left: 10px;
    font-size: 25px;
    background-color: #fff;
  }
  .author{
    padding-left: 10px;
    padding-bottom: 10px;
    font-size: 25px;
    background-color: #fff;
  }
</style>