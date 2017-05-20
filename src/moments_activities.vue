<template>
  <div></div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot
      }
    },
    methods: {

    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  
</style>