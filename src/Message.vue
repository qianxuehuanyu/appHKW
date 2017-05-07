<template>
  <div>
    <text>消息</text>
    <!-- 导航栏 -->
    <main-tab :selectedIndex="3"></main-tab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'
  import {setBundleUrl} from './common/util.js'
  import {iconfont} from './common/config.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
        return {
         
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
      mainTab
    }
  }
</script>

<!-- 引入字体图标样式 -->
<style src="./fonts/iconfont.css"></style>
<style src="./common/common.css"></style>

<style scope>
    
</style>
