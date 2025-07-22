import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EnergyStorageIncomeReportData } from '#/api/income/report';

import { $t } from '#/locales';
// 报表类型定义
export type ReportType = 'monthly' | 'yearly';

/**
 * 储能收益报表表格列配置函数
 *
 * 该函数用于生成储能收益报表表格的列配置，包括时间列和充电电量分组列。
 *
 * @param reportType - 报表类型，'monthly' 为月报，'yearly' 为年报
 * @param onActionClick - 可选的操作按钮点击回调函数
 *   - 类型: OnActionClickFn<EnergyStorageIncomeReportData>
 *   - 说明: 当表格中的操作按钮被点击时触发的回调函数
 *   - 参数: { code: string, row: EnergyStorageIncomeReportData }
 *     - code: 操作代码，如 'edit', 'delete', 'view' 等
 *     - row: 当前行的数据对象，包含完整的储能收益报表数据
 *   - 返回值: void
 *   - 示例: (params) => { console.log('操作:', params.code, '数据:', params.row) }
 *
 * @returns VxeTableGridOptions<EnergyStorageIncomeReportData>['columns']
 *   返回 VXE Table 表格的列配置数组，包含以下列组：
 *   - 时间列: 固定在左侧的时间显示列（月报显示日期，年报显示月份）
 *   - 充电电量: 包含尖、峰、平、谷、深谷五个子列(kW·h)
 *   - 放电电量: 包含尖、峰、平、谷、深谷五个子列(kW·h)
 *   - 充电成本: 包含尖、峰、平、谷、深谷五个子列(元)
 *   - 放电收益: 包含尖、峰、平、谷、深谷五个子列(元)
 *   - 总净收益: 单列显示净收益总和(元)
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
  onActionClick?: OnActionClickFn<EnergyStorageIncomeReportData>,
): VxeTableGridOptions<EnergyStorageIncomeReportData>['columns'] {
  return [
    // 时间列 - 根据报表类型显示不同标题
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title:
        reportType === 'monthly'
          ? $t('system.energyStorageIncomeReport.date')
          : $t('system.energyStorageIncomeReport.month'),
      width: 120,
    },
    // 充电电量分组 - 第二列，按图片结构调整
    {
      align: 'center',
      title: $t('system.energyStorageIncomeReport.chargingElectricity'),
      children: [
        // 尖(kW·h)
        {
          align: 'center',
          field: 'chargingElectricitySharp',
          title: $t('system.energyStorageIncomeReport.sharp'),
          minWidth: 100,
        },
        // 峰(kW·h)
        {
          align: 'center',
          field: 'chargingElectricityPeak',
          title: $t('system.energyStorageIncomeReport.peak'),
          minWidth: 100,
        },
        // 平(kW·h)
        {
          align: 'center',
          field: 'chargingElectricityFlat',
          title: $t('system.energyStorageIncomeReport.flat'),
          minWidth: 100,
        },
        // 谷(kW·h)
        {
          align: 'center',
          field: 'chargingElectricityValley',
          title: $t('system.energyStorageIncomeReport.valley'),
          minWidth: 100,
        },
        // 深谷(kW·h)
        {
          align: 'center',
          field: 'chargingElectricityDeepValley',
          title: $t('system.energyStorageIncomeReport.deepValley'),
          minWidth: 100,
        },
      ],
    },
    // 放电电量分组 - 第三列，与充电电量结构一致
    {
      align: 'center',
      title: $t('system.energyStorageIncomeReport.dischargingElectricity'),
      children: [
        // 尖(kW·h)
        {
          align: 'center',
          field: 'dischargingElectricitySharp',
          title: $t('system.energyStorageIncomeReport.sharp'),
          minWidth: 100,
        },
        // 峰(kW·h)
        {
          align: 'center',
          field: 'dischargingElectricityPeak',
          title: $t('system.energyStorageIncomeReport.peak'),
          minWidth: 100,
        },
        // 平(kW·h)
        {
          align: 'center',
          field: 'dischargingElectricityFlat',
          title: $t('system.energyStorageIncomeReport.flat'),
          minWidth: 100,
        },
        // 谷(kW·h)
        {
          align: 'center',
          field: 'dischargingElectricityValley',
          title: $t('system.energyStorageIncomeReport.valley'),
          minWidth: 100,
        },
        // 深谷(kW·h)
        {
          align: 'center',
          field: 'dischargingElectricityDeepValley',
          title: $t('system.energyStorageIncomeReport.deepValley'),
          minWidth: 100,
        },
      ],
    },
    // 充电成本分组 - 第四列
    {
      align: 'center',
      title: $t('system.energyStorageIncomeReport.chargingCost'),
      children: [
        // 尖(元)
        {
          align: 'center',
          field: 'chargingCostSharp',
          title: $t('system.energyStorageIncomeReport.sharp'),
          minWidth: 100,
        },
        // 峰(元)
        {
          align: 'center',
          field: 'chargingCostPeak',
          title: $t('system.energyStorageIncomeReport.peak'),
          minWidth: 100,
        },
        // 平(元)
        {
          align: 'center',
          field: 'chargingCostFlat',
          title: $t('system.energyStorageIncomeReport.flat'),
          minWidth: 100,
        },
        // 谷(元)
        {
          align: 'center',
          field: 'chargingCostValley',
          title: $t('system.energyStorageIncomeReport.valley'),
          minWidth: 100,
        },
        // 深谷(元)
        {
          align: 'center',
          field: 'chargingCostDeepValley',
          title: $t('system.energyStorageIncomeReport.deepValley'),
          minWidth: 100,
        },
      ],
    },
    // 放电收益分组 - 第五列
    {
      align: 'center',
      title: $t('system.energyStorageIncomeReport.dischargingIncome'),
      children: [
        // 尖(元)
        {
          align: 'center',
          field: 'dischargingIncomeSharp',
          title: $t('system.energyStorageIncomeReport.sharp'),
          minWidth: 100,
        },
        // 峰(元)
        {
          align: 'center',
          field: 'dischargingIncomePeak',
          title: $t('system.energyStorageIncomeReport.peak'),
          minWidth: 100,
        },
        // 平(元)
        {
          align: 'center',
          field: 'dischargingIncomeFlat',
          title: $t('system.energyStorageIncomeReport.flat'),
          minWidth: 100,
        },
        // 谷(元)
        {
          align: 'center',
          field: 'dischargingIncomeValley',
          title: $t('system.energyStorageIncomeReport.valley'),
          minWidth: 100,
        },
        // 深谷(元)
        {
          align: 'center',
          field: 'dischargingIncomeDeepValley',
          title: $t('system.energyStorageIncomeReport.deepValley'),
          minWidth: 100,
        },
      ],
    },
    // 总净收益列 - 第六列，单列显示
    {
      align: 'center',
      field: 'totalNetIncome',
      title: $t('system.energyStorageIncomeReport.totalNetIncome'),
      minWidth: 120,
      // 使用formatter来格式化显示净收益值
      formatter: ({ row }: { row: any }) => {
        const totalNetIncome = Number(row.totalNetIncome) || 0;
        return totalNetIncome.toFixed(2);
      },
    },
  ];
}
