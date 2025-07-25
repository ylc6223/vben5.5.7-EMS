<script setup lang="ts">
import type { DateDataType } from './index.d.ts';

import { reactive, ref } from 'vue';

import dayjs from 'dayjs';

import headerBg from '../assets/header_title@2x.png';

const tilte: string = ref('微电网智慧能源平台');
const dateData = reactive<DateDataType>({
  dateDay: '',
  dateYear: '',
  dateWeek: '',
  timing: null,
});

// const { setSettingShow } = useSettingStore();
const weekday = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format('YYYY-MM-DD hh : mm : ss');
    dateData.dateWeek = weekday[dayjs().day()];
  }, 1000);
};

const handleSettingClick = () => {
  console.log('设置按钮被点击');
  // 这里可以添加设置相关的逻辑
};

timeFn();
</script>

<template>
  <div
    class="absolutee mb-[11px] left-0 right-0 top-0 mx-auto h-[90px] w-[83.33%] bg-top bg-no-repeat opacity-100"
    :style="{ backgroundImage: `url(${headerBg})`,backgroundSize: 'cover' }"
  ></div>
</template>
