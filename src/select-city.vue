<template>
  <div>
    <scroller class="main">
      <div class="search">
        <input type="text" placeholder="请输入城市名称或首字母查询" class="search-text" />
        <img :src="picRoot+'search.png'" class="search-img"/>
      </div>
      <div class="hot">
        <text class="hot-title">热门城市</text>
        <div class="hot-list">
          <div class="hot-city" v-for="hot in hotList">
            <text class="hot-city-text">{{hot}}</text>
          </div>
        </div>
      </div>
      <div class="city-list">
        <div class="letter" v-for="letter in cityList" :ref="letter.letter">
          <text class="letter-text">{{letter.letter}}</text>
          <div class="letter-citys">
            <div class="city" v-for="city in letter.citys">
              <text class="city-text">{{city}}</text>
            </div>
          </div>
        </div>
      </div>
      <div class="letter-nav">
        <div class="letter-nav-container">
          <text class="nav-letter">#</text>
          <text v-for="letter in alphabet" class="nav-letter" @click="goTo(letter)">{{letter}}</text>
        </div>
      </div>
    </scroller>
    <sub-header title="选择城市"></sub-header>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  // const storage = weex.requireModule('storage')
  // const animation = weex.requireModule('animation')
  // const navigator = weex.requireModule('navigator')
  const dom = weex.requireModule('dom')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        hotList: [
          '北京', '上海', '广州', '深圳', '杭州', '南京', '天津', '武汉', '重庆'
        ],
        cityList: [
          {letter: 'A', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'B', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'C', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'D', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'E', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'F', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'G', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'H', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'I', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'J', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'K', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'L', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'M', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'N', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'O', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'P', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'Q', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'R', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'S', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'T', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'U', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'V', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'W', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'X', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'Y', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]},
          {letter: 'Z', citys: [
            '鞍山', '安阳', '安庆', '安康', '澳门', '阿克苏'
          ]}
        ],
        alphabet: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
      }
    },
    methods: {
      goTo (letter) {
        const el = this.$refs[letter]
        dom.scrollToElement(el)
      }
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
    background-color: #eee;
  }
  /* 搜索框 */
  .search{
    height: 90px;
    width: 750px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    position: relative;
  }
  .search-img{
    position: absolute;
    width: 30px;
    height: 30px;
    left: 40px;
  }
  .search-text{
    width: 710px;
    height: 60px;
    border-radius: 30px;
    background-color: #eee;
    padding-left: 60px;
    padding-right: 20px;
    font-size: 30px;
  }
  /* 热门城市 */
  .hot, .city-list{
    padding-left: 30px;
    padding-right: 30px;
  }
  .hot-title{
    color: grey;
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .hot-list{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
  }
  .hot-city{
    background-color: #fff;
    width: 200px;
    height: 70px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
  }
  .hot-city-text{
    font-size: 25px;
  }
  /* 城市列表 */
  .city-list{
  }
  .letter-text{
    color: grey;
    padding-top: 40px;
  }
  .city{
    border-bottom-width: 1px;
    border-bottom-color: grey;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .city-text{
    color: grey;
    font-size: 30px;
  }
  /* 右侧导航栏 */
  .letter-nav{
    position: fixed;
    right: 0;
    top: 100px;
    bottom: 0;
    justify-content: center;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;
  }
  .nav-letter{
    font-size: 22px;
    color: grey;
    text-align: center;
  }
</style>