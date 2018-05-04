<template>
	<div>
			<div v-show="item1" class="item1">
				<div v-for="item in col"></div>
			</div>
			<div v-show="item2" class="item2">
				<div v-for="item in row"></div>
			</div>
	</div>
</template>
<script>
	export default {
		props:['rowsAndColumns'],
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