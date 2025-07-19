# Vben Admin - Element Plus 版本

基于 Vue 3 + TypeScript + Element Plus 的现代化后台管理系统。

## 🎯 技术栈

- **框架**: Vue 3 + TypeScript
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **构建工具**: Vite
- **样式**: Tailwind CSS + SCSS

## 📦 项目结构

```
apps/web-ele/
├── src/
│   ├── adapter/           # 组件适配器
│   ├── api/              # API 接口
│   ├── assets/           # 静态资源
│   ├── components/       # 公共组件
│   ├── layouts/          # 布局组件
│   ├── locales/          # 国际化
│   ├── router/           # 路由配置
│   ├── stores/           # 状态管理
│   ├── styles/           # 样式文件
│   ├── utils/            # 工具函数
│   └── views/            # 页面组件
│       ├── _core/        # 核心页面 (登录、错误页等)
│       ├── demos/        # 演示页面
│       ├── examples/     # 示例页面
│       └── system/       # 系统管理页面
├── public/               # 公共资源
├── index.html           # HTML 模板
├── package.json         # 依赖配置
├── vite.config.mts      # Vite 配置
└── tsconfig.json        # TypeScript 配置
```

## 🚀 快速开始

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev:ele
```

### 构建生产版本
```bash
pnpm build:ele
```

## 🔧 组件使用规范

### UI 组件库
本项目统一使用 **Element Plus** 作为 UI 组件库，请避免混用其他组件库。

```vue
<script setup>
import { ElButton, ElMessage, ElMessageBox } from 'element-plus';
</script>

<template>
  <ElButton type="primary" @click="handleClick">
    点击按钮
  </ElButton>
</template>
```

### 常用组件映射

| 功能 | Element Plus 组件 | 示例 |
|------|------------------|------|
| 按钮 | `ElButton` | `<ElButton type="primary">按钮</ElButton>` |
| 消息提示 | `ElMessage` | `ElMessage.success('操作成功')` |
| 确认对话框 | `ElMessageBox` | `ElMessageBox.confirm('确认删除？', '提示')` |
| 加载状态 | `v-loading` / `v-spinning` | `<div v-loading="loading">内容</div>` |
| 表单 | `ElForm` | `<ElForm :model="form">...</ElForm>` |
| 表格 | `ElTable` | `<ElTable :data="tableData">...</ElTable>` |

### 加载状态
推荐使用项目提供的 `v-spinning` 指令：

```vue
<template>
  <div v-spinning="loading" class="content">
    <!-- 内容 -->
  </div>
</template>
```

## 📋 最近更新

### v5.5.7 (2025-01-19)
- ✅ **技术栈统一**: 完成系统模块中 Ant Design Vue 组件到 Element Plus 的迁移
- ✅ **组件替换**: 
  - `ElModal.confirm` → `ElMessageBox.confirm`
  - `Spin` → `v-spinning` 指令
  - `Button` → `ElButton`
  - `message` → `ElMessage`
- ✅ **类型优化**: 移除对 `ant-design-vue` 类型的依赖
- ✅ **样式统一**: 更新 CSS 类名以适配 Element Plus 组件

详细变更记录请查看 [MIGRATION_LOG.md](./MIGRATION_LOG.md)

## 🎨 主题定制

项目支持 Element Plus 主题定制，配置文件位于：
- `src/styles/element-plus.scss` - Element Plus 样式覆盖
- `tailwind.config.mjs` - Tailwind CSS 配置

## 🌐 国际化

支持多语言切换，语言文件位于 `src/locales/` 目录：
- `zh-CN.json` - 简体中文
- `en-US.json` - 英文

## 📖 开发指南

### 新增页面
1. 在 `src/views/` 下创建页面组件
2. 在 `src/router/` 中配置路由
3. 如需权限控制，在路由 meta 中配置相应权限

### 新增 API
1. 在 `src/api/` 下创建 API 模块
2. 使用项目提供的 request 实例
3. 添加 TypeScript 类型定义

### 组件开发
1. 优先使用 Element Plus 组件
2. 遵循项目的组件命名规范
3. 添加必要的 TypeScript 类型定义

## 🔗 相关链接

- [Element Plus 官方文档](https://element-plus.org/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Vben Admin 文档](https://doc.vben.pro/)

## 📄 许可证

[MIT License](../../LICENSE)
