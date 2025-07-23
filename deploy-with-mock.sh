#!/bin/bash

# 简化部署脚本 - 包含Mock服务

# 检查配置文件
if [ ! -f "deploy-config.local" ]; then
    echo "❌ 配置文件不存在"
    exit 1
fi

# 读取配置
source deploy-config.local

# 执行部署
./scripts/deploy-with-mock.sh "$APP_NAME" "$SITE_NAME" "$SERVER_HOST" "$SERVER_USER" "$SERVER_PATH" "$MOCK_PORT"
