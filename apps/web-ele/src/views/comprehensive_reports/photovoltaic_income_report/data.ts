import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { PhotovoltaicIncomeReportData } from '#/api/income/report';

import { $t } from '#/locales';
// 报表类型定义
export type ReportType = 'monthly' | 'yearly';

/**
 * 光伏收益报表表格列配置函数
 *
 * 该函数用于生成光伏收益报表表格的列配置，包括时间列、消纳、储能、平衡电量、合作电量、深度合作电量、总收益等分组列。
 *
 * @param reportType - 报表类型，'monthly' 为月报，'yearly' 为年报
 * @param onActionClick - 可选的操作按钮点击回调函数
 *
 * @returns VxeTableGridOptions<PhotovoltaicIncomeReportData>['columns']
 *   返回 VXE Table 表格的列配置数组，包含以下列组：
 *   - 时间列: 固定在左侧的时间显示列（月报显示日期，年报显示月份）
 *   - 消纳: 包含消纳量、消纳收益两个子列
 *   - 储能: 包含储能量、储能收益两个子列
 *   - 平衡电量: 包含平衡电量、平衡收益两个子列
 *   - 合作电量: 包含合作电量、合作收益两个子列
 *   - 深度合作电量: 包含深度合作电量、深度合作收益两个子列
 *   - 总收益: 包含总收益一个子列（前端计算同一行所有收益的总和）
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
  onActionClick?: OnActionClickFn<PhotovoltaicIncomeReportData>,
): VxeTableGridOptions<PhotovoltaicIncomeReportData>['columns'] {
  return [
    // 时间列 - 根据报表类型显示不同标题
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title:
        reportType === 'monthly'
          ? $t('system.photovoltaicIncomeReport.date')
          : $t('system.photovoltaicIncomeReport.month'),
      width: 120,
    },
    // 第一大列：消纳
    {
      align: 'center',
      title: $t('system.photovoltaicIncomeReport.consumption'),
      children: [
        // 尖电量(kW·h)
        {
          align: 'center',
          field: 'sharpAmount',
          title: $t('system.photovoltaicIncomeReport.sharpAmount'),
          minWidth: 120,
        },
        // 尖收益(元)
        {
          align: 'center',
          field: 'sharpIncome',
          title: $t('system.photovoltaicIncomeReport.sharpIncome'),
          minWidth: 120,
        },
        // 峰电量(kW·h)
        {
          align: 'center',
          field: 'peakAmount',
          title: $t('system.photovoltaicIncomeReport.peakAmount'),
          minWidth: 120,
        },
        // 峰收益(元)
        {
          align: 'center',
          field: 'peakIncome',
          title: $t('system.photovoltaicIncomeReport.peakIncome'),
          minWidth: 120,
        },
        // 平电量(kW·h)
        {
          align: 'center',
          field: 'flatAmount',
          title: $t('system.photovoltaicIncomeReport.flatAmount'),
          minWidth: 120,
        },
        // 平收益(元)
        {
          align: 'center',
          field: 'flatIncome',
          title: $t('system.photovoltaicIncomeReport.flatIncome'),
          minWidth: 120,
        },
        // 谷电量(kW·h)
        {
          align: 'center',
          field: 'valleyAmount',
          title: $t('system.photovoltaicIncomeReport.valleyAmount'),
          minWidth: 120,
        },
        // 谷收益(元)
        {
          align: 'center',
          field: 'valleyIncome',
          title: $t('system.photovoltaicIncomeReport.valleyIncome'),
          minWidth: 120,
        },
        // 深谷电量(kW·h)
        {
          align: 'center',
          field: 'deepValleyAmount',
          title: $t('system.photovoltaicIncomeReport.deepValleyAmount'),
          minWidth: 120,
        },
        // 深谷收益(元)
        {
          align: 'center',
          field: 'deepValleyIncome',
          title: $t('system.photovoltaicIncomeReport.deepValleyIncome'),
          minWidth: 120,
        },
        // 消纳总收益(元)
        {
          align: 'center',
          field: 'consumptionTotalIncome',
          title: $t('system.photovoltaicIncomeReport.consumptionTotalIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第二大列：上网
    {
      align: 'center',
      title: $t('system.photovoltaicIncomeReport.grid'),
      children: [
        // 上网电量(kWh)
        {
          align: 'center',
          field: 'gridAmount',
          title: $t('system.photovoltaicIncomeReport.gridAmount'),
          minWidth: 120,
        },
        // 上网收益(元)
        {
          align: 'center',
          field: 'gridIncome',
          title: $t('system.photovoltaicIncomeReport.gridIncome'),
          minWidth: 120,
        },
      ],
    },
    // 第三大列：总
    {
      align: 'center',
      title: $t('system.photovoltaicIncomeReport.total'),
      children: [
        // 总电量(kWh)
        {
          align: 'center',
          field: 'totalAmount',
          title: $t('system.photovoltaicIncomeReport.totalAmount'),
          minWidth: 120,
        },
        // 总收益(元)
        {
          align: 'center',
          field: 'totalIncome',
          title: $t('system.photovoltaicIncomeReport.totalIncome'),
          minWidth: 120,
        },
      ],
    },
  ];
}
