<template>
  <div class="tab-nav">
    <template v-for="(item,index) in tabItems">
      <div class="tab-item" v-if="index === tabIndex" :style="{'border-bottom-width': '5px'}" @click="selectTab(index)">
        <text class="item-text" style="color: #000;font-weight: bold;">{{item}}</text>
      </div>
      <div class="tab-item" v-else @click="selectTab(index)">
        <text class="item-text" style="color: grey;">{{item}}</text>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      tabItems: Array,
      tabIndex: Number
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
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .item-text{
    font-size: 25px;
  }
</style>
