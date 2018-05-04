<template>
  <div class="sel-resolution">
    <vx-header :showback="1" :title="title" @back="back"></vx-header>
    <!-- 场景特效列表 -->
    <div class="vx-container">
      <div class="sel-sources">
        <vx-cell :class="{selected: selected.id === 0}" :title="$t('settings.without')" :showLink="false" @link="selected = {'title':'',id:0}"></vx-cell>
        <vx-cell :class="{selected: selected.id === o.id}" :title="o.title" :showLink="false" v-for="(o,i) in effects" @link="selected = o"></vx-cell>
      </div>
    </div>
  </div>
</template>
<script>

  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        selected: {},
        effects: [],
        visible: false,
        req: {
          width: '',
          height: '',
          freshRate: ''
        }
      };
    },
    props: ['show', 'title'],
    created() {
      this.geteffects();
      this.getSceneSpecialEfficiency();
    },
    methods: {
      /**
       * 获取场景特效列表
       */
      geteffects() {
        this.effects = [
          { title: '特效1', id: 1 },
          { title: '特效2', id: 2 },
          { title: '特效3', id: 3 },
          { title: '特效4', id: 4 },
          { title: '特效5', id: 5 },
          { title: '特效6', id: 6 },
          { title: '特效7', id: 7 },
          { title: '特效8', id: 8 }
        ];
      },
      /**
       * 获取场景特效
       */
      getSceneSpecialEfficiency() {
        // htp.get(urls.getSceneSpecialEfficiency).then(response => {
        //   if(response.status === 10000000) {
        //     this.selected = response.data;
        //   }
        // });
      },
      back() {
        this.$parent.scene = this.selected;
        this.$parent.showSceneEffects = false;
      }
    }
  };
</script>
<style scoped lang="less">
  .sel-sources {
      margin-top: 40px;
      .vc-cell-title {
          color: #dddddd;
      }
      .vc-cell {
          border-bottom: 1px solid #4f5054; /*no*/
          &:last-child {
              border-bottom: none;
          }
      }
      .selected {
          background: ~"url('../../assets/common/checked.png') no-repeat" #383940;
          background-size: 32px 25px;
          background-position: calc(~'100% - 35px');
      }
  }
</style>