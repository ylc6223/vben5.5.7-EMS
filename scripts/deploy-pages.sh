#!/bin/bash

# GitHub Pages 部署脚本
# 用于本地测试构建和部署流程

set -e

echo "🚀 开始构建 Vue Vben Admin (Element Plus 版本) 用于 GitHub Pages 部署..."

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    pnpm install
fi

# 备份原始配置文件
echo "💾 备份生产环境配置..."
cp apps/web-ele/.env.production apps/web-ele/.env.production.backup

# 修改生产环境配置
echo "⚙️ 修改生产环境配置..."
sed -i.bak "s#VITE_COMPRESS\s*=.*#VITE_COMPRESS = gzip#g" apps/web-ele/.env.production
sed -i.bak "s#VITE_PWA\s*=.*#VITE_PWA = true#g" apps/web-ele/.env.production

# 如果提供了仓库名参数，设置 base path
if [ ! -z "$1" ]; then
    echo "🔧 设置 base path 为: /$1/"
    sed -i.bak "s#VITE_BASE=.*#VITE_BASE=/$1/#g" apps/web-ele/.env.production
fi

echo "📋 当前生产环境配置:"
cat apps/web-ele/.env.production

# 构建项目
echo "🔨 构建项目..."
pnpm run build:ele

# 检查构建结果
if [ -d "apps/web-ele/dist" ]; then
    echo "✅ 构建成功！"
    echo "📁 构建产物位置: apps/web-ele/dist"
    echo "📊 构建产物大小:"
    du -sh apps/web-ele/dist
    
    # 列出主要文件
    echo "📄 主要文件:"
    ls -la apps/web-ele/dist/
else
    echo "❌ 构建失败！"
    exit 1
fi

# 恢复原始配置文件
echo "🔄 恢复原始配置..."
mv apps/web-ele/.env.production.backup apps/web-ele/.env.production
rm -f apps/web-ele/.env.production.bak

echo "🎉 构建完成！"
echo ""
echo "📝 接下来的步骤:"
echo "1. 将代码推送到 GitHub 仓库"
echo "2. 在仓库设置中启用 GitHub Pages"
echo "3. 选择 'GitHub Actions' 作为源"
echo "4. 推送代码将自动触发部署"
echo ""
echo "🌐 部署后访问地址: https://your-username.github.io/your-repo-name/"
