<template>
  <div>
    <scroller class="main">
      <div class="services" v-if="tabIndex === 0">
        <div class="header">
          <text class="header-text">选择您为客户提供的服务</text>
        </div>
        <buy-list :listdata="services" type="price" @sendCart="getCart" @edit="editService"></buy-list>
        <div class="add-service">
          <div class="add-service-btn" @click="addService">
            <text>添加服务</text>
          </div>
        </div>
        <buy-footer :cart="cart" type="price" ></buy-footer>
      </div>
      <div class="projects" v-if="tabIndex === 1">
        <div class="header">
          <text class="header-text">选择一个项目作为报价模版</text>
        </div>
        <div class="history-price">
          <div class="history-header">
            <text class="header-text">历史报价</text>
            <text class="header-text">收起</text>
          </div>
          <div class="history-items">
            <div class="history-item" v-for="history in historyItems">
              <text class="history-item-text">{{history}}</text>
            </div>
          </div>
        </div>
        <div class="hot-template">
          <div class="hot-header">
            <text class="header-text">热门模板推荐</text>
            <text class="header-text">搜索</text>
          </div>
          <div class="hot-list">
            <div class="hot" v-for="hot in hotList">
              <div class="hot-circle">
                <img class="hot-img" :src="hot.img" />
              </div>
              <div class="hot-text">
                <text class="hot-title">{{hot.title}}</text>
                <text class="hot-desc">{{hot.desc}}</text>
              </div>
            </div>
          </div>
        </div>
        <div class="jump-btn">
          <text class="jump-btn-text" @click="jumpTemplate">跳过</text>
        </div>
      </div>
    </scroller>
    <sub-header title="云报价"></sub-header>
    <div class="nav">
      <tab :tabItems="tabItems" :tabIndex="tabIndex" @select="setTab"></tab>
    </div>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import tab from './components/tab.vue'
  import buyList from './components/buy-list.vue'
  import buyFooter from './components/buy-footer.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        refreshing: 'hide',
        picRoot: config.picRoot,
        tabItems: ['服务', '项目'],
        tabIndex: 0,
        services: [],
        historyItems: [],
        cart: [],
        id: 123,
        hotList: [
          {img: config.picRoot + 'dingzhi1.png', title: '艺术绘画', desc: '名片 海报 画册 封面 所装 标实'},
          {img: config.picRoot + 'dingzhi2.png', title: '品牌设计', desc: '网页 banner 网店装修 商城'},
          {img: config.picRoot + 'dingzhi3.png', title: '互联网设计', desc: '用户体验 icon图标 界面 原型'},
          {img: config.picRoot + 'dingzhi4.png', title: '产品设计', desc: 'flash制作 视频制作 宣传片'},
          {img: config.picRoot + 'dingzhi5.png', title: '空间设计', desc: '工业外观 结构设计 产品设计'}
        ]
      }
    },
    methods: {
      setTab (index) {
        this.tabIndex = index
      },
      fetchData () {
        return getData('getPrice', {
          id: this.id
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          this.services = res.data.services
          this.historyItems = res.data.history
          this.refreshing = 'hide'
        })
      },
      formData (data) {
        data.services.forEach((item) => {
          item.checked = false
          item.num = 1
        })
      },
      getCart (cart) {
        this.cart = cart
      },
      addService () {
        storage.removeItem('addService')
        jump('add-service.js')
      },
      editService (index) {
        let obj = {}
        obj.index = index
        obj.service = this.services[index]
        obj = JSON.stringify(obj)
        storage.setItem('addService', obj)
        jump('add-service.js')
      },
      jumpTemplate () {

      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader, tab, buyList, buyFooter
    }
  }
</script>

<style scoped>
  .nav{
    position: fixed; 
    top: 100px;
  }
  .main{
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    width: 750px;
    background-color: #f2f2f2;
  }
  .header{
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #eee;
  }
  .header-text{
    font-size: 25px;
    color: #777;
  }
  /* 添加服务 */
  .add-service{
    justify-content: center;
    align-items: center;
    width: 750px;
  }
  .add-service-btn{
    width: 280px;
    height: 50px;
    background-color: #fff;
    border-width: 1px;
    border-color: grey;
    border-radius: 25px;
    justify-content: center;
    align-items: center;
  }
  /* 历史报价 */
  .history-price{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .history-header{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .history-items{
    flex-direction: row;
    flex-wrap: wrap;
  }
  .history-item{
    background-color: #ddd;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
    border-radius: 30px;
  }
  .history-item-text{
    font-size: 25px;
  }
  .header-text{
    font-size: 22px;
  }
  /* 热门模板推荐 */
  .hot-template{
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .hot-header{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .hot-list{
  }
  .hot{
    flex-direction: row;
    border-top-width: 1px;
    border-top-style: dashed;
    border-top-color: #ddd;
    padding-top: 10px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .hot-circle{
    padding-right: 20px;
  }
  .hot-img{
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .hot-title{
    font-size: 30px;
  }
  .hot-desc{
    color: #999;
    font-size: 25px;
    padding-top: 15px;
  }
  /* 跳过 */
  .jump-btn{
    position: fixed;
    bottom: 20px;
    justify-content: center;
    align-items: center;
    width: 750px;
  }
  .jump-btn-text{
    font-size: 30px;
    padding-left: 80px;
    padding-right: 80px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #fff;
    background-color: #00c0dd;
    border-radius: 6px;
  }
</style>