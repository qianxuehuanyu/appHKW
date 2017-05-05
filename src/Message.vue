<template>
  <div>
    <text>消息</text>
    <!-- 导航栏 -->
    <main-tab :selectedIndex="3"></main-tab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'
  import {getBaseURL} from './common/util.js'

  const modal = weex.requireModule('modal')
  const event = weex.requireModule('event')

  export default {
    data () {
        return {
         
        }
    },
    methods: {
      jump (url) {
        let base = getBaseURL(weex)
        event.openURL(base + url)
      }
    },
    /* 引入字体图标ttf */
    created () {
      var domModule = weex.requireModule('dom')
      domModule.addRule('fontFace', {
        'fontFamily': 'iconfont',
        'src': 'url(//at.alicdn.com/t/font_nvmf3cs5umrvygb9.ttf)'
      })
    },
    components: {
      mainTab
    }
  }
</script>

<!-- 引入字体图标样式 -->
<style src="./common/fonts/iconfont.css"></style>

<style scope>
    
</style>