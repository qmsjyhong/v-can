<template>
  <div class="source_swipe">
    <vx-header :showHome="1" :showReset="1" :showArrow="1" :title="deviceName" @home="$router.push({ path: '/outline_index' })"></vx-header>
    <div class="vx-container">
      <div class="source_swipe_content">
        <vx-cell :title="$t('common.quickSelect')" :value="selectedSource.title" @link="setSource = true"></vx-cell>
        <div class="sources">
          <div class="sources-item" :class="{border:selected.id === source.id}" v-for="(source,index) in inputSourceList" :key="index" @click.stop="selSource(source)">
            <div class="detail">
              <div class="icon">
                <img v-if="source.status" :src="source.activeIcon" alt="">
                <img v-else :src="source.normalIcon" alt="">
              </div>
              <div class="info">
                {{source.width}}*{{source.height}}@{{source.refresh}}Hz
              </div>
            </div>
            <div class="operator">
              <div class="source_name">{{source.name}}</div>
              <div class="edit" @click.stop="edit">
                <img src="../assets/common/edit.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mt-popup v-model="setSource" position="bottom" class="sourcepop">
      <source-list @select-source="selectSource"></source-list>
    </mt-popup>
  </div>
</template>

<script>
  import { MessageBox, Toast } from 'mint-ui';
  import sourceList from './outline_sourceList';
  import { getLoc } from 'src/utils';
  export default {
    components: {
      sourceList,
      Toast
    },
    data() {
      return {
        deviceName: '',
        selectedSource: {
        },
        selected: {},
        inputSourceList: [],
        setSource: false
      };
    },
    created() {
      this.deviceName = getLoc('device').deviceName;
      this.getInputSourceList();
    },
    methods: {
      getInputSourceList(params) {
        this.inputSourceList = [{ "status": 0, "id": 1, "refresh": 0, "height": 0, "width": 0, "name": "HDMI1", "type": 1 }, { "status": 0, "id": 2, "refresh": 0, "height": 0, "width": 0, "name": "HDMI2", "type": 1 }, { "status": 0, "id": 3, "refresh": 0, "height": 0, "width": 0, "name": "3G-SDI1", "type": 3 }, { "status": 0, "id": 4, "refresh": 0, "height": 0, "width": 0, "name": "3G-SDI2", "type": 3 }, { "status": 0, "id": 5, "refresh": 0, "height": 0, "width": 0, "name": "DVI", "type": 0 }, { "status": 0, "id": 6, "refresh": 0, "height": 0, "width": 0, "name": "CVBS1", "type": 4 }, { "status": 0, "id": 7, "refresh": 0, "height": 0, "width": 0, "name": "CVBS2", "type": 4 }, { "status": 0, "id": 8, "refresh": 0, "height": 0, "width": 0, "name": "VGA1", "type": 2 }, { "status": 0, "id": 9, "refresh": 0, "height": 0, "width": 0, "name": "VGA2", "type": 2 }, { "status": 1, "id": 10, "refresh": 60, "height": "1080p", "width": 1920, "name": "USB", "type": 10 }];
        this.inputSourceHandler();
      },
      inputSourceHandler() {
        this.inputSourceList.forEach(source => {
          switch(source.type) {
            case 0:
              source.normalIcon = require('../assets/source_icons/dvi.png');
              source.activeIcon = require('../assets/source_icons/dvi_active.png');
              break;
            case 7:
            case 8:
              source.normalIcon = require('../assets/source_icons/dp.png');
              source.activeIcon = require('../assets/source_icons/dp_active.png');
              break;
            case 1:
            case 6:
            case 9:
              source.normalIcon = require('../assets/source_icons/hdmi.png');
              source.activeIcon = require('../assets/source_icons/hdmi_active.png');
              break;
            case 2:
              source.normalIcon = require('../assets/source_icons/vga.png');
              source.activeIcon = require('../assets/source_icons/vga_active.png');
              break;
            case 4:
              source.normalIcon = require('../assets/source_icons/cvbs.png');
              source.activeIcon = require('../assets/source_icons/cvbs_active.png');
              break;
            case 3:
              source.normalIcon = require('../assets/source_icons/sdi.png');
              source.activeIcon = require('../assets/source_icons/sdi_active.png');
              break;
            case 10:
              source.normalIcon = require('../assets/source_icons/usb.png');
              source.activeIcon = require('../assets/source_icons/usb_active.png');
              break;
            case 11:
              source.normalIcon = require('../assets/source_icons/hd_base.png');
              source.activeIcon = require('../assets/source_icons/hd_base_active.png');
              break;
            default:
              source.normalIcon = require('../assets/source_icons/wz.png');
              source.activeIcon = require('../assets/source_icons/wz_active.png');
              break;
          }
        });
      },
      selSource(source) {
        if(Object.keys(this.selectedSource).length === 0) {
          Toast('请先选择窗口！');
        } else {
          this.selected = source;
        }
      },
      selectSource(o) {
        // console.log(o);
        this.setSource = false;
        this.selectedSource = o;
      },
      edit() {
        MessageBox.prompt(' ', '名称修改').then(({ value }) => {
          if(value) {
            MessageBox.alert(`你的名字是 ${value}`, '输入成功');
          }
        });
      }
    }
  };
</script>
<style scoped lang="less">
  .border {
      border: 1px solid #ff6700; /*no*/
  }
  .source_swipe_content {
      margin-top: 30px;
      .sources {
          margin: 20px auto;
          width: 85%;
          display: flex;
          flex-wrap: wrap;
          .sources-item {
              background-color: #41434b;
              .detail {
                  width: 100%;
                  height: 150px;
                  .icon {
                      height: 90px;
                      line-height: 90px;
                      text-align: center;
                      img {
                          display: inline-block;
                          vertical-align: middle;
                          width: 146px;
                          height: 90px;
                      }
                  }
                  .info {
                      height: 60px;
                      line-height: 60px;
                      font-size: 22px;
                      color: #909090;
                  }
              }
              .operator {
                  border-top: 1px solid #2b2c33; /*no*/
                  height: 60px;
                  width: 100%;
                  position: relative;
                  .source_name {
                      line-height: 60px;
                      color: #a4a4a4;
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
          .active {
              border: 2px solid #ef811f;
          }
      }
  }

  @media screen and (orientation: portrait) {
      .sources-item {
          width: 46%;
          height: 210px;
          margin-left: 8%;
          margin-bottom: 30px;
          box-sizing: border-box;
          box-shadow: 2px 5px 5px #171719;
          border-radius: 6px;
          &:nth-child(2n + 1) {
              margin-left: 0;
          }
      }
  }
  /*横屏模式*/
  @media screen and (orientation: landscape) {
      .sources-item {
          width: 22%;
          height: 210px;
          margin-left: 4%;
          margin-bottom: 30px;
          box-sizing: border-box;
          box-shadow: 2px 5px 5px #171719;
          border-radius: 6px;
          &:nth-child(4n + 1) {
              margin-left: 0;
          }
      }
  }
</style>

