<script setup lang="ts">
import { Page, SliderTranslateCaptcha } from '@vben/common-ui';

import { ElCard, ElMessage } from 'element-plus';

function handleSuccess() {
  ElMessage.success('success!');
}
</script>

<template>
  <Page
    description="用于前端简单的拼图滑块水平拖动校验场景"
    title="拼图滑块校验"
  >
    <ElCard class="mb-5">
      <template #header>基本示例</template>
      <div class="flex items-center justify-center p-4">
        <SliderTranslateCaptcha
          src="https://unpkg.com/@vbenjs/static-source@0.1.7/source/pro-avatar.webp"
          :canvas-width="420"
          :canvas-height="420"
          @success="handleSuccess"
        />
      </div>
    </ElCard>
  </Page>
</template>
