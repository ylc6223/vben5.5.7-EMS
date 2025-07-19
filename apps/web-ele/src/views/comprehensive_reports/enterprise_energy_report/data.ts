import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

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

export function useColumns(
  onActionClick?: OnActionClickFn<EnterpriseEnergyReportData>,
): VxeTableGridOptions<EnterpriseEnergyReportData>['columns'] {
  return [
    // 时间列
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title: $t('system.energyReport.time'),
      width: 120,
    },
    // 负荷(kW·h)分组
    {
      align: 'center',
      title: $t('system.energyReport.load'),
      children: [
        {
          align: 'center',
          field: 'loadSharp',
          title: $t('system.energyReport.timeSlots.sharp'),
          width: 80,
        },
        {
          align: 'center',
          field: 'loadPeak',
          title: $t('system.energyReport.timeSlots.peak'),
          width: 80,
        },
        {
          align: 'center',
          field: 'loadFlat',
          title: $t('system.energyReport.timeSlots.flat'),
          width: 80,
        },
        {
          align: 'center',
          field: 'loadValley',
          title: $t('system.energyReport.timeSlots.valley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'loadDeepValley',
          title: $t('system.energyReport.timeSlots.deepValley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'loadTotal',
          title: $t('system.energyReport.timeSlots.total'),
          width: 80,
        },
      ],
    },
    // 风电(kW·h)分组
    {
      align: 'center',
      title: $t('system.energyReport.wind'),
      children: [
        {
          align: 'center',
          field: 'windSharp',
          title: $t('system.energyReport.timeSlots.sharp'),
          width: 80,
        },
        {
          align: 'center',
          field: 'windPeak',
          title: $t('system.energyReport.timeSlots.peak'),
          width: 80,
        },
        {
          align: 'center',
          field: 'windFlat',
          title: $t('system.energyReport.timeSlots.flat'),
          width: 80,
        },
        {
          align: 'center',
          field: 'windValley',
          title: $t('system.energyReport.timeSlots.valley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'windDeepValley',
          title: $t('system.energyReport.timeSlots.deepValley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'windTotal',
          title: $t('system.energyReport.timeSlots.total'),
          width: 80,
        },
      ],
    },
    // 储能(kW·h)分组
    {
      align: 'center',
      title: $t('system.energyReport.storage'),
      children: [
        // 充电子分组
        {
          align: 'center',
          title: $t('system.energyReport.charge'),
          children: [
            {
              align: 'center',
              field: 'storageChargeSharp',
              title: $t('system.energyReport.timeSlots.sharp'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageChargePeak',
              title: $t('system.energyReport.timeSlots.peak'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageChargeFlat',
              title: $t('system.energyReport.timeSlots.flat'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageChargeValley',
              title: $t('system.energyReport.timeSlots.valley'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageChargeDeepValley',
              title: $t('system.energyReport.timeSlots.deepValley'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageChargeTotal',
              title: $t('system.energyReport.timeSlots.total'),
              width: 70,
            },
          ],
        },
        // 放电子分组
        {
          align: 'center',
          title: $t('system.energyReport.discharge'),
          children: [
            {
              align: 'center',
              field: 'storageDischargeSharp',
              title: $t('system.energyReport.timeSlots.sharp'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageDischargePeak',
              title: $t('system.energyReport.timeSlots.peak'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageDischargeFlat',
              title: $t('system.energyReport.timeSlots.flat'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageDischargeValley',
              title: $t('system.energyReport.timeSlots.valley'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageDischargeDeepValley',
              title: $t('system.energyReport.timeSlots.deepValley'),
              width: 70,
            },
            {
              align: 'center',
              field: 'storageDischargeTotal',
              title: $t('system.energyReport.timeSlots.total'),
              width: 70,
            },
          ],
        },
      ],
    },
    // 充电桩(kW·h)分组
    {
      align: 'center',
      title: $t('system.energyReport.chargingPile'),
      children: [
        {
          align: 'center',
          field: 'chargingPileSharp',
          title: $t('system.energyReport.timeSlots.sharp'),
          width: 80,
        },
        {
          align: 'center',
          field: 'chargingPilePeak',
          title: $t('system.energyReport.timeSlots.peak'),
          width: 80,
        },
        {
          align: 'center',
          field: 'chargingPileFlat',
          title: $t('system.energyReport.timeSlots.flat'),
          width: 80,
        },
        {
          align: 'center',
          field: 'chargingPileValley',
          title: $t('system.energyReport.timeSlots.valley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'chargingPileDeepValley',
          title: $t('system.energyReport.timeSlots.deepValley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'chargingPileTotal',
          title: $t('system.energyReport.timeSlots.total'),
          width: 80,
        },
      ],
    },
    // 电网(kW·h)分组
    {
      align: 'center',
      title: $t('system.energyReport.grid'),
      children: [
        {
          align: 'center',
          field: 'gridSharp',
          title: $t('system.energyReport.timeSlots.sharp'),
          width: 80,
        },
        {
          align: 'center',
          field: 'gridPeak',
          title: $t('system.energyReport.timeSlots.peak'),
          width: 80,
        },
        {
          align: 'center',
          field: 'gridFlat',
          title: $t('system.energyReport.timeSlots.flat'),
          width: 80,
        },
        {
          align: 'center',
          field: 'gridValley',
          title: $t('system.energyReport.timeSlots.valley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'gridDeepValley',
          title: $t('system.energyReport.timeSlots.deepValley'),
          width: 80,
        },
        {
          align: 'center',
          field: 'gridTotal',
          title: $t('system.energyReport.timeSlots.total'),
          width: 80,
        },
      ],
    },
    // 光伏(kW·h)分组
    {
      align: 'center',
      title: $t('system.energyReport.solar'),
      children: [
        // 消纳子分组
        {
          align: 'center',
          title: $t('system.energyReport.consumption'),
          children: [
            {
              align: 'center',
              field: 'solarConsumptionSharp',
              title: $t('system.energyReport.timeSlots.sharp'),
              width: 70,
            },
            {
              align: 'center',
              field: 'solarConsumptionPeak',
              title: $t('system.energyReport.timeSlots.peak'),
              width: 70,
            },
            {
              align: 'center',
              field: 'solarConsumptionFlat',
              title: $t('system.energyReport.timeSlots.flat'),
              width: 70,
            },
            {
              align: 'center',
              field: 'solarConsumptionValley',
              title: $t('system.energyReport.timeSlots.valley'),
              width: 70,
            },
            {
              align: 'center',
              field: 'solarConsumptionDeepValley',
              title: $t('system.energyReport.timeSlots.deepValley'),
              width: 70,
            },
            {
              align: 'center',
              field: 'solarConsumptionTotal',
              title: $t('system.energyReport.timeSlots.total'),
              width: 70,
            },
          ],
        },
        // 上网列
        {
          align: 'center',
          field: 'gridConnection',
          title: $t('system.energyReport.gridConnection'),
          width: 80,
        },
        // 总列
        {
          align: 'center',
          field: 'grandTotal',
          title: $t('system.energyReport.total'),
          width: 80,
        },
      ],
    },
  ];
}
