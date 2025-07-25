<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { computed, useSlots } from 'vue';

interface Props {
  /**
   * 横屏
   */
  fullWidth: boolean;
  /**
   * 高度
   */
  height: number;
  /**
   * 是否移动端
   */
  isMobile: boolean;
  /**
   * 是否显示
   */
  show: boolean;
  /**
   * 侧边菜单宽度
   */
  sidebarWidth: number;
  /**
   * 主题
   */
  theme: string | undefined;
  /**
   * 宽度
   */
  width: string;
  /**
   * zIndex
   */
  zIndex: number;
}

const props = withDefaults(defineProps<Props>(), {});

const slots = useSlots();

const style = computed((): CSSProperties => {
  const { fullWidth, height, show } = props;
  const right = !show || !fullWidth ? undefined : 0;

  return {
    height: `${height}px`,
    marginTop: show ? 0 : `-${height}px`,
    right,
  };
});

const logoStyle = computed((): CSSProperties => {
  return {
    minWidth: `${props.isMobile ? 40 : props.sidebarWidth}px`,
  };
});
</script>

<template>
  <header
    v-if="!$attrs.preferences.header.useCustomHeader"
    :class="theme"
    :style="style"
    class="border-border bg-header top-0 flex w-full flex-[0_0_auto] items-center border-b pl-2 transition-[margin-top] duration-200"
  >
    <div v-if="slots.logo" :style="logoStyle">
      <slot name="logo"></slot>
    </div>

    <slot name="toggle-button"> </slot>

    <slot></slot>
  </header>
  <!-- 使用自定义header -->
  <header
    v-else
    :class="theme"
    :style="style"
    class="border-border bg-header top-0 flex w-full flex-[0_0_auto] flex-col border-b transition-[margin-top] duration-200 dark:[html[data-theme='tech-blue']_&]:border-[hsl(var(--border-bottom-color))]"
  >
    <div class="navbar flex items-center justify-between">
      <div class="flex items-center">
        <slot name="toggle-button"> </slot>
        <slot name="title">
          <h1
            class="text-foreground float-left overflow-hidden text-ellipsis whitespace-nowrap text-[26px] font-bold leading-[50px]"
          >
            {{ $attrs.preferences.app.headerTitle }}
          </h1>
        </slot>
      </div>
      <div class="flex">
        <slot></slot>
      </div>
    </div>
  </header>
</template>
<style lang="scss" scoped>
header {
  --border-bottom-color: var(--header-border);
}
</style>
