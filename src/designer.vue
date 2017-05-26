<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10" @scroll="onscroll" :style="{'bottom': Bottom}">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <div class="designer">
        <!-- 设计师面板 -->
        <div class="designer-top">
          <img :src="picRoot+'left.png'" class="left-btn" @click="back"/>
          <img :src="picRoot+'more.png'" class="right-btn" @click="toggleShare(true)"/>
          <img :src="designerData.avatar" class="avatar" style="width: 100px; height: 100px;"/>
          <img :src="picRoot+'male.png'" class="sex" v-if="designerData.sex === 0"/>
          <img :src="picRoot+'female.png'" class="sex" v-if="designerData.sex === 1"/>
          <text class="name">{{designerData.name}}</text>
          <text class="motto">"{{designerData.motto}}"</text>
          <div class="location">
            <img :src="picRoot+'location.png'" class="location-icon" />
            <text class="location-text">&nbsp;{{designerData.location}}</text>
          </div>
        </div>
        <!-- 数据列表 -->
        <div class="nums">
          <div class="num" >
            <text class="num-num" v-if="designerData.works">{{designerData.works.length}}</text>
            <text class="num-title">作品</text>
          </div>
          <div class="num" >
            <text class="num-num" v-if="designerData.likes">{{designerData.likes}}</text>
            <text class="num-title">喜欢</text>
          </div>
          <div class="num" >
            <text class="num-num" v-if="designerData.requires">{{designerData.requires}}</text>
            <text class="num-title">收获需求</text>
          </div>
          <div class="num" >
            <text class="num-num" v-if="designerData.feedbackRate">{{designerData.feedbackRate}}</text>
            <text class="num-title">反馈率</text>
          </div>
        </div>
        <!-- 画客信息 -->
        <div class="info-title">
          <text class="info-title-text" >&emsp;画客信息&emsp;</text>
        </div>
        <div class="infos">
          <text class="info" v-for="info in designerData.infos">{{info}}</text>
        </div>
        <!-- 折叠按钮 -->
        <div class="slide-btn">
          <img :src="picRoot+'up.png'"  style="width: 40px; height: 40px;"/>
        </div>
      </div>
      <!-- tab切换 -->
      <tab :tabItems="tabItems" :tabIndex="tabIndex" @select="setSelectTab"></tab>
      <div class="tab-contents">
        <!-- 作品 -->
        <div v-if="tabIndex === 0">
          <!-- 作品轮播 -->
          <div class="works" v-if="designerData.works">
            <slider class="slider" interval="3000" auto-play="false" >
              <div class="sliderFrame" v-for="item in formedWorks">
                <img class="sliderImg" resize="cover" :src="item[0].src" /> 
                <img class="sliderImg" resize="cover" v-if="item[1]" :src="item[1].src" /> 
                <img class="sliderImg" resize="cover" v-if="item[2]" :src="item[2].src" /> 
                <img class="sliderImg" resize="cover" v-if="item[3]" :src="item[3].src" /> 
              </div>
            </slider>
            <img :src="picRoot + 'left.png'" class="prev-work" @click="prevWork"/>
            <img :src="picRoot + 'right.png'" class="next-work" @click="nextWork"/>
          </div>
          <!-- 留言 -->
          <div class="say-title">
            <text class="say-title-text">留言({{designerData.totalSaysNum}})</text>
          </div>
          <div class="say">
            <img :src="designerData.avatar" class="say-avatar" />
            <input class="say-input" type="text" v-model="say" placeholder="既然来了，就表个态呗！" />
          </div>
          <moment-list :listdata="designerData.says" type="designer" v-if="designerData.says"></moment-list>
          <!-- loading -->
          <loading :display="showloading" style="justify-content:center;align-items:center;">
            <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
          </loading>
        </div>
        <!-- 服务 -->
        <div v-if="tabIndex === 1">
          <div class="services">
            <buy-list :listdata="designerData.services" type="designer" @sendCart="getCart"></buy-list>  
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="设计师主页" v-if="showHeader"></sub-header>
    <div class="nav" ref="nav" v-if="!self">
      <div class="nav1">
        <div class="ul1">
          <div class="link1" v-for="link in nav1" :style="{'background-color': link.bgColor}">
            <img :src="link.src" class="link-img"/>
            <text class="link-text">{{link.name}}</text>
          </div>
        </div>
        <div class="next-nav" @click="toggleNav(-750)">
          <img :src="picRoot + 'right.png'" class="nav-right-btn"/>
        </div>
      </div>
      <div class="nav2">
        <div class="prev-nav" @click="toggleNav(0)">
          <img :src="picRoot + 'right.png'" class="nav-right-btn"/>
        </div>
        <div class="ul2">
          <div class="link2" v-for="link in nav2">
            <img :src="link.src" class="link-img"/>
            <text class="link-text">{{link.name}}</text>
          </div>
        </div>
      </div>
    </div>
    <buy-footer :cart="cart" :designerid="designerid" type="designer" v-if="!self && tabIndex === 1 && cart.length"></buy-footer>
    <share v-if="!self && showShare" @cancelShare="toggleShare(false)"></share>
    share2
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import momentList from './components/moment-list.vue'
  import buyList from './components/buy-list.vue'
  import tab from './components/tab.vue'
  import share from './components/share.vue'
  import buyFooter from './components/buy-footer.vue'

  import {getBaseUrl, jump, urlParse} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')
  const animation = weex.requireModule('animation')
  const storage = weex.requireModule('storage')

  export default {
    data () {
      return {
        designerid: urlParse().id,
        self: urlParse().self,
        refreshing: 'hide',
        showloading: 'hide',
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        designerData: {says: []},
        tabIndex: 0,
        say: '',
        showHeader: false,
        nav1: [
          {src: config.picRoot + 'tel.png', name: '电话', url: '', bgColor: '#1a68ac'},
          {src: config.picRoot + 'quote.png', name: '交谈', url: '', bgColor: '#3e98d7'},
          {src: config.picRoot + 'xiangmu.png', name: '发需求', url: '', bgColor: '#1a68ac'},
          {src: config.picRoot + '', name: '约见', url: '', bgColor: '#3e98d7'},
        ],
        nav2: [
          {src: config.picRoot + '', name: '收藏', url: ''},
          {src: config.picRoot + '', name: '关注', url: ''},
          {src: config.picRoot + '', name: '喜欢', url: ''}
        ],
        cart: [],
        showShare: false
      }
    },
    computed: {
      tabItems () {
        let worksNum = 0
        let servicesNum = 0
        if (this.designerData.works) worksNum = this.designerData.works.length
        if (this.designerData.services) servicesNum = this.designerData.services.length
        return ['作品(' + worksNum + ')', '服务(' + servicesNum + ')']
      },
      formedWorks () {
        let works = this.designerData.works
        let length = works.length
        let arr = []
        let item = []
        console.log(works)
        for (let i = 0; i < length; i++) {
          item.push(works[i])
          if (item.length === 4 ) {
            arr.push(item)
            item = []
          } else if (i === length - 1) {
            arr.push(item)
            item = []
          }
        }
        console.log(arr)
        return arr
      },
      Bottom () {
        if (this.self) return 0
        return '100px'
      }
    },
    methods: {
      back () {
        navigator.pop()
      },
      setSelectTab (index) {
        this.tabIndex = index
      },
      fetchData () {
        return getData('getDesigner', {
          id: this.designerid, page: 1, perpage: 10
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          this.designerData = {}
          this.designerData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          res.data.says.forEach((say) => {
            this.designerData.says.push(say)
          })
          this.showloading = 'hide'
        })
      },
      formData (data) {
        data.says.forEach((item) => {
          item.foldComment = true
          item.ilike = item.likes.some((name) => {
            return name === item.name
          })
        })
        data.services.forEach((item) => {
          item.checked = false
          item.num = 1
        })
      },
      prevWork (e) {
        // slider组件没有提供切换方法，回头手动写一个轮播
      },
      nextWork (e) {
      },
      onscroll (e) {
        let top = e.contentOffset.y
        if (top < -100) this.showHeader = true
        else this.showHeader = false
      },
      toggleNav (pos) {
        const nav = this.$refs.nav
        animation.transition(nav, {
          styles: {
            transform: 'translate('+pos+'px, 0)'
          },
          duration: 200,
          timingFunction: 'ease',
          delay: 0
        })
      },
      getCart (cart) {
        this.cart = cart
      },
      toggleShare (value) {
        this.showShare = value
      }
    },
    mounted () {
      if (this.self) {
        storage.getItem('user', e => {
          let user = JSON.parse(e.data)
          this.designerid = user.id
          this.onrefresh()
        })
      } else {
        this.onrefresh()
      }
      
    },
    components: {
      subHeader, momentList, tab, buyList, buyFooter, share
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 0;
    left: 0;
    width: 750px;
  }
  .designer{
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    padding-top: 20px;
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .avatar{
    border-radius: 50%;
  }
  /* 设计师信息面板 */
  .designer-top{
    justify-content: center;
    align-items: center;
  }
  .left-btn{
    width: 40px; height: 40px;position: absolute;top:10px;left:0;
  }
  .right-btn{
    width: 40px; height: 40px;position: absolute;top:10px;right:0;border-radius: 50%;border-width: 1px;border-color: grey;
  }
  .sex{
    width: 30px; height: 30px; position: absolute; top: 65px; left: 375px;
  }
  .name{
    font-size: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .motto{
    font-size: 22px; color: grey;
    width: 400px;
    justify-content: center;
    align-items: center;
  }
  .location{flex-direction: row;padding-top: 10px;}
  .location-icon{
    width: 25px;height: 25px;
  }
  .location-text{
    color: grey;
    font-size: 22px;
  }
  /* 数据 */
  .nums{
    flex-direction: row;
  }
  .num{
    flex: 1; justify-content: center; align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .num-num{font-size: 35px;}
  .num-title{font-size: 18px;color: grey;}
  /* 画客信息 */
  .info-title{
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    border-bottom-style: dashed ;
    margin-bottom: 40px;
  }
  .info-title-text{
    font-size: 25px; color: grey;
    transform: translate(0, 18px);
    background-color: #fff;
  }
  .info{
    color: grey;
    font-size: 22px;
  }
  /* 展开-收起按钮 */
  .slide-btn{
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  /* 作品 */
  .works{
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .slider{
    width: 650px;
    height: 400px;
  }
  .sliderFrame{
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 650px;
    height: 400px;
  }
  .sliderImg{
    width: 305px;
    height: 180px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .prev-work{
    position: absolute;
    left: 10px;
    top: 194px;
    width: 50px; height: 50px;
  }
  .next-work{
    position: absolute;
    right: 10px;
    top: 194px;
    width: 50px; height: 50px;
  }
  /* 留言 */
  .say-title{
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-bottom-color: grey;
    border-top-color: grey;
    background-color: #f5f5f5;
    height: 80px;
  }
  .say-title-text{
    font-size: 22px;
    color: grey;
  }
  .say{
    flex-direction: row;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
  }
  .say-avatar{
    border-radius: 50%;
    width: 60px; height: 60px;
  }
  .say-input{
    width: 650px;
    height: 60px;
    border-width: 1px;
    border-radius: 30px;
    margin-left: 20px;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 22px;
  }
  /* 服务 */
  .services{
    background-color: #f2f2f2;
  }
  /* 底部导航 */
  .nav{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 1500px;
    height: 100px;
    flex-direction: row;
    background-color: #fff;
  }
  .nav1, .nav2{
    flex-direction: row;
    width: 750px;
    height: 100px;
    justify-content: space-between;
    align-items: center;
  }
  .ul1, .ul2{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .link1, .link2{
    width: 160px;
    height: 100px;
    justify-content: center;
    align-items: center;
  }
  .next-nav, .prev-nav{
    width: 100px;
    height: 100px;
    justify-content: center;
    align-items: center;
  }
  .link-img{
    width: 40px;
    height: 30px;
  }
  .link-text{
    font-size: 30px;
    color: #fff;
  }
  .nav-right-btn{
    width: 50px;
    height: 50px;
  }
  .link2{
    background-color: #1a68ac;
    margin-left: 1px;
  }
</style>
