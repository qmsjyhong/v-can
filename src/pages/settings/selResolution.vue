<template>
  <div class="sel-resolution">
    <mt-popup v-model="show" position="right">
      <vx-header :showback="1" :showsave="1" :title="$t('settings.enterResolution')" @back="back" @save="save"></vx-header>
      <!-- 分辨率列表 -->
      <div class="vx-container">
        <div class="sel-sources">
          <vx-cell :title="$t('settings.custom')" :showLink="false" @link="custom"></vx-cell>
          <vx-cell :class="{selected: selected.id === o.id}" :title="o.width+'X'+o.height+'@'+o.rate+'Hz'" :showLink="false" v-for="(o,i) in resolutions" @link="selected = o"></vx-cell>
        </div>
      </div>

      <vx-modal v-if="visible" :visible="visible" @close="hide">
        <div class="custom_header" slot="header">{{$t('settings.custom')}}</div>
        <div class="content" slot="content">
          <mt-field :label="$t('settings.width')" :placeholder="$t('settings.pleaseEnter')" type="number" v-model="req.width"></mt-field>
          <mt-field :label="$t('settings.height')" :placeholder="$t('settings.pleaseEnter')" type="number" v-model="req.height"></mt-field>
          <mt-field :label="$t('settings.vertrefresh')" :placeholder="$t('settings.pleaseEnter')" type="number" v-model="req.freshRate"></mt-field>
        </div>
        <div class="footer" slot="footer">
          <div class="cancel" @click="hide">{{$t('common.cancel')}}</div>
          <div class="save" @click="saveResolution">{{$t('common.confirm')}}</div>
        </div>
      </vx-modal>
    </mt-popup>
  </div>
</template>
<script>
  import htp from "../../api/http";
  import urls from "../../api/apiurl";
  import { serialize, getLoc } from 'src/utils';
  import { MessageBox, Toast } from 'mint-ui';
  export default {
    data() {
      return {
        selected: {},
        visible: false,
        req: {
          width: '',
          height: '',
          freshRate: ''
        }
      };
    },
    props: ['show', 'resolutions', 'selected-rate', 'type'],
    created() {
      this.selected = serialize(this.selectedRate);
    },
    methods: {
      back() {
        this.$parent.setResolution = false;
      },
      save() {
        this.$emit('save-resolution', this.selected);
        this.$parent.setResolution = false;
      },
      custom() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      checkResolution() {
        this.req.height = parseInt(this.req.height);
        this.req.width = parseInt(this.req.width);
        this.req.freshRate = parseInt(this.req.freshRate);
        if(this.type === "enter") {
          if(this.req.width > 2048 || this.req.width < 800) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessageEnter.width')
            });
            return false;
          } else if(this.req.height > 1600 || this.req.width < 600) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessageEnter.height')
            });
            return false;
          } else if(this.req.freshRate > 60 || this.req.width < 24) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessageEnter.rate')
            });
            return false;
          } else if((this.req.width + 160) * (this.req.height + 62) * this.req.freshRate > 165000000) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessageEnter.limit')
            });
            return false;
          }

          return true;

        } else {
          if(this.req.width > 4096 || this.req.width < 800) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessagerOutput.width')
            });
            return false;
          } else if(this.req.height > 2160 || this.req.width < 600) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessagerOutput.height')
            });
            return false;
          } else if(this.req.freshRate > 60 || this.req.width < 24) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessagerOutput.rate')
            });
            return false;
          } else if((this.req.width + 160) * (this.req.height + 62) * this.req.freshRate > 291621120) {
            Toast({
              className: 'vx-toast',
              message: $t('settings.errorMessagerOutput.limit')
            });
            return false;
          }

          return true;
        }
      },
      saveResolution() {
        if(this.checkResolution()) {
          this.visible = false;
          let params = {
            width: parseInt(this.req.width),
            height: parseInt(this.req.height),
            rate: parseInt(this.req.freshRate),
            inputSourceId: getLoc('sel-source').id
          };
          htp.post(this.type === "enter" ? urls.setInputResolutionRatio : urls.setOutputResolutionRatio, params).then(response => {
            if(response.status === 10000000) {
              this.$emit('save-resolution', params);
              this.$parent.setResolution = false;
            }
          });
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