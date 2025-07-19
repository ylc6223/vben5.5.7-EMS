<script lang="ts" setup>
import type { EnterpriseEnergyReportData } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { ElButton } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { useColumns } from './data';

// 模拟数据获取函数
async function getEnergyReportData(): Promise<{
  items: EnterpriseEnergyReportData[];
}> {
  // 这里应该调用实际的API，现在使用模拟数据
  const mockData: EnterpriseEnergyReportData[] = [
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
      gridSharp: 95.1,
      gridPeak: 78.5,
      gridFlat: 59.6,
      gridValley: 35.6,
      gridDeepValley: 25.2,
      gridTotal: 294,
      solarConsumptionSharp: 0,
      solarConsumptionPeak: 0,
      solarConsumptionFlat: 0,
      solarConsumptionValley: 0,
      solarConsumptionDeepValley: 0,
      solarConsumptionTotal: 0,
      gridConnection: 0,
      grandTotal: 0,
    },
    {
      time: '2025-07-03',
      loadSharp: 115.2,
      loadPeak: 92.1,
      loadFlat: 78.9,
      loadValley: 62.3,
      loadDeepValley: 42.8,
      loadTotal: 391.3,
      windSharp: 12.8,
      windPeak: 16.3,
      windFlat: 19.8,
      windValley: 25.2,
      windDeepValley: 29.6,
      windTotal: 103.7,
      storageChargeSharp: 0,
      storageChargePeak: 0,
      storageChargeFlat: 4.8,
      storageChargeValley: 11.2,
      storageChargeDeepValley: 16.8,
      storageChargeTotal: 32.8,
      storageDischargeSharp: 7.5,
      storageDischargePeak: 5.8,
      storageDischargeFlat: 2.8,
      storageDischargeValley: 0,
      storageDischargeDeepValley: 0,
      storageDischargeTotal: 16.1,
      chargingPileSharp: 4.8,
      chargingPilePeak: 4.2,
      chargingPileFlat: 3.1,
      chargingPileValley: 1.9,
      chargingPileDeepValley: 1.5,
      chargingPileTotal: 15.5,
      gridSharp: 87.6,
      gridPeak: 71.6,
      gridFlat: 55.8,
      gridValley: 34.2,
      gridDeepValley: 24.1,
      gridTotal: 273.3,
      solarConsumptionSharp: 0,
      solarConsumptionPeak: 0,
      solarConsumptionFlat: 0,
      solarConsumptionValley: 0,
      solarConsumptionDeepValley: 0,
      solarConsumptionTotal: 0,
      gridConnection: 0,
      grandTotal: 0,
    },
    {
      time: '2025-07-04',
      loadSharp: 185.6,
      loadPeak: 156.8,
      loadFlat: 142.3,
      loadValley: 98.5,
      loadDeepValley: 75.2,
      loadTotal: 658.4,
      windSharp: 35.6,
      windPeak: 42.3,
      windFlat: 38.9,
      windValley: 28.5,
      windDeepValley: 22.1,
      windTotal: 167.4,
      storageChargeSharp: 0,
      storageChargePeak: 0,
      storageChargeFlat: 8.5,
      storageChargeValley: 15.2,
      storageChargeDeepValley: 12.8,
      storageChargeTotal: 36.5,
      storageDischargeSharp: 18.5,
      storageDischargePeak: 15.2,
      storageDischargeFlat: 8.9,
      storageDischargeValley: 2.1,
      storageDischargeDeepValley: 0,
      storageDischargeTotal: 44.7,
      chargingPileSharp: 12.5,
      chargingPilePeak: 15.8,
      chargingPileFlat: 18.2,
      chargingPileValley: 8.5,
      chargingPileDeepValley: 3.2,
      chargingPileTotal: 58.2,
      gridSharp: 147.5,
      gridPeak: 98.7,
      gridFlat: 85.2,
      gridValley: 61.5,
      gridDeepValley: 49.8,
      gridTotal: 442.7,
      solarConsumptionSharp: 25.8,
      solarConsumptionPeak: 32.1,
      solarConsumptionFlat: 28.9,
      solarConsumptionValley: 15.6,
      solarConsumptionDeepValley: 8.2,
      solarConsumptionTotal: 110.6,
      gridConnection: 45.2,
      grandTotal: 155.8,
    },
    {
      time: '2025-07-05',
      loadSharp: 220.8,
      loadPeak: 198.5,
      loadFlat: 175.6,
      loadValley: 125.3,
      loadDeepValley: 95.8,
      loadTotal: 816,
      windSharp: 45.8,
      windPeak: 52.6,
      windFlat: 48.3,
      windValley: 35.2,
      windDeepValley: 28.9,
      windTotal: 210.8,
      storageChargeSharp: 0,
      storageChargePeak: 2.5,
      storageChargeFlat: 12.8,
      storageChargeValley: 18.5,
      storageChargeDeepValley: 8.2,
      storageChargeTotal: 42,
      storageDischargeSharp: 25.8,
      storageDischargePeak: 22.5,
      storageDischargeFlat: 15.2,
      storageDischargeValley: 5.8,
      storageDischargeDeepValley: 2.1,
      storageDischargeTotal: 71.4,
      chargingPileSharp: 18.5,
      chargingPilePeak: 22.8,
      chargingPileFlat: 25.6,
      chargingPileValley: 15.2,
      chargingPileDeepValley: 8.5,
      chargingPileTotal: 90.6,
      gridSharp: 176.5,
      gridPeak: 123.2,
      gridFlat: 98.7,
      gridValley: 74.8,
      gridDeepValley: 58.2,
      gridTotal: 531.4,
      solarConsumptionSharp: 85.6,
      solarConsumptionPeak: 92.3,
      solarConsumptionFlat: 78.9,
      solarConsumptionValley: 65.2,
      solarConsumptionDeepValley: 45.8,
      solarConsumptionTotal: 367.8,
      gridConnection: 125.6,
      grandTotal: 493.4,
    },
    {
      time: '2025-07-06',
      loadSharp: 135.8,
      loadPeak: 112.6,
      loadFlat: 95.4,
      loadValley: 72.3,
      loadDeepValley: 52.1,
      loadTotal: 468.2,
      windSharp: 18.5,
      windPeak: 22.8,
      windFlat: 26.3,
      windValley: 31.2,
      windDeepValley: 35.6,
      windTotal: 134.4,
      storageChargeSharp: 0,
      storageChargePeak: 1.2,
      storageChargeFlat: 6.8,
      storageChargeValley: 14.5,
      storageChargeDeepValley: 20.2,
      storageChargeTotal: 42.7,
      storageDischargeSharp: 12.5,
      storageDischargePeak: 9.8,
      storageDischargeFlat: 5.2,
      storageDischargeValley: 1.5,
      storageDischargeDeepValley: 0,
      storageDischargeTotal: 29,
      chargingPileSharp: 8.2,
      chargingPilePeak: 7.5,
      chargingPileFlat: 5.8,
      chargingPileValley: 3.2,
      chargingPileDeepValley: 2.1,
      chargingPileTotal: 26.8,
      gridSharp: 108.6,
      gridPeak: 89.3,
      gridFlat: 68.7,
      gridValley: 42.8,
      gridDeepValley: 31.5,
      gridTotal: 340.9,
      solarConsumptionSharp: 12.5,
      solarConsumptionPeak: 18.6,
      solarConsumptionFlat: 22.3,
      solarConsumptionValley: 15.8,
      solarConsumptionDeepValley: 8.9,
      solarConsumptionTotal: 78.1,
      gridConnection: 28.5,
      grandTotal: 106.6,
    },
    {
      time: '2025-07-07',
      loadSharp: 198.5,
      loadPeak: 165.8,
      loadFlat: 148.2,
      loadValley: 105.6,
      loadDeepValley: 82.3,
      loadTotal: 700.4,
      windSharp: 42.1,
      windPeak: 48.5,
      windFlat: 44.8,
      windValley: 32.6,
      windDeepValley: 26.8,
      windTotal: 194.8,
      storageChargeSharp: 0,
      storageChargePeak: 3.2,
      storageChargeFlat: 9.8,
      storageChargeValley: 16.5,
      storageChargeDeepValley: 12.8,
      storageChargeTotal: 42.3,
      storageDischargeSharp: 22.5,
      storageDischargePeak: 18.6,
      storageDischargeFlat: 12.3,
      storageDischargeValley: 4.2,
      storageDischargeDeepValley: 1.5,
      storageDischargeTotal: 59.1,
      chargingPileSharp: 15.8,
      chargingPilePeak: 19.2,
      chargingPileFlat: 22.5,
      chargingPileValley: 12.8,
      chargingPileDeepValley: 6.5,
      chargingPileTotal: 76.8,
      gridSharp: 158.2,
      gridPeak: 108.5,
      gridFlat: 92.6,
      gridValley: 68.5,
      gridDeepValley: 54.2,
      gridTotal: 482,
      solarConsumptionSharp: 68.5,
      solarConsumptionPeak: 78.9,
      solarConsumptionFlat: 65.2,
      solarConsumptionValley: 52.8,
      solarConsumptionDeepValley: 35.6,
      solarConsumptionTotal: 301,
      gridConnection: 98.5,
      grandTotal: 399.5,
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
      gridValley: 48.5,
      gridDeepValley: 36.2,
      gridTotal: 374.2,
      solarConsumptionSharp: 18.5,
      solarConsumptionPeak: 25.8,
      solarConsumptionFlat: 32.1,
      solarConsumptionValley: 22.5,
      solarConsumptionDeepValley: 12.8,
      solarConsumptionTotal: 111.7,
      gridConnection: 38.5,
      grandTotal: 150.2,
    },
    {
      time: '2025-07-09',
      loadSharp: 165.8,
      loadPeak: 138.2,
      loadFlat: 125.6,
      loadValley: 89.5,
      loadDeepValley: 68.2,
      loadTotal: 587.3,
      windSharp: 28.5,
      windPeak: 35.2,
      windFlat: 38.9,
      windValley: 42.6,
      windDeepValley: 46.8,
      windTotal: 192,
      storageChargeSharp: 0,
      storageChargePeak: 1.8,
      storageChargeFlat: 8.2,
      storageChargeValley: 17.5,
      storageChargeDeepValley: 25.8,
      storageChargeTotal: 53.3,
      storageDischargeSharp: 18.5,
      storageDischargePeak: 15.2,
      storageDischargeFlat: 10.8,
      storageDischargeValley: 3.5,
      storageDischargeDeepValley: 1.2,
      storageDischargeTotal: 49.2,
      chargingPileSharp: 12.5,
      chargingPilePeak: 10.8,
      chargingPileFlat: 8.5,
      chargingPileValley: 5.2,
      chargingPileDeepValley: 3.5,
      chargingPileTotal: 40.5,
      gridSharp: 135.8,
      gridPeak: 112.5,
      gridFlat: 89.6,
      gridValley: 58.2,
      gridDeepValley: 42.8,
      gridTotal: 438.9,
      solarConsumptionSharp: 32.5,
      solarConsumptionPeak: 42.8,
      solarConsumptionFlat: 48.5,
      solarConsumptionValley: 35.2,
      solarConsumptionDeepValley: 18.5,
      solarConsumptionTotal: 177.5,
      gridConnection: 58.2,
      grandTotal: 235.7,
    },
    {
      time: '2025-07-10',
      loadSharp: 189.5,
      loadPeak: 158.6,
      loadFlat: 142.8,
      loadValley: 98.5,
      loadDeepValley: 75.8,
      loadTotal: 665.2,
      windSharp: 35.8,
      windPeak: 42.5,
      windFlat: 39.6,
      windValley: 28.9,
      windDeepValley: 23.5,
      windTotal: 170.3,
      storageChargeSharp: 0,
      storageChargePeak: 2.8,
      storageChargeFlat: 9.5,
      storageChargeValley: 16.8,
      storageChargeDeepValley: 15.2,
      storageChargeTotal: 44.3,
      storageDischargeSharp: 21.5,
      storageDischargePeak: 18.2,
      storageDischargeFlat: 12.8,
      storageDischargeValley: 4.5,
      storageDischargeDeepValley: 1.8,
      storageDischargeTotal: 58.8,
      chargingPileSharp: 16.8,
      chargingPilePeak: 20.5,
      chargingPileFlat: 23.8,
      chargingPileValley: 14.2,
      chargingPileDeepValley: 7.5,
      chargingPileTotal: 82.8,
      gridSharp: 152.5,
      gridPeak: 118.8,
      gridFlat: 95.2,
      gridValley: 68.5,
      gridDeepValley: 52.8,
      gridTotal: 487.8,
      solarConsumptionSharp: 58.5,
      solarConsumptionPeak: 68.2,
      solarConsumptionFlat: 62.8,
      solarConsumptionValley: 48.5,
      solarConsumptionDeepValley: 32.8,
      solarConsumptionTotal: 270.8,
      gridConnection: 85.2,
      grandTotal: 356,
    },
  ];

  return { items: mockData };
}

