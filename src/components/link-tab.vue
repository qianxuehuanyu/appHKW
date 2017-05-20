<template>
  <div class="tab-nav">
    <div class="tab-item" v-for="item in items" @click="goTo(item.url)">
      <div style="position: relative;">
        <div :style="{
            'background-color': item.bgColor,
            'border-radius': radius,
            'width': itemWidth,
            'height': itemWidth,
            'justify-content': 'center',
            'align-items': 'center',
            'margin-bottom': '10px' 
          }">
          <img :src="item.src" :style="{
              width: item.width,
              height: item.width
            }"/>
        </div>
        <div class="tab-num" v-if="showNum">
          <text style="color: #fff;  font-size: 18px;">{{item.num>100?'100+':item.num}}</text>
        </div>
      </div>
      <text class="tab-name">{{item.name}}</text>
    </div>
  </div>
</template>

<script>
  import {getBaseUrl, jump} from '../common/util.js'
  import config from '../common/config.js'

  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot
      }
    },
    props: {
      items: Array,
      itemWidth: {
        type: String,
        default: '80px'
      },
      radius: {
        type: [String, Number],
        default: '50%'
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goTo (url) {
        jump(url)
      }
    }
  }
</script>
  
<style scope>
  .tab-nav{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 750px;
  }
  .tab-num{
    position: absolute; 
    top: 5px; 
    right: -10px; 
    border-radius: 16px;
    background-color: #f00;
    padding-top: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
    padding-left: 5px;
  }
  .tab-name{
    font-size: 25px;
    color: grey;
    text-align: center;
  }
</style>