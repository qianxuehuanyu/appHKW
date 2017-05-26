<template>
  <div class="selector" >
    <div class="header">
      <text @click="cancelSelect">取消</text>
      <text @click="confirmSelect">确定</text>
    </div>
    <div class="main" :class="{'dragging': dragging}" @panstart="_onTouchStart">
      <div class="wrapper" ref="wrapper" :style="{
      'transform': 'translate(0,'+ translateY +'px)',
      'transition-duration': transitionDuration + 'ms'
    }" >
        <div class="item" v-for="item in items">
          <text style="font-size: 26px;">{{item}}</text>
        </div>
      </div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
  import subHeader from '../components/sub-header.vue'

  import {getBaseUrl, jump} from '../common/util.js'
  import config from '../common/config.js'

  const storage = weex.requireModule('storage')
  const animation = weex.requireModule('animation')
  const navigator = weex.requireModule('navigator')

  export default {
    props: {
      items: Array
    },
    data () {
      return {
        picRoot: config.picRoot,
        speed: 500,
        currentItem: 2,
        lastItem: 2,
        translateY: 0,
        startTranslate: 0,
        delta: 0,
        dragging: false,
        startPos: null,
        slideEls: [],
        translateOffset: 0,
        transitionDuration: 0
      }
    },
    mounted () {
      this._onTouchMove = this._onTouchMove.bind(this)
      this._onTouchEnd = this._onTouchEnd.bind(this)
    },
    methods: {
      _onTouchStart (e) {
        this.startPos = this._getTouchPos(e)
        console.log(e)
        this.delta = 0
        this.startTranslate = this.translateY
        this.startTime = new Date().getTime()
        this.dragging = true
        this.transitionDuration = 0
        document.addEventListener('touchmove', this._onTouchMove, false)
        document.addEventListener('touchend', this._onTouchEnd, false)
        document.addEventListener('mousemove', this._onTouchMove, false)
        document.addEventListener('mouseup', this._onTouchEnd, false)
      },
      _onTouchMove (e) {
        this.delta = this._getTouchPos(e) - this.startPos
        this._setTranslate(this.startTranslate + this.delta)
        this.$emit('slider-move', this._getTranslate())
        if (Math.abs(this.delta) > 0) {
          e.preventDefault()
        }
      },
      _onTouchEnd (e) {
        this.dragging = false
        this.transitionDuration = this.speed
        let num = Math.round(this.delta / 55)
        this.currentItem -= num
        if (this.currentItem < 0) this.currentItem = 0
        if (this.currentItem > this.items.length) this.currentItem = this.items.length - 1
        this._setItem(this.currentItem)

        document.removeEventListener('touchmove', this._onTouchMove)
        document.removeEventListener('touchend', this._onTouchEnd)
        document.removeEventListener('mousemove', this._onTouchMove)
        document.removeEventListener('mouseup', this._onTouchEnd)
      },
      _getTouchPos (e) {
        let key = 'pageY'
        return e.changedTouches ? e.changedTouches[0][key] : e[key]
      },
      _isItemChanged () {
        return this.lastItem !== this.currentItem
      },
      _setTranslate (value) {
        let length = this.items.length
        let min = -55 * (length - 3)
        if (value > 110) value = 110
        if (value < min) value = min
        let translateName = 'translateY'
        this[translateName] = value
      },
      _getTranslate () {
        let translateName = 'translateY'
        return this[translateName]
      },
      _setItem (item) {
        this.translateY = -(this.currentItem - 2) * 55
      },
      cancelSelect () {
        this.$emit('cancelSelect')
      },
      confirmSelect () {
        this.$emit('confirmSelect', this.currentItem)
      }
    },
    components: {
      subHeader
    }
  }
</script>

<style scoped>
  .selector{
    position: fixed;
    bottom: 0;
    border-top-width: 1px;
    border-top-color: #000;
    background-color: #fff;
  }
  .header{
    width: 750px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .main{
    justify-content: flex-start;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 40px;
    height: 310px;
    overflow: hidden;
    position: relative;
  }
  .wrapper{
    width: 750px;
    justify-content: center;
    align-items: center;
  }
  .item{
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .box{
    position: absolute;
    border-top-width: 1px;
    border-bottom-width: 1px;
    height: 55px;
    width: 750px; 
    top: 130px;
    left: 0;
  }
</style>