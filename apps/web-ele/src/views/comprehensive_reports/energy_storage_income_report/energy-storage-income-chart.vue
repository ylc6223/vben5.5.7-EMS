<script lang="ts" setup>
import type { EchartsUIType } from '@vben/plugins/echarts';

import { onMounted, ref, watch } from 'vue';

import { EchartsUI, useEcharts } from '@vben/plugins/echarts';
import { $t } from '@vben/locales';

// 定义组件props
interface Props {
  reportType?: 'monthly' | 'yearly';
  chartData?: Array<{
    time: string;
    totalChargingCost?: number;
    totalChargingElectricity?: number;
    totalDischargingElectricity?: number;
    totalDischargingIncome?: number;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  reportType: 'monthly',
  chartData: () => [],
});

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

// 生成图表配置
function generateChartOptions() {
  // 处理数据
  const xAxisData = props.chartData.length > 0
    ? props.chartData.map(item => item.time)
    : (props.reportType === 'monthly'
        ? ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-06', '2024-01-07'] // 示例日期
        : ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07']); // 示例月份

  const chargingData = props.chartData.length > 0
    ? props.chartData.map(item => item.totalChargingElectricity || 0)
    : [120, 135, 148, 162, 158, 168, 175];

  const dischargingData = props.chartData.length > 0
    ? props.chartData.map(item => item.totalDischargingElectricity || 0)
    : [110, 125, 138, 152, 148, 158, 165];

  const costData = props.chartData.length > 0
    ? props.chartData.map(item => item.totalChargingCost || 0)
    : [85, 95, 105, 115, 112, 118, 125];

  const incomeData = props.chartData.length > 0
    ? props.chartData.map(item => item.totalDischargingIncome || 0)
    : [150, 165, 180, 195, 192, 202, 210];

  // 调试信息
  console.log('图表数据调试:', {
    chartDataLength: props.chartData.length,
    chargingData,
    dischargingData,
    costData,
    incomeData,
    sampleItem: props.chartData[0]
  });

  return {
    // 移除标题
    toolbox: {
      feature: {
        saveAsImage: {
          title: $t('system.energyStorageIncomeReport.chart.saveAsImage'),
        },
        dataZoom: {
          title: {
            zoom: $t('system.energyStorageIncomeReport.chart.dataZoom'),
            back: $t('system.energyStorageIncomeReport.chart.dataZoomReset'),
          },
        },
        restore: {
          title: $t('system.energyStorageIncomeReport.chart.restore'),
        },
        dataView: {
          title: $t('system.energyStorageIncomeReport.chart.dataView'),
          readOnly: false,
        },
      },
      right: '3%',
      top: '2%', // 调整toolbar位置，与图例对齐
    },
    grid: {
      bottom: '15%', // 减少底部间距，因为图例移到顶部了
      containLabel: true,
      left: '1%', // 减少左边距
      right: '1%', // 减少右边距
      top: '18%', // 增加顶部间距，为图例和toolbar留出空间
    },
    legend: {
      top: '2%', // 将图例移到顶部
      data: [
        $t('system.energyStorageIncomeReport.chart.totalChargingElectricity'),
        $t('system.energyStorageIncomeReport.chart.totalDischargingElectricity'),
        $t('system.energyStorageIncomeReport.chart.totalChargingCost'),
        $t('system.energyStorageIncomeReport.chart.totalDischargingIncome'),
      ],
      textStyle: {
        color: '#6b7280',
        fontSize: 11,
      },
    },
    series: [
      {
        name: $t('system.energyStorageIncomeReport.chart.totalChargingElectricity'),
        data: chargingData,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.3)', // blue-500 with opacity
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.05)', // blue-500 with low opacity
              },
            ],
          },
        },
        lineStyle: {
          color: '#3b82f6', // blue-500
          width: 2,
        },
        itemStyle: {
          color: '#3b82f6',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: $t('system.energyStorageIncomeReport.chart.totalDischargingElectricity'),
        data: dischargingData,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(16, 185, 129, 0.3)', // green-500 with opacity
              },
              {
                offset: 1,
                color: 'rgba(16, 185, 129, 0.05)', // green-500 with low opacity
              },
            ],
          },
        },
        lineStyle: {
          color: '#10b981', // green-500
          width: 2,
        },
        itemStyle: {
          color: '#10b981',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: $t('system.energyStorageIncomeReport.chart.totalChargingCost'),
        data: costData,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(245, 158, 11, 0.3)', // amber-500 with opacity
              },
              {
                offset: 1,
                color: 'rgba(245, 158, 11, 0.05)', // amber-500 with low opacity
              },
            ],
          },
        },
        lineStyle: {
          color: '#f59e0b', // amber-500
          width: 2,
        },
        itemStyle: {
          color: '#f59e0b',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: $t('system.energyStorageIncomeReport.chart.totalDischargingIncome'),
        data: incomeData,
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(239, 68, 68, 0.3)', // red-500 with opacity
              },
              {
                offset: 1,
                color: 'rgba(239, 68, 68, 0.05)', // red-500 with low opacity
              },
            ],
          },
        },
        lineStyle: {
          color: '#ef4444', // red-500
          width: 2,
        },
        itemStyle: {
          color: '#ef4444',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        lineStyle: {
          color: '#10b981',
          width: 1,
        },
      },
      formatter(params: any) {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((param: any) => {
          // 根据系列名称判断单位
          const costText = $t('system.energyStorageIncomeReport.chart.totalChargingCost');
          const incomeText = $t('system.energyStorageIncomeReport.chart.totalDischargingIncome');
          const unit = (param.seriesName === costText || param.seriesName === incomeText) 
            ? $t('system.energyStorageIncomeReport.chart.unitCurrency') 
            : $t('system.energyStorageIncomeReport.chart.unitElectricity');
          // 确保数值显示为两位小数
          const value =
            typeof param.value === 'number'
              ? param.value.toFixed(2)
              : param.value;
          result += `${param.marker}${param.seriesName}: ${value} ${unit}<br/>`;
        });
        return result;
      },
    },
    xAxis: {
      axisTick: {
        show: true, // 显示x轴刻度线（每个坐标点下方的小竖线）
        lineStyle: {
          color: '#d1d5db', // 刻度线颜色
          width: 1,
        },
        length: 6, // 刻度线长度
        alignWithLabel: true, // 刻度线与标签对齐
      },
      boundaryGap: false,
      data: xAxisData, // 动态生成的x轴数据
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 11, // 恢复原始字体大小
        margin: 8, // 增加标签与轴线的距离
        formatter: function(value: string) {
          // 根据报表类型格式化显示
          if (value.includes('-')) {
            // 日期格式，只显示月-日
            const parts = value.split('-');
            if (parts.length === 3) {
              return `${parts[1]}-${parts[2]}`;
            }
            // 月份格式，只显示年-月
            if (parts.length === 2) {
              return value;
            }
          }
          return value;
        },
      },
      splitLine: {
        show: false, // 关闭垂直网格线，只保留刻度线
      },
    },
    yAxis: {
      axisTick: {
        show: false,
      },
      type: 'value',
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 11,
        formatter: function(value: number) {
          // 根据数值大小自动选择单位
          if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
          }
          return value.toString();
        },
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed',
        },
      },
      min: 0,
      // 移除固定的max值，让y轴自动适应数据范围
      // max: 250, 
      scale: true, // 启用自动缩放
    },
  };
}

// 渲染图表
function renderChart() {
  renderEcharts(generateChartOptions());
}

// 组件挂载时渲染图表
onMounted(() => {
  renderChart();
});

// 监听props变化，重新渲染图表
watch(() => [props.reportType, props.chartData], () => {
  renderChart();
}, { deep: true });
</script>

<template>
  <EchartsUI ref="chartRef" height="100%" />
</template>
