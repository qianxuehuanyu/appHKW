<template>
  <div>
    <scroller class="main">
      <div class="header">
        <!-- 头像 -->
        <div class="avatar" style="justify-content: center; align-items: center;">
          <img :src="user.avatar" style="border-width: 1px; border-radius: 50px; width: 100px;
          height: 100px; background-color: #fff;" @click="goTo('me_edit.js')"/>
          <text style="padding-top: 10px;font-size: 25px;">{{user.name}}</text>
        </div>
        <!-- 设置 -->
        <img class="setting" :src="picRoot+'setting.png'" @click="goTo('me_setting.js')"/>
      </div>
      <!-- 我的动态、账户、客户、收藏、报价单、订单 -->
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
      <!-- 我是设计师 -->
      <div class="ul">
        <div class="li" @click="goToDesigner">
          <div class="left">
            <text>我是设计师</text>
          </div>
          <div class="right">
            <text v-if="user.certificated" style="color: #409ad6;font-size: 25px;">已认证&emsp;&emsp;</text>
            <text v-if="!user.certificated" style="color: grey;font-size: 25px;">未认证&emsp;&emsp;</text>
            <img class="arrow" :src="picRoot + 'right.png'" />
          </div>
        </div>
      </div>
      <!-- 我的常用地址、黑名单、联系客服 -->
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
  const storage = weex.requireModule('storage')

  export default {
    data () {
      return {
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        user: {},
        ul1: [
          {
            'name': '我的动态',
            'url': 'me_dynamics.js' 
          },
          {
            'name': '账户',
            'url': 'me_account.js' 
          },
          {
            'name': '客户',
            'url': 'me_customer.js' 
          },
          {
            'name': '收藏',
            'url': 'me_collect.js' 
          },
          {
            'name': '报价单',
            'url': 'me_price.js' 
          },
          {
            'name': '订单',
            'url': 'me_order.js' 
          }
        ],
        ul3: [
          {
            'name': '我的常用地址',
            'url': 'me_address.js' 
          },
          {
            'name': '黑名单',
            'url': 'me_blacklist.js' 
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
      },
      goToDesigner () {
        if (this.user.certificated) {
          jump('designer.js', {
            self: true
          })
        } else {
          jump('me_certificate.js')
        }
      }
    },
    mounted () {
      storage.getItem('user', e => {
        this.user = JSON.parse(e.data)
      })
      storage.removeItem('fields')
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
    padding-top: 40px;
    padding-bottom: 40px;
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
