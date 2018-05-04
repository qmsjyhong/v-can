<template>
  <div class="selmode">
    <vx-header :showNext="1" :showHome="1" @next="next" :title="$t('common.selmode')" @home="$router.push({ path: '/' })"></vx-header>
    <div class="vx-container">
      <div class="selmode-modes">
        <div class="selmode-modes_joint" @click="selectModel(1)" :class="{active: jointStatus}">{{$t('settings.SplicerMode')}}</div>
        <div class="selmode-modes_switch" @click="selectModel(2)" :class="{active: switchStatus}">{{$t('settings.SwitcherMode')}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import htp from '../api/http';
  import URL from '../api/apiurl';
  import { Toast } from 'mint-ui';
  import { setLoc, getLoc } from '../utils';
  export default {
    created() {
      var model = getLoc('setWorkModel');
      if(model === null) {
        this.jointStatus = false;
        this.switchStatus = false;
      } else if(model === '0') {
        this.jointStatus = true;
        this.switchStatus = false;
      } else if(model === '1') {
        this.jointStatus = false;
        this.switchStatus = true;
      }
    },
    data() {
      return {
        jointStatus: false,
        switchStatus: false
      };
    },
    props: ['show'],
    methods: {
      next() {
        this.$parent.ctrlMode = false;
        this.$parent.mode = this.selmode;
        this.$router.push({ 'name': 'scenarist' });
      },
      cancel() {
        this.$router.push({ 'name': 'index' });
      },
      selectModel(val) {
        let self = this;
        htp.post(URL.setWorkModel, { "workModel": +val }).then(function(res) {
          if(res.status === 10000000) {
            setLoc('setWorkModel', val);
            if(val === '0') {
              self.jointStatus = true;
              self.switchStatus = false;
            } else {
              self.jointStatus = false;
              self.switchStatus = true;
            }
          } else {
            Toast({
              message: 'Request Failed',
              className: 'res-error'
            });
          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .selmode {
      .selmode-modes {
          margin-top: 190px;
      }
      .selmode-modes_joint,
      .selmode-modes_switch {
          height: 140px;
          line-height: 140px;
          font-size: 30px;
          margin: 50px 7px;
          color: #fff;
          opacity: 0.3;
          &.active {
              opacity: 1;
          }
      }
      .selmode-modes_joint {
          background-color: #4c8edf;
      }

      .selmode-modes_switch {
          background-color: #31bb82;
      }
  }
</style>
