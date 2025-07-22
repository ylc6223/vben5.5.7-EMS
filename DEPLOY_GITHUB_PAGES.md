# GitHub Pages 部署指南

本指南将帮助您将 Vue Vben Admin (Element Plus 版本) 部署到 GitHub Pages。

## 📋 前置条件

1. 拥有 GitHub 账号
2. 已将项目推送到您的 GitHub 仓库
3. 确保您的仓库是公开的（GitHub Pages 免费版需要公开仓库）

## 🚀 部署步骤

### 1. 启用 GitHub Pages

1. 进入您的 GitHub 仓库
2. 点击 **Settings** 标签页
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 2. 配置 Workflow

项目已经包含了 `.github/workflows/deploy-pages.yml` 文件，该文件会：

- 在推送到 `main` 或 `dev-release-0722` 分支时自动触发
- 构建 Element Plus 版本的应用
- 自动部署到 GitHub Pages

### 3. 修改配置（如需要）

如果您需要自定义配置，可以修改以下文件：

#### 修改触发分支
编辑 `.github/workflows/deploy-pages.yml` 文件中的分支配置：

```yaml
on:
  push:
    branches:
      - main
      - your-branch-name  # 替换为您的分支名
```

#### 修改基础路径
如果您的仓库名不是标准格式，可能需要手动设置 base path：

```yaml
# 在 deploy-pages.yml 中找到这一行并修改
echo "VITE_BASE = /your-repo-name/" >> ./apps/web-ele/.env.production
```

### 4. 推送代码触发部署

```bash
git add .
git commit -m "feat: 添加 GitHub Pages 部署配置"
git push origin main  # 或您的目标分支
```

### 5. 查看部署状态

1. 在 GitHub 仓库中点击 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" workflow 的运行状态
3. 部署成功后，您的网站将在 `https://your-username.github.io/your-repo-name/` 可用

## 🔧 配置说明

### Workflow 文件解析

`.github/workflows/deploy-pages.yml` 包含两个主要作业：

1. **Build 作业**：
   - 检出代码
   - 设置 Node.js 环境
   - 安装依赖
   - 修改生产环境配置
   - 构建应用
   - 上传构建产物

2. **Deploy 作业**：
   - 部署到 GitHub Pages

### 环境变量配置

部署时会自动修改以下配置：

- `VITE_COMPRESS = gzip`：启用 gzip 压缩
- `VITE_PWA = true`：启用 PWA 功能
- `VITE_BASE`：设置正确的基础路径

## 🛠️ 故障排除

### 常见问题

1. **部署失败**：
   - 检查 Actions 日志中的错误信息
   - 确保仓库是公开的
   - 确保 GitHub Pages 已启用

2. **页面无法访问**：
   - 检查 base path 配置是否正确
   - 等待几分钟让 DNS 生效

3. **资源加载失败**：
   - 确保 `VITE_BASE` 配置正确
   - 检查构建产物中的路径是否正确

### 手动触发部署

您可以在 GitHub Actions 页面手动触发部署：

1. 进入 **Actions** 标签页
2. 选择 "Deploy to GitHub Pages" workflow
3. 点击 **Run workflow** 按钮

## 📝 自定义配置

### 修改构建目标

如果您想部署其他版本（如 Ant Design 版本），可以修改 workflow：

```yaml
# 将 build:ele 改为其他构建命令
- name: Build
  run: pnpm run build:antd  # 或 build:naive

# 相应地修改上传路径
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./apps/web-antd/dist  # 或对应的 dist 目录
```

### 添加自定义域名

如果您有自定义域名，可以在仓库根目录添加 `CNAME` 文件：

```bash
echo "your-domain.com" > CNAME
```

## 🎉 完成

部署成功后，您的 Vue Vben Admin 应用将在 GitHub Pages 上运行！

访问地址：`https://your-username.github.io/your-repo-name/`
