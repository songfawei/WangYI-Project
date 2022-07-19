<template>
  <div class="swiper" :style="{height: height}" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <!-- 图片内容 -->
    <ul class="swiper-slide" :style="slideStyle">
      <li
        class="swiper-item"
        v-for="(item, index) in list"
        :key="index"
        :style="{width: itemWidth + 'px'}"
        @click="handleClick(item)"
      >
        <img :src="item" alt />
      </li>
    </ul>
    <!-- 分页器内容 -->
    <ul class="swiper-dots" v-if="options.showDots">
      <li
        class="dots-item"
        v-for="(item, index) in list"
        :key="index"
        :class="{active: nowIndex === index}"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slideStyle: { width: '15rem' },
      itemWidth: 750, // 单张图片的宽度
      nowIndex: 0, // 当前选中的元素
      timer: null, // 播放定时器
      touchStart: {}, // 触摸开始位置
      touchEnd: {} // 触摸结束位置
    }
  },
  watch: {
    list () {
      this.calcWidth()
    }
  },
  props: {
    height: {
      type: String,
      default: '3rem'
    },
    list: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {
          showDots: true, // 是否显示分页器
          interval: 3000, // 轮播间隔时间
          autoplay: true // 是否自动播放
        }
      }
    }
  },
  methods: {
    // 计算slide宽度
    calcWidth () {
      this.$nextTick(() => {
        // 一张图片的宽度
        this.itemWidth = document.body.clientWidth
        const length = this.list.length
        this.slideStyle.width = this.itemWidth * length + 'px'
      })
    },
    move () {
      this.slideStyle.transform = `translateX(-${this.itemWidth *
        this.nowIndex}px)`
    },
    // 自动播放
    autoMove () {
      if (this.options.autoplay) {
        this.timer = setInterval(() => {
          this.nowIndex++
          if (this.nowIndex > this.list.length - 1) {
            this.nowIndex = 0 // 如果已经播放到最后一张，需要设置成0
          }
          this.move()
        }, this.options.interval)
      }
    },
    onTouchStart (e) {
      // 开始触摸点信息
      this.touchStart = e.changedTouches[0]
      if (this.options.autoplay) {
        clearInterval(this.timer)
      }
    },
    onTouchEnd (e) {
      // 结束触摸点信息
      this.touchEnd = e.changedTouches[0]
      // 左滑还是右滑
      if (this.touchEnd.clientX - this.touchStart.clientX > 30) {
        this.nowIndex--
        if (this.nowIndex < 0) {
          this.nowIndex = this.list.length - 1
        }
      } else if (this.touchEnd.clientX - this.touchStart.clientX < -30) {
        this.nowIndex++
        if (this.nowIndex > this.list.length - 1) {
          this.nowIndex = 0
        }
      }
      this.move()
      this.autoMove()
    },
    handleClick (item) {
      this.$emit('onClick', item)
    }
  },
  mounted () {
    this.calcWidth()
    this.autoMove()
    window.addEventListener('resize', this.calcWidth)
  },
  destroyed () {
    if (this.options.autoplay) {
      clearInterval(this.timer)
    }
    window.removeEventListener('resize', this.calcWidth)
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  overflow: hidden;
  position: relative;
  &-slide {
    height: 100%;
    transition: transform 0.5s ease;
    .swiper-item {
      list-style: none;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  &-dots {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.16rem;
    .dots-item {
      width: 0.4rem;
      height: 0.04rem;
      background-color: $colorA;
      opacity: 0.4;
      float: left;
      margin: 0 0.04rem;
      &.active {
        opacity: 1;
      }
    }
  }
}
</style>
