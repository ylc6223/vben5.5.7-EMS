<template>
  <!-- 企业信息指标 -->
  <div class="mt-4 flex-1">
    <div class="text-sm font-medium mb-3 flex items-center">
      <span class="icon-[mdi--chart-pie] text-lg text-indigo-600 mr-2"></span>
      {{ props.title }}
    </div>
    <div class="grid grid-cols-2 gap-2 flex-1 sm:grid-cols-3 lg:grid-cols-5">
      <div class="flex-1">
        <CompanyMetricsChart
          title="站点"
          :normal-value="props.stationNormal"
          :abnormal-value="props.stationAbnormal"
        />
      </div>
      <div class="flex-1">
        <CompanyMetricsChart
          title="网关"
          :normal-value="props.gatewayNormal"
          :abnormal-value="props.gatewayAbnormal"
        />
      </div>
      <div class="flex-1">
        <CompanyMetricsChart
          title="监测点"
          :normal-value="props.monitorNormal"
          :abnormal-value="props.monitorAbnormal"
        />
      </div>
      <div class="flex-1">
        <CompanyMetricsChart
          title="逆变器"
          :normal-value="props.inverterNormal"
          :abnormal-value="props.inverterAbnormal"
        />
      </div>
      <div class="flex-1">
        <CompanyMetricsChart
          title="充电桩"
          :normal-value="props.chargingNormal"
          :abnormal-value="props.chargingAbnormal"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CompanyMetricsChart from './CompanyMetricsChart.vue';

interface Props {
  title?: string;
  stationNormal?: number;      // 能源站点正常率
  stationAbnormal?: number;    // 能源站点异常率
  gatewayNormal?: number;      // 网关正常率
  gatewayAbnormal?: number;    // 网关异常率
  monitorNormal?: number;      // 监测点正常率
  monitorAbnormal?: number;    // 监测点异常率
  inverterNormal?: number;     // 逆变器正常率
  inverterAbnormal?: number;   // 逆变器异常率
  chargingNormal?: number;     // 充电桩正常率
  chargingAbnormal?: number;   // 充电桩异常率
}

const props = withDefaults(defineProps<Props>(), {
  title: '企业指标分析',
  stationNormal: 82,
  stationAbnormal: 18,
  gatewayNormal: 91,
  gatewayAbnormal: 9,
  monitorNormal: 88,
  monitorAbnormal: 12,
  inverterNormal: 76,
  inverterAbnormal: 24,
  chargingNormal: 94,
  chargingAbnormal: 6,
});

defineOptions({
  name: 'CompanyMetricsAnalysis'
});
</script>
