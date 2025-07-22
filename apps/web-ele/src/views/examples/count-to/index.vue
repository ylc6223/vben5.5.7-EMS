<script lang="ts" setup>
import type { CountToProps, TransitionPresets } from '@vben/common-ui';

import { reactive } from 'vue';

import { CountTo, Page, TransitionPresetsKeys } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { ElButton, ElCard, ElCol, ElForm, ElFormItem, ElInput, ElInputNumber, ElMessage, ElOption, ElRow, ElSelect, ElSwitch } from 'element-plus';

const props = reactive<CountToProps & { transition: TransitionPresets }>({
  decimal: '.',
  decimals: 2,
  decimalStyle: {
    fontSize: 'small',
    fontStyle: 'italic',
  },
  delay: 0,
  disabled: false,
  duration: 2000,
  endVal: 100_000,
  mainStyle: {
    color: 'hsl(var(--primary))',
    fontSize: 'xx-large',
    fontWeight: 'bold',
  },
  prefix: '￥',
  prefixStyle: {
    paddingRight: '0.5rem',
  },
  separator: ',',
  startVal: 0,
  suffix: '元',
  suffixStyle: {
    paddingLeft: '0.5rem',
  },
  transition: 'easeOutQuart',
});

function changeNumber() {
  props.endVal =
    Math.floor(Math.random() * 100_000_000) / 10 ** (props.decimals || 0);
}

function openDocumentation() {
  window.open('https://vueuse.org/core/useTransition/', '_blank');
}

function onStarted() {
  ElMessage({
    message: '动画已开始',
    type: 'info',
    duration: 0,
  });
}

function onFinished() {
  ElMessage({
    message: '动画已结束',
    type: 'success',
    duration: 2000,
  });
}
</script>
<template>
  <Page title="CountTo" description="数字滚动动画组件。使用">
    <template #description>
      <span>
        使用useTransition封装的数字滚动动画组件，每次改变当前值都会产生过渡动画。
      </span>
      <ElButton link type="primary" @click="openDocumentation">
        查看useTransition文档
      </ElButton>
    </template>
    <ElCard>
      <template #header>基本用法</template>
      <div class="flex w-full items-center justify-center pb-4">
        <CountTo v-bind="props" @started="onStarted" @finished="onFinished" />
      </div>
      <ElForm :model="props">
        <ElRow :gutter="20">
          <ElCol :span="8">
            <ElFormItem label="初始值" name="startVal">
              <ElInputNumber v-model="props.startVal" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="当前值" name="endVal">
              <div class="flex items-center gap-2">
                <ElInputNumber
                  v-model="props.endVal"
                  class="flex-1"
                  :precision="props.decimals"
                />
                <IconifyIcon
                  v-tippy="`设置一个随机值`"
                  class="size-5 cursor-pointer outline-none text-primary hover:text-primary/80"
                  icon="ix:random-filled"
                  @click="changeNumber"
                />
              </div>
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="禁用动画" name="disabled">
              <ElSwitch v-model="props.disabled" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="延迟动画" name="delay">
              <ElInputNumber v-model="props.delay" :min="0" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="持续时间" name="duration">
              <ElInputNumber v-model="props.duration" :min="0" />
            </ElFormItem>
          </ElCol>

          <ElCol :span="8">
            <ElFormItem label="小数位数" name="decimals">
              <ElInputNumber
                v-model="props.decimals"
                :min="0"
                :precision="0"
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="分隔符" name="separator">
              <ElInput v-model="props.separator" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="小数点" name="decimal">
              <ElInput v-model="props.decimal" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="动画" name="transition">
              <ElSelect v-model="props.transition">
                <ElOption
                  v-for="preset in TransitionPresetsKeys"
                  :key="preset"
                  :value="preset"
                  :label="preset"
                >
                  {{ preset }}
                </ElOption>
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="前缀" name="prefix">
              <ElInput v-model="props.prefix" />
            </ElFormItem>
          </ElCol>
          <ElCol :span="8">
            <ElFormItem label="后缀" name="suffix">
              <ElInput v-model="props.suffix" />
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
    </ElCard>
  </Page>
</template>
