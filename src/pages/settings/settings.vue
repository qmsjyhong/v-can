<template>
  <div class="vx-settings">
    <vx-header :showHome="1" :title="$t('common.settings')" @home="$router.push({ path: '/' })"></vx-header>
    <div class="vx-container">
      <div class="setting_cont">
        <vx-cell :title="$t('settings.enterConfig')" @link="$router.push({ path: '/settings/enterconfig' })"></vx-cell>
        <!-- <vx-cell :title="$t('settings.outConfig')" @link="$router.push({ path: '/settings/outconfig' })"></vx-cell> -->
      </div>
      <div class="setting_cont">
        <vx-cell :title="$t('settings.modeSwitch')" :value="mode.name" @link="$router.push({path:'/settings/selmode'})"></vx-cell>
      </div>
      <div class="setting_cont">
        <!-- 场景特效 -->
        <!-- <vx-cell :title="$t('settings.sceneEffects')" :value="scene.title" @link="$router.push({ path: '/settings/sceneeffects' })"></vx-cell> -->
        <vx-cell :title="$t('settings.takeEffects')" :value="effect.title" @link="$router.push({ path: '/settings/takeeffects' })">
        </vx-cell>
      </div>
      <div class="setting_cont">
        <vx-cell :title="$t('settings.help')" @link="$router.push({path:'/settings/help'})"></vx-cell>
        <vx-cell :title="$t('settings.language')" :value="selLanguage.title" @link="showLanguage = true"></vx-cell>
        <vx-cell :title="$t('settings.checkForUpdates')" @click="checkForUpdates"></vx-cell>
      </div>
    </div>

    <!-- 模式切换 -->
    <!-- <selmode v-if="ctrlMode" :show="ctrlMode"></selmode> -->
    <!-- 场景特效 -->
    <scene-effects v-if="showSceneEffects" :show="showSceneEffects" :title="$t('settings.sceneEffects')"></scene-effects>
    <!-- 语言 -->
    <languages v-if="showLanguage" :show="showLanguage" :title="$t('settings.language')"></languages>
  </div>
</template>

<script>
  import htp from "../../api/http";
  import urls from "../../api/apiurl";
  // import selmode from './selmode';
  import sceneEffects from './sceneEffects';
  import languages from './languages';
  import { Toast } from 'mint-ui';
  import { getLoc } from 'src/utils';
  export default {
    components: {
      sceneEffects,
      languages
    },
    data() {
      return {
        ctrlMode: false,
        showSceneEffects: false,
        showLanguage: false,
        selLanguage: {},
        mode: {},
        scene: {
          title: ''
        },
        effect: {}
      };
    },
    created() {
      let _selLanguage = getLoc('lang');
      if(_selLanguage) {
        this.selLanguage = {
          title: _selLanguage === 'zh' ? this.$t('settings.chinese') : this.$t('settings.english'),
          name: _selLanguage,
          id: _selLanguage === 'zh' ? 1 : 0
        };
      }
      let _mode = getLoc('mode');
      if(_mode) {
        this.mode = _mode;
        this.mode.name = this.mode.mode == 1 ? this.$t('settings.SplicerMode') : $t('settings.SwitcherMode');
      }

      this.getTakeSpecialEfficiency();
    },
    methods: {
      getTakeSpecialEfficiency() {
        htp.get(urls.getTakeSpecialEfficiency).then(response => {
          if(response.status === 10000000) {
            console.log(1);
            let effect = response.data;
            switch(effect.specialEfficiencyId) {
              case 0:   //直切
                effect.title = this.$t('settings.cut');
                break;
              case 1:   //淡入淡出
                effect.title = this.$t('settings.fade');
                break;
              case 2:   //左上擦除
                effect.title = this.$t('settings.wipeTopleft');
                break;
              case 3:   //自左擦除
                effect.title = this.$t('settings.wipeLeft');
                break;
              case 4:   //左下擦除
                effect.title = this.$t('settings.wipeBottomLeft');
                break;
              case 5:   //自底擦除
                effect.title = this.$t('settings.wipeBottom');
                break;
              case 6:   //右下擦除
                effect.title = this.$t('settings.wipeBottomRight');
                break;
              case 7:   //自右擦除
                effect.title = this.$t('settings.wipeRight');
                break;
              case 8:   //右上擦除
                effect.title = this.$t('settings.wipeTopRight');
                break;
              case 9:   //自顶擦除
                effect.title = this.$t('settings.wipeTop');
                break;
              case 10:   //上下展开
                effect.title = this.$t('settings.splitHorizontallyOut');
                break;
              case 11:   //左右展开
                effect.title = this.$t('settings.splitVerticallyOut');
                break;
              case 12:   //由内向外
                effect.title = this.$t('settings.zoomIn');
                break;
              case 13:   //左上滑入
                effect.title = this.$t('settings.coverTopLeft');
                break;
              case 14:   //自左滑入
                effect.title = this.$t('settings.coverLeft');
                break;
              case 15:   //左下滑入
                effect.title = this.$t('settings.coverBottomLeft');
                break;
              case 16:   //自底滑入
                effect.title = this.$t('settings.coverBottom');
                break;
              case 17:   //右下滑入
                effect.title = this.$t('settings.coverBottomRight');
                break;
              case 18:   //自右滑入
                effect.title = this.$t('settings.coverRight');
                break;
              case 19:   //右上滑入
                effect.title = this.$t('settings.coverTopRight');
                break;
              case 20:   //自顶滑入
                effect.title = this.$t('settings.coverTop');
                break;
              case 21:   //上下收缩
                effect.title = this.$t('settings.splitHorizontallyIn');
                break;
              case 22:   //左右收缩
                effect.title = this.$t('settings.splitVerticallyIn');
                break;
              case 23:   //由外向内
                effect.title = this.$t('settings.zoomOut');
                break;
              case 24:   //由内向外（矩形）
                effect.title = this.$t('settings.zoomInRectangle');
                break;
              default:
                effect.title = this.$t('settings.without');
                break;
            }
            this.effect = effect;
          }
        });
      },
      checkForUpdates() {
        let version = window.Android.getVersionCode();
        htp.get(urls.checkForUpdate, { versionCode: version }).then(res => {
          if(response.status === 10000000) {
            if(res.data !== version) {
              Toast(this.$t('common.download'));
            }
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .vx-settings {
      background: #212124;
      color: #a8a8aa;
  }
  .setting_cont {
      margin-top: 25px;
      .vc-cell {
          border-top: 1px solid #4f5054; /*no*/
          &:first-child {
              border-top: none;
          }
      }

      .vx-progress {
          border-bottom: 1px #4f5054 solid; /*no*/
          background-color: #383940;
          padding-top: 20px;
          padding-bottom: 30px;
      }
      .progress-list {
          text-align: left;
          font-size: 24px;
          height: 60px;
          line-height: 60px;
          text-indent: 35px;
          .vx-progress {
              margin-top: 0;
              color: #a8a8aa;
          }
      }
  }
</style>

