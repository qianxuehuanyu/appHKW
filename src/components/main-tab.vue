<template>
  <div class="main-tab">
    <div class="main-tab-nav">
      <div class="main-tab-link" v-for="(item,index) in items" :class="{active: index === selectedIndex}" @click="selectTab(index, item.url)">
        <template v-if="index !== 2">
          <div class="main-tab-icon-box">
            <img v-if="index===selectedIndex" class="main-tab-icon" :src="item.activeImg" />
            <img v-else class="main-tab-icon" :src="item.img" />
          </div>
          <text class="main-tab-title" :class="{'active-main-tab-text': index === selectedIndex}">{{item.title}}</text> 
        </template>
        <template v-if="index === 2">
          <div class="main-tab-publish-tab">
            <img class="main-tab-publish-icon" :src="item.img"  />
          </div>
        </template>
      </div>  
    </div>
    <transition name="main-tab-mask-fade">
      <div class="main-tab-mask" v-show="showPub">
      </div>
    </transition>
    <transition name="main-tab-pub-slide" >
      <div class="main-tab-publish" v-show="showPub">
        <div class="main-publish-nav">
          <div class="main-publish-link" v-for="link in publishLinks" @click="jump(link.url)">
            <img class="main-publish-icon" :src="link.img"/>
            <div class="main-publish-info">
              <text class="main-publish-title">{{link.title}}</text>  
              <text class="main-publish-desc">{{link.desc}}</text>  
            </div>
          </div>
        </div>
        <div class="main-publish-triangle"></div>  
      </div>  
    </transition>
  </div>  
</template>

<script>
  // var getBaseURL = require('../common/util.js').getBaseURL
  // var base = getBaseURL(weex)
  // var event = weex.requireModule('event')

  export default {
    data () {
      return {
        showPub: true,
        selectedIndex: 0,
        items: [
          {
            title: '首页',
            img: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
            activeImg: 'http://gtms04.alicdn.com/tps/i4/TB16jjPMpXXXXazXVXX9t7RGVXX-46-46.png',
            url: 'views/Home.js'
          },
          {
            title: '画客圈',
            img: 'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png',
            activeImg: 'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png',
            url: 'views/Friends.js'
          },
          {
            img: 'http://gtms03.alicdn.com/tps/i3/TB1LEn9MpXXXXaUXpXX9t7RGVXX-46-46.png',
            activeImg: 'http://gtms02.alicdn.com/tps/i2/TB1qysbMpXXXXcnXXXX9t7RGVXX-46-46.png',
          },
          {
            title: '消息',
            img: 'http://gtms01.alicdn.com/tps/i1/TB1B0v5MpXXXXcvXpXX9t7RGVXX-46-46.png',
            activeImg: 'http://gtms04.alicdn.com/tps/i4/TB1NxY5MpXXXXcrXpXX9t7RGVXX-46-46.png',
            url: 'views/Message.js'
          },
          {
            title: '我的',
            img: '',
            activeImg: '',
            url: 'views/My.js'
          }
        ],
        publishLinks: [
          {
            title: '一句话发需求',
            desc: '智能匹配最合适的设计师',
            img: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
            url: ''
          },
          {
            title: '秀作品',
            desc: '是金子 就是要让它发光',
            img: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
            url: ''
          },
          {
            title: '云报价',
            desc: '一键合同，分享支付，快速订单',
            img: 'http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png',
            url: ''
          }
        ]
      }
    },
    mounted () {
      this.showPub = false
    },
    methods: {
      selectTab (index, url) {
        if (index !== 2) {
          this.selectedIndex = index
          this.jump(url)
        } else {
          this.showPub = !this.showPub
        }
      },
      jump (url) {
        console.log(url)
      }
    }
  }
</script>

<style scope>
  .main-tab-nav{
    width: 100%;
    position: fixed;
    z-index: 10;
    height: 100px;
    bottom: 0;
    width: 100%;
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
  .main-tab-icon-box{
    width: 50px;
    height: 50px;
    margin-top: 10px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    justify-content: center;
    align-items: center;
  }
  .main-tab-icon{
    width: 30px;
    height: 30px;
  }
  .main-tab-title{
    text-align: center;
    height: 40px;
    font-size: 22px;
  }
  .active-main-tab-text{
    color: #f00;
  }
  /* 发布按钮 */
  .main-tab-publish-tab{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border-style: solid;
    border-width: 1px;
    justify-content: center;
    align-items: center;
  }
  .main-tab-publish-icon{
    width: 60px;
    height: 60px;
  }
  /* 弹出发布 */
  .main-tab-mask{
    position: fixed;
    z-index: 1;
    top: 0px;
    bottom: 100px;
    width: 100%;
    background-color: rgba(0,0,0,0.5);
  }
  .main-tab-publish{
    background: #fff;
    position: fixed;
    bottom: 100px;
    width: 100%;
    z-index: 2;
  }
  .main-publish-nav{
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 30px;
    border-bottom-width: 5px; 
    border-bottom-color: #999; 
    border-bottom-style: solid; 
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
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
  }
  /* 过渡 */
  .main-tab-pub-slide-enter,
  .main-tab-pub-slide-leave-active{
    transform: translateY(100%);
  }
  .main-tab-pub-slide-enter-active,
  .main-tab-pub-slide-leave-active{
    transition: all linear 0.5s;
  }
  .main-tab-mask-fade-enter,
  .main-tab-mask-fade-leave-active{
    opacity: 0;
  }
  .main-tab-mask-fade-enter-active,
  .main-tab-mask-fade-leave-active{
    transition: all linear 0.5s;
  }
</style>