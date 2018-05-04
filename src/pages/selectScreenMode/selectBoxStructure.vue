<template>
	<div class="selectBoxStructure_layout">
		<mt-popup v-model="show" position="right">
			<vx-header :showcancel = "1" :title="$t('common1.selectPrevious')" :showNext="1" @cancel="structureCancel" @next="nextStep"></vx-header>
		
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
		</mt-popup>
	</div>
</template>
<script>
	export default {
		created() {
			this.formatrowsAndColumns();
		},
		data() {
			return{
				rowsAndColumns: []
			};
		},
		props: ['show'],
		methods: {
			formatrowsAndColumns() {
				let getQuickPointScreens = this.$parent.getQuickPointScreens;
				let rowsAndColumns = [
								{
									title: this.$t('common1.rows'),
									value: getQuickPointScreens.boxX,
									step: 1,
									range: {
										start: 1,
										end: 9
									}
								},
								{
									title: this.$t('common1.columns'),
									value: getQuickPointScreens.boxY,
									step: 1,
									range: {
										start: 1,
										end: 9
									}
								}
							];
				this.rowsAndColumns = rowsAndColumns;
			},
			structureCancel() {
				this.$parent.showSelectStructure = false;
			},
			nextStep() {
				let params = {};
				params.boxX = this.rowsAndColumns[0].value;
				params.boxY = this.rowsAndColumns[1].value;
				this.$emit('structureNext', params);
			}
		},
		computed: {
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