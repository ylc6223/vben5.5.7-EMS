<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { BasicOption } from '@vben/types';

import { computed, markRaw } from 'vue';

import { AuthenticationLogin, ImageCaptcha, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { getCaptchaApi } from '#/api/core/auth';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

async function fetchCaptchaImage(): Promise<string> {
  try {
    const response = await getCaptchaApi();
    // Due to response interceptor, response is already the 'result' object
    const imageData = response?.img;

    if (!imageData || typeof imageData !== 'string') {
      throw new Error(
        `Invalid captcha image data. Expected string in img property, got: ${typeof imageData}`,
      );
    }

    return imageData;
  } catch (error) {
    console.error('Failed to fetch captcha:', error);
    throw error;
  }
}

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'FAQC',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
];

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('FAQC'),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: '123456',
                account: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'account',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    // {
    //   component: markRaw(ImageCaptcha),
    //   componentProps: {
    //     placeholder: $t('authentication.captchaTip'),
    //     captchaApi: fetchCaptchaImage,
    //     refreshTitle: $t('authentication.captchaRefresh'),
    //     loadingText: $t('authentication.captchaLoading'),
    //   },
    //   fieldName: 'code',
    //   label: $t('authentication.captcha'),
    //   rules: z.string().min(1, { message: $t('authentication.captchaTip') }),
    // },
    // {
    //   component: markRaw(SliderCaptcha),
    //   fieldName: 'captcha',
    //   rules: z.boolean().refine((value) => value, {
    //     message: $t('authentication.verifyRequiredTip'),
    //   }),
    // },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
