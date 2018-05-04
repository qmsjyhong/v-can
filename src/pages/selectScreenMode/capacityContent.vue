<template>
  <div>
      <div class="capacity-content">
        <div class="selectBoxStructure_content_list">
        <vx-progress v-for="(item, index) in capacityList" :title="item.title" :num="item.value" :range="item.range" :step="item.step" @update='update'></vx-progress>
        </div>
      </div>
  </div>
</template>
<script>
  import htp from "../../api/http";
  import url from '../../api/apiurl';
  export default {
  props: ['datas', 'getQuickPointScreens', 'portNumber'],
  data() {
    return {
       rowsAndColumns: []
     };
  },
  created() {
  },
  methods: {
    update(val) {
      this.capacityList[0].value = val;
      this.$emit('capacityListValue', val);
    }
  },
  computed: {
    capacityList: function() {
        let capacityList = [{
          title: this.$t('common1.CarryingCapacityNetworkPortOne'),
          value: this.loadNumValue,
          step: 1,
          range: {
            start: this.startLoaded,
            end: this.endLoadeds
          }
        }];
        return capacityList;
      },
    endLoadeds:function() {
      let endLoaded = this.datas[0].value * this.datas[1].value;
      return endLoaded;
    },
    loadNumValue: function() {
      let value = this.getQuickPointScreens.loadNum;
      if(value > this.endLoadeds) {
        value = this.endLoadeds;
      } else if(value < this.startLoaded) {
        value = this.startLoaded;
      }
      return value;
    },
    startLoaded: function() {
        let row = this.datas[0].value;
        let columns = this.datas[1].value;
        return Math.ceil(row * columns/this.portNumber);
      }
  }
 };
</script>
<style scoped lang="less">
</style>