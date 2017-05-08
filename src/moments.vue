<template>
  <div>
    <div class="header">
      <text>画客圈</text>
    </div>
    <list class="main">
      <slider class="slider" interval="3000" auto-play="true">
        <div class="sliderFrame" v-for="img in sliderList">
          <img class="sliderImg" resize="cover" :src="img" /> 
        </div>
        <indicator class="indicator"></indicator>
      </slider>  
      <tab class="nav" :items="linkList" itemWidth="80px" radius="30px" :showNum="true"></tab>
      <div class="content">
        <cell v-for="(moment,index) in momentsData" class="person">
          <div class="person-info">
            <img class="person-avatar" :src="moment.avatar" />
            <div class="info">
              <div style="flex-direction: row;">
                <text class="name">{{moment.name}}&nbsp;</text>
                <text :class="['icon', {'icon-male': moment.sex === 0}, {'icon-female': moment.sex === 1}]" style="font-size: 33px"></text>
              </div>
              <text class="job" style="fontSize: 20px;color: #999;">{{moment.job}} {{moment.corp}}</text>  
            </div>
            <div class="person-location">
              <text class="icon icon-location" style="color: #999; font-size: 25px;"></text>
              <text style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;{{moment.city}}</text>
            </div>
          </div>
          <div class="person-saying">
            <text style="fontSize: 20px;color: #f00;" v-if="moment.subject"> [{{moment.subject}}] </text>
            <text style="fontSize: 20px;flex-wrap: wrap;color: #777;">{{moment.content}}</text>
          </div>
          <div class="photos">
            <div class="photo" v-for="pic in moment.pics">
              <img :src="pic"  style="width: 160px; height: 160px;" resize="cover"/>
            </div>
          </div>
          <div class="vote-header">
            <text class="grey small">{{passtime(moment.time)}}</text>
            <div class="right-btns">
              <text :class="['icon', {'icon-heart': !moment.ilike}, {'icon-heart-fill': moment.ilike}]" style="font-size: 20px; line-height: 25px;" @click="togglelike(index)"></text>
              <text class="small">{{moment.likes.length}}</text>
              <text>&nbsp;</text>
              <text class="icon icon-message" style="font-size: 20px;"></text>
              <text class="small">{{moment.message.length}}</text>
              <div class="shangsanjiao"></div>
            </div>
          </div>
          <div class="like-people" v-show="moment.likes.length > 0">
            <text class="icon icon-heart blue" style="font-size: 25px;">&nbsp;</text>
            <text class="small blue">{{moment.likes.join('，')}}</text>
          </div>
          <div class="msglist" v-show="moment.message.length > 0">
            <div class="row" v-for="(comment,index) in moment.message" v-show="index < 5 || !foldComment">
              <!-- weex不存在行内元素，分开多个text并设置父元素flex-direction: row时，段落不换行 -->
              <text class="small">{{comment.from}}{{comment.to?' 回复':''}}{{comment.to}}：{{comment.text}}</text>
            </div>
            <div class="showMore" v-show="moment.message.length > 5" @click="toggleComment">
              <text class="small blue center" v-show="foldComment">查看全部{{moment.message.length}}条评论</text>
              <text class="small blue center" v-show="!foldComment">收起评论</text>
            </div>
          </div>
        </cell>  
      </div>
    </list>  
    <!-- 导航栏 -->
    <main-tab :selectedIndex="1"></main-tab>
  </div>
</template>

