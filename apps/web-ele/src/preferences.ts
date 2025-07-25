import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
    // 开启并行处理前端固定路由权限和后端动态菜单数据，最终将两部分路由合并。
    accessMode: 'mixed',
    defaultHomePath: '/energy/overview',
    headerTitle: '微电网智慧能源平台',
  },
  header: {
    enable: true,
    height: 90,
    hidden: false,
    menuAlign: 'start',
    mode: 'fixed',
    useCustomHeader: true,
  },
  logo: {
    enable: true,
    fit: 'contain',
    source: 'http://61.160.94.146:8090/ECEMS/static/img/greenLogo.e932e133.png',
    isBlock: true,
    logoSize: 70,
  },
  sidebar: {
    width: 210,
  },
  tabbar: {
    showIcon: false,
  },
});
