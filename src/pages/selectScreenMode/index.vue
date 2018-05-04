<template>
	<div class="selectScreenMode">
		<vx-header :showback="1" :title="$t('common1.selectScreenMode')" @back="before"></vx-header>
		<div class="vx-container">
			<screenList :title="$t('common1.quickScreen')" :text="$t('common1.quickScreenText')" @showSelectNetworkPort="showSelectNetworkPort"></screenList>
			<screenList :title="$t('common1.qdvancedPointScreenConfiguration')" :text="$t('common1.qdvancedPointScreenConfigurationText')" @showSelectNetworkPort="advancedPointScreen"></screenList>
			<quick-screen 
			v-if='showquickScreen' 
			:show="showquickScreen"
			 @cancel='qcCancel' 
			 @save='save' 
			 :resolution="resolution" 
			 :portNumber="portNumber" 
			 :boxParam="boxParam"
			 ></quick-screen>
		<selectNetworkPort 
		v-if='showNetworkPort' 
		:show="showNetworkPort" 
		@nextStep="nextStep"
		></selectNetworkPort> 
		<!-- <selectBoxStructure v-if="showSelectStructure" :show="showSelectStructure" @structureNext="structureNext"></selectBoxStructure> -->
		<!-- <screenResolution :show="showscreenResolution"></screenResolution> -->
		<advancedScreen 
		v-if="showadvancedScreen" 
		:show="showadvancedScreen" 
		:port="port" 
		@advSave='advSave' 
		:resolution="resolution"
		:boxParam="boxParam"
		></advancedScreen>
	<!-- 	<routeMethods v-if='showrouteMethod' :show="showrouteMethod" @save='save'></routeMethods> -->
		<!-- <carryCapacity v-if='showcarryCapacity' :show="showcarryCapacity" @capacityNext='capacityNext'></carryCapacity> -->
		</div>
	</div>
