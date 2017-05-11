<template>
  <div>
    <div class="header">
      <text>画客圈</text>
    </div>
    <list class="main">
      <!-- 轮播图 -->
      <cell style="width: 750px;">
        <slider class="slider" interval="3000" auto-play="true">
          <div class="sliderFrame" v-for="img in sliderList">
            <img class="sliderImg" resize="cover" :src="img" /> 
          </div>
          <indicator class="indicator"></indicator>
        </slider>
      </cell>
      <!-- tab： 项目、帖子、作品、活动 -->
      <cell style="width: 750px;">
        <tab class="nav" :items="linkList" itemWidth="80px" radius="30px" :showNum="true"></tab>
      </cell>
      <!-- 画客圈数据 -->
      <template v-if="momentsData.length > 0">
        <cell v-for="(moment,index) in momentsData" class="person" key="index">
          <!-- 头像、位置信息 -->
          <div class="person-info">
            <img class="person-avatar" :src="moment.avatar" />
            <div class="info">
              <div style="flex-direction: row;">
                <text class="name">{{moment.name}}&nbsp;</text>
                <img v-if="moment.sex === 0" :src="picRoot + 'male.png'" style="width: 30px; height: 30px;"/>
                <img v-if="moment.sex === 1" :src="picRoot + 'female.png'" style="width: 30px; height: 30px;"/>
              </div>
              <text class="job" style="fontSize: 20px;color: #999;">{{moment.job}} {{moment.corp}}</text>  
            </div>
            <div class="person-location">
              <text class="icon icon-location" style="color: #999; font-size: 25px;"></text>
              <text style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;{{moment.city}}</text>
            </div>
          </div>
          <!-- 消息内容 -->
          <div class="person-saying">
            <text style="fontSize: 20px;color: #f00;" v-if="moment.subject"> [{{moment.subject}}] </text>
            <text style="fontSize: 20px;flex-wrap: wrap;color: #777;">{{moment.content}}</text>
          </div>
          <!-- 照片 -->
          <div class="photos">
            <div class="photo" v-for="pic in moment.pics">
              <img :src="pic"  style="width: 160px; height: 160px;" resize="cover"/>
            </div>
          </div>
          <!-- 时间、按钮 -->
          <div class="vote-header">
            <text class="grey small">{{passtime(moment.time)}}</text>
            <div class="right-btns">
              <img v-if="moment.ilike" :src="picRoot + 'heart-fill-blue.png'" @click="togglelike(index)" style="width: 20px; height: 20px;" :key="'like'+index"/>
              <img v-if="!moment.ilike" :src="picRoot + 'heart.png'" @click="togglelike(index)" style="width: 20px; height: 20px;" :key="'dislike'+index"/>
              <text class="small">{{moment.likes.length}}</text>
              <text>&nbsp;</text>
              <img :src="picRoot + 'message.png'" style="width: 20px; height: 20px;"/>
              <text class="small">{{moment.message.length}}</text>
              <div class="shangsanjiao"></div>
            </div>
          </div>
          <!-- 点赞的人 -->
          <div class="like-people" v-if="moment.likes.length>0">
            <img :src="picRoot + 'heart-blue.png'" style="width: 18px; height: 18px;"/>
            <text class="small blue">&nbsp;{{moment.likes.join('，')}}</text>
          </div>
          <!-- 回复消息 -->
          <div class="msglist" v-if="moment.message.length > 0">
            <div class="row" v-for="(comment,index) in moment.message" v-if="index < 5 || !foldComment">
              <!-- weex不存在行内元素，分开多个text并设置父元素flex-direction: row时，段落不换行 -->
              <text class="small">{{comment.from}}{{comment.to?' 回复':''}}{{comment.to}}：{{comment.text}}</text>
            </div>
            <div class="showMore" v-if="moment.message.length > 5" @click="toggleComment">
              <text class="small blue center" v-if="foldComment">查看全部{{moment.message.length}}条评论</text>
              <text class="small blue center" v-if="!foldComment">收起评论</text>
            </div>
          </div>
        </cell>  
      </template>
    </list>
    <mainTab :selectedIndex="1"></mainTab>
  </div>
</template>

<script>
  import tab from './components/tab.vue'
  import mainTab from './components/main-tab.vue'

  import {getBaseUrl, jump} from './common/util.js'
  import config from './common/config.js'
  import {getData} from './common/api.js'

  const modal = weex.requireModule('modal')
  const navigator = weex.requireModule('navigator')

  export default {
    data () {
      return {
        baseUrl: getBaseUrl(),
        picRoot: config.picRoot,
        sliderList: [
          'http://pic2.ooopic.com/13/58/87/63bOOOPICb3_1024.jpg',
          'http://pic.58pic.com/58pic/13/56/99/88f58PICuBh_1024.jpg',
          'http://img.zcool.cn/community/01919f5754de1d32f875a429805139.jpg@900w_1l_2o_100sh.jpg'
        ],
        linkList: [
          {
            name: '项目',
            src: config.picRoot + 'xiangmu.png',
            num: '45',
            width: '45px',
            bgColor: '#f4c021',
            url: ''
          },
          {
            name: '贴子',
            src: config.picRoot + 'tiezi.png',
            num: '123',
            width: '45px',
            bgColor: '#3dc077',
            url: ''
          },
          {
            name: '作品',
            src: config.picRoot + 'zuopin.png',
            num: '56',
            width: '45px',
            bgColor: '#409ad6',
            url: ''
          },
          {
            name: '活动',
            src: config.picRoot + 'huodong.png',
            num: '11',
            width: '45px',
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
    mounted () {
      /* 获取数据 */
      getData('getMoments', {
        id: 1, page: 1, perpage: 5
      }, (res) => {
        // 加moment.ilike属性
        res.data.forEach((moment) => {
          moment.ilike = moment.likes.some((name) => {
            return name === moment.name
          })
        })
        this.momentsData = res.data
      }),
      this.nowtime = new Date().getTime()
    },
    components: {
      tab, mainTab
    }
  }
</script>

<style scoped>
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
    width: 750px;
  }
  /* slider */
  .slider{
    width: 750px;
    height: 160px;
    justify-content: center;
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
    padding-top: 40px;
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
