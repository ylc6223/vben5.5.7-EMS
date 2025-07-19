<template>
  <div class="flex h-full flex-col gap-4 p-5">
    <!-- 上面一行：两个卡片，左边1/3，右边2/3 - 占据48%高度 -->
    <div class="flex h-[48%] flex-col justify-between gap-4 lg:flex-row">
      <AnalysisChartCard class="flex h-full w-full flex-col lg:w-1/3" title="企业信息">
        <div class="flex flex-1 flex-col">
          <!-- 企业信息容器 -->
          <div class="bg-gray-50 rounded-lg p-4 space-y-3">
            <!-- 企业选择 -->
            <div class="flex items-center space-x-3">
              <span class="icon-[mdi--office-building] text-xl text-blue-600 flex-shrink-0"></span>
              <div class="flex items-center space-x-2 min-w-0 flex-1 overflow-hidden">
                <span class="text-sm text-gray-600 font-medium whitespace-nowrap">企业:</span>
                <div class="flex-1 min-w-48 h-10">
                  <SearchSelector
                    v-model="selectedCompany"
                    :data-source="searchCompanies"
                    placeholder="请选择企业"
                    search-placeholder="搜索企业名称、类型、地址或行业"
                    :popover-width="500"
                    :debounce-delay="300"
                    :min-search-length="0"
                    remote
                    @change="handleCompanyChange"
                    @load-error="handleLoadError"
                    class="w-full h-full"
                  >
                    <template #option="{ option }">
                      <div class="company-option">
                        <div class="company-header">
                          <div class="company-name">{{ option.label }}</div>
                          <div class="company-badges">
                            <span class="company-type-badge" :class="getTypeClass(option.type)">
                              {{ option.type }}
                            </span>
                            <span class="company-scale-badge" :class="getScaleClass(option.scale)">
                              {{ option.scale }}
                            </span>
                          </div>
                        </div>
                        <div class="company-meta">
                          <div class="company-info-row">
                            <span class="company-code">{{ option.code }}</span>
                            <span class="company-date">{{ option.establishDate }}</span>
                          </div>
                          <div class="company-industry">{{ option.industry }}</div>
                        </div>
                      </div>
                    </template>
                  </SearchSelector>
                </div>
              </div>
            </div>

            <!-- 企业详细信息 -->
            <div v-if="currentCompanyInfo" class="space-y-3">
              <!-- 信用编码 -->
              <div class="flex items-center space-x-3">
                <span class="icon-[mdi--card-account-details] text-xl text-green-600 flex-shrink-0"></span>
                <div class="flex items-center space-x-2 min-w-0 flex-1 overflow-hidden">
                  <span class="text-sm text-gray-600 font-medium whitespace-nowrap">信用编码:</span>
                  <span class="font-semibold text-base text-gray-800 font-mono truncate">{{ currentCompanyInfo.code }}</span>
                </div>
              </div>

              <!-- 企业类型和规模 -->
              <div class="flex items-center space-x-3">
                <span class="icon-[mdi--domain] text-xl text-purple-600 flex-shrink-0"></span>
                <div class="flex items-center space-x-2 min-w-0 flex-1 overflow-hidden">
                  <span class="text-sm text-gray-600 font-medium whitespace-nowrap">类型:</span>
                  <span class="font-semibold text-base text-gray-800">{{ currentCompanyInfo.type }}</span>
                  <span class="text-sm text-gray-500">|</span>
                  <span class="font-semibold text-base text-gray-800">{{ currentCompanyInfo.scale }}企业</span>
                </div>
              </div>

              <!-- 成立时间和行业 -->
              <div class="flex items-center space-x-3">
                <span class="icon-[mdi--calendar] text-xl text-orange-600 flex-shrink-0"></span>
                <div class="flex items-center space-x-2 min-w-0 flex-1 overflow-hidden">
                  <span class="text-sm text-gray-600 font-medium whitespace-nowrap">成立:</span>
                  <span class="font-semibold text-base text-gray-800">{{ currentCompanyInfo.establishDate }}</span>
                  <span class="text-sm text-gray-500">|</span>
                  <span class="text-sm text-gray-600">{{ currentCompanyInfo.industry }}</span>
                </div>
              </div>

              <!-- 地址 -->
              <div class="flex items-start space-x-3">
                <span class="icon-[mdi--map-marker] text-xl text-red-500 flex-shrink-0 mt-0.5"></span>
                <div class="flex items-start space-x-2 min-w-0 flex-1 overflow-hidden">
                  <span class="text-sm text-gray-600 font-medium whitespace-nowrap mt-0.5">地址:</span>
                  <span class="font-semibold text-base text-gray-800 leading-relaxed line-clamp-2">
                    {{ currentCompanyInfo.address }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 未选择企业时的提示 -->
            <div v-else class="flex items-center justify-center py-8">
              <div class="text-center text-gray-500 flex items-center">
                <span class="icon-[mdi--information-outline] text-3xl block"></span>
                <p class="ml-1 text-sm">请选择企业查看详细信息</p>
              </div>
            </div>
          </div>

          <CompanyMetricsAnalysis
            title="企业指标分析"
            :station-normal="82"
            :station-abnormal="18"
            :gateway-normal="91"
            :gateway-abnormal="9"
            :monitor-normal="88"
            :monitor-abnormal="12"
            :inverter-normal="76"
            :inverter-abnormal="24"
            :charging-normal="94"
            :charging-abnormal="6"
          />
        </div>
      </AnalysisChartCard>

      <AnalysisChartCard class="flex h-full w-full flex-col lg:w-2/3" title="企业用能信息">
        <div class="flex flex-1">
          <div class="grid grid-cols-2 gap-4 w-full lg:grid-cols-3">
            <!-- 光伏卡片 -->
            <EnergyDataCard
              title="光伏"
              :data="[
                { label: '当日发电量', value: currentEnergyData.solar.generation.toLocaleString(), unit: 'kWh' },
                { label: '当日并网量', value: currentEnergyData.solar.gridTied.toLocaleString(), unit: 'kWh' }
              ]"
              icon-class="icon-[mdi--solar-power]"
              color="text-yellow-500"
              border-color="border-yellow-400"
            />

            <!-- 储能卡片 -->
            <EnergyDataCard
              title="储能"
              :data="[
                { label: '当日充电量', value: currentEnergyData.storage.charging.toLocaleString(), unit: 'kWh' },
                { label: '当日放电量', value: currentEnergyData.storage.discharging.toLocaleString(), unit: 'kWh' }
              ]"
              icon-class="icon-[mdi--battery-charging]"
              color="text-green-500"
              border-color="border-green-400"
            />

            <!-- 能耗卡片 -->
            <EnergyDataCard
              title="能耗"
              :data="[
                { label: '当日用电量', value: currentEnergyData.consumption.electricity.toLocaleString(), unit: 'kWh' },
                { label: '当日用水量', value: currentEnergyData.consumption.water.toLocaleString(), unit: 'm³' }
              ]"
              icon-class="icon-[mdi--flash]"
              color="text-blue-500"
              border-color="border-blue-400"
            />

            <!-- 社会效益卡片 -->
            <EnergyDataCard
              title="社会效益"
              :data="[
                { label: '标准煤', value: currentEnergyData.social.coal.toString(), unit: 't' },
                { label: '减排量', value: currentEnergyData.social.emission.toString(), unit: 'tCO₂' }
              ]"
              icon-class="icon-[mdi--leaf]"
              color="text-emerald-500"
              border-color="border-emerald-400"
            />

            <!-- 经济收益卡片 -->
            <EnergyDataCard
              title="经济收益"
              :data="[
                { label: '光伏收益', value: currentEnergyData.economic.solar.toLocaleString(), unit: '元' },
                { label: '储能收益', value: currentEnergyData.economic.storage.toLocaleString(), unit: '元' },
                { label: '充电桩收益', value: currentEnergyData.economic.charging.toLocaleString(), unit: '元' }
              ]"
              icon-class="icon-[mdi--currency-cny]"
              color="text-orange-500"
              border-color="border-orange-400"
            />

            <!-- 总览卡片 -->
            <EnergyDataCard
              title="总览"
              :data="[
                {
                  label: '总节能量',
                  value: (currentEnergyData.solar.generation + currentEnergyData.storage.discharging).toLocaleString(),
                  unit: 'kWh'
                },
                {
                  label: '总收益',
                  value: (currentEnergyData.economic.solar + currentEnergyData.economic.storage + currentEnergyData.economic.charging).toLocaleString(),
                  unit: '元'
                }
              ]"
              icon-class="icon-[mdi--chart-line]"
              color="text-purple-500"
              border-color="border-purple-400"
            />
          </div>
        </div>
      </AnalysisChartCard>
    </div>

    <!-- 下面一行：三个盒子均分 - 占据50%高度 -->
    <div class="flex h-[50%] flex-col justify-between gap-4 md:flex-row">
      <AnalysisChartCard class="flex h-full w-full flex-col md:w-1/3" title="光伏发电趋势">
        <div class="flex-1 h-full">
          <EnergyChart1 />
        </div>
      </AnalysisChartCard>

      <AnalysisChartCard class="flex h-full w-full flex-col md:w-1/3" title="储能放电趋势">
        <div class="flex-1 h-full">
          <EnergyChart2 />
        </div>
      </AnalysisChartCard>

      <AnalysisChartCard class="flex h-full w-full flex-col md:w-1/3" title="用电趋势">
        <div class="flex-1 h-full">
          <EnergyChart3 />
        </div>
      </AnalysisChartCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { AnalysisChartCard } from "@vben/common-ui";

