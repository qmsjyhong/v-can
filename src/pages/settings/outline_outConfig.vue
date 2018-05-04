<template>
  <div>
    <vx-header :showsave="1" :showcancel="1" :title="$t('settings.outConfig')" @cancel="cancelOut" @save="saveOut"></vx-header>
    <div class="vx-container">
      <div class="setting_cont">
        <!-- 选择分辨率 -->
        <vx-cell :title="$t('settings.outResolution')" :value="rateValue" @link="setResolution = true"></vx-cell>

        <!-- <div class="progress-list">
        <div class="mask">{{$t('settings.QualityRegulation')}}</div>
        <vx-progress v-for="(o,i) in Object.values(definition)" :title="o.title" :num="o.value" @update="val=>o.value=val" :range="o.range" :step="o.step"></vx-progress>
      </div> -->
      </div>
    </div>

    <sel-resolution v-if="setResolution" type="out" :show="setResolution" @save-resolution="selectResolution" :selected-rate="selectedResolution" :resolutions="resolutions"></sel-resolution>
  </div>
</template>
<script>

  import { MessageBox, Toast } from 'mint-ui';
  import { serialize, setLoc, getLoc } from 'src/utils';
  import selResolution from './outline_selResolution';
  export default {
    components: {
      selResolution
    },
    data() {
      return {
        definition: {
          light: {
            title: this.$t('settings.light'),
            value: 1,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          },
          contrast: {
            title: this.$t('settings.contrast'),
            value: 1,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          },
          saturability: {
            title: this.$t('settings.saturability'),
            value: 2,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          },
          hue: {
            title: this.$t('settings.hue'),
            value: 3,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          },
          colourTemperatureR: {
            title: this.$t('settings.colourTemperature') + 'R',
            value: 3,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          },
          colourTemperatureG: {
            title: this.$t('settings.colourTemperature') + 'G',
            value: 3,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          },
          colourTemperatureB: {
            title: this.$t('settings.colourTemperature') + 'B',
            value: 3,
            step: 1,
            range: {
              start: 0,
              end: 60
            }
          }
        },
        setResolution: false,
        resolutions: [],//所有分辨率
        selectedResolution: {},//选中的分辨率
        rateValue: '',
        req: {
          sourceId: '',
          resolutionId: ''
        }
      };
    },
    created() {
      this.getOutputResolutionRatio();
      this.getResolutions();
    },
    methods: {
      //getOutputResolutionRatio
      getOutputResolutionRatio() {
        this.selectedResolution = {
          width: 50,
          height: 50,
          rate: 50
        };
        this.rateValue = this.selectedResolution.width + 'X' + this.selectedResolution.height + '@' + this.selectedResolution.rate + 'Hz';
      },
      /**
       * 获取所有分辨率
       */
      getResolutions() {
        this.resolutions = [
          { width: 1024, height: 768, rate: 60, id: 1 },
          { width: 1280, height: 720, rate: 60, id: 2 },
          { width: 1280, height: 800, rate: 60, id: 3 },
          { width: 1280, height: 1020, rate: 60, id: 4 },
          { width: 1366, height: 768, rate: 60, id: 5 },
          { width: 1440, height: 900, rate: 60, id: 6 },
          { width: 1600, height: 900, rate: 60, id: 7 },
          { width: 1920, height: 108, rate: 60, id: 8 }
        ];
      },
      //选择分辨率
      selectResolution(resolution) {
        this.selectedResolution = resolution;
        this.rateValue = this.selectedResolution.width + 'X' + this.selectedResolution.height + '@' + this.selectedResolution.rate + 'Hz';
      },
      //获取输出画质
      getOutputQuality() {

      },
      saveOut() {
        this.$router.push({ path: '/outline_settings' });
      },
      cancelOut() {
        this.$router.push({ path: '/outline_settings' });
      }
    }
  };
</script>
<style scoped lang="less">
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
          .mask {
              color: #fff;
              font-size: 24px;
          }
          .vx-progress {
              margin-top: 0;
              color: #a8a8aa;
          }
      }
  }
</style>