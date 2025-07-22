export interface UserInfo {
  id: number;
  password: string;
  realName: string;
  roles: string[];
  username: string;
  homePath?: string;
}

export const MOCK_USERS: UserInfo[] = [
  {
    id: 0,
    password: '123456',
    realName: 'Vben',
    roles: ['super'],
    username: 'vben',
    homePath: '/energy/overview',
  },
  {
    id: 1,
    password: '123456',
    realName: 'Admin',
    roles: ['admin'],
    username: 'admin',
    homePath: '/energy/overview',
  },
  {
    id: 2,
    password: '123456',
    realName: 'Jack',
    roles: ['user'],
    username: 'jack',
    homePath: '/energy/overview',
  },
  {
    id: 3,
    password: '123456',
    realName: '富奥汽车',
    roles: ['admin'],
    username: 'FAQC',
    homePath: '/energy/overview',
  },
];

export const MOCK_CODES = [
  // super
  {
    codes: ['AC_100100', 'AC_100110', 'AC_100120', 'AC_100010'],
    username: 'vben',
  },
  {
    // admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'admin',
  },
  {
    // user
    codes: ['AC_1000001', 'AC_1000002'],
    username: 'jack',
  },
  {
    // FAQC admin
    codes: ['AC_100010', 'AC_100020', 'AC_100030'],
    username: 'FAQC',
  },
];

// 移除重复的dashboard菜单，因为在mixed模式下会与静态路由重复
// 静态路由已经在 apps/web-ele/src/router/routes/modules/dashboard.ts 中定义了完整的菜单结构
const dashboardMenus: any[] = [];

const createDemosMenus = (role: 'admin' | 'super' | 'user') => {
  const roleWithMenus = {
    admin: {
      component: '/demos/access/admin-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.adminVisible',
      },
      name: 'AccessAdminVisibleDemo',
      path: '/demos/access/admin-visible',
    },
    super: {
      component: '/demos/access/super-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.superVisible',
      },
      name: 'AccessSuperVisibleDemo',
      path: '/demos/access/super-visible',
    },
    user: {
      component: '/demos/access/user-visible',
      meta: {
        icon: 'mdi:button-cursor',
        title: 'demos.access.userVisible',
      },
      name: 'AccessUserVisibleDemo',
      path: '/demos/access/user-visible',
    },
  };

  return [
    {
      meta: {
        icon: 'ic:baseline-view-in-ar',
        keepAlive: true,
        order: 1000,
        title: 'demos.title',
      },
      name: 'Demos',
      path: '/demos',
      redirect: '/demos/access',
      children: [
        {
          name: 'AccessDemos',
          path: '/demosaccess',
          meta: {
            icon: 'mdi:cloud-key-outline',
            title: 'demos.access.backendPermissions',
          },
          redirect: '/demos/access/page-control',
          children: [
            {
              name: 'AccessPageControlDemo',
              path: '/demos/access/page-control',
              component: '/demos/access/index',
              meta: {
                icon: 'mdi:page-previous-outline',
                title: 'demos.access.pageAccess',
              },
            },
            {
              name: 'AccessButtonControlDemo',
              path: '/demos/access/button-control',
              component: '/demos/access/button-control',
              meta: {
                icon: 'mdi:button-cursor',
                title: 'demos.access.buttonControl',
              },
            },
            {
              name: 'AccessMenuVisible403Demo',
              path: '/demos/access/menu-visible-403',
              component: '/demos/access/menu-visible-403',
              meta: {
                authority: ['no-body'],
                icon: 'mdi:button-cursor',
                menuVisibleWithForbidden: true,
                title: 'demos.access.menuVisible403',
              },
            },
            roleWithMenus[role],
          ],
        },
      ],
    },
  ];
};

