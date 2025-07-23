#!/bin/bash

# 宝塔面板部署脚本 - 包含Mock服务
# 同时部署前端应用和Mock API服务

set -e

# 配置参数
APP_NAME=${1:-"web-ele"}
SITE_NAME=${2:-"vben-admin"}
SERVER_HOST=${3:-""}
SERVER_USER=${4:-"root"}
SERVER_PATH=${5:-"/www/wwwroot"}
MOCK_PORT=${6:-"5320"}

# 检查必要参数
if [ -z "$SERVER_HOST" ]; then
    echo "❌ 缺少服务器地址参数"
    echo "使用方法: $0 <app-name> <site-name> <server-host> [server-user] [server-path] [mock-port]"
    echo "示例: $0 web-ele vben-admin 192.168.1.100 root /www/wwwroot 5320"
    exit 1
fi

echo "🚀 开始部署前端应用和Mock服务..."
echo "应用: $APP_NAME"
echo "站点: $SITE_NAME"
echo "服务器: $SERVER_USER@$SERVER_HOST"
echo "前端路径: $SERVER_PATH/$SITE_NAME"
echo "Mock端口: $MOCK_PORT"

# 验证应用名称
if [[ ! "$APP_NAME" =~ ^(web-ele|web-antd|web-naive)$ ]]; then
    echo "❌ 无效的应用名称: $APP_NAME"
    echo "支持的应用: web-ele, web-antd, web-naive"
    exit 1
fi

# 测试服务器连接
echo "🔗 测试服务器连接..."
if ! ssh -o ConnectTimeout=10 $SERVER_USER@$SERVER_HOST "echo '连接成功'" 2>/dev/null; then
    echo "❌ 无法连接到服务器 $SERVER_USER@$SERVER_HOST"
    exit 1
fi

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    pnpm install
fi

# 1. 构建前端项目
echo "🔨 构建前端项目..."
case $APP_NAME in
    "web-ele")
        pnpm run build:ele
        ;;
    "web-antd")
        pnpm run build:antd
        ;;
    "web-naive")
        pnpm run build:naive
        ;;
esac

# 检查构建结果
DIST_PATH="apps/$APP_NAME/dist"
if [ ! -d "$DIST_PATH" ]; then
    echo "❌ 前端构建失败！未找到 $DIST_PATH"
    exit 1
fi

echo "✅ 前端构建成功！"

# 2. 构建Mock服务
echo "🔨 构建Mock服务..."
cd apps/backend-mock
pnpm install
pnpm run build
cd ../..

# 检查Mock构建结果
MOCK_DIST_PATH="apps/backend-mock/.output"
if [ ! -d "$MOCK_DIST_PATH" ]; then
    echo "❌ Mock服务构建失败！未找到 $MOCK_DIST_PATH"
    exit 1
fi

echo "✅ Mock服务构建成功！"

# 3. 部署到服务器
echo "📁 准备服务器目录..."
ssh $SERVER_USER@$SERVER_HOST "
    # 创建站点目录
    mkdir -p $SERVER_PATH/$SITE_NAME
    mkdir -p $SERVER_PATH/${SITE_NAME}-mock
    
    # 备份现有文件
    if [ -d '$SERVER_PATH/$SITE_NAME' ] && [ \"\$(ls -A $SERVER_PATH/$SITE_NAME 2>/dev/null)\" ]; then
        echo '📦 备份现有前端文件...'
        tar -czf $SERVER_PATH/${SITE_NAME}-frontend-backup-\$(date +%Y%m%d_%H%M%S).tar.gz -C $SERVER_PATH/$SITE_NAME . 2>/dev/null || true
        rm -rf $SERVER_PATH/$SITE_NAME/*
    fi
    
    if [ -d '$SERVER_PATH/${SITE_NAME}-mock' ] && [ \"\$(ls -A $SERVER_PATH/${SITE_NAME}-mock 2>/dev/null)\" ]; then
        echo '📦 备份现有Mock服务文件...'
        tar -czf $SERVER_PATH/${SITE_NAME}-mock-backup-\$(date +%Y%m%d_%H%M%S).tar.gz -C $SERVER_PATH/${SITE_NAME}-mock . 2>/dev/null || true
        rm -rf $SERVER_PATH/${SITE_NAME}-mock/*
    fi
"

# 4. 同步前端文件
echo "🚀 同步前端文件到服务器..."
rsync -avz --progress --delete \
    --exclude='*.map' \
    $DIST_PATH/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/$SITE_NAME/

# 5. 同步Mock服务文件
echo "🚀 同步Mock服务文件到服务器..."
rsync -avz --progress --delete \
    $MOCK_DIST_PATH/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/${SITE_NAME}-mock/

# 6. 设置文件权限
echo "🔐 设置文件权限..."
ssh $SERVER_USER@$SERVER_HOST "
    chown -R www:www $SERVER_PATH/$SITE_NAME
    chown -R www:www $SERVER_PATH/${SITE_NAME}-mock
    find $SERVER_PATH/$SITE_NAME -type f -exec chmod 644 {} \;
    find $SERVER_PATH/$SITE_NAME -type d -exec chmod 755 {} \;
    find $SERVER_PATH/${SITE_NAME}-mock -type f -exec chmod 644 {} \;
    find $SERVER_PATH/${SITE_NAME}-mock -type d -exec chmod 755 {} \;
"

# 7. 安装Node.js和PM2（如果没有安装）
echo "📦 检查服务器Node.js环境..."
ssh $SERVER_USER@$SERVER_HOST "
    # 检查Node.js
    if ! command -v node &> /dev/null; then
        echo '安装Node.js...'
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi
    
    # 检查PM2
    if ! command -v pm2 &> /dev/null; then
        echo '安装PM2...'
        npm install -g pm2
    fi
"

# 8. 创建PM2配置文件
echo "⚙️ 创建PM2配置..."
ssh $SERVER_USER@$SERVER_HOST "
cat > $SERVER_PATH/${SITE_NAME}-mock/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: '${SITE_NAME}-mock',
    script: './server/index.mjs',
    cwd: '$SERVER_PATH/${SITE_NAME}-mock',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: $MOCK_PORT,
      NITRO_PORT: $MOCK_PORT
    },
    error_file: '$SERVER_PATH/${SITE_NAME}-mock/logs/err.log',
    out_file: '$SERVER_PATH/${SITE_NAME}-mock/logs/out.log',
    log_file: '$SERVER_PATH/${SITE_NAME}-mock/logs/combined.log',
    time: true
  }]
}
EOF

# 创建日志目录
mkdir -p $SERVER_PATH/${SITE_NAME}-mock/logs
"

# 9. 启动Mock服务
echo "🚀 启动Mock服务..."
ssh $SERVER_USER@$SERVER_HOST "
    cd $SERVER_PATH/${SITE_NAME}-mock
    pm2 delete ${SITE_NAME}-mock 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
"

echo ""
echo "🎉 部署完成！"
echo "📁 前端路径: $SERVER_PATH/$SITE_NAME"
echo "📁 Mock服务路径: $SERVER_PATH/${SITE_NAME}-mock"
echo "🌐 前端访问地址: http://$SERVER_HOST"
echo "🔌 Mock API地址: http://$SERVER_HOST:$MOCK_PORT"
echo ""
echo "📋 后续步骤："
echo "1. 配置Nginx代理API请求到Mock服务"
echo "2. 测试前端和API功能"
echo ""
