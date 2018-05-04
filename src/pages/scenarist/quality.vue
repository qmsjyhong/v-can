<template>
  <div class="js-scenarist-child">
    <mt-popup v-model="show" position="right">
      <div class="layout">
    <vx-header :showcancel="1" :showsave="1" :title="$t('common.superSet')" @save="save" @cancel="cancel"></vx-header>
    <div class="layout-content">
      <div class="masks">
        <div class="masks-title">亮度调节</div>
        <div class="masks-contents">
          <vx-progress v-for="item in colors" :title="item.title" :range="item.range" :step="item.step" :num="item.value" @update="val=>item.value=val"></vx-progress>
        </div>
      </div>
     <!--  <div class="masks" style="margin-top:.30rem">
        <div class="masks-contents">
          <vx-progress v-for="item in colorheight" :title="item.title" :range="item.range" :step="item.step" :num="item.value" @update="val=>item.value=val"></vx-progress>
        </div>
      </div> -->
    </div>
  </div>
    </mt-popup>
</div>
	
</template>
<script>
  import { serialize } from 'src/utils';
  import htp from "../../api/http";
  import url from '../../api/apiurl';
  import { Toast } from 'mint-ui';
	export default {
    created() {
      // this.colors = serialize(this.color);
      this.formatWinQuality();
    },
    methods: {
      formatWinQuality() {
        let ids = {};
        ids.selectWindow = this.winid;
       htp.post(url.getWinQuality, ids)
        .then(res => {
          let data = res.data;
          let arr = [{},{},{},{},{},{},{}];
          console.log(res);
          this.colors = arr;
          this.winId = data.windowId;
        });
      },
      save() {
        let qualityData = {
          colors: this.colors
        };
        this.$emit('save-quality', qualityData);
      },
      cancel() {
        // this.colors = this.color;
        this.$parent.showQuality = false;
        // let qualityData = {
        //   colors: this.colors
        // };
        // this.$emit('save-quality', qualityData);
      }
    },
    props: ['show', 'color', 'winid'],
		data() {
			return {
				titles: {
					lightChange: "亮度调节"
				},
				colors: [],
        winId:''
			};
		}
	};
</script>
<style scoped lang="less"></style>