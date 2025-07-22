<script lang="ts" setup>
import { Loading, Page, Spinner } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { refAutoReset } from '@vueuse/core';
import { ElButton, ElCard, ElLoading } from 'element-plus';

const spinning = refAutoReset(false, 3000);
const loading = refAutoReset(false, 3000);

const spinningV = refAutoReset(false, 3000);
const loadingV = refAutoReset(false, 3000);
</script>
<template>
  <Page
    title="Vben Loading"
    description="加载中状态组件。这个组件可以为其它作为容器的组件添加一个加载中的遮罩层。使用它们时，容器需要relative定位。"
  >
    <ElCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span>Element Plus Loading</span>
          <span class="text-sm text-gray-500">这是Element Plus 组件库自带的Loading指令演示</span
          >
        </div>
      </template>
      <div v-loading="spinning">
        <ElButton type="primary" @click="spinning = true">显示Loading</ElButton>
      </div>
    </ElCard>

    <ElCard class="mt-4" v-loading="loadingV">
      <template #header>
        <div class="flex items-center justify-between">
          <span>Vben Loading</span>
          <ElButton type="primary" @click="loadingV = true">
            v-loading 指令
          </ElButton>
        </div>
      </template>
      <div>Loading组件可以设置文字，并且也提供了icon插槽用于替换加载图标。</div>
      <div class="flex gap-4">
        <div class="size-40">
          <Loading
            :spinning="loading"
            text="正在加载..."
            class="flex h-full w-full items-center justify-center"
          >
            <ElButton type="primary" @click="loading = true">默认动画</ElButton>
          </Loading>
        </div>
        <div class="size-40">
          <Loading
            :spinning="loading"
            class="flex h-full w-full items-center justify-center"
          >
            <ElButton type="primary" @click="loading = true">
              自定义动画1
            </ElButton>
            <template #icon>
              <IconifyIcon
                icon="svg-spinners:ring-resize"
                class="text-primary size-10"
              />
            </template>
          </Loading>
        </div>
        <div class="size-40">
          <Loading
            :spinning="loading"
            class="flex h-full w-full items-center justify-center"
          >
            <ElButton type="primary" @click="loading = true">
              自定义动画2
            </ElButton>
            <template #icon>
              <IconifyIcon
                icon="svg-spinners:bars-scale"
                class="text-primary size-10"
              />
            </template>
          </Loading>
        </div>
      </div>
    </ElCard>

    <ElCard
      v-spinning="spinningV"
      class="mt-4 overflow-hidden"
      :body-style="{
        position: 'relative',
        overflow: 'hidden',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span>Vben Spinner</span>
          <ElButton type="primary" @click="spinningV = true">
            v-spinning 指令
          </ElButton>
        </div>
      </template>
      <div class="mb-4">
        Spinner组件是Loading组件的一个特例，只有一个固定的统一样式。
      </div>
      <Spinner
        :spinning="spinning"
        class="flex size-40 items-center justify-center"
      >
        <ElButton type="primary" @click="spinning = true">显示Spinner</ElButton>
      </Spinner>
    </ElCard>
  </Page>
</template>
