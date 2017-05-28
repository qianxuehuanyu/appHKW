<template>
  <div class="mask">
    <div class="selector">
      <div class="ul">
        <div class="title">
          <text class="title-text">提醒时间</text>
        </div>
        <div class="li" v-for="(item,index) in items" @click="select(index)">
          <text class="item-text">{{item}}</text>
        </div>
        <div class="cancel" @click="cancel">
          <text class="cancel-text">取消</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array
    },
    methods: {
      select (index) {
        this.$emit('select', index)
      },
      cancel () {
        this.$emit('cancel')
      }
    }
  }
</script>

<style scoped>
  .mask{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.3);
  }
  .selector{
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    background-color: #fff;
    border-radius: 8px;
  }
  .ul{

  }
  .title, .cancel, .li{
    padding-top: 30px;
    padding-bottom: 30px;
    justify-content: center;
    align-items: center;
  }
  .title, .li{
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .title-text{
    color: grey;
    font-size: 25px;
  }
  .item-text{
    font-size: 35px;
    color: #047eff;
  }
  .cancel-text{
    color: red;
    font-size: 35px;
  }
</style>