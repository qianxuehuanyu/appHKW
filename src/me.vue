<template>
  <div>
    <text>我的</text>
    <img src="http://dl.bizhi.sogou.com/images/2012/03/14/124196.jpg" style="width: 750px; height: 300px;" />
    <image :src="picRoot+'heart-fill-blue.png'" style="width: 30px; height: 30px;"></image>
    <text>{{picRoot + 'heart-fill-blue.png'}}</text>
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
        picRoot: config.picRoot
      }
    },
    methods: {
    },
    components: {
      mainTab
    }
  }
</script>

<style scoped>
</style>