import EnergyChart1 from "./components/solar-generation-chart.vue";
import EnergyChart2 from "./components/energy-storage-chart.vue";
import EnergyChart3 from "./components/power-consumption-chart.vue";
import EnergyDataCard from "./components/EnergyDataCard.vue";
import SearchSelector from "./components/SearchSelector.vue";
import CompanyMetricsAnalysis from "./components/CompanyMetricsAnalysis.vue";
import { searchCompanies, getCompanyById, type Company } from "./services/companyService";

// 企业选择数据 - 不设置默认值，让组件自动选择第一项
const selectedCompany = ref<string>();
const currentCompanyInfo = ref<Company | null>(null);

// 计算企业规模样式类
const getScaleClass = (scale?: string) => {
  switch (scale) {
    case '大型':
      return 'scale-large';
    case '中型':
      return 'scale-medium';
    case '小型':
      return 'scale-small';
    default:
      return '';
  }
};

// 计算企业类型样式类
const getTypeClass = (type?: string) => {
  const typeMap: Record<string, string> = {
    '新能源': 'type-new-energy',
    '光伏': 'type-solar',
    '储能': 'type-storage',
    '风电': 'type-wind',
    '水电': 'type-hydro',
    '氢能': 'type-hydrogen',
    '智能电网': 'type-smart-grid',
    '分布式能源': 'type-distributed',
    '节能环保': 'type-environmental',
    '海洋能源': 'type-marine',
    '绿色建筑': 'type-green-building',
    '生物质能源': 'type-biomass',
    '清洁能源': 'type-clean',
    '可再生能源': 'type-renewable',
    '能源管理': 'type-management',
    '环保能源': 'type-eco',
    '绿色电力': 'type-green-power'
  };
  return typeMap[type || ''] || 'type-default';
};

