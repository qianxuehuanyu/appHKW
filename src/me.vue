<template>
  <div>
    <scroller class="main">
      <div class="header">
        <div class="avatar" style="justify-content: center; align-items: center;">
          <img src="" style="border-width: 1px; border-radius: 50px; width: 100px;
          height: 100px; background-color: #fff;"/>
          <text style="padding-top: 10px;font-size: 25px;">自信人生</text>
        </div>
        <img class="setting" :src="picRoot+'setting.png'"/>
      </div>
      <div class="ul">
        <div class="li" v-for="(li,index) in ul1" :style="{'border-bottom-width': index === ul1.length-1?'0px':'1px'}" @click="goTo(li.url)">
          <div class="left">
            <text>{{li.name}}</text>
          </div>
          <div class="right">
            <img class="arrow" :src="picRoot + 'right.png'" />
          </div>
        </div>
      </div>
      <div class="ul">
        <div class="li" v-for="(li,index) in ul2" @click="goTo(li.url)">
          <div class="left">
            <text>{{li.name}}</text>
          </div>
          <div class="right">
            <text v-if="li.certificated" style="color: grey;font-size: 25px;">已认证&emsp;&emsp;</text>
            <text v-if="!li.certificated" style="color: grey;font-size: 25px;">未认证&emsp;&emsp;</text>
            <img class="arrow" :src="picRoot + 'right.png'" />
          </div>
        </div>
      </div>
      <div class="ul">
        <div class="li" v-for="(li,index) in ul3" :style="{'border-bottom-width': index === ul3.length-1?'0px':'1px'}" @click="goTo(li.url)">
          <div class="left">
            <text>{{li.name}}</text>
            <text v-if="index===2" style="color: grey;font-size: 25px;padding-top: 10px;">&emsp;&emsp;{{li.tel}}</text>
          </div>
          <div class="right">
            <img v-if="index !== 2" class="arrow" :src="picRoot + 'right.png'" />
          </div>
        </div>
      </div>
    </scroller>
    <mainTab :selectedIndex="4"></mainTab>
  </div>
</template>

<script>
  import mainTab from 'components/main-tab.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        ul1: [
          {
            'name': '我的动态',
            'url': '' 
          },
          {
            'name': '账户',
            'url': '' 
          },
          {
            'name': '客户',
            'url': 'me_customer.js' 
          },
          {
            'name': '收藏',
            'url': '' 
          },
          {
            'name': '报价单',
            'url': '' 
          },
          {
            'name': '订单',
            'url': '' 
          }
        ],
        ul2: [
          {
            'name': '我是设计师',
            'url': '',
            'certificated': false
          }
        ],
        ul3: [
          {
            'name': '我的常用地址',
            'url': '' 
          },
          {
            'name': '黑名单',
            'url': '' 
          },
          {
            'name': '联系客服',
            'tel': '0591——266555',
            'url': '' 
          }
        ]
      }
    },
    methods: {
      goTo (url) {
        jump(url)
      }
    },
    components: {
      mainTab
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    width: 750px;
    bottom: 100px;
    top: 0px;
    padding-bottom: 100px;
    background-color: #f2f2f2;
  }
  .header{
    background-color: #f2f2f2;
    width: 750px;
    height: 250px;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .setting{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
  }
  .ul{
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .li{
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-color: grey;
  }
  .left{
    flex-direction: row;
  }
  .right{
    position: absolute;
    top: 30px;
    right: 10px;
    flex-direction: row;
  }
  .arrow{
    width: 30px;
    height: 30px;
  }
</style>
