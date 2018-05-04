<template>
	<div class="screenResolution_layout">
		<mt-popup v-model="show" position="right">
			<vx-header :showPrevious="1" :title="$t('common1.screenResolution')" :showNextStep="1" @previous="previous" @nextStep="nextStep"></vx-header>
		
		<div class="screenResolution_content">
			<div class="screenResolution_content_title"></div>
			<div class="screenResolution_content_list">
				<vx-progress v-for="(item, index) in rowsAndColumns" :title="item.title" :num="item.value" :range="item.range" :step="item.step" @update="val=>item.value=val"></vx-progress>
			</div>
		</div>
		</mt-popup>		
	</div>
</template>
<script>
	export default {
		data() {
			return{
				rowsAndColumns: [
				{
					title: this.$t('common.width'),
					value: 0,
					step: 5,
					range: {
						start: 0,
						end: 60
					}
				},
				{
					title: this.$t('common.height'),
					value: 0,
					step: 5,
					range: {
						start: 0,
						end: 60
					}
				}
				]
			};
		},
		props: ['show'],
		methods: {
			previous() {
				this.$parent.showscreenResolution = false;
				this.$parent.showSelectStructure = true;
			},
			nextStep() {
				this.$parent.showscreenResolution = false;
			}
		}
	};
</script>