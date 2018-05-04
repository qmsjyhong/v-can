<template>
  <div class="scenarist js-scenarist" id="scenarist">
    <vx-header :showPrevious="1" :showResetL="1" :showsubmit="1" :title="$t('common1.scenarist')" @submit="submit" @previous="previous" @reset="resetScenarist"></vx-header>
    <div class="vx-container">
      <div class="scenarist-detail">
        <detail :show-width="showing.showWidth" :show-height="showing.showHeight" :win-width="showing.winWidth" :win-height="showing.winHeight" :win-left="showing.winLeft" :win-top="showing.winTop" :win-size="showing.winSize" :win-pos="showing.winPos"></detail>
      </div>
      <div class="scenarist-view">
        <div class="scenarist-view_cont js-scenarist-view_cont">
          <div class="row-line" v-for="(item, index) in lay.x"></div>
          <div class="column-line" v-for="(item, index) in lay.y"></div>
        </div>
        <div class="scenarist-view_icons">
          <div class="scenarist-view_iconsbox">
            <mt-button @click.native="btnPre">
              <img src="../../assets/common/pre.png" slot="icon" />
            </mt-button>
            <mt-button @click.native="btnNext">
              <img src="../../assets/common/next.png" slot="icon" />
            </mt-button>
            <mt-button @click.native="btnFirst">
              <img src="../../assets/common/first.png" slot="icon" />
            </mt-button>
            <mt-button @click.native="btnLast">
              <img src="../../assets/common/last.png" slot="icon" />
            </mt-button>
            <mt-button @click.native="toggleLock">
              <img src="../../assets/common/lock.png" slot="icon" v-show="lock" />
              <img src="../../assets/common/open-lock.png" slot="icon" v-show="!lock" />
            </mt-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 源-->
    <div class="sources js-sources">
      <div class="sources-item" nowrap="nowrap" v-for="(o,i) in source.inputSourceList" v-bind:key-index="i" ref="'source'+i" :data-id="o.id" :data-type="o.type" v-touch:pan="pan">
        <span :class="mapPicture[o.type] + (o.status===0 ?'':'_active')" class="device_icon"></span>
        <div class="title">{{o.name}}</div>
      </div>
    </div>
    <scenbtns :dot-style="showholdBaner.dot" :show-style="showholdBaner.style" :show-hold="showholdBaner.showHold" @cut-source="cutSource" @set-layout="setLayout" @set-definition="setDefinition" @set-border="setBorder">
    </scenbtns>

    <!-- 源截取模态框 -->
    <interception v-if="showInterception" v-show="showInterception" :show="showInterception" @save-cut="saveCut"></interception>
    <!-- 窗口布局模态框 -->
    <scenarist-layout v-if="showLayout" v-show="showLayout" :show="showLayout" @save-layout="saveLayout" :winid="winid" :interceptionHaW="interceptionHaW"></scenarist-layout>
    <!-- 边框模态框 -->
    <window-border v-show="showWinBorder" :show="showWinBorder" :options="windowBorders" :bgColor="bgColors" @save-border="saveBorder"></window-border>
    <!-- 画质模态框 -->
    <quality v-if="showQuality" v-show="showQuality" :winid="winid" :show="showQuality" :color="color" @save-quality="saveQuality"></quality>

    <save-scena :save-scenarist="saveScenarist" :ctext="ctext" @closeCancel="() => {this.saveScenarist = false;this.selectShow = false;this.ctext='';}" @startSelect="() => this.selectShow = true" @savescena="savesce"></save-scena>
    <select-scena :slots="slots" v-if="selectShow" @onValuesChange="val => {this.ctext = val.name;this.current=val}" @cancelSelect="val => this.selectShow = false"></select-scena>
  </div>
</template>

