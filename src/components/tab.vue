<template>
  <div class="tab-nav">
    <div class="tab-item" v-for="item in items" @click="jump(item.url)">
      <div style="position: relative">
        <text :class="['icon', item.icon]" :style="{
            'background-color': item.bgColor,
            'font-size': item.size,
            'border-radius': radius,
            'color': '#fff',
            'width': itemWidth,
            'height': itemWidth,
            'line-height': itemWidth,
            'text-align': 'center',
            'margin-bottom': '10px' 
          }"></text>
          <div class="tab-num" v-if="showNum">
            <text style="color: #fff;  font-size: 18px;">{{item.num>100?'100+':item.num}}</text>
          </div>
      </div>
      <text class="tab-name">{{item.name}}</text>
    </div>
  </div>
</template>

<script>
  import {setBundleUrl} from '../common/util.js'
  const navigator = weex.requireModule('navigator')

  export default {
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
      jump (url) {
        const baseurl = this.$getConfig().bundleUrl
        navigator.push({
          url: setBundleUrl(baseurl, url)
        })
      }
    }
  }
</script>
  
<style scope>
  .tab-nav{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  .tab-num{
    position: absolute; 
    top: 5px; 
    right: -10px; 
    border-radius: 50%;
    background: #f00;
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