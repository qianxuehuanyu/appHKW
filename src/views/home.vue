<template>
  <div>
    <div class="header">
      <div class="header-top">
        <text class="location">滨江区长河路351...</text>
        <div class="more">
          <img class="search" src="http://t.cn/RGE3AJt" style="width: 40px; height: 40px; border-radius: 50%;"/>
          <img class="person" src="http://t.cn/RGE3AJt" style="width: 40px; height: 40px; border-radius: 50%;"/>
        </div>
      </div>
      <div class="header-filters">
        <div class="distance item">
          <div class="circle"><text style="color: #fff;">距离</text> </div> 
          <div class="text more-filters" ><text style="font-size: 40px; text-align: center;color: #fff;">&raquo;</text></div>
        </div>
        <div v-for="item in items" class="item">
          <div class="circle">
            <img class="" src="http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png" style="width: 30px; height: 30px;"/>
          </div>
          <div class="text">
            <text style="font-size: 20px; text-align: center;color: #fff;">{{item}}</text>
          </div>
        </div>
        <div class="add item">
          <div class="circle"><text style="color: #fff; font-size: 80px;">+</text></div>
          <div class="text"><text style="font-size: 20px; text-align: center;color: #fff;">添加</text></div>
        </div>
      </div>
    </div>
    <list class="main" @loadmore="fetch" loadmoreoffset="10">
      <cell class="designer" v-for="designer in lists">
        <div class="designer-info">
          <img class="designer-avatar" src="http://www.huakewang.com/uploads/2013/1018/20131018235643643644_thumb.jpg" />
          <div class="info">
            <div style="flex-direction: row;">
              <text class="name">wadeyao</text>
              <img class="sex" src="http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png" style="width: 30px; height: 30px;"/>  
            </div>
            <text class="num">8年经验|10作品|31231人喜欢</text>  
          </div>
          <div class="designer-location">
            <img src="http://gtms01.alicdn.com/tps/i1/TB1qw.hMpXXXXagXXXX9t7RGVXX-46-46.png" style="width: 30px; height: 30px;"/>
            <text style="color: #999; font-size: 22px;">距离：200M</text>
          </div>
        </div>
        <div class="designer-tags">
          <text>平面设计师，界面设计师，交互设计师，GUI设计，极简主义，热爱设计...</text>
        </div>
        <div class="designer-works">
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002345161039_thumb.jpg" />
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002301555207_thumb.jpg" />
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002222610112_thumb.jpg" />
          <img class="work" src="http://www.huakewang.com/uploads/2013/1031/20131031002147100933_thumb.jpg" />
        </div>
      </cell>
    </list>
    <main-tab></main-tab>
  </div>
</template>

<script>
  import mainTab from '../components/main-tab.vue'

  const modal = weex.requireModule('modal')
  const LOADMORE_COUNT = 4

  export default {
    data () {
      return {
        items: ['平面设计', '网站设计', '界面设计', '工业设计', '室内设计'],
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
      }
    },
    components: {
      mainTab
    }
  }
</script>

<style scope>
  /* header */
  .header{
    width: 100%;
    height: 280px;
    background: #1d205a;
    position: fixed;
    z-index: 1;
    top: 0;
  }
  .header-top{
    height: 80px;
    width: 100%;
    justify-content: center;
    flex-direction: row;
    position: relative;
    justify-content: space-around;
    align-items: center;
  }
  .location{
    color: #fff;
  }
  .more{
    position: absolute;
    right: 20px;
    top: 0;
    flex-direction: row;
    height: 80px;
    width: 100px;
    justify-content: space-around;
    align-items: center;
  }
  .header-filters{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 25px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .item{
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 120px;
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
    height: 40px;
    margin-top: 20px;
  }
  .more-filters{
    transform: rotate(90deg)
  }
  /* main */
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
</style>