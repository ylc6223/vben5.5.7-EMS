<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { cn } from '@vben-core/shared/utils';
import { Input } from '@vben-core/shadcn-ui';

interface Props {
  class?: any;
  placeholder?: string;
  captchaApi?: () => Promise<string>;
  refreshTitle?: string;
  loadingText?: string;
  isInValid?: boolean;
}

defineOptions({
  name: 'ImageCaptcha',
});

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Please enter captcha code',
  refreshTitle: 'Click to refresh captcha',
  loadingText: 'Loading...',
  isInValid: false,
});

const modelValue = defineModel<string>();
const emit = defineEmits<{
  refresh: [];
}>();

const captchaImageUrl = ref<string>('');
const loading = ref(false);

const inputClasses = computed(() =>
  cn(
    'flex-1',
    // 应用与其他输入框相同的错误状态样式
    {
      'border-destructive focus:border-destructive hover:border-destructive/80 focus:shadow-[0_0_0_2px_rgba(255,38,5,0.06)]':
        props.isInValid,
    },
    props.class,
  ),
);

const containerClasses = computed(() =>
  cn(
    'flex items-center gap-2 w-full relative',
    // 添加表单错误状态类
    {
      'form-valid-error': props.isInValid,
    },
  ),
);

const imageContainerStyle = computed(() => ({
  width: '100px',
  height: '40px',
  borderRadius: '6px',
  border: `1px solid hsl(var(${props.isInValid ? '--destructive' : '--border'}))`,
  backgroundColor: 'hsl(var(--background))',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  color: 'hsl(var(--muted-foreground))',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  overflow: 'hidden',
}));

const imageContainerClasses = computed(() =>
  cn('flex-shrink-0 transition-colors', {
    'hover:border-destructive/80': props.isInValid,
    'hover:border-primary/50': !props.isInValid,
  }),
);

async function refreshCaptcha() {
  if (!props.captchaApi) {
    // Mock data for demonstration
    const mockTexts = ['A1B2', 'X9Y8', 'M5N3', 'K7L4', 'P2Q6'];
    const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
    captchaImageUrl.value = `data:image/svg+xml;base64,${btoa(`
      <svg width="100" height="40" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f8f9fa;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e9ecef;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100" height="40" fill="url(#bg)" rx="6"/>
        <text x="50" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold" fill="#495057">${randomText}</text>
        <line x1="10" y1="15" x2="90" y2="15" stroke="#dee2e6" stroke-width="1" opacity="0.5"/>
        <line x1="10" y1="25" x2="90" y2="25" stroke="#dee2e6" stroke-width="1" opacity="0.5"/>
        <line x1="10" y1="35" x2="90" y2="35" stroke="#dee2e6" stroke-width="1" opacity="0.5"/>
      </svg>
    `)}`;
    return;
  }

  loading.value = true;
  try {
    const response = await props.captchaApi();

    // The response should be a string (base64 data) from fetchCaptchaImage
    if (typeof response === 'string') {
      let imageUrl = response;

      // Check if it's already a complete data URL or needs base64 prefix
      if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('http')) {
        // Assume it's base64 data for PNG image, add the data URL prefix
        imageUrl = `data:image/png;base64,${imageUrl}`;
      }

      captchaImageUrl.value = imageUrl;
    } else {
      throw new Error(
        `Expected string response from captchaApi, got: ${typeof response}`,
      );
    }

    emit('refresh');
  } catch (error) {
    console.error('Failed to load captcha:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  refreshCaptcha();
});
</script>

<template>
  <div :class="containerClasses">
    <Input
      v-model="modelValue"
      v-bind="$attrs"
      :class="inputClasses"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <div
      :style="imageContainerStyle"
      :class="imageContainerClasses"
      :title="refreshTitle"
      @click="refreshCaptcha"
    >
      <img
        v-if="captchaImageUrl && !loading"
        :src="captchaImageUrl"
        alt="验证码"
        class="h-full w-full rounded-md object-cover"
        draggable="false"
      />
      <span v-else-if="loading" class="text-muted-foreground text-xs">{{
        loadingText
      }}</span>
      <span v-else class="text-muted-foreground text-xs">{{
        refreshTitle
      }}</span>
    </div>
  </div>
</template>
