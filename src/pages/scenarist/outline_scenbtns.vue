<template>
  <div class="scenarist-btns js-scenarist-child" v-show="showHold" :style="showStyle">
    <span class="scenarist-btns_cont">
      <span @click="cutSource">{{$t('common.cut')}}</span>
      <span @click="setLayout">{{$t('common.layout')}}</span>
      <!-- <span @click="setDefinition">{{$t('common.definition')}}</span> -->
      <!-- <span @click="setBorder">{{$t('common.border')}}</span> -->
      <i class="dot" :style="dotStyle"></i>
    </span>
  </div>
</template>

<script>
  export default {
    props: ['showHold', 'showStyle', 'dotStyle'],
    methods: {
      cutSource() {
        this.$emit('cut-source');
      },
      setLayout() {
        this.$emit('set-layout');
      },
      setDefinition() {
        this.$emit('set-definition');
      },
      setBorder() {
        this.$emit('set-border');
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
