<template>
  <div class="ul" v-if="listdata">
    <div v-for="(li, index) in listdata" class="li" @click="toggleSelected(index)">
      <div class="li-header">
        <div class="circle" >
          <div class="check-circle" :key="'checked'+index" v-if="li.checked" style="background-color: #000;"></div>
        </div>
        <text class="title">{{li.title}}</text>
        <text v-if="type === 'price'" class="edit" @click="edit(index)">编辑</text>
      </div>
      <div class="li-main">
        <text class="desc">{{li.desc}}</text>
      </div>
      <div class="li-footer">
        <text class="price">{{li.price}}元/{{li.unit}}</text>
        <div class="buy-num" v-if="li.checked">
          <text class="num-plus" @click="plus(index)">+</text>
          <text class="num-num">{{li.num}}</text>
          <text class="num-minus" @click="minus(index)">-</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      listdata: Array,
      type: String
    },
    computed: {
      cart () {
        return this.listdata.filter((item) => {
          return item.checked === true
        })
      }
    },
    data () {
      return {
      }
    },
    methods: {
      toggleSelected (index) {
        let li = this.listdata[index]
        li.checked = !li.checked
        this.$emit('sendCart', this.cart)
      },
      minus (index) {
        let li = this.listdata[index]
        if (li.num === 1) return false
        li.num--
        this.$emit('sendCart', this.cart)
      },
      plus (index) {
        let li = this.listdata[index]
        li.num++
        this.$emit('sendCart', this.cart)
      },
      edit (index) {
        this.$emit('edit', index)
      }
    }
  }
</script>

<style scoped>
  .ul{
    padding-bottom: 50px;
  }
  .li{
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #fff;
  }
  .li-header{
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-color: grey;
    padding-top: 10px;
    padding-bottom: 10px;
    position: relative;
  }
  .circle{
    width: 25px;
    height: 25px;
    border-radius: 13px;
    background-color: #ddd;
    border-width: 1px;
    border-color: #000;
    position: relative;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 3px;
  }
  .check-circle{
    position: absolute;
    width: 15px;
    height: 15px;
    top: 4px;
    left: 4px;
    border-radius: 10px;
  }
  .title{
    font-size: 30px;
    color: #409ad6;
  }
  .li-main{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .desc{
    color: grey;
    font-size: 22px;
  }
  .li-footer{
    flex-direction: row;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;
  }
  .price{
    font-size: 30px;
    color: #409ad6;
  }
  .buy-num{
    flex-direction: row;
    border-width: 1px;
    width: 150px;
    height: 40px;
  }
  .num-plus, .num-minus{
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  .num-num{
    border-left-width: 1px;
    border-right-width: 1px;
    flex: 1.5;
    justify-content: center;
    align-items: center;
    font-size: 22px;
  }
  .edit{
    position: absolute;
    right: 20px;
    font-size: 25px;
  }
</style>