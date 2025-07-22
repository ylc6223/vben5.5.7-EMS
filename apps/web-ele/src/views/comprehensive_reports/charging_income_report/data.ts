import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { ChargingIncomeReportData } from '#/api/income/report';

import { $t } from '#/locales';
// 报表类型定义
export type ReportType = 'monthly' | 'yearly';

/**
 * 充电收益报表表格列配置函数
 *
 * 该函数用于生成充电收益报表表格的列配置，包括时间列和五大时段列（尖、峰、平、谷、深谷），每个时段包含电量和成本两个子列。
 *
 * @param reportType - 报表类型，'monthly' 为月报，'yearly' 为年报
 * @param onActionClick - 可选的操作按钮点击回调函数
 *
 * @returns VxeTableGridOptions<ChargingIncomeReportData>['columns']
 *   返回 VXE Table 表格的列配置数组，包含以下列组：
 *   - 时间列: 固定在左侧的时间显示列（月报显示日期，年报显示月份）
 *   - 尖: 包含电量(kW·h)、成本(元)两个子列
 *   - 峰: 包含电量(kW·h)、成本(元)两个子列
 *   - 平: 包含电量(kW·h)、成本(元)两个子列
 *   - 谷: 包含电量(kW·h)、成本(元)两个子列
 *   - 深谷: 包含电量(kW·h)、成本(元)两个子列
 *
 * @example
 * ```typescript
 * // 月报列配置
 * const monthlyColumns = useColumns('monthly');
 *
 * // 年报列配置
 * const yearlyColumns = useColumns('yearly');
 * ```
 */
export function useColumns(
  reportType: ReportType = 'monthly',
  onActionClick?: OnActionClickFn<ChargingIncomeReportData>,
): VxeTableGridOptions<ChargingIncomeReportData>['columns'] {
  return [
    // 时间列 - 根据报表类型显示不同标题
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title:
        reportType === 'monthly'
          ? $t('system.chargingIncomeReport.date')
          : $t('system.chargingIncomeReport.month'),
      width: 120,
    },
    // 第一大列：尖
    {
      align: 'center',
      title: $t('system.chargingIncomeReport.sharp'),
      children: [
        // 尖电量(kW·h)
        {
          align: 'center',
          field: 'sharpElectricity',
          title: $t('system.chargingIncomeReport.sharpElectricity'),
          minWidth: 120,
        },
        // 尖成本(元)
        {
          align: 'center',
          field: 'sharpCost',
          title: $t('system.chargingIncomeReport.sharpCost'),
          minWidth: 120,
        },
      ],
    },
    // 第二大列：峰
    {
      align: 'center',
      title: $t('system.chargingIncomeReport.peak'),
      children: [
        // 峰电量(kW·h)
        {
          align: 'center',
          field: 'peakElectricity',
          title: $t('system.chargingIncomeReport.peakElectricity'),
          minWidth: 120,
        },
        // 峰成本(元)
        {
          align: 'center',
          field: 'peakCost',
          title: $t('system.chargingIncomeReport.peakCost'),
          minWidth: 120,
        },
      ],
    },
    // 第三大列：平
    {
      align: 'center',
      title: $t('system.chargingIncomeReport.flat'),
      children: [
        // 平电量(kW·h)
        {
          align: 'center',
          field: 'flatElectricity',
          title: $t('system.chargingIncomeReport.flatElectricity'),
          minWidth: 120,
        },
        // 平成本(元)
        {
          align: 'center',
          field: 'flatCost',
          title: $t('system.chargingIncomeReport.flatCost'),
          minWidth: 120,
        },
      ],
    },
    // 第四大列：谷
    {
      align: 'center',
      title: $t('system.chargingIncomeReport.valley'),
      children: [
        // 谷电量(kW·h)
        {
          align: 'center',
          field: 'valleyElectricity',
          title: $t('system.chargingIncomeReport.valleyElectricity'),
          minWidth: 120,
        },
        // 谷成本(元)
        {
          align: 'center',
          field: 'valleyCost',
          title: $t('system.chargingIncomeReport.valleyCost'),
          minWidth: 120,
        },
      ],
    },
    // 第五大列：深谷
    {
      align: 'center',
      title: $t('system.chargingIncomeReport.deepValley'),
      children: [
        // 深谷电量(kW·h)
        {
          align: 'center',
          field: 'deepValleyElectricity',
          title: $t('system.chargingIncomeReport.deepValleyElectricity'),
          minWidth: 120,
        },
        // 深谷成本(元)
        {
          align: 'center',
          field: 'deepValleyCost',
          title: $t('system.chargingIncomeReport.deepValleyCost'),
          minWidth: 120,
        },
      ],
    },
    // 第六大列：充电金额
    {
      align: 'center',
      field: 'chargingAmount',
      title: $t('system.chargingIncomeReport.chargingAmount'),
      minWidth: 140,
    },
    // 第七大列：净收益
    {
      align: 'center',
      field: 'netProfit',
      title: $t('system.chargingIncomeReport.netProfit'),
      minWidth: 140,
    },
  ];
}
