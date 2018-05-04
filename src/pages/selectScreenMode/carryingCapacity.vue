<template>
	<div class="capacityLayout">
		<mt-popup v-model="show" position="right">
			<vx-header :showPrevious="1" :showNext="1" :title="$t('common1.SelectCarryingCapacityNetworkPortOne')" @previous="capPrevious" @next="capNextStep"></vx-header>
			<div class="capacity-content">
				<div class="selectBoxStructure_content_list">
				<vx-progress v-for="(item, index) in capacityList" :title="item.title" :num="item.value" :range="item.range" :step="item.step" @update="val=>item.value=val"></vx-progress>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	export default {
		created() {
			this.formatcapacityList();
		},
		data() {
			return {
				capacityList: []
			};
		},
		props: ['show'],
		methods: {
			formatcapacityList() {
				let getQuickPointScreens = this.$parent.getQuickPointScreens;
				let capacityList = [{
					title: this.$t('common1.CarryingCapacityNetworkPortOne'),
					value: getQuickPointScreens.loadNum,
					step: 5,
					range: {
						start: 0,
						end: 60
					}
				}];
				this.capacityList = capacityList;
			},
			capPrevious() {
				this.$parent.showSelectStructure = true;
				this.$parent.showcarryCapacity = false;
			},
			capNextStep() {
				let params = {};
				params.loadNum = this.capacityList[0].value;
				this.$emit('capacityNext', params);
			}
		}
	};
</script>
<style scoped lang="less"></style>