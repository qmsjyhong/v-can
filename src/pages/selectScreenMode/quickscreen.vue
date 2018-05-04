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
				  <content-title v-if="showContentTitle" :rowsAndColumns="rowsAndColumns"></content-title>
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
			
			<capacity-content v-if="showCapacityContent" :datas="rowsAndColumns" :getQuickPointScreens="getQuickPointScreens" :portNumber='portNumber' @capacityListValue='capacityListValue'></capacity-content>

			</div>
		<!-- 选择网口1的带载能力结束 -->
		<!-- 选择走线方式 -->
		<div class="quickScreen_title">
			<span>{{$t('common1.selectrouteMethod')}}</span>	
		</div>
			<div class="routeMethods_layout">
				<div class="methods_list">
					<imglists v-if="showImgList" :getQuickPointScreens="getQuickPointScreens" @walkTypes='walkTypes'></imglists>
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
	import capacityContent from './capacityContent';
	import contentTitle from './contentTitle';
	import imglists from './imglists';
	export default {
		created() {
			this.getQuickPointScreen();
		},
		data() {
			return {
				rowsAndColumns: [],
				getQuickPointScreens: [],
				showCapacityContent: false,
				showContentTitle: false,
				showImgList: false,
				capacityListValues: '',
				walkType: ''
			};
		},
		components: {
			capacityContent,
			contentTitle,
			imglists
		},
		props: ['show', 'resolution', 'portNumber', 'boxParam'],
		methods: {
			capacityListValue(val) {
				this.capacityListValues = val;
			},
			getQuickPointScreen() {
				htp.get(url.getQuickPointScreen)
					.then(res => {
						console.log(res);
						this.getQuickPointScreens = res.data;
						this.rowsAndColumns.push({
							title: this.$t('common1.rows'),
							value: res.data.boxX,
							step: 1,
							range: {
								start: 1,
								end: Math.ceil(4096/this.boxParam.height)
							}
						});
						this.rowsAndColumns.push({
							title: this.$t('common1.columns'),
							value: res.data.boxY,
							step: 1,
							range: {
								start: 1,
								end: Math.ceil(2160/this.boxParam.width)
							}
						});
						this.showCapacityContent = true;
						this.showContentTitle = true;
						this.showImgList = true;
					});
			},
			walkTypes(val) {
				this.walkType = val;
			},
			save() {
				let params = {};
				let index;
				params.boxX = this.rowsAndColumns[0].value;
				params.boxY = this.rowsAndColumns[1].value;
				params.loadNum = this.capacityListValues;
				params.walkType = this.walkType;
				this.$emit('save', params);
			},
			cancel() {
				this.$emit('cancel');
			}
		},
		computed: {
		}
	};
</script>
<style scoped lang="less"></style>
