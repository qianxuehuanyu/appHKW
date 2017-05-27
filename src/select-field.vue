<template>
  <div>
    <scroller class="main">
      <div class="type" v-for="type in fieldTypes">
        <div class="type-title">
          <text class="type-text">{{type.title}}</text>
        </div>
        <div class="fields">
          <template v-for="field in type.fields">
            <div class="field" v-if="!field.checked" @click="toggleCheck(field)">
              <text class="field-text">{{field.name}}</text>
            </div>
            <div class="field" v-if="field.checked" style="background-color: #409ad6;" @click="toggleCheck(field)">
              <text class="field-text" style="color: #fff;">{{field.name}}</text>
            </div>
          </template>
        </div>
      </div>
    </scroller>
    <subHeader title="选择领域"></subHeader>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        fieldTypes: [
          {
            title: '产品设计',
            fields: [
              {name: '外观设计', checked: false},
              {name: '外观设计', checked: false},
              {name: '外观设计', checked: false},
              {name: '外观设计', checked: false}
            ]
          },
          {
            title: '空间设计',
            fields: [
              {name: '轻装设计', checked: false},
              {name: '工装设计', checked: false},
              {name: '家装设计', checked: false},
              {name: '美陈设计', checked: false},
              {name: '专卖店设计', checked: false}
            ]
          },
          {
            title: '互联网设计',
            fields: [
              {name: '交互设计', checked: false},
              {name: '界面设计', checked: false},
              {name: '网页设计', checked: false},
              {name: '专题活动', checked: false},
              {name: '专卖店设计', checked: false}
            ]
          },
          {
            title: '平面设计',
            fields: [
              {name: '交互设计', checked: false},
              {name: '界面设计', checked: false},
              {name: '网页设计', checked: false},
              {name: '专题/活动', checked: false}
            ]
          }
        ]
      }
    },
    computed: {
      selectedFields () {
        let arr = []
        this.fieldTypes.forEach((type) => {
          type.fields.forEach((field) => {
            if (field.checked) arr.push(field.name)
          })
        })
        return arr
      }
    },
    methods: {
      toggleCheck (field) {
        field.checked = !field.checked
        storage.setItem('fields', JSON.stringify(this.selectedFields))
      }
    },
    mounted () {
      storage.getItem('fields', e => {
        if (e.result === 'failed') return false
        let data = JSON.parse(e.data)
        this.fieldTypes.forEach(type => {
          type.fields.forEach(field => {
            data.forEach(item => {
              if (item === field.name) field.checked = true
            })
          })
        })
      })
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .main{
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 750px;
    background-color: #eee;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .type{
    border-bottom-width: 1px;
    border-bottom-color: grey;
  }
  .type-title{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .type-text{
    font-size: 32px;
    font-weight: bold;
  }
  .fields{
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 20px;
  }
  .field{
    border-width: 1px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    border-radius: 10px;
  }
  .field-text{
    font-size: 25px;
  }
</style>