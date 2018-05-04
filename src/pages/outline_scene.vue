<template>
  <div class="vx-scene">
    <vx-header :showRrefresh="1" :showHome="1" @home="$router.push({ path: '/outline_index' })" :title="deviceName"></vx-header>
    <div class="vx-container">
      <vx-tcnbtn @take="take"></vx-tcnbtn>
      <div class="vx-scene_list">
        <div class="vx-scene_item" :class="{selected:scene.id == selected}" v-for="(scene,index) in scenes" :key="scene.id" @click="selected = selected == scene.id?'':scene.id">
          <div class="no" :class="{online:scene.sceneStatus}">
            {{scene.id}}
          </div>
          <div class="operator">
            <div class="source_name">{{scene.name}}</div>
            <div class="edit" @click="edit">
              <img src="../assets/common/edit.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="operators">
        <div class="loadscene" @click="loadScene">
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

  import { Indicator, Toast } from 'mint-ui';
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
    },
    methods: {
      getScenes() {
        let sceneList = [{ "id": 1, "name": "模板 1", "sceneStatus": 0 }, { "id": 2, "name": "模板 2", "sceneStatus": 0 }, { "id": 3, "name": "模板 3", "sceneStatus": 0 }, { "id": 4, "name": "模板 4", "sceneStatus": 0 }, { "id": 5, "name": "模板 5", "sceneStatus": 0 }, { "id": 6, "name": "模板 6", "sceneStatus": 0 }, { "id": 7, "name": "模板 7", "sceneStatus": 0 }, { "id": 8, "name": "模板 8", "sceneStatus": 0 }, { "id": 9, "name": "模板 9", "sceneStatus": 0 }, { "id": 10, "name": "模板 10", "sceneStatus": 0 }, { "id": 11, "name": "模板 11", "sceneStatus": 0 }, { "id": 12, "name": "模板 12", "sceneStatus": 0 }, { "id": 13, "name": "模板 13", "sceneStatus": 0 }, { "id": 14, "name": "模板 14", "sceneStatus": 0 }, { "id": 15, "name": "模板 15", "sceneStatus": 0 }, { "id": 16, "name": "模板 16", "sceneStatus": 0 }];
        this.scenes = sceneList;
      },
      loadScene() {
        this.$confirm('Are you sure?').then(action => {
          Toast(this.$t('common.successful'));
        });

      },
      save() {
        this.$confirm('Are you sure?').then(action => {
          Toast(this.$t('common.successful'));
          this.getScenes();
        });

      },
      take() {
        console.log('take');
      },
      edit() {
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
                      color: #a4a4a4;
                      font-size: 14px; /*no*/
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
