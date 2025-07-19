<template>
  <div class="bg-card text-card-foreground border-border rounded-xl border p-4 h-full flex flex-col">
    <!-- 标题和图标 -->
    <div :class="['flex items-center justify-between mb-3 pb-3 border-b-2', borderColor]">
      <h3 class="font-semibold text-base">{{ title }}</h3>
      <span :class="[iconClass, color, 'text-xl']"></span>
    </div>

    <!-- 数据列表 -->
    <div class="flex-1 space-y-2 pt-1">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span class="text-sm text-gray-600 font-medium">{{ item.label }}</span>
        <div class="text-right">
          <span class="font-semibold text-base text-gray-800">{{ item.value }}</span>
          <span class="text-xs text-gray-500 ml-1">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DataItem {
  label: string;
  value: string;
  unit: string;
}

interface Props {
  title: string;
  data: DataItem[];
  iconClass: string;
  color?: string;
  borderColor?: string;
}

defineOptions({
  name: 'EnergyDataCard',
});

withDefaults(defineProps<Props>(), {
  color: 'text-gray-500',
  borderColor: 'border-gray-200',
});
</script>
