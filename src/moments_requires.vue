<template>
  <div>
    <scroller class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 需求 -->
      <moment-list :listdata="requiresData" type="require"></moment-list>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </scroller>
    <sub-header title="需求">
      <img :src="picRoot+'location.png'" style="width: 35px; height: 35px;margin-top: 10px;margin-right: 20px;"/>
      <img :src="picRoot+'clock.png'" style="width: 40px; height: 40px;margin-top: 10px;margin-right: 20px;"/>
    </sub-header>  
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import momentList from './components/moment-list.vue'

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
        showloading: 'hide',
        picRoot: config.picRoot,
        requiresData: []
      }
    },
    methods: {
      fetchData () {
        return getData('getRequiresList', {
          id: 1, page: 1, perpage: 5
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          this.requiresData = []
          this.requiresData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          res.data.forEach((moment) => {
            this.requiresData.push(moment)
          })
          this.showloading = 'hide'
        })
      },
      formData (data) {
        data.forEach((item) => {
          item.foldComment = true
          item.ilike = item.likes.some((name) => {
            return name === item.name
          })
        })
      },
      goToDesigner (designerid) {
        jump ('designer.js?id=' + designerid)
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader, momentList
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    width: 750px;
  }
</style>