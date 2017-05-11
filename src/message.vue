<template>
  <div>
    <text>我的</text>
    <mainTab :selectedIndex="3"></mainTab>
  </div>
</template>

<script>
  import {getBaseUrl, jump} from './common/util.js'
  import mainTab from './components/main-tab.vue'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  const baseUrl = getBaseUrl()

  export default {
    data () {
        return {
         
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

