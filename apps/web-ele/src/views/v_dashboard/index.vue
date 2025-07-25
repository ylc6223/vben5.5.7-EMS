<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';

import autofit from 'autofit.js';

import Header from './components/header.vue';
import ItemWrap from './components/item-wrap.vue';

onMounted(() => {
  autofit.init({
    dh: 1080,
    dw: 1920,
    el: '#root-visualizer-container',
    resize: true,
  });
});

onUnmounted(() => {
  // 清理 autofit 实例
  autofit.off();
});
</script>

<template>
  <div id="root-visualizer-container">
    <div id="visualizer-container" class="relative h-full w-full">
      <Header />
      <!-- 大屏主内容区 - 三列布局 -->
      <div
        class="min-h-[calc(100vh - 101px)] flex w-full flex-1"
      >
        <!-- 左侧区域 -->
        <div class="dashboard-left-panel flex w-1/5 flex-col">
          <!-- 综合信息面板 -->
          <ItemWrap title="综合信息面板" class="h-64">
            <div class="h-full p-4 text-white">
              <div class="grid h-full grid-cols-3 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-yellow-400">64kw</div>
                  <div class="text-sm">光伏发电</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-400">50kw</div>
                  <div class="text-sm">风力发电</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-400">30kw</div>
                  <div class="text-sm">储能放电</div>
                </div>
              </div>
            </div>
          </ItemWrap>

          <!-- 当前能耗统计 -->
          <ItemWrap title="当前能耗统计" class="flex-1">
            <div class="h-full p-4 text-white">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm">今日发电量</span>
                  <span class="text-lg font-bold text-blue-400">95</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">今日用电量</span>
                  <span class="text-lg font-bold text-red-400">85</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">储能充电量</span>
                  <span class="text-lg font-bold text-green-400">65</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">储能放电量</span>
                  <span class="text-lg font-bold text-yellow-400">45</span>
                </div>
              </div>
            </div>
          </ItemWrap>

          <!-- 新能源社会效益 -->
          <ItemWrap title="新能源社会效益" class="h-48">
            <div class="h-full p-4 text-white">
              <div class="grid h-full grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-xl font-bold text-green-400">154.2MW·h</div>
                  <div class="text-xs">累计发电量</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-blue-400">17.3MW·h</div>
                  <div class="text-xs">今日发电量</div>
                </div>
              </div>
            </div>
          </ItemWrap>
        </div>

        <!-- 中间区域 -->
        <div class="dashboard-center-panel flex w-3/5 flex-col">
          <!-- 主仪表盘区域 -->
          <ItemWrap title="智能微电网监控中心" class="h-80">
            <div class="flex h-full items-center justify-center p-4 text-white">
              <div class="text-center">
                <div class="mb-4 text-6xl font-bold text-blue-400">95</div>
                <div class="text-lg">系统运行状态良好</div>
                <div class="mt-2 text-sm text-gray-300">
                  实时监控 · 智能调度
                </div>
              </div>
            </div>
          </ItemWrap>

          <!-- 电力流向图 -->
          <ItemWrap title="电力流向监控" class="flex-1">
            <div class="h-full p-4 text-white">
              <div class="flex h-full items-center justify-center">
                <div class="text-center">
                  <div class="mb-4 text-lg">电力流向实时监控</div>
                  <div class="grid grid-cols-4 gap-4 text-sm">
                    <div class="text-center">
                      <div class="font-bold text-yellow-400">32kWh</div>
                      <div>光伏</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-blue-400">32kWh</div>
                      <div>风电</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-green-400">32kWh</div>
                      <div>储能</div>
                    </div>
                    <div class="text-center">
                      <div class="font-bold text-red-400">32kWh</div>
                      <div>负载</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ItemWrap>
        </div>

        <!-- 右侧区域 -->
        <div class="dashboard-right-panel flex w-1/5 flex-col">
          <!-- 昨日电量对比 -->
          <ItemWrap title="昨日电量对比" class="h-64">
            <div class="h-full p-4 text-white">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <span class="text-sm">发电量</span>
                  <span class="text-lg font-bold text-blue-400">613.2</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm">用电量</span>
                  <span class="text-lg font-bold text-red-400">23.3</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm">储能充电</span>
                  <span class="text-lg font-bold text-green-400">23.3</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm">储能放电</span>
                  <span class="text-lg font-bold text-yellow-400">19.4</span>
                </div>
              </div>
            </div>
          </ItemWrap>

          <!-- 设备运行状态 -->
          <ItemWrap title="设备运行状态" class="flex-1">
            <div class="h-full p-4 text-white">
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm">光伏逆变器</span>
                  <span class="text-green-400">●</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">风机控制器</span>
                  <span class="text-green-400">●</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">储能系统</span>
                  <span class="text-green-400">●</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">配电系统</span>
                  <span class="text-green-400">●</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm">监控系统</span>
                  <span class="text-green-400">●</span>
                </div>
              </div>
            </div>
          </ItemWrap>

          <!-- 预警信息统计 -->
          <ItemWrap title="预警信息统计" class="h-48">
            <div class="h-full p-4 text-white">
              <div class="grid h-full grid-cols-2 gap-4">
                <div class="text-center">
                  <div class="text-2xl font-bold text-red-400">0</div>
                  <div class="text-xs">严重告警</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-yellow-400">2</div>
                  <div class="text-xs">一般告警</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-blue-400">5</div>
                  <div class="text-xs">提示信息</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold text-green-400">98%</div>
                  <div class="text-xs">系统可用率</div>
                </div>
              </div>
            </div>
          </ItemWrap>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#root-visualizer-container {
  background-color: #000d86;
  //background-image: url('./assets/background@2x.png');
}

#visualizer-container {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: column;
}

// 左侧面板样式
.dashboard-left-panel {
  @apply relative box-border flex shrink-0 flex-col ml-[15%];
}

// 中间面板样式
.dashboard-center-panel {
}

// 右侧面板样式
.dashboard-right-panel {
  @apply relative box-border flex shrink-0 flex-col mr-[15%];
}
</style>
