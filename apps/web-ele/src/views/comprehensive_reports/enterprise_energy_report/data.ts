import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EnterpriseEnergyReportData } from '#/api/energy/report';

import { $t } from '#/locales';
// 报表类型定义
export type ReportType = 'monthly' | 'yearly';

/**
 * 企业能源报表表格列配置函数
 *
 * 该函数用于生成企业能源报表表格的列配置，包括时间列、负荷数据、风电数据、
 * 储能数据（充电/放电）、充电桩数据、电网数据、光伏数据等多个分组列。
 *
 * @param reportType - 报表类型，'monthly' 为月报，'yearly' 为年报
 * @param onActionClick - 可选的操作按钮点击回调函数
 *   - 类型: OnActionClickFn<EnterpriseEnergyReportData>
 *   - 说明: 当表格中的操作按钮被点击时触发的回调函数
 *   - 参数: { code: string, row: EnterpriseEnergyReportData }
 *     - code: 操作代码，如 'edit', 'delete', 'view' 等
 *     - row: 当前行的数据对象，包含完整的企业能源报表数据
 *   - 返回值: void
 *   - 示例: (params) => { console.log('操作:', params.code, '数据:', params.row) }
 *
 * @returns VxeTableGridOptions<EnterpriseEnergyReportData>['columns']
 *   返回 VXE Table 表格的列配置数组，包含以下列组：
 *   - 时间列: 固定在左侧的时间显示列（月报显示日期，年报显示月份）
 *   - 负荷(kW·h): 包含尖、峰、平、谷、深谷、总计等子列
 *   - 风电(kW·h): 包含尖、峰、平、谷、深谷、总计等子列
 *   - 储能(kW·h): 包含充电和放电两个子分组，每个分组含尖、峰、平、谷、深谷、总计
 *   - 充电桩(kW·h): 包含尖、峰、平、谷、深谷、总计等子列
 *   - 电网(kW·h): 包含尖、峰、平、谷、深谷、总计等子列
 *   - 光伏(kW·h): 包含消纳子分组（尖、峰、平、谷、深谷、总计）、上网列、总计列
 *
 * @example
 * ```typescript
 * // 月报列配置
 * const monthlyColumns = useColumns('monthly', ({ code, row }) => {
 *   console.log('月报操作:', code, row);
 * });
 *
 * // 年报列配置
 * const yearlyColumns = useColumns('yearly');
 * ```
 */
export function useColumns(
  reportType: ReportType = 'monthly',
  onActionClick?: OnActionClickFn<EnterpriseEnergyReportData>,
): VxeTableGridOptions<EnterpriseEnergyReportData>['columns'] {
  return [
    // 时间列 - 根据报表类型显示不同标题
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title: reportType === 'monthly'
        ? $t('system.energyReport.date')
        : $t('system.energyReport.month'),
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