<script>
  import mainTab from './components/main-tab.vue'
  import tab from './components/tab.vue'
  import {setBundleUrl} from './common/util.js'
  import {iconfont} from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')
  const domModule = weex.requireModule('dom')

  export default {
    data () {
      return {
        sliderList: [
          'dist/' + require('./img/slider1.png'),
          'dist/' + require('./img/slider1.png'),
          'dist/' + require('./img/slider1.png')
        ],
        linkList: [
          {
            name: '项目',
            icon: 'icon-upload',
            size: '35px',
            num: '45',
            bgColor: '#f4c021',
            url: ''
          },
          {
            name: '贴子',
            icon: 'icon-msg',
            size: '40px',
            num: '123',
            bgColor: '#3dc077',
            url: ''
          },
          {
            name: '作品',
            icon: 'icon-cup',
            size: '45px',
            num: '56',
            bgColor: '#409ad6',
            url: ''
          },
          {
            name: '活动',
            icon: 'icon-flag',
            size: '35px',
            num: '11',
            bgColor: '#31408f',
            url: ''
          }
        ],
        momentsData: [],
        foldComment: true,
        nowtime: ''
      }
    },
    computed: {
    },
    methods: {
      jump (url) {
        const baseurl = this.$getConfig().bundleUrl
        navigator.push({
          url: setBundleUrl(baseurl, url)
        })
      },
      toggleComment () {
        this.foldComment = !this.foldComment
      },
      passtime (time) {
        let delta = (this.nowtime - new Date(time)) / 60000 << 0
        if (delta > 60*24*365) return Math.floor(delta / 525600) + '年前'
        if (delta > 60*24*30) return Math.floor(delta / 43200) + '月前'
        if (delta > 60*24) return Math.floor(delta / 1440) + '天前'
        if (delta > 60) return Math.floor(delta / 60) + '小时前'
        return delta + '分钟前'
      },
      togglelike (index) {
        let moment = this.momentsData[index]
        if (moment.ilike) {
          moment.ilike = false
          // 从likes列表删除当前name
          moment.likes = moment.likes.filter((like) => {
            return like !== moment.name
          })
          
        } else {
          moment.ilike = true
          moment.likes.push(moment.name)
        }
        // 提交更新到服务器
      }
    },
    created () {
      /* 引入字体图标ttf */
      domModule.addRule('fontFace', {
        'fontFamily': 'iconfont',
        'src': 'url(' + iconfont + ')'
      })
      /* 获取数据 */
      getData('getMoments', {
        id: 1, page: 1, perpage: 5
      }, (res) => {
        this.momentsData = res.data
      }),
      this.nowtime = new Date().getTime()
    },
    components: {
      mainTab, tab
    }
  }
</script>

<!-- 引入字体图标样式 -->
<style src="./fonts/iconfont.css"></style>
<style src="./common/common.css"></style>

<style scope>
  /* 头部标题 */
  .header{
    position: fixed;
    height: 80px;
    width: 750px;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #000;
  }

  .main{
    position: fixed;
    top: 80px;
    bottom: 100px;
    left: 0;
    width: 100%;
  }
  /* slider */
  .slider{
    width: 750px;
    height: 160px;
    justify-content: flex-end;
    align-items: center;
  }
  .sliderFrame{
    position: relative;
    width: 750px;
    height: 160px;
  }
  .sliderImg{
    width: 750px;
    height: 160px;
  }
  .indicator{
    item-color: grey;
    item-selected-color: white;
    item-size: 20px;
    padding-bottom: 25px;
  }
  /* nav */
  .nav{
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom-width: 10px;
    border-bottom-color: #eee;
  }
  /* 内容 */
  .content{
  }
  .person{
    box-sizing: border-box;
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-width: 10px;
    border-bottom-color: #eee;
    padding-bottom: 20px;
  }
  .person-info{
    flex-direction: row;
    position: relative;
  }
  .person-avatar{
    width: 60px; height: 60px;
    border-radius: 50%;
  }
  .info{
    padding-left: 20px;
  }
  .person-location{
    position: absolute;
    top: 0;
    right: 0;
    flex-direction: row;
  }
  .photos{
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
  }
  .photo{
    width: 160px;
    height: 160px;
    background: #ccc;
    margin-right: 20px;
    margin-top: 20px;
  } 
  /* 评论 */
  .vote-header{
    border-bottom-width: 1px;
    border-bottom-color: grey;
    border-bottom-style: dashed;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 10px;
    position: relative;
  }
  .right-btns{
    flex-direction: row;
    justify-content: space-around;
    width: 120px;
  }
  .shangsanjiao{
    position: absolute;
    width: 15px;
    height: 15px;
    border-top-color: grey;
    border-left-color: grey;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-width: 1px;
    transform: translateY(40px) rotate(45deg);
    background: #fff;
  }
  .like-people{
    margin-top: 10px;
    flex-direction: row;
  }
  .row{
    /*flex-direction: row;*/
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .showMore{

  }
  .center{
    text-align: center;
  }
  .small{
    font-size: 20px;
  }
  .blue{
    color: #409ad6;
  }
  .grey{
    color: #999;
  }
  

</style>
