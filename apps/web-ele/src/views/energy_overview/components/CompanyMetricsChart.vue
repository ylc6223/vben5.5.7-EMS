<script lang="ts" setup>
import { onMounted, ref, watch, computed } from 'vue';
import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@vben/plugins/echarts';
import { usePreferences } from '@vben/preferences';

interface Props {
  title?: string;
  normalValue?: number;
  abnormalValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: '状态监控',
  normalValue: 75,
  abnormalValue: 25,
});

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);
const { isDark } = usePreferences();

// 根据主题模式计算标题颜色
const titleColor = computed(() => {
  return isDark.value ? '#ffffff' : '#1f2937';
});

const renderChart = () => {
  renderEcharts({
    title: {
      text: props.title,
      left: 'center',
      top: '8%',
      textStyle: {
        fontSize: 16,        // text-base
        fontWeight: 600,     // font-semibold
        color: titleColor.value,  // 根据主题动态设置颜色
      },
    },
    legend: {
      bottom: '1%',
      left: 'center',
      textStyle: {
        fontSize: 11,        // 与下方图表图例字体大小一致
        color: '#6b7280',    // 与下方图表图例颜色一致 (gray-500)
      },
    },
    series: [
      {
        animationDelay() {
          return Math.random() * 100;
        },
        animationEasing: 'exponentialInOut',
        animationType: 'scale',
        avoidLabelOverlap: false,
        color: ['#10b981', '#9ca3af'],  // 与下方图表颜色一致：green-500 for normal, gray-400 for abnormal
        data: [
          { name: '正常', value: props.normalValue },
          { name: '异常', value: props.abnormalValue },
        ],
        emphasis: {
          label: {
            fontSize: '10',
            fontWeight: 'bold',
            show: true,
          },
        },
        itemStyle: {
          borderRadius: 8,
          borderWidth: 2,
        },
        label: {
          position: 'center',
          show: false,
        },
        labelLine: {
          show: false,
        },
        name: props.title,
        radius: ['25%', '50%'],
        type: 'pie',
        center: ['50%', '60%'],
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}% ({d}%)',
    },
  });
};

watch(
  () => [props.normalValue, props.abnormalValue, props.title, isDark.value],
  () => {
    renderChart();
  }
);

onMounted(() => {
  renderChart();
});
</script>

<template>
  <div class="h-full w-full">
    <EchartsUI ref="chartRef" class="h-full" />
  </div>
</template>
