<template>
	<div class="networkPort_layout">
		<mt-popup v-model="show" position="right">
			<vx-header :showcancel="1" :title="$t('common1.selectNetworkPort')" :showNext="1" @next="nextStep" @cancel="cancel"></vx-header>
			<div class="vx-container">
				<div class="networkProt_list">
					<div :class="{active: item.chacked}" v-for="(item, index) in numList" @click="selectPort(index, item.chacked)">{{item.num}}</div>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import htp from "../../api/http";
	import url from '../../api/apiurl';
	import { Toast } from 'mint-ui';
	export default {
		components: {
			Toast
		},
		created() {
			this.formatPortList();
		},
		data() {
			return {
				numList: []
			};
		},
		props: ['show'],
		methods: {
			formatPortList() {
				let getAdvancedPointsScreens = this.$parent.getAdvancedPointsScreens;
				getAdvancedPointsScreens.forEach((v, i) => {
					let obj = {};
					obj.portId = v.portId;
					obj.chacked = false;
					obj.num = v.portId;
					obj.portOffsetX = v.portOffsetX;
					obj.portOffsetY = v.portOffsetY;
					obj.portX = v.portX;
					obj.portY = v.portY;
					obj.walkType = v.walkType;
					this.numList.push(obj);
				});
			},
			nextStep() {
				let params = [];
				this.numList.forEach((v, i) => {
					if(v.chacked) {
						params.push(v);
					}
				});
				this.$emit('nextStep', params);
			},
			cancel() {
				this.$parent.showNetworkPort = false;
			},
			selectPort(index, chacked) {
				this.numList[index].chacked = !chacked;
			}
		}
	};
</script>
<style scope lang="less"></style>