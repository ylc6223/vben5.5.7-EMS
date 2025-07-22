#!/bin/bash

# 宝塔面板自动部署脚本
# 自动构建并推送到服务器

set -e

# 配置参数
APP_NAME=${1:-"web-ele"}
SITE_NAME=${2:-"vben-admin"}
SERVER_HOST=${3:-""}
SERVER_USER=${4:-"root"}
SERVER_PATH=${5:-"/www/wwwroot"}

# 检查必要参数
if [ -z "$SERVER_HOST" ]; then
    echo "❌ 缺少服务器地址参数"
    echo "使用方法: $0 <app-name> <site-name> <server-host> [server-user] [server-path]"
    echo "示例: $0 web-ele vben-ele 192.168.1.100 root /www/wwwroot"
    exit 1
fi

echo "🚀 开始自动部署到宝塔面板服务器..."
echo "应用: $APP_NAME"
echo "站点: $SITE_NAME"
echo "服务器: $SERVER_USER@$SERVER_HOST"
echo "路径: $SERVER_PATH/$SITE_NAME"

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
    echo "请检查："
    echo "1. 服务器IP地址是否正确"
    echo "2. SSH服务是否启动"
    echo "3. 是否配置了SSH密钥认证"
    exit 1
fi

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    pnpm install
fi

# 备份配置
echo "💾 备份生产环境配置..."
cp apps/$APP_NAME/.env.production apps/$APP_NAME/.env.production.backup

# 优化配置
echo "⚙️ 优化生产环境配置..."
sed -i.bak "s#VITE_COMPRESS\s*=.*#VITE_COMPRESS = gzip#g" apps/$APP_NAME/.env.production
sed -i.bak "s#VITE_PWA\s*=.*#VITE_PWA = true#g" apps/$APP_NAME/.env.production

# 构建项目
echo "🔨 构建项目..."
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
    echo "❌ 构建失败！未找到 $DIST_PATH"
    exit 1
fi

echo "✅ 构建成功！"
echo "📊 构建产物大小: $(du -sh $DIST_PATH | cut -f1)"

# 在服务器上创建目录和备份
echo "📁 准备服务器目录..."
ssh $SERVER_USER@$SERVER_HOST "
    # 创建站点目录
    mkdir -p $SERVER_PATH/$SITE_NAME
    
    # 备份现有文件（如果存在）
    if [ -d '$SERVER_PATH/$SITE_NAME' ] && [ \"\$(ls -A $SERVER_PATH/$SITE_NAME 2>/dev/null)\" ]; then
        echo '📦 备份现有文件...'
        tar -czf $SERVER_PATH/${SITE_NAME}-backup-\$(date +%Y%m%d_%H%M%S).tar.gz -C $SERVER_PATH/$SITE_NAME . 2>/dev/null || true
        rm -rf $SERVER_PATH/$SITE_NAME/*
    fi
"

# 使用 rsync 同步文件到服务器
echo "🚀 同步文件到服务器..."
rsync -avz --progress --delete \
    --exclude='*.map' \
    $DIST_PATH/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/$SITE_NAME/

# 设置文件权限
echo "🔐 设置文件权限..."
ssh $SERVER_USER@$SERVER_HOST "
    chown -R www:www $SERVER_PATH/$SITE_NAME
    find $SERVER_PATH/$SITE_NAME -type f -exec chmod 644 {} \;
    find $SERVER_PATH/$SITE_NAME -type d -exec chmod 755 {} \;
"

# 配置 Nginx（如果配置文件不存在）
echo "🔧 检查 Nginx 配置..."
ssh $SERVER_USER@$SERVER_HOST "
    NGINX_CONF=\"/www/server/panel/vhost/nginx/${SITE_NAME}.conf\"
    if [ ! -f \"\$NGINX_CONF\" ]; then
        echo '⚙️ 创建 Nginx 配置文件...'
        cat > \"\$NGINX_CONF\" << 'EOF'
server {
    listen 80;
    server_name ${SITE_NAME}.yourdomain.com;
    root $SERVER_PATH/$SITE_NAME;
    index index.html;
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control \"public, immutable\";
    }
    
    # SPA 路由支持
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF
        echo '✅ Nginx 配置文件已创建'
        echo '⚠️  请手动修改域名并重载 Nginx'
    else
        echo '✅ Nginx 配置文件已存在'
    fi
"

# 恢复配置
echo "🔄 恢复原始配置..."
mv apps/$APP_NAME/.env.production.backup apps/$APP_NAME/.env.production
rm -f apps/$APP_NAME/.env.production.bak

echo ""
echo "🎉 自动部署完成！"
echo "📁 服务器路径: $SERVER_PATH/$SITE_NAME"
echo "🌐 访问地址: http://$SERVER_HOST (需要配置域名)"
echo ""
echo "📋 后续步骤："
echo "1. 在宝塔面板中添加站点（如果还没有）"
echo "2. 配置域名解析"
echo "3. 申请 SSL 证书"
echo "4. 测试网站功能"
echo ""
echo "🔧 如需重新部署，运行："
echo "$0 $APP_NAME $SITE_NAME $SERVER_HOST $SERVER_USER $SERVER_PATH"