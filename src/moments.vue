<template>
  <div>
    <div class="header">
      <text>画客圈</text>
    </div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- 轮播图 -->
      <div style="width: 750px;">
        <slider class="slider" interval="3000" auto-play="true">
          <div class="sliderFrame" v-for="img in sliderList">
            <img class="sliderImg" resize="cover" :src="img" /> 
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </div>
      <!-- tab： 项目、帖子、作品、活动 -->
      <div style="width: 750px;">
        <link-tab class="nav" :items="linkList" itemWidth="80px" radius="30px" :showNum="true"></link-tab>
      </div>
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 画客圈数据 -->
      <moment-list :listdata="momentsData" type="moment"></moment-list>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <mainTab :selectedIndex="1"></mainTab>
  </div>
</template>

<script>
  import linkTab from './components/link-tab.vue'
  import mainTab from './components/main-tab.vue'
  import momentList from './components/moment-list.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        refreshing: 'hide',
        showloading: 'hide',
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        sliderList: [
          'http://pic2.ooopic.com/13/58/87/63bOOOPICb3_1024.jpg',
          'http://pic.58pic.com/58pic/13/56/99/88f58PICuBh_1024.jpg',
          'http://img.zcool.cn/community/01919f5754de1d32f875a429805139.jpg@900w_1l_2o_100sh.jpg'
        ],
        linkList: [
          {
            name: '项目',
            src: config.picRoot + 'xiangmu.png',
            num: '45',
            width: '45px',
            bgColor: '#f4c021',
            url: 'moments_requires.js'
          },
          {
            name: '贴子',
            src: config.picRoot + 'tiezi.png',
            num: '123',
            width: '45px',
            bgColor: '#3dc077',
            url: 'moments_posts.js'
          },
          {
            name: '作品',
            src: config.picRoot + 'zuopin.png',
            num: '56',
            width: '45px',
            bgColor: '#409ad6',
            url: 'moments_works.js'
          },
          {
            name: '活动',
            src: config.picRoot + 'huodong.png',
            num: '11',
            width: '45px',
            bgColor: '#31408f',
            url: 'moments_activities.js'
          }
        ],
        momentsData: []
      }
    },
    computed: {
      
    },
    methods: {
      fetchData () {
        return getData('getMomentsList', {
          id: 1, page: 1, perpage: 5
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          this.momentsData = []
          this.momentsData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          res.data.forEach((moment) => {
            this.momentsData.push(moment)
          })
          this.showloading = 'hide'
        })
      },
      formData (data) {
        data.forEach((item) => {
          item.foldComment = true
          item.ilike = item.likes.some((name) => {
            return name === item.name
          })
        })
      },
      goToDesigner (designerid) {
        jump ('designer.js?id=' + designerid)
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      linkTab, mainTab, momentList
    }
  }
</script>

<style scoped>
  /* 头部标题 */
  .header{
    position: fixed;
    height: 100px;
    width: 750px;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #000;
    background-color: #f9f9f9;
  }

  .main{
    position: fixed;
    top: 100px;
    bottom: 100px;
    left: 0;
    width: 750px;
  }
  /* slider */
  .slider{
    width: 750px;
    height: 160px;
    justify-content: center;
    align-items: center;
  }
  .sliderFrame{
    position: relative;
    width: 750px;
    height: 160px;
  }
  .sliderImg{
    width: 750px;
    height: 160px;
  }
  .indicator{
    item-color: grey;
    item-selected-color: white;
    item-size: 20px;
    padding-top: 40px;
  }
  /* nav */
  .nav{
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 10px;
    border-bottom-color: #eee;
  }
  /* 内容 */
  .content{
  }
  .person{
    
  }
</style>
