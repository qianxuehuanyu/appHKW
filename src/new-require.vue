<template>
  <div>
    <scroller class="main">
      <div class="input">
        <textarea class="textarea" placeholder="请填写您的需求..." @input="oninput" ref="textarea"></textarea>
        <!-- 拍照上传需要去weex-market -->
        <div class="add">
          <img :src="picRoot+'plus.png'" style="width:80px; height: 80px;"/>
        </div>
        <div class="line"></div>
      </div>
      <div class="links">
        <div class="link" @click="selectArea">
          <text class="left">地点</text>
          <div class="right">
            <text class="right-text">山景路365号</text>
            <img :src="picRoot+'right.png'" class="right-img" />
          </div>
        </div>
        <div class="link" @click="selectField">
          <text class="left">领域</text>
          <div class="right">
            <text class="right-text">插画设计</text>
            <img :src="picRoot+'right.png'" class="right-img" />
          </div>
        </div>
        <div class="link" @click="selectBudget">
          <text class="left">预算</text>
          <div class="right">
            <text class="right-text">{{budget}}</text>
            <img :src="picRoot+'right.png'" class="right-img" />
          </div>
        </div>
      </div>
    </scroller>
    <sub-header title="发需求">
      <text style="margin-top: 10px;margin-right:10px;">确定</text>
    </sub-header>
    <selector v-if="showBudget" :items="budgetItems" @cancelSelect="cancelBudget" @confirmSelect="confirmBudget"></selector>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import selector from './components/selector.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const dom = weex.requireModule('dom')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        showBudget: false,
        budgetItems: ['当面交谈', '一万元以内', '五万元以内', '十万元以内', '十五万元以内'],
        budget: '当面交谈'
      }
    },
    methods: {
      oninput () {

      },
      selectArea () {
        jump('locate.js')
      },
      selectField () {
        jump('select-field.js')
      },
      selectBudget () {
        this.showBudget = true
      },
      cancelBudget () {
        this.showBudget = false
      },
      confirmBudget (budget) {
        this.budget = budget
        this.showBudget = false
      }
    },
    components: {
      subHeader, selector
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
    background-color: #eee;
  }
  .input{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #fff;
  }
  .textarea{
    font-size: 30px;
    height: 300px;
  }
  .add{
    width: 120px;
    height: 120px;
    border-width: 1px;
    border-color: grey;
    border-style: dashed;
    justify-content: center;
    align-items: center;
  }
  .line{
    height: 1px;
    margin-top: 20px;
    background-color: #000;
  }
  .link{
    flex-direction: row;
    width: 750px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    margin-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .left{
    font-size: 30px;
  }
  .right{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .right-text{
    font-size: 30px;
  }
  .right-img{
    width: 30px;
    height: 30px;
    margin-left: 20px;
  }
</style>