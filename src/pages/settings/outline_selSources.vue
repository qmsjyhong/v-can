<template>
  <div>
    <mt-popup v-model="show" position="right">
      <vx-header :showback="1" :showsave="1" :title="$t('settings.enterSource')" @back="back" @save="save"></vx-header>
      <!-- 源列表 -->
      <div class="vx-container">
        <div class="sel-sources">
          <vx-cell :class="{selected: selected.id === o.id}" :title="o.name" :showLink="false" v-for="(o,i) in sources" @link="selected = o"></vx-cell>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { serialize } from 'src/utils';
  export default {
    data() {
      return {
        selected: {}
      };
    },
    props: ['show', 'selected-source', 'sources'],
    created() {
      this.selected = serialize(this.selectedSource);
    },
    methods: {
      back() {
        this.$parent.showSelectSource = false;
      },
      save() {
        this.$emit('save-source', this.selected);
        this.$parent.showSelectSource = false;
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