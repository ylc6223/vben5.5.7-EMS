# 企业能源报表页面 ElTabs 实现记录

## 📋 实现概述

本次开发在企业能源报表页面中成功引入了 Element Plus 的 ElTabs 组件，实现了月报和年报的标签页布局，标签位置设置在左侧。

## 🎯 实现目标

1. **引入 ElTabs 组件** - 使用 Element Plus 的标签页组件
2. **左侧标签布局** - 通过 `tab-position="left"` 设置标签在左边
3. **双表格结构** - 每个标签页包含独立的表格组件
4. **保持原有功能** - 确保搜索、导出等功能正常工作

## 🔧 具体实现内容

### 1. 组件导入

**新增导入：**
```typescript
import { ref } from 'vue';
import { ElTabs, ElTabPane } from 'element-plus';

// 当前激活的标签页
const activeTab = ref('monthly');
```

### 2. 表格配置重构

**创建基础配置函数：**
```typescript
// 创建基础表格配置
const createGridOptions = () => ({
  columns: useColumns(),
  height: 'auto',
  keepSource: true,
  showFooter: true,
  // ... 其他配置
});
```

**创建独立的表格实例：**
```typescript
// 月报表格
const [MonthlyGrid, monthlyGridApi] = useVbenVxeGrid({
  formOptions,
  showSearchForm: true,
  gridOptions: {
    ...createGridOptions(),
    proxyConfig: {
      ajax: {
        query: async (_params: any, formValues: any) => {
          console.log('月报搜索参数:', formValues);
          // ... 查询逻辑
        },
      },
    },
  },
});

// 年报表格
const [YearlyGrid, yearlyGridApi] = useVbenVxeGrid({
  // 类似配置
});
```

### 3. 模板结构

**ElTabs 布局：**
```vue
<template>
  <Page auto-content-height>
    <ElTabs v-model="activeTab" tab-position="left" class="energy-report-tabs">
      <ElTabPane label="月报" name="monthly">
        <MonthlyGrid
          :table-title="$t('system.energyReport.title') + ' - 月报'"
          :table-title-help="$t('system.energyReport.description')"
        />
      </ElTabPane>
      <ElTabPane label="年报" name="yearly">
        <YearlyGrid
          :table-title="$t('system.energyReport.title') + ' - 年报'"
          :table-title-help="$t('system.energyReport.description')"
        />
      </ElTabPane>
    </ElTabs>
  </Page>
</template>
```

### 4. 样式优化

**ElTabs 样式：**
```scss
// ElTabs 样式优化
.energy-report-tabs {
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
```

### 5. 功能增强

**刷新功能适配：**
```typescript
function onRefresh() {
  if (activeTab.value === 'monthly') {
    monthlyGridApi.query();
  } else {
    yearlyGridApi.query();
  }
}
```

## ✅ 实现效果

1. **✅ 标签页布局** - 成功实现左侧标签页布局
2. **✅ 双表格结构** - 月报和年报各有独立的表格
3. **✅ 样式统一** - 与项目设计系统保持一致
4. **✅ 功能完整** - 搜索、导出、刷新等功能正常
5. **✅ 响应式设计** - 支持不同屏幕尺寸

## 🔍 技术要点

### Element Plus 组件使用
- 使用 `ElTabs` 和 `ElTabPane` 组件
- 通过 `tab-position="left"` 设置左侧标签
- 使用 `v-model` 绑定当前激活标签

### VXE Table 集成
- 每个标签页使用独立的 `useVbenVxeGrid` 实例
- 保持原有的表单搜索和数据处理逻辑
- 支持独立的数据查询和表尾合计

### 样式系统
- 使用 Tailwind CSS 类名
- 遵循项目设计系统变量
- 支持深色模式适配

## 📁 相关文件

| 文件路径 | 说明 |
|---------|------|
| `apps/web-ele/src/views/comprehensive_reports/enterprise_energy_report/index.vue` | 主页面组件 |
| `apps/web-ele/src/views/comprehensive_reports/enterprise_energy_report/data.ts` | 表格列配置 |
| `apps/web-ele/src/api/energy/report.ts` | API 接口定义 |

## 🚀 后续优化建议

1. **数据源差异化** - 为月报和年报配置不同的 API 接口
2. **表格配置优化** - 根据报表类型调整列配置
3. **缓存机制** - 添加标签页切换时的数据缓存
4. **加载状态** - 优化标签页切换时的加载体验

## 📝 开发总结

本次实现成功将单一表格页面升级为带有标签页的多表格布局，提升了用户体验和页面的功能性。通过使用 Element Plus 的 ElTabs 组件，实现了清晰的月报/年报分类展示，同时保持了原有的所有功能特性。
