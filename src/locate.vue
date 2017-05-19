<template>
  <div>
    <scroller class="main">
      <div class="locate" @click="selectCity">
        <img :src="picRoot+'locate.png'" style="width: 40px;height: 40px;margin-right: 20px;"/>
        <text style="color: #409ad6;">定位当前位置</text>
      </div>
      <div class="input">
        <img :src="picRoot+'locate2.png'" class="input-img"/>
        <input type="text" placeholder="其他位置请输入" class="input-text"/>
      </div>
      <text class="history-title">历史位置</text>
      <div class="history-list">
        <div class="history">
          <img :src="picRoot+'msg.png'" class="left-img" />
          <text class="history-text">家</text>
          <text class="small">杭州市滨江区南岸晶都花园</text>
        </div>
        <div class="history">
          <img :src="picRoot+'money.png'" class="left-img" />
          <text class="history-text">公司</text>
          <text class="small">杭州市西湖区山景路365号</text>
        </div>
        <div class="history" v-for="history in historyList">
          <img :src="picRoot+'msg.png'" class="left-img" />
          <text class="history-text">{{history}}</text>
          <img :src="picRoot+'delete.png'" class="delete" />
        </div>
      </div>
    </scroller>
    <div class="locate-header">
      <img :src="picRoot+'left.png'" class="back" @click="goBack"/>
      <div class="select-city">
        <text>杭州</text>
        <img :src="picRoot+'down.png'" style="width: 40px; height: 40px;margin-top:10px;"/>
      </div>
    </div>
  </div>
</template>

<script>

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        historyList: [
          '杭州市上城区在水一方公寓',
          '杭州市西湖区山景路365号'
        ]
      }
    },
    methods: {
      goBack () {
        navigator.pop()
      },
      selectCity () {
        jump('select-city.js')
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  /* 顶部 */
  .locate-header{
    position: fixed;
    top: 0;
    left: 0;
    height: 100px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
  }
  .back{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 10px;
  }
  .select-city{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /* 内容 */
  .main{
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 750px;
    background-color: #eee;
  }
  .locate{
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 30px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .input{
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 20px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .input-img{
    width: 40px;
    height: 40px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .input-text{
    flex: 1;
    text-align: center;
  }
  .history-title{
    font-size: 30px;
    color: #777;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  .history-list{
    background-color: #fff;
    padding-left: 80px;
  }
  .history{
    border-bottom-width: 2px;
    border-bottom-color: #eee;
    flex-direction: row;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .left-img{
    width: 25px;
    height: 25px;
    position: absolute;
    left: -50px;
    top: 30px;
  }
  .history-text{
    font-size: 30px;
  }
  .delete{
    position: absolute;
    right: 20px;
    top: 30px;
    width: 25px;
    height: 25px;
  }
  .small{
    font-size: 22px;
    padding-left: 40px;
    padding-top: 10px;
  }
</style>