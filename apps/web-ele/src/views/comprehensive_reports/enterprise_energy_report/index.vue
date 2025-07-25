<script lang="ts" setup>
import type { VbenFormProps } from '@vben-core/form-ui';

import type { ReportType } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EnterpriseEnergyReportData } from '#/api/energy/report';

import { ref, watch } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import dayjs from 'dayjs';
import { ElTabPane, ElTabs } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { searchEnterprisesApi } from '#/api/energy/enterprise';
import { getEnterpriseEnergyReportApi } from '#/api/energy/report';

import { useColumns } from './data';

// 当前激活的标签页
const activeTab = ref('monthly');

// API数据获取函数
async function getEnergyReportData(params?: {
  endTime?: string;
  enterprise?: string;
  reportType?: ReportType;
  startTime?: string;
}): Promise<{
  items: EnterpriseEnergyReportData[];
}> {
  try {
    const response = await getEnterpriseEnergyReportApi(params);
    return {
      items: response.items,
    };
  } catch (error) {
    console.error('获取企业能源报表数据失败:', error);
    // 如果API调用失败，返回空数据
    return {
      items: [],
    };
  }
}

// 计算表尾合计数据
function calculateFooterData(
  data: EnterpriseEnergyReportData[],
): EnterpriseEnergyReportData {
  const footerData: any = {
    time: $t('system.energyReport.footer.total'),
  };

  if (data.length === 0) {
    return footerData;
  }

  // 获取第一行数据的所有字段
  const firstRow = data[0];

  Object.keys(firstRow).forEach((key) => {
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

// 创建动态表单配置函数
function createFormOptions(reportType: ReportType): VbenFormProps {
  const isMonthly = reportType === 'monthly';

  return {
    // 默认展开搜索表单
    collapsed: false,
    // 所有表单项共用配置
    commonConfig: {
      // 所有表单项统一样式
      componentProps: {
        class: 'w-full',
      },
    },
    // 字段映射时间 - 根据报表类型调整格式
    fieldMappingTime: [
      ['time', ['startTime', 'endTime'], isMonthly ? 'YYYY-MM-DD' : 'YYYY-MM'],
    ],
    schema: [
      {
        component: 'SearchSelector',
        fieldName: 'enterprise',
        label: $t('system.energyReport.form.enterpriseSelect'),
        componentProps: {
          class: 'w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-sm',
          placeholder: $t('system.energyReport.form.enterprisePlaceholder'),
          searchPlaceholder: $t(
            'system.energyReport.form.enterpriseSearchPlaceholder',
          ),
          buttonType: 'default',
          buttonSize: 'default',
          placement: 'bottom-start',
          popoverWidth: 300,
          filterable: true,
          remote: false, // 设置为 false，这样组件会在挂载时自动加载数据
          // 使用异步数据源获取企业列表
          dataSource: async (keyword?: string) => {
            try {
              console.log(
                'SearchSelector dataSource called with keyword:',
                keyword,
              );
              // 调用企业搜索API，当 keyword 为空或 undefined 时，获取所有企业列表
              const result = await searchEnterprisesApi(keyword || undefined);
              console.log('Enterprise list loaded:', result.length, 'items');
              return result;
            } catch (error) {
              console.error('获取企业列表失败:', error);
              // 如果API调用失败，返回模拟数据作为降级方案
              const mockData = [
                // { label: '北京新能源科技有限公司', value: 'enterprise_001' },
                // { label: '上海绿色电力集团', value: 'enterprise_002' },
                // { label: '深圳智慧能源股份公司', value: 'enterprise_003' },
                // { label: '广州清洁能源发展公司', value: 'enterprise_004' },
                // { label: '杭州可再生能源企业', value: 'enterprise_005' },
              ];

              // 如果有搜索关键词，进行过滤
              if (keyword && keyword.trim()) {
                return mockData.filter((item) =>
                  item.label.toLowerCase().includes(keyword.toLowerCase()),
                );
              }

              console.log(
                'Using fallback enterprise data:',
                mockData.length,
                'items',
              );
              return mockData;
            }
          },
          // 监听企业选择变化
          onChange: (value: number | string, option: any) => {
            console.log('Enterprise selected:', value, option);
          },
        },
      },
      {
        component: 'RangePicker',
        // 根据报表类型设置默认值
        defaultValue: isMonthly
          ? [dayjs().subtract(7, 'days'), dayjs()]
          : [
              dayjs().subtract(11, 'months').startOf('month'),
              dayjs().endOf('month'),
            ],
        fieldName: 'time',
        label: isMonthly
          ? $t('system.energyReport.form.dateRange')
          : $t('system.energyReport.form.monthRange'),
        componentProps: {
          class: 'w-full',
          startPlaceholder: isMonthly
            ? $t('system.energyReport.form.startDate')
            : $t('system.energyReport.form.startMonth'),
          endPlaceholder: isMonthly
            ? $t('system.energyReport.form.endDate')
            : $t('system.energyReport.form.endMonth'),
          rangeSeparator: $t('system.energyReport.form.separator'),
          format: isMonthly ? 'YYYY-MM-DD' : 'YYYY-MM',
          valueFormat: isMonthly ? 'YYYY-MM-DD' : 'YYYY-MM',
          clearable: true,
          size: 'default',
          // 年报使用月份选择器
          type: isMonthly ? 'daterange' : 'monthrange',
        },
      },
    ],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: true,
    // 按下回车时是否提交表单
    submitOnEnter: false,
    // 表单布局
    layout: 'horizontal',
  };
}

// 创建基础表格配置
const createGridOptions = (reportType: ReportType) =>
  ({
    columns: useColumns(reportType),
    height: 'auto',
    keepSource: true,
    showFooter: true, // 开启表尾显示
    footerData: [
      {
        time: $t('system.energyReport.footer.total'),
        // 初始化所有数值字段为0
        loadSharp: 0,
        loadPeak: 0,
        loadFlat: 0,
        loadValley: 0,
        loadDeepValley: 0,
        loadTotal: 0,
        windSharp: 0,
        windPeak: 0,
        windFlat: 0,
        windValley: 0,
        windDeepValley: 0,
        windTotal: 0,
        storageChargeSharp: 0,
        storageChargePeak: 0,
        storageChargeFlat: 0,
        storageChargeValley: 0,
        storageChargeDeepValley: 0,
        storageChargeTotal: 0,
        storageDischargeSharp: 0,
        storageDischargePeak: 0,
        storageDischargeFlat: 0,
        storageDischargeValley: 0,
        storageDischargeDeepValley: 0,
        storageDischargeTotal: 0,
        chargingPileSharp: 0,
        chargingPilePeak: 0,
        chargingPileFlat: 0,
        chargingPileValley: 0,
        chargingPileDeepValley: 0,
        chargingPileTotal: 0,
        gridSharp: 0,
        gridPeak: 0,
        gridFlat: 0,
        gridValley: 0,
        gridDeepValley: 0,
        gridTotal: 0,
        solarConsumptionSharp: 0,
        solarConsumptionPeak: 0,
        solarConsumptionFlat: 0,
        solarConsumptionValley: 0,
        solarConsumptionDeepValley: 0,
        solarConsumptionTotal: 0,
        gridConnection: 0,
        grandTotal: 0,
      },
    ],
    pagerConfig: {
      enabled: false,
    },
    rowConfig: {
      keyField: 'time',
    },
    toolbarConfig: {
      search: false,
      custom: true,
      export: true,
      refresh: { code: 'query' },
      zoom: true,
    },
  }) as VxeTableGridOptions<EnterpriseEnergyReportData>;

// 月报表格
const [MonthlyGrid, monthlyGridApi] = useVbenVxeGrid({
  formOptions: createFormOptions('monthly'),
  showSearchForm: true,
  gridOptions: {
    ...createGridOptions('monthly'),
    proxyConfig: {
      autoLoad: false, // 禁用自动加载，只有在用户主动搜索时才查询
      ajax: {
        query: async (_params: any, formValues: any) => {
          // 使用 formValues 中的时间参数和企业选择进行数据过滤
          console.log('月报搜索参数:', formValues);

          // 检查是否已选择企业，如果没有选择企业则不查询数据
          if (!formValues?.enterprise) {
            console.log('未选择企业，跳过月报数据查询');
            return {
              items: [],
            };
          }

          console.log('开始查询月报数据，企业:', formValues.enterprise);
          const result = await getEnergyReportData({
            startTime: formValues?.startTime,
            endTime: formValues?.endTime,
            enterprise: formValues?.enterprise,
            reportType: 'monthly',
          });
          console.log('月报数据查询完成，数据条数:', result.items?.length || 0);

          // 计算表尾合计数据并更新
          if (result.items && result.items.length > 0) {
            const calculatedFooter = calculateFooterData(result.items);
            // 更新表尾数据
            monthlyGridApi.setGridOptions({
              footerData: [calculatedFooter],
            });
          }
          return result;
        },
      },
    },
  },
});

// 年报表格
const [YearlyGrid, yearlyGridApi] = useVbenVxeGrid({
  formOptions: createFormOptions('yearly'),
  showSearchForm: true,
  gridOptions: {
    ...createGridOptions('yearly'),
    proxyConfig: {
      autoLoad: false, // 禁用自动加载，只有在用户主动搜索时才查询
      ajax: {
        query: async (_params: any, formValues: any) => {
          // 使用 formValues 中的时间参数和企业选择进行数据过滤
          console.log('年报搜索参数:', formValues);

          // 检查是否已选择企业，如果没有选择企业则不查询数据
          if (!formValues?.enterprise) {
            console.log('未选择企业，跳过年报数据查询');
            return {
              items: [],
            };
          }

          console.log('开始查询年报数据，企业:', formValues.enterprise);
          const result = await getEnergyReportData({
            startTime: formValues?.startTime,
            endTime: formValues?.endTime,
            enterprise: formValues?.enterprise,
            reportType: 'yearly',
          });
          console.log('年报数据查询完成，数据条数:', result.items?.length || 0);

          // 计算表尾合计数据并更新
          if (result.items && result.items.length > 0) {
            const calculatedFooter = calculateFooterData(result.items);
            // 更新表尾数据
            yearlyGridApi.setGridOptions({
              footerData: [calculatedFooter],
            });
          }
          return result;
        },
      },
    },
  },
});

function onRefresh() {
  if (activeTab.value === 'monthly') {
    monthlyGridApi.query();
  } else {
    yearlyGridApi.query();
  }
}

// 监听标签页切换，自动刷新对应表格
watch(activeTab, (newTab) => {
  // 延迟执行，确保组件已经渲染
  setTimeout(() => {
    if (newTab === 'monthly') {
      monthlyGridApi.query();
    } else {
      yearlyGridApi.query();
    }
  }, 100);
});
</script>
<template>
  <Page auto-content-height>
    <ElTabs
      v-model="activeTab"
      type="border-card"
      tab-position="left"
      class="energy-report-tabs"
    >
      <ElTabPane :label="$t('system.energyReport.tabs.monthly')" name="monthly">
        <MonthlyGrid
          :table-title="`${$t('system.energyReport.title')} - ${$t('system.energyReport.tabs.monthly')}`"
          :table-title-help="$t('system.energyReport.description')"
        />
      </ElTabPane>
      <ElTabPane :label="$t('system.energyReport.tabs.yearly')" name="yearly">
        <YearlyGrid
          :table-title="`${$t('system.energyReport.title')} - ${$t('system.energyReport.tabs.yearly')}`"
          :table-title-help="$t('system.energyReport.description')"
        />
      </ElTabPane>
    </ElTabs>
  </Page>
</template>

<style lang="scss" scoped>
// 页面整体布局样式
.page-container {
  @apply h-full;
}

// ElTabs 样式优化
.energy-report-tabs {
  @apply h-full;

  // 标签页导航样式
  :deep(.el-tabs__nav-wrap) {
    @apply bg-background border-border border-r;
  }

  :deep(.el-tabs__nav) {
    @apply bg-background;
  }

  :deep(.el-tabs__item) {
    @apply text-foreground transition-colors duration-200;

    &:hover {
      @apply text-primary;
    }

    &.is-active {
      @apply text-primary font-medium;
    }
  }

  // 标签页内容区域
  :deep(.el-tabs__content) {
    @apply h-full overflow-hidden;
  }

  :deep(.el-tab-pane) {
    @apply h-full;
  }
}

// 表单区域样式优化
:deep(.vben-form) {
  .vben-form-item {
    @apply mb-4;
  }

  .vben-form-label {
    @apply text-foreground font-medium;
  }
}

// 工具栏按钮样式
:deep(.vxe-toolbar) {
  .vben-button {
    @apply transition-all duration-200;

    &:hover {
      @apply shadow-md;
    }
  }
}

// VXE Table 样式优化 - 遵循设计系统
:deep(.vxe-table) {
  // 边框合并设置
  border-collapse: collapse;
  @apply border-border overflow-hidden rounded-md border;

  // 表头样式 - 恢复原来的设置并遵循设计系统
  .vxe-header--column {
    //background-color: hsl(var(--primary) / 0.15) !important;
    border-right: 1px solid var(--vxe-ui-table-header-border-color);
    border-bottom: 1px solid var(--vxe-ui-table-header-border-color);
    font-weight: 600;
    color: inherit !important;
  }

  // 深色模式下的表头背景色
  .dark .vxe-header--column {
    background-color: hsl(var(--accent-foreground)) !important;
  }

  // 覆盖VXE Table的默认表头字体颜色，让其遵循设计系统
  .vxe-table--header-wrapper {
    color: inherit !important;
  }

  .vxe-header--column {
    color: inherit !important;
  }

  // 数据行边框使用设计系统颜色
  .vxe-body--column {
    border-right: 1px solid var(--vxe-ui-table-border-color);
    border-bottom: 1px solid var(--vxe-ui-table-border-color);
  }

  // 悬停效果
  .vxe-body--row:hover {
    //background-color: hsl(var(--accent) / 0.1);
  }

  // 表尾合计行样式
  .vxe-footer--column {
    background-color: hsl(var(--muted));
    font-weight: 600;
    border-right: 1px solid var(--vxe-ui-table-border-color);
  }

  // 只对真正的最后一列（表格最右侧）移除右边框
  .vxe-table .vxe-header--column:last-child,
  .vxe-table .vxe-body--column:last-child {
    border-right: none;
  }

  // 确保所有表头列都有白色右边框，除非是表格的最后一列
  .vxe-header--column {
    //border-right: 1px solid white !important;
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

  // 表格内容文字样式
  .vxe-cell {
    @apply text-foreground;
  }

  // 数字列右对齐
  .vxe-cell--number {
    @apply text-right;
  }
}

// 响应式设计
@media (max-width: 768px) {
  :deep(.vxe-table) {
    font-size: 12px;
  }

  :deep(.vben-form) {
    .vben-form-item {
      @apply mb-3;
    }
  }
}
</style>
