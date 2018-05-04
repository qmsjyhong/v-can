<template>
  <div class="vx-progress">
    <div class="title-box">
      <span class="title">{{title}}</span>
      <div class="plusminus">
        <span class="minus" @click="minus"><img src="../assets/common/minus.png" /></span>
        <span class="plus" @click="plus"><img src="../assets/common/plus.png" /></span>
      </div>
      <span class="number">{{nums}}</span>
    </div>
    <div class="progress-box">
      <mt-range v-model="nums" :min="range.start" :max="range.end" :step="step" :bar-height="2">
      </mt-range>
    </div>
  </div>
</template>

<script>

  export default {
    /**
     * @param title 标题
     * @param num 当前大小
     * @param range 取值范围
     * @text <vx-progress :title="'全部'" :num="5" :range="range"></vx-progress>
     */
    props: ['title', 'num', 'range', 'step'],
    data: function() {
      return {
        nums: ''
      };
    },
    created() {
      this.nums = this.num;
    },
    methods: {
      minus() {
        if(this.nums > this.range.start) {
          this.nums = this.nums - 1;
        }
      },
      plus() {
        if(this.nums < this.range.end) {
          this.nums = this.nums + 1;
        }
      }
    },
    watch: {
      nums: function(newVal) {
        this.$emit('update', newVal);
      },
      num: function(newVal) {
        this.nums = newVal;
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
