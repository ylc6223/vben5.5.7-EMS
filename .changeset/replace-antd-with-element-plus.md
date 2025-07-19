---
"@vben/web-ele": patch
---

# 🔄 替换 Ant Design Vue 组件为 Element Plus 组件

## 📋 变更概述

将系统模块中的 Ant Design Vue 组件完全替换为 Element Plus 对应组件，确保技术栈的一致性和项目的整体风格统一。

## 🎯 影响范围

### 主要文件变更

- `apps/web-ele/src/views/system/role/list.vue`
- `apps/web-ele/src/views/system/role/modules/form.vue`
- `apps/web-ele/src/views/system/dept/list.vue`
- `apps/web-ele/src/views/system/dept/modules/form.vue`
- `apps/web-ele/src/views/system/menu/modules/form.vue`

## 🔄 组件替换详情

### 1. Modal 确认对话框
- **替换前**: `ElModal.confirm()` (错误引用)
- **替换后**: `ElMessageBox.confirm()`
- **改进**: 使用 Element Plus 原生 Promise API，代码更简洁

### 2. 加载状态组件
- **替换前**: `<Spin :spinning="loading">`
- **替换后**: `<div v-spinning="loading">`
- **改进**: 使用 Vben 提供的 `v-spinning` 指令，与项目整体风格一致

### 3. 按钮组件
- **替换前**: `<Button type="primary">`
- **替换后**: `<ElButton type="primary">`
- **改进**: 统一使用 Element Plus 按钮组件

### 4. 消息提示
- **替换前**: `message.loading()` / `message.success()`
- **替换后**: `ElMessage.loading()` / `ElMessage.success()`
- **改进**: 适配 Element Plus 消息 API 参数格式

### 5. 类型定义
- **替换前**: `DataNode` from `ant-design-vue/es/tree`
- **替换后**: `Recordable<any>[]`
- **改进**: 移除外部依赖，使用项目内部类型定义

### 6. 事件类型
- **替换前**: `ChangeEvent` from `ant-design-vue/es/_util/EventInterface`
- **替换后**: 通用事件类型 `Event & { target: { value: any } }`
- **改进**: 减少对特定 UI 库的类型依赖

## 🎨 样式更新

### CSS 类名替换
- **替换前**: `.ant-tree-title` 相关样式
- **替换后**: `.vben-tree-node-title` 相关样式
- **改进**: 适配 Vben Tree 组件的样式结构

## ✅ 验证结果

- ✅ 项目启动成功，无编译错误
- ✅ 所有组件功能保持不变
- ✅ 与 Element Plus 主题风格保持一致
- ✅ TypeScript 类型检查通过
- ✅ 移除了对 Ant Design Vue 的依赖引用

## 🚀 技术收益

1. **技术栈统一**: 完全使用 Element Plus 组件体系
2. **代码简化**: 移除了不必要的 Promise 封装
3. **类型安全**: 减少外部类型依赖，提高代码健壮性
4. **维护性提升**: 统一的组件 API 和样式规范
5. **性能优化**: 减少不必要的组件库混用

## 📝 注意事项

- 确认对话框的参数格式已适配 Element Plus API
- 加载状态使用项目统一的 `v-spinning` 指令
- 消息提示的参数名从 `content` 改为 `message`
- 树形组件的样式类名已更新为 Vben 规范

## 🔗 相关文档

- [Element Plus MessageBox](https://element-plus.org/en-US/component/message-box)
- [Element Plus Message](https://element-plus.org/en-US/component/message)
- [Element Plus Button](https://element-plus.org/en-US/component/button)