// 模拟能源数据（根据企业类型动态生成）
const generateEnergyData = (companyInfo: Company | null) => {
  if (!companyInfo) return getDefaultEnergyData();

  const baseData = getDefaultEnergyData();
  const multiplier = getMultiplierByScale(companyInfo.scale);
  const typeBonus = getTypeBonusByType(companyInfo.type);

  return {
    solar: {
      generation: Math.round((baseData.solar.generation * multiplier * typeBonus.solar) + Math.random() * 200),
      gridTied: Math.round((baseData.solar.gridTied * multiplier * typeBonus.solar) + Math.random() * 150)
    },
    storage: {
      charging: Math.round((baseData.storage.charging * multiplier * typeBonus.storage) + Math.random() * 100),
      discharging: Math.round((baseData.storage.discharging * multiplier * typeBonus.storage) + Math.random() * 80)
    },
    consumption: {
      electricity: Math.round((baseData.consumption.electricity * multiplier) + Math.random() * 300),
      water: Math.round((baseData.consumption.water * multiplier) + Math.random() * 20)
    },
    social: {
      coal: Number(((baseData.social.coal * multiplier) + Math.random() * 0.5).toFixed(2)),
      emission: Number(((baseData.social.emission * multiplier) + Math.random() * 1).toFixed(2))
    },
    economic: {
      solar: Math.round((baseData.economic.solar * multiplier * typeBonus.solar) + Math.random() * 500),
      storage: Math.round((baseData.economic.storage * multiplier * typeBonus.storage) + Math.random() * 300),
      charging: Math.round((baseData.economic.charging * multiplier) + Math.random() * 400)
    }
  };
};

// 默认能源数据
const getDefaultEnergyData = () => ({
  solar: { generation: 1234, gridTied: 1100 },
  storage: { charging: 856, discharging: 742 },
  consumption: { electricity: 2156, water: 45 },
  social: { coal: 0.86, emission: 2.14 },
  economic: { solar: 1234, storage: 567, charging: 890 }
});

// 根据企业规模获取倍数
const getMultiplierByScale = (scale?: string) => {
  switch (scale) {
    case '大型': return 1.5;
    case '中型': return 1.0;
    case '小型': return 0.6;
    default: return 1.0;
  }
};

