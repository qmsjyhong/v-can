<template>
	<div class="js-scenarist-child">
		<mt-popup v-model="show" position="right">
			<div class="layout">
				<vx-header :showcancel="1" :showsave="1" @save="save" @cancel="cancel" :title="$t(`common.border`)"></vx-header>
				<div class="layout-content">
					<div class="masks">
						<div class="masks-border-title">
							<div>{{$t(`common.border`)}}</div>
							<div>
								<mt-switch v-model="switchValue"></mt-switch>
							</div>
						</div>
						<div class="masks-contents">
							<vx-progress v-for="(k, i) in windowBorder" :title="k.title" :range="k.range" :step="k.step" :num="k.value" @update="val=>k.value=val"></vx-progress>
						</div>
						<div class="borderColor">
								<div class="borderColor-title">
									<div>颜色</div>
								</div>
								<ul class="colorList">
									<li v-for="(item, index) in bgColors" :style="{background:item.color}" :key="index" @click='changeColor(item, index)' :class="{ active : item.isSelect}"><span>{{item.text}}</span></li>
								</ul>
							</div>
					</div>
				</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import { serialize } from 'src/utils';
	export default {
		data() {
			return {
				selectBgColor: null,
				bgColors: [],
				windowBorder: [],
				switchValue: false
			};
		},
		props: ['show', 'options', 'bgColor'],
		created() {
			this.windowBorder = serialize(this.options);
			this.bgColors = serialize(this.bgColor);
		},
		methods: {
			save() {
				let index;
				this.bgColors.forEach(function(v, i) {
					if(v.isSelect) {
						index = i;
					}
				});
				let windowBorderData = {
					windowBorder: this.windowBorder,
					bgColor: index,
					switchValue: this.switchValue?1:0
				};
				this.$emit('save-border', windowBorderData);
			},
			cancel() {
				this.windowBorder = this.options;
				this.bgColors = this.bgColor;
				let index;
				this.bgColors.forEach(function(v, i) {
					if(v.isSelect) {
						index = i;
					}
				});
				let windowBorderData = {
					windowBorder: this.windowBorder,
					bgColor: index,
					switchValue: this.switchValue?1:0
				};
				this.$emit('save-border', windowBorderData);
				this.$parent.showWinBorder = false;
			},
			changeColor(item, index) {
				this.bgColors.forEach(function(v, i) {
					v.isSelect = false;
				});
				this.bgColors[index].isSelect = true;
			}
		}
		// computed: {
		// 	color() {
		// 		return this.selectBgColor == null ? '#ff6700':this.selectBgColor;
		// 	}
		// }
	};
</script>
<style scoped lang="less">
.active {
    border: 3px solid #ff6700;
 }
</style>