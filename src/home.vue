<template>
  <div>
    <!-- 设计师列表 -->
    <list class="main" @loadmore="onloading" loadmoreoffset="10">
      <refresh @refresh="onrefresh" :display="refreshing" style="justify-content:center;align-items:center;">
        <text style="font-size: 30px;padding-top: 20px;">正在刷新数据...</text>
      </refresh>
      <cell class="designer" v-for="designer in designersData" >
        <div class="designer-info">
          <img class="designer-avatar" :src="designer.avatar" @click="goToDesigner(designer.designerid)"/>
          <div class="info">
            <div style="flex-direction: row;">
              <text class="name">{{designer.name}}&nbsp;</text>
              <img v-if="designer.sex === 0" :src="picRoot+'male.png'" style="width:30px; height: 30px;" />
              <img v-if="designer.sex === 1" :src="picRoot+'female.png'" style="width:30px; height: 30px;" />
            </div>
            <text class="num" style="fontSize: 25px;margin-top: 5px;">{{designer.exp}}年经验|{{designer.works}}作品|{{designer.likes}}人喜欢</text>  
          </div>
          <div class="designer-sort">
            <img v-if="sortState === 1" :src="picRoot+'location.png'" style="width:20px; height: 20px;" />
            <img v-if="sortState === 2" :src="picRoot+'hot.png'" style="width:20px; height: 20px;" />
            <img v-if="sortState === 3" :src="picRoot+'clock.png'" style="width:20px; height: 20px;" />
            <text v-if="sortState === 1" style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;距离：{{designer.distance}}</text>
            <text v-if="sortState === 2" style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;{{designer.new}}</text>
            <text v-if="sortState === 3" style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;{{designer.hot}}</text>
          </div>
        </div>
        <div class="designer-tags">
          <img :src="picRoot+'idea.png'" style="width:20px; height: 20px;" />
          <text class="tag-contents" style="fontSize: 25px;line-height: 40px;">{{designer.tags.join('，')}}</text>
        </div>
        <div class="designer-works">
          <img v-for="pic in designer.pics" class="work" :src="pic" />
        </div>
      </cell>
      <loading :display="showloading" style="justify-content:center;align-items: center;">
        <text style="font-size: 30px;padding-bottom: 20px;">正在加载数据...</text>
      </loading>
    </list>
    <!-- header， 比main层级高，放下面 -->
    <div class="header" >
      <!-- 背景图片 -->
      <img ref="bg" :src="picRoot+'bg.png'" style="position: absolute; top: 0; left: 0;width: 750px; height: 325px;" resize="stretch"/>
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
        <div class="header-sort" style="position: relative;">
          <div class="sort" style="position: absolute; top: 0;justify-content: center;">
            <div v-for="(sort,index) in sortItems" v-if="index === 0 || showSort " class="circle" @click="selectSort(index)" style="background-color: #3e9bd7;border-color: #3e9bd7;">
              <text  style="color: #fff;font-size: 28px;" v-if="sort.name" >{{sort.name}}</text>
              <img v-if="!sort.name" :src="picRoot+'menu-white.png'" style="width:30px; height: 30px;"/>
            </div> 
          </div>
          <div v-if="!showSort" class="text" style="margin-top: 100px;justify-content: flex-start;align-items: center;" @click="toggleFilters">
            <img ref="arrow" :src="picRoot + 'double-down-white.png'" style="width: 30px; height: 30px;"/>
          </div>
        </div>
        <!-- 筛选：各种类型 -->
        <div class="header-filters" ref="filters">
          <div v-for="(filter,index) in filterItems" class="item" v-if="index <5 || showMoreFilter" @click="selectFilter(index)">
            <div v-if="filter.selected" class="circle" style="background-color: #3e9bd7; border-color: #3e9bd7;"  :key="'filter'+ filter.selected + index">
              <img :src="picRoot + filter.src" style="width:50px; height: 50px;" />
            </div>
            <div v-if="!filter.selected" class="circle" @click="selectFilter(index)" :key="'filter'+ filter.selected + index">
              <img :src="picRoot + filter.src" style="width:50px; height: 50px;" />
            </div>
            <div class="text">
              <text style="font-size: 16px; text-align: center;color: #fff;line-height: 60px;">{{filter.name}}</text>
            </div>
          </div>
        </div>
        <div class="header-add">
          <div class="add item" @click="addFilter">
            <div class="circle"><img :src="picRoot + 'plus-white.png'" style="width:50px; height: 50px;" /></div>
            <div class="text"><text style="font-size: 18px; text-align: center;color: #fff;line-height: 60px;">添加</text></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主导航 -->
    <mainTab :selectedIndex="0"></mainTab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')
  const animation = weex.requireModule('animation')

  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        refreshing: 'hide',
        showloading: 'hide',
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        sort: '距离',
        showSort: false,
        sortItems: [
          {name: '距离', class: '', state: 1},
          {name: '最新', class: '', state: 2}, 
          {name: '最热', class: '', state: 3}, 
          {name: '', class: 'icon icon-menu', state: 0}
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
        designersData: []
      }
    },
    computed: {
      sortState () {
        return this.sortItems[0].state
      },
      filters () {
        let arr = []
        this.filterItems.forEach((item) => {
          if (item.selected) arr.push(item.name)
        })
        return arr
      }
    },
    mounted () {
      this.onrefresh()
    },
    methods: {
      fetchData () {
        return getData('getDesignersList', {
          id: 1, page: 1, perpage: 5,
          sort: this.sortState,
          filters: this.filters
        })
      },
      onrefresh () {
        this.refreshing = 'show'
        this.fetchData().then((res) => {
          this.designersData = []
          this.designersData = res.data
          this.refreshing = 'hide'
        })
      },
      onloading () {
        this.showloading = 'show'
        this.fetchData().then((res) => {
          res.data.forEach((designer) => {
            this.designersData.push(designer)
          })
          this.showloading = 'hide'
        })
      },
      selectSort (index) {
        this.showSort = !this.showSort
        if (index === 0) return false
        this.sort = this.sortItems[index].name
        this.sortItems.unshift(this.sortItems.splice(index, 1)[0])
        this.onrefresh()
      },
      selectFilter (index) {
        let filter = this.filterItems[index]
        filter.selected = !filter.selected
        this.onrefresh()
      },
      toggleFilters () {
        const bg = this.$refs.bg
        const arrow = this.$refs.arrow
        this.showMoreFilter = !this.showMoreFilter
        let flag = this.showMoreFilter
        animation.transition(bg, {
          styles: {
            height: flag ? '450px' : '325px'
          },
          duration: 200,
          timingFunction: 'ease',
          delay: 0
        }, () => {
          animation.transition(arrow, {
            styles: {
              transform: flag ? 'rotate(180deg)' : 'rotate(0deg)'
            },
            duration: 200,
            timingFunction: 'ease',
            delay: 0
          })
        })
      },
      goToDesigner (designerid) {
        jump ('designer.js', {'id': designerid})
      },
      addFilter () {
        jump('home_add.js')
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
  .icon-search,
  .icon-user{
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
    justify-content: flex-start;
    align-items: center;
    width: 80px;
    margin-bottom: 20px;
  }
  .header-filters{
    flex: 5;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
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
    font-size: 10px;
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
  .designer-sort{
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