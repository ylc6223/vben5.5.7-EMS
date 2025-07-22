<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { ElButton, ElInput, ElPopover } from 'element-plus';

// 定义选项类型
interface Option {
  label: string;
  value: number | string;
  disabled?: boolean;
  [key: string]: any;
}

// 数据源函数类型
type DataSource = (keyword?: string) => Option[] | Promise<Option[]>;

// 定义组件属性
interface Props {
  modelValue?: number | string;
  options?: Option[];
  dataSource?: DataSource;
  placeholder?: string;
  searchPlaceholder?: string;
  buttonText?: string;
  buttonType?:
    | 'danger'
    | 'default'
    | 'info'
    | 'primary'
    | 'success'
    | 'text'
    | 'warning';
  buttonSize?: 'default' | 'large' | 'small';
  placement?:
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
    | 'left'
    | 'left-end'
    | 'left-start'
    | 'right'
    | 'right-end'
    | 'right-start'
    | 'top'
    | 'top-end'
    | 'top-start';
  trigger?: 'click' | 'focus' | 'hover' | 'manual';
  popoverWidth?: number | string;
  disabled?: boolean;
  filterable?: boolean;
  remote?: boolean;
  noDataText?: string;
  loadingText?: string;
  debounceDelay?: number;
  minSearchLength?: number;
}

// 定义事件
interface Emits {
  (e: 'update:modelValue', value: number | string): void;
  (e: 'change', value: number | string, option: Option): void;
  (e: 'search', keyword: string): void;
  (e: 'focus'): void;
  (e: 'blur'): void;
  (e: 'visible-change', visible: boolean): void;
  (e: 'load-error', error: any): void;
}

// 设置默认值
const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: '请选择',
  searchPlaceholder: '请输入搜索关键词',
  buttonType: 'default',
  buttonSize: 'default',
  placement: 'bottom-start',
  trigger: 'click',
  popoverWidth: 300,
  disabled: false,
  filterable: true,
  remote: false,
  noDataText: '暂无数据',
  loadingText: '加载中...',
  debounceDelay: 300,
  minSearchLength: 0,
});

const emit = defineEmits<Emits>();

// 响应式数据
const visible = ref(false);
const searchKeyword = ref('');
const highlightedIndex = ref(-1);
const optionsListRef = ref<HTMLElement>();
const loading = ref(false);
const internalOptions = ref<Option[]>([]);
const searchCache = ref(new Map<string, Option[]>());
const debounceTimer = ref<NodeJS.Timeout | null>(null);

// 计算属性
const currentOptions = computed(() => {
  return props.remote || props.dataSource
    ? internalOptions.value
    : props.options;
});

const selectedOption = computed(() => {
  return currentOptions.value.find(
    (option) => option.value === props.modelValue,
  );
});

const selectedLabel = computed(() => {
  return selectedOption.value?.label || '';
});

// 按钮显示文本
const displayText = computed(() => {
  if (props.buttonText) {
    return props.buttonText;
  }
  if (selectedLabel.value) {
    return selectedLabel.value;
  }
  // 如果没有选中项且有选项，显示第一项
  if (currentOptions.value.length > 0) {
    return currentOptions.value[0].label;
  }
  return props.placeholder;
});

const filteredOptions = computed(() => {
  // 如果是远程搜索模式，直接返回内部选项
  if (props.remote || props.dataSource) {
    return internalOptions.value.filter((option) => !option.disabled);
  }

  // 本地过滤模式
  if (!props.filterable || !searchKeyword.value) {
    return currentOptions.value.filter((option) => !option.disabled);
  }

  return currentOptions.value.filter((option) => {
    if (option.disabled) return false;
    return option.label
      .toLowerCase()
      .includes(searchKeyword.value.toLowerCase());
  });
});

// 方法
const handleVisibleChange = (val: boolean) => {
  visible.value = val;
  if (val) {
    searchKeyword.value = '';
    highlightedIndex.value = -1;
    nextTick(() => {
      // 聚焦搜索框
      const input = document.querySelector(
        '.search-selector-content .el-input__inner',
      ) as HTMLInputElement;
      input?.focus();
    });
  }
  emit('visible-change', val);
};

const handleButtonFocus = () => {
  emit('focus');
};

const handleButtonBlur = () => {
  emit('blur');
};

const handleSearch = (keyword: string) => {
  highlightedIndex.value = -1;
  emit('search', keyword);

  // 如果是远程搜索或有数据源，执行搜索
  if (props.remote || props.dataSource) {
    performSearch(keyword);
  }
};

