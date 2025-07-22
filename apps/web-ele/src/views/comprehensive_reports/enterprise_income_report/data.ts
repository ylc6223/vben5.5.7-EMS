import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EnterpriseIncomeReportData } from '#/api/income/report';

import { $t } from '#/locales';
// 报表类型定义
export type ReportType = 'monthly' | 'yearly';

/**
 * 企业收益报表表格列配置函数
 *
 * 该函数用于生成企业收益报表表格的列配置，包括时间列、光伏、充电桩、储能、风电、合计等分组列。
 *
 * @param reportType - 报表类型，'monthly' 为月报，'yearly' 为年报
 * @param onActionClick - 可选的操作按钮点击回调函数
 *   - 类型: OnActionClickFn<EnterpriseIncomeReportData>
 *   - 说明: 当表格中的操作按钮被点击时触发的回调函数
 *   - 参数: { code: string, row: EnterpriseIncomeReportData }
 *     - code: 操作代码，如 'edit', 'delete', 'view' 等
 *     - row: 当前行的数据对象，包含完整的企业收益报表数据
 *   - 返回值: void
 *   - 示例: (params) => { console.log('操作:', params.code, '数据:', params.row) }
 *
 * @returns VxeTableGridOptions<EnterpriseIncomeReportData>['columns']
 *   返回 VXE Table 表格的列配置数组，包含以下列组：
 *   - 时间列: 固定在左侧的时间显示列（月报显示日期，年报显示月份）
 *   - 光伏: 包含消纳量(kW·h)、并网量(kW·h)、收益(元)三个子列
 *   - 充电桩: 包含电量(kW·h)、收益(元)两个子列
 *   - 储能: 包含充电量(kW·h)、放电量(kW·h)、收益(元)三个子列
 *   - 风电: 包含消纳量(kW·h)、并网量(kW·h)、收益(元)三个子列
 *   - 合计: 包含收益(元)一个子列（前端计算同一行所有收益的总和）
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
  onActionClick?: OnActionClickFn<EnterpriseIncomeReportData>,
): VxeTableGridOptions<EnterpriseIncomeReportData>['columns'] {
  return [
    // 时间列 - 根据报表类型显示不同标题
    {
      align: 'center',
      field: 'time',
      fixed: 'left',
      title:
        reportType === 'monthly'
          ? $t('system.incomeReport.date')
          : $t('system.incomeReport.month'),
      width: 120,
    },
    // 光伏分组 - 第二列，按图片结构调整
    {
      align: 'center',
      title: $t('system.incomeReport.solarIncome'),
      children: [
        // 消纳量(kW·h)
        {
          align: 'center',
          field: 'solarConsumptionAmount',
          title: $t('system.incomeReport.consumptionAmount'),
          minWidth: 120,
        },
        // 并网量(kW·h)
        {
          align: 'center',
          field: 'solarGridConnectionAmount',
          title: $t('system.incomeReport.gridConnectionAmount'),
          minWidth: 120,
        },
        // 收益(元)
        {
          align: 'center',
          field: 'solarIncome',
          title: $t('system.incomeReport.income'),
          minWidth: 100,
        },
      ],
    },
    // 充电桩分组 - 按图片结构调整
    {
      align: 'center',
      title: $t('system.incomeReport.chargingPile'),
      children: [
        // 电量(kW·h)
        {
          align: 'center',
          field: 'chargingPileAmount',
          title: $t('system.incomeReport.electricityAmount'),
          minWidth: 120,
        },
        // 收益(元)
        {
          align: 'center',
          field: 'chargingPileIncome',
          title: $t('system.incomeReport.chargingPileIncome'),
          minWidth: 100,
        },
      ],
    },
    // 储能分组 - 按图片结构调整
    {
      align: 'center',
      title: $t('system.incomeReport.storageIncome'),
      children: [
        // 充电量(kW·h)
        {
          align: 'center',
          field: 'storageChargeAmount',
          title: $t('system.incomeReport.chargeAmount'),
          minWidth: 120,
        },
        // 放电量(kW·h)
        {
          align: 'center',
          field: 'storageDischargeAmount',
          title: $t('system.incomeReport.dischargeAmount'),
          minWidth: 120,
        },
        // 收益(元)
        {
          align: 'center',
          field: 'storageIncomeTotal',
          title: $t('system.incomeReport.storageIncomeAmount'),
          minWidth: 100,
        },
      ],
    },
    // 风电分组 - 第五列，按图片结构调整
    {
      align: 'center',
      title: $t('system.incomeReport.windPower'),
      children: [
        // 消纳量(kW·h)
        {
          align: 'center',
          field: 'windConsumptionAmount',
          title: $t('system.incomeReport.windConsumptionAmount'),
          minWidth: 120,
        },
        // 并网量(kW·h)
        {
          align: 'center',
          field: 'windGridConnectionAmount',
          title: $t('system.incomeReport.windGridConnectionAmount'),
          minWidth: 120,
        },
        // 收益(元)
        {
          align: 'center',
          field: 'windIncome',
          title: $t('system.incomeReport.windIncomeAmount'),
          minWidth: 100,
        },
      ],
    },
    // 合计分组 - 第六列，按图片结构调整，数据通过计算得出
    {
      align: 'center',
      title: $t('system.incomeReport.totalIncome'),
      children: [
        // 收益(元) - 计算同一行前面所有收益列的总和
        {
          align: 'center',
          field: 'calculatedTotalIncome',
          title: $t('system.incomeReport.totalIncomeAmount'),
          minWidth: 120, // 使用minWidth替代固定width，允许自适应
          // 使用formatter来格式化显示合计值
          formatter: ({ row }: { row: any }) => {
            const solarIncome = Number(row.solarIncome) || 0;
            const chargingPileIncome = Number(row.chargingPileIncome) || 0;
            const storageIncomeTotal = Number(row.storageIncomeTotal) || 0;
            const windIncome = Number(row.windIncome) || 0;

            const total = solarIncome + chargingPileIncome + storageIncomeTotal + windIncome;

            // 调试信息（开发环境下可以取消注释查看）
            // console.log('合计计算:', {
            //   time: row.time,
            //   solarIncome,
            //   chargingPileIncome,
            //   storageIncomeTotal,
            //   windIncome,
            //   total: total.toFixed(2)
            // });

            return total.toFixed(2);
          },
        },
      ],
    },
  ];
}
