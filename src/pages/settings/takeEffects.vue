<template>
  <div class="sel-resolution">
    <vx-header :showback="1" :title="$t('settings.takeEffects')" @back="back"></vx-header>
    <!-- 场景特效列表 -->
    <div class=" vx-container">
      <div class="sel-sources">
        <vx-cell :class="{selected: selected.specialEfficiencyId === o.specialEfficiencyId}" :icon="o.icon" :title="o.title" :showLink="false" v-for="(o,i) in effects" @link="selected = o"></vx-cell>
      </div>
    </div>
  </div>
</template>
<script>
  import htp from "../../api/http";
  import urls from "../../api/apiurl";
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        selected: {},
        effects: []
      };
    },
    created() {
      this.geteffects();
      this.getTakeSpecialEfficiency();
    },
    methods: {
      getTakeSpecialEfficiency() {
        htp.get(urls.getTakeSpecialEfficiency).then(response => {
          if(response.status === 10000000) {
            this.selected = response.data;
            this.effectHandler(this.selected);
          } else {
            Toast(this.$t('common.requestFailed'));
          }
        });
      },
      /**
       * 获取take特效列表
       */
      geteffects() {
        this.effects = [
          { specialEfficiencyId: 0 },
          { specialEfficiencyId: 1 },
          { specialEfficiencyId: 3 },
          { specialEfficiencyId: 9 },
          { specialEfficiencyId: 7 },
          { specialEfficiencyId: 5 },
          { specialEfficiencyId: 2 },
          { specialEfficiencyId: 8 },
          { specialEfficiencyId: 6 },
          { specialEfficiencyId: 4 },
          { specialEfficiencyId: 21 },
          { specialEfficiencyId: 22 },
          { specialEfficiencyId: 11 },
          { specialEfficiencyId: 10 },
          { specialEfficiencyId: 12 },
          { specialEfficiencyId: 23 },
          { specialEfficiencyId: 24 },
          { specialEfficiencyId: 25 },
          { specialEfficiencyId: 26 },
          { specialEfficiencyId: 27 },
          { specialEfficiencyId: 28 },
          { specialEfficiencyId: 29 }
        ];
        this.effects.forEach(effect => {
          this.effectHandler(effect);
        });

      },
      effectHandler(effect) {
        switch(effect.specialEfficiencyId) {
          case 0:   //直切vx6
            effect.title = this.$t('settings.cut');
            effect.icon = 'cut';
            break;
          case 1:   //淡入淡出vx6
            effect.title = this.$t('settings.fade');
            effect.icon = 'fade';
            break;
          case 2:   //左上擦除
            effect.title = this.$t('settings.wipeTopleft');
            effect.icon = 'wipe-top-left';
            break;
          case 3:   //自左擦除
            effect.title = this.$t('settings.wipeLeft');
            effect.icon = 'wipe-left';
            break;
          case 4:   //左下擦除
            effect.title = this.$t('settings.wipeBottomLeft');
            effect.icon = 'wipe-bottom-left';
            break;
          case 5:   //自底擦除
            effect.title = this.$t('settings.wipeBottom');
            effect.icon = 'wipe-bottom';
            break;
          case 6:   //右下擦除
            effect.title = this.$t('settings.wipeBottomRight');
            effect.icon = 'wipe-bottom-right';
            break;
          case 7:   //自右擦除
            effect.title = this.$t('settings.wipeRight');
            effect.icon = 'wipe-right';
            break;
          case 8:   //右上擦除
            effect.title = this.$t('settings.wipeTopRight');
            effect.icon = 'wipe-top-right';
            break;
          case 9:   //自顶擦除
            effect.title = this.$t('settings.wipeTop');
            effect.icon = 'wipe-top';
            break;
          case 10:   //上下展开
            effect.title = this.$t('settings.splitHorizontallyOut');
            effect.icon = 'split-horizontally-out';
            break;
          case 11:   //左右展开
            effect.title = this.$t('settings.splitVerticallyOut');
            effect.icon = 'split-vertically-out';
            break;
          case 12:   //由内向外
            effect.title = this.$t('settings.zoomIn');
            effect.icon = 'zoom-in';
            break;
          case 13:   //左上滑入vx6
            effect.title = this.$t('settings.coverTopLeft');
            effect.icon = 'cover-top-left';
            break;
          case 14:   //自左滑入vx6
            effect.title = this.$t('settings.coverLeft');
            effect.icon = 'cover-left';
            break;
          case 15:   //左下滑入vx6
            effect.title = this.$t('settings.coverBottomLeft');
            effect.icon = 'cover-bottom-left';
            break;
          case 16:   //自底滑入vx6
            effect.title = this.$t('settings.coverBottom');
            effect.icon = 'cover-bottom';
            break;
          case 17:   //右下滑入vx6
            effect.title = this.$t('settings.coverBottomRight');
            effect.icon = 'cover-bottom-right';
            break;
          case 18:   //自右滑入vx6
            effect.title = this.$t('settings.coverRight');
            effect.icon = 'cover-right';
            break;
          case 19:   //右上滑入vx6
            effect.title = this.$t('settings.coverTopRight');
            effect.icon = 'cover-top-right';
            break;
          case 20:   //自顶滑入vx6
            effect.title = this.$t('settings.coverTop');
            effect.icon = 'cover-top';
            break;
          case 21:   //上下收缩
            effect.title = this.$t('settings.splitHorizontallyIn');
            effect.icon = 'split-horizontally-in';
            break;
          case 22:   //左右收缩
            effect.title = this.$t('settings.splitVerticallyIn');
            effect.icon = 'split-vertically-in';
            break;
          case 23:   //由外向内
            effect.title = this.$t('settings.zoomOut');
            effect.icon = 'zoom-out';
            break;
          case 24:   //由内向外（矩形）
            effect.title = this.$t('settings.zoomInRectangle');
            effect.icon = 'zoom-in-rectangle';
            break;
          case 25:   //由外向内（矩形）
            effect.title = this.$t('settings.zoomOutRectangle');
            effect.icon = 'zoom-out-rectangle';
            break;
          case 26:   //由内向外（菱形）
            effect.title = this.$t('settings.zoomInDiamond');
            effect.icon = 'zoom-in-diamond';
            break;
          case 27:   //由内向外（菱形）
            effect.title = this.$t('settings.zoomOutDiamond');
            effect.icon = 'zoom-out-diamond';
            break;
          case 28:   //由内向外（圆）
            effect.title = this.$t('settings.zoomInCircular');
            effect.icon = 'zoom-in-circular';
            break;
          case 29:   //由外向内（圆）
            effect.title = this.$t('settings.zoomOutCircular');
            effect.icon = 'zoom-out-circular';
            break;
          default:
            effect.title = this.$t('settings.without');
            effect.icon = 'without';
            break;
        }
      },
      back() {
        this.setTakeSpecialEfficiency();
      },
      setTakeSpecialEfficiency() {
        if(this.selected.specialEfficiencyId) {
          htp.post(urls.setTakeSpecialEfficiency, { specialEfficiencyId: this.selected.specialEfficiencyId }).then(response => {
            if(response.status === 10000000) {
              this.$router.push({ path: '/settings' });
            }
          });
        } else {
          this.$router.push({ path: '/settings' });
        }

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