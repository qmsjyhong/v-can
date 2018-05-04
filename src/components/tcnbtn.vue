<template>

  <div class="tcnbtn-layout" v-finger:press-move="pressMove" v-finger:tap="startTap" ref="btn">
    <div class="btnBox">
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div v-if="show" class="take" :class="btnShow?'':takeTap" @click="take">
        <span>TAKE</span>
      </div>
      <div v-if="show" class="cut" :class="btnShow?'':cutTap" @click="cut">
        <span>CUT</span>
      </div>
      <div v-if="show" class="switch" :class="btnShow?'':switchTap" @click="swipe">
        <span>SWITCH</span>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data() {
      return {
        btnShow: true,
        takeTap: "takeTap",
        cutTap: "cutTap",
        switchTap: "switchTap",
        show: true
      };
    },
    props: [],
    methods: {
      pressMove(evt) {
        const $btn = this.$refs['btn'];
        const styles = this.getStyle($btn);
        let winHeight = window.innerHeight - 65;
        let winWidth = window.innerWidth - 75;
        let { top, left } = styles;
        top = parseFloat(top) + evt.deltaY;
        left = parseFloat(left) + evt.deltaX;
        if(left < 15) {
          left = 15;
        }
        if(left > winWidth) {
          left = winWidth;
        }
        if(top < 55) {
          top = 55;
        }
        if(top > winHeight) {
          top = winHeight;
        }
        $btn.style.top = top + 'px';
        $btn.style.left = left + 'px';
        evt.preventDefault();
      },
      startTap(evt) {
        this.btnShow = !this.btnShow;
      },
      getStyle(element) {
        return window.getComputedStyle(element, null);
      },
      take() {
        this.$emit('take');
      },
      cut() {
        this.$emit('cut');
      },
      swipe() {
        this.$emit('swipe');
      }
    }
  };
</script>
<style scoped lang="less">

</style>