<template>
  <div class="main-tab">
    <transition name="main-tab-mask-fade">
      <div class="main-tab-mask" v-if="showPub">
      </div>
    </transition>
    <transition name="main-tab-pub-slide" >
      <div class="main-tab-publish" v-if="showPub">
        <div class="main-publish-nav">
          <div class="main-publish-link" v-for="link in publishLinks" @click="jump(link.url)">
            <div class="main-publish-icon" :style="{
                'background-image': 'url('+ link.img +')',
                'background-repeat': 'no-repeat',
                'background-size': 'contain'
              }"></div>
            <div class="main-publish-info">
              <text class="main-publish-title">{{link.title}}</text>  
              <text class="main-publish-desc">{{link.desc}}</text>  
            </div>
          </div>
        </div>
        <div class="main-publish-triangle"></div>  
      </div>  
    </transition>
    <div class="main-tab-nav">
      <div class="main-tab-link" v-for="(item,index) in items" :class="{'active-main-tab': index === selectedIndex}" @click="selectTab(index, item.url)">
        <template v-if="index !== 2">
          <div class="main-tab-circle" :class="{'active-main-tab-circle': index === selectedIndex}">
            <img :src="index===selectedIndex?item.activeSrc:item.src" style="width: 40px; height: 40px;"/>
          </div>
          <text class="main-tab-title" :class="{'active-main-tab-text': index === selectedIndex}">{{item.title}}</text> 
        </template>
        <template v-if="index === 2">
          <div style="width: 80px; height: 80px; border-radius: 40px;border-width: 1px;justify-content: center; align-items: center;">
            <img :src="item.src" style="width: 60px; height: 60px;"/>
          </div>
        </template>
      </div>  
    </div> 
  </div>  
</template>

<script>
  import {getBaseUrl, jump} from '../common/util.js'

  const navigator = weex.requireModule('navigator')
  const modal = weex.requireModule('modal')

  const baseUrl = getBaseUrl()

  export default {
    props: {
      selectedIndex: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        showPub: false,
        items: [
          {
            title: '首页',
            activeSrc: baseUrl + 'img/plus-circle-white.png',
            src: baseUrl + 'img/plus-circle.png',
            url: 'home.js'
          },
          {
            title: '画客圈',
            activeSrc: baseUrl + 'img/bell-white.png',
            src: baseUrl + 'img/bell.png',
            url: 'moments.js'
          },
          {
            activeSrc: baseUrl + 'img/minus-white.png',
            src: baseUrl + 'img/minus.png',
            url: ''
          },
          {
            title: '消息',
            activeSrc: baseUrl + 'img/message-white.png',
            src: baseUrl + 'img/message.png',
            url: 'message.js'
          },
          {
            title: '我的',
            activeSrc: baseUrl + 'img/me-white.png',
            src: baseUrl + 'img/me.png',
            url: 'me.js'
          }
        ],
        publishLinks: [
          {
            title: '一句话发需求',
            desc: '智能匹配最合适的设计师',
            img: baseUrl + '/img/faxvqiu.png',
            url: ''
          },
          {
            title: '秀作品',
            desc: '是金子 就是要让它发光',
            img: baseUrl + 'img/xiuzuopin.png',
            url: ''
          },
          {
            title: '云报价',
            desc: '一键合同，分享支付，快速订单',
            img: baseUrl + 'img/yunbaojia.png',
            url: ''
          }
        ]
      }
    },
    mounted () {

    },
    methods: {
      selectTab (index, url) {
        if (index === this.selectedIndex) return false
        if (index === 2) return this.showPub = !this.showPub
        jump(url)
      }
    }
  }
</script>

<style scoped>
  .main-tab-nav{
    width: 750px;
    position: fixed;
    height: 100px;
    bottom: 0;
    left: 0;
    flex-direction: row;
    height: 100px;
    background-color: #f7f7f7;
    border-top-width: 1px;
  }
  .main-tab-link{
    flex: 1;
    text-align: center;
    height: 100px;
    align-items: center;
    justify-content: center;
  }
  .active-main-tab{
    flex: 1;
  }
  .main-tab-circle{
    width: 50px;
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
    border-radius: 25px;
    border-style: solid;
    border-width: 1px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .main-tab-title{
    text-align: center;
    height: 30px;
    font-size: 22px;
  }
  /* 选中样式 */
  .active-main-tab-circle{
    color: #fff;
    border-color: grey;
    background: grey;
  }
  .active-main-tab-text{
    color: grey;
  }
  /* 发布按钮 */
  .main-tab-publish-icon{
    border-radius: 36px;
    border-style: solid;
    border-width: 1px;
    font-size: 70px;
    width: 72px;
    height: 72px;
  }
  /* 弹出发布 */
  .main-tab-mask{
    position: fixed;
    top: 0px;
    left: 0;
    bottom: 100px;
    width: 750px;
    background-color: rgba(0,0,0,0.5);
  }
  .main-tab-publish{
    background: #fff;
    position: fixed;
    bottom: 100px;
    width: 750px;
    left: 0;
  }
  .main-publish-nav{
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 30px;
    border-bottom-width: 5px; 
    border-bottom-color: #999; 
    border-bottom-style: solid; 
    background: #fff;
  }
  .main-publish-link{
    height: 130px;
    margin-top: 20px;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
    border-bottom-color: #999;
    text-align: center;
    flex-direction: row;
  }
  .main-publish-link:last-child{
    border-bottom: none;
  }
  .main-publish-icon{
    width: 100px;
    height: 100px;
  }
  .main-publish-info{
    margin-left: 30px;
  }
  .main-publish-title,
  .main-publish-desc{
    height: 50px;
    line-height: 50px;
  }
  .main-publish-desc{
    color: #999;
  }
  .main-publish-triangle{
    width: 35px;
    height: 35px;
    background: #fff;
    border-width: 5px;
    border-color: #999;
    border-top-color: transparent;
    border-left-color: transparent;
    position: absolute;
    bottom: 18px;
    left: 375px;
    transform: translateX(-18px) rotate(45deg);
  }
  /* 过渡 */
  .main-tab-pub-slide-enter,
  .main-tab-pub-slide-leave-active{
    transform: translateY(455px);
  }
  .main-tab-pub-slide-enter-active,
  .main-tab-pub-slide-leave-active{
    transition: all linear 0.3s;
  }
  .main-tab-mask-fade-enter,
  .main-tab-mask-fade-leave-active{
    opacity: 0;
  }
  .main-tab-mask-fade-enter-active,
  .main-tab-mask-fade-leave-active{
    transition: all linear 0.3s;
  }
</style>