<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    title: {
      text: '用电趋势分析',
      left: 'center',
      top: '2%',
      textStyle: {
        color: '#374151',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: '保存为图片',
        },
        dataZoom: {
          title: {
            zoom: '区域缩放',
            back: '区域缩放还原',
          },
        },
        restore: {
          title: '还原',
        },
        dataView: {
          title: '数据视图',
          readOnly: false,
        },
      },
      right: '3%',
      top: '8%',
    },
    grid: {
      bottom: '20%',
      containLabel: true,
      left: '0%',
      right: '0%',
      top: '25%',
    },
    series: [
      {
        name: '今日',
        data: [20, 28, 15, 35, 22, 30, 38],
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
        name: '昨日',
        data: [18, 25, 12, 32, 20, 28, 35],
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
                color: 'rgba(156, 163, 175, 0.3)', // gray-400 with opacity
              },
              {
                offset: 1,
                color: 'rgba(156, 163, 175, 0.05)', // gray-400 with low opacity
              },
            ],
          },
        },
        lineStyle: {
          color: '#9ca3af', // gray-400
          width: 2,
        },
        itemStyle: {
          color: '#9ca3af',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
    ],
    legend: {
      bottom: '5%',
      data: ['今日', '昨日'],
      textStyle: {
        color: '#6b7280',
        fontSize: 11,
      },
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: '#3b82f6',
          width: 1,
        },
      },
      trigger: 'axis',
      formatter: '{b}: {c} m³',
    },
    xAxis: {
      axisTick: {
        show: false,
      },
      boundaryGap: false,
      data: ['00:00', '03:40', '07:20', '11:00', '14:40', '18:20', '22:00'],
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 11,
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
        formatter: '{value} kW',
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed',
        },
      },
      min: 0,
      max: 50,
    },
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" height="100%" />
</template>
