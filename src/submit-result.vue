<template>
  <div style="justify-content:center; align-items: center;">
    <div class="result" v-if="result">
      <img :src="result.img" class="result-pic"/>
      <text class="result-text">{{result.text}}</text>
      <text class="result-text">{{result.text2}}</text>
    </div>
    <sub-header title="提交反馈"></sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {jump, urlParse} from './common/util.js'
  import config from './common/config.js'

  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        designerid: urlParse().id,
        submit: urlParse().submit,
        picRoot: config.picRoot
      }
    },
    computed: {
      result () {
        if (this.submit === 'success') {
          return {
            img: this.picRoot + 'smile.png',
            text: '提交成功',
            text2: '耐心等待审核哦'
          }
        } else {
          return {
            img: this.picRoot + 'cry.png',
            text: '提交失败',
            text2: '请重新提交'
          }
        }
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
  .result{
    width: 750px;
    justify-content: center;
    align-items: center;
    padding-top: 300px;
  }
  .result-pic{
    width: 100px;
    height: 100px;
    margin-bottom: 30px;
  }
  .result-text{
    font-size: 25px;
    padding-bottom: 20px;
  }
</style>