// 移除重复的demos菜单，因为在mixed模式下会与静态路由重复
// 静态路由已经在 apps/web-ele/src/router/routes/modules/demos.ts 中定义了demos菜单
export const MOCK_MENUS = [
  {
    menus: [...dashboardMenus],
    username: 'vben',
  },
  {
    menus: [...dashboardMenus],
    username: 'admin',
  },
  {
    menus: [...dashboardMenus],
    username: 'jack',
  },
  {
    menus: [...dashboardMenus],
    username: 'FAQC',
  },
];

export const MOCK_MENU_LIST = [
  // 移除所有重复的菜单项，因为在mixed模式下会与静态路由重复
  // 静态路由已经在 apps/web-ele/src/router/routes/modules/ 目录下定义了完整的菜单结构
  // 包括：dashboard.ts, demos.ts, system.ts, vben.ts 等
  // 移除重复的Project和About菜单项，因为在mixed模式下会与静态路由重复
  // 静态路由已经在 apps/web-ele/src/router/routes/modules/vben.ts 中定义了这些菜单
];

export function getMenuIds(menus: any[]) {
  const ids: number[] = [];
  menus.forEach((item) => {
    ids.push(item.id);
    if (item.children && item.children.length > 0) {
      ids.push(...getMenuIds(item.children));
    }
  });
  return ids;
}

// 企业能源报表数据类型定义
export interface EnterpriseEnergyReportData {
  time: string; // 时间
  // 负荷数据
  loadSharp: number; // 负荷-尖
  loadPeak: number; // 负荷-峰
  loadFlat: number; // 负荷-平
  loadValley: number; // 负荷-谷
  loadDeepValley: number; // 负荷-深谷
  loadTotal: number; // 负荷-总
  // 风电数据
  windSharp: number; // 风电-尖
  windPeak: number; // 风电-峰
  windFlat: number; // 风电-平
  windValley: number; // 风电-谷
  windDeepValley: number; // 风电-深谷
  windTotal: number; // 风电-总
  // 储能数据 - 充电部分
  storageChargeSharp: number; // 储能充电-尖
  storageChargePeak: number; // 储能充电-峰
  storageChargeFlat: number; // 储能充电-平
  storageChargeValley: number; // 储能充电-谷
  storageChargeDeepValley: number; // 储能充电-深谷
  storageChargeTotal: number; // 储能充电-总
  // 储能数据 - 放电部分
  storageDischargeSharp: number; // 储能放电-尖
  storageDischargePeak: number; // 储能放电-峰
  storageDischargeFlat: number; // 储能放电-平
  storageDischargeValley: number; // 储能放电-谷
  storageDischargeDeepValley: number; // 储能放电-深谷
  storageDischargeTotal: number; // 储能放电-总
  // 充电桩数据
  chargingPileSharp: number; // 充电桩-尖
  chargingPilePeak: number; // 充电桩-峰
  chargingPileFlat: number; // 充电桩-平
  chargingPileValley: number; // 充电桩-谷
  chargingPileDeepValley: number; // 充电桩-深谷
  chargingPileTotal: number; // 充电桩-总
  // 电网数据
  gridSharp: number; // 电网-尖
  gridPeak: number; // 电网-峰
  gridFlat: number; // 电网-平
  gridValley: number; // 电网-谷
  gridDeepValley: number; // 电网-深谷
  gridTotal: number; // 电网-总
  // 光伏数据 - 消纳部分
  solarConsumptionSharp: number; // 光伏消纳-尖
  solarConsumptionPeak: number; // 光伏消纳-峰
  solarConsumptionFlat: number; // 光伏消纳-平
  solarConsumptionValley: number; // 光伏消纳-谷
  solarConsumptionDeepValley: number; // 光伏消纳-深谷
  solarConsumptionTotal: number; // 光伏消纳-总
  // 上网
  gridConnection: number; // 上网
  // 总
  grandTotal: number; // 总
}

