# 宝塔面板自动化部署指南

本指南详细介绍如何将 Vue Vben Admin 自动化部署到宝塔面板服务器。

## 📋 目录

- [前置条件](#前置条件)
- [一次性配置](#一次性配置)
- [部署流程](#部署流程)
- [配置说明](#配置说明)
- [常见问题](#常见问题)
- [故障排除](#故障排除)

## 🔧 前置条件

### 服务器要求
- 已安装宝塔面板 (推荐 7.x 或更高版本)
- 已安装 Nginx
- 开放端口：22 (SSH)、80 (HTTP)、443 (HTTPS)、8888 (宝塔面板)

### 本地环境
- Node.js 18+ 
- pnpm 包管理器
- SSH 客户端
- rsync 工具 (Linux/macOS 自带，Windows 需安装)

## ⚙️ 一次性配置

### 1. 配置 SSH 密钥认证

```bash
# 生成 SSH 密钥对
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"

# 复制公钥到服务器 (替换为你的服务器IP)
ssh-copy-id root@192.168.1.100

# 测试连接
ssh root@192.168.1.100 "echo 'SSH连接成功'"
```

### 2. 创建部署配置文件

```bash
# 复制配置模板
cp deploy-config.example deploy-config.local

# 编辑配置文件
nano deploy-config.local
```

配置文件示例：
```bash
# 服务器配置
SERVER_HOST="192.168.1.100"        # 你的服务器IP
SERVER_USER="root"                 # SSH用户名
SERVER_PATH="/www/wwwroot"         # 宝塔默认网站目录

# 应用配置
APP_NAME="web-ele"                 # 选择: web-ele, web-antd, web-naive
SITE_NAME="vben-admin"             # 站点目录名
DOMAIN="admin.yourdomain.com"      # 你的域名
```

### 3. 设置脚本权限

```bash
chmod +x scripts/deploy-bt-auto.sh
chmod +x deploy.sh
```

## 🚀 部署流程

### 方式一：使用配置文件部署（推荐）

```bash
# 一键部署
./deploy.sh
```

### 方式二：直接指定参数部署

```bash
./scripts/deploy-bt-auto.sh <app-name> <site-name> <server-host> [server-user] [server-path]

# 示例
./scripts/deploy-bt-auto.sh web-ele vben-admin 192.168.1.100 root /www/wwwroot
```

### 部署过程说明

脚本会自动执行以下步骤：

1. **环境检查**
   - 验证参数有效性
   - 测试服务器连接
   - 检查本地依赖

2. **项目构建**
   - 安装/更新依赖
   - 备份生产配置
   - 优化构建配置
   - 执行项目构建

3. **服务器准备**
   - 创建站点目录
   - 备份现有文件
   - 清理旧文件

4. **文件同步**
   - 使用 rsync 同步文件
   - 设置正确的文件权限
   - 排除不必要的文件

5. **服务器配置**
   - 创建 Nginx 配置文件
   - 配置 SPA 路由支持
   - 启用 Gzip 压缩

6. **清理工作**
   - 恢复原始配置
   - 显示部署结果

## 📝 配置说明

### 应用类型 (APP_NAME)
- `web-ele`: Element Plus 版本
- `web-antd`: Ant Design 版本  
- `web-naive`: Naive UI 版本

### 服务器路径 (SERVER_PATH)
- 宝塔默认: `/www/wwwroot`
- 自定义路径需确保权限正确

### 站点名称 (SITE_NAME)
- 将作为服务器上的目录名
- 建议使用项目相关的名称

## 🔧 宝塔面板后续配置

部署完成后，需要在宝塔面板中进行以下配置：

### 1. 添加站点
1. 登录宝塔面板: `http://你的服务器IP:8888`
2. 点击 **网站** -> **添加站点**
3. 填写信息：
   - 域名: `admin.yourdomain.com`
   - 根目录: `/www/wwwroot/vben-admin`
   - PHP版本: 纯静态

### 2. 配置伪静态
在站点设置中添加伪静态规则：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}

location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. 申请 SSL 证书
1. 在站点设置中点击 **SSL**
2. 选择 **Let's Encrypt**
3. 填写邮箱并申请
4. 开启 **强制HTTPS**

## ❓ 常见问题

### Q: SSH 连接失败怎么办？
A: 检查以下几点：
- 服务器IP是否正确
- SSH服务是否启动: `systemctl status sshd`
- 防火墙是否开放22端口
- SSH密钥是否正确配置

### Q: 构建失败怎么办？
A: 常见原因：
- Node.js 版本过低 (需要18+)
- 内存不足 (增加 `NODE_OPTIONS=--max-old-space-size=8192`)
- 依赖安装失败 (删除 node_modules 重新安装)

### Q: 文件同步失败？
A: 检查：
- rsync 是否安装
- 服务器磁盘空间是否充足
- 目标目录权限是否正确

### Q: 网站访问404？
A: 确认：
- 伪静态规则是否配置
- Nginx 配置是否正确
- 文件权限是否正确 (644/755)

## 🛠️ 故障排除

### 查看详细日志
```bash
# 启用详细输出
bash -x ./deploy.sh
```

### 手动测试连接
```bash
# 测试SSH连接
ssh -v root@你的服务器IP

# 测试rsync
rsync --version
```

### 检查服务器状态
```bash
# 登录服务器检查
ssh root@你的服务器IP

# 检查磁盘空间
df -h

# 检查目录权限
ls -la /www/wwwroot/

# 检查Nginx状态
systemctl status nginx
```

### 重置部署
```bash
# 清理本地构建
rm -rf apps/*/dist

# 重新安装依赖
rm -rf node_modules
pnpm install

# 重新部署
./deploy.sh
```

## 📋 部署检查清单

- [ ] SSH密钥认证配置完成
- [ ] 配置文件 `deploy-config.local` 已创建
- [ ] 脚本权限已设置
- [ ] 服务器连接测试通过
- [ ] 项目构建成功
- [ ] 文件同步完成
- [ ] 宝塔面板站点已添加
- [ ] 伪静态规则已配置
- [ ] SSL证书已申请
- [ ] 网站访问正常
- [ ] 路由功能测试通过

## 🔄 日常更新部署

代码更新后，只需要运行：
```bash
./deploy.sh
```

脚本会自动：
- 拉取最新代码
- 重新构建项目
- 备份现有文件
- 同步新文件到服务器

## 📞 技术支持

如果遇到问题，可以：
1. 查看本文档的故障排除部分
2. 检查脚本输出的错误信息
3. 在项目 Issues 中搜索相关问题
4. 提交新的 Issue 描述问题

---

**注意**: 首次部署建议在测试环境中验证，确认无误后再在生产环境使用。