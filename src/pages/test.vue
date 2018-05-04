<template>
  <div class="test">
    <vx-header :showadhibition="1" :showcancel="1" @use="use" @cancel="cancel" :title="$t('common.test')"></vx-header>
    <div class="vx-container">
      <div class="test_cont">
        <mt-cell :title="'测试画面'">
          <mt-switch v-model="open"></mt-switch>
        </mt-cell>
        <div class="test_list">
          <div class="test_list_item" :class="{selected:o.testPattern == selected}" v-for="(o,i) in screemList" @click="val => selected = o.testPattern">
            <div class="screem" :class="o.class">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import htp from "../api/http";
  import urls from '../api/apiurl';
  export default {
    data() {
      return {
        open: true,//控制测试画面开关
        selected: '',//选中的测试画面
        screemList: [
          { testPattern: 5 }, { testPattern: 6 }, { testPattern: 7 }, { testPattern: 10 }, { testPattern: 11 }, { testPattern: 12 },
          { testPattern: 13 }, { testPattern: 14 }, { testPattern: 15 }, { testPattern: 20 }, { testPattern: 21 }, { testPattern: 22 },
          { testPattern: 23 }, { testPattern: 24 }, { testPattern: 25 }, { testPattern: 26 }, { testPattern: 27 }
        ],
        type: '',
        style: {},
        orientation: true,
        rows: 0
      };
    },
    created() {
      this.getTsList();
    },
    methods: {
      //获取测试屏幕列表
      getTsList() {
        this.TsHandler();
        htp.get(urls.getTestPicture).then(res => {
          this.selected = res.data.testPattern;
          this.open = Boolean(res.data.testControl);
        });
      },
      TsHandler() {
        this.screemList.forEach(ts => {
          ts.class = 'test' + ts.testPattern;
        });
      },
      use() {
        htp.post(urls.setTestPicture, { testControl: Number(this.open), testPattern: this.selected }).then(res => {
          if(res.status === 10000000) {
            this.$router.push({ path: '/' });
          }
        });
      },
      cancel() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less" scoped>
  .test {
      text-align: left;
      .mint-cell {
          background-color: #212124;
          color: #c2c2c2;
          height: 90px;

          .mint-switch-core::before {
              background-color: #ffffff;
          }
          .mint-switch-input:checked + .mint-switch-core {
              background-color: #48cc4b;
          }
      }
      &_list {
          background-color: #383940;
          flex-wrap: wrap;
          justify-content: space-between;
          display: flex;
          flex-wrap: wrap;
          padding-top: 33px;
          padding-left: 36px;
          padding-right: 35px;
          &_item {
              height: 93px;
              margin-bottom: 68px;
              border-radius: 8px;
              overflow: hidden;
              .screem {
                  width: 100%;
                  height: 100%;
              }
          }
      }
      .save {
          color: #c16117;
      }
      .test5 {
          background: ~"url('../assets/test/test5.png') no-repeat" #383940;
      }
      .test6 {
          background: ~"url('../assets/test/test6.png') no-repeat" #383940;
      }
      .test7 {
          background: ~"url('../assets/test/test7.png') no-repeat" #383940;
      }
      .test10 {
          background: ~"url('../assets/test/test10.png') no-repeat" #383940;
      }
      .test11 {
          background: ~"url('../assets/test/test11.png') no-repeat" #383940;
      }
      .test12 {
          background: ~"url('../assets/test/test12.png') no-repeat" #383940;
      }
      .test13 {
          background: ~"url('../assets/test/test13.png') no-repeat" #383940;
      }
      .test14 {
          background: ~"url('../assets/test/test14.png') no-repeat" #383940;
      }
      .test15 {
          background: ~"url('../assets/test/test15.png') no-repeat" #383940;
      }
      .test20 {
          background: ~"url('../assets/test/test20.png') no-repeat" #383940;
      }
      .test21 {
          background: ~"url('../assets/test/test21.png') no-repeat" #383940;
      }
      .test22 {
          background: ~"url('../assets/test/test22.png') no-repeat" #383940;
      }
      .test23 {
          background: ~"url('../assets/test/test23.png') no-repeat" #383940;
      }
      .test24 {
          background: ~"url('../assets/test/test24.png') no-repeat" #383940;
      }
      .test25 {
          background: ~"url('../assets/test/test25.png') no-repeat" #383940;
      }
      .test26 {
          background: ~"url('../assets/test/test26.png') no-repeat" #383940;
      }
      .test27 {
          background: ~"url('../assets/test/test27.png') no-repeat" #383940;
      }
  }
  .selected {
      border: 2px solid #fd7b00;
  }
  @media screen and (orientation: portrait) {
      .test {
          text-align: left;
          &_list {
              background-color: #383940;
              flex-wrap: wrap;
              justify-content: space-between;
              display: flex;
              flex-wrap: wrap;
              padding-top: 33px;
              padding-left: 36px;
              padding-right: 35px;
              &_item {
                  width: 22%;
                  height: 93px;
                  margin-bottom: 68px;
                  margin-left: 4%;
                  &:nth-child(4n + 1) {
                      margin-left: 0;
                  }
                  .screem {
                      width: 100%;
                      height: 100%;
                  }
              }
          }
      }
  }
  @media screen and (orientation: landscape) {
      .test {
          text-align: left;
          &_list {
              background-color: #383940;
              flex-wrap: wrap;
              justify-content: space-between;
              display: flex;
              flex-wrap: wrap;
              padding-top: 33px;
              padding-left: 36px;
              padding-right: 35px;
              &_item {
                  width: 15%;
                  height: 93px;
                  margin-bottom: 68px;
                  margin-left: 2%;
                  &:nth-child(6n + 1) {
                      margin-left: 0;
                  }
                  .screem {
                      width: 100%;
                      height: 100%;
                  }
              }
          }
      }
  }
</style>
