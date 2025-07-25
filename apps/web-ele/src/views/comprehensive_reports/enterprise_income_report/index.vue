<script lang="ts" setup>
import type { VbenFormProps } from '@vben-core/form-ui';

import type { ReportType } from './data';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { EnterpriseIncomeReportData } from '#/api/income/report';

import { ref, watch } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import dayjs from 'dayjs';
import { ElTabPane, ElTabs } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getEnterpriseIncomeReportApi } from '#/api/income/report';
import { searchEnterprisesApi } from '#/api/energy/enterprise';

import { useColumns } from './data';

// 当前激活的标签页
const activeTab = ref('monthly');

// API数据获取函数
async function getIncomeReportData(params?: {
  endTime?: string;
  enterprise?: string;
  reportType?: ReportType;
  startTime?: string;
}): Promise<{
  items: EnterpriseIncomeReportData[];
}> {
  try {
    const response = await getEnterpriseIncomeReportApi(params);
    return {
      items: response.items,
    };
  } catch (error) {
    console.error('获取企业收益报表数据失败:', error);
    // 如果API调用失败，返回空数据
    return {
      items: [],
    };
  }
}

// 计算表尾合计数据
function calculateFooterData(
  data: EnterpriseIncomeReportData[],
): EnterpriseIncomeReportData {
  const footerData: any = {
    time: $t('system.incomeReport.footer.total'),
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
        const value = Number(row[key as keyof EnterpriseIncomeReportData]) || 0;
        return sum + value;
      }, 0);
      footerData[key] = Number(total.toFixed(2)); // 收益数据保留2位小数
    }
  });

  // 为合计列计算表尾总和（所有行的各收益列总和）
  const calculatedTotalIncome = data.reduce((sum, row) => {
    const solarIncome = Number(row.solarIncome) || 0;
    const chargingPileIncome = Number(row.chargingPileIncome) || 0;
    const storageIncomeTotal = Number(row.storageIncomeTotal) || 0;
    const windIncome = Number(row.windIncome) || 0;

    const rowTotal = solarIncome + chargingPileIncome + storageIncomeTotal + windIncome;
    return sum + rowTotal;
  }, 0);
  footerData.calculatedTotalIncome = Number(calculatedTotalIncome.toFixed(2));

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
        label: $t('system.incomeReport.form.enterpriseSelect'),
        componentProps: {
          class: 'w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-sm',
          placeholder: $t('system.incomeReport.form.enterprisePlaceholder'),
          searchPlaceholder: $t('system.incomeReport.form.enterpriseSearchPlaceholder'),
          buttonType: 'default',
          buttonSize: 'default',
          placement: 'bottom-start',
          popoverWidth: 300,
          filterable: true,
          remote: false, // 设置为 false，这样组件会在挂载时自动加载数据
          // 使用异步数据源获取企业列表
          dataSource: async (keyword?: string) => {
            try {
              console.log('SearchSelector dataSource called with keyword:', keyword);
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
                return mockData.filter(item =>
                  item.label.toLowerCase().includes(keyword.toLowerCase())
                );
              }

              console.log('Using fallback enterprise data:', mockData.length, 'items');
              return mockData;
            }
          },
          // 监听企业选择变化
          onChange: (value: string | number, option: any) => {
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
        label: isMonthly ? $t('system.incomeReport.form.dateRange') : $t('system.incomeReport.form.monthRange'),
        componentProps: {
          class: 'w-full',
          startPlaceholder: isMonthly ? $t('system.incomeReport.form.startDate') : $t('system.incomeReport.form.startMonth'),
          endPlaceholder: isMonthly ? $t('system.incomeReport.form.endDate') : $t('system.incomeReport.form.endMonth'),
          rangeSeparator: $t('system.incomeReport.form.separator'),
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
        time: $t('system.incomeReport.footer.total'),
        // 初始化所有收益字段为0
        electricityIncomeSharp: 0,
        electricityIncomePeak: 0,
        electricityIncomeFlat: 0,
        electricityIncomeValley: 0,
        electricityIncomeDeepValley: 0,
        electricityIncomeTotal: 0,
        windIncomeSharp: 0,
        windIncomePeak: 0,
        windIncomeFlat: 0,
        windIncomeValley: 0,
        windIncomeDeepValley: 0,
        windIncomeTotal: 0,
        storageChargeIncomeSharp: 0,
        storageChargeIncomePeak: 0,
        storageChargeIncomeFlat: 0,
        storageChargeIncomeValley: 0,
        storageChargeIncomeDeepValley: 0,
        storageChargeIncomeTotal: 0,
        storageDischargeIncomeSharp: 0,
        storageDischargeIncomePeak: 0,
        storageDischargeIncomeFlat: 0,
        storageDischargeIncomeValley: 0,
        storageDischargeIncomeDeepValley: 0,
        storageDischargeIncomeTotal: 0,
        chargingIncomeSharp: 0,
        chargingIncomePeak: 0,
        chargingIncomeFlat: 0,
        chargingIncomeValley: 0,
        chargingIncomeDeepValley: 0,
        chargingIncomeTotal: 0,
        gridIncomeSharp: 0,
        gridIncomePeak: 0,
        gridIncomeFlat: 0,
        gridIncomeValley: 0,
        gridIncomeDeepValley: 0,
        gridIncomeTotal: 0,
        solarConsumptionIncomeSharp: 0,
        solarConsumptionIncomePeak: 0,
        solarConsumptionIncomeFlat: 0,
        solarConsumptionIncomeValley: 0,
        solarConsumptionIncomeDeepValley: 0,
        solarConsumptionIncomeTotal: 0,
        gridConnectionIncome: 0,
        grandTotalIncome: 0,
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
  }) as VxeTableGridOptions<EnterpriseIncomeReportData>;

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
          const result = await getIncomeReportData({
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
          const result = await getIncomeReportData({
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
    <ElTabs v-model="activeTab" type="border-card" tab-position="left" class="income-report-tabs">
      <ElTabPane :label="$t('system.incomeReport.tabs.monthly')" name="monthly">
        <MonthlyGrid
          :table-title="`${$t('system.incomeReport.title')} - ${$t('system.incomeReport.tabs.monthly')}`"
          :table-title-help="$t('system.incomeReport.description')"
        />
      </ElTabPane>
      <ElTabPane :label="$t('system.incomeReport.tabs.yearly')" name="yearly">
        <YearlyGrid
          :table-title="`${$t('system.incomeReport.title')} - ${$t('system.incomeReport.tabs.yearly')}`"
          :table-title-help="$t('system.incomeReport.description')"
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
  // 表格宽度自适应
  width: 100% !important;
  min-width: 100%;

  // 边框合并设置
  border-collapse: collapse;
  @apply border-border overflow-hidden rounded-md border;

  // 表头样式 - 恢复原来的设置并遵循设计系统
  .vxe-header--column {
    //background-color: hsl(var(--primary) / 0.15) !important;
    border-right: 1px solid var(--vxe-header-border-color);
    border-bottom: 1px solid var(--vxe-header-border-color);
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
