<template>
  <div class="container-wrapper">
    <transition :name="transitionName">
      <router-view class="container"></router-view>
    </transition>
    <!-- <vx-takebtn></vx-takebtn> -->
  </div>
</template>

<script>
  var isChild = function(str) {
    return (/\/.+/).test(str);
  };
  export default {
    name: 'vx-view',
    data() {
      return {
        transitionName: 'slide-left',
        title: ''
      };
    },
    watch: {
      '$route'(to, from) {
        if (from.path === '/scenarist-home' & to.path === '/selmode') {
          this.transitionName = 'slide-right';
          return;
        }
        if(isChild(from.path)) {
          this.transitionName = isChild(to.path) ? 'slide-left' : 'slide-right';
        } else {
          this.transitionName = isChild(to.path) ? 'slide-left' : '';
        }
      }
    }
  };
</script>

<style lang="less">
  @import '~mint-ui/lib/style.css';
  .slide-left-enter,
  .slide-right-leave-active {
      -webkit-transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
      -webkit-transform: translate(-100%, 0);
  }
</style>

