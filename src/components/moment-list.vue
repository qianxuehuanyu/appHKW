<template v-if="listdata">
  <div>
    <div v-for="(data,index) in listdata" class="person" key="index">
      <!-- 头像、位置信息 -->
      <div class="person-header">
        <img class="person-avatar" :src="data.avatar" @click="goToDesigner(data.designerid)"/>
        <div class="info">
          <div style="flex-direction: row;">
            <text class="name">{{data.name}}&nbsp;</text>
            <img v-if="data.sex === 0" :src="picRoot + 'male.png'" style="width: 30px; height: 30px;"/>
            <img v-if="data.sex === 1" :src="picRoot + 'female.png'" style="width: 30px; height: 30px;"/>
          </div>
          <text class="job" style="fontSize: 20px;color: #999;">{{data.job}} {{data.corp}}</text>  
        </div>
        <div class="person-location" v-if="data.city">
          <text class="icon icon-location" style="color: #999; font-size: 25px;"></text>
          <text style="color: #999; font-size: 22px; line-height: 30px;">&nbsp;{{data.city}}</text>
        </div>
      </div>
      <div class="person-main" :style="{'padding-left': mainLeft}">
        <!-- 消息内容 -->
        <div class="person-saying">
          <text style="fontSize: 20px;color: #f00;" v-if="data.subject"> [{{data.subject}}] </text>
          <text style="fontSize: 20px;flex-wrap: wrap;color: #777;">{{data.content}}</text>
        </div>
        <!-- 照片 -->
        <div class="photos" v-if="data.pics">
          <div class="photo" v-for="pic in data.pics">
            <img :src="pic"  style="width: 220px; height: 220px;" resize="stretch"/>
          </div>
        </div>
        <!-- 时间、按钮 -->
        <div class="vote-header">
          <text class="grey small">{{formtime(data.time)}}</text>
          <div class="right-btns">
            <img v-if="data.ilike" :src="picRoot + 'heart-fill-blue.png'" @click="togglelike(index)" style="width: 20px; height: 20px;" :key="'like'+index"/>
            <img v-if="!data.ilike" :src="picRoot + 'heart.png'" @click="togglelike(index)" style="width: 20px; height: 20px;" :key="'dislike'+index"/>
            <text class="small" v-if="data.likes">{{data.likes.length}}</text>
            <text>&nbsp;</text>
            <img :src="picRoot + 'message.png'" style="width: 20px; height: 20px;" @click="say"/>
            <text class="small" v-if="data.messages">{{data.messages.length}}</text>
            <div class="shangsanjiao"></div>
          </div>
        </div>
        <!-- 点赞的人 -->
        <div class="like-people" v-if="data.likes">
          <img :src="picRoot + 'heart-blue.png'" style="width: 18px; height: 18px;"/>
          <text class="small blue">&nbsp;{{data.likes.join('，')}}</text>
        </div>
        <!-- 回复消息 -->
        <div class="msglist" v-if="data.messages" :key="'comment'+index">
          <div class="row" v-for="(comment,index) in data.messages" v-if="index < 5 || !data.foldComment">
            <!-- weex不存在行内元素，分开多个text并设置父元素flex-direction: row时，段落不换行 -->
            <text class="small">{{comment.from}}{{comment.to?' 回复':''}}{{comment.to}}：{{comment.text}}</text>
          </div>
          <div class="showMore" v-if="data.messages.length > 5" @click="toggleComment(index)">
            <text class="small blue center" :key="'unfoldComment'+index" v-if="data.foldComment">查看全部{{data.messages.length}}条评论</text>
            <text class="small blue center" :key="'foldComment'+index" v-if="!data.foldComment">收起评论</text>
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
  import config from '../common/config.js'

  import {formatDate, passtime} from '../common/util.js'
  import {jump} from '../common/util.js'

  export default {
    props: {
      listdata: Array,
      type: String
    },
    data () {
      return {
        now: new Date().getTime(),
        picRoot: config.picRoot
      }
    },
    computed: {
      mainLeft () {
        if (this.type === 'moment') return '0px'
        return '80px'
      }
    },
    methods: {
      toggleComment (index) {
        let data = this.listdata[index]
        data.foldComment = !data.foldComment
      },
      formtime (time) {
        if (this.type === 'moment' || 'designer') return passtime(time)
        return formatDate(time, 'MM-dd')
      },
      togglelike (index) {
        let data = this.listdata[index]
        if (data.ilike) {
          data.ilike = false
          // 从likes列表删除当前name
          data.likes = data.likes.filter((like) => {
            return like !== data.name
          })
          
        } else {
          data.ilike = true
          data.likes.push(data.name)
        }
        // 提交更新到服务器
      },
      say () {

      },
      goToDesigner (designerid) {
        jump ('designer.js?id=' + designerid)
      }
    }
  }
</script>

<style scoped>
  .person{
    padding-top: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom-width: 10px;
    border-bottom-color: #eee;
    padding-bottom: 20px;
  }
  .person-header{
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
    width: 220px;
    height: 220px;
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