<script setup lang="ts">
import { computed } from 'vue';

import { Page, SliderRotateCaptcha } from '@vben/common-ui';
import { preferences } from '@vben/preferences';
import { useUserStore } from '@vben/stores';

import { ElCard, ElMessage } from 'element-plus';

const userStore = useUserStore();
function handleSuccess() {
  ElMessage.success('success!');
}

const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar;
});
</script>

<template>
  <Page description="用于前端简单的拖动校验场景" title="滑块旋转校验">
    <ElCard class="mb-5">
      <template #header>基本示例</template>
      <div class="flex items-center justify-center p-4">
        <SliderRotateCaptcha :src="avatar" @success="handleSuccess" />
      </div>
    </ElCard>
  </Page>
</template>
