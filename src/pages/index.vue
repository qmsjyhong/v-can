<template>
  <div class="home">
    <vx-header :showback="1" :title="title" @back="back"></vx-header>
    <div class="vx-container">
      <div class="router-container">
        <a class="router" :class="router.path" v-for="(router,index) in routers" @click="go(router)" active-class="is-active">
          <div class="title">{{router.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import htp from "../api/http";
  import { setLoc, getLoc, setSen, getSen } from '../utils';
  import urls from "../api/apiurl";
  import { Toast } from 'mint-ui';
  export default {
    data: function() {
      var model = getLoc('setWorkModel');
      return {
        routers: [{
          name: this.$t('common.filamentShield'),
          path: 'filamentShield'
        }, {
          name: this.$t('common.scenarist'),
          path: model === null ? 'selectmode' : 'scenarist-home'
        }, {
          name: this.$t('common.sourceSwitch'),
          path: 'window'
        }, {
          name: this.$t('common.scene'),
          path: 'scene'
        }, {
          name: this.$t('common.test'),
          path: 'psytopic'
        }, {
          name: this.$t('common.settings'),
          path: 'settings'
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
        htp.get(urls.getDeviceInfo).then(res => {
          if(res.status === 10000000) {
            setLoc('device', res.data);
            this.title = res.data.deviceName;
          }
        });
      },
      go(route) {
        if(route.path === 'filamentShield') {
          setLoc('filament-shield', 1);
          this.$router.push({ path: '/' + route.path });
        } else if(route.path === 'selectmode' || route.path === 'scenarist-home') {
          if(getSen('filament-shield)')) {
            this.$router.push({ path: '/' + route.path });
          } else {
            Toast(this.$t('common.matchScreen'),);
          }
        } else {
          this.$router.push({ path: '/' + route.path });
        }

      },
      getDeviceType: async function() {
        htp.get(urls.getPortSize).then(res => {
          if(res.status === 10000000) {
            setLoc('modelId', res.data.modelId);
            setLoc('boxParam', res.data);
            if(this.ids.some(id => {
              return id == res.modelId;
            })) {
              this.routers = this.routers;
            }
          }
        });
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
                  font-size: 12px; /*no*/
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
                  font-size: 12px; /*no*/
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
