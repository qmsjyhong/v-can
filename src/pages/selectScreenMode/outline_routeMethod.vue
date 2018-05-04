<template>
	<div class="routeMethods_layout">
		<mt-popup v-model="show" position="right">
			<vx-header @save="saveRouteMethod" :showPrevious="1" :showsave="1" :title="$t('common1.selectrouteMethod')" @previous="previousRouteMethod"></vx-header>
			<div class="methods_list">
				<div  v-for="(item, index) in imglist" :class="item.chackedimg?item.selectImg:item.normalImg" @click="selectMethod(index, item.chackedimg)">
					<span>{{item.text}}</span>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	export default {
		created() {
			this.formatimglist();
		},
		data() {
			return {
				imglist: []
			};
		},
		props: ['show'],
		methods: {
			formatimglist() {
				let imglist = [
					{
						normalImg: 'normal_img1',
						chackedimg: false,
						selectImg: 'select_img1',
						text: '从左上起水平方向',
						walkType: 1
					}, {
						normalImg: 'normal_img2',
						chackedimg: false,
						selectImg: 'select_img2',
						text: '从左上起垂直方向',
						walkType: 2
					}, {
						normalImg: 'normal_img3',
						chackedimg: false,
						selectImg: 'select_img3',
						text: '从右上起水平方向',
						walkType: 3
					}, {
						normalImg: 'normal_img4',
						chackedimg: false,
						selectImg: 'select_img4',
						text: '从右上起垂直方向',
						walkType: 4
					}, {
						normalImg: 'normal_img5',
						chackedimg: false,
						selectImg: 'select_img5',
						text: '从左下起水平方向',
						walkType: 5
					}, {
						normalImg: 'normal_img6',
						chackedimg: false,
						selectImg: 'select_img6',
						text: '从左下起垂直方向',
						walkType: 6
					}, {
						normalImg: 'normal_img7',
						chackedimg: false,
						selectImg: 'select_img7',
						text: '从右下起水平方向',
						walkType: 7
					}, {
						normalImg: 'normal_img8',
						chackedimg: false,
						selectImg: 'select_img8',
						text: '从右下起垂直方向',
						walkType: 8
					}
					];
				let getWalkType  = this.$parent.getQuickPointScreens;
				imglist.forEach((v, i) => {
					if(v.walkType === getWalkType.walkType) {
						v.chackedimg = true;
					}
				});
				this.imglist = imglist;
			},
			saveRouteMethod() {
				// this.$parent.showrouteMethod = false;
				let index;
				let params = {};
				this.imglist.forEach((v, i) => {
					if(v.chackedimg) {
						index = v.walkType;
					}
				});
				params.walkType = index;
				this.$emit('save', params);
			},
			previousRouteMethod() {
				this.$parent.showcarryCapacity = true;
				this.$parent.showrouteMethod = false;
			},
			selectMethod(index) {
				this.imglist.forEach(function(val) {
					val.chackedimg = false;
				});
				this.imglist[index].chackedimg = true;
			}
		}
	};
</script>
<style scoped lang="less"></style>
