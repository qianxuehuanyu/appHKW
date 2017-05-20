<template>
  <div class="sub-header">
    <img :src="picRoot+'left.png'" class="back" @click="goBack"/>
    <text>{{title}}</text>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import config from '../common/config.js'

  const navigator = weex.requireModule('navigator')

  export default {
    props: {
      title: String
    },
    data () {
      return {
        picRoot: config.picRoot
      }
    },
    methods: {
      goBack () {
        navigator.pop()
      }
    }
  }
  
</script>

<style scoped>
  .sub-header{
    position: fixed;
    top: 0;
    left: 0;
    height: 80px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
  }
  .back{
    position: absolute;
    left: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
  }
  .right{
    position: absolute;
    right: 10px;
    top: 10px;
    flex-direction: row;
  }
</style>