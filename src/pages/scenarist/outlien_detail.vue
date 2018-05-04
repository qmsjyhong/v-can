<template>
  <div class="detail-info">
    <div class="detail-info-item">
      <div class="text">{{$t('scenarist.showSize')}}</div>
      <div class="text">{{showWidth}} X {{showHeight}}</div>
    </div>
    <div class="detail-info-item">
      <div class="text">{{$t('scenarist.winSize')}}</div>
      <div class="text" v-show="winSize!=''">{{winWidth}} X {{winHeight}}</div>
    </div>
    <div class="detail-info-item">
      <div class="text">{{$t('scenarist.winPosition')}}</div>
      <div class="text" v-show="winPos!=''">({{winLeft}}，{{winTop}})</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['showWidth', 'showHeight', 'winWidth', 'winHeight', 'winLeft', 'winTop', 'winPos', 'winSize']
  };
</script>

<style lang="less" scoped>
  .detail-info {
      display: flex;
      width: 100%;
      &-item {
          flex: 1;
          .text {
              color: #fff;
              font-size: 0.3rem;
              &:first-child {
                  color: #b2b2b2;
                  font-size: 0.26rem;
                  margin-bottom: .3rem;
              }
          }
      }
  }
</style>

