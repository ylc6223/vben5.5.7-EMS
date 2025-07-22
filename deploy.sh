#!/bin/bash

# 简化部署脚本 - 读取配置文件

# 检查配置文件
if [ ! -f "deploy-config.local" ]; then
    echo "❌ 配置文件不存在"
    exit 1
fi

# 读取配置
source deploy-config.local

# 执行部署
./scripts/deploy-bt-auto.sh "$APP_NAME" "$SITE_NAME" "$SERVER_HOST" "$SERVER_USER" "$SERVER_PATH"