</template>
<script>
	import screenList from './screenModel_list';
	import selectNetworkPort from './netWorkPort_ModalBox'; //选择端口
	import selectBoxStructure from './selectBoxStructure'; //箱体结构
	import screenResolution from './screenResolution'; //屏幕分辨率
	import advancedScreen from './advancedScreen'; //高级点屏
	import routeMethods from './routeMethod'; //选择走线方式
	import carryCapacity from './carryingCapacity'; //选择网口1的带载能力
	import quickScreen from './quickscreen'; //快捷点屏
	import htp from "../../api/http";
	import url from '../../api/apiurl';
	import { Toast } from 'mint-ui';
	import { setLoc, getLoc, setSen, getSen } from '../../utils';
	export default {
		components: {
			screenList,
			selectNetworkPort,
			selectBoxStructure,
			screenResolution,
			advancedScreen,
			routeMethods,
			carryCapacity,
			quickScreen,
			Toast
		},
		created() {
			this.getPortSize();
			this.formatResolution();
			this.getBoxParam();
			this.getAdvancedPointsScreen();
		},
		data() {
			return {
				getAdvancedPointsScreens: [],
				getQuickPointScreens: [],
				showquickScreen: false,
				showNetworkPort: false,
				showSelectStructure: false, //箱体结构
				showscreenResolution: false, //屏幕分辨率
				showadvancedScreen: false, //高级点屏
				showrouteMethod: false, //走线方式
				showcarryCapacity: false, //选择网口1的带载能力
				quickPointScreen: {
					boxX: '',
					boxY: '',
					loadNum: '',
					walkType: ''
				},
				port:[],
				resolution: {},
				portNumber: '',
				rowsAndColumns: [],
				boxParam: {}
			};
		},
		methods: {
			getBoxParam() {
				htp.get(url.getBoxParam)
					.then(res => {
						if(res.status === 10000001) {
              Toast('请求失败');
            }
						this.boxParam = res.data;
					});
			},
			getPortSize() {
				htp.get(url.getPortSize)
					.then(res => {
						this.portNumber = res.data.portSize;
					});
			},
			formatResolution() {
				htp.get(url.getOutputResolutionRatio)
					.then(res => {
						if(res.status === 10000001) {
              Toast('请求失败');
            }
						this.resolution.width = res.data.width;
						this.resolution.height = res.data.height;
						this.resolution.rate = res.data.rate;
					});
			},
			qcCancel() {
				this.showquickScreen = false;
			},
			getAdvancedPointsScreen() {
				htp.get(url.getAdvancedPointsScreen)
					.then(res => {
						this.getAdvancedPointsScreens = res.data.portList;
						if(res.status === 10000001) {
              Toast('请求失败');
            }
					});
			},
			//设置高级点屏
			advSave(obj) {
				let portInfoList = [];
				let savedata = {};
				console.log(obj);
				obj.forEach(function(v, i) {
					let opt = {};
					console.log(v);
					opt.portId = v.id;
					opt.portX = v.rowCol.list[0].value;
					opt.portY = v.rowCol.list[1].value;
					opt.portOffsetX = v.xAndy.list[0].value;
					opt.portOffsetY = v.xAndy.list[1].value;
					var index;
					v.routeOrder.list.forEach(function(item, i) {
						if (item.checked) {
							index = i;
							return;
						}
					});
					opt.walkType = !index ? 0 : index;
					portInfoList.push(opt);
				});
				savedata.portList = portInfoList;
				this.portInfoLists(savedata)
					.then(res => {
						if(res.status === 10000001) {
              Toast('请求失败');
            } else {
            setSen('filament-shield', 1);
            }
					});
				this.showadvancedScreen = false;
			},
			portInfoLists: async function(portInfoList) {
				const res = await htp.post(url.setAdvancedPointsScreen, portInfoList);
				return res;
			},
			nextStep(obj) {
				this.port = obj;
				this.showNetworkPort = false;
				this.showadvancedScreen = true;
			},
			structureNext(obj) {
				this.quickPointScreen.boxX = obj.boxX;
				this.quickPointScreen.boxY = obj.boxY;
				this.showcarryCapacity = true;
				this.showSelectStructure = false;
			},
			capacityNext(obj) {
				this.quickPointScreen.loadNum = obj.loadNum;
				this.showrouteMethod = true;
				this.showcarryCapacity = false;
			},
			//设置快捷点屏
			save(obj) {
				this.showquickScreen = false;
				let params= {};
				params.boxX = obj.boxX;
				params.boxY= obj.boxY;
				params.loadNum = obj.loadNum;
				params.walkType = obj.walkType;
				htp.post(url.setQuickPointScreen, params)
					.then(res => {
						if(res.status === 10000001) {
              Toast('请求失败');
            } else {
            setSen('filament-shield', 1);
            }
					});
			},
			// getQuickPointScreen() {
			// 	htp.get(url.getQuickPointScreen)
			// 		.then(res =>  {
			// 		this.getQuickPointScreens = res.data;
			// 		this.rowsAndColumns = [{
			// 			title: this.$t('common1.rows'),
			// 			value: this.getQuickPointScreens.boxX,
			// 			step: 1,
			// 			range: {
			// 				start: 1,
			// 				end: Math.ceil(this.resolution.height/this.boxParam.height)
			// 			}
			// 		},{
			// 			title: this.$t('common1.columns'),
			// 			value: this.getQuickPointScreens.boxY,
			// 			step: 1,
			// 			range: {
			// 				start: 1,
			// 				end: Math.ceil(this.resolution.width/this.boxParam.width)
			// 			}
			// 		}];
			// 	});
			// },
			before() {
				this.$router.push({
					name: 'index',
					path: '/',
					meta: {
						params:[]
					},
					component: () => import('../../pages/index')
				});
			},
			showSelectNetworkPort() {
				this.showquickScreen = true;
			},
			advancedPointScreen() {
				this.showNetworkPort = true;
			}
		}
	};
</script>
<style scoped lang="less">
</style>