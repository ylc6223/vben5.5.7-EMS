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
            rewrite: (path) => path.replace(/^\/api/, ''),
            // 使用本地 mock 服务 (当 VITE_NITRO_MOCK=true 时会自动使用内置 mock)
            target: 'http://localhost:5320',
            ws: true,
          },
        },
      },
    },
  };
});
