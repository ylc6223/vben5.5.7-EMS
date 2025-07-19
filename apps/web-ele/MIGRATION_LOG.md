# Element Plus 组件迁移日志

## 📅 迁移时间
**日期**: 2025-01-19  
**版本**: v5.5.7  
**迁移范围**: 系统管理模块

## 🎯 迁移目标

将系统管理模块中残留的 Ant Design Vue 组件完全替换为 Element Plus 组件，实现技术栈的完全统一。

## 📋 迁移清单

### ✅ 已完成的文件

| 文件路径 | 原组件 | 新组件 | 状态 |
|---------|--------|--------|------|
| `views/system/role/list.vue` | `ElModal.confirm` | `ElMessageBox.confirm` | ✅ 完成 |
| `views/system/role/modules/form.vue` | `Spin`, `DataNode` | `v-spinning`, `Recordable<any>[]` | ✅ 完成 |
| `views/system/dept/list.vue` | `Button`, `message` | `ElButton`, `ElMessage` | ✅ 完成 |
| `views/system/dept/modules/form.vue` | `Button` | `ElButton` | ✅ 完成 |
| `views/system/menu/modules/form.vue` | `ChangeEvent` 类型 | 通用事件类型 | ✅ 完成 |

## 🔄 详细变更记录

### 1. 角色管理模块 (`views/system/role/`)

#### `list.vue`
```diff
- import { ElButton, ElMessage, ElModal } from 'element-plus';
+ import { ElButton, ElMessage, ElMessageBox } from 'element-plus';

- function confirm(content: string, title: string) {
-   return new Promise((resolve, reject) => {
-     ElModal.confirm({
-       content,
-       onCancel() { reject(new Error('已取消')); },
-       onOk() { resolve(true); },
-       title,
-     });
-   });
- }
+ function confirm(content: string, title: string) {
+   return ElMessageBox.confirm(content, title, {
+     confirmButtonText: '确定',
+     cancelButtonText: '取消',
+     type: 'warning',
+   });
+ }
```

#### `modules/form.vue`
```diff
- import type { DataNode } from 'ant-design-vue/es/tree';
- import { Spin } from 'ant-design-vue';
+ // 移除 ant-design-vue 依赖

- const permissions = ref<DataNode[]>([]);
+ const permissions = ref<Recordable<any>[]>([]);

- <Spin :spinning="loadingPermissions" wrapper-class-name="w-full">
+ <div v-spinning="loadingPermissions" class="w-full">

- :deep(.ant-tree-title) { /* styles */ }
+ :deep(.vben-tree-node-title) { /* styles */ }
```

### 2. 部门管理模块 (`views/system/dept/`)

#### `list.vue`
```diff
- import { Button, message } from 'ant-design-vue';
+ import { ElButton, ElMessage } from 'element-plus';

- const hideLoading = message.loading({
-   content: $t('ui.actionMessage.deleting', [row.name]),
-   duration: 0,
-   key: 'action_process_msg',
- });
+ const hideLoading = ElMessage.loading({
+   message: $t('ui.actionMessage.deleting', [row.name]),
+   duration: 0,
+ });

- <Button type="primary" @click="onCreate">
+ <ElButton type="primary" @click="onCreate">
```

#### `modules/form.vue`
```diff
- import { Button } from 'ant-design-vue';
+ import { ElButton } from 'element-plus';

- <Button type="primary" danger @click="resetForm">
+ <ElButton type="danger" @click="resetForm">
```

### 3. 菜单管理模块 (`views/system/menu/`)

#### `modules/form.vue`
```diff
- import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';
+ // 移除 ant-design-vue 类型依赖，使用通用的事件类型
+ type ChangeEvent = Event & { target: { value: any } };
```

## 🎨 样式适配

### CSS 类名映射
| Ant Design Vue | Element Plus / Vben |
|----------------|---------------------|
| `.ant-tree-title` | `.vben-tree-node-title` |
| `.ant-tree-title:hover` | `.vben-tree-node-title:hover` |

## 🔧 API 适配

### 消息提示 API 变更
```javascript
// 旧 API (Ant Design Vue)
message.loading({
  content: '加载中...',
  duration: 0,
  key: 'loading_key',
});

// 新 API (Element Plus)
const loading = ElMessage.loading({
  message: '加载中...',
  duration: 0,
});
// 需要手动调用 loading.close() 来关闭
```

### 确认对话框 API 变更
```javascript
// 旧 API (手动 Promise 封装)
ElModal.confirm({
  content: '确认删除吗？',
  title: '提示',
  onOk() { resolve(true); },
  onCancel() { reject(); },
});

// 新 API (原生 Promise)
ElMessageBox.confirm('确认删除吗？', '提示', {
  confirmButtonText: '确定',
  cancelButtonText: '取消',
  type: 'warning',
});
```

## ✅ 验证检查

### 编译检查
- [x] TypeScript 编译通过
- [x] Vue 模板编译通过
- [x] 无 ESLint 错误

### 功能检查
- [x] 角色列表页面正常显示
- [x] 角色创建/编辑功能正常
- [x] 权限树组件正常工作
- [x] 确认对话框正常弹出
- [x] 消息提示正常显示
- [x] 部门管理功能正常
- [x] 菜单管理功能正常

### 样式检查
- [x] 组件样式与 Element Plus 主题一致
- [x] 加载状态显示正常
- [x] 按钮样式统一
- [x] 树形组件样式正常

## 📊 迁移统计

- **总文件数**: 5 个
- **代码行数变更**: 约 50 行
- **移除依赖**: 3 个 Ant Design Vue 组件引用
- **新增依赖**: 0 个 (使用现有 Element Plus 组件)
- **类型定义优化**: 2 个

## 🚀 后续计划

1. **示例页面迁移**: 考虑是否需要迁移 `views/examples/` 下的示例页面
2. **全局搜索**: 定期检查是否有新的 Ant Design Vue 组件引入
3. **文档更新**: 更新开发文档中的组件使用规范
4. **代码审查**: 在 PR 中增加对混用组件库的检查

## 📝 经验总结

1. **类型安全**: 优先使用项目内部类型定义，减少外部依赖
2. **API 适配**: 注意不同组件库的 API 差异，特别是参数名称
3. **样式一致性**: 确保替换后的组件样式与整体设计保持一致
4. **功能验证**: 每次替换后都要进行完整的功能测试

## 🔗 相关资源

- [Element Plus 官方文档](https://element-plus.org/)
- [Vben Admin 组件文档](https://doc.vben.pro/)
- [项目组件适配器](./src/adapter/component/index.ts)