// 执行搜索
const performSearch = async (keyword: string) => {
  // 清除之前的防抖定时器
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value);
  }

  // 如果关键词长度小于最小搜索长度，清空结果
  if (keyword.length < props.minSearchLength) {
    internalOptions.value = [];
    return;
  }

  // 检查缓存
  const cacheKey = keyword.toLowerCase();
  if (searchCache.value.has(cacheKey)) {
    internalOptions.value = searchCache.value.get(cacheKey) || [];
    return;
  }

  // 防抖搜索
  debounceTimer.value = setTimeout(async () => {
    if (!props.dataSource) return;

    loading.value = true;
    try {
      const result = await props.dataSource(keyword);
      const options = Array.isArray(result) ? result : [];

      // 缓存结果
      searchCache.value.set(cacheKey, options);
      internalOptions.value = options;
    } catch (error) {
      console.error('搜索失败:', error);
      emit('load-error', error);
      internalOptions.value = [];
    } finally {
      loading.value = false;
    }
  }, props.debounceDelay);
};

const handleOptionClick = (option: Option) => {
  if (option.disabled) return;

  emit('update:modelValue', option.value);
  emit('change', option.value, option);
  visible.value = false;
};

const handleEnterSelect = () => {
  if (
    highlightedIndex.value >= 0 &&
    highlightedIndex.value < filteredOptions.value.length
  ) {
    const option = filteredOptions.value[highlightedIndex.value];
    handleOptionClick(option);
  }
};

const handleKeyUp = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
    scrollToHighlighted();
  }
};

const handleKeyDown = () => {
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
    scrollToHighlighted();
  }
};

const handleEscape = () => {
  visible.value = false;
};

const scrollToHighlighted = () => {
  nextTick(() => {
    const highlightedElement = optionsListRef.value?.querySelector(
      '.option-item-highlighted',
    ) as HTMLElement;
    if (highlightedElement) {
      highlightedElement.scrollIntoView({ block: 'nearest' });
    }
  });
};

// 监听选项变化，重置高亮索引
watch(
  () => filteredOptions.value,
  () => {
    highlightedIndex.value = -1;
  },
);

// 初始化数据
const initializeData = async () => {
  if (props.dataSource && !props.remote) {
    // 如果有数据源且不是远程模式，初始化时加载数据
    try {
      loading.value = true;
      const result = await props.dataSource('');
      const options = Array.isArray(result) ? result : [];
      internalOptions.value = options;

      // 缓存初始数据
      searchCache.value.set('', options);

      // 如果没有选中值，选择第一项
      if (props.modelValue === undefined && options.length > 0) {
        const firstOption = options[0];
        if (!firstOption.disabled) {
          console.log('Auto-selecting first enterprise:', firstOption);
          emit('update:modelValue', firstOption.value);
          emit('change', firstOption.value, firstOption);
        }
      }
    } catch (error) {
      console.error('初始化数据失败:', error);
      emit('load-error', error);
    } finally {
      loading.value = false;
    }
  } else if (
    !props.dataSource && // 使用静态选项
    props.modelValue === undefined &&
    currentOptions.value.length > 0
  ) {
    const firstOption = currentOptions.value[0];
    if (!firstOption.disabled) {
      console.log('Auto-selecting first enterprise (static):', firstOption);
      emit('update:modelValue', firstOption.value);
      emit('change', firstOption.value, firstOption);
    }
  }
};

// 初始化
onMounted(() => {
  initializeData();
});

// 监听选项变化
watch(
  () => props.options,
  (newOptions) => {
    if (!props.dataSource && newOptions.length > 0) {
      const currentSelected = newOptions.find(
        (option) => option.value === props.modelValue,
      );
      // 如果当前选中项不存在，且没有明确的 modelValue，选择第一项
      if (!currentSelected && props.modelValue === undefined) {
        const firstOption = newOptions[0];
        if (!firstOption.disabled) {
          console.log(
            'Auto-selecting first enterprise (options changed):',
            firstOption,
          );
          emit('update:modelValue', firstOption.value);
          emit('change', firstOption.value, firstOption);
        }
      }
    }
  },
  { immediate: true },
);

// 监听数据源变化
watch(
  () => props.dataSource,
  () => {
    // 清空缓存和内部选项
    searchCache.value.clear();
    internalOptions.value = [];
    searchKeyword.value = '';

    // 重新初始化
    initializeData();
  },
);
</script>

