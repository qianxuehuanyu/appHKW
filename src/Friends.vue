<template>
  <div>
    <div class="header">
      <text>画客圈</text>
    </div>
    <list class="main">
      <slider class="slider" interval="3000" auto-play="true">
        <div class="sliderFrame" v-for="img in sliderList">
          <img class="sliderImg" resize="cover" :src="img" /> 
        </div>
        <indicator class="indicator"></indicator>
      </slider>  
      <tab class="nav" :items="linkList" itemWidth="80px" radius="30px" :showNum="true"></tab>
      <div class="content">
        <cell v-for="i in 10" class="person">
          <div class="person-info">
            <img class="person-avatar" src="http://www.huakewang.com/uploads/2013/1018/20131018235643643644_thumb.jpg" />
            <div class="info">
              <div style="flex-direction: row;">
                <text class="name">wadeyao&nbsp;</text>
                <text class="icon icon-male" style="color: #88bcde;font-size: 33px;"></text>
              </div>
              <text class="job" style="fontSize: 20px;color: #999;">产品经理 三汇信息</text>  
            </div>
            <div class="person-location">
              <text class="icon icon-location" style="color: #999; font-size: 25px;"></text>
              <text style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;杭州</text>
            </div>
          </div>
          <div class="person-saying">
            <text style="fontSize: 20px;color: #f00;"> [预算：1.5万元] </text>
            <text style="fontSize: 20px;flex-wrap: wrap;color: #777;">找：平面设计师做画册，需要有案例；有个画册设计想外包，求动漫之都一带的童鞋，近一点方便沟通，大家都省时省力，有意向请留言，无相关作品勿扰！谢谢理解！</text>
          </div>
          <div class="photos">
            <div class="photo" v-for="i in 3">
              <img src=""  />
            </div>
          </div>
          <div class="vote-header">
            <text class="grey small">2小时前</text>
            <div class="right-btns">
              <text class="icon icon-heart" style="font-size: 25px; line-height: 20px;"></text>
              <text class="small">4</text>
              <text>&nbsp;</text>
              <text class="icon icon-message" style="font-size: 20px;"></text>
              <text class="small">3</text>
              <div class="shangsanjiao"></div>
            </div>
          </div>
          <div class="like-people">
            <text class="icon icon-heart blue" style="font-size: 25px;">&nbsp;</text>
            <text class="small blue">夏庆峰，PD.HU，袁中伟，韩杰</text>
          </div>
          <div class="msglist">
            <div class="row">
              <text class="small blue">MiaZhang：</text><text class="small">倒了给我打电话哈！</text>
            </div>
            <div class="showMore">
              <text class="small blue center">查看全部9条评论</text>
            </div>
          </div>
        </cell>  
      </div>
    </list>  
    <!-- 导航栏 -->
    <main-tab :selectedIndex="1"></main-tab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'
  import tab from './components/tab.vue'
  import {setBundleUrl} from './common/util.js'
  import {iconfont} from './common/config.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        sliderList: [
          'dist/' + require('./img/slider1.png'),
          'dist/' + require('./img/slider1.png'),
          'dist/' + require('./img/slider1.png')
        ],
        linkList: [
          {
            name: '项目',
            icon: 'icon-upload',
            size: '35px',
            num: '45',
            bgColor: '#f4c021',
            url: ''
          },
          {
            name: '贴子',
            icon: 'icon-msg',
            size: '40px',
            num: '123',
            bgColor: '#3dc077',
            url: ''
          },
          {
            name: '作品',
            icon: 'icon-cup',
            size: '45px',
            num: '56',
            bgColor: '#409ad6',
            url: ''
          },
          {
            name: '活动',
            icon: 'icon-flag',
            size: '35px',
            num: '11',
            bgColor: '#31408f',
            url: ''
          }
        ]
      }
    },
    methods: {
      jump (url) {
        const baseurl = this.$getConfig().bundleUrl
        navigator.push({
          url: setBundleUrl(baseurl, url)
        })
      }
    },
    /* 引入字体图标ttf */
    created () {
      var domModule = weex.requireModule('dom')
      domModule.addRule('fontFace', {
        'fontFamily': 'iconfont',
        'src': 'url(' + iconfont + ')'
      })
    },
    components: {
      mainTab, tab
    }
  }
</script>

<!-- 引入字体图标样式 -->
<style src="./fonts/iconfont.css"></style>

<style scope>
  /* 头部标题 */
  .header{
    position: fixed;
    height: 80px;
    width: 750px;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #000;
  }

  .main{
    position: fixed;
    top: 80px;
    bottom: 100px;
    left: 0;
    width: 100%;
  }
  /* slider */
  .slider{
    width: 750px;
    height: 160px;
    justify-content: flex-end;
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
    padding-bottom: 25px;
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
    box-sizing: border-box;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-width: 10px;
    border-bottom-color: #eee;
    padding-bottom: 20px;
  }
  .person-info{
    flex-direction: row;
    position: relative;
  }
  .person-avatar{
    width: 60px; height: 60px;
    border-radius: 50%;
  }
  .info{
    padding-left: 20px;
  }
  .person-location{
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: row;
  }
  .photos{
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .photo{
    width: 160px;
    height: 160px;
    background: #ccc;
    margin-right: 20px;
    margin-top: 20px;
  } 
  /* 评论 */
  .vote-header{
    border-bottom-width: 1px;
    border-bottom-color: grey;
    border-bottom-style: dashed;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 10px;
    position: relative;
  }
  .right-btns{
    flex-direction: row;
    justify-content: space-around;
    width: 120px;
  }
  .shangsanjiao{
    position: absolute;
    width: 15px;
    height: 15px;
    border-top-color: grey;
    border-left-color: grey;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-width: 1px;
    transform: translateY(40px) rotate(45deg);
    background: #fff;
  }
  .like-people{
    margin-top: 10px;
    flex-direction: row;
  }
  .row{
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .showMore{

  }
  .center{
    text-align: center;
  }
  .small{
    font-size: 20px;
  }
  .blue{
    color: #409ad6;
  }
  .grey{
    color: #999;
  }
  

</style>
