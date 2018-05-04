<template>
  <mt-popup v-model="saveScenarist" position="center" class="js-scenarist-child save" closeOnClickModal="true" modal="false">
    <div class="title">{{$t('scenarist.saveTitle')}}</div>
    <div class="text-input">
      <input class="text" type="text" @click="startSelect" v-model="ctext" readonly/>
      <img @click="startSelect" src="../../assets/common/select.png" alt="">
    </div>
    <div class="btns">
      <button type="button" class="cancel" @click="cancel">{{$t('scenarist.cancel')}}</button>
      <button type="button" class="saves" @click="saveSce">{{$t('scenarist.save')}}</button>
    </div>
  </mt-popup>
</template>

<script>
  export default {
    props:['saveScenarist','ctext'],
    mounted() {
      var self = this;
      $('body').on('touchstart.save', '.v-modal', function() {
        self.$emit('closeCancel');
      });
    },
    methods: {
      cancel() {
        this.$emit('closeCancel', '');
      },
      startSelect() {
        this.$emit('startSelect');
      },
      saveSce() {
        this.$emit('savescena');
      }
    }
  };
</script>

<style lang="less" scoped>
  .save {
    width: 620px;
    height: 290px;
    background: #fff;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    top: 30%;
    .title {
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #333;
      font-size: 35px;
    }
    .text-input {
      position: relative;
      img {
        width: 26px;
        height: 13px;
        position: absolute;
        right: 70px;
        top: 35px;
      }
    }
    .text {
      width: 540px;
      height: 80px;
      line-height: 80px;
      padding: 20px 10px;
      display: inline-block;
      color: #727373;
      background: #eef0f1;
      border: 1px solid #c4c4c4; /* no*/
      border-radius: 8px;
    }
    .btns {
      width: 100%;
      height: 91px;
      line-height: 91px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: #eef0f1;
      display: flex;
      button {
        flex: 1;
        border: none;
        outline: none;
        text-align: center;
        cursor: pointer;
        margin: 0;
        padding: 0;
      }
      .cancel {
        color: #939393;
        border-right: 1px solid #c4c4c4; /* no*/
      }
      .saves {
        color: #f56800;
      }
    }
  }
</style>

