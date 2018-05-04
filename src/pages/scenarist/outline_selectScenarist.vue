<template>
  <div class="select-scenarist">
    <div class="title">
      <div class="cancel" @click="cancel">{{$t('scenarist.cancel')}}</div>
      <div class="titlt-name">{{$t('scenarist.selectThem')}}</div>
      <div class="confirm" @click="confirm">{{$t('scenarist.ok')}}</div>
    </div>
    <mt-picker :slots="sceneList" @change="onValuesChange" class="" valueKey="name"></mt-picker>
  </div>
</template>

<script>
  export default {
    props:['slots'],
    mounted() {
      $('.title').on('touchstart', function(e) {
        e.stopPropagation();
      });
    },
    data() {
      return {
        current: {}
      };
    },
    computed: {
      sceneList() {
        var newVal = this.slots.map(item => item.name);
        console.log(newVal);
        return [
          {
            flex: 1,
            values: this.slots,
            className: 'slot1',
            textAlign: 'center'
          }
        ];
      }
    },
    methods: {
      cancel() {
        this.$emit('cancelSelect');
      },
      confirm() {
        this.$emit('onValuesChange', this.current);
        this.$emit('cancelSelect');
      },
      onValuesChange(picker, values) {
        console.log(picker.getSlotValue(0));
        this.current = values[0];
      }
    }
  };
</script>

<style lang="less" scoped>
  .select-scenarist {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 3000;
    .title {
      height: 100px;
      line-height: 100px;
      display: flex;
      font-size: 30px;
      border-bottom: 1px solid #e2e2e2; /* no*/
      div {
        flex: 1;
      }
      .cancel {
        padding-left: 20px;
        text-align: left;
        color: #939393;
      }
      .titlt-name {
        text-align: center;
        font-size: 30px;
      }
      .confirm {
        padding-right: 20px;
        text-align: right;
        color: #f56800;
      }
    }
  }
</style>

