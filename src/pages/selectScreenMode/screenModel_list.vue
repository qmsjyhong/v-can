<template>
	<div class="screen">
		<div class="screen_list_content" @click="showSelectNetworkPort">
			<div>{{title}}</div>
			<div><i class="iconfont icon-qianjin"></i></div>
		</div>
		<div class="screen_list_text">
			<span>{{text}}</span>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return{};
		},
		props: ['title', 'text'],
		methods: {
			showSelectNetworkPort() {
				this.$emit('showSelectNetworkPort');
			}
		}
	};
</script>
<style></style>