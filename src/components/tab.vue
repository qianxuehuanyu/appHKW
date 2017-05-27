<template>
  <div class="tab-nav">
    <template v-for="(item,index) in tabItems">
      <div class="tab-item" v-if="index === tabIndex" :style="{'border-bottom-width': '5px', 'border-bottom-color': color}" @click="selectTab(index)">
        <text class="item-text" :style="{'color': color, 'font-weight': 'bold'}">{{item}}</text>
      </div>
      <div class="tab-item" v-else :style="{'border-bottom-width': '0px'}" @click="selectTab(index)">
        <text class="item-text" style="color: grey;">{{item}}</text>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      tabItems: Array,
      tabIndex: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: 'black'
      }
    },
    methods: {
      selectTab (index) {
        this.$emit('select', index)
      }
    }
  }
  
</script>

<style scoped>
  .tab-nav{
    width: 750px;
    height: 100px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .tab-item{
    flex: 1;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .item-text{
    font-size: 25px;
  }
</style>
