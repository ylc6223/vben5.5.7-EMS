<template>
  <div class="flex h-full flex-col gap-4 p-5">
    <!-- 第一行：能量流向图表卡片 - 占据49%高度 -->
    <div class="h-[49%]">
      <AnalysisChartCard class="flex h-full w-full flex-col" title="能量流向图">
        <div class="flex flex-1 flex-col items-center justify-center">
          <div class="text-center text-gray-500">
            <div class="text-4xl mb-3">🔄</div>
            <p class="text-sm">流向图表内容开发中...</p>
          </div>
        </div>
      </AnalysisChartCard>
    </div>

    <!-- 第二行：能量流向时间轴图卡片 - 占据49%高度 -->
    <div class="h-[49%]">
      <AnalysisChartCard class="flex h-full w-full flex-col" title="">
        <div class="flex-1 h-full">
          <EnergyFlowTimelineChart />
        </div>
      </AnalysisChartCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { AnalysisChartCard } from "@vben/common-ui";
import EnergyFlowTimelineChart from "./components/energy-flow-timeline-chart.vue";

defineOptions({
  name: "EnergyFlowDiagram"
});
</script>

<style scoped>
/* 能量流向图页面样式 */
</style>
