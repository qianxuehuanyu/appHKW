<template>
  <div>
    <div class="header" >
      <!-- 顶部地址及按钮 -->
      <div class="header-top">
        <text class="icon icon-location"></text>
        <text class="location">&nbsp;滨江区长河路351...</text>
        <div class="more">
          <text class="icon icon-search"></text>
          <text class="icon icon-user"></text>
        </div>
      </div>
      <div class="header-main" >
        <!-- 排序： 距离/最新/最热 -->
        <div class="header-sort">
          <div class="item" style="position: relative;">
            <div class="sort" style="position: absolute; top: 0;z-index: 1;overflow:hidden;">
              <transition-group name="sort-slidedown">
                <div v-for="(sort,index) in sortItems" v-show="index === 0 || showSort " class="circle" :class="'sort'+index" style="background: #3e9bd7;border-color: #3e9bd7;" key="index">
                  <text  style="color: #fff;font-size: 28px;" :class="sort.class" @click="selectSort(index)">{{sort.name}}</text>
                </div> 
              </transition-group>
            </div>
            <div class="text" :class="{'fold': showMoreFilter}" style="margin-top: 80px;transition: all 0.5s ease;" @click="toggleFilters"><text class="icon icon-double-down" style="text-align: center;color: #fff;line-height: 60px;"></text></div>
          </div>
        </div>
        <!-- 筛选：各种类型 -->
        <div class="header-filters" :class="{'unfolder-filters': showMoreFilter}">
          <div v-for="(filter,index) in filterItems" class="item" >
            <div class="circle" :class="{'active-filter': filter.selected}" @click="selectFilter(index)" >
              <text class="icon" :class="filter.icon" style="color: #fff; font-size: 50px;"></text>
            </div>
            <div class="text">
              <text style="font-size: 20px; text-align: center;color: #fff;line-height: 60px;">{{filter.name}}</text>
            </div>
          </div>
        </div>
        <div class="header-add">
          <div class="add item">
            <div class="circle"><text class="icon icon-add" style="color: #fff; font-size: 80px;"></text></div>
            <div class="text"><text style="font-size: 20px; text-align: center;color: #fff;line-height: 60px;">添加</text></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 设计师列表 -->
    <list class="main" @loadmore="fetch" loadmoreoffset="10">
      <cell class="designer" v-for="designer in lists">
        <div class="designer-info">
          <img class="designer-avatar" src="http://www.huakewang.com/uploads/2013/1018/20131018235643643644_thumb.jpg" />
          <div class="info">
            <div style="flex-direction: row;">
              <text class="name">wadeyao&nbsp;</text>
              <text class="icon icon-male" style="color: #88bcde;font-size: 35px;"></text>
            </div>
            <text class="num" style="fontSize: 25px;margin-top: 5px;">8年经验|10作品|31231人喜欢</text>  
          </div>
          <div class="designer-location">
            <text class="icon icon-location" style="color: #999; font-size: 25px;"></text>
            <text style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;距离：200M</text>
          </div>
        </div>
        <div class="designer-tags">
          <text class="icon icon-idea2" style="color: #b6d4df; margin-right: 15px;margin-top: 5px;"></text>
          <text class="tag-contents" style="fontSize: 25px;line-height: 40px;">平面设计师，界面设计师，交互设计师，GUI设计，极简主义，热爱设计...</text>
        </div>
        <div class="designer-works">
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002345161039_thumb.jpg" />
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002301555207_thumb.jpg" />
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002222610112_thumb.jpg" />
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002147100933_thumb.jpg" />
        </div>
      </cell>
    </list>
    <!-- 导航栏 -->
    <main-tab :selectedIndex="0"></main-tab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'
  import {getBaseURL} from './common/util.js'

  const modal = weex.requireModule('modal')
  const event = weex.requireModule('event')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        sort: '距离',
        showSort: false,
        sortItems: [
          {name: '距离', class: ''},
          {name: '最新', class: ''}, 
          {name: '最热', class: ''}, 
          {name: '', class: 'icon icon-menu'}
        ],
        showMoreFilter: false,
        filterItems: [
          {
            name: '平面设计',
            icon: 'icon-design8',
            selected: false
          },
          {
            name: '网站设计',
            icon: 'icon-net',
            selected: false
          },
          {
            name: '界面设计',
            icon: 'icon-design1',
            selected: false
          }, 
          {
            name: '工业设计',
            icon: 'icon-design6',
            selected: false
          }, 
          {
            name: '室内设计',
            icon: 'icon-home',
            selected: false
          },
          {
            name: '互联网设计',
            icon: 'icon-home',
            selected: false
          }
        ],
        showLoading: false,
        lists: [1, 2, 3, 4, 5]
      }
    },
    methods: {
      fetch (e) {
        modal.toast({message: 'loading', duration: 1})
        setTimeout(() => {
          const length = this.lists.length
          for (let i = length; i < length + LOADMORE_COUNT; i++) {
            this.lists.push(i+1)
          }
        }, 1000);
      },
      jump (url) {
        let base = getBaseURL(weex)
        event.openURL(base + url)
      },
      selectSort (index) {
        this.showSort = !this.showSort
        if (index === 0) return false
        this.sort = this.sortItems[index].name
        this.sortItems.unshift(this.sortItems.splice(index, 1)[0])
      },
      selectFilter (index) {
        let filter = this.filterItems[index]
        filter.selected = !filter.selected
      },
      toggleFilters () {
        this.showMoreFilter = !this.showMoreFilter
      }
    },
    /* 引入字体图标ttf */
    created () {
      var domModule = weex.requireModule('dom')
      domModule.addRule('fontFace', {
        'fontFamily': 'iconfont',
        'src': 'url(//at.alicdn.com/t/font_nvmf3cs5umrvygb9.ttf)'
      })
    },
    components: {
      mainTab
    }
  }
