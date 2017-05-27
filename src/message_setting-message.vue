<template>
  <div>
    <scroller class="main">
      <div class="reminds">
        <div class="remind" v-for="(remind,index) in remindData" @click="selectRemind(index)">
          <div class="left">
            <text>{{remind.info}}</text>
          </div>
          <div class="right">
            <text class="remind-state">{{remindTypes[remind.state]}}</text>
            <img :src="picRoot+'right.png'" class="right-img" />
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="提醒设置"></sub-header>
    <selector2 v-if="showSelect" :items="remindTypes" @select="confirmSelect" @cancel="cancelSelect"></selector2>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import selector2 from './components/selector2.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        remindTypes: ['即时提醒','每日提醒','每周提醒'],
        remindData: [
          {
            info: '有人发布了跟我有关的需求',
            state: 0
          },
          {
            info: '有人访问了我的空间',
            state: 0
          },
          {
            info: '有人对我感兴趣',
            state: 0
          },
          {
            info: '有人回复了我',
            state: 0
          },
          {
            info: '有人给我留言',
            state: 0
          },
          {
            info: '跟我有关的新人加入',
            state: 0
          }
        ],
        showSelect: false,
        curSelect: 0
      }
    },
    methods: {
      fetchData () {
        return getData('getMsgSetting', {
          id: 1
        })
      },
      onrefresh () {
        this.fetchData().then(res => {
          this.remindData[0].state = res.data.require
          this.remindData[1].state = res.data.space
          this.remindData[2].state = res.data.like
          this.remindData[3].state = res.data.reply
          this.remindData[4].state = res.data.message
          this.remindData[5].state = res.data.new
        })
      },
      selectRemind (index) {
        this.curSelect = index
        this.showSelect = true
      },
      confirmSelect (typeIndex) {
        this.remindData[this.curSelect].state = typeIndex
        this.showSelect = false
        // 提交服务器
      },
      cancelSelect () {
        this.showSelect = false
      }
    },
    mounted () {
      this.onrefresh()
    },
    components: {
      subHeader, selector2
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    width: 750px;
    top: 100px;
    left: 0;
    bottom: 0;
  }
  .reminds{
    
  }
  .remind{
    padding-top: 30px;
    padding-bottom: 30px;
    padding-left: 20px;
    padding-right: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .remind-state{
    font-size: 25px;
    color: grey;
  }
  .right{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .right-img{
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
</style>