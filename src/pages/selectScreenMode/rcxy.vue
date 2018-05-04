<template>
	<div>
		<div class="receiveCard">
			<div style="width:39%">{{adItem.rowCol.title}}</div>
			<div>
				<div v-for="(item, i) in test" >
					<span>{{item.title}}</span>
					<input v-model="item.value" :max="item.max" @input="change(item.value, item.max, i, test)"/>
					<span>{{item.num}}</span> 
				</div>
			</div>
		</div>
		<div class="receiveCard" >
			<div>{{adItem.xAndy.title}}</div>
			<div>
				<div v-for="(item, i) in tests">
					<span>{{item.title}}</span>
					<input  v-model="item.value" :max="item.max" @input="changes(item.value, item.max, i)">
					<span>{{item.num}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import $ from 'zepto';
	import { Toast } from 'mint-ui';
	export default {
		created() {
		},
		props: ['adItem', 'resolution', 'boxParam'],
		components: {
			Toast
		},
		methods: {
			change(val, max, i, test) {
				if(val > max) {
					this.test[i].value = max;
					// setTimeout(function() {
					// 	Toast('此时的最大值');
					// },0);
				}
				this.$emit('rowCol', test);
			},
			changes(val, max, i) {
				if(val > max) {
					this.tests[i].value = max;
				}
			}
		},
		computed: {
			test() {
				var list = this.adItem.rowCol.list;
				list[0].max = Math.floor(512 / list[1].value);
				list[1].max = Math.floor(512 / list[0].value);
				return list;
			},
			tests() {
				var list = this.adItem.xAndy.list;
				// let number1 = this.adItem.rowCol.list[0].value * this.boxParam.width;
				// let number2 = this.adItem.rowCol.list[1].value * this.boxParam.height;
				// list[0].max = Math.floor(this.resolution.width - number1);
				// list[1].max = Math.floor(this.resolution.height - number2);
				list[0].max = this.resolution.width;
				list[1].max = this.resolution.height;
				return list;
			}
		}
	};
</script>