</script>

<!-- 引入字体图标样式 -->
<style src="./common/fonts/iconfont.css"></style>

<style scope>

  /* header */
  .header{
    width: 100%;
    /*overflow: hidden;*/
    background: #1d205a;
    position: fixed;
    z-index: 1;
    top: 0;
    padding-bottom: 50px;
  }
  .header-top{
    height: 80px;
    width: 100%;
    margin-top: 10px;
    justify-content: center;
    flex-direction: row;
    position: relative;
    justify-content: center;
    align-items: center;
  }
  .location{
    color: #fff;
    font-size: 40px;
  }
  .icon-location{
    color: #fff;
    font-size: 25px;
    margin-top: 5px;
  }
  .more{
    position: absolute;
    right: 20px;
    top: 0;
    flex-direction: row;
    height: 80px;
    width: 120px;
    justify-content: space-around;
    align-items: center;
  }
  .icon-search,.icon-user{
    border-radius: 50%;
    border-width: 1px;
    border-color: #fff;
    font-size: 25px;
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
  }
  .header-main{
    flex-direction: row;
    align-items: flex-start;
    padding-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .header-sort{
    flex: 1;
    justify-content: space-around;
    align-items: center;
  }
  .fold{
    transform: translateY(160px) rotate(180deg);
  }
  .header-filters{
    flex: 5;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    height: 130px;
    transition: all 0.5s linear;
  }
  .unfolder-filters{
    height: 280px;
  }
  .header-add{
    flex: 1;
    justify-content: space-around;
    align-items: center;
  }
  .sort{
    position: relative;
    transition: all 0.5s ease;
  }
  .sort0{
    position: relative;
    z-index: 2;
  }
  .item{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 140px;
    padding-left: 50px;
    padding-right: 50px;
    margin-bottom: 20px;
  }
  .circle{
    width: 80px;
    height: 80px;
    border-width: 1px;
    border-radius: 50%;
    border-color: #fff;
    justify-content: center;
    align-items: center;
  }
  .text{
    width: 80px;
    height: 60px;
  }
  .active-filter{
    background: #3e9bd7;
    border-color: #3e9bd7;
  }
  .more-filters{
    transform: rotate(90deg)
  }
  /* main 设计师列表 */
  .main{
    position: fixed;
    width: 100%;
    top: 280px;
    bottom: 100px;
  }
  .designer{
    box-sizing: border-box;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .designer-info{
    border-bottom-width: 1px;
    border-bottom-color: #999;
    flex-direction: row;
    position: relative;
    padding-bottom: 20px;
  }
  .designer-avatar{
    width: 80px; height: 80px;
    border-radius: 50%;
  }
  .info{
    padding-left: 20px;
  }
  .designer-location{
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: row;
  }
  .designer-tags{
    padding-top: 10px;
    padding-bottom: 10px;
    flex-direction: row;
  }
  .tag-contents{
    flex: 1;
  }
  .designer-works{
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
  }
  .work{
    width: 45%;
    height: 200px;
    margin-bottom: 20px;
  }
  /* 过渡 */
  .sort-slidedown-enter,.sort-slidown-leave-active{
    transform: translateY(-80px);
  }
  .sort-slidedown-enter-active,.sort-slidown-leave-active{
    transition: all 0.2s linear;
  }
</style>