// 计算表尾合计数据
function calculateFooterData(data: EnterpriseEnergyReportData[]): EnterpriseEnergyReportData {
  const footerData: any = {
    time: '合计',
  };

  if (data.length === 0) {
    return footerData;
  }

  // 获取第一行数据的所有字段
  const firstRow = data[0];

  Object.keys(firstRow).forEach(key => {
    if (key !== 'time') {
      // 计算每列的总和
      const total = data.reduce((sum, row) => {
        const value = Number(row[key as keyof EnterpriseEnergyReportData]) || 0;
        return sum + value;
      }, 0);
      footerData[key] = Number(total.toFixed(1));
    }
  });

  return footerData;
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    showFooter: true, // 开启表尾显示
    footerData: [{
      time: '合计',
      // 初始化所有数值字段为0
      loadSharp: 0, loadPeak: 0, loadFlat: 0, loadValley: 0, loadDeepValley: 0, loadTotal: 0,
      windSharp: 0, windPeak: 0, windFlat: 0, windValley: 0, windDeepValley: 0, windTotal: 0,
      storageChargeSharp: 0, storageChargePeak: 0, storageChargeFlat: 0, storageChargeValley: 0, storageChargeDeepValley: 0, storageChargeTotal: 0,
      storageDischargeSharp: 0, storageDischargePeak: 0, storageDischargeFlat: 0, storageDischargeValley: 0, storageDischargeDeepValley: 0, storageDischargeTotal: 0,
      chargingPileSharp: 0, chargingPilePeak: 0, chargingPileFlat: 0, chargingPileValley: 0, chargingPileDeepValley: 0, chargingPileTotal: 0,
      gridSharp: 0, gridPeak: 0, gridFlat: 0, gridValley: 0, gridDeepValley: 0, gridTotal: 0,
      solarConsumptionSharp: 0, solarConsumptionPeak: 0, solarConsumptionFlat: 0, solarConsumptionValley: 0, solarConsumptionDeepValley: 0, solarConsumptionTotal: 0,
      gridConnection: 0, grandTotal: 0,
    }],
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      ajax: {
        query: async (_params) => {
          const result = await getEnergyReportData();
          // 计算表尾合计数据并更新
          if (result.items && result.items.length > 0) {
            const calculatedFooter = calculateFooterData(result.items);
            // 更新表尾数据
            gridApi.setGridOptions({
              footerData: [calculatedFooter]
            });
          }
          return result;
        },
      },
    },
    rowConfig: {
      keyField: 'time',
    },
    toolbarConfig: {
      custom: true,
      export: true,
      refresh: { code: 'query' },
      zoom: true,
    },
  } as VxeTableGridOptions<EnterpriseEnergyReportData>,
});

