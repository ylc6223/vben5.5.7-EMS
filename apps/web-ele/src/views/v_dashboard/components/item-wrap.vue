<script setup lang="ts">
import { BorderBox8 as DvBorderBox8 } from '@kjgl77/datav-vue3';

const props = withDefaults(
  defineProps<{
    // 标题
    title: number | string;
  }>(),
  {
    title: '',
  },
);
</script>

<template>
  <DvBorderBox8 :dur="10">
    <div dv-bg>
      <slot></slot>
    </div>
  </DvBorderBox8>
</template>

<style scoped lang="scss"></style>