<template>
  <div class="search-selector">
    <ElPopover
      :placement="placement"
      :trigger="trigger"
      :width="popoverWidth"
      :visible="visible"
      @update:visible="handleVisibleChange"
    >
      <template #reference>
        <ElButton
          :type="buttonType"
          :size="buttonSize"
          :disabled="disabled"
          class="search-selector-button"
          @focus="handleButtonFocus"
          @blur="handleButtonBlur"
        >
          {{ displayText }}
        </ElButton>
      </template>

      <template #default>
        <div class="search-selector-content">
          <!-- 搜索框 -->
          <div class="search-input-wrapper">
            <ElInput
              v-model="searchKeyword"
              :placeholder="searchPlaceholder"
              size="default"
              clearable
              prefix-icon="Search"
              class="search-input"
              @input="handleSearch"
              @keydown.enter="handleEnterSelect"
              @keydown.up="handleKeyUp"
              @keydown.down="handleKeyDown"
              @keydown.esc="handleEscape"
            />
          </div>

          <!-- 下拉列表 -->
          <div class="options-list" ref="optionsListRef">
            <!-- 加载状态 -->
            <div v-if="loading" class="loading-state">
              <div class="loading-spinner"></div>
              <span class="loading-text">{{ loadingText }}</span>
            </div>

            <!-- 选项列表 -->
            <template v-else-if="filteredOptions.length > 0">
              <div
                v-for="(option, index) in filteredOptions"
                :key="option.value"
                class="option-item"
                :class="[
                  {
                    'option-item-selected': option.value === modelValue,
                    'option-item-highlighted': index === highlightedIndex,
                  },
                ]"
                @click="handleOptionClick(option)"
                @mouseenter="highlightedIndex = index"
              >
                <slot name="option" :option="option" :index="index">
                  <div class="option-content">
                    <span class="option-label">{{ option.label }}</span>
                  </div>
                </slot>
              </div>
            </template>

            <!-- 无数据提示 -->
            <div v-else class="no-data-state">
              <div class="no-data-icon">
                <svg
                  class="h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                  />
                </svg>
              </div>
              <span class="no-data-text">{{ noDataText }}</span>
            </div>
          </div>
        </div>
      </template>
    </ElPopover>
  </div>
</template>

<style scoped>
/* 使用项目的设计令牌和样式系统 */
.search-selector {
  @apply inline-block w-full;
}

.search-selector-button {
  @apply w-full min-w-0;
  /* 确保按钮文本可以正常截断 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-selector-content {
  @apply py-2;
}

.search-input-wrapper {
  @apply px-3 pb-2;
}

/* 搜索输入框样式 */
.search-input :deep(.el-input__wrapper) {
  @apply bg-background border-input rounded-md transition-colors;
  border-radius: calc(var(--radius) - 2px);
}

.search-input :deep(.el-input__wrapper:hover) {
  @apply border-ring/20;
}

.search-input :deep(.el-input__wrapper.is-focus) {
  @apply border-ring ring-ring/20 ring-2;
}

.search-input :deep(.el-input__inner) {
  @apply text-foreground placeholder:text-muted-foreground;
}

/* 选项列表容器 */
.options-list {
  @apply max-h-64 overflow-y-auto;
}

/* 选项项样式 */
.option-item {
  @apply relative cursor-pointer px-3 py-2.5 transition-all duration-200 ease-in-out;
  @apply text-foreground text-sm;
  @apply border-border/50 border-b last:border-b-0;
}

.option-item:hover,
.option-item-highlighted {
  @apply bg-accent text-accent-foreground;
}

.option-item-selected {
  @apply bg-primary/10 text-primary font-medium;
  @apply border-l-primary border-l-2;
}

.option-item-selected:hover,
.option-item-selected.option-item-highlighted {
  @apply bg-primary/15;
}

/* 选项内容 */
.option-content {
  @apply flex items-center justify-between;
}

.option-label {
  @apply flex-1 truncate;
}

/* 加载状态 */
.loading-state {
  @apply flex items-center justify-center gap-3 px-3 py-8;
  @apply text-muted-foreground;
}

.loading-spinner {
  @apply border-primary/30 border-t-primary h-4 w-4 animate-spin rounded-full border-2;
}

.loading-text {
  @apply text-sm font-medium;
}

/* 无数据状态 */
.no-data-state {
  @apply flex flex-col items-center justify-center gap-3 px-3 py-8;
  @apply text-muted-foreground;
}

.no-data-icon {
  @apply text-muted-foreground/60;
}

.no-data-text {
  @apply text-sm font-medium;
}

/* 滚动条样式 - 使用项目主题色 */
.options-list::-webkit-scrollbar {
  @apply w-1.5;
}

.options-list::-webkit-scrollbar-track {
  @apply bg-muted rounded-full;
}

.options-list::-webkit-scrollbar-thumb {
  @apply bg-muted-foreground/30 rounded-full;
}

.options-list::-webkit-scrollbar-thumb:hover {
  @apply bg-muted-foreground/50;
}

/* 深色模式适配 */
.dark .search-input :deep(.el-input__wrapper) {
  @apply bg-background border-border;
}

.dark .option-item {
  @apply border-border/30;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .search-selector-content {
    @apply py-1;
  }

  .search-input-wrapper {
    @apply px-2 pb-1;
  }

  .option-item {
    @apply px-2 py-2;
  }
}

/* 动画效果 */
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

/* 聚焦状态增强 */
.option-item:focus-visible {
  @apply ring-ring ring-offset-background outline-none ring-2 ring-offset-2;
}

/* 选中状态的视觉反馈 */
.option-item-selected::before {
  content: '';
  @apply bg-primary absolute bottom-0 left-0 top-0 w-1;
}
</style>
