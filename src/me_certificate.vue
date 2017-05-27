<template>
  <div>
    <scroller class="main">
      <div class="header">
        <div class="avatar">
          <img :src="certificateData.avatar" class="avatar-img" />
          <text class="avatar-text" v-if="!certificateData.avatar">编辑头像</text>
        </div>
        <div class="types">
          <div class="type" v-for="(type,index) in types" @click="toggleType(index)">
            <div class="circle" >
              <div class="check-circle" :key="'checked'+index" v-if="index === certificateData.type" style="background-color: #000;"></div>
            </div>
            <text>{{types[index]}}</text>
          </div>
        </div>
      </div>
      <div class="infos">
        <div class="table">
          <div class="name">
            <div class="left">
              <text>昵&emsp;&emsp;称</text>
            </div>
            <div class="right">
              <text>{{certificateData.name}}</text>
            </div>
          </div>
          <div class="gender">
            <div class="left">
              <text>性&emsp;&emsp;别</text>
            </div>
            <div class="right">
              <div class="sex" v-for="(sex,index) in sexs" @click="toggleSex(index)">
                <div class="circle" >
                  <div class="check-circle" :key="'checked'+index" v-if="certificateData.sex === index" style="background-color: #000;"></div>
                </div>
                <text>{{sexs[index]}}</text>
              </div>
            </div>
          </div>
          <div class="exp" @click="selectExp">
            <div class="left">
              <text>工作年限</text>
            </div>
            <div class="right" >
              <text>{{expItems[certificateData.exp]}}</text>
              <img :src="picRoot+'edit.png'" class="edit-img" />
            </div>
          </div>
          <div class="education" @click="selectEducation">
            <div class="left">
              <text>最高学历</text>
            </div>
            <div class="right" >
              <text>{{educationItems[certificateData.education]}}</text>
              <img :src="picRoot+'edit.png'" class="edit-img" />
            </div>
          </div>
        </div>
      </div>
      <div class="field-of-training">
        <div class="field-header">
          <text>擅长领域</text>
          <text @click="selectField">选择领域</text>
        </div>
        <div class="fields">
          <div class="field" v-for="field in certificateData.fields">
            <text class="field-text">{{field}}</text>
          </div>
        </div>
      </div>
      <div class="works">
        <div class="work" v-for="work in certificateData.works" @click="goToWork(work.workid)">
          <text class="work-title">{{work.title}}</text>
          <img :src="work.pic" class="work-img" />
        </div>
      </div>
    </scroller>  
    <sub-header title="认证设计师">
      <text class="submit" @click="submit">提交</text>
    </sub-header>
    <selector v-if="showExp" :items="expItems" @cancelSelect="cancelExp" @confirmSelect="confirmExp"></selector>
    <selector v-if="showEducation" :items="educationItems" @cancelSelect="cancelEducation" @confirmSelect="confirmEducation"></selector>
  </div>
</template>

<script>
  import subHeader from './components/sub-header.vue'
  import selector from './components/selector.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        picRoot: config.picRoot,
        types: ['设计师','工作室/机构'],
        sexs: ['男','女'],
        user: {},
        expItems: ['1年', '2年', '3年', '4年', '5年', '6年', '7年', '8年', '9年', '10年以上'],
        showExp: false,
        educationItems: ['高中', '大专', '本科', '硕士', '博士'],
        showEducation: false,
        certificateData: {}
      }
    },
    mounted () {
      storage.getItem('user', e => {
        this.user = JSON.parse(e.data)
        this.fetchData()
      })
    },
    methods: {
      fetchData () {
        getData('getCertificate', {
          id: this.user.id
        }).then(res => {
          this.certificateData = res.data
          storage.getItem('fields', e => {
            if (e.result === 'failed') return false
            this.certificateData.fields = JSON.parse(e.data)
          })
        })
      },
      submit () {
        // 提交服务器
        // 提交成功
        // 
        // 假设审核马上通过
        this.user.certificated = true
        storage.setItem('user', JSON.stringify(this.user), e => {
          jump('submit-result.js', {
            submit: 'success'
          })
        })
      },
      toggleType (index) {
        if (index === this.certificateData.type) return false
        this.certificateData.type = index
      },
      toggleSex (index) {
        if (index === this.certificateData.sex) return false
        this.certificateData.sex = index
      },
      selectExp () {
        this.showExp = true
      },
      selectEducation () {
        this.showEducation = true
      },
      cancelExp () {
        this.showExp = false
      },
      cancelEducation () {
        this.showEducation = false
      },
      confirmExp (index) {
        this.certificateData.exp = index
        this.showExp = false
      },
      confirmEducation (index) {
        this.certificateData.education = index
        this.showEducation = false
      },
      selectField () {
        jump('select-field.js')
      },
      goToWork (workid) {
        // jump
      }
    },
    components: {
      subHeader, selector
    }
  }
</script>

<style scoped>
  /* 提交 */
  .submit{
    font-size: 25px;
    padding-top: 15px;
    padding-right: 10px;
    padding-left: 10px;
    padding-bottom: 10px;
  }
  .main{
    position: fixed;
    top: 100px;
    left: 0;
    bottom: 0;
    width: 750px;
    background-color: #eee;
  }
  /* 选中 */
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
  .header{
    background-color: #fff;
    margin-bottom: 20px;
  }
  /* 头像 */
  .avatar{
    justify-content: center;
    align-items: center;
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .avatar-img{
    border-width: 1px;
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .avatar-text{
    position: absolute;
    font-size: 25px;
    width: 50px;
  }
  /* 选择认证类型 */
  .types{
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .type{
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /* 个人信息 */
  .infos{
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  .table{
    border-top-width: 1px;
    border-left-width: 1px;
    border-right-width: 1px;
  }
  .name{
    flex-direction: row;
    border-bottom-width: 1px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .gender{
    flex-direction: row;
    border-bottom-width: 1px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .sex{
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 200px;
    justify-content: flex-start;
  }
  .exp{
    flex-direction: row;
    border-bottom-width: 1px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .education{
    flex-direction: row;
    border-bottom-width: 1px;
    padding-top: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .left{
    width: 200px;
    justify-content: center;
    align-items: center;
  }
  .right{
    flex-direction: row;
    flex: 1;
  }
  .edit-img{
    position: absolute;
    width: 30px;
    height: 30px;
    right: 20px;
  }
  /* 擅长领域 */
  .field-of-training{
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  .field-header{
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .fields{
    flex-direction: row;
    flex-wrap: wrap;
  }
  .field{
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 20px;
    padding-right: 20px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #409ad6;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
  }
  .field-text{
    font-size: 22px;
    color: #fff;
  }
  /* 作品 */
  .works{}
  .work{
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .work-title{
    font-size: 25px;
    font-weight: bold;
    padding-bottom: 20px;
  }
  .work-img{
    width: 90px;
    height: 90px;
    border-width: 1px;
  }
</style>