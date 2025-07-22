import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: $t('page.dashboard.title'),
      hideInMenu: true,
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: $t('page.dashboard.workspace'),
        },
      },
    ],
  },
  // 驾驶舱
  {
    // component: BasicLayout,
    meta: {
      icon: 'ion:grid-outline',
      order: 1,
      title: $t('page.ems.title'),
      hideInTab: true,
      noBasicLayout: true, // 不使用BasicLayout
    },
    name: 'EMSDashBoard',
    path: '/EMSDashBoard',
    component: () => import('#/views/v_dashboard/index.vue'),
  },
  // 能源综合概况
  {
    name: 'EnergyOverview',
    path: '/energy/overview',
    component: () => import('#/views/energy_overview/index.vue'),
    meta: {
      affixTab: true,
      icon: 'ion:grid-outline',
      title: $t('page.other.energyOverview'),
      order: 2,
    },
  },
  // 能量流向图
  {
    name: 'WindPowerMap',
    path: '/wind-power/map',
    component: () => import('#/views/wind_power_map/index.vue'),
    meta: {
      icon: 'mdi:chart-sankey',
      title: $t('page.other.windPowerMap'),
      order: 3,
    },
  },
  // 综合报表
  {
    name: 'ComprehensiveReportsParent',
    path: '/comprehensive-reports',
    meta: {
      icon: 'mdi:chart-box-outline',
      title: $t('page.other.comprehensiveReports'),
      order: 4,
    },
    children: [
      {
        name: 'EnterpriseEnergyReport',
        path: '/comprehensive-reports/enterprise-energy',
        component: () =>
          import(
            '#/views/comprehensive_reports/enterprise_energy_report/index.vue'
          ),
        meta: {
          title: $t('page.other.enterpriseEnergyReport'),
          icon: 'mdi:office-building-cog',
        },
      },
      {
        name: 'EnterpriseIncomeReport',
        path: '/comprehensive-reports/enterprise-income',
        component: () =>
          import(
            '#/views/comprehensive_reports/enterprise_income_report/index.vue'
          ),
        meta: {
          title: $t('page.other.enterpriseIncomeReport'),
          icon: 'mdi:currency-usd',
        },
      },
      {
        name: 'PhotovoltaicIncomeReport',
        path: '/comprehensive-reports/photovoltaic-income',
        component: () =>
          import(
            '#/views/comprehensive_reports/photovoltaic_income_report/index.vue'
          ),
        meta: {
          title: $t('page.other.photovoltaicIncomeReport'),
          icon: 'mdi:solar-panel',
        },
      },
      {
        name: 'EnergyStorageIncomeReport',
        path: '/comprehensive-reports/energy-storage-income',
        component: () =>
          import(
            '#/views/comprehensive_reports/energy_storage_income_report/index.vue'
          ),
        meta: {
          title: $t('page.other.energyStorageIncomeReport'),
          icon: 'mdi:battery-charging',
        },
      },
      {
        name: 'ChargingIncomeReport',
        path: '/comprehensive-reports/charging-income',
        component: () =>
          import(
            '#/views/comprehensive_reports/charging_income_report/index.vue'
          ),
        meta: {
          title: $t('page.other.chargingIncomeReport'),
          icon: 'mdi:ev-station',
        },
      },
      {
        name: 'WindPowerIncomeReport',
        path: '/comprehensive-reports/wind-power-income',
        component: () =>
          import(
            '#/views/comprehensive_reports/wind_power_income_report/index.vue'
          ),
        meta: {
          title: $t('page.other.windPowerIncomeReport'),
          icon: 'mdi:wind-turbine',
        },
      },
    ],
  },
];

export default routes;
