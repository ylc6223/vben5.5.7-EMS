<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@vben/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

// 生成24小时时间轴数据
const generateTimeData = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    times.push(`${i.toString().padStart(2, '0')}:00`);
  }
  return times;
};

// 生成模拟的能量流向数据
const generateEnergyFlowData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    // 模拟白天发电（正值）和夜间用电（负值）的模式
    let value;
    if (i >= 6 && i <= 18) {
      // 白天6点到18点，主要是发电（正值）
      value = Math.random() * 200 + 50 + Math.sin((i - 6) * Math.PI / 12) * 150;
    } else {
      // 夜间，主要是用电（负值）
      value = -(Math.random() * 100 + 20);
    }
    data.push(Math.round(value));
  }
  return data;
};

onMounted(() => {
  const timeData = generateTimeData();
  const solarData = generateEnergyFlowData();
  const windData = generateEnergyFlowData().map(v => v * 0.8); // 风电数据稍小一些
  const storageData = generateEnergyFlowData().map(v => v * 0.6); // 储能数据更小
  const gridData = generateEnergyFlowData().map(v => v * 1.2); // 电网数据稍大
  const loadData = generateEnergyFlowData().map(v => Math.abs(v) * -0.9); // 负荷数据（负值）

  renderEcharts({

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
      top: '15%',
    },
    legend: {
      top: '2%',
      left: 'center',
      data: ['电网交互功率', '光伏发电功率', '风电发电功率', '储能功率', '负荷功率'],
      textStyle: {
        color: '#6b7280',
        fontSize: 11,
      },
    },
    series: [
      {
        name: '电网交互功率',
        data: gridData,
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
                color: 'rgba(59, 130, 246, 0.3)', // blue-500
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#3b82f6',
          width: 2,
        },
        itemStyle: {
          color: '#3b82f6',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: '光伏发电功率',
        data: solarData,
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
                color: 'rgba(245, 158, 11, 0.3)', // amber-500
              },
              {
                offset: 1,
                color: 'rgba(245, 158, 11, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#f59e0b',
          width: 2,
        },
        itemStyle: {
          color: '#f59e0b',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: '风电发电功率',
        data: windData,
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
                color: 'rgba(16, 185, 129, 0.3)', // emerald-500
              },
              {
                offset: 1,
                color: 'rgba(16, 185, 129, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#10b981',
          width: 2,
        },
        itemStyle: {
          color: '#10b981',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: '储能功率',
        data: storageData,
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
                color: 'rgba(168, 85, 247, 0.3)', // purple-500
              },
              {
                offset: 1,
                color: 'rgba(168, 85, 247, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#a855f7',
          width: 2,
        },
        itemStyle: {
          color: '#a855f7',
        },
        symbol: 'circle',
        symbolSize: 4,
      },
      {
        name: '负荷功率',
        data: loadData,
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
                color: 'rgba(239, 68, 68, 0.3)', // red-500
              },
              {
                offset: 1,
                color: 'rgba(239, 68, 68, 0.05)',
              },
            ],
          },
        },
        lineStyle: {
          color: '#ef4444',
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
      formatter: function (params: any) {
        let result = `${params[0].axisValue}<br/>`;
        params.forEach((param: any) => {
          const value = param.value;
          const unit = value >= 0 ? 'kW' : 'kW';
          result += `${param.marker}${param.seriesName}: ${Math.abs(value)} ${unit}<br/>`;
        });
        return result;
      },
    },
    xAxis: {
      axisTick: {
        show: false,
      },
      boundaryGap: false,
      data: timeData,
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb',
        },
      },
      axisLabel: {
        color: '#6b7280',
        fontSize: 11,
        interval: 2, // 每隔2个显示一个标签
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
          if (value === 0) return '0';
          return value > 0 ? `+${value}kW` : `${value}kW`;
        },
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed',
        },
      },
      // 添加零轴线
      axisPointer: {
        lineStyle: {
          color: '#374151',
          width: 1,
        },
      },
    },
    // 添加数据缩放功能
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        height: 20,
        bottom: '8%',
        handleStyle: {
          color: '#3b82f6',
        },
        textStyle: {
          color: '#6b7280',
          fontSize: 10,
        },
      },
    ],
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" height="100%" />
</template>