<script>
  import viewList from './viewlist';
  import detail from './detail';
  import viewSourec from './view';
  import scenbtns from './scenbtns';
  import windowBorder from './window-border';
  import interception from './outline_interception';
  import scenaristLayout from './outline_scenarist-layout';
  import quality from './quality';
  import Nova from '../../utils/gesture';
  import $ from 'zepto';
  import htp from "../../api/http";
  import url from '../../api/apiurl';
  import { Toast } from 'mint-ui';
  import saveScena from './saveScenarist';
  import selectScena from './selectScenarist';
  /**
   * startMouseX  鼠标拖动时的x
   * left clone元素的left
   * isadd 是否已经加到父元素中
   * leftStatus 是否是做拖动
   * zindex 记录当前的拖拽个数
   */
  var startMouseX,
    startMouseY,
    width,
    height,
    left,
    top,
    $clone,
    $show,
    isadd,
    $sources,
    scrollWidth,
    zindex = 1,
    inputSourceId,
    winid = 1,
    winids = [],
    scroll = 0,
    $currentDom,
    space = 20,
    showWintop,
    maxWinNum, // 开窗最大上限。
    winList = [], // 所有窗的列表， 包括关的， 开的。
    deviceType, // 设备类型
    currentTargetObj,
    showWinleft;
  var ajaxFn = {
    // 设置窗口 位置大小
    setWinParam($targetObj, self) {
      return htp.post(url.setWinParam, {
        windowId: $targetObj.data('winid'),
        windowStartX: self.showing.winLeft,
        windowStartY: self.showing.winTop,
        windowWidth: self.showing.winWidth,
        windowHeight: self.showing.winHeight
      });
    },
    //开关窗
    setWinStatus(windowId, status) {
      return htp.post(url.setWinStatus, { windowId: windowId, windowStatus: status });
    },
    // 设置窗口源信息。
    setWinInput(windowId, selectInput) {
      return htp.post(url.setWinInput, { selectWindow: windowId, selectInput: selectInput });
    },
    // 获取源信息
    getInputSourceList() {
      return htp.get(url.getInputSourceList);
    },
    // 获取 显示屏分辨率
    getOutputResolutionRatio() {
      return htp.get(url.getOutputResolutionRatio);
    },
    //获取窗口列表
    getWinList() {
      return htp.get(url.getWinList);
    },
    // 获取 场景列表
    getSceneList() {
      return htp.get(url.getSceneList);
    },
    //设置保存场景
    saveScene(sceneId) {
      return htp.post(url.saveScene, { sceneId: sceneId });
    },
    //获取瓶体结构
    getScreenStructure() {
      return htp.get(url.getScreenStructure);
    },
    //重新z 序
    setWinZOrder() {
      var result = [], copy = [];
      $('.js-btns').each((i, item) => {
        var $item = $(item);
        result.push({
          id: +$item.data('winid'),
          priority: +$item.data('index')
        });
      });
      winList.forEach(item => {
        var flags = false;
        result.forEach(it => {
          if(it.id === item.id) {
            flags = true;
            item.priority = it.priority;
          }
        });
        flags || copy.push({
          id: item.id,
          priority: item.priority
        });
      });
      copy = copy.concat(result);
    },
    //获取网口数量。
    getPortSize() {
      return htp.get(url.getPortSize);
    }
  };
  var processFn = {
    // 计算hold 手势时出现的 模态框 的位置 大小
    getbannerInfo: function(banner, container, boxwidth, boxleft) {
      var defualtWidth = 270;
      if(deviceType === 25089 || deviceType === 25089 || deviceType === 25089) {
        defualtWidth = 120;
      }
      console.log(deviceType);
      var $banner = $(banner),
        $container = $(container),
        cleft = $container.offset().left,
        bawidth = $banner.width() || defualtWidth,
        cwidth = $container.width(),
        ratio = (cwidth - bawidth) / (cwidth - boxwidth),
        relativeLeft = boxleft - cleft, box,
        banleft = relativeLeft * ratio + cleft,
        dotleft = boxwidth / 2 + (relativeLeft - banleft);
      return {
        banleft: banleft,
        dotleft: dotleft
      };
    },
    // 删除源 或者 源拖动失败 时重置
    removeSource: function($targetObj) {
      $targetObj.remove();
      zindex -= 1;
    },
    // 设置按钮状态， 并且获取锁的状态。
    moveBtn: function($targetObj, self, style) {
      $targetObj.find('.move-btn').addClass('active');
      $targetObj.siblings('.btns').find('.move-btn').removeClass('active');
      // 同步数据
      self.lock = false;
      this.showWinInfo(style, self);
      self.currentZindex = $targetObj.data('index');
      self.inputSourceId = $targetObj.find('.sources-item').data('id');
      self.winid = $targetObj.data('winid');
      $currentDom = $targetObj;
      currentTargetObj = $targetObj;
    },
    // 写入当前的 zindex
    setIndex: function($target, index) {
      $target.data('index', index).css('zIndex', index);
    },
    // 源拖到 屏幕 开窗时的 固定大小
    getPosition1(info, self) {
      var left = info.left - info.cleft;
      var top = info.top - info.ctop;
      if(left < 0 || top < 0 || left > info.cwidth || top > info.cheight) {
        return false;
      }
      return {
        left: info.left,
        top: info.top,
        width: 800 / self.showing.widthRatio,
        height: 600 / self.showing.heightRatio
      };
    },
    // 源拖到 屏幕 开窗时的 自动吸附。
    getPosition: function(info) {
      var left = info.left - info.cleft;
      var top = info.top - info.ctop;
      if(left < 0 || top < 0 || left > info.cwidth || top > info.cheight) {
        return false;
      }
      var perWidth = info.cwidth / info.row;
      var perHeight = info.cheight / info.col;
      var row = Math.ceil(left / perWidth);
      var col = Math.ceil(top / perHeight) || 1;
      return {
        left: ((row - 1) * perWidth + info.cleft),
        top: ((col - 1) * perHeight + info.ctop),
        width: perWidth,
        height: perHeight
      };
    },
    // 自动吸附
    autoCover: function(info) {
      var perWidth = info.cwidth / info.row;
      var perHeight = info.cheight / info.col;
      var innerLeft = info.left - info.cleft;
      var innerTop = info.top - info.ctop;
      var left = Math.floor(innerLeft / perWidth) * perWidth;
      var top = Math.floor(innerTop / perHeight) * perHeight;
      left = left < 0 ? 0 : left;
      top = top < 0 ? 0 : top;
      var right = Math.ceil((innerLeft + info.width) / perWidth) * perWidth;
      var width = right - left;
      var bottom = Math.ceil((innerTop + info.height) / perHeight) * perHeight;
      var height = bottom - top;
      width = width + left > info.cwidth ? (info.cwidth - left) : width;
      height = height + top > info.cheight ? (info.cheight - top) : height;
      return {
        left: left + info.cleft,
        top: top + info.ctop,
        width: width,
        height: height
      };
    },
    condition(target, info) {
      target = target.split(',');
      info = info.split(',');
      var tLeft = +target[2],
        tTop = +target[3],
        tBottom = +tTop + (+target[1]),
        tRight = +tLeft + (+target[0]),
        iLeft = +info[2],
        iTop = +info[3],
        iBottom = +iTop + (+info[1]),
        iRight = +iLeft + (+info[0]);
      var x = (iLeft > tLeft && iRight < tRight);
      var y = (iTop > tTop && iBottom < tBottom);
      return x && y;

    },
    // 计算 覆盖
    replaceWins($box, info, $clone) {
      var result = [], replace;
      var max = 0;
      $box.find('[data-info]').each(function(i, item) {
        var target = $(item).data('info');
        if(processFn.condition(target, info)) {
          result.push($(item));
        }
      });
      if(result.length === 0) {
        return false;
      } else {
        if(result.length > 1) {
          result.forEach((item, i) => {
            var zNum = item.data('index');
            if(zNum > max) {
              max = zNum;
              replace = item;
            }
          });
        } else {
          replace = result[0];
        }
        var currentIndex = replace.data('index');
        var windowId = replace.data('winid');
        var islock = replace.find('.js-move-lock').data('lock');
        var style = replace.attr('style');
        var styleInfos = replace.data('info');
        if(islock) {
          return false;
        } else {
          $clone.data('winid', windowId);
          $clone.data('index', currentIndex).css('zIndex', currentIndex);
          $clone.attr('style', style).data('info', styleInfos);
          return replace;
        }
      }
    },
    // 写入 当前的位置状态。
    writeInfo: function($dom, style) {
      var info = [style.width, style.height, style.left, style.top].join(',');
      $dom.data('info', info);
      return info;
    },
    // 拖源是否 覆盖
    replaceWin: function($box, info) {
      var $current = $box.find('[data-info="' + info + '"]');
      if($current.length > 1) {
        var currentIndex = $current.eq(0).data('index');
        var windowId = $current.eq(0).data('winid');
        var islock = $current.eq(0).find('.js-move-lock').data('lock');
        if(islock) {
          return false;
        } else {
          $current.eq(1).data('winid', windowId);
          $current.eq(1).data('index', currentIndex).css('zIndex', currentIndex);
          return $current.eq(0);
        }
      }
    },
    // 给拖动的源锁定状态下的 事件处理
    maskEvent: function($targetObj, self) {
      var that = this;
      $targetObj.find('.js-move-lock').on('tap', function(ev) {
        ev.stopPropagation();
        //锁状态的读取；
        $targetObj.find('.move-btn').removeClass('active');
        $targetObj.siblings('.btns').find('.move-btn').removeClass('active');
        var style = $targetObj.data('info').split(',');
        style = {
          width: style[0],
          height: style[1],
          left: style[2],
          top: style[3]
        };
        // 同步数据
        self.lock = true;
        that.showWinInfo(style, self);
        self.currentZindex = $targetObj.data('index');
        self.inputSourceId = $targetObj.find('.sources-item').data('id');
        self.winid = $targetObj.data('winid');
        $currentDom = $targetObj;
      });
    },
    // 显示 屏幕， 窗口 源的 信息
    showWinInfo: function(style, self, tureData) {
      if(style) {
        if(!tureData) {
          self.showing.winWidth = Math.round(style.width * self.showing.widthRatio);
          self.showing.winHeight = Math.round(style.height * self.showing.heightRatio);
          self.showing.winLeft = Math.round((style.left - showWinleft) * self.showing.widthRatio);
          self.showing.winTop = Math.round((style.top - showWintop) * self.showing.heightRatio);
        } else {
          self.showing.winWidth = style.width;
          self.showing.winHeight = style.height;
          self.showing.winLeft = style.left;
          self.showing.winTop = style.top;
        }
        self.showing.winSize = true;
        self.showing.winPos = true;
      } else {
        self.showing.winSize = false;
        self.showing.winPos = false;
      }
    },
    // 拖动源的 手势绑定
    bindEvent: function($clone, self, style, $show) {
      processFn.maskEvent($clone, self);
      //读取 拖拽源状态
      processFn.moveBtn($clone, self, style);
      //初始化设置
      var nova = new Nova();
      nova.init($clone, {
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
        maxWidth: $show.width(),
        maxHeight: $show.height()
      }, function() { });
      // 右下按钮事件
      nova.rightbottom($clone, function($targetObj, style) {
        processFn.showWinInfo(style, self);
        processFn.writeInfo($targetObj, style);
        //ajaxFn.setWinParam($targetObj, self);
      });
      // 左下按钮事件
      nova.leftbottom($clone, function($targetObj, style) {
        processFn.showWinInfo(style, self);
        processFn.writeInfo($targetObj, style);
        //ajaxFn.setWinParam($targetObj, self);
      });
      // 右上按钮事件
      nova.rightTop($clone, function($targetObj) {
        var removeIndex = $targetObj.data('index');
        $('.js-btns').each(function(i, item) {
          var $item = $(item);
          var itemIndex = $item.data('index');
          if(itemIndex > removeIndex) {
            processFn.setIndex($item, itemIndex - 1);
          }
        });
        var id = $targetObj.data('winid');
        processFn.setWinids(id);
        processFn.removeSource($targetObj);
        self.showholdBaner.showHold = false;
        processFn.showWinInfo(false, self);
        ajaxFn.setWinZOrder();
      });
      //
      // 左上  和  双击doubletap 按钮事件
      nova.lefttop($clone, function($targetObj, width, height, left, top, callback) {
        var cOffset = $show.offset();
        var style = processFn.autoCover({
          cwidth: $show.width(),
          cheight: $show.height(),
          cleft: cOffset.left,
          ctop: cOffset.top,
          width: width,
          height: height,
          left: left,
          top: top,
          row: self.lay.y + 1,
          col: self.lay.x + 1
        });
        $targetObj.css({
          left: style.left + 'px',
          top: style.top + 'px',
          width: style.width + 'px',
          height: style.height + 'px'
        });
        processFn.writeInfo($targetObj, style);
        processFn.showWinInfo(style, self);
        // 发送请求
        //ajaxFn.setWinParam($targetObj, self);
        callback(style.width, style.height, style.left, style.top);
      });
      //初始化缩放手势（不需要就注释掉
      nova.scale($clone, function($targetObj, style) {
        processFn.writeInfo($targetObj, style);
        processFn.showWinInfo(style, self);
        //ajaxFn.setWinParam($targetObj, self);
      });
      //拖动事件
      nova.drag($clone, function($targetObj, left, top, width, height) {
        self.showholdBaner.showHold = false;
        var cOffset = $show.offset();
        if(!$targetObj) {
          return;
        }
        if(cOffset.top > top + height || cOffset.top + $show.height() < top || cOffset.left > left + width || cOffset.left + $show.width() < left) {
          var id = $targetObj.data('winid');
          processFn.setWinids(id);
          processFn.removeSource($targetObj);
          self.showholdBaner.showHold = false;
          processFn.showWinInfo(false, self);
          ajaxFn.setWinZOrder();
          return;
        }
        var style = {
          width: width,
          height: height,
          left: left,
          top: top
        };
        processFn.writeInfo($targetObj, style);
        processFn.showWinInfo(style, self);
        //ajaxFn.setWinParam($targetObj, self);
      });
      // hold 按住 出现设置
      nova.hold($clone, function($targetObj, left, top, width, height) {
        self.showholdBaner.showHold = true;
        // 根据拖拽源 的位置， 计算 hold banner 的位置。
        var result = processFn.getbannerInfo('.scenarist-btns', '.js-scenarist-view_cont', width, left);
        self.showholdBaner.style = {
          top: (top - 55) + 'px',
          left: result.banleft + 'px',
          zIndex: '999'
        };
        self.showholdBaner.dot = {
          left: result.dotleft + 'px'
        };
        processFn.moveBtn($targetObj, self, {
          width: width,
          height: height,
          left: left,
          top: top
        });
      });
      // 手指单击 设置隐藏。
      nova.tap($clone, function($targetObj, style) {
        processFn.moveBtn($targetObj, self, style);
      });
    },
    renderWin: function(res, self, ratio, cOffset) {
      if(res.status !== 10000000) {
        return;
      }
      showWintop = $show.offset().top;
      showWinleft = $show.offset().left;
      winList = res.data.winList;
      maxWinNum = winList.length;
      var data = winList.filter(item => item.status === 1);
      data.forEach(function(item, i) {
        var width = item.width / ratio.x,
          height = item.height / ratio.y,
          left = item.startX / ratio.x + cOffset.x,
          top = item.startY / ratio.y + cOffset.y;
        var style = `position: absolute;
                    z-index: ${item.priority};
                    opacity: 1;
                    left: ${left}px;
                    top: ${top}px;
                    width: ${width}px;
                    height: ${height}px;`;
        var styles = {
          width: width,
          height: height,
          left: left,
          top: top
        };
        winids.push(item.id);
        item.info = [width, height, left, top].join(',');
        var $html = $(`<div class="btns js-btns" data-index="${item.priority}" data-info="${item.info}" data-winid="${item.id}" style="${style}">
                      <div class="move-btn btnLt"></div>
                      <div class="move-btn btnRt"></div>
                      <div class="move-btn btnRb"></div>
                      <div class="move-btn btnLb"></div>
                      <div class="move-lock js-move-lock" data-lock="false"></div>
                      <div nowrap="nowrap" data-id="${item.inputSourceId}" class="sources-item" style="width:100%; height: 100%; margin-left: 0">
                        <span class="${self.mapPicture[item.inputSourceType]}_active device_icon"></span>
                        <div class="title">${item.name}</div>
                      </div>
                    </div>`);
        $('.js-scenarist').append($html);
        zindex = item.priority + 1;
        processFn.bindEvent($html, self, styles, $show);
      });
    },
    // 读取开窗的位置大小。
    readScreenInfo(self, res) {
      if(res.status === 10000000) {
        self.showing.showWidth = res.data.width;
        self.showing.showHeight = res.data.height;
        self.showing.widthRatio = self.showing.showWidth / $show.width();
        self.showing.heightRatio = self.showing.showHeight / $show.height();
        return {
          x: self.showing.widthRatio,
          y: self.showing.heightRatio
        };
      }
    },
    // 整理 winds
    setWinids(num) {
      var index = winids.indexOf(num);
      winids.splice(index, 1);
    },
    // 根据实际数值， 重新设置 窗口的位置大小。
    setinputPosition(option, self) {
      currentTargetObj.css({
        width: option.windowWidth / self.showing.widthRatio,
        height: option.windowHeight / self.showing.heightRatio,
        left: option.windowStartX / self.showing.widthRatio + showWinleft,
        top: option.windowStartY / self.showing.heightRatio + showWintop
      });
      processFn.showWinInfo({
        width: option.windowWidth,
        height: option.windowHeight,
        left: option.windowStartX,
        top: option.windowStartY
      }, self, true);
    }
  };
  export default {
    created() {
      this.lay = {};
      var self = this;
      //获取瓶体结构 screenCols: 1, screenRows: 1, screenNum: 1
      self.lay.x = 1;
      self.lay.y = 1;
      // 获取场景列表
      self.slots = [{
        "id": 1,
        "name": "模板 1",
        "sceneStatus": 0
      }, {
        "id": 2,
        "name": "模板 2",
        "sceneStatus": 0
      }, {
        "id": 3,
        "name": "模板 3",
        "sceneStatus": 0
      }, {
        "id": 4,
        "name": "模板 4",
        "sceneStatus": 0
      }, {
        "id": 5,
        "name": "模板 5",
        "sceneStatus": 1
      }, {
        "id": 6,
        "name": "模板 6",
        "sceneStatus": 1
      }, {
        "id": 7,
        "name": "模板 7",
        "sceneStatus": 0
      }, {
        "id": 8,
        "name": "模板 8",
        "sceneStatus": 0
      }, {
        "id": 9,
        "name": "模板 9",
        "sceneStatus": 0
      }, {
        "id": 10,
        "name": "模板 10",
        "sceneStatus": 0
      }, {
        "id": 11,
        "name": "模板 11",
        "sceneStatus": 0
      }, {
        "id": 12,
        "name": "模板 12",
        "sceneStatus": 0
      }, {
        "id": 13,
        "name": "模板 13",
        "sceneStatus": 0
      }, {
        "id": 14,
        "name": "模板 14",
        "sceneStatus": 0
      }, {
        "id": 15,
        "name": "模板 15",
        "sceneStatus": 0
      }, {
        "id": 16,
        "name": "模板 16",
        "sceneStatus": 0
      }];
      // 请求源
      self.source = {
        "inputSourceList": [{
          "status": 0,
          "id": 1,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "HDMI1",
          "type": 1
        }, {
          "status": 0,
          "id": 2,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "HDMI2",
          "type": 1
        }, {
          "status": 0,
          "id": 3,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "3G-SDI1",
          "type": 3
        }, {
          "status": 0,
          "id": 4,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "3G-SDI2",
          "type": 3
        }, {
          "status": 0,
          "id": 5,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "DVI",
          "type": 0
        }, {
          "status": 0,
          "id": 6,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "CVBS1",
          "type": 4
        }, {
          "status": 0,
          "id": 7,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "CVBS2",
          "type": 4
        }, {
          "status": 0,
          "id": 8,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "VGA1",
          "type": 2
        }, {
          "status": 0,
          "id": 9,
          "refresh": 0,
          "height": 0,
          "width": 0,
          "name": "VGA2",
          "type": 2
        }]      };
      // 获取屏幕分辨率     获取窗口列表， 并会读数据。
      var res = [{
        "data": {
          "rate": 60,
          "height": 1080,
          "width": 1920
        },
        "errorCode": [],
        "status": 10000000
      }, {
        "data": {
          "winList": [{
            "status": 1,
            "id": 1,
            "inputSourceId": 10,
            "height": 700,
            "width": 900,
            "startY": 161,
            "name": "Window 1",
            "priority": 1,
            "startX": 117,
            "inputSourceType": 10
          }, {
            "status": 0,
            "id": 2,
            "inputSourceId": 2,
            "height": 542,
            "width": 132,
            "startY": 791,
            "name": "Window 2",
            "priority": 2,
            "startX": 143,
            "inputSourceType": 1
          }, {
            "status": 0,
            "id": 3,
            "inputSourceId": 3,
            "height": 600,
            "width": 800,
            "startY": 100,
            "name": "Window 3",
            "priority": 3,
            "startX": 200,
            "inputSourceType": 3
          }]
        },
        "errorCode": [],
        "status": 10000000
      }];
      setTimeout(function() {
        if(res[0].status === 10000000 && res[1].status === 10000000) {
          self.interceptionHaW.width = res[0].data.width;
          self.interceptionHaW.height = res[0].data.height;
          var ratio = processFn.readScreenInfo(self, res[0]);
          if(ratio) {
            var cOffset = { x: $show.offset().left, y: $show.offset().top };
            processFn.renderWin(res[1], self, ratio, cOffset);
          }
        }
      }, 1000);

      // 获取网口数量 判断是不是 vx6  , 如果是， hold时出现的 模态框入口。
      self.deviceType = deviceType = 25089;
    },
    mounted() {
      var self = this;
      // 设置 分格
      $('.row-line').each(function(i, item) {
        var per = `100%*${i + 1}/${self.lay.x + 1}`;
        $(item).css({ top: `calc(100%*${i + 1}/${self.lay.x + 1})` });
      });
      $('.column-line').each(function(i, item) {
        var per = `100%*${i + 1}/${self.lay.y + 1}`;
        $(item).css({ left: `calc(100%*${i + 1}/${self.lay.y + 1})` });
      });
      //document的全局事件
      $(document).on('tap.win', function() {
        self.showholdBaner.showHold = false;
      });
      $('.js-scenarist-child').on('tap.win', function(ev) {
        ev.stopPropagation();
      });
      $show = $('.js-scenarist-view_cont');
    },
    destroyed: function() {
      $(document).off('tap.win');
      $('.js-scenarist-child').off('tap.win');
    },
    components: {
      viewList,
      detail,
      viewSourec,
      scenbtns,
      interception,
      scenaristLayout,
      windowBorder,
      quality,
      Toast,
      saveScena,
      selectScena
    },
    data() {
      return {
        interceptionHaW: {
          width: '',
          height: ''
        },
        saveScenarist: false,
        showInterception: false,
        showLayout: false,
        showWinBorder: false,
        showQuality: false,
        currentZindex: '0',
        selectShow: false,
        ctext: '',
        current: {},
        // 显示屏大小， 窗口大小位置
        slots: [],
        deviceType: '', // 设备类型。
        mapPicture: ['dvi', 'hdmi', 'vga', 'sdi', 'cvbs', 'dual', 'hdmi', 'dpi', 'dpi', 'hdmi', 'usb', 'HDbaseT'],// 图片映射
        showing: {
          showWidth: '1920',
          showHeight: '1080',
          winWidth: '',
          winHeight: '',
          winLeft: '',
          winTop: '',
          winSize: false,
          winPos: false,
          widthRatio: 5.9,
          heightRatio: 5.8
        },
        lock: false, // 锁按钮控制；
        //hold 按住显示的banner
        showholdBaner: {
          showHold: false,
          style: {
            top: 0,
            left: 0,
            zIndex: '999'
          },
          dot: {
            left: 0
          }
        },
        // 源截取
        source: {
          sourceList: [

          ],
          show: 0,
          selected: {
            icon: '',
            title: ''
          }
        },
        //源截取 模态框
        // sourceCut: {
        //   width: {
        //     title: this.$t('common.width'),
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     }
        //   },
        //   height: {
        //     title: this.$t('common.height'),
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     }
        //   },
        //   x: {
        //     title: this.$t('common.X'),
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     }
        //   },
        //   y: {
        //     title: this.$t('common.Y'),
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     }
        //   }
        // },
        //布局
        // layouts: [
        // {
        //   title: this.$t('common.mask'),
        //   opts: {
        //     width: {
        //       title: this.$t('common.up'),
        //       value: 0,
        //       step: 10,
        //       range: {
        //         start: 0,
        //         end: 60
        //       }
        //     },
        //     height: {
        //       title: this.$t('common.down'),
        //       value: 0,
        //       step: 10,
        //       range: {
        //         start: 0,
        //         end: 60
        //       }
        //     },
        //     x: {
        //       title: this.$t('common.left'),
        //       value: 0,
        //       step: 10,
        //       range: {
        //         start: 0,
        //         end: 60
        //       }
        //     },
        //     y: {
        //       title: this.$t('common.right'),
        //       value: 0,
        //       step: 10,
        //       range: {
        //         start: 0,
        //         end: 60
        //       }
        //     }
        //   }
        // },
        //   {
        //     title: this.$t('common.window'),
        //     opts: {
        //       width: {
        //         title: this.$t('common.width'),
        //         value: 0,
        //         step: 10,
        //         range: {
        //           start: 0,
        //           end: 60
        //         }
        //       },
        //       height: {
        //         title: this.$t('common.height'),
        //         value: 0,
        //         step: 10,
        //         range: {
        //           start: 0,
        //           end: 60
        //         }
        //       },
        //       x: {
        //         title: this.$t('common.left'),
        //         value: 0,
        //         step: 10,
        //         range: {
        //           start: 0,
        //           end: 60
        //         }
        //       },
        //       y: {
        //         title: this.$t('common.right'),
        //         value: 0,
        //         step: 10,
        //         range: {
        //           start: 0,
        //           end: 60
        //         }
        //       }
        //     }
        //   }
        // ],
        //初始化模态框数据
        windowBorders: [
          {
            title: this.$t('common.width'),
            value: 0,
            step: 5,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: this.$t('common.height'),
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          }
        ],
        //边框 背景色
        bgColors: [
          {
            color: '#ff6700',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ff6aaa',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ff2700',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ff9700',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ff9987',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ff6744',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ffabca',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ffff43',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '#ffffff',
            text: null,
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          },
          {
            color: '',
            text: "无填充",
            isSelect: false,
            border: '.01rem solid #ffffff',
            active: 'active'
          }
        ],
        //高级设置
        color: [
          {
            title: "亮度",
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: "对比度",
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: "色温",
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: "色调",
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: "锐度",
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: "饱和度",
            value: 0,
            step: 1,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          },
          {
            title: "Gamma",
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            },
            all: 5
          }
        ]
        //高级设置
        // colorheight: [
        //   {
        //     title: "色调",
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     },
        //     all: 5
        //   },
        //   {
        //     title: "锐度",
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     },
        //     all: 5
        //   },
        //   {
        //     title: "饱和度",
        //     value: 0,
        //     step: 1,
        //     range: {
        //       start: 0,
        //       end: 60
        //     },
        //     all: 5
        //   },
        //   {
        //     title: "Gamma",
        //     value: 0,
        //     step: 10,
        //     range: {
        //       start: 0,
        //       end: 60
        //     },
        //     all: 5
        //   }
        // ]
      };
    },
    methods: {
      savesce() {
        var self = this;
        var sceneId = this.current.id;
        if($.trim(self.ctext) === '') {
          return;
        }
        self.saveScenarist = false;
        //        ajaxFn.saveScene(sceneId).then(res => {
        //          console.log(res);
        //          if(res.status === 10000000) {
        //            self.saveScenarist = false;
        //          }
        //        });
      },
      // 点击 锁按钮
      toggleLock() {
        this.lock = !this.lock;
        // 锁状态写入
        if(this.lock) {
          $currentDom.find('.js-move-lock').addClass('active').data('lock', true);
          $currentDom.find('.move-btn').removeClass('active');
        } else {
          $currentDom.find('.js-move-lock').removeClass('active').data('lock', false);
          $currentDom.find('.move-btn').addClass('active');
        }
      },
      // 重置
      resetScenarist() {
        htp.post(url.setAllWinClose, { closeAllWin: 1 }).then(function(res) {
          if(res.status === 10000000) {
            zindex = 1;
            winids = [];
            winid = 1;
            $('.js-scenarist').find('.js-btns').remove();
          }
        });
      },
      // 上一步
      previous() {
        window.history.go(-1);
      },
      // 点击保存
      submit() {
        this.saveScenarist = true;
      },
      //源截取
      cutSource() {
        this.showInterception = true;
      },
      saveCut(options) {
        this.showInterception = false;
      },
      //窗口
      setLayout() {
        this.showLayout = true;
      },
      saveLayout(options) {
        var self = this;
        this.showLayout = false;
      },

      setDefinition() {
        this.showQuality = true;
      },
      saveQuality(options) {
        this.showQuality = false;
        let params = {};
        params.windowId = 1;
        params.brightness = options.colors[0].value;
        params.contrastRatio = options.colors[1].value;
        params.colTemperature = options.colors[2].value;
        params.saturation = options.colors[5].value;
        params.hue = options.colors[3].value;
        params.sharpness = options.colors[4].value;
        params.gamma = options.colors[6].value;
        htp.post(url.setWinQuality, params)
          .then(res => {
            if(res.status === 10000001) {
              Toast('请求失败');
            }
          });
      },
      setBorder() {
        this.showWinBorder = true;
      },
      saveBorder(options) {
        this.showWinBorder = false;
        let params = {
          windowId: 1,
          borderSwitch: options.switchValue,
          borderWidth: options.windowBorder[0].value,
          borderHeight: options.windowBorder[1].value,
          borderColor: options.bgColor
        };
        htp.post(url.setWinBorder, params)
          .then(res => {
            if(res.status === 10000001) {
              Toast('请求失败');
            }
          });
      },
      // 点击 向下一个
      btnNext() {
        if(this.lock) {
          return;
        }
        var $box = $('.js-btns');
        var self = this;
        if($box.length) {
          if(+self.currentZindex === 1) {
            return;
          } else {
            $box.each(function(i, item) {
              var $this = $(item);
              var itemIndex = +$this.data('index');
              if(itemIndex === self.currentZindex - 1) {
                processFn.setIndex($this, +self.currentZindex);
              } else if(itemIndex === +self.currentZindex) {
                processFn.setIndex($this, self.currentZindex - 1);
              }
            });
            self.currentZindex = self.currentZindex - 1;
          }
        }
        ajaxFn.setWinZOrder();
      },
      // 点击 向上一个
      btnPre() {
        if(this.lock) {
          return;
        }
        var $box = $('.js-btns');
        var self = this;
        if($box.length) {
          if(+self.currentZindex === $box.length) {
            return;
          } else {
            $box.each(function(i, item) {
              var $this = $(item);
              var itemIndex = +$this.data('index');
              if(itemIndex === (+self.currentZindex + 1)) {
                processFn.setIndex($this, +self.currentZindex);
              } else if(itemIndex === +self.currentZindex) {
                processFn.setIndex($this, +self.currentZindex + 1);
              }
            });
            self.currentZindex = +self.currentZindex + 1;
          }
        }
        ajaxFn.setWinZOrder();
      },
      //置顶
      btnFirst() {
        if(this.lock) {
          return;
        }
        var $box = $('.js-btns');
        var self = this;
        if($box.length) {
          if(+self.currentZindex === $box.length) {
            return;
          } else {
            $box.each(function(i, item) {
              var $this = $(item);
              var itemIndex = +$this.data('index');
              if(itemIndex > (+self.currentZindex)) {
                processFn.setIndex($this, itemIndex - 1);
              } else if(itemIndex === +self.currentZindex) {
                processFn.setIndex($this, $box.length);
              }
            });
            self.currentZindex = $box.length;
          }
        }
        ajaxFn.setWinZOrder();
      },
      // 点击沉底
      btnLast() {
        if(this.lock) {
          return;
        }
        var $box = $('.js-btns');
        var self = this;
        if($box.length) {
          if(+self.currentZindex === 1) {
            return;
          } else {
            $box.each(function(i, item) {
              var $this = $(item);
              var itemIndex = +$this.data('index');
              if(itemIndex < (+self.currentZindex)) {
                processFn.setIndex($this, itemIndex + 1);
              } else if(itemIndex === +self.currentZindex) {
                processFn.setIndex($this, 1);
              }
            });
            self.currentZindex = 1;
          }
        }
        ajaxFn.setWinZOrder();
      },
      // 源拖动
      pan() {
        var self = this;
        $sources = $('.js-sources');
        scrollWidth = $sources[0].scrollWidth - 100;
        var $box = $('.js-scenarist');
        var $el = $(arguments[2].element);
        var maxTop = showWintop = $show.offset().top;
        showWinleft = $show.offset().left;
        // 手势开始获取必要的数据
        if(arguments[0] === 'panstart') {
          left = $el.offset().left;
          top = $el.offset().top;
          height = $el.height();
          width = $el.width();
          startMouseX = +arguments[1].srcEvent.screenX;
          startMouseY = +arguments[1].srcEvent.screenY;
          $clone = $el.clone(true).css({ marginLeft: '0' });
          winid = 1;
          while(winids.includes(winid)) {
            winid += 1;
          }
          var html = `<div class="btns js-btns" data-index="${zindex}" data-info="" data-winid="${winid}">
                <div class="move-btn btnLt"></div>
                <div class="move-btn btnRt"></div>
                <div class="move-btn btnRb"></div>
                <div class="move-btn btnLb"></div>
                <div class="move-lock js-move-lock" data-lock="false"></div>
                </div>`;
          $clone = $(html).append($clone);
          $clone.css({
            left: left,
            top: top,
            width: width,
            height: height,
            position: 'absolute',
            opacity: '.4',
            zIndex: zindex
          });
          isadd = false;
          // 手势如果是上的话 就要考虑是否 append
        } else if(arguments[0] === 'panup') {
          var deltaYs = +arguments[1].deltaY;
          if(!isadd && -deltaYs > space) {
            $clone.find('.sources-item').css({ width: '100%', height: '100%' });
            $box.append($clone);
            zindex += 1;
            isadd = true;
          }
          // 手势移动的时候要考虑 那种类型
        } else if(arguments[0] === 'panmove') {
          var deltaX = +arguments[1].deltaX;
          var deltaY = +arguments[1].deltaY;
          if(-deltaY > space) {
            var newtop = top + deltaY;
            //newtop = newtop <= maxTop ? maxTop : newtop;
            $clone.css({ left: left + deltaX, top: newtop });
          } else {
            if(isadd) {
              processFn.removeSource($clone);
            }
            isadd = false;
            var result = scroll - deltaX * 0.1;
            result = result > scrollWidth ? scrollWidth : result;
            result = result < 0 ? 0 : result;
            $sources.scrollLeft(result);
            scroll = result;
          }
          // 手势结束的时候要 给clone的元素绑定事件。
        } else if(arguments[0] === 'panend') {
          if(!isadd) {
            return;
          }
          var deltaYss = +arguments[1].deltaY;
          if(-deltaYss > space) {
            $clone.css({ opacity: '1' });
            var cloneleft = $clone.offset().left;
            var clonetop = $clone.offset().top;
            var $cont = $show;
            var coffset = $cont.offset(); // 获取显示区域的 左和高。
            // 自动吸附
            //            var style = processFn.getPosition({
            //              left: cloneleft,
            //              top: clonetop,
            //              cleft: coffset.left,
            //              ctop: coffset.top,
            //              cwidth: $cont.width(),
            //              cheight: $cont.height(),
            //              row: self.lay.y + 1,
            //              col: self.lay.x + 1
            //            });
            // 展示 800 * 600；
            var style = processFn.getPosition1({
              left: cloneleft,
              top: clonetop,
              cleft: coffset.left,
              ctop: coffset.top,
              cwidth: $cont.width(),
              cheight: $cont.height()
            }, self);
            // 如果没有拖到 窗口内 就返回false;
            if(style) {
              $clone.css({
                left: style.left + 'px',
                top: style.top + 'px',
                width: style.width + 'px',
                height: style.height + 'px'
              });
              var info = processFn.writeInfo($clone, style);
              var replace = processFn.replaceWins($box, info, $clone);
              //var replace = processFn.replaceWin($box, info);
              // 如果替换了 就要 设置 删除原来的源 重置zindex;
              if(replace) {
                var styleInfos = replace.data('info').split(',');
                style = {
                  left: +styleInfos[2],
                  top: +styleInfos[3],
                  width: +styleInfos[0],
                  height: +styleInfos[1]
                };
                processFn.removeSource(replace);
              } else {
                if(winid > maxWinNum) {
                  alert('已经达到上限： ' + maxWinNum + '个');
                  processFn.removeSource($clone);
                  return;
                }
                winids.push(winid);
              }
            } else {
              processFn.removeSource($clone);
              return;
            }
            //给lock的mask 绑定事件
            processFn.bindEvent($clone, self, style, $show);
            // 发送请求。
            var windowId = $clone.data('winid');
            $clone.find('.title').html('Window' + windowId);
            var selectInput = $clone.find('.sources-item').data('id');
            var type = $clone.find('.sources-item').data('type');
            //如果 拖拽的源的是VGA1/CVBS1    VGA2/CVBS2， 就得刷新 源列表。
            if(type === 2 || type === 4) {
              // 请求源
              self.source = self.source = {
                "inputSourceList": [{
                  "status": 0,
                  "id": 1,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "HDMI1",
                  "type": 1
                }, {
                  "status": 0,
                  "id": 2,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "HDMI2",
                  "type": 1
                }, {
                  "status": 0,
                  "id": 3,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "3G-SDI1",
                  "type": 3
                }, {
                  "status": 0,
                  "id": 4,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "3G-SDI2",
                  "type": 3
                }, {
                  "status": 0,
                  "id": 5,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "DVI",
                  "type": 0
                }, {
                  "status": 0,
                  "id": 6,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "CVBS1",
                  "type": 4
                }, {
                  "status": 0,
                  "id": 7,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "CVBS2",
                  "type": 4
                }, {
                  "status": 0,
                  "id": 8,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "VGA1",
                  "type": 2
                }, {
                  "status": 0,
                  "id": 9,
                  "refresh": 0,
                  "height": 0,
                  "width": 0,
                  "name": "VGA2",
                  "type": 2
                }]              };
            }
            ajaxFn.setWinZOrder();
          }
        }
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
