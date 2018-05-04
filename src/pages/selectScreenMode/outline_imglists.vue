<template>
	<div>
		<div  v-for="(item, index) in imglist" :class="item.chackedimg?item.selectImg:item.normalImg" @click="selectMethod(index, item.chackedimg)">
				</div>
	</div>
</template>
<script>
	export default {
		created() {
			this.formatimglist();
		},
		data() {
			return {
				imglist: []
			};
		},
		methods: {
			formatimglist() {
				let imglist = [
						{
							normalImg: 'normal_img1',
							chackedimg: false,
							selectImg: 'select_img1',
							walkType: 0
						}, {
							normalImg: 'normal_img2',
							chackedimg: false,
							selectImg: 'select_img2',
							walkType: 1
						}, {
							normalImg: 'normal_img3',
							chackedimg: false,
							selectImg: 'select_img3',
							walkType: 2
						}, {
							normalImg: 'normal_img4',
							chackedimg: false,
							selectImg: 'select_img4',
							walkType: 3
						}, {
							normalImg: 'normal_img5',
							chackedimg: false,
							selectImg: 'select_img5',
							walkType: 4
						}, {
							normalImg: 'normal_img6',
							chackedimg: false,
							selectImg: 'select_img6',
							walkType: 5
						}, {
							normalImg: 'normal_img7',
							chackedimg: false,
							selectImg: 'select_img7',
							walkType: 6
						}, {
							normalImg: 'normal_img8',
							chackedimg: false,
							selectImg: 'select_img8',
							walkType: 7
						}
					];
				imglist.forEach((v, i) => {
					if(v.walkType === 0) {
						v.chackedimg = true;
					}
				});
				this.imglist = imglist;
			},
			selectMethod(index) {
				this.imglist.forEach(function(val) {
					val.chackedimg = false;
				});
				this.imglist[index].chackedimg = true;
				this.$emit('walkTypes', index);
			}
		}
	};
</script>