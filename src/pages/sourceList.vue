<template>
  <div class="source_list">
    <vx-cell :class="{selected: selected.id === o.id}" :title="o.name" :showLink="false" v-for="(o,i) in sources" @link="selectedSource(o)"></vx-cell>
  </div>
</template>
<script>
  import htp from "../api/http";
  import url from '../api/apiurl';
  export default {
    data() {
      return {
        sources: [],
        selected: {}
      };
    },
    created() {
      this.getSourceList();
    },
    methods: {
      getSourceList: async function() {
        let params = {
        };
        await htp.get(url.getWinList, params).then(res => {
          this.sources = res.data.winList.filter((v, i) => {
            return v.status === 1;
          });
        });
      },
      selectedSource(o) {
        this.selected = {
          title: o.name,
          id: o.id,
          priority: o.priority,
          inputSourceId: o.inputSourceId
        };
        this.$emit('select-source', this.selected);
      }
    }
  };
</script>

<style lang="less" scoped>
  .source_list {
      .vc-cell {
          border-bottom: 1px solid #4f5054; /*no*/
      }
      .selected {
          background: ~"url('../assets/common/checked.png') no-repeat" #383940;
          background-size: 32px 25px;
          background-position: calc(~'100% - 35px');
      }
  }
</style>