// 企业能源报表Mock数据
export const MOCK_ENTERPRISE_ENERGY_REPORT_DATA: EnterpriseEnergyReportData[] = [
  {
    time: '2025-07-02',
    loadSharp: 120.5,
    loadPeak: 98.3,
    loadFlat: 85.2,
    loadValley: 65.8,
    loadDeepValley: 45.2,
    loadTotal: 414,
    windSharp: 15.2,
    windPeak: 18.6,
    windFlat: 22.1,
    windValley: 28.5,
    windDeepValley: 32.8,
    windTotal: 117.2,
    storageChargeSharp: 0,
    storageChargePeak: 0,
    storageChargeFlat: 5.2,
    storageChargeValley: 12.8,
    storageChargeDeepValley: 18.5,
    storageChargeTotal: 36.5,
    storageDischargeSharp: 8.2,
    storageDischargePeak: 6.5,
    storageDischargeFlat: 3.1,
    storageDischargeValley: 0,
    storageDischargeDeepValley: 0,
    storageDischargeTotal: 17.8,
    chargingPileSharp: 5.2,
    chargingPilePeak: 4.8,
    chargingPileFlat: 3.5,
    chargingPileValley: 2.1,
    chargingPileDeepValley: 1.8,
    chargingPileTotal: 17.4,
    gridSharp: 103.1,
    gridPeak: 79.2,
    gridFlat: 64.6,
    gridValley: 35.2,
    gridDeepValley: 25.6,
    gridTotal: 307.7,
    solarConsumptionSharp: 45.2,
    solarConsumptionPeak: 52.8,
    solarConsumptionFlat: 48.5,
    solarConsumptionValley: 38.2,
    solarConsumptionDeepValley: 25.8,
    solarConsumptionTotal: 210.5,
    gridConnection: 68.5,
    grandTotal: 285.2,
  },
  {
    time: '2025-07-03',
    loadSharp: 135.8,
    loadPeak: 112.5,
    loadFlat: 95.8,
    loadValley: 72.5,
    loadDeepValley: 52.8,
    loadTotal: 469.4,
    windSharp: 18.5,
    windPeak: 22.8,
    windFlat: 26.5,
    windValley: 32.1,
    windDeepValley: 38.5,
    windTotal: 138.4,
    storageChargeSharp: 0,
    storageChargePeak: 1.2,
    storageChargeFlat: 6.8,
    storageChargeValley: 14.5,
    storageChargeDeepValley: 21.2,
    storageChargeTotal: 43.7,
    storageDischargeSharp: 12.5,
    storageDischargePeak: 9.8,
    storageDischargeFlat: 5.2,
    storageDischargeValley: 1.8,
    storageDischargeDeepValley: 0.2,
    storageDischargeTotal: 29.5,
    chargingPileSharp: 6.8,
    chargingPilePeak: 5.5,
    chargingPileFlat: 4.2,
    chargingPileValley: 2.8,
    chargingPileDeepValley: 2.1,
    chargingPileTotal: 21.4,
    gridSharp: 116.5,
    gridPeak: 88.2,
    gridFlat: 70.8,
    gridValley: 42.1,
    gridDeepValley: 31.2,
    gridTotal: 348.8,
    solarConsumptionSharp: 52.8,
    solarConsumptionPeak: 61.5,
    solarConsumptionFlat: 56.2,
    solarConsumptionValley: 44.8,
    solarConsumptionDeepValley: 30.2,
    solarConsumptionTotal: 245.5,
    gridConnection: 78.2,
    grandTotal: 325.8,
  },
  {
    time: '2025-07-04',
    loadSharp: 128.2,
    loadPeak: 105.8,
    loadFlat: 89.5,
    loadValley: 68.2,
    loadDeepValley: 48.5,
    loadTotal: 440.2,
    windSharp: 16.8,
    windPeak: 20.5,
    windFlat: 24.2,
    windValley: 29.8,
    windDeepValley: 35.2,
    windTotal: 126.5,
    storageChargeSharp: 0,
    storageChargePeak: 0.8,
    storageChargeFlat: 5.8,
    storageChargeValley: 13.2,
    storageChargeDeepValley: 19.8,
    storageChargeTotal: 39.6,
    storageDischargeSharp: 10.2,
    storageDischargePeak: 8.5,
    storageDischargeFlat: 4.8,
    storageDischargeValley: 1.2,
    storageDischargeDeepValley: 0,
    storageDischargeTotal: 24.7,
    chargingPileSharp: 5.8,
    chargingPilePeak: 5.2,
    chargingPileFlat: 3.8,
    chargingPileValley: 2.5,
    chargingPileDeepValley: 1.9,
    chargingPileTotal: 19.2,
    gridSharp: 111.6,
    gridPeak: 84.6,
    gridFlat: 66.9,
    gridValley: 38.7,
    gridDeepValley: 28.8,
    gridTotal: 330.6,
    solarConsumptionSharp: 48.5,
    solarConsumptionPeak: 56.8,
    solarConsumptionFlat: 52.2,
    solarConsumptionValley: 41.5,
    solarConsumptionDeepValley: 28.2,
    solarConsumptionTotal: 227.2,
    gridConnection: 72.8,
    grandTotal: 308.5,
  },
  {
    time: '2025-07-05',
    loadSharp: 145.2,
    loadPeak: 118.8,
    loadFlat: 102.5,
    loadValley: 78.5,
    loadDeepValley: 58.2,
    loadTotal: 503.2,
    windSharp: 22.5,
    windPeak: 26.8,
    windFlat: 30.2,
    windValley: 36.5,
    windDeepValley: 42.8,
    windTotal: 158.8,
    storageChargeSharp: 0,
    storageChargePeak: 2.5,
    storageChargeFlat: 8.2,
    storageChargeValley: 16.8,
    storageChargeDeepValley: 24.5,
    storageChargeTotal: 52.0,
    storageDischargeSharp: 18.5,
    storageDischargePeak: 15.2,
    storageDischargeFlat: 9.8,
    storageDischargeValley: 3.5,
    storageDischargeDeepValley: 1.2,
    storageDischargeTotal: 48.2,
    chargingPileSharp: 8.5,
    chargingPilePeak: 7.2,
    chargingPileFlat: 5.8,
    chargingPileValley: 3.8,
    chargingPileDeepValley: 2.8,
    chargingPileTotal: 28.1,
    gridSharp: 118.2,
    gridPeak: 89.4,
    gridFlat: 72.5,
    gridValley: 44.2,
    gridDeepValley: 33.8,
    gridTotal: 358.1,
    solarConsumptionSharp: 58.2,
    solarConsumptionPeak: 68.5,
    solarConsumptionFlat: 62.8,
    solarConsumptionValley: 48.5,
    solarConsumptionDeepValley: 32.8,
    solarConsumptionTotal: 270.8,
    gridConnection: 85.2,
    grandTotal: 356.0,
  },
  {
    time: '2025-07-06',
    loadSharp: 132.8,
    loadPeak: 108.5,
    loadFlat: 92.8,
    loadValley: 71.2,
    loadDeepValley: 51.8,
    loadTotal: 457.1,
    windSharp: 19.2,
    windPeak: 23.5,
    windFlat: 27.8,
    windValley: 33.2,
    windDeepValley: 38.8,
    windTotal: 142.5,
    storageChargeSharp: 0,
    storageChargePeak: 1.8,
    storageChargeFlat: 7.2,
    storageChargeValley: 15.5,
    storageChargeDeepValley: 22.8,
    storageChargeTotal: 47.3,
    storageDischargeSharp: 14.8,
    storageDischargePeak: 11.5,
    storageDischargeFlat: 7.2,
    storageDischargeValley: 2.8,
    storageDischargeDeepValley: 0.8,
    storageDischargeTotal: 37.1,
    chargingPileSharp: 7.2,
    chargingPilePeak: 6.5,
    chargingPileFlat: 4.8,
    chargingPileValley: 3.2,
    chargingPileDeepValley: 2.5,
    chargingPileTotal: 24.2,
    gridSharp: 106.8,
    gridPeak: 81.5,
    gridFlat: 63.8,
    gridValley: 37.2,
    gridDeepValley: 28.2,
    gridTotal: 317.5,
    solarConsumptionSharp: 51.2,
    solarConsumptionPeak: 59.8,
    solarConsumptionFlat: 54.5,
    solarConsumptionValley: 43.2,
    solarConsumptionDeepValley: 29.5,
    solarConsumptionTotal: 238.2,
    gridConnection: 75.8,
    grandTotal: 318.5,
  },
  {
    time: '2025-07-07',
    loadSharp: 138.5,
    loadPeak: 115.2,
    loadFlat: 98.5,
    loadValley: 75.8,
    loadDeepValley: 55.2,
    loadTotal: 483.2,
    windSharp: 20.8,
    windPeak: 25.2,
    windFlat: 29.5,
    windValley: 35.8,
    windDeepValley: 41.2,
    windTotal: 152.5,
    storageChargeSharp: 0,
    storageChargePeak: 2.2,
    storageChargeFlat: 7.8,
    storageChargeValley: 16.2,
    storageChargeDeepValley: 23.5,
    storageChargeTotal: 49.7,
    storageDischargeSharp: 16.2,
    storageDischargePeak: 13.8,
    storageDischargeFlat: 8.5,
    storageDischargeValley: 3.2,
    storageDischargeDeepValley: 1.5,
    storageDischargeTotal: 43.2,
    chargingPileSharp: 8.2,
    chargingPilePeak: 7.5,
    chargingPileFlat: 5.8,
    chargingPileValley: 3.8,
    chargingPileDeepValley: 2.8,
    chargingPileTotal: 28.1,
    gridSharp: 114.1,
    gridPeak: 86.7,
    gridFlat: 69.2,
    gridValley: 40.8,
    gridDeepValley: 31.2,
    gridTotal: 342.0,
    solarConsumptionSharp: 55.8,
    solarConsumptionPeak: 65.2,
    solarConsumptionFlat: 59.5,
    solarConsumptionValley: 46.8,
    solarConsumptionDeepValley: 31.8,
    solarConsumptionTotal: 259.1,
    gridConnection: 82.5,
    grandTotal: 348.2,
  },
  {
    time: '2025-07-08',
    loadSharp: 142.6,
    loadPeak: 118.5,
    loadFlat: 102.8,
    loadValley: 78.5,
    loadDeepValley: 58.2,
    loadTotal: 500.6,
    windSharp: 22.8,
    windPeak: 28.5,
    windFlat: 32.1,
    windValley: 38.6,
    windDeepValley: 42.3,
    windTotal: 164.3,
    storageChargeSharp: 0,
    storageChargePeak: 2.1,
    storageChargeFlat: 7.5,
    storageChargeValley: 15.8,
    storageChargeDeepValley: 22.5,
    storageChargeTotal: 47.9,
    storageDischargeSharp: 15.2,
    storageDischargePeak: 12.8,
    storageDischargeFlat: 8.5,
    storageDischargeValley: 2.8,
    storageDischargeDeepValley: 0.5,
    storageDischargeTotal: 39.8,
    chargingPileSharp: 9.8,
    chargingPilePeak: 8.5,
    chargingPileFlat: 6.8,
    chargingPileValley: 4.2,
    chargingPileDeepValley: 2.8,
    chargingPileTotal: 32.1,
    gridSharp: 118.5,
    gridPeak: 95.2,
    gridFlat: 75.8,
    gridValley: 45.5,
    gridDeepValley: 34.8,
    gridTotal: 369.8,
    solarConsumptionSharp: 58.5,
    solarConsumptionPeak: 68.2,
    solarConsumptionFlat: 62.8,
    solarConsumptionValley: 48.5,
    solarConsumptionDeepValley: 32.8,
    solarConsumptionTotal: 270.8,
    gridConnection: 85.2,
    grandTotal: 356.0,
  },
];
