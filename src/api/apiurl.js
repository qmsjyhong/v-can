let apis = {
  //获取设备信息
  getDeviceInfo: 'getDeviceInfo',
  //获取设备网口数
  getPortSize: 'getPortSize',
  //获取输入源画质信息
  getInputSourceQuality: 'getInputSourceQuality',
  //设置快捷点屏
  setQuickPointScreen: 'setQuickPointScreen',
  //获取输入接口分辨率
  getInputResolutionRatio: 'getInputResolutionRatio',
  //获取输入源列表
  getInputSourceList: 'getInputSourceList',
  //获取输出画质参数
  getOutputResolutionRatio: 'getOutputResolutionRatio',
  //设置高级点屏
  setAdvancedPointsScreen: 'setAdvancedPointsScreen',
  //设置边框
  setWinBorder: 'setWinBorder',
  // 设置画质
  setWinQuality: 'setWinQuality',
  //设置源截取
  setInputSourceCrop: 'setInputSourceCrop',
  //设置窗口布局
  setWinParam: 'setWinParam',
  //设置窗口输入源
  setWinInput: 'setWinInput',
  // 开关窗
  setWinStatus: 'setWinStatus',
  // 重置编导
  setAllWinClose: 'setAllWinClose',
  //获取场景列表
  getSceneList: 'getSceneList',
  //设置载入场景
  setLoadScene: '/setLoadScene',
  //获取窗口列表
  getWinList: 'getWinList',
  //设置保存场景
  saveScene: '/saveScene',
  // 设置所有z序
  setWinZOrder: 'setWinZOrder',
  // 获取瓶体结构
  getScreenStructure: 'getScreenStructure',
  //设置输入画质参数
  setInputResolutionRatio: 'setInputResolutionRatio',
  //设置输入画质参数
  setInputSourceQuality: 'setInputSourceQuality',
  //设置输出分辨率
  setOutputResolutionRatio: 'setOutputResolutionRatio',
  //获取输出画质
  getOutputQuality: 'getOutputQuality',
  //设置take特效
  setTakeSpecialEfficiency: 'setTakeSpecialEfficiency',
  //获取Take特效
  getTakeSpecialEfficiency: 'getTakeSpecialEfficiency',
  //设置场景特效
  setSceneSpecialEfficiency: 'setSceneSpecialEfficiency',
  //获取场景特效
  getSceneSpecialEfficiency: 'getSceneSpecialEfficiency',
  //设置工作模式
  setWorkModel: 'setWorkModel',
  //获取快捷点屏
  getQuickPointScreen: 'getQuickPointScreen',
  //获取高级点屏
  getAdvancedPointsScreen: 'getAdvancedPointsScreen',
  //获取测试画面
  getTestPicture: 'getTestPicture',
  //源截取参数获取
  getInputSourceCrop: 'getInputSourceCrop',
  //获取窗口位置
  getWinBaseInfo: 'getWinBaseInfo',
  //获取窗口画质
  getWinQuality: 'getWinQuality',
  //检查更新
  checkForUpdate: 'checkForUpdate',
  //获取箱体体数
  getBoxParam: 'getBoxParam',
  //获取当前场景
  getCurScene: 'getCurScene',
  //take命令下发
  commandMessage: 'commandMessage',
  //场景名称修改
  alterSceneName: 'alterSceneName',
  //测试画面
  setTestPicture: 'setTestPicture'
};

// 不同环境分发
for (var k in apis) {
  if (process.env.NODE_ENV === 'development') {
    apis[k] = '/api/' + apis[k];
  }
}

export default apis;
