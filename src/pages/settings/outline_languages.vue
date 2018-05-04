<template>
  <div class="sel-resolution">
    <mt-popup v-model="show" position="right">
      <vx-header :showback="1" :title="title" @back="back"></vx-header>
      <!-- 语言列表 -->
      <div class="vx-container">
        <div class="sel-sources">
          <vx-cell :class="{selected: selected.id === o.id}" :icon="o.icon" :title="o.title" :showLink="false" v-for="(o,i) in languages" @link="selected = o"></vx-cell>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import htp from "../../api/http";
  import { MessageBox, Toast } from 'mint-ui';
  import { setLoc, getLoc } from 'src/utils';
  export default {
    data() {
      return {
        selected: {},
        languages: [],
        visible: false
      };
    },
    props: ['show', 'title'],
    created() {
      let _selLanguage = getLoc('lang');
      if(_selLanguage) {
        this.selected = {
          title: _selLanguage === 'zh' ? this.$t('settings.chinese') : this.$t('settings.english'),
          name: _selLanguage,
          id: _selLanguage === 'zh' ? 1 : 0
        };
      }
      this.getlanguages();
    },
    methods: {
      /**
       * 获取源列表
       */
      getlanguages() {
        this.languages = [
          { title: this.$t('settings.chinese'), id: 1, name: 'zh' },
          { title: this.$t('settings.english'), id: 0, name: 'en' }
        ];
      },
      back() {
        setLoc('lang', this.selected.name);
        this.$parent.selLanguage = this.selected;
        console.log(this.$parent.selLanguage);
        if(window.Android) {
          window.Android.setLanguage(this.selected.id);
        }

        MessageBox.alert('操作成功!', '提示');
        this.$parent.showLanguage = false;
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