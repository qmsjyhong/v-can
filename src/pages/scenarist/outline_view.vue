<template>
  <div class="view" ref="view">
    <div class="vx-s">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        range: {
          start: 0,
          end: 60
        },
        all: 5,
        light: 10
      };
    },
    props: ['selected'],
    methods: {
    }
  };
</script>

<style lang="less" scoped>
  .view {
      margin: 2rem 0.35rem 0 0.35rem;
      color: #fff;
      height: 3.85rem;
      border: 0.02rem solid #999;
      border-radius: 0.06rem;
      background: #383940;
      .vx-s {
          width: 0.5rem;
          height: 0.4rem;
          border: #fff 1px solid; /*no*/
      }
  }
</style>
