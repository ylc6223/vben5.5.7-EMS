# SearchSelector 组件

一个基于 Element Plus 的搜索选择器组件，封装了 el-popover，提供搜索框和下拉列表功能。

## 功能特性

- 🔍 支持本地和远程搜索过滤
- ⌨️ 支持键盘导航（上下箭头、回车选择、ESC关闭）
- 🎨 自定义按钮样式和弹出框位置
- 📱 响应式设计
- 🔧 高度可配置
- 🎯 自动选择第一项作为默认值
- 📝 按钮文本自动显示当前选中项
- 🚀 内置异步数据源支持
- ⚡ 搜索防抖和缓存机制
- 🔄 加载状态显示
- 🛡️ 错误处理机制

## 基本用法

### 静态选项模式

```vue
<template>
  <SearchSelector
    v-model="selectedValue"
    :options="options"
    placeholder="请选择"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchSelector from './components/SearchSelector.vue'

// 不需要设置初始值，组件会自动选择第一项
const selectedValue = ref()
const options = ref([
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' }
])

const handleChange = (value, option) => {
  console.log('选择了:', option.label)
}
</script>
```

### 异步数据源模式

```vue
<template>
  <SearchSelector
    v-model="selectedValue"
    :data-source="searchData"
    placeholder="请选择"
    search-placeholder="输入关键词搜索"
    remote
    :debounce-delay="300"
    @change="handleChange"
    @load-error="handleError"
  />
</template>

<script setup>
import { ref } from 'vue'
import SearchSelector from './components/SearchSelector.vue'

const selectedValue = ref()

// 异步数据源函数
const searchData = async (keyword) => {
  const response = await fetch(`/api/search?q=${keyword}`)
  const data = await response.json()
  return data.map(item => ({
    label: item.name,
    value: item.id,
    ...item
  }))
}

const handleChange = (value, option) => {
  console.log('选择了:', option.label)
}

const handleError = (error) => {
  console.error('搜索失败:', error)
}
</script>
```

## 默认行为

- **自动选择第一项**：如果没有传入 `modelValue` 且选项列表不为空，组件会自动选择第一个未禁用的选项作为默认值
- **按钮文本显示**：按钮文本的优先级为：`buttonText` > 当前选中项的 `label` > 第一项的 `label` > `placeholder`
- **选项变化处理**：当选项列表发生变化时，如果当前选中项不存在了，会重新选择第一项

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| modelValue | 绑定值 | string \| number | — | — |
| options | 静态选项数据 | Option[] | — | [] |
| dataSource | 异步数据源函数 | (keyword?: string) => Promise\<Option[]\> \| Option[] | — | — |
| placeholder | 按钮占位文本 | string | — | '请选择' |
| searchPlaceholder | 搜索框占位文本 | string | — | '请输入搜索关键词' |
| buttonText | 按钮显示文本 | string | — | — |
| buttonType | 按钮类型 | string | primary/success/warning/danger/info/text/default | 'default' |
| buttonSize | 按钮尺寸 | string | large/default/small | 'default' |
| placement | 弹出位置 | string | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | 'bottom-start' |
| trigger | 触发方式 | string | click/focus/hover/manual | 'focus' |
| popoverWidth | 弹出框宽度 | number \| string | — | 300 |
| disabled | 是否禁用 | boolean | — | false |
| filterable | 是否可搜索（本地模式） | boolean | — | true |
| remote | 是否远程搜索模式 | boolean | — | false |
| noDataText | 无数据时显示的文本 | string | — | '暂无数据' |
| loadingText | 加载时显示的文本 | string | — | '加载中...' |
| debounceDelay | 搜索防抖延迟（毫秒） | number | — | 300 |
| minSearchLength | 最小搜索长度 | number | — | 0 |

### Option 数据结构

```typescript
interface Option {
  label: string        // 显示文本
  value: string | number  // 选项值
  disabled?: boolean   // 是否禁用
  [key: string]: any   // 其他自定义属性
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 绑定值变化时触发 | (value: string \| number) |
| change | 选择项发生变化时触发 | (value: string \| number, option: Option) |
| search | 搜索关键词变化时触发 | (keyword: string) |
| focus | 按钮获得焦点时触发 | — |
| blur | 按钮失去焦点时触发 | — |
| visible-change | 弹出框显示状态变化时触发 | (visible: boolean) |
| load-error | 数据加载失败时触发 | (error: any) |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| option | 自定义选项内容 | { option: Option, index: number } |

## 高级用法

### 自定义选项内容

```vue
<template>
  <SearchSelector v-model="selectedValue" :options="options">
    <template #option="{ option }">
      <div class="custom-option">
        <span class="option-label">{{ option.label }}</span>
        <span class="option-desc">{{ option.description }}</span>
      </div>
    </template>
  </SearchSelector>
</template>
```

### 键盘操作

- `↑` / `↓` : 上下选择选项
- `Enter` : 选择当前高亮选项
- `Esc` : 关闭弹出框

## 样式定制

组件提供了完整的 CSS 类名，可以通过覆盖样式进行定制：

```css
.search-selector-button {
  /* 自定义按钮样式 */
}

.option-item {
  /* 自定义选项样式 */
}

.option-item-selected {
  /* 自定义选中状态样式 */
}

.option-item-highlighted {
  /* 自定义高亮状态样式 */
}
```
