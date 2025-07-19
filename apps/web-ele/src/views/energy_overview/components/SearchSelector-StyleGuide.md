# SearchSelector 组件样式指南

## 设计理念

SearchSelector 组件的样式设计遵循项目的 Shadcn UI 设计系统，确保与整个应用的视觉风格保持一致。

## 设计令牌

### 颜色系统
- **主色调**: 使用 `--primary` 和相关变体
- **背景色**: 使用 `--background`、`--card`、`--muted` 等语义化颜色
- **文本色**: 使用 `--foreground`、`--muted-foreground` 等
- **边框色**: 使用 `--border`、`--input` 等

### 圆角
- **主要圆角**: `var(--radius)` (8px)
- **小圆角**: `calc(var(--radius) - 2px)` (6px)
- **微圆角**: `calc(var(--radius) - 4px)` (4px)

### 间距
- 使用 Tailwind CSS 的间距系统
- 主要间距: `py-2.5`, `px-3`, `gap-3` 等

## 组件结构

### 1. 搜索输入框
```css
.search-input :deep(.el-input__wrapper) {
  @apply bg-background border-input rounded-md transition-colors;
  border-radius: calc(var(--radius) - 2px);
}
```

**特点**:
- 使用项目的输入框样式
- 聚焦时有环形高亮效果
- 支持深色模式

### 2. 选项列表
```css
.option-item {
  @apply relative px-3 py-2.5 cursor-pointer transition-all duration-200 ease-in-out;
  @apply text-sm text-foreground;
  @apply border-b border-border/50 last:border-b-0;
}
```

**特点**:
- 使用语义化颜色
- 平滑的过渡动画
- 选中状态有左侧边框指示器

### 3. 状态样式

#### 悬停状态
```css
.option-item:hover,
.option-item-highlighted {
  @apply bg-accent text-accent-foreground;
}
```

#### 选中状态
```css
.option-item-selected {
  @apply bg-primary/10 text-primary font-medium;
  @apply border-l-2 border-l-primary;
}
```

#### 加载状态
```css
.loading-state {
  @apply flex items-center justify-center gap-3 py-8 px-3;
  @apply text-muted-foreground;
}
```

## 企业选项样式

### 徽章系统
企业类型和规模使用不同的徽章样式：

#### 企业类型徽章
- **新能源**: 蓝色系 `bg-blue-100 text-blue-700`
- **光伏**: 黄色系 `bg-yellow-100 text-yellow-700`
- **储能**: 绿色系 `bg-green-100 text-green-700`
- **风电**: 紫色系 `bg-purple-100 text-purple-700`
- 等等...

#### 企业规模徽章
- **大型**: 主色调 `bg-primary/10 text-primary border border-primary/20`
- **中型**: 次要色 `bg-secondary text-secondary-foreground`
- **小型**: 静音色 `bg-muted text-muted-foreground`

### 信息层级
```css
.company-name {
  @apply text-sm font-semibold text-foreground leading-tight flex-1;
}

.company-code {
  @apply font-mono text-xs px-1.5 py-0.5 rounded;
  @apply bg-muted text-muted-foreground border border-border;
}

.company-industry {
  @apply text-xs text-muted-foreground italic;
}
```

## 响应式设计

### 移动端适配
```css
@media (max-width: 640px) {
  .company-header {
    @apply flex-col items-start gap-2;
  }
  
  .company-badges {
    @apply flex-wrap;
  }
}
```

## 深色模式支持

所有样式都支持深色模式，使用 Tailwind 的 `dark:` 前缀：

```css
.type-new-energy { 
  @apply bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300; 
}
```

## 动画效果

### 入场动画
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-selector-content {
  animation: fadeIn 0.2s ease-out;
}
```

### 加载动画
```css
.loading-spinner {
  @apply w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin;
}
```

## 可访问性

### 键盘导航
- 支持方向键导航
- 支持回车选择
- 支持 ESC 关闭

### 聚焦指示器
```css
.option-item:focus-visible {
  @apply outline-none ring-2 ring-ring ring-offset-2 ring-offset-background;
}
```

## 滚动条样式

```css
.options-list::-webkit-scrollbar {
  @apply w-1.5;
}

.options-list::-webkit-scrollbar-track {
  @apply bg-muted rounded-full;
}

.options-list::-webkit-scrollbar-thumb {
  @apply bg-muted-foreground/30 rounded-full;
}
```

## 最佳实践

1. **保持一致性**: 所有样式都使用项目的设计令牌
2. **语义化**: 使用语义化的 CSS 类名和颜色变量
3. **响应式**: 确保在不同屏幕尺寸下都有良好的体验
4. **可访问性**: 提供足够的对比度和键盘导航支持
5. **性能**: 使用 CSS 变换而非改变布局属性来实现动画

## 自定义指南

如需自定义样式，建议：

1. 使用项目的设计令牌而非硬编码值
2. 保持与现有组件的视觉一致性
3. 确保深色模式的兼容性
4. 测试响应式布局
5. 验证可访问性标准

这样的设计确保了 SearchSelector 组件与整个项目的设计系统完美融合，提供了一致、美观、易用的用户体验。
