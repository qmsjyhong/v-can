<template>
  <div class="js-scenarist-child">
    <mt-popup v-model="show" position="right">
      <div class="layout">
        <vx-header :showcancel="1" :showsave="1" @save="save" @cancel="cancel" :title="$t('common.windowLayout')"></vx-header>
        <div class="layout-content">
          <div class="masks" v-for="(o,i) in layout">
            <div class="masks-title">{{o.title}}</div>
            <div class="masks-contents">
              <vx-progress v-for="(k,i) in Object.values(o.opts)" :title="k.title" :num="k.value" @update="val=>k.value=val" :range="k.range" :step="k.step"></vx-progress>
              <mt-button class="reset">{{$t('common.default')}}</mt-button>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>

</template>

<script>
  import { serialize } from 'src/utils';
  import htp from "../../api/http";
  import url from '../../api/apiurl';
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        layout: [{
              title: this.$t('common.window'),
               opts: {
                  width: {
                    title: this.$t('common.width'),
                    value: 100,
                    step: 1,
                    range: {
                      start: 0,
                      end: 2000
                    }
                  },
                  height: {
                    title: this.$t('common.height'),
                    value: 100,
                    step: 10,
                    range: {
                      start: 0,
                      end: 2000
                    }
                  },
                  x: {
                    title: this.$t('common.left'),
                    value: 21,
                    step:1,
                    range: {
                      start: 0,
                      end: 2000
                    }
                  },
                  y: {
                    title: this.$t('common.right'),
                    value: 21,
                    step:1,
                    range: {
                      start: 0,
                      end: 2000
                    }
                  }
                }
            }],
        winId: ''
      };
    },
    props: ['show', 'winid', 'interceptionHaW'],
    created() {
    },
    methods: {
      save() {
        let obj = {};
        obj.windowId = this.winId;
        obj.windowStartX = this.layout[0].opts.x.value;
        obj.windowStartY = this.layout[0].opts.y.value;
        obj.windowWidth = this.layout[0].opts.width.value;
        obj.windowHeight = this.layout[0].opts.height.value;
        this.$emit('save-layout', obj);
      },
      cancel() {
        // this.layout = this.options;
        this.$parent.showLayout = false;
      }
    }
  };
</script>

<style lang="less" scoped>

</style>