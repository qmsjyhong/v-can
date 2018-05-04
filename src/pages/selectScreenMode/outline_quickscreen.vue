<template>
	<div>
		<mt-popup v-model="show" position="right">
			<vx-header :showsave='1' :showcancel='1' :title="$t('common1.quickScreen')" @cancel='cancel' @save='save'></vx-header>
			<!-- 选择箱体结构 -->
			<div class="vx-container">
		<div class="quickScreen_title">
			<span>{{$t('common1.selectPrevious')}}</span>	
		</div>
		<div class="selectBoxStructure_layout">
			<div class="selectBoxStructure_content">
				<div class="selectBoxStructure_content_title">
					<div>
						<div v-show="item1" class="item1">
							<div v-for="item in col"></div>
						</div>
						<div v-show="item2" class="item2">
							<div v-for="item in row"></div>
						</div>
				  </div>
				</div>
				<div class="selectBoxStructure_content_list">
					<vx-progress v-for="(item, index) in rowsAndColumns" :title="item.title" :num="item.value" :range="item.range" :step="item.step" @update="val=>item.value=val"></vx-progress>
				</div>
			</div>
		</div>
		<!-- 选择箱体结构结束 -->
		<!-- 选择网口1的带载能力 -->
		<div class="quickScreen_title">
			<span>{{$t('common1.SelectCarryingCapacityNetworkPortOne')}}</span>	
		</div>
			<div class="capacityLayout">
				<div class="capacity-content">
					<div class="selectBoxStructure_content_list">
					<vx-progress v-for="(item, index) in capacityList" :title="item.title" :num="item.value" :range="item.range" :step="item.step" @update="val=>item.value=val"></vx-progress>
					</div>
			</div>
			</div>
		<!-- 选择网口1的带载能力结束 -->
		<!-- 选择走线方式 -->
		<div class="quickScreen_title">
			<span>{{$t('common1.selectrouteMethod')}}</span>	
		</div>
			<div class="routeMethods_layout">
				<div class="methods_list">
				<imglists v-if="showImgList" @walkTypes='walkTypes'></imglists>
				</div>
			</div>
			</div>
		<!-- 选择走线方式结束 -->
		</mt-popup>
	</div>
</template>
<script>
	import htp from "../../api/http";
	import url from '../../api/apiurl';
	import { Toast } from 'mint-ui';
	import imglists from './outline_imglists';
	// import selectBoxStructure from './selectBoxStructure'; //箱体结构
	// import carryCapacity from './carryingCapacity'; //选择网口1的带载能力
	// import routeMethods from './routeMethod'; //选择走线方式
	export default {
		components: {
			imglists
		},
		created() {
			console.log(1);
			// this.formatcapacityList();
			this.formatimglist();
			console.log(this.boxParam);
		},
		data() {
			return {
				showImgList: true,
				rowsAndColumns: [
							{
									title: this.$t('common1.rows'),
									value: 3,
									step: 1,
									range: {
										start: 1,
										end: Math.ceil(this.resolution.height/this.boxParam.height)
									}
								},{
									title: this.$t('common1.columns'),
									value: 1,
									step: 1,
									range: {
										start: 1,
										end: Math.ceil(this.resolution.width/this.boxParam.width)
									}
								}
						],
				imglist: [],
				resolutionRate: '',
				resolutionWidth: '',
				resolutionHeight: '',
				endLoaded: '',
				capacityList: [{
					title: this.$t('common1.CarryingCapacityNetworkPortOne'),
					value: 1,
					step: 1,
					range: {
						start: 1,
						end: 10
					}
				}]
			};
		},
		props: ['show', 'resolution', 'portNumber', 'getQuickPointScreens', 'boxParam'],
		methods: {
			walkTypes() {
				console.log(1);
			},
			save() {
				this.$emit('save');
			},
			cancel() {
				this.$emit('cancel');
			},
			selectMethod(index) {
				this.imglist.forEach(function(val) {
					val.chackedimg = false;
				});
				this.imglist[index].chackedimg = true;
			},
			formatimglist() {
				let imglist = [
					{
						normalImg: 'normal_img1',
						chackedimg: false,
						selectImg: 'select_img1',
						// text: '从左上起水平方向',
						walkType: 0
					}, {
						normalImg: 'normal_img2',
						chackedimg: false,
						selectImg: 'select_img2',
						// text: '从左上起垂直方向',
						walkType: 1
					}, {
						normalImg: 'normal_img3',
						chackedimg: false,
						selectImg: 'select_img3',
						// text: '从右上起水平方向',
						walkType: 2
					}, {
						normalImg: 'normal_img4',
						chackedimg: false,
						selectImg: 'select_img4',
						// text: '从右上起垂直方向',
						walkType: 3
					}, {
						normalImg: 'normal_img5',
						chackedimg: false,
						selectImg: 'select_img5',
						// text: '从左下起水平方向',
						walkType: 4
					}, {
						normalImg: 'normal_img6',
						chackedimg: false,
						selectImg: 'select_img6',
						// text: '从左下起垂直方向',
						walkType: 5
					}, {
						normalImg: 'normal_img7',
						chackedimg: false,
						selectImg: 'select_img7',
						// text: '从右下起水平方向',
						walkType: 6
					}, {
						normalImg: 'normal_img8',
						chackedimg: false,
						selectImg: 'select_img8',
						// text: '从右下起垂直方向',
						walkType: 7
					}
					];
				let getWalkType  = this.$parent.getQuickPointScreens;
				imglist.forEach((v, i) => {
					if(v.walkType === getWalkType.walkType) {
						v.chackedimg = true;
					}
				});
				this.imglist = imglist;
			}
		},
		computed: {
			// capacityList: function() {
			// 	let capacityList = [{
			// 		title: this.$t('common1.CarryingCapacityNetworkPortOne'),
			// 		value: 0,
			// 		step: 1,
			// 		range: {
			// 			start: 1,
			// 			end: 10
			// 		}
			// 	}];
			// 	return capacityList;
			// },
			endLoadeds:function() {
				let endLoaded = this.rowsAndColumns[0].value * this.rowsAndColumns[1].value;
				return endLoaded;
			},
			startLoaded: function() {
				let row = this.rowsAndColumns[0].value;
				let columns = this.rowsAndColumns[1].value;
				return Math.ceil(row * columns/this.portNumber);
			},
			Networkportbandwidth: function() {
				let divisor = 39583333;
				let divisor2 = 128 * 128 * 60;
				return divisor/divisor2;
			},
			maxRow: function() {
				return Math.ceil(this.resolution.height/128);
			},
			maxColumns: function() {
				return Math.ceil(this.resolution.width/128);
			},
			col: function() {
				return this.rowsAndColumns[0].value + 1;
			},
			row: function() {
				return this.rowsAndColumns[1].value + 1;
			},
			item1: function() {
				if(this.col > 1) {
					return 1;
				}
				return 0;
			},
			item2: function() {
				if(this.row > 1) {
					return 1;
				}
				return 0;
			}
		}
	};
</script>
<style scoped lang="less"></style>
