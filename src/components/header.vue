<template>
  <div class="vx-header">
    <mt-header>
      <!-- Home键 -->
      <mt-button slot="left" v-if="showHome" @click="home"><img src="../assets/common/btn_menu_home.png" slot="icon"></mt-button>
      <!-- 返回上一路由 -->
      <mt-button slot="left" v-if="showback" @click="back"><img src="../assets/common/back.png" slot="icon"></mt-button>
      <!-- 取消  -->
      <mt-button slot="left" v-if="showcancel" @click="cancel">{{$t('common.cancel')}}</mt-button>
      <!-- 确定 -->
      <mt-button class="save" slot="right" v-if="showsave" @click="save">{{$t('common.confirm')}}</mt-button>
      <!-- 保存 -->
      <mt-button slot="right" v-if="showsubmit" @click="submit"><img src="../assets/common/save.png" slot="icon"></mt-button>
      <!-- 上一步 -->
      <mt-button slot="left" v-if="showPrevious" @click="previous">{{$t('common.prevStep')}}</mt-button>
      <!-- 重置左 -->
      <mt-button slot="left" v-if="showResetL" @click="reset"><img src="../assets/common/reset.png" slot="icon"></mt-button>
      <!-- 重置右 -->
      <mt-button slot="right" v-if="showReset" @click="reset"><img src="../assets/common/reset.png" slot="icon"></mt-button>
      <!-- 刷新左-->
      <mt-button slot="left" v-if="showRrefreshL" @click="refresh"><img src="../assets/common/refresh.png" slot="icon"></mt-button>
      <!-- 刷新右-->
      <mt-button slot="right" v-if="showRrefresh" @click="refresh"><img src="../assets/common/refresh.png" slot="icon"></mt-button>
      <!-- 下一步 -->
      <mt-button slot="right" v-if="showNext" @click="next">{{$t('common.nextStep')}}</mt-button>
      <!-- 上一页 -->
      <mt-button slot="right" v-if="showPrevPage" @click="prevPage">{{$t('common.prevPage')}}</mt-button>
      <!-- 下一页 -->
      <mt-button slot="right" v-if="showNextPage" @click="nextPage">{{$t('common.nextPage')}}</mt-button>
      <!-- 应用 -->
      <mt-button slot="right" v-if="showadhibition" @click="adhibition">{{$t('common.adhibition')}}</mt-button>
    </mt-header>
    <div class="vx-header_title" @click="selectDevice">
      {{title}}
      <img v-if="showArrow" class="arrow" src="../assets/common/arrow.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: [
      'showHome',       //控制Home键是否显示
      'showback',       //控制返回上一路由键（<）是否显示
      'showRrefreshL',    //控制刷新左按钮是否显示
      'showRrefresh',    //控制刷新右按钮是否显示
      'showcancel',     //控制取消按钮是否显示
      'showsave',       //控制确定按钮是否显示
      'showsubmit',     //控制保存按钮是否显示
      'showPrevious',   //控制上一步按钮是否显示
      'showNext',       //控制下一步按钮是否显示
      'showPrevPage',   //控制上一页按钮是否显示
      'showNextPage',   //控制下一页按钮是否显示
      'showadhibition', //控制应用按钮是否显示
      'showResetL',      //重置左
      'showReset',      //重置右
      'showArrow',
      'title'           //标题
    ],
    methods: {
      home() {
        this.$emit('home');
      },
      back() {
        this.$emit('back');
      },
      refresh() {
        window.location.reload();
      },
      cancel() {
        this.$emit('cancel');
      },
      save() {
        this.$emit('save');
      },
      submit() {
        this.$emit('submit');
      },
      previous() {
        this.$emit('previous');
      },
      next() {
        this.$emit('next');
      },
      prevPage() {
        this.$emit('prev-page');
      },
      nextPage() {
        this.$emit('next-page');
      },
      adhibition() {
        this.$emit('use');
      },
      reset() {
        this.$emit('reset');
      },
      selectDevice() {
        window.Android.returnDeviceList();
      }
    }
  };
</script>

<style scoped lang="less">

</style>