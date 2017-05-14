<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="designer">
        <!-- 设计师面板 -->
        <div class="designer-top">
          <img :src="picRoot+'left.png'" class="left-btn" />
          <img :src="picRoot+'more.png'" class="right-btn" />
          <img :src="designerData.avatar" class="avatar" style="width: 100px; height: 100px;"/>
          <img :src="picRoot+'male.png'" class="sex" v-if="designerData.sex === 0"/>
          <img :src="picRoot+'female.png'" class="sex" v-if="designerData.sex === 1"/>
          <text class="name">{{designerData.name}}</text>
          <text class="motto">"{{designerData.motto}}"</text>
          <div class="location">
            <img :src="picRoot+'location.png'" class="location-icon" />
            <text class="location-text">&nbsp;{{designerData.location}}</text>
          </div>
        </div>
        <!-- 数据列表 -->
        <div class="nums">
          <div class="num" >
            <text class="num-num" v-if="designerData.works">{{designerData.works.length}}</text>
            <text class="num-title">作品</text>
          </div>
          <div class="num" >
            <text class="num-num" v-if="designerData.likes">{{designerData.likes}}</text>
            <text class="num-title">喜欢</text>
          </div>
          <div class="num" >
            <text class="num-num" v-if="designerData.requires">{{designerData.requires}}</text>
            <text class="num-title">收获需求</text>
          </div>
          <div class="num" >
            <text class="num-num" v-if="designerData.feedbackRate">{{designerData.feedbackRate}}</text>
            <text class="num-title">反馈率</text>
          </div>
        </div>
        <!-- 画客信息 -->
        <div class="info-title">
          <text class="info-title-text" >&emsp;画客信息&emsp;</text>
        </div>
        <div class="infos">
          <text class="info" v-for="info in designerData.infos">{{info}}</text>
        </div>
        <!-- 折叠按钮 -->
        <div class="slide-btn">
          <img :src="picRoot+'up.png'"  style="width: 40px; height: 40px;"/>
        </div>
      </div>
      <!-- tab切换 -->
      <tab :tabItems="tabItems" :tabIndex="tabIndex" @select="setSelectTab"></tab>
      <div class="tab-contents">
        <!-- 作品 -->
        <div v-if="tabIndex === 0">
          <!-- 作品轮播 -->
          <div class="works">
            <slider class="slider" interval="3000" auto-play="false">
              <div class="sliderFrame" v-for="item in formedWorks">
                <img class="sliderImg" resize="cover" :src="item[0].src" /> 
                <img class="sliderImg" resize="cover" :src="item[1].src" /> 
                <img class="sliderImg" resize="cover" :src="item[2].src" /> 
                <img class="sliderImg" resize="cover" :src="item[3].src" /> 
              </div>
            </slider>
          </div>
          <!-- 留言 -->
          <div class="say-title">
            <text class="say-title-text">留言({{designerData.totalSaysNum}})</text>
          </div>
          <div class="say">
            <img :src="designerData.avatar" class="say-avatar" />
            <input class="say-input" type="text" v-model="say" placeholder="既然来了，就表个态呗！" />
          </div>
          <moment-list :listdata="designerData.says" type="designer" v-if="designerData.says"></moment-list>
          <!-- loading -->
          <loading :display="showloading" style="justify-content:center;align-items:center;">
            <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
          </loading>
        </div>
        <!-- 服务 -->
        <div v-if="tabIndex === 1">
          <div v-for="service in designerData.services">
            <text>{{service.title}}</text>
            <text>{{service.desc}}</text>
            <text>{{service.price}}</text>
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="设计师主页"></sub-header>
    <div class="nav">
      <text>电话</text>
    </div>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import momentList from './components/moment-list.vue'
  import tab from './components/tab.vue'

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
        designerData: {says: []},
        tabItems: ['作品', '服务'],
        tabIndex: 0,
        say: ''
      }
    },
    computed: {
      formedWorks () {
        let works = this.designerData.works
        let arr = []
        let item = []
        for (let i in works) {
          item.push(works[i])
          if (item.length === 4 || i === works.length - 1) {
            arr.push(item)
            item = []
          }
        }
        return arr
      }
    },
    methods: {
      setSelectTab (index) {
        this.tabIndex = index
      },
      fetchData () {
        return getData('getDesigner', {
          id: 1, page: 1, perpage: 10
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          this.designerData = {}
          this.designerData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          res.data.says.forEach((say) => {
            this.designerData.says.push(say)
          })
          this.showloading = 'hide'
        })
      },
      formData (data) {
        data.says.forEach((item) => {
          item.foldComment = true
          item.ilike = item.likes.some((name) => {
            return name === item.name
          })
        })
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader, momentList, tab
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 0;
    bottom: 100px;
    left: 0;
    width: 750px;
  }
  .designer{
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    padding-top: 20px;
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .avatar{
    border-radius: 50%;
  }
  /* 设计师信息面板 */
  .designer-top{
    justify-content: center;
    align-items: center;
  }
  .left-btn{
    width: 40px; height: 40px;position: absolute;top:10px;left:0;
  }
  .right-btn{
    width: 40px; height: 40px;position: absolute;top:10px;right:0;border-radius: 50%;border-width: 1px;border-color: grey;
  }
  .sex{
    width: 30px; height: 30px; position: absolute; top: 65px; left: 375px;
  }
  .name{
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .motto{
    font-size: 22px; color: grey;
    width: 400px;
    justify-content: center;
    align-items: center;
  }
  .location{flex-direction: row;padding-top: 10px;}
  .location-icon{
    width: 25px;height: 25px;
  }
  .location-text{
    color: grey;
    font-size: 22px;
  }
  /* 数据 */
  .nums{
    flex-direction: row;
  }
  .num{
    flex: 1; justify-content: center; align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .num-num{font-size: 35px;}
  .num-title{font-size: 18px;color: grey;}
  /* 画客信息 */
  .info-title{
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    border-bottom-style: dashed ;
    margin-bottom: 40px;
  }
  .info-title-text{
    font-size: 25px; color: grey;
    transform: translate(0, 18px);
    background-color: #fff;
  }
  .info{
    color: grey;
    font-size: 22px;
  }
  /* 展开-收起按钮 */
  .slide-btn{
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  /* 作品 */
  .works{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .slider{
    width: 750px;
    height: 400px;

  }
  .sliderFrame{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: space-around;
    width: 730px;
    height: 400px;
  }
  .sliderImg{
    width: 330px;
    height: 180px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  /* 留言 */
  .say-title{
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-bottom-color: grey;
    border-top-color: grey;
    background-color: #f5f5f5;
    height: 80px;
  }
  .say-title-text{
    font-size: 22px;
    color: grey;
  }
  /* 底部导航 */
  .nav{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 100px;
    background: #ccc;
  }
  .say{
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
  }
  .say-avatar{
    border-radius: 50%;
    width: 60px; height: 60px;
  }
  .say-input{
    width: 650px;
    height: 60px;
    border-width: 1px;
    border-radius: 30px;
    margin-left: 20px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 22px;
  }
</style>