function onRefresh() {
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <Grid
      :table-title="$t('system.energyReport.title')"
      :table-title-help="$t('system.energyReport.description')"
    >
      <template #toolbar-tools>
        <ElButton type="primary" @click="onRefresh">
          <IconifyIcon icon="carbon:refresh" class="mr-1 size-4" />
          {{ $t('system.energyReport.refreshData') }}
        </ElButton>
      </template>
    </Grid>
  </Page>
</template>

<style lang="scss" scoped>
:deep(.vxe-table) {
  // 边框合并设置
  border-collapse: collapse;

  // 表头背景色设置 - 参考 group-[.is-active]:bg-primary/15 dark:group-[.is-active]:bg-accent
  .vxe-header--column {
    background-color: hsl(var(--primary) / 0.15) !important;
  }

  // 深色模式下的表头背景色
  .dark .vxe-header--column {
    background-color: hsl(var(--accent) / 1) !important;
  }

  // 覆盖VXE Table的默认表头字体颜色，让其遵循设计系统
  .vxe-table--header-wrapper {
    color: inherit !important;
  }

  .vxe-header--column {
    color: inherit !important;
  }

  // 表头边框使用白色
  .vxe-header--column {
    border-right: 1px solid white;
    border-bottom: 1px solid white;
  }

  // 数据行边框使用设计系统颜色
  .vxe-body--column {
    border-right: 1px solid hsl(var(--border));
    border-bottom: 1px solid hsl(var(--border));
  }

  // 只对真正的最后一列（表格最右侧）移除右边框
  .vxe-table .vxe-header--column:last-child,
  .vxe-table .vxe-body--column:last-child {
    border-right: none;
  }

  // 确保所有表头列都有白色右边框，除非是表格的最后一列
  .vxe-header--column {
    border-right: 1px solid white !important;
  }

  // 只对表格最右侧的列移除右边框
  .vxe-table
    > .vxe-table--main-wrapper
    > .vxe-table--header-wrapper
    .vxe-header--column:last-child,
  .vxe-table
    > .vxe-table--main-wrapper
    > .vxe-table--body-wrapper
    .vxe-body--column:last-child {
    border-right: none !important;
  }

  .vxe-body--row:last-child .vxe-body--column {
    border-bottom: none;
  }

  // 隐藏列宽调整的伪元素分隔线，确保边框纯色
  .vxe-cell--col-resizable:before {
    display: none !important;
  }

  .vxe-table--render-default.border--default .vxe-cell--col-resizable:before,
  .vxe-table--render-default.border--none .vxe-cell--col-resizable:before,
  .vxe-table--render-default.border--outer .vxe-cell--col-resizable:before,
  .vxe-table--render-default.border--inner .vxe-cell--col-resizable:before {
    display: none !important;
  }
}
</style>
