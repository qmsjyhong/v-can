<template>
  <div class="source_swipe">
    <vx-header :showHome="1" :showReset="1" :showArrow="1" :title="deviceName" @reset='reset' @home="$router.push({ path: '/' })"></vx-header>
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
              <!-- <div class="edit" @click.stop="edit">
                <img src="../assets/common/edit.png" alt="">
              </div> -->
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
  import htp from "../api/http";
  import sourceList from './sourceList';
  import { getLoc } from 'src/utils';
  import url from '../api/apiurl';
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
      reset() {
        window.location.reload();
      },
      getInputSourceList: async function(params) {
        await htp.get(url.getInputSourceList, params).then(res => {
          if(res.status === 10000000) {
            this.inputSourceList = res.data.inputSourceList;
            this.inputSourceHandler();
          }
        });
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
          Toast(this.$t('common.selectWindow'));
        } else {
          this.selected = source;
          htp.post(url.setWinInput, {
            selectWindow: this.selectedSource.id,
            selectInput: this.selected.id
          })
            .then(res => {
              if(res.status === 10000001) {
                Toast(this.$t('common.requestFailed'));
              }
            });
        }
      },
      selectSource(o) {
        this.setSource = false;
        this.selectedSource = o;
        this.selected.id = this.selectedSource.inputSourceId;
      },
      edit() {
        // MessageBox.prompt(' ', '名称修改').then(({ value }) => {
        //   if(value) {
        //     MessageBox.alert(`你的名字是 ${value}`, '输入成功');
        //   }
        // });
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

