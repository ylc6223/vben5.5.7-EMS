import { defineConfig } from '@vben/vite-config';

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            // 不要去掉 /api 前缀，直接转发到 Mock 服务
            // rewrite: (path) => path.replace(/^\/api/, ''),
            // 使用本地 mock 服务 (当 VITE_NITRO_MOCK=true 时会自动使用内置 mock)
            // target: 'http://121.41.88.18:9001/api',
            target: 'http://localhost:5320',
            ws: true,
          },
        },
      },
    },
  };
});
