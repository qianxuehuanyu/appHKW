<template>
  <div class="dialog-footer">
    <div class="toggle" v-if="isInput">
      <img :src="picRoot+'voice.png'" class="voice" @click="toggleInput"/>
      <input type="text" class="input" />
    </div>
    <div class="toggle" v-if="!isInput">
      <img :src="picRoot+'keyboard.png'" class="keyboard" @click="toggleInput"/>
      <text class="say">按住说话</text>
    </div>
    <img :src="picRoot+'emoji.png'" class="emoji" />
    <img :src="picRoot+'plus2.png'" class="add" />
  </div>
</template>

<script>
  import config from '../common/config.js'

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        isInput: true
      }
    },
    methods: {
      toggleInput () {
        this.isInput = !this.isInput
      }
    }
  }
</script>

<style scoped>
  .dialog-footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 750px;
    height: 100px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    flex-direction: row;
  }
  .toggle{
    flex-direction: row;
    flex: 1;
  }
  .voice, .keyboard, .emoji, .add{
    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .input{
    border-bottom-width: 1px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 30px;
    height: 60px;
    flex: 1;
  }
  .say{
    text-align: center;
    border-width: 1px;
    border-radius: 10px;
    flex: 1;
  }
</style>