const router = [
  /**在线模式 */
  {
    name: 'index', //首页
    path: '/',
    meta: {
      params: []
    },
    component: () => import('../pages/outline_index')
  },
  {
    name: 'window', // 快速选择
    path: '/window',
    component: () => import('../pages/window')
  },
  {
    name: 'scene', // 载入/保存场景
    path: '/scene',
    component: () => import('../pages/scene')
  },
  {
    name: 'quality', // 高级设置
    path: '/quality',
    component: () => import('../pages/scenarist/quality')
  },
  {
    name: 'window-border', // 边框
    path: '/window-border',
    component: () => import('../pages/scenarist/window-border')
  },
  {
    name: 'interception', //源截取
    path: '/interception',
    component: () => import('../pages/scenarist/interception')
  },
  {
    name: 'scenarist-layout', // 编导布局
    path: '/scenarist-layout',
    component: () => import('../pages/scenarist/scenarist-layout')
  },
  {
    name: 'selectmode', //选择模式
    path: '/selectmode',
    component: () => import('../pages/selmode')
  },
  {
    name: 'scenarist', // 编导
    path: '/scenarist-home',
    component: () => import('../pages/scenarist/scenarist')
  },
  {
    name: 'psytopic', //测试画面
    path: '/psytopic',
    component: () => import('../pages/test')
  },
  {
    name: 'settings', //设置
    path: '/settings',
    component: () => import('../pages/settings/settings')
  },
  {
    //配屏
    name: 'enterconfig',
    path: '/settings/enterconfig',
    component: () => import('../pages/settings/enterConfig')
  },
  {
    name: 'outconfig',
    path: '/settings/outconfig',
    component: () => import('../pages/settings/outConfig')
  },
  {
    name: 'takeeffects',
    path: '/settings/takeeffects',
    component: () => import('../pages/settings/takeEffects')
  },
  {
    name: 'sceneeffects',
    path: '/settings/sceneeffects',
    component: () => import('../pages/settings/sceneEffects')
  },
  {
    name: 'selectrate',
    path: '/settings/selectrate',
    component: () => import('../pages/settings/selResolution')
  },
  {
    name: 'selmode', //选择模式
    path: '/settings/selmode',
    component: () => import('../pages/settings/selmode')
  },
  {
    name: 'selectScreenMode',
    path: '/filamentShield',
    component: () => import('../pages/selectScreenMode')
  },
  {
    name: 'help',
    path: '/settings/help',
    component: () => import('../pages/settings/help')
  },
  {
    name: 'book',
    path: '/settings/book',
    component: () => import('../pages/settings/book')
  },
  /**离线模式路由 */
  {
    name: 'outline_index', //首页
    path: '/outline_index',
    meta: {
      params: []
    },
    component: () => import('../pages/outline_index')
  },
  {
    name: 'outline_window', // 快速选择
    path: '/outline_window',
    component: () => import('../pages/outline_window')
  },
  {
    name: 'outline_scene', // 载入/保存场景
    path: '/outline_scene',
    component: () => import('../pages/outline_scene')
  },
  {
    name: 'quality', // 高级设置
    path: '/quality',
    component: () => import('../pages/scenarist/quality')
  },
  {
    name: 'outline_window-border', // 边框
    path: '/outline_window-border',
    component: () => import('../pages/scenarist/outline_window-border')
  },
  {
    name: 'outline_interception', //源截取
    path: '/outline_interception',
    component: () => import('../pages/scenarist/outline_interception')
  },
  {
    name: 'outline_scenarist-layout', // 编导布局
    path: '/outline_scenarist-layout',
    component: () => import('../pages/scenarist/outline_scenarist-layout')
  },
  {
    name: 'outline_selectmode', //选择模式
    path: '/outline_selectmode',
    component: () => import('../pages/outline_selmode')
  },
  {
    name: 'outline_scenarist', // 编导
    path: '/outline_scenarist-home',
    component: () => import('../pages/scenarist/outline_scenarist')
  },
  {
    name: 'outline_psytopic', //测试画面
    path: '/outline_psytopic',
    component: () => import('../pages/outline_test')
  },
  {
    name: 'outline_settings', //设置
    path: '/outline_settings',
    component: () => import('../pages/settings/outline_settings')
  },
  {
    //配屏
    name: 'outline_enterconfig',
    path: '/settings/outline_enterconfig',
    component: () => import('../pages/settings/outline_enterConfig')
  },
  {
    name: 'outline_outconfig',
    path: '/settings/outline_outconfig',
    component: () => import('../pages/settings/outline_outConfig')
  },
  {
    name: 'outline_takeeffects',
    path: '/settings/outline_takeeffects',
    component: () => import('../pages/settings/outline_takeEffects')
  },
  {
    name: 'outline_sceneeffects',
    path: '/settings/outline_sceneeffects',
    component: () => import('../pages/settings/outline_sceneEffects')
  },
  {
    name: 'outline_selectrate',
    path: '/settings/outline_selectrate',
    component: () => import('../pages/settings/outline_selResolution')
  },
  {
    name: 'outline_selmode', //选择模式
    path: '/settings/outline_selmode',
    component: () => import('../pages/settings/outline_selmode')
  },
  {
    name: 'outline_selectScreenMode',
    path: '/outline_filamentShield',
    component: () => import('../pages/selectScreenMode/outline_index')
  },
  {
    name: 'outline_help',
    path: '/settings/outline_help',
    component: () => import('../pages/settings/outline_help')
  },
  {
    name: 'outline_book',
    path: '/settings/outline_book',
    component: () => import('../pages/settings/outline_book')
  }
];

export default router;
