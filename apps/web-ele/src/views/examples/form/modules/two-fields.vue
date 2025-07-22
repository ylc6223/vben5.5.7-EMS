<script lang="ts" setup>
import { ElInput, ElOption, ElSelect } from 'element-plus';

interface Option {
  label: string;
  value: string;
}

interface Props {
  options?: Option[];
  selectPlaceholder?: string;
  inputPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [
    { label: '个人', value: 'personal' },
    { label: '工作', value: 'work' },
    { label: '私密', value: 'private' },
  ],
  selectPlaceholder: '类型',
  inputPlaceholder: '请输入11位手机号码',
});

const emit = defineEmits(['blur', 'change']);

const modelValue = defineModel<[string, string]>({
  default: () => [undefined, undefined],
});

function onChange() {
  emit('change', modelValue.value);
}
</script>
<template>
  <div class="flex w-full gap-1">
    <div class="w-[80px]">
      <ElSelect
        v-model="modelValue[0]"
        class="w-full"
        :placeholder="props.selectPlaceholder"
        clearable
        :class="{ 'valid-success': !!modelValue[0] }"
        @blur="emit('blur')"
        @change="onChange"
      >
        <ElOption
          v-for="option in props.options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </ElSelect>
    </div>
    <ElInput
      v-model="modelValue[1]"
      :placeholder="props.inputPlaceholder"
      class="flex-1"
      clearable
      :class="{ 'valid-success': modelValue[1]?.match(/^1[3-9]\d{9}$/) }"
      :maxlength="11"
      type="tel"
      @blur="emit('blur')"
      @change="onChange"
    />
  </div>
</template>
