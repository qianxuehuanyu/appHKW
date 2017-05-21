<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="activities">
        <div class="activity" v-for="activity in activitiesData">
          <div class="pic">
            <img :src="activity.pic" class="pic-img" />
          </div>
          <div class="content">
            <div class="title">
              <text class="title-text">{{activity.title}}</text>
            </div>
            <div class="host">
              <text class="host-text">{{activity.host}}</text>
            </div>
            <div class="info">
              <div class="date">
                <img :src="picRoot+'clock.png'" class="date-img" />
                <text class="date-text">{{activity.date.slice(0,10)}}</text>
              </div>
              <div class="location">
                <img :src="picRoot+'location.png'" class="location-img" />
                <text class="location-text">{{activity.location}}</text>
              </div>
              <div class="num">
                <text class="num-text">{{activity.num}}人报名</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="活动"></sub-header>
    <!-- 导航 -->
    <div class="tabs">
      <div class="ul">
        <template v-for="(tab,index) in tabItems">
          <div class="li" @click="selectTab(index)" v-if="index === curTab" style="background-color: #419ad6;">
            <text class="tab-text" style="color: #fff;">{{tab.title}}</text>
          </div>
          <div class="li" @click="selectTab(index)" v-else>
            <text class="tab-text" style="color: #419ad6;">{{tab.title}}</text>
          </div>
        </template>
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
        tabItems: [
          {title: '全部', type: 0},
          {title: '进行中', type: 1},
          {title: '已完成', type: 2}
        ],
        curTab: 0,
        curType: 0,
        activitiesData: []
      }
    },
    methods: {
      selectTab (index) {
        this.curTab = index
        this.curType = this.tabItems[index].type
        this.onrefresh()
      },
      fetchData () {
        return getData('getActivitiesList', {
          id: 1, page: 1, perpage: 10, type: this.curType
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.activitiesData = []
          this.activitiesData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((activity) => {
            this.activitiesData.push(activity)
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
  /* 导航 */
  .tabs{
    position: fixed;
    width: 750px;
    height: 60px;
    top: 80px;
    left: 0;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
  }
  .ul{
    flex-direction: row;
    border-radius: 10px;
    overflow: hidden;
    border-width: 1px;
    border-color: #419ad6;
  }
  .li{
    width: 200px;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-left-width: 1px;
    border-right-width: 1px;
    border-left-color: #419ad6;
    border-right-color: #419ad6;
  }
  .tab-text{
    font-size: 22px;
  }
  /* 内容 */
  .main{
    position: fixed;
    top: 140px;
    left: 0;
    bottom: 0;
    width: 750px;
    background-color: #fff;
  }
  .activities{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .activity{
    flex-direction: row;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .pic{
    padding-right: 20px;
  }
  .pic-img{
    width: 190px;
    height: 145px;
  }
  .content{
    flex: 1;
  }
  .title-text{
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .host-text{
    font-size: 22px;
    color: grey;
    padding-bottom: 20px;
  }
  .info{
    flex-direction: row;
    justify-content: space-between;
  }
  .date{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .date-text{
    font-size: 20px;
    color: grey;
  }
  .date-img{
    width: 20px;
    height: 20px;
  }
  .location{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .location-text{
    font-size: 22px;
    color: grey;
  }
  .location-img{
    width: 20px;
    height: 20px;
  }
  .num-text{
    font-size: 22px;
    color: grey;
  }
</style>