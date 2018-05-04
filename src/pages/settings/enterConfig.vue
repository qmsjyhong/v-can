<template>
  <div>
    <vx-header :showsave="1" :showcancel="1" :title="$t('settings.enterConfig')" @cancel="cancel" @save="save"></vx-header>
    <div class="vx-container">
      <div class="setting_cont">
        <!-- 选择源 -->
        <vx-cell :title="$t('settings.enterSource')" :value="selectedSource.name" @link="selectSource"></vx-cell>
        <!-- 选择分辨率 -->
        <vx-cell :title="$t('settings.resolution')" :value="rateValue" @link="selectRate"></vx-cell>
        <div class="progress-list">
          <div class="mask">{{$t('settings.QualityRegulation')}}</div>
          <vx-progress v-for="(o,i) in Object.values(definition)" :title="o.title" :num="o.value" :key="i" @update="val=>o.value=val" :range="o.range" :step="o.step"></vx-progress>
        </div>
      </div>
    </div>

    <!-- 选择源界面 -->
    <sel-sources v-if="showSelectSource" :show="showSelectSource" @save-source="saveSource" :selected-source="selectedSource" :sources="sources"></sel-sources>
    <!-- 选择分辨率 -->
    <sel-resolution v-if="setResolution" type="enter" :show="setResolution" @save-resolution="selectResolution" :selected-rate="selectedResolution" :resolutions="resolutions"></sel-resolution>
  </div>
</template>
<script>
  import htp from "../../api/http";
  import urls from "../../api/apiurl";
  import selSources from './selSources';
  import selResolution from './selResolution';
  import { MessageBox, Toast } from 'mint-ui';
  import { serialize, setLoc, getLoc } from 'src/utils';

  export default {
    components: {
      selSources,
      selResolution
    },
    data() {
      return {
        definition: {
          light: {
            title: this.$t('common.light'),
            value: 50,
            step: 1,
            range: {
              start: 0,
              end: 100
            }
          },
          contrast: {
            title: this.$t('common.contrast'),
            value: 50,
            step: 1,
            range: {
              start: 0,
              end: 100
            }
          },
          saturability: {
            title: this.$t('common.saturability'),
            value: 50,
            step: 1,
            range: {
              start: 0,
              end: 100
            }
          },
          hue: {
            title: this.$t('common.hue'),
            value: 50,
            step: 1,
            range: {
              start: -180,
              end: 180
            }
          }
        },
        showSelectSource: false,
        sources: [],
        selectedSource: {},//选中的源
        setResolution: false,
        resolutions: [],//所有分辨率
        //选中的分辨率
        selectedResolution: {},
        ids: [25089, 25090, 25091],
        rateValue: '',
        req: {
          sourceId: '',
          resolutionId: ''
        }
      };
    },
    created() {
      let _inputSource = getLoc('sel-source');
      let _inputRate = getLoc('sel-rate');
      if(_inputRate) {
        this.selectedResolution = _inputRate;
        this.rateValue = this.selectedResolution.width + 'X' + this.selectedResolution.height + '@' + this.selectedResolution.rate + 'Hz';
      }
      if(_inputSource) {
        this.selectedSource = _inputSource;
        this.getInputSourceQuality();
      }
      this.getResolutions();
    },
    methods: {
      /**
       * 获取设备画质信息
       */
      getInputSourceQuality() {
        htp.post(urls.getInputSourceQuality, { inputSourceId: this.selectedSource.id }).then(response => {
          if(response.status === 10000000) {
            let res = response.data;
            this.definition.light.value = res.brightness;
            this.definition.contrast.value = res.contrast;
            this.definition.saturability.value = res.saturation;
            this.definition.hue.value = res.hue;
          }
        });
      },
      /**
       * 获取输入接口分辨率
       */
      getInputResolutionRatio() {
        htp.get(urls.getInputSourceList).then(response => {
          if(response.status === 10000000) {
            this.sources = response.data.inputSourceList.filter(source => {
              if(this.ids.some(id => {
                return id == getLoc('modelId');
              })) {
                return source.type === 1 || source.type === 0;
              } else {
                return source.type !== 1 || source.type !== 0;
              }
            });
            let _selectedSource = this.sources.filter(source => {
              return source.id == this.selectedSource.id;
            })[0];
            console.log(_selectedSource);
            this.rateValue = _selectedSource.width + 'X' + _selectedSource.height + '@' + _selectedSource.refresh + 'Hz';
          }
        });
      },
      /**
      * 获取源列表
      */
      getSources() {
        if(this.sources.length === 0) {
          htp.get(urls.getInputSourceList).then(response => {
            if(response.status === 10000000) {
              this.sources = response.data.inputSourceList.filter(source => {
                if(this.ids.some(id => {
                  return id == getLoc('modelId');
                })) {
                  return source.type === 1 || source.type === 0;
                } else {
                  return source.type !== 1 || source.type !== 0;
                }
              });
              this.showSelectSource = true;
            }
          });
        } else {
          this.showSelectSource = true;
        }
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
          { width: 1920, height: 1080, rate: 60, id: 8 }
        ];
      },
      selectRate() {
        if(Object.keys(this.selectedSource).length !== 0) {
          this.setResolution = true;
        }
      },
      //保存输入源
      save() {
        let _inputSource = getLoc('sel-source');
        let params = {
          inputSourceId: _inputSource.id,
          brightness: parseInt(this.definition.light.value),
          contrast: parseInt(this.definition.contrast.value),
          saturation: parseInt(this.definition.saturability.value),
          hue: parseInt(this.definition.hue.value)
        };
        if(_inputSource) {
          htp.post(urls.setInputSourceQuality, params).then(res => {
            if(res.status === 10000000) {
              this.$router.push({ path: '/settings' });
            }
          });
        }

      },
      cancel() {
        this.$router.push({ path: '/settings' });
      },
      //获取源列表
      selectSource() {
        this.getSources();
      },
      //选择源
      saveSource(source) {
        let _inputSource = getLoc('sel-source');
        if(!_inputSource || _inputSource.id !== source.id) {
          this.selectedSource = source;
          this.rateValue = this.selectedSource.width + 'X' + this.selectedSource.height + '@' + this.selectedSource.refresh + 'Hz';
          setLoc('sel-source', this.selectedSource);
          this.getInputSourceQuality();
          this.getInputResolutionRatio();
        }
      },
      //选择分辨率
      selectResolution(resolution) {
        this.selectedResolution = resolution;
        this.rateValue = this.selectedResolution.width + 'X' + this.selectedResolution.height + '@' + this.selectedResolution.rate + 'Hz';
        htp.post(urls.setInputResolutionRatio, {
          width: this.selectedResolution.width,
          height: this.selectedResolution.height,
          rate: this.selectedResolution.rate,
          inputSourceId: getLoc('sel-source').id
        }).then(response => {
          setLoc('sel-rate', this.selectedResolution);
        });
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