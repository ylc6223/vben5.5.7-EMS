<script lang="ts" setup>
import type { VbenFormProps } from '@vben-core/form-ui';

import type { ReportType } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EnergyStorageIncomeReportData } from '#/api/income/report';

import { ref, watch } from 'vue';

import { AnalysisChartCard, Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import dayjs from 'dayjs';
import { ElTabPane, ElTabs } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { searchEnterprisesApi } from '#/api/energy/enterprise';
import { getEnergyStorageIncomeReportApi } from '#/api/income/report';

import { useColumns } from './data';
import Chart from './energy-storage-income-chart.vue';

// 当前激活的标签页
const activeTab = ref('monthly');

// 图表数据
const monthlyChartData = ref<
  Array<{
    time: string;
    totalChargingCost?: number;
    totalChargingElectricity?: number;
    totalDischargingElectricity?: number;
    totalDischargingIncome?: number;
  }>
>([]);

const yearlyChartData = ref<
  Array<{
    time: string;
    totalChargingCost?: number;
    totalChargingElectricity?: number;
    totalDischargingElectricity?: number;
    totalDischargingIncome?: number;
  }>
>([]);

// API数据获取函数
async function getEnergyStorageIncomeReportData(params?: {
  endTime?: string;
  enterprise?: string;
  reportType?: ReportType;
  startTime?: string;
}): Promise<{
  items: EnergyStorageIncomeReportData[];
}> {
  try {
    const response = await getEnergyStorageIncomeReportApi(params);
    return {
      items: response.items,
    };
  } catch (error) {
    console.error('获取储能收益报表数据失败:', error);
    // 如果API调用失败，返回空数据
    return {
      items: [],
    };
  }
}

// 计算表尾合计数据
function calculateFooterData(
  data: EnergyStorageIncomeReportData[],
): EnergyStorageIncomeReportData {
  const footerData: any = {
    time: $t('system.energyStorageIncomeReport.footer.total'),
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
        const value =
          Number(row[key as keyof EnergyStorageIncomeReportData]) || 0;
        return sum + value;
      }, 0);
      footerData[key] = Number(total.toFixed(2)); // 收益数据保留2位小数
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
        label: $t('system.energyStorageIncomeReport.form.enterpriseSelect'),
        componentProps: {
          class: 'w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-sm',
          placeholder: $t(
            'system.energyStorageIncomeReport.form.enterprisePlaceholder',
          ),
          searchPlaceholder: $t(
            'system.energyStorageIncomeReport.form.enterpriseSearchPlaceholder',
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
          ? $t('system.energyStorageIncomeReport.form.dateRange')
          : $t('system.energyStorageIncomeReport.form.monthRange'),
        componentProps: {
          class: 'w-full',
          startPlaceholder: isMonthly
            ? $t('system.energyStorageIncomeReport.form.startDate')
            : $t('system.energyStorageIncomeReport.form.startMonth'),
          endPlaceholder: isMonthly
            ? $t('system.energyStorageIncomeReport.form.endDate')
            : $t('system.energyStorageIncomeReport.form.endMonth'),
          rangeSeparator: $t('system.energyStorageIncomeReport.form.separator'),
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
    // 表格自适应配置
    resizable: true, // 允许调整列宽
    autoResize: true, // 自动调整大小
    columnConfig: {
      resizable: true, // 列可调整大小
      useKey: true, // 使用key优化性能
    },
    // 表格布局配置
    border: true, // 显示边框
    stripe: true, // 斑马纹
    round: true, // 圆角
    footerData: [
      {
        time: $t('system.energyStorageIncomeReport.footer.total'),
        // 初始化充电电量字段为0
        chargingElectricitySharp: 0,
        chargingElectricityPeak: 0,
        chargingElectricityFlat: 0,
        chargingElectricityValley: 0,
        chargingElectricityDeepValley: 0,
        // 初始化放电电量字段为0
        dischargingElectricitySharp: 0,
        dischargingElectricityPeak: 0,
        dischargingElectricityFlat: 0,
        dischargingElectricityValley: 0,
        dischargingElectricityDeepValley: 0,
        // 初始化充电成本字段为0
        chargingCostSharp: 0,
        chargingCostPeak: 0,
        chargingCostFlat: 0,
        chargingCostValley: 0,
        chargingCostDeepValley: 0,
        // 初始化放电收益字段为0
        dischargingIncomeSharp: 0,
        dischargingIncomePeak: 0,
        dischargingIncomeFlat: 0,
        dischargingIncomeValley: 0,
        dischargingIncomeDeepValley: 0,
        // 初始化总净收益字段为0
        totalNetIncome: 0,
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
  }) as VxeTableGridOptions<EnergyStorageIncomeReportData>;

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
          const result = await getEnergyStorageIncomeReportData({
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

            // 更新月报图表数据
            monthlyChartData.value = result.items.map((item) => {
              const chartItem = {
                time: item.time,
                totalChargingElectricity: Number((
                  (item.chargingElectricitySharp || 0) +
                  (item.chargingElectricityPeak || 0) +
                  (item.chargingElectricityFlat || 0) +
                  (item.chargingElectricityValley || 0) +
                  (item.chargingElectricityDeepValley || 0)
                ).toFixed(2)),
                totalDischargingElectricity: Number((
                  (item.dischargingElectricitySharp || 0) +
                  (item.dischargingElectricityPeak || 0) +
                  (item.dischargingElectricityFlat || 0) +
                  (item.dischargingElectricityValley || 0) +
                  (item.dischargingElectricityDeepValley || 0)
                ).toFixed(2)),
                totalChargingCost: Number((
                  (item.chargingCostSharp || 0) +
                  (item.chargingCostPeak || 0) +
                  (item.chargingCostFlat || 0) +
                  (item.chargingCostValley || 0) +
                  (item.chargingCostDeepValley || 0)
                ).toFixed(2)),
                totalDischargingIncome: Number((
                  (item.dischargingIncomeSharp || 0) +
                  (item.dischargingIncomePeak || 0) +
                  (item.dischargingIncomeFlat || 0) +
                  (item.dischargingIncomeValley || 0) +
                  (item.dischargingIncomeDeepValley || 0)
                ).toFixed(2)),
              };

              // 调试信息：输出原始数据和计算结果
              console.log('月报数据项:', {
                time: item.time,
                原始数据: item,
                计算结果: chartItem
              });

              return chartItem;
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
          const result = await getEnergyStorageIncomeReportData({
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

            // 更新年报图表数据
            yearlyChartData.value = result.items.map((item) => ({
              time: item.time,
              totalChargingElectricity: Number((
                (item.chargingElectricitySharp || 0) +
                (item.chargingElectricityPeak || 0) +
                (item.chargingElectricityFlat || 0) +
                (item.chargingElectricityValley || 0) +
                (item.chargingElectricityDeepValley || 0)
              ).toFixed(2)),
              totalDischargingElectricity: Number((
                (item.dischargingElectricitySharp || 0) +
                (item.dischargingElectricityPeak || 0) +
                (item.dischargingElectricityFlat || 0) +
                (item.dischargingElectricityValley || 0) +
                (item.dischargingElectricityDeepValley || 0)
              ).toFixed(2)),
              totalChargingCost: Number((
                (item.chargingCostSharp || 0) +
                (item.chargingCostPeak || 0) +
                (item.chargingCostFlat || 0) +
                (item.chargingCostValley || 0) +
                (item.chargingCostDeepValley || 0)
              ).toFixed(2)),
              totalDischargingIncome: Number((
                (item.dischargingIncomeSharp || 0) +
                (item.dischargingIncomePeak || 0) +
                (item.dischargingIncomeFlat || 0) +
                (item.dischargingIncomeValley || 0) +
                (item.dischargingIncomeDeepValley || 0)
              ).toFixed(2)),
            }));
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
    <ElTabs v-model="activeTab" tab-position="left" class="income-report-tabs">
      <ElTabPane
        :label="$t('system.energyStorageIncomeReport.tabs.monthly')"
        name="monthly"
      >
        <div class="h-[66%] overflow-hidden">
          <MonthlyGrid
            :table-title="`${$t('system.energyStorageIncomeReport.title')} - ${$t('system.energyStorageIncomeReport.tabs.monthly')}`"
            :table-title-help="
              $t('system.energyStorageIncomeReport.description')
            "
          />
        </div>
        <div class="flex h-[33%] flex-col">
          <AnalysisChartCard class="flex h-full w-full flex-col" title="">
            <div class="h-full flex-1">
              <Chart report-type="monthly" :chart-data="monthlyChartData" />
            </div>
          </AnalysisChartCard>
        </div>
      </ElTabPane>
      <ElTabPane
        :label="$t('system.energyStorageIncomeReport.tabs.yearly')"
        name="yearly"
      >
        <div class="h-[66%] overflow-hidden">
          <YearlyGrid
            :table-title="`${$t('system.energyStorageIncomeReport.title')} - ${$t('system.energyStorageIncomeReport.tabs.yearly')}`"
            :table-title-help="
              $t('system.energyStorageIncomeReport.description')
            "
          />
        </div>
        <div class="flex h-[33%] flex-col">
          <AnalysisChartCard class="flex h-full w-full flex-col" title="">
            <div class="h-full flex-1">
              <Chart report-type="yearly" :chart-data="yearlyChartData" />
            </div>
          </AnalysisChartCard>
        </div>
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
.income-report-tabs {
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
    @apply h-full;
  }

  :deep(.el-tab-pane) {
    @apply flex h-full flex-col gap-[1%];
    overflow-y: auto; // 允许标签页内容滚动
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
  // 表格宽度自适应
  width: 100% !important;
  min-width: 100%;

  // 边框合并设置
  border-collapse: collapse;
  @apply border-border overflow-hidden rounded-md border;

  // 表头样式 - 恢复原来的设置并遵循设计系统
  .vxe-header--column {
    background-color: hsl(var(--primary) / 0.15) !important;
    border-right: 1px solid white;
    border-bottom: 1px solid white;
    font-weight: 600;
    color: inherit !important;
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

  // 数据行边框使用设计系统颜色
  .vxe-body--column {
    border-right: 1px solid hsl(var(--border));
    border-bottom: 1px solid hsl(var(--border));
  }

  // 悬停效果
  .vxe-body--row:hover {
    background-color: hsl(var(--accent) / 0.1);
  }

  // 表格容器自适应
  .vxe-table--main-wrapper {
    width: 100% !important;
  }

  // 表格主体自适应
  .vxe-table--body-wrapper {
    width: 100% !important;
  }

  // 表头自适应
  .vxe-table--header-wrapper {
    width: 100% !important;
  }

  // 表尾合计行样式
  .vxe-footer--column {
    background-color: hsl(var(--muted));
    font-weight: 600;
    border-right: 1px solid hsl(var(--border));
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

  // 表格内容文字样式
  .vxe-cell {
    @apply text-foreground;
  }

  // 数字列右对齐
  .vxe-cell--number {
    @apply text-right;
  }
}

// 移除多余的样式定义，直接使用 Tailwind CSS 类名

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

  // 移动端优化 - 使用 Tailwind 响应式类名即可
}
</style>
