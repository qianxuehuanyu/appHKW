<template>
  <div>
    <scroller class="main">
      <div class="show-list">
        <div class="show" v-for="show in showList">
          <div class="show-circle">
            <img class="show-img" :src="show.img" />
          </div>
          <text class="show-text">{{show.title}}</text>
        </div>
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
    <sub-header title="内容定制"></sub-header>
  </div>
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
        picRoot: config.picRoot,
        showList: [
          {img: config.picRoot + 'design-pingmian.png', title: '平面设计', desc: ''},
          {img: config.picRoot + 'design-net.png', title: '网页设计', desc: ''},
          {img: config.picRoot + 'design-hulianwang.png', title: '交互/界面', desc: ''},
          {img: config.picRoot + 'design-gongye.png', title: '宣传片', desc: ''},
          {img: config.picRoot + '.png', title: '工业设计', desc: ''},
          {img: config.picRoot + '.png', title: '网站建设', desc: ''}
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

    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 750px;
  }
  .show-list{
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 40px;
  }
  .show{
    width: 120px;
    margin-left: 10px;
    margin-right: 10px;
    justify-content: center;
    align-items: center;
  }
  .show-circle{
    border-width: 1px;
    border-color: #03a1dd;
    justify-content: center;
    align-items: center;
    width: 120px;
    height: 120px;
    border-radius: 60px;
  }
  .show-img{
    width: 60px;
    height: 60px;
  }
  .show-text{
    font-size: 25px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .choice-list{

  }
  .choice{
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: dashed;
    border-top-color: #ddd;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .choice-circle{
    padding-right: 20px;
  }
  .choice-img{
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
  .choice-title{
    font-size: 30px;
  }
  .choice-desc{
    color: #999;
    font-size: 25px;
  }
</style>