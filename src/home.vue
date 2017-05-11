<template>
  <div>
    <!-- 设计师列表 -->
    <list class="main" @loadmore="fetch" loadmoreoffset="10">
      <cell class="designer" v-for="designer in lists">
        <div class="designer-info">
          <img class="designer-avatar" src="http://www.huakewang.com/uploads/2013/1018/20131018235643643644_thumb.jpg" />
          <div class="info">
            <div style="flex-direction: row;">
              <text class="name">wadeyao&nbsp;</text>
              <img :src="picRoot+'male.png'" style="width:30px; height: 30px;" />
            </div>
            <text class="num" style="fontSize: 25px;margin-top: 5px;">8年经验|10作品|31231人喜欢</text>  
          </div>
          <div class="designer-location">
            <img :src="picRoot+'location.png'" style="width:20px; height: 20px;" />
            <text style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;距离：200M</text>
          </div>
        </div>
        <div class="designer-tags">
          <img :src="picRoot+'idea.png'" style="width:20px; height: 20px;" />
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
    <!-- header， 比main层级高，放下面 -->
    <div class="header" >
      <!-- 背景图片 -->
      <img :src="picRoot+'bg.png'" style="position: absolute; top: 0; left: 0;width: 750px; height: 350px;" resize="stretch"/>
      <!-- 顶部地址及按钮 -->
      <div class="header-top">
        <img :src="picRoot + 'location-white.png'" style="width:30px; height: 30px;" />
        <text class="location">&nbsp;滨江区长河路351...</text>
        <div class="more">
          <img :src="picRoot + 'search-white.png'" style="width:30px; height: 30px;border-radius: 15px;border-color: blue;border-width: 1px;" />
          <img :src="picRoot + 'user-white.png'" style="width:30px; height: 30px;border-radius: 15px;border-color: blue;border-width: 1px;" />
        </div>
      </div>
      <div class="header-main" >
        <!-- 排序： 距离/最新/最热 -->
        <div class="header-sort">
          <div class="item" style="position: relative;">
            <div class="sort" style="position: absolute; top: 0;overflow:hidden;">
              <div v-for="(sort,index) in sortItems" v-if="index === 0 || showSort " class="circle" :class="'sort'+index" style="background: #3e9bd7;border-color: #3e9bd7;" key="index" @click="selectSort(index)">
                <text  style="color: #fff;font-size: 28px;" v-if="sort.name" >{{sort.name}}</text>
                <img v-if="!sort.name" :src="picRoot+'menu-white.png'" style="width:30px; height: 30px;"/>
              </div> 
            </div>
            <div class="text" :class="{'fold': showMoreFilter}" style="margin-top: 80px;transition: all 0.5s ease;justify-content: center;align-items: center;" @click="toggleFilters">
              <img :src="picRoot+'double-down-white.png'" style="width: 30px; height: 30px;"/>
            </div>
          </div>
        </div>
        <!-- 筛选：各种类型 -->
        <div class="header-filters" :class="{'unfolder-filters': showMoreFilter}">
          <div v-for="(filter,index) in filterItems" class="item" >
            <div v-if="filter.selected" class="circle" style="background-color: #3e9bd7; border-color: #3e9bd7;" @click="selectFilter(index)" :key="'filter'+ filter.selected + index">
              <img :src="picRoot + filter.src" style="width:50px; height: 50px;" />
            </div>
            <div v-if="!filter.selected" class="circle" @click="selectFilter(index)" :key="'filter'+ filter.selected + index">
              <img :src="picRoot + filter.src" style="width:50px; height: 50px;" />
            </div>
            <div class="text">
              <text style="font-size: 20px; text-align: center;color: #fff;line-height: 60px;">{{filter.name}}</text>
            </div>
          </div>
        </div>
        <div class="header-add">
          <div class="add item">
            <div class="circle"><img :src="picRoot + 'plus-white.png'" style="width:50px; height: 50px;" /></div>
            <div class="text"><text style="font-size: 20px; text-align: center;color: #fff;line-height: 60px;">添加</text></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主导航 -->
    <mainTab :selectedIndex="0"></mainTab>
  </div>
</template>

<script>

  import {getBaseUrl, jump} from './common/util.js'
  import mainTab from './components/main-tab.vue'
  import config from './common/config.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
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
            src: 'design-pingmian-white.png',
            selected: false
          },
          {
            name: '网站设计',
            src: 'design-web-white.png',
            selected: false
          },
          {
            name: '界面设计',
            src: 'design-jiemian-white.png',
            selected: false
          }, 
          {
            name: '工业设计',
            src: 'design-gongye-white.png',
            selected: false
          }, 
          {
            name: '室内设计',
            src: 'design-shinei-white.png',
            selected: false
          },
          {
            name: '互联网设计',
            src: 'design-hulianwang-white.png',
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
    components: {
      mainTab
    }
  }
</script>

<style scoped>

  /* header */
  .header{
    width: 750px;
    /*overflow: hidden;*/
    position: fixed;
    top: 0;
    left: 0;
    padding-bottom: 50px;
    background-repeat: no-repeat;
    background-size: cover; 
  }
  .header-top{
    height: 80px;
    width: 750px;
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
    border-radius: 23px;
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
    width: 750px;
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
    transform: translateY(100px) rotate(180deg);
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
    border-radius: 40px;
    border-color: #fff;
    justify-content: center;
    align-items: center;
  }
  .text{
    width: 80px;
    height: 60px;
  }
  .active-filter{
    background-color: #3e9bd7;
    border-color: #3e9bd7;
  }
  .more-filters{
    transform: rotate(90deg);
  }
  /* main 设计师列表 */
  .main{
    position: fixed;
    width: 750px;
    top: 325px;
    left: 0;
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
    border-radius: 40px;
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
    width: 300px;
    height: 200px;
    margin-bottom: 20px;
  }
</style>