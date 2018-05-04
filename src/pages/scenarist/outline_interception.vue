<template>
  <div class="js-scenarist-child">
    <mt-popup v-model="show" position="right">
      <vx-header :showsave="1" :showcancel="1" @save="save" @cancel="cancel" :title="$t('common.cut')"></vx-header>
      <div class="vx-container">
        <div class="interception">
          <div class="inputSource" ref="inputSource1">
            <div class="cutsource" ref="cutSource1"></div>
          </div>
        </div>
        <div class="progress-list">
          <vx-progress :title="interception.width.title" :num="interception.width.value" @update="widthChange" :range="interception.width.range" :step="interception.width.step"></vx-progress>
          <vx-progress :title="interception.height.title" :num="interception.height.value" @update="heightChange" :range="interception.height.range" :step="interception.height.step"></vx-progress>
          <vx-progress :title="interception.x.title" :num="interception.x.value" @update="xChange" :range="interception.x.range" :step="interception.x.step"></vx-progress>
          <vx-progress :title="interception.y.title" :num="interception.y.value" @update="yChange" :range="interception.y.range" :step="interception.y.step"></vx-progress>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { serialize } from 'src/utils';
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        interception: {
          width: {
            title: this.$t('common.width'),
            value: 0,
            step: 1,
            range: {
              start: 0,
              end: 0
            }
          },
          height: {
            title: this.$t('common.height'),
            value: 0,
            step: 1,
            range: {
              start: 0,
              end: 0
            }
          },
          x: {
            title: this.$t('common.X'),
            value: 0,
            step: 1,
            range: {
              start: 0,
              end: 0
            }
          },
          y: {
            title: this.$t('common.Y'),
            value: 0,
            step: 1,
            range: {
              start: 0,
              end: 0
            }
          }
        },
        source: { width: 0, height: 0, x: 0, y: 0 },
        inputSourceStyle: {
          widthRate: 0,
          heightRate: 0
        }
      };
    },
    props: ['show', 'winid', 'inputSourceId'],
    mounted() {
      this.initInputSource();
    },
    methods: {
      initInputSource() {
        let self = this;
        setTimeout(function() {
          self.source.width = 1920;
              self.source.height = 1080;
              self.interception = {
                width: {
                  title: self.$t('common.width'),
                  value: 1920,
                  step: 1,
                  range: {
                    start: 64,
                    end: 1920
                  }
                },
                height: {
                  title: self.$t('common.height'),
                  value: 1080,
                  step: 1,
                  range: {
                    start: 64,
                    end: 1080
                  }
                },
                x: {
                  title: self.$t('common.X'),
                  value: 0,
                  step: 1,
                  range: {
                    start: 0,
                    end: 1920
                  }
                },
                y: {
                  title: self.$t('common.Y'),
                  value: 0,
                  step: 1,
                  range: {
                    start: 0,
                    end: 1080
                  }
                }
              };
              self.inputSourceStyle.width = window.getComputedStyle(self.$refs.inputSource1).width;
              self.inputSourceStyle.height = window.getComputedStyle(self.$refs.inputSource1).height;
              self.$refs.cutSource1.style.width = self.inputSourceStyle.width;
              self.$refs.cutSource1.style.height = self.inputSourceStyle.height;
              self.inputSourceStyle.widthRate = parseFloat(self.inputSourceStyle.width) / 1920;
              self.inputSourceStyle.heightRate = parseFloat(self.inputSourceStyle.height) / 1080;
            }, 1000);
      },
      widthChange(val) {
        this.$refs.cutSource1.style.width = val * this.inputSourceStyle.widthRate + 'px';
        this.interception.width.value = val;
        this.interception.x.range.end = parseInt(this.source.width - this.interception.width.value);
      },
      heightChange(val) {
        this.$refs.cutSource1.style.height = val * this.inputSourceStyle.heightRate + 'px';
        this.interception.height.value = val;
        this.interception.y.range.end = parseInt(this.source.height - this.interception.height.value);
      },
      xChange(val) {
        this.interception.x.value = val;
        this.$refs.cutSource1.style.left = (val) * this.inputSourceStyle.widthRate + 'px';

      },
      yChange(val) {
        this.interception.y.value = val;
        this.$refs.cutSource1.style.top = (val) * this.inputSourceStyle.heightRate + 'px';
      },
      save() {
        let obj = {};
        obj.cropHeight = this.interception.height.value;
        obj.cropWidth = this.interception.width.value;
        obj.cropStartX = this.interception.x.value;
        obj.cropStartY = this.interception.y.value;
        obj.windowId = this.winid;
        obj.inputSourceId = this.inputSourceId;
        this.$emit('save-cut', obj);
      },
      cancel() {
        this.$parent.showInterception = false;
      }
    }
  };
</script>
<style scoped lang="less">
  .vx-container {
      background-color: #212124;
  }
  .interception {
      width: 700px;
      height: 400px;
      margin: 0 auto;
      border: 2px solid #3d3d3d;
      border-radius: 6px;
      .inputSource {
          width: 400px;
          height: 260px;
          margin: 0 auto;
          margin-top: 5%;
          border: 2px dashed #525252;
          border-radius: 6px;
          position: relative;
          .cutsource {
              position: absolute;
              border: 2px solid #fff;
          }
      }
  }
  .progress-list {
      background-color: #383940;
      text-align: left;
      font-size: 24px;
      margin-top: 40px;
      line-height: 60px;
      text-indent: 35px;
      .vx-progress {
          margin-top: 0;
          padding-top: 20px;
          color: #a8a8aa;
      }
  }
</style>