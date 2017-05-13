<template>
  <div>
    <!-- <sub-header title="设计师主页"></sub-header> -->
    <list class="main" @loadmore="onloading" loadmoreoffset="10">
      <!-- refresh -->
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <!-- 画客圈数据 -->
      <moment-list :listdata="momentsData" type="moment"></moment-list>
      <!-- loading -->
      <loading :display="showloading" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </list>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import momentList from './components/moment-list.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        refreshing: 'hide',
        showloading: 'hide',
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        designerData: {},
        momentsData: []
      }
    },
    computed: {
      
    },
    methods: {
      fetchData () {
        return getData('getMomentsList', {
          id: 1, page: 1, perpage: 5
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          this.momentsData = []
          this.momentsData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          this.formData(res.data)
          res.data.forEach((moment) => {
            this.momentsData.push(moment)
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
      }
    },
    mounted () {
      this.onloading()
    },
    components: {
      subHeader, momentList
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 80px;
    bottom: 100px;
    left: 0;
    width: 750px;
  }
  /* 内容 */
  .content{
  }
  .person{
    
  }
</style>
