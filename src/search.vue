<template>
  <div>
    <scroller class="main">
      <div class="history-header">
        <text style="font-size: 25px;">历史搜索</text>
        <img :src="picRoot + 'delete.png'" style="width: 30px; height: 30px;"/>
      </div>
      <div class="history-list">
        <div class="history" v-for="history in historyList">
          <text style="font-size: 22px;">{{history}}</text>
        </div>
      </div>
      <div class="choice-header">
        <text style="font-size: 25px;">搜索发现</text>
        <img :src="picRoot + 'show.png'" style="width: 40px; height: 40px;"/>
      </div>
      <div class="choice-list">
        <div class="choice" v-for="choice in choiceList">
          <div class="choice-circle">
            <img class="choice-img" :src="choice.img" />
          </div>
          <div class="choice-text">
            <text class="choice-title">{{choice.title}}</text>
            <text class="choice-desc">{{choice.desc}}</text>
          </div>
        </div>
      </div>
    </scroller>
    <div class="search-header">
      <img :src="picRoot+'left.png'" class="back" @click="goBack"/>
      <input type="text" class="search-input"/>
      <div class="search-btn">
        <text>搜索</text>
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
          '西装外套', '串珍珠的线', '串珍珠的链子', '珍珠项链 双层', '珍珠项链', '设计师款外套', '西装外套 韩', '儿童cosplay服装', '美陈'
        ],
        choiceList: [
          {img: config.picRoot + 'dingzhi1.png', title: '艺术绘画', desc: '名片 海报 画册 封面 所装 标实'},
          {img: config.picRoot + 'dingzhi2.png', title: '品牌设计', desc: '网页 banner 网店装修 商城'},
          {img: config.picRoot + 'dingzhi3.png', title: '互联网设计', desc: '用户体验 icon图标 界面 原型'},
          {img: config.picRoot + 'dingzhi4.png', title: '产品设计', desc: 'flash制作 视频制作 宣传片'},
          {img: config.picRoot + 'dingzhi5.png', title: '空间设计', desc: '工业外观 结构设计 产品设计'}
        ]
      }
    },
    methods: {
      goBack () {
        navigator.pop()
      }
    },
    components: {
    }
  }
</script>

<style scoped>
  /* 顶部 */
  .search-header{
    position: fixed;
    top: 0;
    left: 0;
    height: 100px;
    width: 750px;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    flex-direction: row;
  }
  .back{
    width: 60px;
    height: 60px;
    margin-left: 20px;
    margin-right: 20px;
  }
  .search-input{
    flex: 1;
    height: 60px;
    border-radius: 30px;
    border-width: 1px;
    border-color: #ddd;
    padding-left: 20px;
    padding-right: 20px;
  }
  .search-btn{
    padding-left: 20px;
    padding-right: 20px;
  }
  /* 内容 */
  .main{
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 750px;
  }
  /* 历史搜索 */
  .history-header, .choice-header{
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .history-list{
    flex-direction: row;
    flex-wrap: wrap;
  }
  .history{
    background-color: #f5f5f5;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 30px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  /* 搜索发现 */
  .choice-list{

  }
  .choice{
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: dashed;
    border-top-color: #ddd;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  .choice-circle{
    padding-right: 20px;
  }
  .choice-img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .choice-title{
    font-size: 30px;
    padding-bottom: 10px;
  }
  .choice-desc{
    color: #999;
    font-size: 25px;
  }
</style>