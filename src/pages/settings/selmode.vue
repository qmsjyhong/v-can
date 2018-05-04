<template>
  <div class="selmode">
    <vx-header :showNext="1" :showHome="1" @home="$router.push({ 'name': 'settings' })" @next="next" :title="$t('common.selmode')"></vx-header>
    <div class="vx-container">
      <div class="selmode-modes">
        <div class="selmode-modes_joint" @click="selectModel(1)" :class="{active: selected.mode===1}">{{$t('settings.SplicerMode')}}</div>
        <div class="selmode-modes_switch" @click="selectModel(2)" :class="{active:  selected.mode===2}">{{$t('settings.SwitcherMode')}}</div>

      </div>
    </div>
  </div>
</template>
<script>
  import htp from '../../api/http';
  import URL from '../../api/apiurl';
  import { Toast } from 'mint-ui';
  import { setLoc, getLoc } from 'src/utils';
  export default {
    data() {
      return {
        selmode: 1,
        selected: {
          mode: 1,
          name: this.$t('settings.SplicerMode')
        }
      };
    },
    created() {
      let _mode = getLoc('mode');
      if(_mode) {
        this.selected = _mode;
      }
    },
    methods: {
      next() {
        setLoc('mode', this.selected);
        this.$router.push({ 'name': 'settings' });
      },
      cancel() {
        this.$router.push({ 'name': 'settings' });
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
        this.selected = {
          mode: val,
          name: val === 1 ? this.$t('settings.SplicerMode') : this.$t('settings.SwitcherMode')
        };
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
