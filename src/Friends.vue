<template>
  <div>
    <text>画客圈</text>
    <!-- 导航栏 -->
    <main-tab :selectedIndex="1"></main-tab>
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
        'src': 'url(/src/fonts/iconfont.ttf)'
      })
    },
    components: {
      mainTab
    }
  }
</script>

<!-- 引入字体图标样式 -->
<style src="./fonts/iconfont.css"></style>

<style scope>
    
</style>
