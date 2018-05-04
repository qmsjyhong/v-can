<template>
  <div class="vx-scene">
    <vx-header :showRrefresh="1" :showHome="1" :title="deviceName" @home="$router.push({ path: '/' })"></vx-header>
    <div class="vx-container">
      <vx-tcnbtn @take="take" @cut="cut" @swipe="swipe"></vx-tcnbtn>
      <div class="vx-scene_list">
        <div class="vx-scene_item" :class="{selected:scene.id == selected}" v-for="(scene,index) in scenes" :key="scene.id" @click="selecteds(scene)">
          <div class="no" :class="{online:scene.sceneStatus}">
            {{scene.id}}
          </div>
          <div class="operator">
            <div class="source_name">{{scene.name}}</div>
            <div class="edit" @click.stop="edit">
              <img src="../assets/common/edit.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="operators">
        <div class="loadscene" @click="loadScene(scenes)">
          <img src="../assets/common/load.png" height="20" width="20" slot="icon">
          <label>{{$t('scenes.loadScene')}}</label>
        </div>
        <div class="savescene" @click="save">
          <img src="../assets/common/save_scene.png" height="20" width="20" slot="icon">
          <label>{{$t('scenes.saveScene')}}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import htp from "../api/http";
  import url from '../api/apiurl';
  import { Indicator, Toast, MessageBox } from 'mint-ui';
  import { getLoc } from 'src/utils';
  export default {
    name: 'scene',
    data() {
      return {
        deviceName: '',
        scenes: [],
        selected: ''
      };
    },
    created() {
      this.deviceName = getLoc('device').deviceName;
      this.getScenes();
      this.getCurScene();
    },
    methods: {
      selecteds(scene) {
        this.selected = scene.id;
      },
      getCurScene() {
        htp.get(url.getCurScene)
          .then(res => {
            this.selected = res.data.sceneCur;
          });
      },
      getScenes() {
        htp.get(url.getSceneList).then(res => {
          if(res.status === 10000000) {
            this.scenes = res.data.sceneList;
          }
        });
      },
      //载入场景
      loadScene: async function(scenes) {
        console.log(this.selected);
        let noStatus = scenes.filter(v => {
          return v.sceneStatus == 0;
        });
        this.$confirm('Are you sure?').then(action => {
          // var flag = noStatus.some(item => item.id === this.selected);
          // if (flag) {
          //   MessageBox.alert(`无法载入当前场景`);
          // } else {
            this.setLoadScene();
          // }
        });
      },
      //保存场景
      setLoadScene: async function() {
        let params = {
          sceneId: this.selected
        };
        const res = await htp.post(url.setLoadScene, params);
        return res;
      },
      save: async function() {
        this.$confirm('Are you sure?').then(action => {
          this.saveScene().then(res => {
            Toast(res.msg);
            this.getScenes();
          });
        });

      },
      saveScene: async function() {
        let params = {
          sceneId: this.selected
        };
        const res = await htp.post(url.saveScene, params);
        return res;
      },
      take() {
        let takeMessage = {};
          takeMessage.takeCommand = 0;
        htp.post(url.commandMessage, takeMessage)
          .then(res => {
            if(res.status === 10000001) {
              Toast('下发失败');
            }
          });
      },
      cut() {
        let takeMessage = {};
          takeMessage.takeCommand = 2;
        htp.post(url.commandMessage, takeMessage)
          .then(res => {
            if(res.status === 10000001) {
              Toast('下发失败');
            }
          });
      },
      swipe() {
        let takeMessage = {};
          takeMessage.takeCommand = 1;
        htp.post(url.commandMessage, takeMessage)
          .then(res => {
            if(res.status === 10000001) {
              Toast('下发失败');
            }
          });
      },
      edit() {
        let re = /^[a-zA-Z0-9_\u4e00-\u9fa5]{20}$/;
         MessageBox.prompt(' ', '名称修改').then(({ value }) => {
          if(value) {
            console.log(re.test(value));
            if(!re.test(value)) {
               MessageBox.alert(`输入的字符不合法`);
            } else {
              htp.post(url.alterSceneName, {sceneId: this.selected, sceneName: value})
              .then(res => {
                 this.getScenes();
                 this.getCurScene();
              });
            }
          }
        });
      }
    }

  };
</script>

<style lang="less" scoped>
  .vx-scene {
      &_list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .vx-scene_item {
              background-color: #6b7082;
              box-shadow: 2px 2px 5px #171719;
              border: 2px solid #212124;
              box-sizing: border-box;
              border-radius: 10px;
              .no {
                  text-align: center;
                  color: #ffffff;
              }
              .online {
                  background-color: #3699f9;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
              }
              .operator {
                  border-top: 1px solid #2b2c33; /*no*/
                  background-color: #40434c;
                  height: 60px;
                  width: 100%;
                  border-bottom-left-radius: 10px;
                  border-bottom-right-radius: 10px;
                  position: relative;
                  .source_name {
                      line-height: 60px;
                      padding-left: 8px;
                      color: #a4a4a4;
                      font-size: 14px; /*no*/
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      word-wrap: break-word;
                      word-break: break-all;
                  }
                  .edit {
                      height: 60px;
                      line-height: 60px;
                      width: 50px;
                      position: absolute;
                      right: 0;
                      top: 0;
                      img {
                          width: 30px;
                          height: 30px;
                          vertical-align: middle;
                      }
                  }
              }
          }
          .selected {
              border: 2px solid #fd7b00;
              border-radius: 10px;
          }
      }
      .operators {
          margin: 30px 85px;
          display: flex;
          height: 70px;
          .loadscene,
          .savescene {
              flex: 1;
              border: 1px solid #b0b0b0; /*no*/
              border-radius: 5px;
              text-align: center;
              height: 70px;
              line-height: 70px;
              color: #fff;
              font-size: 14px; /*no*/
              img {
                  display: inline-block;
                  vertical-align: middle;
              }
              label {
                  padding-left: 20px;
              }
          }
          .loadscene {
              margin-right: 50px;
          }
      }
  }

  /*竖屏模式*/
  @media screen and (orientation: portrait) {
      .vx-scene {
          &_list {
              margin: 30px 35px;
              .vx-scene_item {
                  width: 30%;
                  margin-bottom: 25px;

                  .no {
                      height: 95px;
                      line-height: 95px;
                      font-size: 14px; /*no*/
                  }
              }
          }
      }
  }
  /*横屏模式*/
  @media screen and (orientation: landscape) {
      .vx-scene {
          &_list {
              margin: 30px 35px;
              .vx-scene_item {
                  width: 15%;
                  margin-bottom: 25px;

                  .no {
                      height: 95px;
                      line-height: 95px;
                      font-size: 14px; /*no*/
                  }
              }
          }
      }
  }
</style>
