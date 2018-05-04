<template>
	<div class="advancedScreen">
		<mt-popup v-model="show" position="right">
			<vx-header :title="$t('common1.advancedScreen')" :showPrevious="1" showsave="1" @previous="previousPro" @save="advSave"></vx-header>
			<div class="vx-container">
			<div class="advancedScreen-content">

				<!-- <div class="advancedScreen-title"></div> -->
				<div class="advancedScreen-list">
					<div class="screen_name">
						<div>{{$t('common1.deviceName')}}</div>
						<div>{{deviceName}}</div>
					</div>
					<div class="screen_address">
						<div>{{$t('common1.deviceAddress')}}</div>
						<div>{{ip}}</div>
					</div>
				</div>

			<div v-for="adItem in advancedScreen">

				<div class="advancedScreen-title">{{adItem.title}}</div>

					<div class="advancedScreen-list">
						
						<rcxy 
							:ad-item="adItem"
							:resolution="resolution"
							:boxParam="boxParam"
						></rcxy>
						
						<div class="routeOrder">

							<div>{{adItem.routeOrder.title}}</div>

								<div>
									<div v-for="(item, index) in adItem.routeOrder.list" :class="item.checked?item.active:item.norClass" @click='selectRouteOrder(index, item, adItem.routeOrder.list)'></div>
								</div>

						</div>

					</div>
				
			</div>


			</div>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import rcxy from './rcxy';
	import {setLoc, getLoc} from '../../utils';
	export default {
		created() {
			this.formatAdvancedScreen();
			this.getIpnNme();
		},
		components:{
			rcxy
		},
		mounted() {
		},
		data() {
			return {
				ip: '',
				deviceName: '',
				advancedScreen: [],
				rowCols: [{
								title: this.$t('common1.X'),
								value: 1,
								num: 'PX'
							}, {
								title: this.$t('common1.Y'),
								value: 1,
								num: 'PX'
							}]
			};
		},
		props: ['show', 'port', 'resolution', 'boxParam'],
		methods: {
			getIpnNme() {
				let device = getLoc('device');
				this.ip = device.deviceIp;
				this.deviceName = device.deviceName;
				console.log(this.ip, this.deviceName);
			},
			rowCol(obj) {
				this.rowCols = obj;
				console.log(this.rowCols);
			},
			formatAdvancedScreen() {
				let that = this;
				that.port.forEach(function(item) {
						var obj = {};
						obj.title = that.$t('common1.networkPort') + item.portId;
						obj.id = item.portId;
						obj.rowCol= {
							title: that.$t('common1.receivingCardQuantity'),
							list: [{
								title: that.$t('common1.column'),
								value: item.portY,
								num: '400px'
							}, {
								title: that.$t('common1.row'),
								value: item.portX,
								num: '400px'
							}]
						};
						obj.xAndy = {
							title: that.$t('common1.offsetCoordinates'),
							list:[{
								title: that.$t('common1.X'),
								value: item.portOffsetX,
								num: 'PX'
							}, {
								title: that.$t('common1.Y'),
								value: item.portOffsetY,
								num: 'PX'
							}]
						};
						obj.routeOrder = {
							title: that.$t('common1.routeOrder'),
							list: [{
								norClass:'normal_img1',
								checked:false,
								active: 'select_img1',
								walkType: 0
							}, {
								norClass:'normal_img2',
								checked:false,
								active: 'select_img2',
								walkType: 1
							}, {
								norClass:'normal_img3',
								checked:false,
								active: 'select_img3',
								walkType: 2
							}, {
								norClass:'normal_img4',
								checked:false,
								active: 'select_img4',
								walkType: 3
							}, {
								norClass:'normal_img5',
								checked:false,
								active: 'select_img5',
								walkType: 4
							}, {
								norClass:'normal_img6',
								checked:false,
								active: 'select_img6',
								walkType: 5
							}, {
								norClass:'normal_img7',
								checked:false,
								active: 'select_img7',
								walkType: 6
							}, {
								norClass:'normal_img8',
								checked:false,
								active: 'select_img8',
								walkType :7
							}]
						};
						obj.routeOrder.list.forEach((v, i) => {
							if(item.walkType === v.walkType) {
								v.checked = true;
							}
						});
						that.advancedScreen.push(obj);
				});
			},
			previousPro() {
				this.$parent.showadvancedScreen = false;
				this.$parent.showNetworkPort = true;
			},
			advSave() {
				let params = this.advancedScreen;
				this.$emit('advSave', params);
			},
			selectRouteOrder(index, val, allVal) {
				allVal.forEach(function(v, i) {
					v.checked = false;
					if (index === i) {
						v.checked = true;
					}
				});
			}
		},
		computed: {
			maxRow: function() {},
			maxColumns: function() {},
			maxwidth: function() {},
			maxHeight: function() {}
		}
	};
</script>