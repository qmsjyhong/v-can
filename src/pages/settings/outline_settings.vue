<template>
  <div class="vx-settings">
    <vx-header :showHome="1" :title="$t('common.settings')" @home="$router.push({ path: '/outline_index' })"></vx-header>
    <div class="vx-container">
      <div class="setting_cont">
        <vx-cell :title="$t('settings.enterConfig')" @link="$router.push({ path: '/settings/outline_enterconfig' })"></vx-cell>
        <vx-cell :title="$t('settings.outConfig')" @link="$router.push({ path: '/settings/outline_outconfig' })"></vx-cell>
      </div>
      <div class="setting_cont">
        <vx-cell :title="$t('settings.modeSwitch')" :value="mode.name" @link="$router.push({path:'/settings/outline_selmode'})"></vx-cell>
      </div>
      <div class="setting_cont">
        <!-- 场景特效 -->
        <!-- <vx-cell :title="$t('settings.sceneEffects')" :value="scene.title" @link="$router.push({ path: '/settings/sceneeffects' })"></vx-cell> -->
        <vx-cell :title="$t('settings.takeEffects')" :value="effect.title" @link="$router.push({ path: '/settings/outline_takeeffects' })">
        </vx-cell>
      </div>
      <div class="setting_cont">
        <vx-cell :title="$t('settings.help')" @link="$router.push({path:'/settings/outline_help'})"></vx-cell>
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

  import sceneEffects from './outline_sceneEffects';
  import languages from './outline_languages';
  import { MessageBox, Toast } from 'mint-ui';
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
        this.effect.specialEfficiencyId = 0;
        this.effect.title = this.$t('settings.cut');
      },
      checkForUpdates() {

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