// 根据企业类型获取加成
const getTypeBonusByType = (type?: string) => {
  const bonuses: Record<string, { solar: number; storage: number }> = {
    '光伏': { solar: 2.0, storage: 1.2 },
    '储能': { solar: 1.2, storage: 2.0 },
    '新能源': { solar: 1.5, storage: 1.5 },
    '风电': { solar: 0.8, storage: 1.3 },
    '水电': { solar: 0.5, storage: 1.1 },
    '氢能': { solar: 1.3, storage: 1.8 },
    '智能电网': { solar: 1.1, storage: 1.4 },
    '分布式能源': { solar: 1.4, storage: 1.6 }
  };
  return bonuses[type || ''] || { solar: 1.0, storage: 1.0 };
};

// 当前能源数据
const currentEnergyData = ref(getDefaultEnergyData());

// 处理企业选择变化
const handleCompanyChange = async (value: string | number, option: Company) => {
  console.log("选择的企业:", option.label, "值:", value);
  console.log("企业详情:", option);

  // 更新当前企业信息
  currentCompanyInfo.value = option;

  // 生成对应的能源数据
  currentEnergyData.value = generateEnergyData(option);

  // 这里可以添加更多切换企业后的数据更新逻辑
  // 例如：刷新图表数据、调用API获取实际数据等
};

// 处理加载错误
const handleLoadError = (error: any) => {
  console.error("加载企业数据失败:", error);
  // 这里可以添加错误处理逻辑，比如显示错误提示
};

// 监听企业选择变化，自动加载企业详情
watch(selectedCompany, async (newValue) => {
  if (newValue && typeof newValue === 'string') {
    try {
      const companyInfo = await getCompanyById(newValue);
      if (companyInfo) {
        currentCompanyInfo.value = companyInfo;
        currentEnergyData.value = generateEnergyData(companyInfo);
      }
    } catch (error) {
      console.error("获取企业详情失败:", error);
    }
  }
});

defineOptions({
  name: "EnergyOverview"
});
</script>

<style scoped>
/* 企业选项样式 - 符合项目设计系统 */
.company-option {
  @apply py-3 space-y-2;
}

.company-header {
  @apply flex justify-between items-start gap-3;
}

.company-name {
  @apply text-sm font-semibold text-foreground leading-tight flex-1;
  @apply truncate;
}

.company-badges {
  @apply flex gap-1.5 flex-shrink-0;
}

.company-type-badge,
.company-scale-badge {
  @apply px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap;
  border-radius: calc(var(--radius) - 2px);
}

/* 企业类型徽章样式 */
.type-new-energy { @apply bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300; }
.type-solar { @apply bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300; }
.type-storage { @apply bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300; }
.type-wind { @apply bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300; }
.type-hydro { @apply bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300; }
.type-hydrogen { @apply bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300; }
.type-smart-grid { @apply bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300; }
.type-distributed { @apply bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300; }
.type-environmental { @apply bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300; }
.type-marine { @apply bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300; }
.type-green-building { @apply bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300; }
.type-biomass { @apply bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300; }
.type-clean { @apply bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300; }
.type-renewable { @apply bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300; }
.type-management { @apply bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300; }
.type-eco { @apply bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300; }
.type-green-power { @apply bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300; }
.type-default { @apply bg-muted text-muted-foreground; }

/* 企业规模徽章样式 */
.scale-large {
  @apply bg-primary/10 text-primary border border-primary/20;
}

.scale-medium {
  @apply bg-secondary text-secondary-foreground border border-border;
}

.scale-small {
  @apply bg-muted text-muted-foreground border border-border;
}

.company-meta {
  @apply space-y-1.5;
}

.company-info-row {
  @apply flex justify-between items-center text-xs;
}

.company-code {
  @apply font-mono text-xs px-1.5 py-0.5 rounded;
  @apply bg-muted text-muted-foreground border border-border;
  border-radius: calc(var(--radius) - 4px);
}

.company-date {
  @apply text-xs text-muted-foreground;
}

.company-industry {
  @apply text-xs text-muted-foreground italic;
  @apply truncate;
}

/* 企业信息区域样式 */
.company-info-section {
  @apply transition-all duration-200 ease-in-out;
}

.company-info-section:hover {
  @apply bg-accent/50;
}

/* 响应式调整 */
@media (max-width: 640px) {
  .company-header {
    @apply flex-col items-start gap-2;
  }

  .company-badges {
    @apply flex-wrap;
  }

  .company-name {
    @apply text-xs;
  }

  .company-type-badge,
  .company-scale-badge {
    @apply text-xs px-1.5 py-0.5;
  }
}

/* 深色模式优化 */
.dark .company-option {
  @apply border-border/30;
}

.dark .company-code {
  @apply bg-muted/50 border-border/50;
}
</style>
