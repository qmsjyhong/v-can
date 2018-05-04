<template>
  <div class="home">
    <vx-header :showback="1" :title="title" @back="back"></vx-header>
    <div class="vx-container">
      <div class="router-container">
        <router-link class="router" :class="router.class" v-for="(router,index) in routers" :to="{path:'/'+router.path}" active-class="is-active">
          <div class="title">{{router.name}}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import htp from "../api/http";
  import { setLoc, getLoc, setSen, getSen } from '../utils';
  import urls from "../api/apiurl";
  export default {
    data: function() {
      var model = getLoc('setWorkModel');
      console.log(model);
      return {
        routers: [{
          name: this.$t('common.filamentShield'),
          path: 'outline_filamentShield',
          class: 'filamentShield'
        }, {
          name: this.$t('common.scenarist'),
          class: model === null ? 'selectmode' : 'scenarist-home',
          path: model === null ? 'outline_selectmode' : 'outline_scenarist-home'
        }, {
          name: this.$t('common.sourceSwitch'),
          path: 'outline_window',
          class: 'window'
        }, {
          name: this.$t('common.scene'),
          path: 'outline_scene',
          class: 'scene'
        }, {
          name: this.$t('common.test'),
          path: 'outline_psytopic',
          class: 'psytopic'
        }, {
          name: this.$t('common.settings'),
          path: 'outline_settings',
          class: 'settings'
        }],
        title: '',
        guides: [],
        modelId: '',
        ids: [25089, 25090, 25091]
      };
    },
    created() {
      this.getDeviceInfo();
      this.getDeviceType();
    },
    methods: {
      getDeviceInfo() {
        let res = { "deviceName": "VX6", "deviceIp": "192.168.0.101" };
        this.title = res.deviceName;
        setLoc('device', res);
      },
      getDeviceType() {
        setLoc('modelId', 25089);
        if(this.ids.some(id => {
          return id == 25089;
        })) {
          this.routers = this.routers;
        }
      },
      back() {
        window.Android.returnDeviceList();
      }
    }
  };
</script>

<style lang="less" scoped>
  .home {
      .router-container {
          flex-wrap: wrap;
          justify-content: space-between;
          display: flex;
          flex-wrap: wrap;
          margin-left: 35px;
          margin-right: 35px;
          padding-top: 45px;
          .router {
              color: #c6c6c6;
              background-color: #41434b;
              height: 240px;
              margin-bottom: 35px;
              text-decoration: none;
              background-size: 100px 100px;
              background-position: center 40px;
          }
      }
  }

  @media screen and (orientation: portrait) {
      .home {
          .router-container {
              .router {
                  width: 48%;
                  font-size: 40px;
                  margin-left: 4%;
                  &:nth-child(2n + 1) {
                      margin-left: 0;
                  }
                  .title {
                      margin-top: 155px;
                      text-align: center;
                      color: #c6c6c6;
                  }
              }
          }
      }
  }
  @media screen and (orientation: landscape) {
      .home {
          .router-container {
              .router {
                  width: 30%;
                  font-size: 40px;
                  margin-left: 5%;
                  &:nth-child(3n + 1) {
                      margin-left: 0;
                  }
                  .title {
                      margin-top: 155px;
                      text-align: center;
                      color: #c6c6c6;
                  }
              }
          }
      }
  }
  .filamentShield {
      background: url('../assets/common/filamentShield.png') no-repeat;
  }

  .selectmode,
  .scenarist-home {
      background: url('../assets/common/scenarist.png') no-repeat;
  }

  .window {
      background: url('../assets/common/sourceSwitch.png') no-repeat;
  }

  .scene {
      background: url('../assets/common/scene.png') no-repeat;
  }

  .psytopic {
      background: url('../assets/common/test.png') no-repeat;
  }

  .settings {
      background: url('../assets/common/settings.png') no-repeat;
  }
</style>
