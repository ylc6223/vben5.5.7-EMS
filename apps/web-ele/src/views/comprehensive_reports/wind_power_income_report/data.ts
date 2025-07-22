import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { WindPowerIncomeReportData } from '#/api/income/report';

import { $t } from '#/locales';
// 报表类型定义
export type ReportType = 'monthly' | 'yearly';

/**
 * 风电收益报表表格列配置函数
 *
 * 该函数用于生成风电收益报表表格的列配置，包括时间列和五大时段列（尖、峰、平、谷、深谷），每个时段包含电量和收益两个子列。
 *
 * @param reportType - 报表类型，'monthly' 为月报，'yearly' 为年报
 * @param onActionClick - 可选的操作按钮点击回调函数
 *
 * @returns VxeTableGridOptions<WindPowerIncomeReportData>['columns']
 *   返回 VXE Table 表格的列配置数组，包含以下列组：
 *   - 时间列: 固定在左侧的时间显示列（月报显示日期，年报显示月份）
 *   - 尖: 包含电量(kW·h)、收益(元)两个子列
 *   - 峰: 包含电量(kW·h)、收益(元)两个子列
 *   - 平: 包含电量(kW·h)、收益(元)两个子列
 *   - 谷: 包含电量(kW·h)、收益(元)两个子列
 *   - 深谷: 包含电量(kW·h)、收益(元)两个子列
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
  onActionClick?: OnActionClickFn<WindPowerIncomeReportData>,
): VxeTableGridOptions<WindPowerIncomeReportData>['columns'] {
  return [
    // 时间列 - 根据报表类型显示不同标题
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title:
        reportType === 'monthly'
          ? $t('system.windPowerIncomeReport.date')
          : $t('system.windPowerIncomeReport.month'),
      width: 120,
    },
    // 第一大列：尖
    {
      align: 'center',
      title: $t('system.windPowerIncomeReport.sharp'),
      children: [
        // 尖电量(kW·h)
        {
          align: 'center',
          field: 'sharpElectricity',
          title: $t('system.windPowerIncomeReport.sharpElectricity'),
          minWidth: 120,
        },
        // 尖收益(元)
        {
          align: 'center',
          field: 'sharpIncome',
          title: $t('system.windPowerIncomeReport.sharpIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第二大列：峰
    {
      align: 'center',
      title: $t('system.windPowerIncomeReport.peak'),
      children: [
        // 峰电量(kW·h)
        {
          align: 'center',
          field: 'peakElectricity',
          title: $t('system.windPowerIncomeReport.peakElectricity'),
          minWidth: 120,
        },
        // 峰收益(元)
        {
          align: 'center',
          field: 'peakIncome',
          title: $t('system.windPowerIncomeReport.peakIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第三大列：平
    {
      align: 'center',
      title: $t('system.windPowerIncomeReport.flat'),
      children: [
        // 平电量(kW·h)
        {
          align: 'center',
          field: 'flatElectricity',
          title: $t('system.windPowerIncomeReport.flatElectricity'),
          minWidth: 120,
        },
        // 平收益(元)
        {
          align: 'center',
          field: 'flatIncome',
          title: $t('system.windPowerIncomeReport.flatIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第四大列：谷
    {
      align: 'center',
      title: $t('system.windPowerIncomeReport.valley'),
      children: [
        // 谷电量(kW·h)
        {
          align: 'center',
          field: 'valleyElectricity',
          title: $t('system.windPowerIncomeReport.valleyElectricity'),
          minWidth: 120,
        },
        // 谷收益(元)
        {
          align: 'center',
          field: 'valleyIncome',
          title: $t('system.windPowerIncomeReport.valleyIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第五大列：深谷
    {
      align: 'center',
      title: $t('system.windPowerIncomeReport.deepValley'),
      children: [
        // 深谷电量(kW·h)
        {
          align: 'center',
          field: 'deepValleyElectricity',
          title: $t('system.windPowerIncomeReport.deepValleyElectricity'),
          minWidth: 120,
        },
        // 深谷收益(元)
        {
          align: 'center',
          field: 'deepValleyIncome',
          title: $t('system.windPowerIncomeReport.deepValleyIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第六大列：总发电量
    {
      align: 'center',
      field: 'totalAmount',
      title: $t('system.windPowerIncomeReport.totalAmount'),
      minWidth: 140,
    },
    // 第七大列：总收益
    {
      align: 'center',
      field: 'totalIncome',
      title: $t('system.windPowerIncomeReport.totalIncome'),
      minWidth: 140,
    },
  ];
}
