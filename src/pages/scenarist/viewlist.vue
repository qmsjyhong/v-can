<template>
  <div class="sources">
    <div class="sources-item" nowrap="nowrap" v-for="(o,i) in sourceList" v-bind:key-index="i" ref="'source'+i" >
      <img class="icon" :src="o.icon" alt="">
      <div class="title">{{o.title}}</div>
    </div>
    <div class="source-selected sources-item" v-if="show">
      <img class="icon" :src="selected.icon" alt="">
      <div class="title">{{selected.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sourceList: [{
          title: 'HDMI',
          icon: './imgs/hdmi.png'
        },
        {
          title: 'VGA',
          icon: './imgs/vga.png'
        },
        {
          title: 'CBVS',
          icon: './imgs/cbvs.png'
        },
        {
          title: 'VGA',
          icon: './imgs/vga.png'
        }],
        show: 0,
        selected: {
          icon: '',
          title: ''
        }
      };
    },
    methods: {
      move(et, evt, ele) {
        this.show = 1;
        console.log(ele);
        if(et === 'panstart') {
          console.log(0);
        }
        // console.log(evt);
        if(et === 'panend') {
          console.log(1);
        }
        console.log("向左滑动:x偏移量[" + evt.deltaX + "],y偏移量[" + evt.deltaY + "]");
      }
    }
  };
</script>

<style lang="less" scoped>
  .sources {
      height: 1.3rem;
      position: fixed;
      left: 0.4rem;
      right: 0.4rem;
      bottom: 1rem;
      color: #fff;
      font-size: 0.24rem;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      &-item {
          width: 2rem;
          height: 1.2rem;
          background-color: #41434b;
          margin-left: 0.16rem;
          display: inline-block;
          &:first-child {
              margin-left: 0;
          }
          .icon {
              margin-top: 0.25rem;
              width: 0.8rem;
              height: 0.35rem;
          }
          .title {
              font-size: 0.24rem;
              margin-top: 0.2rem;
          }
      }
  }
</style>
